<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <div style="font-weight: bold;color: #409EFF;font-size: 2.5rem;margin: 1% 1% 0 1%">DATA-CONTRACT</div>
            </el-header>
            <el-container>
                <el-aside width="600px" style="margin: 1% 2%">
                    <el-tabs class="demo-tabs" v-model="activeName">
                        <el-tab-pane label="上传数据库ddl" name="1">
                            <el-upload
                                v-model:file-list="page.fileList"
                                class="upload-demo"
                                :action="page.uploadUrl"
                                :on-success="handleSuccess"
                                multiple>
                                <el-button type="primary" style="margin-top: 20px">上传</el-button>
                            </el-upload>
                        </el-tab-pane>
                        <el-tab-pane label="动态导入数据库ddl" name="2">
                            <el-form :model="datasourceForm" label-width="auto"
                                     style="max-width: 600px;margin-top: 20px">
                                <el-form-item label="数据源唯一key">
                                    <el-input v-model="datasourceForm.key" />
                                </el-form-item>
                                <el-form-item label="数据源驱动">
                                    <el-select v-model="datasourceForm.driver" placeholder="请选择数据源驱动">
                                        <el-option label="postgres" value="postgres" />
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="ip地址">
                                    <el-input v-model="datasourceForm.host" />
                                </el-form-item>
                                <el-form-item label="端口">
                                    <el-input v-model="datasourceForm.port" />
                                </el-form-item>
                                <el-form-item label="数据库名称">
                                    <el-input v-model="datasourceForm.database" />
                                </el-form-item>
                                <el-form-item label="数据库用户名">
                                    <el-input v-model="datasourceForm.user" />
                                </el-form-item>
                                <el-form-item label="数据库密码">
                                    <el-input v-model="datasourceForm.password"
                                              type="password"
                                              placeholder="请输入密码"
                                              show-password />
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmitDatasource">生成数据ddl</el-button>
                                    <el-button type="primary" @click="onSubmitDatasourceAsYaml">生成数据合约</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="导出合约" name="3">
                            <el-form label-position="left" label-width="auto" style="max-width: 600px;margin-top: 20px">
                                <el-form-item label="导出合约名字">
                                    <el-input v-model="page.exportName" placeholder="请填写导出合约名字" />
                                </el-form-item>
                                <el-form-item label="导出格式">
                                    <el-select v-model="page.format" placeholder="请选择导出格式">
                                        <el-option v-for="i in getExportFormatTag()"
                                                   :label="i.label"
                                                   :value="i.value"
                                                   :key="i" />
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                    <el-divider />
                    <el-table
                        :data="page.remoteFileList" stripe style="width: 100%;margin-top: 40px">
                        <el-table-column prop="name" label="文件名称" />
                        <el-table-column label="操作" width="240">
                            <template #default="scope">
                                <el-link class="el-link-text-action" type="primary" link
                                         @click="onRowView(scope)">查看
                                </el-link>
                                <el-link class="el-link-text-action" type="primary" link
                                         @click="changeModifyStatus(scope)">修改
                                </el-link>
                                <el-link class="el-link-text-action" type="success" link
                                         @click="onRowImport(scope)">生成合约
                                </el-link>
                                <el-link class="el-link-text-action" type="warning" link
                                         @click="onRowExport(scope)"
                                         :disabled="!scope.row.name.endsWith('yaml')">导出合约
                                </el-link>
                                <el-popconfirm title="确认删除该文件?" confirm-button-text="确认"
                                               cancel-button-text="取消"
                                               @confirm="onDeleteFile(scope)">
                                    <template #reference>
                                        <el-link class="el-link-text-action" type="danger" link>删除</el-link>
                                    </template>
                                </el-popconfirm>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-aside>
                <el-main>
                    <div
                        style="width: 100%;display: flex;justify-content: space-between;text-align: center;margin-bottom: 10px">
                        <div style="margin-top: 8px">{{ page.filename }}</div>
                        <div>
                            <el-button v-if="page.modify" type="danger" @click="toModifyContent">保存</el-button>
                            <!--                            <el-button v-if="!page.modify" type="success" @click="changeModifyStatus">修改</el-button>-->
                        </div>
                    </div>
                    <div v-if="!page.modify">
                        <div v-if="page.contentData && page.contentData.match('<html')" v-html="page.contentData"></div>
                        <pre v-else v-html="page.contentData"></pre>
                    </div>
                    <div v-if="page.modify">
                        <el-input type="textarea" rows="35" style="width: 100%;height: 100%"
                                  v-model="page.contentData">
                        </el-input>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts">
import Home from './home'

export default Home
</script>
<style lang="less" scoped>
.el-link-text-action {
    margin-left: 2px;
    margin-right: 2px;
}
</style>
