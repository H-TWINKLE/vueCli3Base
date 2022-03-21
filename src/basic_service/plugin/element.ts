import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

export function installElement(app: any) {
	app.use(ElementPlus)
}
