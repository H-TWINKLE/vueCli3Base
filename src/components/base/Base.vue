<template>
    <div>
<!--        <h2>Base</h2>-->
        <Container/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Container from '@/components/base/container/Container.vue'

export default defineComponent({
    name: 'Base',
    components: { Container }
})
</script>

<style lang="less" scoped>
</style>
