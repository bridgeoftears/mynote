<template>
	<view class="body">
		<!-- 显示区正式开始 -->
		<view class="note-list">
			<view class="note-item" v-for="(item,index) in noteList" :key="index">
				<view class="note-txt">
					<text class="" space="ensp" user-select="true">{{item.mytxt}}</text>
				</view>
				<view class="note-tool">
					{{item.mytime}}
					<view class="" style="float: right;">
						<text :data-id="item.id" :data-index="index" @tap="editOne">修改</text> | <text :data-id="item.id" 	:data-index="index" @tap="removeOne">删除</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 显示区结束 -->
	</view>
</template>

<script>
var _self,loginUID;	
var bindex, page = 1;
	export default {
		data() {
			return {
				noteList: []
			}
		},
		methods: {
			goLink: function() {
				uni.showLoading({'title': "加载中..."});
				uni.request({
					url: _self.apiServer + 'view&page=' + page,
					method: 'POST',
					header: {'content-type': "application/x-www-form-urlencoded"},
					data: {
						'uid': loginUID
					},
					success: res => {
						//console.log(res);
						if (res.data.result == 'empty') {
							uni.showToast({title: "已经加载全部内容",icon: "none"});
						} else if (res.data.result == 'ok') {
			
							var newsListss = JSON.parse(res.data.datas); //将json对象解析成数组
							//console.log(newsList);
			
							this.noteList = this.noteList.concat(newsListss); //将数据拼接在一起							
							uni.hideLoading();
							page++;
						}
					},
					complete: function() {
						uni.stopPullDownRefresh();
					}
				});
			},
			editOne: function(e) {
				var noteID = e.currentTarget.dataset.id;
				var index = e.currentTarget.dataset.index;
				uni.navigateTo({
					url: "../edit/edit?ID=" + noteID + "&index=" + index
				});
			},
			removeOne: function(e) {
				var noteID = e.currentTarget.dataset.id;
				var index = e.currentTarget.dataset.index;
				uni.showModal({
					title: "提示" + noteID,
				    content: "确定要删除吗?",
					success: function(e) {
						if (e.confirm == true) {
							uni.request({
								url: _self.apiServer + 'del',
								method: 'POST',
								header: {'content-type': "application/x-www-form-urlencoded"}, 
								data: {
									uid: loginUID,
									ID: noteID
								},
								success: function(res) {
									console.log(res);
									if (res.data.result == 'ok') {
										uni.showToast({title: "已删除",icon: "none"});
										_self.noteList.splice(index, 1);
									} else {
										uni.showToast({title: "删除失败",icon: "none"});
									}
								}
							});
						}
					},
				});
			}
		},
		onShow() {
					let pop = uni.getStorageSync('pop') //取得刷新标记
					if (pop) {    //如果标记为1，就刷新页面
						page = 1;
						this.noteList = [];
						this.goLink();
		 
					}
					uni.removeStorageSync('pop') //移除刷新标记
				},
		onLoad() {  
			uni.$on("bindex", res => {
				console.log(res)
			_self.noteList[res.id].mytxt = res.newtxt
			}),
			_self = this;
			loginUID = _self.checkLogin('/index/index');
			if (!loginUID) {return;	}else(console.log(loginUID));		
			this.goLink();	// 加载文章
		},
		onPullDownRefresh: function() {
			console.log("下拉");
			page = 1;
			this.noteList = [];
			this.goLink();
		},
		onReachBottom: function() {
			console.log("上拉");
			this.goLink();
		}
	}
</script>

<style>
	.body {
		margin: 10px;
	}

	.note-item {
		padding: 2px;
		margin-bottom: 15px;
		background-color: #e6e9f0;
		border-radius: 10px;
		border: 2upx solid #ccc;
		color: #000000;
		line-height: 25px;
		font-size: 12px;
	}

	.note-txt {
		padding: 10px;
		font-size: 16px;
		color: #333;
	}

	.note-tool {
		padding: 2px;
		font-size: 14px;
		color: #ccc;

	}
</style>
