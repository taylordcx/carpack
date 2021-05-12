<template>

	<view class="container">
		<view class="bd">
			<view class="left">车牌</view>
			<view>
				<plate @listenPlateChange="plateChange" />
			</view>
		</view>


		<!-- <view @click="cancel()" v-if="visible" class="back-bord" />
	<!--支持插槽-->
		<!-- <slot></slot> -->

		<!--默认输入框-->

		<view class="box1">


			<view class="bd">
				<view class="left">开始时间</view>
				<view class="right">
					<test-com beginYear="2021" endYear="2030" @confirm="onConfirm"></test-com>
				</view>
			</view>
			<view class="bd">
				<view class="left">结束时间</view>
				<view class="right">
					<testCom1 beginYear="2021" endYear="2030" @confirm="onConfirm2"></testCom1>
				</view>
			</view>
			<view class="bd">
				<view class="left">车主姓名</view>
				<view class="right"><input v-model="userName" placeholder="请输入姓名"></view>
			</view>
			<!-- 	<view class="bd">
					<view class="left">车主编号</view>
					<view class="right"><input v-model="userNo" :value="userNo" placeholder=""></view>
				</view>
				<view class="bd">
					<view class="left">车主卡号</view>
					<view class="right"><input v-model="cardNo" :value="cardNo" placeholder=""></view>
				</view>
				<view class="bd">
					<view class="left"><text space="nbsp">车&nbsp 位&nbsp 数</text></view>
					<view class="right"><input v-model="lot_count" :value="lot_count" placeholder=""></view>
				</view>
				<view class="bd">
					<view class="left"><text space="nbsp">付费车位</text></view>
					<view class="right"><input v-model="paylot_count" :value="paylot_count" placeholder=""></view>
				</view>
				<view class="bd">
					<view class="left"><text space="nbsp">电&nbsp &nbsp &nbsp &nbsp话</text>
					</view>
					<view class="right"><input v-model="tel" :value="tel" placeholder=""></view>
				</view>
				<view class="bd">
					<view class="left"><text space="nbsp">地&nbsp &nbsp &nbsp &nbsp址</text></view>
					<view class="right"><input v-model="address" value="address" placeholder=""></view>
				</view> -->



		</view>
		<view class="submit"><button @click="submit2()"> 提交</button></view>
	</view>

</template>

<script>
	import testCom from '../../components/FL-pciker_view_ts.vue'
	import testCom1 from '../../components/FL-pciker_view_ts1.vue'
	import plate from '../../components/index.vue'

	export default {
	
		components: {
			testCom,
			testCom1,
			plate
		},
		name: 'InputCar',
		props: {
			defaultType: {
				type: Boolean,
				default: true
			}
		},
		data: function() {
			return {
				uId: 0,
				userName: '',
				userNo: '',
				cardNo: '',
				tel: '',
				address: '',
				info: {
					time: ''
				},
				info1: {
					time: ''
				},
				beginTime: '',
				endTime: '',inputValue: []
			}
		},
		// 		lot_count: '',
		// 		paylot_count: '',
		// 		keybordType: '字',
		// 		inputValue: [],

		// 		visible: false,
		// 		wordList: [
		// 			'京',
		// 			'津',
		// 			'渝',
		// 			'沪',
		// 			'冀',
		// 			'晋',
		// 			'辽',
		// 			'吉',
		// 			'黑',
		// 			'苏',
		// 			'浙',
		// 			'皖',
		// 			'闽',
		// 			'赣',
		// 			'鲁',
		// 			'豫',
		// 			'鄂',
		// 			'湘',
		// 			'粤',
		// 			'琼',
		// 			'川',
		// 			'贵',
		// 			'云',
		// 			'陕',
		// 			'甘',
		// 			'青',
		// 			'蒙',
		// 			'桂',
		// 			'宁',
		// 			'新',
		// 			'藏',
		// 			'使',
		// 			'领',
		// 			'警',
		// 			'学',
		// 			'港',
		// 			'澳'
		// 		],
		// 		abcList: [
		// 			1,
		// 			2,
		// 			3,
		// 			4,
		// 			5,
		// 			6,
		// 			7,
		// 			8,
		// 			9,
		// 			0,
		// 			'Q',
		// 			'W',
		// 			'E',
		// 			'R',
		// 			'T',
		// 			'Y',
		// 			'U',
		// 			'I',
		// 			'O',
		// 			'P',
		// 			'A',
		// 			'S',
		// 			'D',
		// 			'F',
		// 			'G',
		// 			'H',
		// 			'J',
		// 			'K',
		// 			'L',
		// 			'Z',
		// 			'X',
		// 			'C',
		// 			'V',
		// 			'B',
		// 			'N',
		// 			'M'
		// 		]
		// 	}
		// },
		// computed: {
		// 	judgeList() {
		// 		if (this.keybordType === 'ABC') {
		// 			return this.abcList.slice(29, 36)
		// 		} else {
		// 			return this.wordList.slice(30, 37)
		// 		}
		// 	},
		// 	showLength() {
		// 		return this.inputValue.length
		// 	},
		// 	lineOneToThree() {
		// 		return this.wordList.slice(0, 30)
		// 	},
		// 	abcLineOne() {
		// 		return this.abcList.slice(0, 10)
		// 	},
		// 	abcLineTwo() {
		// 		return this.abcList.slice(10, 20)
		// 	},
		// 	abcLineThree() {
		// 		return this.abcList.slice(20, 29)
		// 	}
		// },
		// watch: {
		// 	inputValue(val, oldVal) {
		// 		if (this.inputValue.length === 0) {
		// 			this.keybordType = '字'
		// 		}
		// 		if (this.inputValue.length > 0 && this.inputValue.length < 7) {
		// 			this.keybordType = 'ABC'
		// 		}
		// 		this.$emit('input', this.inputValue)
		// 	}
		// },
		onShow() {
			var date = new Date();
			var date1 = new Date();
			date1.setTime(date1.getTime() + 24 * 60 * 60 * 1000);

			this.endTime = date1.getFullYear() + "-" + (date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1
					.getMonth() + 1) + "-" + date1.getDate() + " " + date1.getHours() + ":" + date1.getMinutes() + ":" +
				"00";
			this.beginTime = date.getFullYear() + "-" + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date
				.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + "00";
			console.log(this.beginTime);
			console.log(this.endTime);
		},
		onShareAppMessage: function() {
			// console.log('App Hide')
		},
		methods: {
   plateChange(val){
                // console.log(val);
				this.inputValue=val;
				// console.log(this.inputValue);
            },
			// 键盘类型切换
			toggle() {
				if (
					this.inputValue.length === 0 ||
					(this.inputValue.length > 0 && this.inputValue.length <= 6)
				)
					return
				this.keybordType = this.keybordType === 'ABC' ? '字' : 'ABC'
			},
			// 文字输入
			inputWord(word) {
				if (this.inputValue.length === 7) return
				this.inputValue.push(word)
			},
			// 删除一个字符
			deleteOne() {
				this.inputValue.pop()
			},
			// 取消
			cancel() {
				this.visible = false
				this.inputValue = []
				this.$emit('submit', this.inputValue.join(''))
			},
			// 完成
			submit() {
				if (this.inputValue.length !== 7) return
				this.$emit('submit', this.inputValue.join(''))
				this.visible = false
			},
			// 打开键盘
			open2() {
				this.visible = true
			},
			onConfirm(val) {

				this.beginTime = val.selectRes + ":" + "00" + ":" + "00";
				console.log(val);
			},
			onConfirm2(val) {
				this.endTime = val.selectRes + ":" + "00" + ":" + "00";
			},
			submit2() {
				var carnum =this.inputValue.toString() ;
				
				var that = this;
				console.log(that.userid);

				uni.getStorage({

					key: 'usersId',
					success: function(res) {
						that.userid = res.data;

						uni.request({

							url: 'https://m.zjjiyu.cn/dongtou_park/park_apply.jspx',
							method: 'POST',
							contentType: 'application/json',
							dataType: 'json',
							data: {
								"beginTime": that.beginTime,
								"endTime": that.endTime,
								"userName": that.userName,
								// "userNo": that.userNo,
								"carnum": carnum,

								"usersId": that.userid

							},
							success: (res) => {




								if (res.data.status == 200) {
									uni.switchTab({


										// uni.setStorageSync('HCuname', this.userid);
										// uni.setStorageSync('HCpassw', this.pwd);
										url: '/pages/vehiclemg/vehiclemg',
									})
								} else {
									uni.showToast({
										title: res.data.message.errmsg,
										duration: 2000
									});
									uni.showToast({
										title: res.data.message,
										duration: 2000
									});
								}

							}

						})

					}
				})

			}
		}
	}
</script>

<style scoped lang="scss" scoped>
	.container {
		display: flex;
		background-color: #f8f8f8;
		padding: 25rpx 20rpx;
		flex-direction: column;
	}

	// .container  ::v-deep .u-form-item--left__content__label{
	// 	font-size: 30rpx;
	// 	// padding-left: rpx;
	// }


	.box1 {
		display: flex;
		width: 710rpx;
		height: auto;
		flex-direction: column;
		background-color: #FFFFFF;

	}

	.bd {
		width: 710rpx;
		height: 100rpx;
		padding: 0 15rpx;
		display: flex;
		border-bottom: 3rpx solid #eeeeee;
		background-color: #FFFFFF;
		align-items: center;

	}

	.left {
		width: 180rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 35rpx;
	}

	.right {
		display: flex;
		width: 500rpx;
		align-items: center;

	}

	.right input {
		color: #a8a8a8;
		font-size: 30rpx;
	}

	//年月日
	.box {
		position: relative;
		z-index: 888;
	}

	.mask {
		position: fixed;
		z-index: 999;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.3);
		visibility: hidden;
		opacity: 0;
		transition: all 0.3s ease;

		&.show {
			visibility: visible;
			opacity: 1;
		}
	}

	.popop {
		width: 100%;
		min-height: 200rpx;
		background-color: #808080;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		transition: all 0.3s ease;
		transform: translateY(100%);
		z-index: 1999;

		&.show {
			transform: translateY(0);
		}

		.picker_head {
			display: flex;
			align-items: center;
			padding: 0 30upx;
			height: 44px;
			background-color: #fff;
			position: relative;
			text-align: center;
			font-size: 15px;
			justify-content: space-between;

			&:after {
				content: ' ';
				position: absolute;
				left: 0;
				bottom: 0;
				right: 0;
				height: 1px;
				border-bottom: 1px solid #e5e5e5;
				color: #e5e5e5;
				transform-origin: 0 100%;
				transform: scaleY(0.5);
			}
		}


		.picker_view {
			width: 100%;
			height: 200px;
			overflow: hidden;
			background-color: rgba(255, 255, 255, 1);
			z-index: 666;

			picker-view {
				height: 100%;
			}

			.item {
				text-align: center;
				width: 100%;
				line-height: 88upx;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-size: 30upx;
			}
		}
	}

	.botton {
		display: flex;
		width: 710rpx;
	}

	//提交
	.submit {
		display: flex;
		margin-top: 20rpx;
		width: 700rpx;
		height: 100rpx;
		border-radius: 90rpx;
		align-items: center;
	}

	.submit button {
		width: 500rpx !important;
		height: 80rpx;
		background-color: #569aff;
		color: white;
		align-items: center;
		border-radius: 80rpx;
	}

	// 键盘
	.keybordSlide-enter-active,
	.keybordSlide-leave-active {
		transition: all 0.2s linear;
		transform: translateY(0px);
	}

	.keybordSlide-enter,
	.keybordSlide-leave-to

	/* .keybordSlide-leave-active below version 2.1.8 */
		{
		transform: translateY(250px);
	}

	.back-bord {
		width: 100vw;
		overflow-y: scroll;
		height: calc(100vh);
	}

	.gray {
		color: gray;
	}

	.data-show {
		position: relative;
		// ez-index: 99;
		width: 100%;
		display: flex;
		justify-content: space-around;
		// min-width: 375rpx;
		// min-height: 50rpx;

		.data-show-block {
			flex: 1;
			text-align: center;
			height: 60rpx;
			line-height: 40rpx;
			width: 50rpx;
			background-color: #f5f5f5;
			color: #87909b;
			font-size: 12px;
			margin-left: 5rpx;
			border-radius: 10rpx;
		}

		.active {
			border: 1rpx solid #4ad5c2;
		}
	}

	.keybord-wrap {
		position: fixed;
		z-index: 999;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 500rpx;
		background: rgb(192, 192, 196);

		.keybord-header {
			padding: 0 15px;
			height: 40px;
			line-height: 40px;
			display: flex;
			justify-content: space-between;
			background: rgb(240, 240, 240);
		}

		.keybord-keys {
			padding: 5px 5px 15px 5px;
			box-sizing: border-box;

			.keybord-keys-word-wrap {
				list-style: none;
				padding: 0;
				margin: 0;
				column-count: 10;
				column-gap: 5px;
			}

			.keybord-keys-abc-wrap {
				list-style: none;
				padding: 0;
				margin: 0;
				column-count: 10;
				column-gap: 5px;
			}

			.keybord-keys-abc-wrap-short {
				list-style: none;
				padding: 0;
				margin: 0;
				column-count: 9;
				column-gap: 5px;
				padding: 0 13px;
			}

			.keybord-keys-bottom {
				display: flex;
				justify-content: space-between;

				.keybord-keys-bottom-line {
					width: 100%;
					margin: 0;
					padding: 0 5px;
					list-style: none;
					column-count: 7;
					column-gap: 5px;
				}
			}
		}
	}

	.button {
		&:active {
			background: rgb(240, 237, 237);
		}

		text-align: center;
		line-height: 40px;
		height: 40px;
		border-radius: 5px;
		background: white;
		color: black;
		margin-bottom: 7px;
	}

	.big-button {
		&:active {
			background: white;
		}

		width: 10vw;
		height: 40px;
		background: rgb(139, 138, 138);
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 5px;
		color: white;

		img {
			width: 65%;
			height: 40rpx;
		}
	}
</style>
