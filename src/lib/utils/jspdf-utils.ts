import type { jsPDF } from 'jspdf'
import type { autoTable } from 'jspdf-autotable'

type JsPDFWithPluginAutoTable = jsPDF & {
  autoTable: typeof autoTable
  lastAutoTable?: {
    finalY: number
  }
}

export interface LogoDimensions {
  height: number
  width: number
}

export interface PageMargins {
  top: number
  left: number
  right: number
  footer: number
}

export const DEFAULT_PAGE_MARGINS: PageMargins = {
  top: 40,
  left: 40,
  right: 40,
  footer: 30,
}

export const applyFont = (doc: jsPDF, fontName: string): void => {
  try {
    doc.setFont(fontName)
  } catch {
    doc.setFont('Helvetica')
  }
}

export const loadImage = async (url: string): Promise<string> => {
  try {
    if (url.startsWith('data:')) {
      return url
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 segundos de timeout

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        cache: 'no-cache', // Forzar recarga para evitar problemas de caché
      })
      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(
          `Error al cargar la imagen: ${response.status} ${response.statusText}`,
        )
      }

      const blob = await response.blob()

      if (!blob.type.startsWith('image/')) {
        throw new Error(`Tipo de archivo no válido: ${blob.type}`)
      }

      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader()

        const readerTimeout = setTimeout(() => {
          reject(new Error('Timeout al leer la imagen como base64'))
        }, 5000)

        reader.onloadend = () => {
          clearTimeout(readerTimeout)
          if (reader.result && typeof reader.result === 'string') {
            resolve(reader.result)
          } else {
            reject(new Error('Error al convertir imagen a base64'))
          }
        }

        reader.onerror = () => {
          clearTimeout(readerTimeout)
          reject(new Error('Error al leer la imagen como base64'))
        }

        reader.readAsDataURL(blob)
      })
    } finally {
      clearTimeout(timeoutId)
    }
  } catch {
    // Generar una imagen de marcador de posición simple con SVG
    // Esto garantiza que siempre retornaremos una imagen válida
    const placeholderSvg = `
			<svg xmlns="http://www.w3.org/2000/svg" width="280" height="100" viewBox="0 0 280 100">
				<rect width="280" height="100" fill="#f0f0f0"/>
				<text x="140" y="50" font-family="Arial" font-size="12" text-anchor="middle" fill="#666">
					Logo no disponible
				</text>
			</svg>
		`

    return `data:image/svg+xml;base64,${btoa(placeholderSvg.trim())}`
  }
}

export const loadFont = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(
        `Error al cargar la fuente: ${response.status} ${response.statusText}`,
      )
    }

    const fontArrayBuffer = await response.arrayBuffer()
    const uint8Array = new Uint8Array(fontArrayBuffer)
    let binaryString = ''
    for (const byte of uint8Array) {
      binaryString += String.fromCharCode(byte)
    }
    return btoa(binaryString)
  } catch {
    throw new Error('Error cargando fuente')
  }
}

export const configureFonts = async (
  doc: jsPDF,
  fonts: Array<{
    path: string
    vfsName: string
    fontName: string
  }> = [],
): Promise<void> => {
  try {
    if (fonts.length === 0) {
      return
    }

    for (const font of fonts) {
      const fontBase64 = await loadFont(font.path)
      doc.addFileToVFS(font.vfsName, fontBase64)
      doc.addFont(font.vfsName, font.fontName, 'normal')
    }
  } catch {
    doc.setFont('Helvetica')
  }
}

export const addLogo = async (
  doc: jsPDF,
  logoPath: string,
  options: {
    width?: number
    x?: number
    y?: number
    centered?: boolean
  } = {},
): Promise<LogoDimensions> => {
  const { width = 280, y = DEFAULT_PAGE_MARGINS.top, centered = true } = options

  try {
    const logoBase64 = await loadImage(logoPath)

    if (!logoBase64.startsWith('data:image')) {
      throw new Error('La imagen no se pudo cargar en formato base64 válido')
    }

    const img = new Image()

    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Timeout al cargar la imagen'))
      }, 5000)

      img.onload = () => {
        clearTimeout(timeout)
        resolve()
      }

      img.onerror = () => {
        clearTimeout(timeout)
        reject(new Error('Error al cargar la imagen del logo'))
      }

      img.src = logoBase64
    })

    if (img.width <= 0 || img.height <= 0) {
      throw new Error('Dimensiones de imagen inválidas')
    }

    const logoHeight = (width * img.height) / img.width
    let xPos = options.x ?? 0

    if (centered) {
      xPos = (doc.internal.pageSize.getWidth() - width) / 2
    }

    try {
      doc.addImage(logoBase64, 'PNG', xPos, y, width, logoHeight)
      return { height: logoHeight, width }
    } catch {
      throw new Error('No se pudo agregar la imagen al PDF')
    }
  } catch {
    return { height: 40, width }
  }
}

export const getNextYPosition = ({
  doc,
  startY = 0,
  isTable = true,
  text = '',
  marginBottom = 15,
}: {
  doc: jsPDF
  startY?: number
  isTable?: boolean
  text?: string
  marginBottom?: number
}): number => {
  try {
    let resultPosition = startY
    if (isTable) {
      const pdfWithAutoTable = doc as JsPDFWithPluginAutoTable
      const finalY = pdfWithAutoTable.lastAutoTable?.finalY

      if (finalY !== undefined && (startY === 0 || finalY > startY)) {
        resultPosition = finalY
      }
    } else if (text) {
      // Para texto regular, calculamos usando getTextDimensions
      const dimensions = doc.getTextDimensions(text)
      resultPosition = startY + dimensions.h
    }

    return resultPosition + marginBottom
  } catch {
    return startY
  }
}

export function showPageNumbers(doc: jsPDF) {
  const totalPages = (doc.internal.pages.length - 1).toString()

  for (let i = 1; i <= doc.internal.pages.length - 1; i++) {
    doc.setPage(i)
    const pageText = `Página: ${i} de ${totalPages}`
    doc.text(pageText, 495, 140)
  }
}
