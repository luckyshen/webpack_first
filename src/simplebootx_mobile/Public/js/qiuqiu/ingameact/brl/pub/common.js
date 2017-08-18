// 加载 Fastclick 优化点击相应
import Fastclick from './fastclick';

const win = window;
const doc = document;

var COMMON = (()=>{
	return {
		// 加载rem设置页面
		rem(){
			win.addEventListener('DOMContentLoaded', ()=>{
				var rootNode = doc.documentElement, 
					clientWidth = rootNode.clientWidth,
					evt = 'orientationchange' in win ? 'orientationchange' : 'resize';

				// Fastclick
				Fastclick(document.body);

				// 初始化根节点字号
				document.addEventListener(evt, computedRootSize, false)

				function computedRootSize(){
					var rfz = clientWidth * 20 / 568;

					rfz = rfz > 40 ? 40 : rfz;
					rootNode.style.fontSize = rfz + 'px';
				}

				computedRootSize();
				win.onresize = ()=>{
					clientWidth = rootNode.clientWidth;
					computedRootSize();
				};

			}, false);
		},

		// rem() {
		// 	document.addEventListener('DOMContentLoaded', ()=> {
		// 	    var html = document.documentElement;
		// 	    var windowWidth = html.clientWidth;
		// 	    html.style.fontSize = windowWidth / 11.36 + 'px';
		// 	}, false);
		// },

		// 设备判断
		device(){
			return {
				Android: function(){
					return navigator.userAgent.match(/Android/i) ? true : false;  
				},

				BlackBerry: function(){
					return navigator.userAgent.match(/BlackBerry/i) ? true : false;
				},

				iOS: function(){
					return navigator.userAgent.match(/iPad|iPod|iPhone/i) ? true : false;
				},

				iphone: function(){
					return navigator.userAgent.match(/iPhone/i) ? true : false;
				},

				Windows: function(){
					return navigator.userAgent.match(/IEMobile/i) ? true : false;
				},

				any: function(){
					return (this.Android() || this.BlackBerry()  || this.Windows() || this.iOS());
				}
			}
		},

		// 千位计算符
		thousandNum(num){
			return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
		},

		// 获取URL参数对象
        GetRequest() {
			var url = location.search; //获取url中"?"符后的字串
			//alert(url)
			var theRequest = new Object();
			if (url.indexOf("?") != -1) {
				var str = url.substr(1);
				var strs = str.split("&");
				for (var i = 0; i < strs.length; i++) {
					var sep = strs[i].indexOf("=");
					theRequest[strs[i].substr(0, sep)] = strs[i].substr(sep + 1, strs[i].length);
				}
			}
			return theRequest;
    	},

		// 获取URL参数值
		GetRequestParam(paramName) {
            var request = new Object();
            request = this.GetRequest();
            return ("undefined"==typeof request[paramName]) ? "" : request[paramName];
		}

	}
})();

// 加载rem设置页面
COMMON.rem();

export { COMMON };

