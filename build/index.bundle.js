!function(e){function n(e){var n=document.getElementsByTagName("head")[0],i=document.createElement("script");i.type="text/javascript",i.charset="utf-8",i.src=h.p+""+e+"."+$+".hot-update.js",n.appendChild(i)}function i(e){if("undefined"==typeof XMLHttpRequest)return e(new Error("No browser support"));try{var n=new XMLHttpRequest,i=h.p+""+$+".hot-update.json";n.open("GET",i,!0),n.timeout=1e4,n.send(null)}catch(t){return e(t)}n.onreadystatechange=function(){if(4===n.readyState)if(0===n.status)e(new Error("Manifest request to "+i+" timed out."));else if(404===n.status)e();else if(200!==n.status&&304!==n.status)e(new Error("Manifest request to "+i+" failed."));else{try{var t=JSON.parse(n.responseText)}catch(a){return void e(a)}e(null,t)}}}function t(e){function n(e,n){"ready"===w&&s("prepare"),B++,h.e(e,function(){function i(){B--,"prepare"===w&&(q[e]||d(e),0===B&&0===k&&c())}try{n.call(null,t)}finally{i()}})}var i=j[e];if(!i)return h;var t=function(n){return i.hot.active?j[n]?(j[n].parents.indexOf(e)<0&&j[n].parents.push(e),i.children.indexOf(n)<0&&i.children.push(n)):g=[e]:(console.warn("[HMR] unexpected require("+n+") from disposed module "+e),g=[]),h(n)};for(var a in h)Object.prototype.hasOwnProperty.call(h,a)&&(u?Object.defineProperty(t,a,function(e){return{configurable:!0,enumerable:!0,get:function(){return h[e]},set:function(n){h[e]=n}}}(a)):t[a]=h[a]);return u?Object.defineProperty(t,"e",{enumerable:!0,value:n}):t.e=n,t}function a(e){var n={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],active:!0,accept:function(e,i){if("undefined"==typeof e)n._selfAccepted=!0;else if("function"==typeof e)n._selfAccepted=e;else if("object"==typeof e)for(var t=0;t<e.length;t++)n._acceptedDependencies[e[t]]=i;else n._acceptedDependencies[e]=i},decline:function(e){if("undefined"==typeof e)n._selfDeclined=!0;else if("number"==typeof e)n._declinedDependencies[e]=!0;else for(var i=0;i<e.length;i++)n._declinedDependencies[e[i]]=!0},dispose:function(e){n._disposeHandlers.push(e)},addDisposeHandler:function(e){n._disposeHandlers.push(e)},removeDisposeHandler:function(e){var i=n._disposeHandlers.indexOf(e);i>=0&&n._disposeHandlers.splice(i,1)},check:l,apply:f,status:function(e){return e?void C.push(e):w},addStatusHandler:function(e){C.push(e)},removeStatusHandler:function(e){var n=C.indexOf(e);n>=0&&C.splice(n,1)},data:x[e]};return n}function s(e){w=e;for(var n=0;n<C.length;n++)C[n].call(null,e)}function o(e){var n=+e+""===e;return n?+e:e}function l(e,n){if("idle"!==w)throw new Error("check() is only allowed in idle status");"function"==typeof e?(y=!1,n=e):(y=e,n=n||function(e){if(e)throw e}),s("check"),i(function(e,i){if(e)return n(e);if(!i)return s("idle"),void n(null,null);O={},I={},q={};for(var t=0;t<i.c.length;t++)I[i.c[t]]=!0;m=i.h,s("prepare"),b=n,v={};var a=1;d(a),"prepare"===w&&0===B&&0===k&&c()})}function r(e,n){if(I[e]&&O[e]){O[e]=!1;for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(v[i]=n[i]);0===--k&&0===B&&c()}}function d(e){I[e]?(O[e]=!0,k++,n(e)):q[e]=!0}function c(){s("ready");var e=b;if(b=null,e)if(y)f(y,e);else{var n=[];for(var i in v)Object.prototype.hasOwnProperty.call(v,i)&&n.push(o(i));e(null,n)}}function f(n,i){function t(e){for(var n=[e],i={},t=n.slice();t.length>0;){var s=t.pop(),e=j[s];if(e&&!e.hot._selfAccepted){if(e.hot._selfDeclined)return new Error("Aborted because of self decline: "+s);if(0===s)return;for(var o=0;o<e.parents.length;o++){var l=e.parents[o],r=j[l];if(r.hot._declinedDependencies[s])return new Error("Aborted because of declined dependency: "+s+" in "+l);n.indexOf(l)>=0||(r.hot._acceptedDependencies[s]?(i[l]||(i[l]=[]),a(i[l],[s])):(delete i[l],n.push(l),t.push(l)))}}}return[n,i]}function a(e,n){for(var i=0;i<n.length;i++){var t=n[i];e.indexOf(t)<0&&e.push(t)}}if("ready"!==w)throw new Error("apply() is only allowed in ready status");"function"==typeof n?(i=n,n={}):n&&"object"==typeof n?i=i||function(e){if(e)throw e}:(n={},i=i||function(e){if(e)throw e});var l={},r=[],d={};for(var c in v)if(Object.prototype.hasOwnProperty.call(v,c)){var f=o(c),p=t(f);if(!p){if(n.ignoreUnaccepted)continue;return s("abort"),i(new Error("Aborted because "+f+" is not accepted"))}if(p instanceof Error)return s("abort"),i(p);d[f]=v[f],a(r,p[0]);for(var f in p[1])Object.prototype.hasOwnProperty.call(p[1],f)&&(l[f]||(l[f]=[]),a(l[f],p[1][f]))}for(var u=[],_=0;_<r.length;_++){var f=r[_];j[f]&&j[f].hot._selfAccepted&&u.push({module:f,errorHandler:j[f].hot._selfAccepted})}s("dispose");for(var b=r.slice();b.length>0;){var f=b.pop(),y=j[f];if(y){for(var C={},k=y.hot._disposeHandlers,B=0;B<k.length;B++){var q=k[B];q(C)}x[f]=C,y.hot.active=!1,delete j[f];for(var B=0;B<y.children.length;B++){var O=j[y.children[B]];if(O){var I=O.parents.indexOf(f);I>=0&&O.parents.splice(I,1)}}}}for(var f in l)if(Object.prototype.hasOwnProperty.call(l,f))for(var y=j[f],D=l[f],B=0;B<D.length;B++){var A=D[B],I=y.children.indexOf(A);I>=0&&y.children.splice(I,1)}s("apply"),$=m;for(var f in d)Object.prototype.hasOwnProperty.call(d,f)&&(e[f]=d[f]);var H=null;for(var f in l)if(Object.prototype.hasOwnProperty.call(l,f)){for(var y=j[f],D=l[f],E=[],_=0;_<D.length;_++){var A=D[_],q=y.hot._acceptedDependencies[A];E.indexOf(q)>=0||E.push(q)}for(var _=0;_<E.length;_++){var q=E[_];try{q(l)}catch(L){H||(H=L)}}}for(var _=0;_<u.length;_++){var T=u[_],f=T.module;g=[f];try{h(f)}catch(L){if("function"==typeof T.errorHandler)try{T.errorHandler(L)}catch(L){H||(H=L)}else H||(H=L)}}return H?(s("fail"),i(H)):(s("idle"),void i(null,r))}function h(n){if(j[n])return j[n].exports;var i=j[n]={exports:{},id:n,loaded:!1,hot:a(n),parents:g,children:[]};return e[n].call(i.exports,i,i.exports,t(n)),i.loaded=!0,i.exports}var p=this.webpackHotUpdate;this.webpackHotUpdate=function(e,n){r(e,n),p&&p(e,n)};var u=!1;try{Object.defineProperty({},"x",{get:function(){}}),u=!0}catch(_){}var b,v,m,y=!0,$="2a15db51858ed24e5abf",x={},g=[],C=[],w="idle",k=0,B=0,q={},O={},I={},j={};return h.m=e,h.c=j,h.p="",h.h=function(){return $},t(0)(0)}({0:function(e,n,i){"use strict";i(141),i(138)},138:function(e,n){"use strict";!function(){Array.indexOf||(Array.prototype.indexOf=function(e){for(var n=0;n<this.length;n++)if(this[n]==e)return n;return-1})}(),window.payInteraction=function(){function e(e){e.each(function(){"信用卡"==$(this).find(".selected_box .card_info .card-type-check").text()?$(this).next(".form_box").find(".credit").show():$(this).next(".form_box").find(".credit").hide()})}function n(e){e.find("input[type = 'text']").val("").removeClass("error hui-shake"),e.find("input.cardInput").removeAttr("readonly").removeClass("readonly"),e.find("ul li.inputLi a").trigger("click"),e.find(".ts").hide(),e.find(".date_select_box dl dd").removeClass("cur"),e.find(".date_select_box.idType dl dd").eq(0).trigger("click")}function i(e,n){e.each(function(){var e=$(this).find("li"),i=e.size();if(i>5*n+1){for(var t=0;i-1>=t&&5*n-2>=t;t++)e.eq(t).show();$(this).append($('<li class="pl-more"><span>更多银行</span></li>')),$(this).find(".pl-more").click(function(){e.show(),$(this).hide()})}else 5*n+1>=i&&i>0&&e.show()})}function t(e){0==e&&$(".card_pay_box .unBind_field").addClass("active")}function a(e){""==e&&$(".inputLi").show()}function s(e,n){e.removeClass("disable"),parseInt(e.find(".tips p span").text())>n&&e.addClass("disable")}function o(e){var n=this;$(".pay-select-con-item").each(function(){var i=$(this),t=i.find(".hasBind_field");i.hasClass("credit-installment-field")&&1==n.options.hasBindCreditInstallment&&(t.find(".bank_select_box .card_info").each(function(){s($(this),e)}),t.hasClass("unBind")||l(t)),t.find(".pl-wrap .pl-item").each(function(){s($(this),e)}),t.hasClass("unBind")&&r(t)})}function l(e){var n=e.find(".bank_select_box .bank_select_list li.card_info:first"),i=e.find(".bank_select_box .bank_select_list li.card_info:not(.disable):first");i.length?(i.trigger("click"),e.removeClass("no-select"),e.parents(".card_and_wallet").length&&e.parents(".card_and_wallet").removeClass("no-select")):(e.find(".bank_select_box .selected_box .card_info").html(n.html()).addClass("disable"),e.addClass("no-select"),e.parents(".card_and_wallet").length&&e.parents(".card_and_wallet").addClass("no-select"))}function r(e){var n=e.find(".pl-wrap .pl-item:not(.disable):first");n.length?(n.trigger("click"),e.removeClass("no-select")):(e.find(".pl-wrap .pl-item").removeClass("on"),e.addClass("no-select"))}function d(e,n){var i=e.find(".pay-select-con .credit-installment-field"),t=e.find(".pay-select-con .thirdparty-installment-field");0==n.options.hasBindCreditInstallment?i.find(".unBind_field .form_box .sbank a").trigger("click"):1==n.options.hasBindCreditInstallment&&i.parents(".choose_pay").find(".top_title .goMyCard").trigger("click"),t.find(".unBind_field .form_box .sbank a").trigger("click")}function c(e,n,i){e.addClass("on").siblings(".fq-item").removeClass("on");var t=i.options.createCardFqSelectInfo(n,e.find("em b").text(),e.find("em b").attr("rate"));e.parents(".hasBind_field").find(".fq-select-info span").html(t)}function f(e,n){e.find(".hasBind_field").removeClass("active");var i=e.find(".unBind_field");i.addClass("active");var t=e.find(".hasBind_field .pl-wrap .pl-item.on span"),a=t[0].outerHTML,s=e.hasClass("credit-installment-field")?n.options.bankLimit(t):"";i.find(".form_box ul li.card_info").html(a+s);var o=e.find(".hasBind_field .fq-select-info span").clone();o.find("em").remove(),i.find(".form_box ul li.fq-info").html(o),n.options.checkFormShow(i),i.find(".pay-select-con .form_box").show().find(".shortcut").show()}function h(){var e=this;0==e.options.hasBindCreditInstallment?p($(".credit-installment-field"),e):null,p($(".thirdparty-installment-field"),e),o.call(e,parseInt($(".order_box .pay_money p span.price").text())),$(".card_and_wallet").each(function(){var e=$(this).find(".hasBind_field");e.length&&l(e)})}function p(e,n){var i=e.find(".hasBind_field");!i.hasClass("unBind")&&i.addClass("unBind"),i.find(".pay-enter a.next").off("click").on("click",function(){f(e,n)})}function u(){var e=this,n=e.options.thirdpartyItmApplicantInfo;if("undefined"!=typeof n&&0!=n.length){for(var i="",t=0;t<n.length;t++)i+="<dd>"+n[t].name+"</dd>";var a=$(".thirdparty-installment-field .unBind_field .date_select_box dl");a.html(i),a.find("dd").off("click").on("click",function(){var e=$(this);e.parents(".date_select_box").find("input").val(e.text()).removeClass("error hui-shake").parents("ul").find(".ts").hide(),e.addClass("cur").siblings().removeClass("cur");for(var i=0;i<n.length;i++)n[i].name==e.text()&&(""==n[i].idCard||null==n[i].idCard?a.parents(".unBind_field").find(".idCard").val("").removeAttr("readonly"):a.parents(".unBind_field").find(".idCard").val(n[i].idCard).attr("readonly","readonly"))})}}function _(){$(".tn_wallet_box .pay-select-tab").remove(),$(".tn_wallet_box .pay-select-con .pl-wrap.wy-box").remove()}function b(e,n){e.hasClass("card_installment")?e.find(".pay-select-tab li:first").trigger("click"):e.hasClass("card_and_wallet")&&v(e,n),e.removeClass("active")}function v(e,n){var i=e.find(".unBind_field"),t=e.find(".hasBind_field"),a=e.find(".top_title .left  a.goMyCard"),s=e.find(".form_box .sbank .blueBtn"),o=e.find(".top_title .right");i.length&&i.hasClass("active")&&(a.length?a.trigger("click"):s.trigger("click")),t.length&&o.hide(),e.hasClass("tn_wallet_box")&&n.options.cancleTnWallet()}function m(){$(".pop_box .pop_win").css("margin-top",-$(".pop_box .pop_win").height()/2)}function y(){$(".shoufuchufa .fq-list li").removeClass("on").hide();var e=$(".shoufuchufa .fq-list li.fq-item"),n=$(".shoufuchufa .fq-list li.fq-item.recommend");n.length?n.eq(0).show():e.eq(0).show(),!$(".shoufuchufa .fq-list .more").length&&$(".shoufuchufa .fq-list").append('<li class="more">更多分期</li>'),$(".shoufuchufa .fq-list .more").show()}function x(){var i=this;$(".choose_box .unexpanded").on("click",function(){if($(this).parents(".choose_box").hasClass("card_installment disable"))return $(".pop_box .pop_win").html('<div class="head"><span>信息提示</span><img class="close" src="https://ssl.tuniucdn.com/img/20160308/jinrong/licai2/checkout/pop_close.png"></div><p>您已勾选首付出发，首付出发与<br>银行卡分期不可同时使用，请选择其他支付方式</p><div class="butg"><a class="pop_btn confirm mar hover" href="javascript:;">我知道了</a></div>'),$(".pop_box .pop_win").off("click").on("click",".head img, .confirm",function(){$(".pop_box").hide()}),$(".pop_box").show(),m(),!1;var e=$(this).parents(".choose_box"),n=e.find(".hasBind_field");if(!e.hasClass("active")){$(".link_box").removeClass("active");var t=e.siblings(".choose_box.active");if(b(t,i),e.hasClass("card_and_wallet"))n.length&&l(n),e.hasClass("tn_wallet_box")&&i.options.selectTnWallet();else if(e.hasClass("card_installment")){var a=e.find(".credit-installment-field .hasBind_field");1==i.options.hasBindCreditInstallment?l(a):0==i.options.hasBindCreditInstallment&&r(a)}e.addClass("active"),e.find(".top_title .right").show()}}),$(".link_box").on("click",function(){if(!$(this).hasClass("active")){$(this).addClass("active").siblings(".link_box").removeClass("active");var e=$(".choose_box.active");b(e,i)}}),$(".bank_select_box .bank_select_list li.card_info").click(function(){var t=$(this);if(t.hasClass("disable"))return!1;if(t.addClass("cur").siblings().removeClass("cur"),t.parents(".bank_select_box").find(".selected_box .card_info").removeClass("disable").html(t.html()),t.parents(".tn_wallet_box").length&&i.options.getActivityPay(t),n(t.parents(".hasBind_field").find(".form_box")),t.parents(".card_and_wallet").length&&e(t.parents(".choose_bank")),t.parents(".credit-installment-field").length){var a=t.find("span").attr("name"),s=t.parents(".pay-select-con-item");i.options.loadInstallmentSelect(a,function(e){$(".credit-installment-field .fq-list li.fq-item").click(function(){c($(this),a,e)})},i,s)}}),$(".bank_select_box .selected_box").click(function(){return $(this).parents(".hasBind_field").find(".date_select_box dl").hide(),$(this).next(".bank_select_list").toggle(),!1}),$("body").click(function(){$(".bank_select_box .bank_select_list").hide()}),$(".card_and_wallet .choose_bank .add_bank").click(function(){var e=$(this).parents(".choose_pay");$(this).parents(".choose_box").find(".pay-enter").removeClass("active"),e.find(".hasBind_field").removeClass("active"),e.find(".bank_select_box .bank_select_list li.card_info:first").trigger("click"),e.find(".unBind_field").addClass("active"),e.find(".top_title .left a.goMyCard").show()}),$(".credit-installment-field .choose_bank .add_bank").click(function(){var e=$(this).parents(".credit-installment-field"),n=e.find(".hasBind_field");n.addClass("unBind"),r(n),e.parents(".card_installment").find(".top_title .goMyCard").show(),e.find(".pay-enter a.next").off("click").on("click",function(){f(e,i)}).show()}),$(".card_and_wallet .top_title .left  a.goMyCard").click(function(){var e=$(this).parents(".choose_pay");e.find(".unBind_field").removeClass("active"),e.find(".form_box .sbank .blueBtn").trigger("click"),e.find(".pay-select-tab li").removeClass("disable").show().first().trigger("click"),e.find(".unBind_field .input-card-bind").show().find("input").val("").end().find("a").removeClass("active").end().find(".card_info").hide(),e.find(".hasBind_field").addClass("active"),$(this).hide(),$(this).parents(".choose_box").find(".pay-enter").addClass("active")}),$(".card_installment .top_title .left  a.goMyCard").click(function(){var e=$(this).parents(".choose_pay");if("credit"==e.find(".pay-select-tab li.on").attr("paytype")){var n=e.find(".credit-installment-field .hasBind_field");n.removeClass("unBind"),l(n),$(".credit-installment-field .unBind_field .sbank a").trigger("click")}$(this).hide()}),$(".card_and_wallet .pay-select-tab li").click(function(){if($(this).hasClass("disable")||$(this).hasClass("on"))return!1;var e=$(this).parents(".unBind_field"),n=$(this).index();$(this).addClass("on").siblings().removeClass("on"),e.find(".pay-select-con .pl-wrap").eq(n).show().siblings().hide(),e.find(".input-card-bind").show(),e.find(".pay-select-con .form_box").hide(),e.find(".form_box ul .card_type input").removeClass("disable").first().trigger("click"),e.find(".pl-wrap .pl-item").removeClass("on")}),$(".card_installment .pay-select-tab li").click(function(){var e=$(this).parents(".pay-select"),n=$(this).index();$(this).addClass("on").siblings().removeClass("on"),e.find(".pay-select-con .pay-select-con-item").eq(n).show().siblings().hide(),d(e,i)}),$(".card_and_wallet .pl-wrap").on("click",".pl-item",function(){var e=$(this).parents(".unBind_field");$(this).addClass("on").siblings().removeClass("on");var n=$(this).find("span"),t=n[0].outerHTML,a=i.options.bankLimit(n);e.find(".input-card-bind").hide(),$(this).parents(".pl-wrap").hasClass("kj-box")?($(this).removeClass("on"),e.find(".pay-select-con .pl-wrap").hide(),e.find(".form_box ul li.card_info").html(t+a),e.parents(".cont_box").hasClass("tn_wallet_box")?e.find(".form_box .btn_box .goToBind").text("立即支付").attr("href","#1").removeClass("active kj-pay wy-pay").addClass("wallet-pay").next("a").show():e.find(".form_box .btn_box .goToBind").text("同意开通并支付").attr("href","#1").removeClass("active wallet-pay wy-pay").addClass("kj-pay").next("a").show(),e.find(".form_box ul li.sbank a").off("click").on("click",function(){toBankList("kj-box",this)}),i.options.checkFormShow(e),e.find(".pay-select-con .form_box").show().find(".shortcut").show()):$(this).parents(".pl-wrap").hasClass("wy-box")&&($(this).removeClass("on"),e.find(".pay-select-con .pl-wrap").hide(),e.find(".form_box ul li.card_info").html(t+a),e.find(".form_box .btn_box .goToBind").text("跳转网银并支付").attr("href","#2").removeClass("wallet-pay kj-pay").addClass("active wy-pay").next("a").hide(),e.find(".form_box ul li.sbank a").off("click").on("click",function(){toBankList("wy-box",this)}),i.options.checkFormShow(e),e.find(".pay-select-con .form_box").show().find(".shortcut").hide())}),$(".card_pay_box .input-card-bind ul li").on("click","a.active",function(){if(!i.options.checkCardID())return!1;$(".card_pay_box .pay-select-tab li.kj-tab").addClass("on disable").siblings().removeClass("on").hide(),$(".card_pay_box .pay-select-con .pl-wrap").eq($(".card_pay_box .pay-select-tab li.kj-tab").index()).show().siblings().hide();var e=$(this).parents(".input-card-bind"),n=e.parents(".unBind_field"),t=e.find(".card_info span.bank-logo"),a=t[0].outerHTML,s=i.options.bankLimit(t);n.find(".form_box ul li.card_info").html(a+s),n.find(".form_box .btn_box .goToBind").text("同意开通并支付").attr("href","#1").removeClass("active wallet-pay wy-pay").addClass("kj-pay").next("a").show(),n.find(".form_box ul li.sbank a").off("click").on("click",function(){toBankList("kj-box",this)}),i.options.checkFormShow(n),n.find(".form_box ul li input.cardInput").val($(this).parents("ul").find("input").val()).attr("readonly","readonly").addClass("readonly"),n.find(".pay-select-con .pl-wrap").hide(),e.hide(),n.find(".pay-select-con .form_box").show().find(".shortcut").show()}),$(".card_installment .pl-wrap").on("click",".pl-item",function(){var e=$(this);if(e.hasClass("disable"))return!1;e.addClass("on").siblings().removeClass("on");var n=e.find("span").attr("name"),t=e.parents(".pay-select-con-item");i.options.loadInstallmentSelect(n,function(e){t.find(".fq-list li.fq-item").click(function(){c($(this),n,e)})},i,t)}),$(".card_installment .unBind_field .sbank a").on("click",function(){var e=$(this).parents(".unBind_field"),i=$(this).parents(".pay-select-con-item").find(".hasBind_field");e.removeClass("active"),n(e.find(".form_box")),i.addClass("active")}),$(".bankOrderInfo .pay_money p input").on("keyup",function(){o.call(i,parseFloat($(this).val())),$(".credit-installment-field .unBind_field .sbank a").trigger("click"),$(".thirdparty-installment-field .unBind_field .sbank a").trigger("click")}),$(".form_box .card_type").on("click","input",function(){if($(this).hasClass("disable"))return!1;var e=$(this),t=e.parents(".form_box"),a=t.find(".card_info .bank-logo"),s=t.find("ul li.card_info span")[0].outerHTML,o=i.options.cutBankLimit(a,e);t.find("ul li.card_info").html(s+o),e.hasClass("cx")?(t.find(".shortcut .credit").hide(),n(t)):e.hasClass("xy")&&(t.find(".shortcut .credit").show(),n(t))}),$(".date_select_box i").click(function(){return $(this).parents(".date_select_box").find("dl").toggle(),!1}),$("body").click(function(){$(".date_select_box dl").hide()}),$(".date_select_box dl dd").click(function(){$(this).parents(".date_select_box").find("input").val($(this).text()).removeClass("error hui-shake").parents("ul").find(".ts").hide(),$(this).addClass("cur").siblings().removeClass("cur")}),$(".mask_box").hover(function(){$(this).siblings(".mask_box").addClass("opacity")},function(){$(this).removeClass("opacity").siblings(".mask_box").removeClass("opacity")}),$(".bankOrderInfo .pay_money a").on("click",function(){var e=$(this);e.hasClass("disable")||(e.hasClass("cancle")?(e.parent().find("p input").hide().val("").end().find("p span").show(),e.removeClass("cancle").text("分次支付"),i.options.cancleFcPay(),o.call(i,parseInt(e.parent().find("p span.price").text())),$(".shoufuchufa").removeClass("disable"),$(".credit-installment-field .unBind_field .sbank a").trigger("click"),$(".thirdparty-installment-field .unBind_field .sbank a").trigger("click")):(e.parent().find("p span").hide().end().find("p input").show(),e.addClass("cancle").text("取消分次支付"),i.options.getFcPay(),$(".shoufuchufa").addClass("disable"),$(".credit-installment-field .unBind_field .sbank a").trigger("click"),$(".thirdparty-installment-field .unBind_field .sbank a").trigger("click")))}),$(".shoufuchufa .sfcf_tips").hover(function(){var e=$(this).find(".tips"),n=e.find("em").text().length;n>=56?e.css("width","654px"):e.css("width",12*n),e.show()},function(){$(this).find(".tips").hide()}),$(".shoufuchufa .fq-list li.fq-item").click(function(){if(!$(".shoufuchufa").hasClass("disable")){var e=$(this);e.addClass("on").siblings(".fq-item").removeClass("on");var n=i.options.createFqSelectInfo(e);return e.parents(".shoufuchufa").find(".fq-select-info").text(n),!$(".shoufuchufa").hasClass("active")&&$(".shoufuchufa").trigger("click"),i.options.isZeroPay(e)?($(".cont_box").hide(),$(".pay-problem").hide(),$(".shoufuchufa .pay-enter").addClass("active")):($(".cont_box").show(),$(".pay-problem").show(),$(".shoufuchufa .pay-enter").removeClass("active")),!1}}),$(".shoufuchufa .fq-list").on("click","li.more",function(){return $(".shoufuchufa").hasClass("disable")?void 0:($(this).hide(),$(this).parent().find(".fq-item").show(),!$(".shoufuchufa").hasClass("active")&&$(".shoufuchufa").trigger("click"),!1)}),$(".shoufuchufa").click(function(){var e=$(this),n=$(".card_installment");if(e.hasClass("disable"))return $(".pop_box .pop_win").html('<div class="head"><span>信息提示</span><img class="close" src="https://ssl.tuniucdn.com/img/20160308/jinrong/licai2/checkout/pop_close.png"></div><p>您已选择分次支付，分次支付与<br>首付出发不可同时使用，请选择其他支付方式</p><div class="butg"><a class="pop_btn confirm mar hover" href="javascript:;">我知道了</a></div>'),$(".pop_box .pop_win").off("click").on("click",".head img, .confirm",function(){$(".pop_box").hide()}),$(".pop_box").show(),m(),!1;if(e.hasClass("active"))e.removeClass("active"),y(),$(".cont_box").show(),$(".pay-problem").show(),$(".shoufuchufa .fq-select-info").text(""),$(".shoufuchufa .pay-enter").removeClass("active"),$(".bankOrderInfo .pay_money a").removeClass("disable"),i.options.cancleSfcf(),n.removeClass("disable");else{e.addClass("active");var t=$(".shoufuchufa .fq-list li.fq-item"),a=$(".shoufuchufa .fq-list li.fq-item.recommend");a.length?!a.eq(0).hasClass("on")&&a.eq(0).trigger("click"):!t.eq(0).hasClass("on")&&t.eq(0).trigger("click"),$(".bankOrderInfo .pay_money a").addClass("disable"),n.hasClass("active")&&b(n,i),n.addClass("disable")}}),$(".pay-problem p a").click(function(){$(this).hide().parent().addClass("height-auto")})}function g(e){this.options=e,this.init()}return g.prototype={constructor:g,init:function(){x.call(this),e($(".hasBind_field .choose_bank")),i($(".kj-box"),3),i($(".wy-box"),3),i($(".xy-installment-box"),3),t(this.options.hasBindCard),a(this.options.isAuth),_(),y(),h.call(this),u.call(this)}},g}(),window.otherUser=function(e){var n=$(e).parents(".form_box");n.find(".txtLi").hide(),n.find(".inputLi").show()},window.realNameUser=function(e){var n=$(e).parents(".user_box");n.find(".inputLi").hide(),n.find("input").val("").removeClass("error hui-shake"),n.find(".ts").hide(),n.find(".txtLi").show(),n.find(".date_select_box.idType dl dd").eq(0).trigger("click")},window.toBankList=function(e,n){var i=$(n).parents(".unBind_field");i.find(".pay-select-con .form_box").hide(),i.find(".form_box ul .card_type input").removeClass("disable").first().trigger("click"),i.find(".pay-select-tab li").removeClass("disable").show(),i.find(".input-card-bind").show().find("input").val("").end().find("a").removeClass("active").end().find(".card_info").hide().end().find(".ts").text(""),i.find(".pay-select-con .pl-wrap").each(function(){$(this).hasClass(e)&&$(this).show()})},window.formateCard=function(e){var n=window.event||arguments.callee.caller.arguments[0];if(8!=n.keyCode){var i=e.value,t=i.length,a=[4,9,14,19];1==t&&" "==i?e.value="":-1!=a.indexOf(t)&&(e.value=i+" ")}},window.blurCard=function(e){var n=e.value.replace(/\s/g,"");if(""!=n){for(var i="",t=[3,7,11,15],a=0;a<=n.length-1;a++)i+=n.charAt(a),-1!=t.indexOf(a)&&(i+=" ");e.value=i}},window.monthCheck=function(e){var n=e.value,i=n.length;1==i&&null==n.match(/[0-1]/)?e.value="":2==i&&"00"==n?e.value=0:2==i&&"1"==n.charAt(0)&&null==n.charAt(1).match(/[0-2]/)?e.value=1:i>=2&&"0"!=n.charAt(0)&&"1"!=n.charAt(0)&&(e.value="")};({$el:$("#modalCountDown"),$countDownElOdd:$(".icon-odd",".time-seconds"),$countDownElEven:$(".icon-even",".time-seconds"),timer:null,startIndex:7,reset:function(e){this.startIndex="undefined"==typeof e?this.startIndex:e,this.startIndex>=100&&(this.startIndex=99),this.numChange(),clearTimeout(this.timer)},open:function(e){this.reset(e),this.$el.show(),this.countDown()},close:function(){this.$el.hide()},countDown:function(){var e=this;this.timer=setTimeout(function(){e.startIndex--,e.numChange(),e.countDown()},1e3),1===this.startIndex?clearTimeout(this.timer):null},numChange:function(){var e=this.startIndex+"";2==e.length?(this.$countDownElOdd.attr("class","icon-even icon-number-"+e.charAt(0)),this.$countDownElEven.attr("class","icon-even icon-number-"+e.charAt(1))):1==e.length&&(this.$countDownElOdd.attr("class","icon-even icon-number-0"),this.$countDownElEven.attr("class","icon-even icon-number-"+this.startIndex))}})},141:function(e,n){}});