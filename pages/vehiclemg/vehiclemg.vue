<template>
	<view class="container">
		<view class="img">
			<!-- 		<image src="../../static/login/user.png"></image> -->
			<image v-if="show===true" :src="'https://m.zjjiyu.cn/dongtou_park/'+usersImg"></image>
			<image v-else src="../../static/login/user.png"></image>
			<text v-model="Musername">{{Musername}}</text>
		</view>
		<view class="btn">
			<button v-model="show" :style="{'background-color':show=='1'?'#569aff':''}"
				@click="getTrue">有效</button><button v-model="show" @click="getFalse"
				:style="{'background-color':show=='2'?'#569aff':''}">失效</button>
		</view>
		<view class="main" v-for="(list,i) in information" :key="list.id">
			<view class="header">
				<view class="top"><text>{{list.carnum}}</text>
					<!-- <text
						:style="{'background-color':type==1?'#3cbd60':'#5686f2'}">新</text> -->
				</view>
				<view class="font">
					<text v-if="showDelete" @click="deletelist(list.id,list.otherId,list.beginTime,list.endTime)">删除</text>
				</view>
			</view>
			<view class="box">
				<ul class="left">
					<li><text>车主姓名:</text><text>{{list.userName}}</text></li>
					<li><text space="nbsp">开始时间:</text><text sty>{{list.beginTime}}</text></li>
					<li><text space="nbsp">结束时间:</text><text>{{list.endTime}}</text></li>

					<!-- <li><text>车主编号:</text><text>{{list.userNo}}</text></li> -->
				</ul>
			</view>
		</view>
		<view class="add">
			<button :plain="sw " @click="goadd()">+ 添加车辆</button>
		</view>
		<view class="txt">
			<text style="color: red;">限制{{count}}个车辆</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 1,
				Musername: '',
				usersImg: '',
				information: [],
				count: '',
				show: '1',
				uid: '',
				sw: true,
				img: "../../static/login/user.png",
				show:true,
				showDelete:false
			}
		},
		onShareAppMessage: function() {
			// console.log('App Hide')
		},
		onLoad() {

			uni.getStorage({
				key: 'usersId',
				fail: function(res) {
					console.log(res);
					uni.navigateTo({
						url: "/pages/login/login"
					})
					uni.showToast({
						title: '请先登录',
						duration: 1000
					});
				},

			});
			

		},


		onShow() {
			let _that = this;
			uni.getStorage({
				key: 'usersId',
				fail: function(res) {
					console.log(res);
					uni.navigateTo({
						url: "/pages/login/login"
					})
					uni.showToast({
						title: '请先登录',
						duration: 1000
					});
				},
			
			});
			// console.log(_that.show + '11221');
			uni.getStorage({
				key: 'usersImgMS',
				success: function(res) {
					_that.usersImg = res.data;
					console.log(_that.show + '11221');
					if(_that.usersImg==''){
						_that.show=false;
						// console.log(_that.usersImg + '11111');
						// console.log(_that.show + '11221');
					}
					

				},
				fail: (res) => {
					_that.show=false;
				}
			});
		
			
			
			uni.getStorage({
				key: 'usersNMS',
				success: function(res) {
					_that.Musername = res.data;
					_that.getTrue();
				}
			});



		},

		methods: {
			// getrequst() {
			// 	let _that = this
			// 	uni.getStorage({
			// 		key: 'usersId',
			// 		fail: function(res) {
			// 			console.log(res);
			// 			uni.navigateTo({
			// 				url: "/pages/login/login"
			// 			})
			// 		},
			// 		success: function(res) {
			// 			_that.userid = res.data;

			// 			uni.request({

			// 				url: 'https://m.zjjiyu.cn/dongtou_park/park_apply_list.jspx',
			// 				method: 'POST',
			// 				contentType: 'application/json',
			// 				dataType: 'json',
			// 				data: {

			// 					"usersId": _that.userid,
			// 					"valid": _that.show
			// 				},
			// 				success: (res) => {

			// 					_that.information = res.data.data;

			// 					_that.count = res.data.validSetNum;
			// 					// console.log(_that.information.length)

			// 					// if(_that.count==_that.information.length){
			// 					// 	_that.sw=true;
			// 					// 	uni.showToast({
			// 					// 	    title: '已到达车辆数量，不可添加',
			// 					// 	    duration: 2000
			// 					// 	});
			// 					// 	console.log(_that.count)


			// 				}

			// 			})
			// 		}
			// 	});
			// },

			goadd() {
				let _that = this;
				if (_that.count == _that.information.length) {

					uni.showToast({
						title: '已到达车辆数量，不可添加',
						duration: 2000
					});
				} else {
					uni.navigateTo({
						url: '/pages/woke-inputCar/woke-inputCar'
					})
				}
			},
			// 有效
			getTrue() {
				let _that = this;
				_that.show = '1';
				_that.showDelete=false;
				uni.getStorage({
					key: 'usersId',
					success: function(res) {
						_that.userid = res.data;
						uni.request({
							url: 'https://m.zjjiyu.cn/dongtou_park/park_apply_list.jspx',
							method: 'POST',
							contentType: 'application/json',
							dataType: 'json',
							data: {

								"usersId": _that.userid,
								"valid": _that.show
							},
							success: (res) => {
								_that.information = res.data.data;
								console.log(res.data)
								_that.count = res.data.validSetNum
								console.log(_that.information.length)

								if (_that.count == _that.information.length) {
									_that.sw = false;
								} else {
									_that.sw = true;
								}

							}

						})
					},
				fail: function(res) {
					console.log(res);
					uni.navigateTo({
						url: "/pages/login/login"
					})
					uni.showToast({
						title: '请先登录',
						duration: 1000
					});
				}
				});
			},
			// 失效
			getFalse() {
				let _that = this;
				_that.show = '2';
				_that.showDelete=true;
				// alert(_that.show);
				uni.getStorage({
					key: 'usersId',
					success: function(res) {
						_that.userid = res.data;
						uni.request({

							url: 'https://m.zjjiyu.cn/dongtou_park/park_apply_list.jspx',
							method: 'POST',
							contentType: 'application/json',
							dataType: 'json',
							data: {
								"usersId": _that.userid,
								"valid": _that.show
							},
							success: (res) => {

								_that.information=[];
								_that.information = res.data.data;
								console.log(_that.information);
								_that.count = res.data.validSetNum
							}

						})
					}
				});
			},
			// 删除 
			deletelist(id, otherId, btime, endTime) {
				let _that = this
				uni.getStorage({
					key: 'usersId',
					fail: function(res) {
						console.log('1' + res);
						uni.navigateTo({
							url: "/pages/login/login"
						})
					},
					success: function(res) {
						_that.userid = res.data;
						uni.showModal({
							title: '提示',
							content: '确定要删除吗？',
							success: function(res) {
								if (res.confirm) {
									uni.request({
										url: 'https://m.zjjiyu.cn/dongtou_park/park_apply.jspx',
										method: 'POST',
										contentType: 'application/json',
										dataType: 'json',
										data: {


											"usersId": _that.userid,
											"otherId": otherId,
											"beginTime": btime,
											"endTime": endTime,
											"optType": 3,
											"id": id
										},
										success: (ress) => {

											console.log(ress.data.success);
											if (ress.data.success) {
												uni.showToast({
													title: ress.data.message,
													duration: 2000
												})

											} else {
												uni.showToast({
													title: ress.data.message,
													duration: 2000
												})
											}
											_that.getTrue();

										},
										fail: (res) => {

											uni.showToast({
												title: '请求接口错误'
											});

										}


									})
									console.log('用户点击确定');
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
						// console.log('11'+_that.id);

					}
				});
			}
		}
	}
</script>

<style lang="scss">
	ul {
		list-style: none;
		padding: 0 30rpx;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #f8f8f8;
	}

	.img {
		display: flex;
		width: 750rpx;
		height: 300rpx;
		margin-bottom: 30rpx;
		flex-direction: column;
		align-items: center;
		font-size: 45rpx;
		font-weight: 500;
		background-color: #FFFFFF;
		padding-bottom: 25rpx;

		image {
			margin-top: 20rpx;
			width: 180rpx;
			height: 180rpx;
		}

	}

	.btn {

		display: flex;
		flex-direction: row;
		width: 750rpx;
		height: 100rpx;
		margin-top: 15rpx;

		button {

			display: flex;
			width: 300rpx !important;
			height: 70rpx;
			line-height: 100rpx;
			justify-content: center;
			border: none;
			align-items: center;
		}

		button:nth-child(1) {
			margin-right: 10rpx;
		}

		.active {
			border-color: "#2ca1df";

		}
	}

	.main {
		display: flex;
		flex-direction: column;
		width: 720rpx;
		height: auto;
		border-radius: 15rpx;
		background-color: #FFFFFF;
		margin-bottom: 20rpx;
		margin-top: 8rpx;

		.header {
			display: flex;
			width: 660rpx;
			height: 30%;
			border-radius: 15rpx 15 rpx 0 0;
			border-bottom: 4rpx solid #eeeeee;
			justify-content: space-between;
			align-items: center;
			padding: 0 30rpx;

			.top {
				display: flex;
				width: 660rpx;
				height: 100%;
				align-items: center;

				text:nth-child(1) {
					font-size: 60rpx;
					font-weight: 500;
				}

				text:nth-child(2) {
					margin-right: 10rpx;
					font-size: 35rpx;

				}
			}


		}
	}

	.font {
		display: flex;
		width: 100rpx !important;
		height: 60rpx !important;
		font-size: 30rpx;
		color: "#2ca1df";
		align-items: center;

	}

	.box {

		display: flex;
		width: 720rpx;
		height: 70%;

	}

	.left {
		margin-top: 15rpx;
		width: 720rpx;
		height: 100%;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		margin-bottom: 25rpx;

	}

	.left li {

		height: auto;
		width: 100%;
		font-size: 33rpx;
		color: #9f9f9f;
		align-items: center;

		text:nth-child(1) {
			margin-right: 12rpx;
		}
	}

	.add {
		display: flex;
		margin-top: 20rpx;
		width: 720rpx;
		border-radius: 15rpx;

	}

	.add button {
		width: 720rpx !important;
		border: 2rpx dashed #a7a7a7;
		color: #afafaf;
	}

	.txt {
		display: flex;
		margin-top: 15rpx;
		width: 720rpx;
		justify-content: center;
	}
</style>
