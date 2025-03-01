<template>
	<view class="body">
		<!-- 显示区正式开始 -->
		<view class="myfrom">
			<form @submit="goLink">
				<textarea name="mytxt" class="mytext" v-model="desc" maxlength="-1" adjust-position auto-height="true"
					placeholder="请输入文本" />
				<view class="mybutton">
					<button class="mybutton" type="primary" formType="submit">保存</button>
					<button class="mybutton" type="warn" @click="logout">退出</button>
				</view>
			</form>
		</view>
		<!-- 显示区结束 -->
	</view>
</template>

<script>
	var _self, loginUID;
	export default {
		data() {
			return {
				desc: ''
			}
		},
		methods: {
			logout() {
				uni.removeStorageSync('UID');
				uni.showToast({
					title: "您已经退出",
					icon: "none"
				});
				setTimeout(function() {
					uni.redirectTo({
						url: '/pages/login/login'
					});
				}, 1000);
			},
			goLink() {
				if (_self.desc == '') {
					uni.showToast({
						title: "内容必填",
						icon: "none"
					});
					return;
				}
				uni.request({
					url: _self.apiServer + 'add',
					method: 'POST',
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					data: {
						'uid': loginUID,
						'txt': _self.desc
					},
					success: res => {
						_self.desc = '' //清空输入内容
						uni.showToast({
							title: res.data.datas,
							icon: "none"
						});
						setTimeout(function() {
							uni.setStorageSync("pop", 1); //给刷新标记赋值
							uni.switchTab({
								url: "/pages/list/list"
							}); //跳到 看日记页面
						}, 2000);

					}
				}); //golink结束
			},
			onLoad() {
				_self = this;
				loginUID = _self.checkLogin('/index/index');
				if (!loginUID) {
					return;
				} else(console.log(loginUID));
			}
		}
	}
</script>

<style>
	.myfrom {
		margin: 10px;
	}

	.num {
		text-align: right;
		color: gray;
		font-size: 14px;
	}

	.mytext {
		border: 1px solid #ccc;
		border-radius: 5px;
		width: 100%;
		min-height: 300px;

	}

	.mybutton {
		margin-top: 20px;
	}
</style>
