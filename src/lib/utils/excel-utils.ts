import { read, utils } from 'xlsx'

interface ImportExcelResult {
  data: unknown[]
  headers: string[]
}

/**
 * Imports data from an Excel file and returns its content and headers.
 * Resolves with an object containing the data and headers from the first worksheet.
 * Rejects if the file cannot be read or parsed.
 * @param file The Excel file to import.
 * @returns A promise that resolves to an object with data and headers arrays.
 * @example
 * importExcelFile(file).then(({ data, headers }) => { ... });
 */
export async function importExcelFile(file: File): Promise<ImportExcelResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const binaryData = event.target?.result
        if (!binaryData) {
          throw new Error('No se pudo leer el archivo')
        }

        const workBook = read(binaryData, { type: 'binary' })
        const workSheetName = workBook.SheetNames[0]
        const workSheet = workBook.Sheets[workSheetName]

        // Formatear los números si es necesario
        for (const cell in workSheet) {
          if (
            !cell.startsWith('!') &&
            typeof (workSheet as Record<string, { v: unknown }>)[cell]?.v ===
              'number'
          ) {
            // Aquí podríamos aplicar formateo si es necesario
          }
        }

        const fileData = utils.sheet_to_json(workSheet)
        const dataHeaders = utils.sheet_to_json(workSheet, { header: 1 })
        const headers = dataHeaders[0]

        resolve({
          data: fileData,
          headers: headers as string[],
        })
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = (error) => {
      console.log(error)
      reject(new Error('Error al leer el archivo'))
    }

    reader.readAsBinaryString(file)
  })
}

/**
 * Checks if a file has a valid Excel extension.
 * @param file The file to check.
 * @param extensions Optional array of valid extensions. Defaults to ["xlsx", "xls", "csv"].
 * @returns True if the file extension is valid, false otherwise.
 * @example
 * isValidExcelFile(file) // true or false
 */
export function isValidExcelFile(
  file: File,
  extensions: string[] = ['xlsx', 'xls', 'csv'],
): boolean {
  const parts = file.name.split('.')
  const extension = parts[parts.length - 1].toLowerCase()
  return extensions.includes(extension)
}
