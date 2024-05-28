export const baseServiceApi = import.meta.env.VITE_BASE_URL

export const fileListApi = baseServiceApi + 'file/list'
export const fileUploadApi = baseServiceApi + 'file/upload'
export const fileContentApi = baseServiceApi + 'file/'
export const fileModifyApi = baseServiceApi + 'file/modify'
export const fileDeleteApi = baseServiceApi + 'file/delete'

export const dcImportApi = baseServiceApi + 'dc/_import'
export const dcExportApi = baseServiceApi + 'dc/_export'
export const dcDataSourceImportApi = baseServiceApi + 'dc/_importByDatasource'

export const datasourceGenerateExportApi = baseServiceApi + 'datasource/generate'
