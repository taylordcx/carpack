<template>
	<view class="container">
		<view class="img">
			<image src="../../static/login/user.png"></image>
		</view>
		<view class="user"><input v-model="us" value="us" placeholder="请输入用户名"></view>
		<view class="user" style="margin-top: 50rpx;"><input v-model="pwd" value="pwd" password="true"
				placeholder="请输入密码"></view>
		<view class="login"><button @click="goindex">登录</button></view>
		<!-- <u-modal v-model="show" :content="content"></u-modal> -->

	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				us: '',
				pwd: '',
				msg: '',
				show: false,
				content: '',



			}
		},
		onShareAppMessage: function() {
			// console.log('App Hide')
		},
		methods: {


			goindex() {
				let that = this;
				uni.request({
					url: 'https://m.zjjiyu.cn/dongtou_park/awardLogin_park.jspx',
					method: 'POST',
					contentType: 'application/json',
					dataType: 'json',
					data: {
						"username": that.us,
						"password": that.pwd,
						"type": 1
					},
					success: (res) => {
						if (!res.data.success) {

							uni.showToast({
								title: res.data.message + ',请重新输入',
								icon: 'none'
							});

						} else {
							//用户id
							uni.setStorage({
								key: 'usersId',
								data: res.data.usersId,
								success: function() {
									console.log('success');
								}
							});
							//民宿照片
							uni.setStorage({
								key: 'usersImgMS',
								data: res.data.userimg,
								success: function() {
									console.log(res.data.userimg);
								}
							});

							//民宿名
							uni.setStorage({
								key: 'usersNMS',
								data: res.data.username,
								success: function() {
									console.log('success');
								}
							});
							uni.setStorage({
								key: 'username',
								data: that.us,
								success: function() {
									console.log('success');
								}
							});
							console.log('ss11');
							uni.switchTab({


								url: '/pages/vehiclemg/vehiclemg'
							})

						}
					}
				})



			},

			// uni.setStorage({
			// 	key: 'usernamae',
			// 	data: 'this.us',
			// 	success: function() {
			// 		console.log('success');
			// 	}
			// });

		}
	}
</script>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.img {
		display: flex;
		margin-top: 80rpx;
		margin-bottom: 110rpx;

		image {
			width: 180rpx;
			height: 180rpx;
		}
	}

	.user {
		width: 600rpx;
		height: 100rpx;


	}

	.user input {
		width: 100%;
		height: 100%;
		border-bottom: 4rpx solid #eeeeee;
	}

	.login {
		display: flex;
		width: 600rpx;
		height: 100rpx;
		margin-top: 180rpx;
		border-radius: 90rpx;
	}

	.login button {
		width: 600rpx !important;
		height: 100rpx;
		background-color: #569aff;
		color: white;
		border-radius: 90rpx;
	}
</style>
