<template>
	<view class="body">
		<!-- 显示区正式开始 -->
		<view class="myfrom">
			<form @submit="goLink">
				<textarea class="mytext" maxlength="-1" v-model="desc" placeholder="请输入文本" auto-height
					adjust-position />

				<view class="mybutton">
					<button type="primary" formType="submit">保存</button>
				</view>
			</form>
		</view>
		<!-- 显示区结束 -->
	</view>
</template>

<script>
	var _self, loginUID;
	var noteID, index;
	export default {
		data() {
			return {
				desc: ''
			}
		},
		methods: {
			goLink() {
				uni.request({
					url: _self.apiServer + 'edit',
					method: 'POST',
					header: {'content-type': "application/x-www-form-urlencoded"},
					data: {
						'uid': loginUID,
						'ID': _self.noteID,
						'txt': _self.desc
					},
					success: res => {
						//console.log(res);
						uni.showToast({title: "修改成功",icon: "none"});
						// 带参数返回
						uni.$emit('bindex', {
							'id': _self.index,
							'newtxt': _self.desc
						});
						uni.navigateBack();
					}
				});
			} //golink
		},
		onLoad: function(option) {
			_self = this;
			loginUID = _self.checkLogin('/index/index');
			if (!loginUID) {
				return;
			} else(console.log(loginUID));
			//以下是读取内容
			this.noteID = option.ID;
			this.index = option.index;
			uni.request({
				url: _self.apiServer + 'one',
				method: 'POST',
				header: {'content-type': "application/x-www-form-urlencoded"},
				data: {
					uid: loginUID,
					ID: this.noteID
				},
				success: function(res) {
					var newsListss = JSON.parse(res.data.datas); //将json对象解析成数组
					console.log(newsListss);
					if (res.data.result == 'ok') {
						//console.log(newsListss.mytxt);
						_self.desc = newsListss.mytxt;
					}
				}
			})
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
