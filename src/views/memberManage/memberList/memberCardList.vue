<style lang="scss" scoped>
</style>

<template>
    <div style="padding-bottom: 50px;">
        <base-table
            ref="table"
            search
            :request-api="requestApi"
            :columns="columns"
            :data="dataSource"
        >
            <template slot="displayName" slot-scope="{ row }">
                <member-avatar :row="row" />
            </template>
            <template slot="cardType" slot-scope="{ row }">
                <member-card-type :row="row" />
            </template>
            <template slot="cardStatus" slot-scope="{ text }">
                <el-tag effect="plain" :type="text === '有效卡' ? 'primary' : 'danger'">{{ text }}</el-tag>
            </template>
        </base-table>

        <base-footer-tool-bar>
            <el-row slot="extraComponent" :gutter="20">
                <el-col>
                    <el-button round plain type="primary" @click="batchAction">批量延卡/扣卡</el-button>
                </el-col>
            </el-row>
        </base-footer-tool-bar>
    </div>
</template>

<script>
import { getMemberList } from '@/api/member';
import { memberCardTypeListWithAll } from '@/utils/dictionary';
import dayjs from 'dayjs';
import MemberAvatar from '@/views/memberManage/components/memberAvatar.vue';
import MemberCardType from '@/views/memberManage/components/memberCardType.vue';

export default {
    name: 'MemberCardList',
    components: {
        MemberAvatar,
        MemberCardType,
    },
    data() {
        return {
            requestApi: getMemberList,
            columns: [
                {
                    label: '姓名',
                    prop: 'displayName',
                    width: 150,
                    slotName: 'displayName',
                    searchType: 'input',
                    searchOrder: 1,
                    searchConfig: {
                        label: '姓名/手机号/会员卡号',
                        prop: 'keyword',
                        labelWidth: '150px',
                    },
                },
                {
                    label: '当前会籍',
                    prop: 'currentLevelName',
                    searchType: 'select',
                    searchOrder: 2,
                    searchConfig: {
                        initialValue: -1,
                        label: '会员卡卡种',
                        prop: 'cardOtherType',
                        selectLabel: 'cardTypeName',
                        selectValue: 'cardType',
                        selectEnum: [
                            {
                                cardType: -1,
                                cardTypeName: '全部',
                            },
                            {
                                cardType: 1,
                                cardTypeName: '期限卡',
                            },
                            {
                                cardType: 2,
                                cardTypeName: '次卡',
                            },
                            {
                                cardType: 3,
                                cardTypeName: '储值卡',
                            },
                        ],
                    },
                },
                {
                    label: '会员卡',
                    prop: 'cardType',
                    slotName: 'cardType',
                    searchType: 'select',
                    searchOrder: 3,
                    searchConfig: {
                        initialValue: -1,
                        label: '会员卡类型',
                        selectEnum: memberCardTypeListWithAll,
                    },
                },
                {
                    label: '销售类型',
                    prop: 'saleType',
                    searchType: 'select',
                    searchOrder: 5,
                    searchConfig: {
                        initialValue: -1,
                        selectEnum: [
                            {
                                label: '全部',
                                value: -1,
                            },
                            {
                                label: '新卡',
                                value: 2,
                            },
                            {
                                label: '续卡',
                                value: 3,
                            },
                            {
                                label: '转卡',
                                value: 4,
                            },
                            {
                                label: '升级卡',
                                value: 5,
                            },
                            {
                                label: '退卡',
                                value: 6,
                            },
                        ],
                    },
                },
                {
                    label: '销售人',
                    prop: 'saleName',
                    searchType: 'select',
                    searchOrder: 6,
                    searchConfig: {
                        initialValue: -1,
                        selectEnum: [
                            {
                                label: '全部',
                                value: -1,
                            },
                        ],
                    },
                },
                {
                    label: '状态',
                    prop: 'cardStatus',
                    slotName: 'cardStatus',
                    searchType: 'select',
                    searchOrder: 4,
                    searchConfig: {
                        initialValue: -1,
                        label: '会员卡状态',
                        selectEnum: [
                            {
                                label: '全部',
                                value: -1,
                            },
                            {
                                label: '有效卡',
                                value: 1,
                            },
                            {
                                label: '已开卡',
                                value: 2,
                            },
                            {
                                label: '未开卡',
                                value: 3,
                            },
                        ],
                    },
                },
                {
                    label: '办卡日期',
                    prop: 'createTime',
                    searchType: 'datePicker',
                    searchOrder: 8,
                    searchConfig: {
                        initialSelectValue: '-30,-1',
                        initialValue: [
                            dayjs().add(-30, 'day').format('YYYY-MM-DD'),
                            dayjs().add(-1, 'day').format('YYYY-MM-DD'),
                        ],
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
                    searchType: 'select',
                    searchOrder: 7,
                    searchConfig: {
                        initialValue: -1,
                        label: '合同',
                        value: 'contract',
                        selectEnum: [
                            {
                                label: '全部',
                                value: -1,
                            },
                            {
                                label: '电子合同',
                                value: 1,
                            },
                            {
                                label: '纸质合同',
                                value: 2,
                            },
                            {
                                label: '无合同',
                                value: 3,
                            },
                        ],
                    },
                },
                {
                    label: '签到次数',
                    prop: 'signCount',
                },
                {
                    label: '最后签到',
                    prop: 'lastSignTime',
                    searchType: 'datePicker',
                    searchOrder: 11,
                    searchConfig: {
                        initialSelectValue: 'all',
                        selectEnum: [
                            {
                                label: '全部',
                                value: 'all',
                            },
                            {
                                label: '7天内签到',
                                value: '0,7',
                            },
                            {
                                label: '14天内签到',
                                value: '0,14',
                            },
                            {
                                label: '30天内签到',
                                value: '0,30',
                            },
                        ],
                        dateConfig: ['lastSignTimeStart', 'lastSignTimeEnd'],
                    },
                },
            ],
            dataSource: [],
        };
    },
    methods: {
        batchAction() {
            this.$confirm('批量延卡/扣卡操作不可撤销，请谨慎操作!', '提示', {
                type: 'warning',
            }).then(() => {
                this.$router.push('/memberManage/batchMemberCardExtend');
            });
        },
    },
};
</script>
