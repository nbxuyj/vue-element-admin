<style lang="scss" scoped>
.step-notice {
    font-size: 13px;
    color: #676a6c;
}
</style>

<template>
    <div class="app-container">
        <el-card style="margin-bottom: 20px;" shadow="never">
            <span slot="header">导入步骤</span>
            <el-steps direction="vertical" :space="100">
                <el-step title="下载会员卡导入的模板文件">
                    <el-button slot="description" round plain type="primary">下载Excel模版</el-button>
                </el-step>
                <el-step title="按照说明填写数据">
                    <el-button slot="description" round plain type="primary">查看数据填写格式</el-button>
                </el-step>
                <el-step title="导入填写好的Excel文件">
                    <el-button slot="description" round type="primary">上传Excel文件</el-button>
                </el-step>
            </el-steps>
        </el-card>

        <el-card shadow="never">
            <span slot="header">导入须知</span>
            <div class="step-notice">
                <p>1. 模版中带“*”的都是必须填写的内容</p>
                <p>2. 系统中会员手机号为唯一标识，不能多个会员共用一个手机号（手机号相同姓名不同的会员或者没有手机号的会员时可以使用临时号码，临时号码使用规则请联系菠菜客服确认。 ）</p>
                <p>3. 导入会员卡数据时需要判断会员卡的状态：未开卡「0」，已开卡「1」，已停卡「2」，过期「3」。（未开卡：开始日期大于当前日期；已开卡：结束日期大于当前日期；过期：结束日期小于当前日期；）</p>
                <p>4. 导入会员卡数据不能只有开始日期没有结束日期。结束日期可以根据卡的类型来推断，如一年卡：开始日期为2019/12/12，那么卡的结束日期为2020/12/12</p>
                <p>5. 导入数据的时间格式必须是日期格式，例如：2019/12/12或2019-12-12</p>
                <p>6. 导入数据包含会籍顾问/私人教练时应确认在系统里已经加入了对应的会籍顾问/私人教练</p>
                <p>7. 导入数据里的卡种/课程名称要与系统中的卡种/课程名称相同</p>
                <p>8. 导入单个文件最多支持1000条数据，超过1000条数据需要分多个文件导入</p>
                <p>9. 批量导入的会员卡不计入会籍业绩和场馆业绩</p>
                <p>10. 批量导入的会员卡无法批量删除</p>
                <p>11. 导入数据之后，需核对数据是否正确，可以对数据进行抽样对比</p>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'ImportMemberCard',
    data() {
        return {};
    },
    methods: {},
};
</script>
