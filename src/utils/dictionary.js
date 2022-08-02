export const sourceList = [
	{
		label: '外出获取',
		value: 1,
	},
	{
		label: '个人网络(微信/QQ等)',
		value: 2,
	},
	{
		label: '会员转介绍(BR)',
		value: 3,
	},
	{
		label: '拉访(DI)',
		value: 4,
	},
	{
		label: '自然到访(WI)',
		value: 5,
	},
	{
		label: '电话咨询(TI)',
		value: 6,
	},
	{
		label: '场馆',
		value: 7,
	},
	{
		label: '大众团购',
		value: 8,
	},
	{
		label: '美团团购',
		value: 9,
	},
	{
		label: '其他',
		value: 10,
	},
];

export const idTypeList = [
	{
		label: '身份证',
		value: 1,
	},
	{
		label: '护照',
		value: 2,
	},
	{
		label: '学生证',
		value: 3,
	},
	{
		label: '其他',
		value: 4,
	},
];

export const linkmanTypeList = [
	{
		label: '家长',
		value: 1,
	},
	{
		label: '子女',
		value: 2,
	},
	{
		label: '夫妻',
		value: 3,
	},
	{
		label: '其他',
		value: 4,
	},
];

export const sexList = [
	{
		label: '男',
		value: 0,
	},
	{
		label: '女',
		value: 1,
	},
];

export const isEmergencyContactList = [
	{
		label: '是',
		value: true,
	},
	{
		label: '否',
		value: false,
	},
];

export const memberCardTypeList = [
	{
		label: '游泳月卡',
		value: 1,
	},
	{
		label: '游泳季卡',
		value: 2,
	},
	{
		label: '游泳年卡',
		value: 3,
	},
	{
		label: '1000充值卡',
		value: 4,
	},
	{
		label: '3000元充值卡',
		value: 5,
	},
	{
		label: '5000元充值卡',
		value: 6,
	},
	{
		label: '30次卡',
		value: 7,
	},
];

export const memberCardTypeListWithAll = [
	{
		label: '全部',
		value: -1,
	},
	...memberCardTypeList,
];

export const datePickerSelectOptions = [
	{
		label: '今天',
		value: '0,0',
	},
	{
		label: '昨天',
		value: '-1,-1',
	},
	{
		label: '本周',
		value: 'week',
	},
	{
		label: '本月',
		value: 'month',
	},
];

export const datePickerSelectOptionsWithAll = [
	{
		label: '全部',
		value: 'all',
	},
	...datePickerSelectOptions,
];
