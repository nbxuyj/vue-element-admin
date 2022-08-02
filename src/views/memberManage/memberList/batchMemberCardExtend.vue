<style lang="scss" scoped>
.photo {
    display: block;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 10px;
}
::v-deep .el-link {
    text-decoration: underline;
}

.days-remind {
    color: #bbbbbb;
    margin-bottom: 20px;
    margin-left: 90px;

    span {
        margin-left: 10px;
    }
}
</style>

<template>
    <div class="app-container batch-container">
        <el-row type="flex" justify="end" class="margin-bottom-20">
            <el-button type="primary" @click="toggleAction('批量延卡')">批量延卡</el-button>
            <el-button type="primary" @click="toggleAction('批量扣卡')">批量扣卡</el-button>
            <el-button @click="goOpLogPage">会员卡操作记录</el-button>
        </el-row>
        <base-table ref="table" search :columns="columns" :data="dataSource">
            <template slot="displayName" slot-scope="{ row }">
                <member-avatar :row="row" />
            </template>
            <template slot="cardType" slot-scope="{ text }">
                <el-link :underline="false">{{ text }}</el-link>
            </template>
        </base-table>

        <el-dialog
            :title="actionTitle"
            :visible.sync="actionVisible"
            width="30%"
            :before-close="toggleAction"
        >
            <el-form ref="contactForm" label-width="90px" :model="actionForm">
                <el-form-item label="天数" prop="days">
                    <el-input v-model="actionForm.days" placeholder="请输入天数">
                        <i slot="suffix" style="margin-right: 10px;">天</i>
                    </el-input>
                </el-form-item>
                <div class="days-remind">
                    <i class="el-icon-info" />
                    <span>仅支持赠送调整，如需普通调整请前往会员列表单独操作</span>
                </div>
                <el-form-item v-if="showActionMoney" label="扣除金额" prop="money">
                    <el-input v-model="actionForm.money" placeholder="请输入扣除金额">
                        <i slot="suffix" style="margin-right: 10px;">元</i>
                    </el-input>
                </el-form-item>
                <el-form-item label="备注" prop="notes">
                    <el-input v-model="actionForm.notes" type="textarea" rows="2" placeholder="备注" />
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="toggleAction">取消</el-button>
                <el-button type="primary" @click="toggleAction">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import MemberAvatar from '@/views/memberManage/components/memberAvatar.vue';
import { memberCardTypeListWithAll } from '@/utils/dictionary';

export default {
    name: 'BatchMemberCardExtend',
    components: {
        MemberAvatar,
    },
    data() {
        return {
            columns: [
                {
                    type: 'selection',
                },
                {
                    label: '会员',
                    prop: 'displayName',
                    width: 150,
                    slotName: 'displayName',
                },
                {
                    label: '卡类型',
                    prop: 'cardType',
                    slotName: 'cardType',
                    searchType: 'select',
                    searchOrder: 1,
                    searchConfig: {
                        initialValue: -1,
                        label: '会员卡类型',
                        labelWidth: '150px',
                        selectEnum: memberCardTypeListWithAll,
                    },
                },
                {
                    label: '卡号',
                    prop: 'cardNo',
                },
                {
                    label: '状态',
                    prop: 'cardStatus',
                    searchType: 'select',
                    searchOrder: 2,
                    searchConfig: {
                        initialValue: [1, 3],
                        label: '会员卡状态',
                        selectEnum: [
                            {
                                label: '已开卡',
                                value: 1,
                            },
                            {
                                label: '未开卡',
                                value: 2,
                            },
                            {
                                label: '请假中',
                                value: 3,
                            },
                            {
                                label: '已过期',
                                value: 4,
                            },
                        ],
                        componentConfig: {
                            multiple: true,
                            collapseTags: true,
                        },
                    },
                },
                {
                    label: '办卡日期',
                    prop: 'createTime',
                    searchType: 'datePicker',
                    searchOrder: 8,
                    searchConfig: {
                        initialSelectValue: 'all',
                        selectEnum: [
                            {
                                label: '全部',
                                value: 'all',
                            },
                            {
                                label: '今天',
                                value: '0,0',
                            },
                            {
                                label: '昨天',
                                value: '-1,-1',
                            },
                            {
                                label: '过去7天内',
                                value: '-7,-1',
                            },
                            {
                                label: '过去30天内',
                                value: '-30,-1',
                            },
                            {
                                label: '本月',
                                value: 'month',
                            },
                        ],
                        dateConfig: ['createTimeStart', 'createTimeEnd'],
                    },
                },
                {
                    label: '开卡日期',
                    prop: 'openTime',
                    searchType: 'datePicker',
                    searchOrder: 9,
                    searchConfig: {
                        initialSelectValue: 'all',
                        selectEnum: [
                            {
                                label: '全部',
                                value: 'all',
                            },
                            {
                                label: '今天',
                                value: '0,0',
                            },
                            {
                                label: '昨天',
                                value: '-1,-1',
                            },
                            {
                                label: '过去7天内',
                                value: '-7,-1',
                            },
                            {
                                label: '过去30天内',
                                value: '-30,-1',
                            },
                        ],
                        dateConfig: ['openTimeStart', 'openTimeEnd'],
                    },
                },
                {
                    label: '有效期至',
                    prop: 'validTime',
                    searchType: 'datePicker',
                    searchOrder: 10,
                    searchConfig: {
                        initialSelectValue: 'all',
                        selectEnum: [
                            {
                                label: '全部',
                                value: 'all',
                            },
                            {
                                label: '7天内过期',
                                value: '0,7',
                            },
                            {
                                label: '30天内过期',
                                value: '0,30',
                            },
                            {
                                label: '已过期7天',
                                value: '-7,-1',
                            },
                            {
                                label: '已过期30天',
                                value: '-30,-1',
                            },
                        ],
                        dateConfig: ['validTimeStart', 'validTimeEnd'],
                    },
                },
                {
                    label: '剩余',
                    prop: 'remain',
                },
            ],
            dataSource: [
                {
                    displayName: '金桂英',
                    cardType: '30次卡',
                    cardNo: '10001',
                    cardStatus: '已开卡',
                    createTime: '1972-04-10',
                    openTime: '2016-08-31',
                    validTime: '1976-07-16',
                    lastSignTime: '2021-03-20',
                    remain: '365次',
                    signCount: 5,
                    photo: 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
                    tel: '135****4478',
                },
                {
                    displayName: '金桂英',
                    cardType: '1000元充值卡',
                    cardNo: '10001',
                    cardStatus: '已开卡',
                    createTime: '1972-04-10',
                    openTime: '2016-08-31',
                    validTime: '1976-07-16',
                    lastSignTime: '2021-03-20',
                    remain: '365次',
                    signCount: 5,
                    photo: 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
                    tel: '135****4478',
                },
            ],
            actionType: '',
            actionForm: {},
            actionVisible: false,
            actionTitle: '',
            showActionMoney: false,
        };
    },
    methods: {
        toggleAction(type) {
            const { selection } = this.$refs.table.$refs.table;
            if (!selection.length) {
                this.$message.warning('请先选中需要操作的会员卡');
                return;
            }
            if (type) {
                const chooseItem = selection.find(
                    (item) => item.cardType.indexOf('元') > 0
                );
                this.actionTitle = `${type}（已选中${selection.length}张）`;
                this.showActionMoney = !!chooseItem;
            }
            this.actionVisible = !this.actionVisible;
            if (!this.actionVisible) {
                this.showActionMoney = false;
                this.actionForm = {};
            }
        },
        goOpLogPage() {
            this.$router.push('/memberManage/memberCardOpLog');
        },
    },
};
</script>
