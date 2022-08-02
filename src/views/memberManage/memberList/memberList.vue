<style lang="scss" scoped>
</style>

<template>
    <div>
        <base-table ref="table" search :columns="columns" :data="dataSource">
            <template slot="displayName" slot-scope="{ row }">
                <member-avatar :row="row" />
            </template>
            <template slot="cardType" slot-scope="{ text }">
                <el-link :underline="false">{{ text }}</el-link>
            </template>
            <template slot="cardStatus" slot-scope="{ text }">
                <el-tag effect="plain" :type="text === '有效卡' ? 'primary' : 'danger'">{{ text }}</el-tag>
            </template>

            <template slot="childTable" slot-scope="{ row }">
                <base-table
                    :show-card-style="false"
                    :pagination="false"
                    :columns="childColumns"
                    :data="row.childList"
                >
                    <template slot="action">
                        <el-button type="text">详情</el-button>
                    </template>
                </base-table>
            </template>
        </base-table>
    </div>
</template>

<script>
import MemberAvatar from '@/views/memberManage/components/memberAvatar.vue';

export default {
    name: 'MemberList',
    components: {
        MemberAvatar,
    },
    data() {
        return {
            columns: [
                {
                    label: '',
                    width: 50,
                    type: 'expand',
                    slotName: 'childTable',
                    searchType: 'select',
                    searchOrder: 2,
                    searchConfig: {
                        label: '仅显示本店会员',
                        prop: 'onlyShowOurShop',
                        labelWidth: '120px',
                        initialValue: 0,
                        selectEnum: [
                            {
                                value: 1,
                                label: '是',
                            },
                            {
                                value: 0,
                                label: '否',
                            },
                        ],
                    },
                },
                {
                    label: '会员',
                    prop: 'displayName',
                    width: 150,
                    slotName: 'displayName',
                    searchType: 'input',
                    searchOrder: 1,
                    searchConfig: {
                        label: '姓名/手机号',
                        prop: 'keyword',
                        labelWidth: '100px',
                    },
                },
                {
                    label: '性别',
                    prop: 'sex',
                    searchType: 'datePicker',
                    searchOrder: 4,
                    searchConfig: {
                        label: '有效期至',
                        prop: 'validityTime',
                        initialSelectValue: 'all',
                        selectEnum: [
                            {
                                label: '全部',
                                value: 'all',
                            },
                            {
                                label: '7天内失效',
                                value: '0,7',
                            },
                            {
                                label: '14天内失效',
                                value: '0,14',
                            },
                            {
                                label: '30天内失效',
                                value: '0,30',
                            },
                        ],
                        dateConfig: ['validityTimeStart', 'validityTimeEnd'],
                    },
                },
                {
                    label: '手机号',
                    prop: 'tel',
                    searchType: 'datePicker',
                    searchOrder: 7,
                    searchConfig: {
                        label: '签到统计',
                        prop: 'signCount',
                        initialSelectValue: 'all',
                        selectEnum: [
                            {
                                label: '全部',
                                value: 'all',
                            },
                            {
                                label: '最近7天',
                                value: '0,7',
                            },
                            {
                                label: '最近14天',
                                value: '0,14',
                            },
                            {
                                label: '最近30天',
                                value: '0,30',
                            },
                        ],
                        dateConfig: ['signCountStart', 'signCountEnd'],
                    },
                },
                {
                    label: '生日',
                    prop: 'birthday',
                    searchType: 'select',
                    searchOrder: 5,
                    searchConfig: {
                        label: '会员生日',
                        initialValue: -1,
                        selectEnum: [
                            {
                                value: -1,
                                label: '全部',
                            },
                            {
                                value: 1,
                                label: '1月',
                            },
                            {
                                value: 2,
                                label: '2月',
                            },
                            {
                                value: 3,
                                label: '3月',
                            },
                            {
                                value: 4,
                                label: '4月',
                            },
                            {
                                value: 5,
                                label: '5月',
                            },
                            {
                                value: 6,
                                label: '6月',
                            },
                            {
                                value: 7,
                                label: '7月',
                            },
                            {
                                value: 8,
                                label: '8月',
                            },
                            {
                                value: 9,
                                label: '9月',
                            },
                            {
                                value: 10,
                                label: '10月',
                            },
                            {
                                value: 11,
                                label: '11月',
                            },
                            {
                                value: 12,
                                label: '12月',
                            },
                        ],
                    },
                },
                {
                    label: '会籍顾问',
                    prop: 'consultant',
                    searchType: 'select',
                    searchOrder: 2,
                    searchConfig: {
                        initialValue: -1,
                        selectEnum: [
                            {
                                value: -1,
                                label: '全部',
                            },
                            {
                                value: 1,
                                label: '未指定会籍',
                            },
                        ],
                    },
                },
                {
                    label: '会员状态',
                    prop: 'cardStatus',
                    searchType: 'select',
                    searchOrder: 3,
                    searchConfig: {
                        initialValue: -1,
                        selectEnum: [
                            {
                                value: -1,
                                label: '全部',
                            },
                            {
                                value: 1,
                                label: '有效会员',
                            },
                            {
                                value: 2,
                                label: '已失效',
                            },
                        ],
                    },
                },
                {
                    label: '上次签到',
                    prop: 'lastSign',
                    searchType: 'datePicker',
                    searchOrder: 6,
                    searchConfig: {
                        label: '最后签到',
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
                        dateConfig: ['lastSignStart', 'lastSignEnd'],
                    },
                },
            ],
            dataSource: [
                {
                    displayName: '张三',
                    photo: 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
                    tel: '135****4478',
                    sex: '男',
                    birthday: '2021-04-06',
                    consultant: '',
                    cardStatus: '剩余700天',
                    lastSign: '2021-04-06',
                    childList: [
                        {
                            cardType: '游泳月卡',
                            cardNo: '10001',
                            validityTime: '2021-04-06',
                            cardStatus: '已开卡',
                            createTime: '2021-04-06',
                            remain: '700天',
                        },
                        {
                            cardType: '游泳月卡',
                            cardNo: '10001',
                            validityTime: '2021-04-06',
                            cardStatus: '已开卡',
                            createTime: '2021-04-06',
                            remain: '700天',
                        },
                        {
                            cardType: '游泳月卡',
                            cardNo: '10001',
                            validityTime: '2021-04-06',
                            cardStatus: '已开卡',
                            createTime: '2021-04-06',
                            remain: '700天',
                        },
                    ],
                },
                {
                    displayName: '张三',
                    photo: 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
                    tel: '135****4478',
                    sex: '男',
                    birthday: '2021-04-06',
                    consultant: '',
                    cardStatus: '剩余700天',
                    lastSign: '2021-04-06',
                    childList: [
                        {
                            cardType: '游泳月卡',
                            cardNo: '10001',
                            validityTime: '2021-04-06',
                            cardStatus: '已开卡',
                            createTime: '2021-04-06',
                            remain: '700天',
                        },
                        {
                            cardType: '游泳月卡',
                            cardNo: '10001',
                            validityTime: '2021-04-06',
                            cardStatus: '已开卡',
                            createTime: '2021-04-06',
                            remain: '700天',
                        },
                        {
                            cardType: '游泳月卡',
                            cardNo: '10001',
                            validityTime: '2021-04-06',
                            cardStatus: '已开卡',
                            createTime: '2021-04-06',
                            remain: '700天',
                        },
                    ],
                },
            ],
            childColumns: [
                {
                    label: '会员卡类型',
                    prop: 'cardType',
                },
                {
                    label: '会员卡状态',
                    prop: 'cardStatus',
                },
                {
                    label: '卡号',
                    prop: 'cardNo',
                },
                {
                    label: '办卡时间',
                    prop: 'createTime',
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
                    label: '更多',
                    slotName: 'action',
                },
            ],
        };
    },
    methods: {},
};
</script>
