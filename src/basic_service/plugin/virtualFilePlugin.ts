import dayjs from 'dayjs'

export default function virtualFilePlugin() {
    const virtualFileId = '@virtual-config-plugin'
    return {
        name: 'virtual-config-plugin', // 必须的，将会在 warning 和 error 中显示
        resolveId(id: string) {
            if (id === virtualFileId) {
                return virtualFileId
            }
        },
        load(id: string) {
            if (id === virtualFileId) {
                return `export const configForUpdateTime = "${dayjs()}"`
            }
        }
    }
}
