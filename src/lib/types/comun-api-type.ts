export interface IBodyComunFiltro {
  filtros: {
    pTipoFiltro: string
    pParametro1: string
    pParametro2: string
    pParametro3: string
    pParametro4: string
    pParametro5: string
  }[]
}
export interface ComunFiltroResponse {
  codigo?: number
  mensaje?: string
  data?: ComunFiltroData[]
}

export interface ComunFiltroData {
  tipo_filtro: string
  pParametro1: string
  pParametro2: string
  pParametro3: string
  pParametro4: string
  pParametro5: string
  data: ComunFiltroItem[]
}

export interface ComunFiltroItem {
  c_codigo: number
  c_nombre: string
  c_sigla: string
  c_fechainicio: string | null
  c_fechafin: string | null
  c_estado: number
  c_gparametro: string | null
}
