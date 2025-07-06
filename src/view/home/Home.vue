<template>
    <div>
        <div>主页</div>
        <div>
            <el-text class="mx-1">Default</el-text>
            <el-text class="mx-1" type="primary">Primary</el-text>
            <el-text class="mx-1" type="success">Success</el-text>
            <el-text class="mx-1" type="info">Info</el-text>
            <el-text class="mx-1" type="warning">Warning</el-text>
            <el-text class="mx-1" type="danger">Danger</el-text>
        </div>
        <div>
            <highlightjs language="JavaScript" :autodetect="true" :code="code"></highlightjs>
        </div>
        <div>
            <el-row :gutter="24">
                <el-col :span="6" :offset="6">
                    <FullScreen />
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts">
import Home from './home'

export default Home
</script>
<style lang="less" scoped>
</style>
