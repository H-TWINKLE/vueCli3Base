<template>
    <div>
        <div>主页</div>
        <el-row>
            <el-button :icon="Search" circle/>
            <el-button type="primary" :icon="Edit" circle/>
            <el-button type="success" :icon="Check" circle/>
            <el-button type="info" :icon="Message" circle/>
            <el-button type="warning" :icon="Star" circle/>
            <el-button type="danger" :icon="Delete" circle/>
        </el-row>
    </div>
</template>

<script lang="ts">
import Home from './home'

export default Home
</script>
<style lang="less" scoped>
</style>
