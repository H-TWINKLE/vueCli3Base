import { defineComponent, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

export default defineComponent({
    components: {
        Search
    },
    name: 'Home',
    setup() {
        const code = ref<string>('<div>npm install --save highlight.js</div>')
        return { code }
    }
})
