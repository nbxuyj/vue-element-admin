import request from '@/utils/request';

export function pseudoPhone(data) {
	// return new Promise((resolve, reject) => {
	// 	request({
	// 		url: '/vue-element-admin/member/pseudoPhone',
	// 		method: 'get',
	// 		data,
	// 	})
	// 		.then((res) => {
	// 			setTimeout(() => {
	// 				resolve(res);
	// 			}, 3000);
	// 		})
	// 		.catch((err) => reject(err));
	// });
	return request({
		url: '/vue-element-admin/member/pseudoPhone',
		method: 'get',
		data,
	});
}

export function getMemberList(data) {
	return new Promise((resolve, reject) => {
		request({
			url: '/vue-element-admin/member/list',
			method: 'post',
			data,
		})
			.then((res) => {
				setTimeout(() => {
					resolve(res);
				}, 500);
			})
			.catch((err) => reject(err));
	});
}
