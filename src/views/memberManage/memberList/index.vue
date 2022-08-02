<style lang="scss" scoped>
.buy-card-btn {
    margin-right: 20px;
}
.more-action-box {
    height: 30px;
    line-height: 30px;
    padding: 0 0 0 20px;
    border-left: 1px solid #e1e1e1;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409eff;
}
</style>

<template>
    <base-tab :tab-list="tabList" :defaultActiveTabIndex="0">
        <template slot="memberCardList">
            <member-card-list />
        </template>
        <template slot="memberList">
            <member-list />
        </template>
        <template slot="extraComponent">
            <el-button
                round
                type="primary"
                icon="el-icon-folder-add"
                class="buy-card-btn"
                @click="goPage('/memberManage/buy')"
            >购买会员卡</el-button>
            <el-dropdown class="more-action-box">
                <span class="el-dropdown-link">
                    更多操作
                    <i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="goPage('/memberManage/import')">批量导入</el-dropdown-item>
                    <el-dropdown-item>导入结果查询</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </template>
    </base-tab>
</template>

<script>
import MemberCardList from './memberCardList.vue';
import MemberList from './memberList.vue';

export default {
    name: 'MemberListTab',
    components: {
        MemberCardList,
        MemberList,
    },
    data() {
        return {
            tabList: [
                {
                    label: '会员卡列表',
                    value: 'memberCardList',
                    slotName: 'memberCardList',
                },
                {
                    label: '会员列表',
                    value: 'memberList',
                    slotName: 'memberList',
                },
            ],
        };
    },
    methods: {
        goPage(url) {
            this.$router.push(url);
        },
    },
};
</script>
