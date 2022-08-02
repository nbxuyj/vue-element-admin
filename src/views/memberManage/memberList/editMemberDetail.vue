<style lang="scss" scoped>
</style>

<template>
    <div class="app-container">
        <el-card style="padding-bottom: 20px;">
            <el-form ref="form" label-width="80px" :model="form">
                <div style="width: 300px; float: left;">
                    <!-- 会员照片 -->
                    <el-form-item label="会员照片" prop="photo">
                        <img v-if="form.photo" :src="form.photo" class="avatar" />
                        <el-avatar v-else icon="el-icon-user-solid" :size="100" />
                        <el-row type="flex">
                            <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                            >
                                <el-button plain type="primary">上传</el-button>
                            </el-upload>
                            <el-button plain type="primary" style="margin-left: 10px;">拍照</el-button>
                        </el-row>
                    </el-form-item>
                </div>
                <div style="float: left; width: 500px;">
                    <!-- 姓名 -->
                    <el-form-item
                        label="姓名"
                        prop="name"
                        :rules="{ required: true, message: '请输入姓名', trigger: 'blur' }"
                    >
                        <el-input v-model="form.name" maxlength="10" placeholder="姓名" />
                    </el-form-item>

                    <!-- 手机号 -->
                    <el-form-item
                        label="手机号"
                        prop="phone"
                        :rules="{ required: true, message: '请输入手机号', trigger: 'blur' }"
                    >
                        <el-input
                            v-model="form.phone"
                            placeholder="手机号或姓名查询"
                            maxlength="11"
                            style="100%"
                        />
                    </el-form-item>

                    <el-form-item label="性别" prop="sex">
                        <el-radio-group v-model="form.sex">
                            <el-radio
                                v-for="item in sexList"
                                :key="item.value"
                                :label="item.value"
                            >{{ item.label }}</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <!-- 证件类型 -->
                    <el-form-item label="证件类型" prop="idType">
                        <el-select
                            v-model="form.idType"
                            clearable
                            style="width: 100%;"
                            placeholder="请选择证件类型"
                        >
                            <el-option
                                v-for="item in idTypeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>

                    <!-- 证件号 -->
                    <el-form-item label="证件号" prop="idNumber" v-if="form.idType">
                        <el-input v-model="form.idNumber" placeholder="证件号" />
                    </el-form-item>

                    <!-- 证件照 -->
                    <el-form-item label="证件照" prop="idPhoto" v-if="form.idType">
                        <el-row type="flex">
                            <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleIdPhotoSuccess"
                            >
                                <el-button plain type="primary">上传</el-button>
                            </el-upload>
                            <el-button plain type="primary" style="margin-left: 10px;">拍照</el-button>
                            <el-button plain @click="toggleIdPhotoViewer">查看</el-button>
                            <image-viewer
                                v-if="showIdPhotoViewer"
                                :on-close="toggleIdPhotoViewer"
                                :url-list="[form.idPhoto]"
                            />
                        </el-row>
                    </el-form-item>

                    <!-- 生日 -->
                    <el-form-item label="生日" prop="birthday">
                        <el-date-picker
                            v-model="form.birthday"
                            type="date"
                            placeholder="选择日期"
                            style="width: 100%;"
                        />
                    </el-form-item>

                    <!-- 来源 -->
                    <el-form-item label="来源" prop="source">
                        <el-select
                            v-model="form.source"
                            clearable
                            style="width: 100%;"
                            placeholder="请选择来源"
                        >
                            <el-option
                                v-for="item in sourceList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>

                    <!-- 地址 -->
                    <el-form-item label="地址" prop="address">
                        <el-input v-model="form.address" placeholder="详细地址" />
                    </el-form-item>

                    <!-- 备注 -->
                    <el-form-item label="备注" prop="notes">
                        <el-input v-model="form.notes" type="textarea" rows="2" placeholder="备注" />
                    </el-form-item>
                    <el-collapse>
                        <el-collapse-item title="更多信息">
                            <el-form-item label="职业" prop="profession">
                                <el-select
                                    v-model="form.profession"
                                    clearable
                                    style="width: 100%;"
                                    placeholder="请选择职业"
                                >
                                    <el-option
                                        v-for="item in professionList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    />
                                </el-select>
                            </el-form-item>

                            <el-form-item label="收入" prop="income">
                                <el-select
                                    v-model="form.income"
                                    clearable
                                    style="width: 100%;"
                                    placeholder="请选择收入"
                                >
                                    <el-option
                                        v-for="item in incomeList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    />
                                </el-select>
                            </el-form-item>

                            <el-form-item label="兴趣爱好" prop="interest">
                                <el-input v-model="form.interest" placeholder="请输入兴趣爱好" />
                            </el-form-item>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </el-form>
        </el-card>

        <base-footer-tool-bar>
            <el-row slot="extraComponent" :gutter="20">
                <el-col>
                    <el-button round type="primary">保存</el-button>
                    <el-button round plain @click="goBack">取消</el-button>
                </el-col>
            </el-row>

            <el-button slot="extraRightComponent" round type="danger" @click="deleteMember">删除会员</el-button>
        </base-footer-tool-bar>
    </div>
</template>

<script>
import { sexList, idTypeList, sourceList } from '@/utils/dictionary';
import imageViewer from 'element-ui/packages/image/src/image-viewer';

export default {
    name: 'EditMemberDetail',
    components: { imageViewer },
    data() {
        return {
            showIdPhotoViewer: false,
            form: {},
            sexList,
            idTypeList,
            sourceList,
            professionList: [
                {
                    label: '国家机关公务员',
                    value: 1,
                },
                {
                    label: '场馆/事业管理',
                    value: 2,
                },
                {
                    label: '场馆/事业一般人员',
                    value: 3,
                },
                {
                    label: '私营业主',
                    value: 4,
                },
                {
                    label: '医务人员',
                    value: 5,
                },
                {
                    label: '教师',
                    value: 6,
                },
                {
                    label: '学生',
                    value: 7,
                },
                {
                    label: '律师',
                    value: 8,
                },
                {
                    label: '服务业人员',
                    value: 9,
                },
                {
                    label: '信息技术人员',
                    value: 10,
                },
                {
                    label: '其他',
                    value: 11,
                },
            ],
            incomeList: [
                {
                    label: '3千元以下/月',
                    value: 1,
                },
                {
                    label: '3千~5千元/月',
                    value: 2,
                },
                {
                    label: '5千~1万元/月',
                    value: 3,
                },
                {
                    label: '1万~2万元/月',
                    value: 4,
                },
                {
                    label: '2万元以上/月',
                    value: 5,
                },
            ],
        };
    },
    methods: {
        deleteMember() {
            this.$confirm(
                '您确定要删除该会员吗？会员相关的会员卡和私教课信息也将一并删除。',
                '提示',
                {
                    type: 'warning',
                }
            ).then(() => {
                this.$message.success('删除成功');
            });
        },
        handleAvatarSuccess(res, file) {
            this.form.photo = URL.createObjectURL(file.raw);
        },
        handleIdPhotoSuccess(res, file) {
            this.form.idPhoto = URL.createObjectURL(file.raw);
        },
        toggleIdPhotoViewer() {
            this.showIdPhotoViewer = !this.showIdPhotoViewer;
        },
        goBack() {
            this.$router.go(-1);
        },
    },
};
</script>
