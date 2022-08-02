<style lang="scss" scoped>
.detail-container {
    display: flex;

    .member-msg-box {
        width: 240px;

        ::v-deep .el-form-item {
            margin-bottom: 0;
        }

        .btn-box {
            width: 100%;
            text-align: center;
        }
    }

    .member-right-box {
        width: calc(100% - 240px);
        padding-left: 20px;

        .member-right-box {
            width: 100%;
        }
    }

    .member-other-btn {
        .el-button + .el-button {
            margin-left: 30px;
        }
    }
}
</style>

<template>
    <div class="app-container detail-container">
        <el-card class="member-msg-box" shadow="never" header="会员信息">
            <el-image
                class="margin-bottom-20"
                style="width: 198px; height: 198px;"
                src="https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3"
                fit="cover"
            />
            <el-form label-width="80px" label-position="left">
                <el-form-item label="会员姓名:">李某某</el-form-item>
                <el-form-item label="手机号码:">18188888888</el-form-item>
                <el-form-item label="性别:">男</el-form-item>
                <el-form-item label="生日:">2019-07-04</el-form-item>
                <el-divider />
                <el-form-item label="来源:">其他</el-form-item>
                <el-form-item label="团课失约:">0次</el-form-item>
                <el-form-item label="备注:">-</el-form-item>
                <el-divider />
                <div class="btn-box">
                    <el-button
                        type="text"
                        @click="toggleMoreMemberMsg"
                    >{{ `${showMoreMemberMsg ? '收起' : '展开'}更多信息` }}</el-button>
                </div>
                <div v-show="showMoreMemberMsg">
                    <el-form-item label="证件类型:">-</el-form-item>
                    <el-form-item label="证件号码:">-</el-form-item>
                    <el-form-item label="职业:">-</el-form-item>
                    <el-form-item label="收入:">-</el-form-item>
                    <el-form-item label="地址:">-</el-form-item>
                    <el-form-item label="兴趣爱好:">-</el-form-item>
                    <el-divider />
                    <el-form-item label="首次跟进:">-</el-form-item>
                    <el-form-item label="最后跟进:">-</el-form-item>
                </div>
                <el-divider />
                <div class="btn-box">
                    <el-button
                        round
                        type="primary"
                        style="width: 150px;"
                        @click="goEditMemberDetailPage"
                    >编辑</el-button>
                </div>
            </el-form>
        </el-card>
        <div class="member-right-box">
            <el-card class="member-other-box margin-bottom-20" shadow="never">
                <div slot="header">
                    <span>会籍信息</span>
                    <el-button
                        round
                        size="small"
                        type="primary"
                        style="float: right; margin-top: -6px;"
                        @click="toggleMembershipAllot"
                    >分配会籍</el-button>
                </div>
                <el-row
                    type="flex"
                    align="middle"
                    justify="center"
                    class="margin-bottom-20"
                    style="width: 250px;"
                >
                    <el-col :span="6">
                        <el-image
                            style="display: block; width: 50px; height: 50px; border-radius: 50%;"
                            src="https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3"
                            fit="cover"
                        />
                    </el-col>
                    <el-col :span="18">
                        <el-row style="font-size: 14px;">
                            <el-col style="margin-bottom: 8px;">
                                <div>会籍顾问：暂无会籍顾问</div>
                            </el-col>
                            <el-col>
                                <div>跟进状态：未体验</div>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>

                <base-table
                    :show-card-style="false"
                    :pagination="false"
                    :columns="memberCardColumns"
                    :data="memberCardDataSource"
                >
                    <template slot="action">
                        <el-button type="text">查看</el-button>
                    </template>
                </base-table>
            </el-card>

            <el-card class="member-other-box margin-bottom-20" shadow="never" header="私教课信息">
                <el-row class="margin-bottom-20" style="font-size: 14px;">
                    <el-col style="margin-bottom: 8px;">
                        <div>教练：叶教练</div>
                    </el-col>
                </el-row>

                <base-table
                    :show-card-style="false"
                    :pagination="false"
                    :columns="privateLessonColumns"
                    :data="privateLessonDataSource"
                    empty-text="暂无私教课"
                >
                    <template slot="action">
                        <el-button type="text">查看</el-button>
                    </template>
                </base-table>
            </el-card>

            <el-card class="member-other-box margin-bottom-20" shadow="never" header="更衣柜信息">
                <base-table
                    :show-card-style="false"
                    :pagination="false"
                    :columns="wardrobeColumns"
                    :data="wardrobeDataSource"
                    empty-text="暂无租柜信息"
                >
                    <template slot="action">
                        <el-button type="text">查看</el-button>
                    </template>
                </base-table>
            </el-card>

            <el-card class="member-other-box margin-bottom-20" shadow="never">
                <div slot="header">
                    <span>联系人信息</span>
                    <el-button
                        round
                        size="small"
                        type="primary"
                        style="float: right; margin-top: -6px;"
                        @click="toggleAddContact"
                    >添加联系人</el-button>
                </div>
                <base-table
                    :show-card-style="false"
                    :pagination="false"
                    :columns="contactColumns"
                    :data="contactDataSource"
                    empty-text="暂无联系人信息"
                >
                    <template slot="isEmergency" slot-scope="{ text }">
                        <span>{{ text ? '是' : '否' }}</span>
                    </template>
                    <template slot="action" slot-scope="{ row, $index }">
                        <el-button type="text" style="color: red;" @click="deleteContact($index)">移除</el-button>
                        <el-button
                            type="text"
                            @click="setEmergencyContact(row)"
                        >{{ `${row.isEmergency ? '撤销' : '设置'}紧急联系人` }}</el-button>
                    </template>
                </base-table>
            </el-card>

            <el-card class="member-other-box member-other-btn" shadow="never" header="其他">
                <el-row type="flex">
                    <el-button v-for="(item, index) in otherBtnList" :key="index" plain>{{ item }}</el-button>
                </el-row>
            </el-card>
        </div>

        <el-dialog
            title="分配会籍"
            :visible.sync="membershipAllotVisible"
            width="30%"
            :before-close="toggleMembershipAllot"
        >
            <div class="margin-bottom-20">
                <span>原会籍顾问：</span>
                <span>暂无会籍顾问</span>
            </div>
            <div>
                <span>分配给：</span>
                <el-input
                    v-model="membershipAllot"
                    placeholder="输入会籍顾问姓名或手机号筛选"
                    style="width: 200px;"
                />
            </div>
            <span slot="footer">
                <el-button @click="toggleMembershipAllot">取消</el-button>
                <el-button type="primary" @click="confirmAllot">确定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="添加联系人"
            :visible.sync="addContactVisible"
            width="30%"
            :before-close="toggleAddContact"
        >
            <el-form ref="contactForm" label-width="90px" :model="contactForm">
                <el-form-item
                    label="关系"
                    prop="linkmanType"
                    :rules="{ required: true, message: '请选择关系', trigger: 'blur' }"
                >
                    <el-select
                        v-model="contactForm.linkmanType"
                        clearable
                        style="width: 100%;"
                        placeholder="请选择关系"
                    >
                        <el-option
                            v-for="item in linkmanTypeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="手机号"
                    prop="linkmanPhone"
                    :rules="{ required: true, message: '请输入手机号', trigger: 'blur' }"
                >
                    <el-input
                        v-model="contactForm.linkmanPhone"
                        maxlength="11"
                        placeholder="手机号或姓名查询"
                    />
                </el-form-item>
                <el-form-item
                    label="姓名"
                    prop="linkmanName"
                    :rules="{ required: true, message: '请输入姓名', trigger: 'blur' }"
                >
                    <el-input v-model="contactForm.linkmanName" maxlength="11" placeholder="请输入姓名" />
                </el-form-item>
                <el-form-item
                    label="性别"
                    prop="linkmanSex"
                    :rules="{ required: true, message: '请选择性别', trigger: 'blur' }"
                >
                    <el-radio-group v-model="contactForm.linkmanSex">
                        <el-radio
                            v-for="item in sexList"
                            :key="item.value"
                            :label="item.value"
                        >{{ item.label }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="紧急联系人" prop="isEmergencyContact">
                    <el-radio-group v-model="contactForm.isEmergencyContact">
                        <el-radio
                            v-for="item in isEmergencyContactList"
                            :key="item.value"
                            :label="item.value"
                        >{{ item.label }}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="toggleAddContact">取消</el-button>
                <el-button type="primary" @click="confirmAddContact">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {
    linkmanTypeList,
    sexList,
    isEmergencyContactList,
} from '@/utils/dictionary';

export default {
    name: 'MemberDetail',
    data() {
        return {
            showMoreMemberMsg: false,
            membershipAllot: '',
            membershipAllotVisible: false,
            contactForm: {},
            addContactVisible: false,
            linkmanTypeList,
            sexList,
            isEmergencyContactList,
            memberCardColumns: [
                {
                    label: '会员卡类型',
                    prop: 'cardType',
                },
                {
                    label: '卡号',
                    prop: 'cardNo',
                },
                {
                    label: '会员卡状态',
                    prop: 'cardStatus',
                },
                {
                    label: '办卡时间',
                    prop: 'createTime',
                },
                {
                    label: '开卡时间',
                    prop: 'openTime',
                },
                {
                    label: '有效期至',
                    prop: 'validityTime',
                },
                {
                    label: '剩余',
                    prop: 'remain',
                },
                {
                    label: '操作',
                    slotName: 'action',
                },
            ],
            memberCardDataSource: [
                {
                    cardType: '游泳月卡',
                    cardNo: '10001',
                    validityTime: '2021-04-06',
                    cardStatus: '已开卡',
                    createTime: '2021-04-06',
                    remain: '700天',
                    openTime: '2021-04-06',
                },
                {
                    cardType: '游泳月卡',
                    cardNo: '10001',
                    validityTime: '2021-04-06',
                    cardStatus: '已开卡',
                    createTime: '2021-04-06',
                    remain: '700天',
                    openTime: '2021-04-06',
                },
            ],
            privateLessonColumns: [
                {
                    label: '课程',
                    prop: 'courseName',
                },
                {
                    label: '总课时',
                    prop: 'totalHours',
                },
                {
                    label: '剩余课时',
                    prop: 'remainHours',
                },
                {
                    label: '操作',
                    slotName: 'action',
                },
            ],
            privateLessonDataSource: [
                {
                    courseName: '游泳',
                    totalHours: '10节',
                    remainHours: '8节',
                },
            ],
            wardrobeColumns: [
                {
                    label: '更衣柜柜号',
                    prop: 'wardrobeNo',
                },
                {
                    label: '更衣柜类型',
                    prop: 'wardrobeType',
                },
                {
                    label: '起租时间',
                    prop: 'rentTime',
                },
                {
                    label: '到期时间',
                    prop: 'expireTime',
                },
                {
                    label: '使用状态',
                    prop: 'status',
                },
            ],
            wardrobeDataSource: [],
            contactColumns: [
                {
                    label: '姓名',
                    prop: 'name',
                },
                {
                    label: '手机号',
                    prop: 'mobile',
                },
                {
                    label: '关系',
                    prop: 'relation',
                },
                {
                    label: '是否是紧急联系人',
                    prop: 'isEmergency',
                    slotName: 'isEmergency',
                },
                {
                    label: '操作',
                    slotName: 'action',
                },
            ],
            contactDataSource: [
                {
                    name: '张三',
                    mobile: '13888888888',
                    relation: '父亲',
                    isEmergency: false,
                },
            ],
            otherBtnList: [
                '跟进历史',
                '体测数据',
                '签到历史',
                '团课历史',
                '私教课历史',
                '培训课历史',
                '训练历史',
            ],
        };
    },
    methods: {
        toggleMoreMemberMsg() {
            this.showMoreMemberMsg = !this.showMoreMemberMsg;
        },
        toggleMembershipAllot() {
            this.membershipAllotVisible = !this.membershipAllotVisible;
            if (!this.membershipAllotVisible) {
                this.membershipAllot = '';
            }
        },
        confirmAllot() {
            if (!this.membershipAllot) {
                this.$message({
                    type: 'warning',
                    message: '请选择会籍顾问',
                });
                return;
            }
            this.toggleMembershipAllot();
        },
        deleteContact(index) {
            this.$confirm('确定删除该联系人吗？', '提示', {
                type: 'warning',
            }).then(() => {
                this.contactDataSource.splice(index, 1);
                this.$message({
                    type: 'success',
                    message: '删除成功!',
                });
            });
        },
        setEmergencyContact(row) {
            row.isEmergency = !row.isEmergency;
            this.$message({
                type: 'success',
                message: `${row.isEmergency ? '设置' : '撤销'}紧急联系人成功!`,
            });
        },
        toggleAddContact() {
            this.addContactVisible = !this.addContactVisible;
            if (!this.addContactVisible) {
                this.contactForm = {};
            }
        },
        confirmAddContact() {
            this.$refs.contactForm.validate((valid) => {
                if (valid) {
                    this.contactDataSource.push(this.contactForm);
                    this.toggleAddContact();
                }
            });
        },
        goEditMemberDetailPage() {
            this.$router.push('/memberManage/editMemberDetail');
        },
    },
};
</script>
