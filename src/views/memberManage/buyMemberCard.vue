<style lang="scss" scoped>
.buy-container {
    padding-bottom: 70px;
    display: flex;
}
.member-box {
    width: 500px;
}
.member-card-box {
    flex: 1;
    margin-left: 20px;
}
.edit-contact-box {
    .el-form-item {
        margin-bottom: 22px;
    }
    .el-card__header > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}

.avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}

::v-deep .el-alert {
    padding: 0 10px;
    background: #f6ffed;
    border: 1px solid #b7eb8f;
}
</style>

<template>
    <div class="app-container buy-container">
        <el-card class="member-box" shadow="never">
            <span slot="header">会员信息</span>
            <el-form ref="form" label-width="80px" :model="form">
                <!-- 手机号 -->
                <el-form-item
                    label="手机号"
                    prop="phone"
                    :rules="{ required: true, message: '请输入手机号', trigger: 'blur' }"
                >
                    <el-input
                        v-model="form.phone"
                        placeholder="手机号或姓名查询"
                        maxlength="11"
                        style="width: 242px; margin-right: 10px;"
                    />
                    <el-button plain type="primary" @click="generateTemporaryNumber">生成临时号码</el-button>
                </el-form-item>

                <!-- 姓名 -->
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name" maxlength="10" placeholder="姓名" />
                </el-form-item>

                <!-- 联系人 -->
                <el-form-item label="联系人" prop="contact">
                    <el-input
                        v-if="form.contact && !editContact"
                        v-model="form.contact"
                        readonly
                        suffix-icon="el-icon-caret-bottom"
                        @click.native="toggleEditContact"
                    />
                    <el-button
                        v-else-if="!form.contact && !editContact"
                        plain
                        type="primary"
                        @click="toggleEditContact"
                    >
                        <i class="el-icon-plus" />
                        <span>添加联系人</span>
                    </el-button>

                    <!-- 联系人表单 -->
                    <el-card
                        v-else-if="editContact"
                        shadow="never"
                        header="联系人信息"
                        class="edit-contact-box"
                    >
                        <div slot="header" class>
                            <span>联系人信息</span>
                            <i class="el-icon-caret-top" />
                        </div>
                        <el-form ref="contactForm" label-width="90px" :model="contactForm">
                            <el-form-item
                                label="关系"
                                prop="linkmanType"
                                :rules="{ required: true, message: '请选择关系', trigger: 'change' }"
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
                                <el-input
                                    v-model="contactForm.linkmanName"
                                    maxlength="11"
                                    placeholder="请输入姓名"
                                />
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
                        <el-row type="flex" justify="end" :gutter="20">
                            <el-button @click="toggleEditContact">取消</el-button>
                            <el-button type="primary" @click="confirmEditContact">确定</el-button>
                        </el-row>
                    </el-card>
                </el-form-item>

                <!-- 会员照片 -->
                <el-form-item label="会员照片" prop="photo">
                    <img v-if="form.photo" :src="form.photo" class="avatar" />
                    <el-avatar v-else icon="el-icon-user-solid" :size="100" />
                    <el-row type="flex">
                        <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                        >
                            <el-button plain type="primary">上传</el-button>
                        </el-upload>
                        <el-button plain type="primary" style="margin-left: 10px;">拍照</el-button>
                    </el-row>
                </el-form-item>

                <!-- 性别 -->
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="form.sex">
                        <el-radio
                            v-for="item in sexList"
                            :key="item.value"
                            :label="item.value"
                        >{{ item.label }}</el-radio>
                    </el-radio-group>
                </el-form-item>

                <!-- 来源 -->
                <el-form-item label="来源" prop="source">
                    <el-select
                        v-model="form.source"
                        clearable
                        style="width: 100%;"
                        placeholder="请选择来源"
                    >
                        <el-option
                            v-for="item in sourceList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>

                <!-- 证件类型 -->
                <el-form-item label="证件类型" prop="idType">
                    <el-select
                        v-model="form.idType"
                        clearable
                        style="width: 100%;"
                        placeholder="请选择证件类型"
                    >
                        <el-option
                            v-for="item in idTypeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>

                <!-- 证件号 -->
                <el-form-item label="证件号" prop="idNumber" v-if="form.idType">
                    <el-input v-model="form.idNumber" placeholder="证件号" />
                </el-form-item>

                <!-- 证件照 -->
                <el-form-item label="证件照" prop="idPhoto" v-if="form.idType">
                    <el-row type="flex">
                        <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleIdPhotoSuccess"
                        >
                            <el-button plain type="primary">上传</el-button>
                        </el-upload>
                        <el-button plain type="primary" style="margin-left: 10px;">拍照</el-button>
                        <el-button plain @click="toggleIdPhotoViewer">查看</el-button>
                        <image-viewer
                            v-if="showIdPhotoViewer"
                            :on-close="toggleIdPhotoViewer"
                            :url-list="[form.idPhoto]"
                        />
                    </el-row>
                </el-form-item>

                <!-- 生日 -->
                <el-form-item label="生日" prop="birthday">
                    <el-date-picker
                        v-model="form.birthday"
                        type="date"
                        placeholder="选择日期"
                        style="width: 100%;"
                    />
                </el-form-item>

                <!-- 地址 -->
                <el-form-item label="地址" prop="address">
                    <el-input v-model="form.address" placeholder="详细地址" />
                </el-form-item>

                <!-- 备注 -->
                <el-form-item label="备注" prop="notes">
                    <el-input v-model="form.notes" type="textarea" rows="2" placeholder="备注" />
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="member-box member-card-box" shadow="never">
            <span slot="header">会员卡信息</span>
            <el-form
                ref="memberCardForm"
                label-width="80px"
                :model="memberCardForm"
                style="width: 500px;"
            >
                <!-- 会员卡 -->
                <el-form-item
                    label="会员卡"
                    prop="memberCard"
                    :rules="{ required: true, message: '请选择会员卡', trigger: 'change' }"
                >
                    <el-select
                        v-model="memberCardForm.memberCard"
                        clearable
                        filterable
                        style="width: 100%;"
                        placeholder="请选择会员卡"
                        @change="changeMemberCard"
                    >
                        <el-option
                            v-for="item in memberCardList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>

                <!-- 会员卡号 -->
                <el-form-item label="会员卡号" prop="memberCardNumber">
                    <el-input
                        v-model="memberCardForm.memberCardNumber"
                        placeholder="会员卡号"
                        style="width: calc(60% - 10px); margin-right: 10px;"
                    />
                    <el-input
                        v-model="memberCardForm.icAndIdNumber"
                        placeholder="IC/ID号"
                        style="width: 40%;"
                    />
                </el-form-item>

                <!-- 卡内次数卡内金额 -->
                <el-form-item v-if="memberCardForm.memberCard" label="卡内次数" prop="times">
                    <el-input v-model="memberCardForm.times" style="width: 100%;" disabled>
                        <i slot="suffix" style="margin-right: 10px;">次</i>
                    </el-input>
                </el-form-item>

                <!-- 赠送 -->
                <el-form-item v-if="memberCardForm.memberCard" label="卡内次数" prop="give">
                    <el-input v-model="memberCardForm.give" style="width: 100%;">
                        <i slot="suffix" style="margin-right: 10px;">次</i>
                    </el-input>
                </el-form-item>

                <!-- 赠送 -->
                <el-form-item v-if="memberCardForm.memberCard" label="卡内次数" prop="expiryDate">
                    <el-input v-model="memberCardForm.expiryDate" style="width: 100%;" disabled>
                        <i slot="suffix" style="margin-right: 10px;">天</i>
                    </el-input>
                </el-form-item>

                <!-- 办卡日期 -->
                <el-form-item label="办卡日期" prop="handleCardDate">
                    <el-date-picker
                        v-model="memberCardForm.handleCardDate"
                        type="date"
                        placeholder="选择日期"
                        style="width: 100%;"
                    />
                </el-form-item>

                <!-- 开卡方式 -->
                <el-form-item v-if="memberCardForm.memberCard" label="开卡方式" prop="openCardType">
                    <el-select
                        v-model="memberCardForm.openCardType"
                        clearable
                        style="width: 100%;"
                        placeholder="请选择开卡方式"
                    >
                        <el-option
                            v-for="item in openCardTypeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>

                <!-- 有效时间 -->
                <el-form-item label="有效时间" prop="validDate">
                    <el-date-picker
                        v-model="memberCardForm.validDate"
                        type="daterange"
                        placeholder="有效时间"
                        style="width: 100%;"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    />
                </el-form-item>

                <!-- 办卡金额 -->
                <el-form-item
                    label="办卡金额"
                    prop="money"
                    :rules="{ required: true, message: '请输入办卡金额', trigger: 'blur' }"
                >
                    <el-input
                        v-model="memberCardForm.money"
                        style="width: 100%;"
                        placeholder="办卡金额"
                    >
                        <i slot="suffix" style="margin-right: 10px;">元</i>
                    </el-input>
                </el-form-item>

                <!-- 支付方式 -->
                <el-form-item
                    label="支付方式"
                    prop="payment"
                    :rules="{ required: true, message: '请选择支付方式', trigger: 'change' }"
                >
                    <el-select
                        v-model="memberCardForm.payment"
                        clearable
                        style="width: 100%;"
                        placeholder="请选择支付方式"
                    >
                        <el-option
                            v-for="item in paymentList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>

                <!-- 支付方式1 -->
                <el-form-item label="支付1" prop="payment1" v-if="memberCardForm.payment === 5">
                    <el-select
                        v-model="memberCardForm.payment1"
                        clearable
                        style="width: 100%;"
                        placeholder="请选择支付方式"
                    >
                        <el-option
                            v-for="item in paymentList.filter(item => item.label !== '组合支付')"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>

                <!-- 支付1金额 -->
                <el-form-item label="支付1金额" prop="money1" v-if="memberCardForm.payment === 5">
                    <el-input
                        v-model="memberCardForm.money1"
                        style="width: 100%;"
                        placeholder="支付1金额"
                    >
                        <i slot="suffix" style="margin-right: 10px;">元</i>
                    </el-input>
                </el-form-item>

                <!-- 支付方式2 -->
                <el-form-item label="支付2" prop="payment2" v-if="memberCardForm.payment === 5">
                    <el-select
                        v-model="memberCardForm.payment2"
                        clearable
                        style="width: 100%;"
                        placeholder="请选择支付方式"
                    >
                        <el-option
                            v-for="item in paymentList.filter(item => item.label !== '组合支付')"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>

                <!-- 支付2金额 -->
                <el-form-item label="支付2金额" prop="money2" v-if="memberCardForm.payment === 5">
                    <el-input
                        v-model="memberCardForm.money2"
                        style="width: 100%;"
                        placeholder="支付2金额"
                    >
                        <i slot="suffix" style="margin-right: 10px;">元</i>
                    </el-input>
                </el-form-item>

                <!-- 销售类型 -->
                <el-form-item label="销售类型" prop="sellType">
                    <el-select
                        v-model="memberCardForm.sellType"
                        clearable
                        style="width: 100%;"
                        placeholder="请选择销售类型"
                    >
                        <el-option
                            v-for="item in sellTypeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>

                <!-- 销售人 -->
                <el-form-item label="销售人" prop="sellPerson">
                    <el-alert
                        v-if="memberCardForm.money && isFinite(memberCardForm.money)"
                        :title="`本次业绩为:${memberCardForm.money}元(定金业绩:0.0,储值卡消费业绩:0)`"
                        type="info"
                        show-icon
                        :closable="false"
                        style="margin-bottom: 10px;"
                    />
                    <el-row>
                        <el-input
                            v-model="memberCardForm.sellPerson"
                            type="text"
                            placeholder="主销售人"
                            style="width: calc(40% - 10px); margin-right: 10px;"
                        />
                        <el-input
                            placeholder="请输入内容"
                            v-model="memberCardForm.scaleValue"
                            style="width: 60%;"
                        >
                            <el-select
                                v-model="memberCardForm.scale"
                                slot="prepend"
                                placeholder="选比例"
                                style="width: 100px;"
                                @change="changeScaleValue"
                            >
                                <el-option
                                    v-for="item in scaleList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                />
                            </el-select>
                        </el-input>
                    </el-row>
                </el-form-item>

                <!-- 备注 -->
                <el-form-item label="备注" prop="notes">
                    <el-input
                        v-model="memberCardForm.notes"
                        type="textarea"
                        rows="2"
                        placeholder="备注"
                    />
                </el-form-item>
            </el-form>
        </el-card>

        <base-footer-tool-bar>
            <el-row slot="extraComponent" :gutter="20">
                <el-col>
                    <el-button round type="warning">扫码收款</el-button>
                    <el-button round type="primary">保存</el-button>
                    <el-button round plain @click="goBack">取消</el-button>
                </el-col>
            </el-row>

            <el-button slot="extraRightComponent" round plain type="primary">保存并继续添加</el-button>
        </base-footer-tool-bar>
    </div>
</template>

<script>
import { pseudoPhone } from '@/api/member';
import imageViewer from 'element-ui/packages/image/src/image-viewer';
import {
    linkmanTypeList,
    sexList,
    isEmergencyContactList,
    memberCardTypeList,
    idTypeList,
    sourceList
} from '@/utils/dictionary';

export default {
    name: 'BuyMemberCard',
    components: { imageViewer },
    data() {
        return {
            showIdPhotoViewer: false,
            editContact: false,
            form: {
                phone: '',
                name: '',
                contact: '',
                photo: '',
                sex: 0,
                source: '',
                idType: '',
                idNumber: '',
                idPhoto: '',
                birthday: '',
                address: '',
                notes: '',
            },
            contactForm: {
                linkmanType: '',
                linkmanPhone: '',
                linkmanName: '',
                linkmanSex: 0,
                isEmergencyContact: false,
            },
            memberCardForm: {
                memberCard: '',
                memberCardNumber: '',
                times: '',
                give: 0,
                expiryDate: '',
                icAndIdNumber: '',
                handleCardDate: '',
                validDate: '',
                money: '',
                payment: '',
                payment1: '',
                money1: '',
                payment2: '',
                money2: '',
                sellType: '',
                sellPerson: '',
                scale: '',
                scaleValue: '',
                notes: '',
            },
            linkmanTypeList,
            sexList,
            isEmergencyContactList,
            sourceList,
            idTypeList,
            memberCardList: memberCardTypeList,
            paymentList: [
                {
                    label: '刷卡支付',
                    value: 1,
                },
                {
                    label: '现金',
                    value: 2,
                },
                {
                    label: '支付宝',
                    value: 3,
                },
                {
                    label: '微信',
                    value: 4,
                },
                {
                    label: '组合支付',
                    value: 5,
                },
                {
                    label: '其他',
                    value: 6,
                },
                {
                    label: '其他1',
                    value: 7,
                },
                {
                    label: '其他2',
                    value: 8,
                },
            ],
            sellTypeList: [
                {
                    label: '新卡',
                    value: 1,
                },
                {
                    label: '续卡',
                    value: 2,
                },
            ],
            scaleList: [
                {
                    label: '5%',
                    value: 0.05,
                },
                {
                    label: '10%',
                    value: 0.1,
                },
                {
                    label: '15%',
                    value: 0.15,
                },
                {
                    label: '20%',
                    value: 0.2,
                },
                {
                    label: '25%',
                    value: 0.25,
                },
                {
                    label: '30%',
                    value: 0.3,
                },
                {
                    label: '35%',
                    value: 0.35,
                },
                {
                    label: '40%',
                    value: 0.4,
                },
                {
                    label: '45%',
                    value: 0.45,
                },
                {
                    label: '50%',
                    value: 0.5,
                },
                {
                    label: '55%',
                    value: 0.55,
                },
                {
                    label: '60%',
                    value: 0.6,
                },
                {
                    label: '65%',
                    value: 0.65,
                },
                {
                    label: '70%',
                    value: 0.7,
                },
                {
                    label: '75%',
                    value: 0.75,
                },
                {
                    label: '80%',
                    value: 0.8,
                },
                {
                    label: '85%',
                    value: 0.85,
                },
                {
                    label: '90%',
                    value: 0.9,
                },
                {
                    label: '95%',
                    value: 0.95,
                },
                {
                    label: '100%',
                    value: 1,
                },
            ],
            openCardTypeList: [
                {
                    label: '立即开卡',
                    value: 1,
                },
                {
                    label: '指定天数内开卡',
                    value: 2,
                },
                {
                    label: '指定日期内开卡',
                    value: 3,
                },
                {
                    label: '首次使用开卡',
                    value: 4,
                },
            ],
        };
    },
    watch: {
        'memberCardForm.money'(value) {
            if (value && isFinite(value) && this.memberCardForm.scale) {
                this.memberCardForm.scaleValue =
                    value * this.memberCardForm.scale;
            }
        },
    },
    methods: {
        generateTemporaryNumber() {
            pseudoPhone().then((res) => {
                this.form.phone = res.data;
            });
        },
        toggleEditContact() {
            this.editContact = !this.editContact;
        },
        confirmEditContact() {
            const { linkmanName, linkmanPhone } = this.contactForm;
            if (linkmanName && linkmanPhone) {
                this.form.contact = `${this.contactForm.linkmanName}（${this.contactForm.linkmanPhone}）`;
            }
            this.toggleEditContact();
        },
        changeScaleValue() {
            const { money } = this.memberCardForm;
            if (money && isFinite(money)) {
                this.memberCardForm.scaleValue =
                    money * this.memberCardForm.scale;
            } else {
                this.memberCardForm.scaleValue = '';
            }
        },
        changeMemberCard(value) {
            console.log(value);
            /** 只处理30次卡 */
            if (value === 7) {
                this.memberCardForm.times = 30;
                this.memberCardForm.expiryDate = 30;
                this.memberCardForm.money = 300;
            }
        },
        handleAvatarSuccess(res, file) {
            this.form.photo = URL.createObjectURL(file.raw);
        },
        handleIdPhotoSuccess(res, file) {
            this.form.idPhoto = URL.createObjectURL(file.raw);
        },
        toggleIdPhotoViewer() {
            this.showIdPhotoViewer = !this.showIdPhotoViewer;
        },
        goBack() {
            this.$router.go(-1);
        },
    },
};
</script>
