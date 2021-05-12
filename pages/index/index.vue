<template>
	<view class="content">
		<view class="mapview">
			<map id="map1" :scale='15' :latitude="latitude" :longitude="longitude" :markers="markers"
				show-location></map>

			<!-- <web-view src="http://park.dtly.cn:8081/dt.jspx"></web-view> -->

		</view>
		<view class="botton">
			<view class="txt"><text space="nbsp" style="color: #333333; font-size:40rpx">名称:{{title}}</text><text space="nbsp">地址:{{address}}</text>
			</view>
			<view class="img" @click="go">
				<image src="../../static/go.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				latitude: 0,
				longitude: 0,
				latitude2: 0,
				title: '',
				address: '',
				longitude2: 0,
				markers: [{
					id: 1,
					latitude: 0,
					longitude: 0,
					iconPath: '../../static/dingwei.png',
					width: 35,
					height: 35,

				}],
				mapctx: {},


			}
		},
		// onReady() {
		// 	// 显示页面
		// 	this.mapctx = uni.createMapContext('map1');
		// },
		onLoad() {

			this.getLocationInfo1();
			this.getcarparkInfo();

		},
		onShareAppMessage: function() {
			// console.log('App Hide')
		},
		methods: {
			getLocationInfo1() {
				var _that = this;
				uni.getLocation({
					type: 'gcj02',
					success(res) {
						console.log(res, "当前位置");
						// _that.toLocation(res)
						_that.latitude = res.latitude;
						_that.longitude = res.longitude;
						// _that.mapctx.includePoints({
						// 	// padding: [140, 800, 200, 100],
						// 	// padding:['50','50','60','50'],
						// 	padding: ['200', '70', '140 ', '70'],
						// 	points: [{
						// 			latitude: _that.latitude,
						// 			longitude: _that.latitude
						// 		},
						// 		{
						// 			latitude: _that.markers[0].latitude,
						// 			longitude: _that.markers[0].longitude
						// 		}
						// 	]
						// })

					}
				});

			},

			// 获取停车场位置
			getcarparkInfo() {
				let _that = this;
				uni.request({

					url: 'https://m.zjjiyu.cn/dongtou_park/park_data.jspx',
					method: 'GET',
					contentType: 'application/json',
					dataType: 'json',
					data: {

					},
					success: (res) => {
						console.log('success');
						_that.latitude2 = res.data.data.latitude;
						_that.longitude2 = res.data.data.longitude;
						_that.address = res.data.data.address;
						_that.title = res.data.data.name;
						_that.totalspace = res.data.data.totalLots;
						_that.leavings = res.data.data.emptyLots;
						_that.markers[0].latitude = res.data.data.latitude;
						_that.markers[0].longitude = res.data.data.longitude;
						console.log('success');

						//一定要Float
						// uni.openLocation({
						// 	latitude: parseFloat(_that.latitude),
						// 	longitude: parseFloat(_that.longitude),
						// 	success: function() {
						// 		console.log('success');
						// 	}
						// });
					}
				})

			},
			go() {
				uni.openLocation({
					latitude: parseFloat(this.markers[0].latitude),
					longitude: parseFloat(this.markers[0].longitude),
					scale: 18,
				});

			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items:center;

	}

	.mapview {
		display: flex;
		width: 750rpx;
		height: 900rpx;


	}

	.mapview map {
		display: flex;
		width: 750rpx;
		height: 900rpx;
	}

	.botton {
		display: flex;
		flex-direction: row;
		margin: 50rpx 0;
		border-bottom: 2rpx solid #999999;

		.img {
			width: 80rpx;
			height: 100rpx;

			image {
				width: 80rpx;
				height: 80rpx;
			}
		}
	}

	.txt {
		display: flex;
		padding-left: 30rpx;
		color: #808080;
		width: 620rpx;
		height: 100rpx;

		font-size: 28rpx;

		flex-wrap: wrap;
		
	}
</style>
</style>
