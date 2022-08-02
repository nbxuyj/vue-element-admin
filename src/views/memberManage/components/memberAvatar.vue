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
</style>

<template>
    <el-row type="flex" align="middle">
        <el-col>
            <el-image class="photo" :src="row.photo" fit="cover" />
        </el-col>
        <el-col style="text-align: left;">
            <el-row>
                <el-col>
                    <el-link
                        :underline="false"
                        @click.native="goMemberDetailPage"
                    >{{ row.displayName }}</el-link>
                </el-col>
                <el-col>
                    <span>{{ row.tel }}</span>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: 'MemberAvatar',
    props: {
        row: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {};
    },
    methods: {
        goMemberDetailPage() {
            this.$router.push('/memberManage/memberDetail');
        },
    },
};
</script>
