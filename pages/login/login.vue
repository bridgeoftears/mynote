<template>
	<view class="body">
		<!-- 显示区正式开始 -->
		<view class="myfrom">
			<form @submit="goLink">
				<view class="myfrom">
					<view class="myinput">
						<input v-model="pwd" placeholder="请输入密码" password adjust-position />
					</view>
					<view class="mybutton">
						<button type="primary" form-type="submit">登陆</button>
					</view>
				</view>
			</form>
		</view>
		<!-- 显示区结束 -->
	</view>
</template>


<script>
	var _self;
	export default {
		data() {
			return {
				pwd: ''
			};
		},
		methods: {
			goLink() {
				if (_self.pwd == '') {
					uni.showToast({	title: "密码必填",icon: "none"});
					return;
				}
				uni.request({
					url: _self.apiServer + 'login',
					method: 'POST',
					header: {'content-type': "application/x-www-form-urlencoded"},
					data: {
						'pwd': _self.pwd
					},
					success: res => {
						console.log(res);
						var result = res.data.result;
						if (result == "ok") {
							var uid = res.data.datas.uid;
							var uname = res.data.datas.uname;
							uni.showToast({title: uname + "登录成功",icon: "none"});
							uni.setStorageSync('UID', uid + ''); //字符串形式存储												
							setTimeout(function() {
								uni.switchTab({
									url: "/pages/index/index"
								}); // 跳转目标
							}, 2000); //2s后跳转
						} else {
							_self.pwd = '';
							uni.showToast({
								title: result,
								icon: "none"
							});
						}
					}
				});
			} //golink结束
		},
		onLoad() {
			_self = this
		}

	}
</script>

<style>
	.myfrom {
		margin: 30% 10px 40px 10px;
	}

	.myinput {
		border: 1px solid #ccc;
		border-radius: 5px;
		height: 30px;
		padding: 5px;
		text-align: center;
	}

	.mybutton {
		margin-top: 20px;
	}
</style>
