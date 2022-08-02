<style lang="less" scoped>
</style>

<template>
    <div class="app-container">
        <base-table ref="table" search :columns="columns" :data="dataSource">
            <template slot="displayName" slot-scope="{ row }">
                <member-avatar :row="row" />
            </template>
            <template slot="cardType" slot-scope="{ row }">
                <member-card-type :row="row" />
            </template>
        </base-table>
    </div>
</template>

<script>
import MemberAvatar from '@/views/memberManage/components/memberAvatar.vue';
import MemberCardType from '@/views/memberManage/components/memberCardType.vue';
import {
    memberCardTypeListWithAll,
    datePickerSelectOptionsWithAll,
} from '@/utils/dictionary';
import dayjs from 'dayjs';

const today = dayjs().format('YYYY-MM-DD');

export default {
    name: 'MemberCardOpLog',
    components: {
        MemberAvatar,
        MemberCardType,
    },
    data() {
        return {
            columns: [
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
                        labelWidth: '150px',
                    },
                },
                {
                    label: '会员卡',
                    prop: 'cardType',
                    slotName: 'cardType',
                    searchType: 'select',
                    searchOrder: 2,
                    searchConfig: {
                        initialValue: -1,
                        selectEnum: memberCardTypeListWithAll,
                    },
                },
                {
                    label: '录卡日期',
                    prop: 'createTime',
                    searchType: 'datePicker',
                    searchOrder: 4,
                    searchConfig: {
                        initialSelectValue: 'all',
                        selectEnum: datePickerSelectOptionsWithAll,
                        dateConfig: ['createTimeStart', 'createTimeEnd'],
                    },
                },
                {
                    label: '操作事项',
                    prop: 'opType',
                },
                {
                    label: '操作时间',
                    prop: 'opTime',
                    searchType: 'datePicker',
                    searchOrder: 5,
                    searchConfig: {
                        initialSelectValue: '0,0',
                        initialValue: [today, today],
                        selectEnum: datePickerSelectOptionsWithAll,
                        dateConfig: ['opTimeStart', 'opTimeEnd'],
                    },
                },
                {
                    label: '操作人',
                    prop: 'opName',
                    searchType: 'select',
                    searchOrder: 3,
                    searchConfig: {
                        initialValue: -1,
                        selectEnum: [
                            {
                                label: '全部',
                                value: -1,
                            },
                            {
                                label: '操作人1',
                                value: 1,
                            },
                            {
                                label: '操作人2',
                                value: 2,
                            },
                            {
                                label: '操作人3',
                                value: 3,
                            },
                        ],
                    },
                },
                {
                    label: '实收金额',
                    prop: 'realAmount',
                    slotName: 'price',
                },
                {
                    label: '操作详情',
                    prop: 'opDetail',
                },
            ],
            dataSource: [
                {
                    displayName: '金桂英',
                    cardType: '30次卡',
                    cardNo: '10001',
                    cardStatus: '已开卡',
                    createTime: '1972-04-10',
                    photo: 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
                    tel: '135****4478',
                    opType: '批量延卡',
                    opTime: '2019-01-01',
                    opName: '操作人1',
                    realAmount: 1500,
                    opDetail: '批量延卡1天',
                },
            ],
        };
    },
    methods: {},
};
</script>
