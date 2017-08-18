// css
import 'main';
import 'animate';

// js
import { COMMON } from 'common';
import reqwest from 'reqwest';
import $ from 'jquery';

const win = window;
const doc = document;

const API = 'http://122.11.58.222/Front/IngameAct';
const ROLLERID = "1001";

const propsAll = [
{id: 1024, name: '钛金矿石', img: 'pj_117'},
{id: 1010, name: '金蘑菇', img: 'hb_3_1'},
{id: 2801, name: '机械神龙', img: 'B359'},
{id: 251002, name: '奇妙宝箱钥匙', img: 'dazhuanpan_3'},
{id: 3801, name: '机械傀儡', img: 'bz_xjsf17'},
{id: 253002, name: '特惠宝箱钥匙S', img: 'dazhuanpan_2'},
{id: 252002, name: '特惠宝箱钥匙A', img: 'dazhuanpan_1'},
{id: 1014, name: '棒棒糖', img: 'hb_1'},
{id: 260060, name: '钛金材料箱', img: 'dazhuanpan_4'}
]
const propsBox = [
{id: 197001, name: '普通钛金板', img: 'pjth_5'},
{id: 197002, name: '中级钛金板', img: 'pjth_6'},
{id: 197003, name: '高级钛金板', img: 'pjth_7'},
{id: 197004, name: '超能钛金板', img: 'pjth_8'},
{id: 197101, name: '空间能量箱', img: 'pjth_12'},
{id: 197102, name: '激光星束', img: 'pjth_4'},
{id: 197103, name: '能量转换熔炉', img: 'pjth_10'},
{id: 197201, name: '玫瑰灯钻', img: 'pjth_2'},
{id: 197202, name: '星图导航仪', img: 'pjth_3'},
{id: 197203, name: '类原子传感器', img: 'pjth_1'},
{id: 197204, name: '远空通讯芯片', img: 'pjth_11'},
{id: 197205, name: '精密智能锁', img: 'pjth_3'},
{id: 197206, name: '宇宙电离核心', img: 'pjth_13'}
]
$(function(){
	// console.log(this);
})



let oobj = {
	a: 1,
	b:()=>{
		console.log(this.a);
	},
	c:function (){
		console.log(this.a);
	}
}


const sitt = () =>{
	console.log(this);
}
function sittt(){
	console.log(this);
}

// sitt();
// sittt();









// main
const siteApp = () => {
	var
		btnCloseWebview = doc.querySelector('#btn_close_webview'), // 关闭webview

		// page set
		myMushroom = doc.querySelector('#myMushroom'), // 我的蘑菇数
		myDebris = doc.querySelector('#myDebris'), // 我的碎片数量
		todayLotteryNum = doc.querySelector('#todayLotteryNum'), // 今日已抽次数
		totalLotteryNum = doc.querySelector('#totalLotteryNum'), // 今日最多可抽奖次数

		// 抽奖
		lotteryLimit = doc.querySelector('#lotteryLimit'), // 抽奖每次消耗
		btnLottery = doc.querySelector('#btn_lottery'),
		awardList = doc.querySelector('#award'), // 奖励列表
		awardDetail1 = doc.querySelector('#award_detail1'), 
		awardDetail2 = doc.querySelector('#award_detail2'),
		awardSuccess = doc.querySelector('#award_success'), // 抽奖成功

        // prompt
        prompt = doc.querySelector('#prompt'),
        promptTxt = doc.querySelector('#prompt_txt'),
        promptClose = doc.querySelector('#prompt_close'),
        promptOk = doc.querySelector('#prompt_ok'),


        // 碎片商城
		btnShop = doc.querySelector('#btn_shop'), // 碎片商城按钮
		maskbg = doc.querySelector('#maskbg'), // 遮罩层
		shop = doc.querySelector('#shop'), // 商城弹层
		shopBtnClose = doc.querySelector('#shop_btn_close'), // 关闭商城弹层按钮
		shopBtnGet = doc.querySelectorAll('.J_btn_shop'); // 商城兑换按钮


	var b = "&b=" + COMMON.GetRequestParam("b");
    //var b = "";
	return {
		// 初始化
		init(){
			// console.log(this);
			// 页面配置
			this.computed();

			// 事件绑定
			this.bindEvent();

			// 抽奖
			this.lottery();
		},

		// 页面配置
		computed(){
			let self = this;

			// 用户信息
			reqwest({
				url: `${API}/ajaxGetUserSumInfo?1=1${b}`,
				type: 'json',
				method: 'get',
				crossOrigin: true,
				success: function(resp){
					// 模拟数据
					// var resp = {"code":0,"errmsg":"","data":{"Id":207,"MushRoom":150,"EMoney":0,"Money":0,"LoveNum":0,"Mushroom1":0,"Mushroom2":0,"Debris":1320}};

					let { code, errmsg, data } = resp;
					console.log(resp);
					if( code == 0 ){
						myMushroom.innerHTML = data.Mushroom1;
						myDebris.innerHTML = data.Debris;
					} else {
						// errmsg && self.prompt(errmsg);
					}
				}
			});

			// 抽奖信息
			reqwest({
				url: `${API}/ajaxLRollerInfo?1=1${b}`,
				data: {
					id: ROLLERID
				},
				type: 'json',
				method: 'get',
				crossOrigin: true,
				success: function(resp){
					// 模拟数据
					//var resp = {"code":0,"errmsg":"","data":{"Mushroom":0,"TotalNum":3,"BuyNum":0}};
					
					let { code, errmsg, data } = resp;

					if( code == 0 ){
						todayLotteryNum.innerHTML = data.BuyNum;
					} else {
						errmsg && self.prompt(errmsg);
					}
				}
			});
		},

		// 事件绑定
		bindEvent(){
			// 关闭webview
			btnCloseWebview.addEventListener('click', function(e){
				try{
					if(COMMON.device().iOS()){
						win.location.href = '#HtmlcallApp' + 'openweb:::';
					} else {
						win.jsObj.HtmlcallApp("openweb:::");
					}
				} catch(ex){}
			}, false);

			// 碎片商城
			btnShop.addEventListener('click', function(e){
				maskbg.style.display = 'block';
				shop.style.display = 'block';
			}, false);

			// 关闭碎片商城
			shopBtnClose.addEventListener('click', function(e){
				maskbg.style.display = 'none';
				shop.style.display = 'none';
			}, false);	

			// 商城兑换按钮
			for (let i = 0, len = shopBtnGet.length; i < len; ++i) {
				shopBtnGet[i].addEventListener('click', function(e){
                    self.prompt('您的碎片不足！');
                }, false);
			}

			// 关闭
			maskbg.addEventListener('click', function(e){
				maskbg.style.display = 'none';
				awardDetail1.style.display = 'none';
				awardDetail2.style.display = 'none';
				awardSuccess.style.display = 'none';
                prompt.style.display = 'none';
			}, false);

            //
            promptClose.addEventListener('click', function(e){
                maskbg.style.display = 'none';
                prompt.style.display = 'none';
            });
            promptOk.addEventListener('click', function(e){
                maskbg.style.display = 'none';
                prompt.style.display = 'none';
            });
		},

		// 抽奖
		lottery(){
			let self = this,
				totalItem = parseInt(awardList.querySelectorAll('.item').length) - 1,
				circleLimit = 3, // 可转动3圈
				timer = 200, // 起始运动时间, 毫秒
				circle = 0, // 记录已转动圈数
				clickFlag = true, // 抽奖按钮可点击
				lotteryFlag = false; // 中奖圈标记

			// 奖品详情
			var items = awardList.querySelectorAll('.item');
			for( let i = 0, len = items.length; i < len; ++i ){
                items[i].addEventListener('click', function(e){
					var _this = this,
						_id = _this.getAttribute('data-id'),
						_idImg = _this.getAttribute('data-img'),
						_name = _this.getAttribute('data-name'),
						_num = _this.getAttribute('data-num'),
						_remark = _this.getAttribute('data-remark'),
						_describe = _this.getAttribute('data-describe'),
						_type = _this.getAttribute('data-type'),
						_cost = _this.getAttribute('data-cost'); // 弹层2适用

					maskbg.style.display = 'block';
					if( _type == 2 ){
						awardDetail2.style.display = 'block';
						awardDetail2.querySelector('.name').innerHTML = _name;
						awardDetail2.querySelector('.remark').innerHTML = _remark;
						awardDetail2.querySelector('.cont').innerHTML = _describe;
						awardDetail2.querySelector('.img').querySelector('img').src = win.__cdn_img_m__ + '/ingameact/brl/award/' + _idImg + '.png';
						awardDetail2.querySelector('.img').querySelector('.num').innerHTML = _cost;
					} else {
						awardDetail1.style.display = 'block';
						awardDetail1.querySelector('.name').innerHTML = _name;
						awardDetail1.querySelector('.remark').innerHTML = _remark;
						awardDetail1.querySelector('.cont').innerHTML = _describe;
						awardDetail1.querySelector('.img').querySelector('img').src = win.__cdn_img_m__ + '/ingameact/brl/award/' + _idImg + '.png';
					}
				}, false);
			}

			// 抽奖按钮
			btnLottery.addEventListener('click', function(e){
				if (event.cancelable) {
				        // 判断默认行为是否已经被禁用
				        if (!event.defaultPrevented) {
				        		event.preventDefault();
				        		btnLotteryClick();
				        		// var tn = parseInt(todayLotteryNum.innerHTML),
				        		// 					ttn = parseInt(totalLotteryNum.innerHTML);

				        		// 				if( tn >= ttn || !ttn ){
				        		// 					self.prompt('无抽奖次数');
				        		// 					return;
				        		// 				}

				        		// 				if( parseInt(myMushroom.innerHTML) < parseInt(lotteryLimit.innerHTML) ){
				        		// 					self.prompt('蘑菇数量不够');
				        		// 					return;
				        		// 				}

				        		// 				if( !clickFlag ) return;
				        		// 				clickFlag = false;

				        		// 				// 抽奖
				        		// 				reqwest({
				        		// 					url: `${API}/ajaxBuyLuckRoller?1=1${b}`,
				        		//                     data: {
				        		//                         id: ROLLERID
				        		//                     },
				        		// 					type: 'json',
				        		// 					method: 'get',
				        		// 					crossOrigin: true,
				        		// 					success: function(resp){
				        		// 						// 模拟数据
				        		// 						// var resp = {"code":0,"errmsg":"","data":{"Id":1010,"Num":66,"Money":0}};
				        		// 						console.log(resp);
				        		// 						let { code, errmsg, data } = resp;
				        		// 						alert(1);
				        		// 						if( code == 0 ){
				        		// 							myMushroom.innerHTML = parseInt(myMushroom.innerHTML) - parseInt(lotteryLimit.innerHTML); // 减蘑菇数
				        		// 							todayLotteryNum.innerHTML = parseInt(todayLotteryNum.innerHTML) + 1; // 记录抽奖次数

				        		// 							animation(parseInt(totalItem * Math.random()), data);

				        		// 							// console.log(idFilter('1024'));

				        		// 						} else {
				        		// 							errmsg && self.prompt(errmsg);
				        		// 						}						
				        		// 					}
				        		// 				});
				        }
				    }

			}, false);

			function btnLotteryClick() {
				var tn = parseInt(todayLotteryNum.innerHTML),
					ttn = parseInt(totalLotteryNum.innerHTML);

				if( tn >= ttn || !ttn ){
					self.prompt('无抽奖次数');
					return;
				}

				if( parseInt(myMushroom.innerHTML) < parseInt(lotteryLimit.innerHTML) ){
					self.prompt('蘑菇数量不够');
					return;
				}

				if( !clickFlag ) return;
				clickFlag = false;

				// 抽奖
				reqwest({
					url: `${API}/ajaxBuyLuckRoller?1=1${b}`,
                    data: {
                        id: ROLLERID
                    },
					type: 'json',
					method: 'get',
					crossOrigin: true,
					success: function(resp){
						// 模拟数据
						// var resp = {"code":0,"errmsg":"","data":{"Id":1010,"Num":66,"Money":0}};
						console.log(resp);
						let { code, errmsg, data } = resp;
						if( code == 0 ){
							myMushroom.innerHTML = parseInt(myMushroom.innerHTML) - parseInt(lotteryLimit.innerHTML); // 减蘑菇数
							todayLotteryNum.innerHTML = parseInt(todayLotteryNum.innerHTML) + 1; // 记录抽奖次数

							animation(parseInt(totalItem * Math.random()), data);

							// console.log(idFilter('1024'));

						} else {
							errmsg && self.prompt(errmsg);
							clickFlag = true;
						}						
					}
				});
			}



			awardSuccess.addEventListener('click', function(e){
				removeMask();
				awardSuccess.style.display = 'none';
			});

			// 服务器ID比对
			// function idFilter(id){
			// 	var itemFlag = '';
			// 	/1024/.test(id) && (itemFlag = 'pj_117');
			// 	/1010/.test(id) && (itemFlag = 'hb_3_1');
			// 	/2801/.test(id) && (itemFlag = 'B359');
			// 	/252001/.test(id) && (itemFlag = 'dazhuanpan_1');
			// 	/253001/.test(id) && (itemFlag = 'dazhuanpan_2');
			// 	/251002/.test(id) && (itemFlag = 'dazhuanpan_3');
			// 	/197001|197002|197003|197004|197101|197102|197103|197201|197202|197203|197204|197205|197206/.test(id) && (itemFlag = 'dazhuanpan_4');
			// 	/3801/.test(id) && (itemFlag = 'bz_xjsf17');
			// 	/1014/.test(id) && (itemFlag = 'hb_1');
			// 	return itemFlag;
			// }
			function idFilter(id){
				var itemFlag = {};
				/1024/.test(id) && (itemFlag.id = id) && (itemFlag.img = 'pj_117') && (itemFlag.name = '钛金矿石');
				/1010/.test(id) && (itemFlag.id = id) && (itemFlag.img = 'hb_3_1') && (itemFlag.name = '金蘑菇');
				/2801/.test(id) && (itemFlag.id = id) && (itemFlag.img = 'B359') && (itemFlag.name = '机械神龙');
				/252002/.test(id) && (itemFlag.id = id) && (itemFlag.img = 'dazhuanpan_1') && (itemFlag.name = '特惠宝箱钥匙A');
				/253002/.test(id) && (itemFlag.id = id) && (itemFlag.img = 'dazhuanpan_2') && (itemFlag.name = '特惠宝箱钥匙S');
				/251002/.test(id) && (itemFlag.id = id) && (itemFlag.img = 'dazhuanpan_3') && (itemFlag.name = '奇妙宝箱钥匙');
				/197001|197002|197003|197004|197101|197102|197103|197201|197202|197203|197204|197205|197206/.test(id) && (itemFlag.id = '260060') && (itemFlag.img = 'dazhuanpan_4') && (itemFlag.name = '钛金材料箱');
				/3801/.test(id) && (itemFlag.id = id) && (itemFlag.img = 'bz_xjsf17') && (itemFlag.name = '机械傀儡');
				/1014/.test(id) && (itemFlag.id = id) && (itemFlag.img = 'hb_1') && (itemFlag.name = '棒棒糖');

				return itemFlag;
			}

			// 运动
			function animation( start, awardData ){
				// 记录圈
				if( start > totalItem ){
					circle++;
				}

				let i = start > totalItem ? 0 : start;
				let item = awardList.querySelectorAll('.item')[i];
				let mask = item.querySelector('.mask');

				removeMask();
				mask.style.display = 'block';

				// if( circle >= circleLimit && (item.getAttribute('data-id') == idFilter(awardData.Id) && item.getAttribute('data-num') == awardData.Num) ){
				if( circle >= circleLimit && (item.getAttribute('data-id') == idFilter(awardData.Id).id && item.getAttribute('data-num') == awardData.Num) ){
					timer = 200;
					circle = 0;
					lotteryFlag = false;
					award(awardData);
					return;
				}

				// 运动
				setTimeout(() => {
					if( timer <= 30 || circle >= circleLimit  ){
						lotteryFlag = true;
						timer += 20;
					} else {
						timer -= 20;
					}

					i++;
					animation(i, awardData);
				}, timer);
			}

			// 清除所有遮罩层
			function removeMask(){
				for( let m = 0, len = awardList.querySelectorAll('.item').length; m < len; ++m ){
					awardList.querySelectorAll('.item')[m].querySelector('.mask').style.display = 'none';
				}
			}

			// 中奖弹层
			function award(params){
				var items = awardList.querySelectorAll('.item');
				var aName, aImg, aDetail;
				// console.log(params);
				for( let i = 0, len = items.length; i < len; ++i ) {
					var _id = items[i].getAttribute('data-id'),
						_num = items[i].getAttribute('data-num');

					// if (_id == idFilter(params.Id) && _num == params.Num) {
					// 	aName = items[i].getAttribute('data-name');
					// 	aImg = win.__cdn_img_m__ + '/ingameact/brl/award/' + idFilter(params.Id) + '.png';
					// 	aDetail = items[i].getAttribute('data-describe');
					// }
					// console.log(params.Id+','+params.Num);

					if (_id == idFilter(params.Id).id && _num == params.Num) {
						// aName = items[i].getAttribute('data-name');
						aName = idFilter(params.Id).name+'x'+params.Num;
						aImg = win.__cdn_img_m__ + '/ingameact/brl/award/' + idFilter(params.Id).img + '.png';
						aDetail = items[i].getAttribute('data-describe');
						for( let i = 0 ; i<propsBox.length ; i++ ){
							if(propsBox[i].id == params.Id){
								aImg =  win.__cdn_img_m__ + '/ingameact/brl/award/' + propsBox[i].img + '.png';
								aName = propsBox[i].name+'x'+params.Num;
							}
						}
					}

            }



				awardSuccess.style.display = 'block';
				awardSuccess.querySelector('.s_icon').querySelector('.name').innerHTML = aName;
				awardSuccess.querySelector('.s_icon').querySelector('img').src = aImg;
				// awardSuccess.querySelector('.s_note_txt').innerHTML = aDetail;

				clickFlag = true;
			}
		},

        // msg
        prompt(msg){
            maskbg.style.display = 'block';
            prompt.style.display = 'block';
            promptTxt.innerHTML = msg;
        }
	}
}

new siteApp().init();