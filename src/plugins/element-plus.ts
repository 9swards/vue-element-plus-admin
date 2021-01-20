import ElementPlus, { locale } from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

export default function install(app: any) {
    app.use(ElementPlus, {
        locale
    })
}
