<style lang="scss" scoped>
::v-deep .el-link--inner {
    text-decoration: underline;
}
</style>

<template>
    <el-link :underline="false">{{ row.cardType }}</el-link>
</template>

<script>
export default {
    name: 'MemberCardType',
    props: {
        row: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {};
    },
    methods: {},
};
</script>
