import { defineComponent, onMounted, reactive, ref } from 'vue'
import { Edit, Present, Search } from '@element-plus/icons-vue'
import httpKit from '@/basic_service/http/httpKit'
import { UploadProps } from 'element-plus'
import {
    datasourceGenerateExportApi,
    dcDataSourceImportApi,
    dcExportApi,
    dcImportApi,
    fileContentApi,
    fileDeleteApi,
    fileListApi,
    fileModifyApi,
    fileUploadApi
} from '@/basic_service/http/apiConstants'

export default defineComponent({
    components: {
        Present,
        Search,
        Edit
    },
    name: 'Home',
    setup() {
        const activeName = ref('1')
        const datasourceForm = reactive({
            key: 'data-contract',
            driver: 'postgres',
            host: '127.0.0.1',
            database: 'data-contract',
            port: 5432,
            user: 'root',
            password: '123456'
        })
        const page: any = reactive({
            uploadUrl: fileUploadApi,
            fileList: [],
            exportFormatTag: ['jsonschema', 'pydantic-model', 'sodacl', 'dbt', 'dbt-sources', 'dbt-staging-sql', 'odcs', 'rdf', 'avro', 'protobuf', 'great-expectations', 'terraform',
                'avro-idl', 'sql', 'sql-query', 'html', 'go', 'bigquery', 'dbml'],
            remoteFileList: [],
            contentData: '',
            format: 'html',
            exportName: '',
            modify: false,
            filename: ''
        })
        const getExportFormatTag = () => {
            return page.exportFormatTag.map((value: string) => {
                return { 'lable': value, 'value': value }
            })
        }
        /**
         * 获取文件列表
         */
        const getFileList = async () => {
            const result = await httpKit.get(fileListApi)
            if (result && result.data) {
                page.remoteFileList = result.data.map((item: any) => {
                    return { 'name': item }
                })
            }
        }
        /**
         * 获取文件内容
         */
        const getFileContent = async (_file_name: string) => {
            const result = await httpKit.get(`${ fileContentApi }/?file=` + _file_name)
            if (result) {
                page.filename = _file_name
                page.contentData = result
            }
        }
        /**
         * 上传成功的回调
         */
        const handleSuccess: UploadProps['onSuccess'] = (file, uploadFiles) => {
            getFileList()
        }
        /**
         * 点击表格数据详情
         */
        const onRowView = (scope: any) => {
            getFileContent(scope.row.name)
        }
        /**
         * 点击表格数据导入合约
         */
        const onRowImport = async (scope: any) => {
            const result = await httpKit.get(`${ dcImportApi }?format=sql&file=` + scope.row.name)
            if (result) {
                page.filename = scope.row.name
                page.contentData = result.data
                getFileList()
            }
        }
        /**
         * 点击表格数据导出
         */
        const onRowExport = async (scope: any) => {
            const result = await httpKit.get(`${ dcExportApi }?format=${ page.format }&file=${ scope.row.name }&output=${ page.exportName }`)
            if (result) {
                page.filename = scope.row.name
                page.contentData = result.data
                getFileList()
            }
        }
        /**
         * 修改正文的标志
         */
        const changeModifyStatus = (scope: any) => {
            page.modify = true
            page.filename = scope.row.name
            getFileContent(page.filename)
        }
        /**
         * 开始修改正文
         */
        const toModifyContent = async () => {
            const result = await httpKit.post(`${ fileModifyApi }?file=` + page.filename, page.contentData, { asBody: true })
            if (result) {
                page.modify = false
                getFileContent(page.filename)
            }
        }

        const onSubmitDatasource = async () => {
            const result = await httpKit.get(datasourceGenerateExportApi, datasourceForm)
            if (result) {
                page.contentData = result.data
                getFileList()
            }
        }

        const onSubmitDatasourceAsYaml = async () => {
            const result = await httpKit.get(dcDataSourceImportApi, datasourceForm)
            if (result) {
                page.contentData = result.data
                getFileList()
            }
        }

        const onDeleteFile = async (scope: any) => {
            const result = await httpKit.post(`${ fileDeleteApi }?file=${ scope.row.name }`, {})
            if (result) {
                getFileList()
            }
        }

        /**
         * 初始化的钩子
         */
        onMounted(() => {
            getFileList()
        })

        return {
            activeName,
            page,
            datasourceForm,
            getFileList,
            handleSuccess,
            onRowView,
            getFileContent,
            onRowImport,
            onRowExport,
            changeModifyStatus,
            toModifyContent,
            getExportFormatTag,
            onSubmitDatasource,
            onDeleteFile,
            onSubmitDatasourceAsYaml
        }
    }
})
