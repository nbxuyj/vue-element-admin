<style lang="scss" scoped>
.card-box {
    text-align: center;
    margin-bottom: 50px;
    cursor: pointer;
}
.card-box i {
    font-size: 50px;
    // color: primary-color;
}
.card-box h3 {
    color: #676a6c;
}
.card-box p {
    font-size: 14px;
    color: #676a6c;
}
</style>

<template>
    <div class="app-container">
        <el-row :gutter="50">
            <el-col v-for="(item, index) in cardList" :key="index" :span="8">
                <el-card class="card-box">
                    <i :class="item.icon" />
                    <h3>{{ item.title }}</h3>
                    <p>{{ item.desc }}</p>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'index',
    data() {
        return {
            cardList: [
                {
                    icon: 'el-icon-date',
                    title: '预约',
                    desc: '课表管理, 课程预约/代约等',
                },
                {
                    icon: 'el-icon-bank-card',
                    title: '会员卡',
                    desc: '办卡，续卡，扣卡，请假等',
                },
                {
                    icon: 'el-icon-user',
                    title: '会员',
                    desc: '查看，修改会员信息等',
                },
                {
                    icon: 'el-icon-coordinate',
                    title: '准会员',
                    desc: '添加准会员信息等',
                },
                {
                    icon: 'el-icon-shopping-cart-full',
                    title: '商品',
                    desc: '购买商品/服务/场地, 退货等',
                },
            ],
        };
    },
    methods: {},
};
</script>