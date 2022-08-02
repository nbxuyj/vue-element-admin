import Layout from '@/layout';

const memberManageRouter = {
	path: '/memberManage',
	component: Layout,
	redirect: 'noRedirect',
	name: 'MemberManage',
	meta: {
		title: '会员管理',
		icon: 'el-icon-user',
	},
	children: [
		{
			path: 'memberList',
			component: () =>
				import('@/views/memberManage/memberList/index.vue'),
			name: 'MemberListTab',
			meta: { title: '会员列表' },
		},
		{
			path: 'readyMemberList',
			component: () =>
				import('@/views/memberManage/readyMemberList/index.vue'),
			name: 'ReadyMemberList',
			meta: { title: '准会员列表' },
		},
		{
			path: 'buy',
			component: () => import('@/views/memberManage/buyMemberCard.vue'),
			name: 'BuyMemberCard',
			meta: { title: '购买会员卡', noCache: true },
			hidden: true,
		},
		{
			path: 'import',
			component: () =>
				import('@/views/memberManage/importMemberCard.vue'),
			name: 'ImportMemberCard',
			meta: { title: '导入会员卡', noCache: true },
			hidden: true,
		},
		{
			path: 'memberDetail',
			component: () =>
				import('@/views/memberManage/memberList/memberDetail.vue'),
			name: 'MemberDetail',
			meta: { title: '会员详情', noCache: true },
			hidden: true,
		},
		{
			path: 'batchMemberCardExtend',
			component: () =>
				import(
					'@/views/memberManage/memberList/batchMemberCardExtend.vue'
				),
			name: 'BatchMemberCardExtend',
			meta: { title: '批量延卡/扣卡', noCache: true },
			hidden: true,
		},
		{
			path: 'memberCardOpLog',
			component: () =>
				import('@/views/memberManage/memberList/memberCardOpLog.vue'),
			name: 'MemberCardOpLog',
			meta: { title: '会员卡操作记录', noCache: true },
			hidden: true,
		},
		{
			path: 'editMemberDetail',
			component: () =>
				import('@/views/memberManage/memberList/editMemberDetail.vue'),
			name: 'EditMemberDetail',
			meta: { title: '编辑会员详情', noCache: true },
			hidden: true,
		},
	],
};

export default memberManageRouter;
