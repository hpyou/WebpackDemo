//兼容ie下不支持array.indexOf
(function () {
    if (!Array.indexOf) {
        Array.prototype.indexOf = function (obj) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == obj) {
                    return i;
                }
            }
            return -1;
        }
    }
})();

/*
 * 收银台交互逻辑
 * */
window.payInteraction = (function () {

    //选择银行卡-是否选择信用卡
    function _isCredit($obj) {
        $obj.each(function () {
            if ($(this).find(".selected_box .card_info .card-type-check").text() == "信用卡") {
                $(this).next(".form_box").find(".credit").show();
            } else {
                $(this).next(".form_box").find(".credit").hide();
            }
        });
    }

    //重置表单
    function _resetForm($box) {
        $box.find("input[type = 'text']").val("").removeClass("error hui-shake");
        $box.find("input.cardInput").removeAttr("readonly").removeClass("readonly");
        $box.find("ul li.inputLi a").trigger("click");
        $box.find(".ts").hide();
        $box.find(".date_select_box dl dd").removeClass("cur");
        $box.find(".date_select_box.idType dl dd").eq(0).trigger("click");
    }

    //更多按钮
    function _moreBank($box, lineNum) {
        $box.each(function () {
            var $lis = $(this).find("li");
            var liSize = $lis.size();
            if (liSize > lineNum * 5 + 1) {
                for (var i = 0; i <= liSize - 1; i++) {
                    if (i <= lineNum * 5 - 2) {
                        $lis.eq(i).show();
                    }
                    else {
                        break;
                    }
                }
                $(this).append($('<li class="pl-more"><span>更多银行</span></li>'));
                $(this).find(".pl-more").click(function () {
                    $lis.show();
                    $(this).hide();
                })
            } else if (liSize <= lineNum * 5 + 1 && liSize > 0) {
                $lis.show();
            }
        });
    }

    //显示途牛钱包
    function _showTnWallet(bindFlag) {
        if (bindFlag == 0) {
            //钱包未绑卡
            $(".tn_wallet_box .unBind_field").addClass("active");
        } else if (bindFlag == 1) {
            //钱包已绑卡

        }
    }

    //显示银行卡支付
    function _showCardPay(bindFlag) {
        if (bindFlag == 0) {
            //银行卡支付未绑卡
            $(".card_pay_box .unBind_field").addClass("active");
        } else if (bindFlag == 1) {
            //银行卡支付已绑卡

        }
    }

    //判断有无实名显示表单
    function _showAuth(isAuthFlag) {
        if (isAuthFlag == "") {
            $(".inputLi").show();
        }
    }

    //判断银行卡是否可用
    function _canUseCard($obj, payMoney){
        $obj.removeClass("disable");
        if(parseInt($obj.find(".tips p span").text()) > payMoney){
            $obj.addClass("disable");
        }
    }

    //付款金额判断分期信用卡是否可用
    function _canUseCardInstall(payMoney){
        var self = this;
        $(".pay-select-con-item").each(function(){
            var $this = $(this);
            var $hasBindField = $this.find(".hasBind_field");
            if($this.hasClass("credit-installment-field") && self.options.hasBindCreditInstallment == 1){
                $hasBindField.find(".bank_select_box .card_info").each(function(){
                    _canUseCard($(this), payMoney);
                });
                if(!$hasBindField.hasClass("unBind")){
                    _cardInstallSelectFirstOption($hasBindField);
                }
            }
            $hasBindField.find(".pl-wrap .pl-item").each(function(){
                _canUseCard($(this), payMoney);
            });
            if($hasBindField.hasClass("unBind")){
                _cardInstallSelectFirstItem($hasBindField);
            }
        });
    }

    //信用卡分期已绑卡自动选择第一个卡(扩展：可用于银行卡选择)
    function _cardInstallSelectFirstOption($field){
        var $selectCardFirst = $field.find(".bank_select_box .bank_select_list li.card_info:first");
        var $canSelectFirstCard = $field.find(".bank_select_box .bank_select_list li.card_info:not(.disable):first");
        if($canSelectFirstCard.length){
            $canSelectFirstCard.trigger("click");
            $field.removeClass("no-select");
            //银行卡是否支持促销活动
            $field.parents(".card_and_wallet").length && $field.parents(".card_and_wallet").removeClass("no-select");
        }else{
            $field.find(".bank_select_box .selected_box .card_info").html($selectCardFirst.html()).addClass("disable");
            $field.addClass("no-select");
            //银行卡是否支持促销活动
            $field.parents(".card_and_wallet").length && $field.parents(".card_and_wallet").addClass("no-select");
        }
    }

    //信用卡分期未绑卡自动选择银行卡
    function _cardInstallSelectFirstItem($field){
        var $canSelectItem = $field.find(".pl-wrap .pl-item:not(.disable):first");
        if($canSelectItem.length){
            $canSelectItem.trigger("click");
            $field.removeClass("no-select");
        }else{
            $field.find(".pl-wrap .pl-item").removeClass("on");
            $field.addClass("no-select");
        }
    }

    //信用卡分期tab重置
    function _resetCardInstallment($field, self){
        var $creditField = $field.find(".pay-select-con .credit-installment-field");
        var $thirdpartyField = $field.find(".pay-select-con .thirdparty-installment-field");
        if(self.options.hasBindCreditInstallment == 0){
            $creditField.find(".unBind_field .form_box .sbank a").trigger("click");
        }else if(self.options.hasBindCreditInstallment == 1){
            $creditField.parents(".choose_pay").find(".top_title .goMyCard").trigger("click");
        }
        $thirdpartyField.find(".unBind_field .form_box .sbank a").trigger("click");
    }

    //银行卡分期选择绑定事件
    function _bindSelectFq($obj, cardClass, self){
        $obj.addClass("on").siblings(".fq-item").removeClass("on");
        var fqSelectInfo = self.options.createCardFqSelectInfo(cardClass, $obj.find("em b").text(), $obj.find("em b").attr("rate"));
        $obj.parents(".hasBind_field").find(".fq-select-info span").html(fqSelectInfo);
    }

    //银行分期绑定下一步跳表单事件
    function _toFormStep($area, self){
        $area.find(".hasBind_field").removeClass("active");

        var $field = $area.find(".unBind_field");
        $field.addClass("active");
        //写入银行卡信息
        var $cardInfo = $area.find(".hasBind_field .pl-wrap .pl-item.on span");
        var bankObjStr = $cardInfo[0].outerHTML;
        var limitStr = $area.hasClass("credit-installment-field") ? self.options.bankLimit($cardInfo) : "";
        $field.find(".form_box ul li.card_info").html(bankObjStr + limitStr);
        //写入分期信息
        var fdInfo = $area.find(".hasBind_field .fq-select-info span").clone();
        fdInfo.find("em").remove();
        $field.find(".form_box ul li.fq-info").html(fdInfo);

        self.options.checkFormShow($field);
        $field.find(".pay-select-con .form_box").show().find(".shortcut").show();
    }

    //银行卡分期初始化
    function _initCardInstallment(){
        var self = this;
        //信用卡分期未绑卡初始化
        self.options.hasBindCreditInstallment == 0 ? _showCardInstallment($(".credit-installment-field"), self) : null;
        //第三方分期初始化
        _showCardInstallment($(".thirdparty-installment-field"), self);
        //根据支付金额判断信用卡分期卡是否可以
        _canUseCardInstall.call(self, parseInt($(".order_box .pay_money p span.price").text()));

        //银行卡是否支持促销活动初始化
        $(".card_and_wallet").each(function(){
            var $hasBindField = $(this).find(".hasBind_field");
            $hasBindField.length && _cardInstallSelectFirstOption($hasBindField);
        });
    }

    function _showCardInstallment($area, self){
        var $hasBindField = $area.find(".hasBind_field");
        !$hasBindField.hasClass("unBind") && $hasBindField.addClass("unBind");
        $hasBindField.find(".pay-enter a.next").off("click").on("click", function(){
            _toFormStep($area, self);
        });
    }

    function  _initApplicants(){
        var self = this;
        var applicantList = self.options.thirdpartyItmApplicantInfo;
        if("undefined" == typeof applicantList || applicantList.length == 0){
            return;
        }
        var optionsStr = "";
        for(var i = 0; i < applicantList.length; i++){
            optionsStr += "<dd>" + applicantList[i].name + "</dd>";
        }
        var $applicantSelect = $(".thirdparty-installment-field .unBind_field .date_select_box dl");
        $applicantSelect.html(optionsStr);
        $applicantSelect.find("dd").off("click").on("click", function () {
            var $this = $(this);
            $this.parents(".date_select_box").find("input").val($this.text()).removeClass("error hui-shake").parents("ul").find(".ts").hide();
            $this.addClass("cur").siblings().removeClass("cur");
            for(var i = 0; i < applicantList.length; i++){
                if(applicantList[i].name == $this.text()){
                    if(applicantList[i].idCard == "" || applicantList[i].idCard == null){
                        $applicantSelect.parents(".unBind_field").find(".idCard").val("").removeAttr("readonly");
                    }else{
                        $applicantSelect.parents(".unBind_field").find(".idCard").val(applicantList[i].idCard).attr("readonly","readonly");
                    }
                }
            }
        });
    }

    //版本限制显示
    function _versionHide() {
        //途牛钱包去银行下拉框等
        //$(".tn_wallet_box .bank_select_bar").remove();
        //$(".tn_wallet_box .bank_select_list").remove();
        $(".tn_wallet_box .pay-select-tab").remove();
        $(".tn_wallet_box .pay-select-con .pl-wrap.wy-box").remove();
        //银行卡去掉除快捷支付的其他
        //$(".shortcut_box .pay-select-tab").remove();
        //$(".shortcut_box .pay-select-con .pl-wrap.wy-box").remove();
        //途牛钱包删除信用单选框
        //$(".tn_wallet_box .xy").remove();
        //$(".tn_wallet_box .xy_label").remove();
    }

    //返回钱包，银行卡支付,银行卡分期的初始页面
    function _backToInitialPage($area, self) {
        if($area.hasClass("card_installment")){//银行卡分期block
            $area.find(".pay-select-tab li:first").trigger("click");
        }
        else if($area.hasClass("card_and_wallet")){
            _resetCardAndWallet($area, self);
        }

        $area.removeClass("active");
    }

    //重置钱包、银行卡支付block
    function _resetCardAndWallet($area, self){
        var $unBindField = $area.find(".unBind_field"),
            $hasBindField = $area.find(".hasBind_field"),
            $goMyCardBtn = $area.find(".top_title .left  a.goMyCard"),
            $backToListBtn = $area.find(".form_box .sbank .blueBtn"),
            $topTitleRight = $area.find(".top_title .right");

        if ($unBindField.length && $unBindField.hasClass("active")) {
            if($goMyCardBtn.length){
                $goMyCardBtn.trigger("click");//返回初始页面
            }
            else{
                $backToListBtn.trigger("click");//返回初始页面（未绑卡）
            }
        }

        if($hasBindField.length){
            $topTitleRight.hide();
        }

        $area.hasClass("tn_wallet_box") && self.options.cancleTnWallet();
    }

    //弹框垂直居中
    function _verticalPop(){
        $(".pop_box .pop_win").css("margin-top", -$(".pop_box .pop_win").height()/2);
    }

    //首付分期显示更多按钮
    function _showMoreFqBtn(){
        $(".shoufuchufa .fq-list li").removeClass("on").hide();
        var fqList = $(".shoufuchufa .fq-list li.fq-item");
        var fqRecommend =  $(".shoufuchufa .fq-list li.fq-item.recommend");
        fqRecommend.length ? fqRecommend.eq(0).show() : fqList.eq(0).show();//判断是否有推荐，优先显示推荐
        !$(".shoufuchufa .fq-list .more").length && $(".shoufuchufa .fq-list").append('<li class="more">更多分期</li>');
        $(".shoufuchufa .fq-list .more").show();
    }

    function _bindEvents() {
        var self = this;
        //途牛钱包or银行卡or银行卡分期点击展开
        $(".choose_box .unexpanded").on("click", function () {
            if($(this).parents(".choose_box").hasClass("card_installment disable")){
                $(".pop_box .pop_win").html('<div class="head"><span>信息提示</span><img class="close" src="https://ssl.tuniucdn.com/img/20160308/jinrong/licai2/checkout/pop_close.png"></div>' +
                    '<p>您已勾选首付出发，首付出发与<br>' +
                    '银行卡分期不可同时使用，请选择其他支付方式</p>' +
                    '<div class="butg"><a class="pop_btn confirm mar hover" href="javascript:;">我知道了</a></div>');
                $(".pop_box .pop_win").off("click").on("click", ".head img, .confirm",function () {
                    $(".pop_box").hide();
                });
                $(".pop_box").show();
                _verticalPop();
                return false;
            }
            var $area = $(this).parents(".choose_box"),
                $hasBindField = $area.find(".hasBind_field");
            if (!$area.hasClass("active")) {
                $(".link_box").removeClass("active");
                var $otherArea = $area.siblings(".choose_box.active");
                _backToInitialPage($otherArea, self);
                if($area.hasClass("card_and_wallet")){//途牛钱包or银行卡
                    //$hasBindField.length && $hasBindField.find(".bank_select_box .bank_select_list li.card_info:first").trigger("click");
                    //银行卡是否支持促销活动
                    $hasBindField.length && _cardInstallSelectFirstOption($hasBindField);
                    $area.hasClass("tn_wallet_box") && self.options.selectTnWallet();
                }
                else if($area.hasClass("card_installment")){//银行卡分期
                    var $creditHasBindField = $area.find(".credit-installment-field .hasBind_field");
                    if(self.options.hasBindCreditInstallment == 1){
                        _cardInstallSelectFirstOption($creditHasBindField);
                    }
                    else if(self.options.hasBindCreditInstallment == 0){
                        _cardInstallSelectFirstItem($creditHasBindField);
                    }
                }
                $area.addClass("active");
                $area.find(".top_title .right").show();
            }
        });

        //途牛宝or支付平台点击选中
        $(".link_box").on("click", function () {
            if (!$(this).hasClass("active")) {
                $(this).addClass("active").siblings(".link_box").removeClass("active");
                var $otherArea = $(".choose_box.active");
                _backToInitialPage($otherArea, self);
            }
        });

        //银行选择框
        $(".bank_select_box .bank_select_list li.card_info").click(function () {
            var $this = $(this);
            if($this.hasClass("disable")){//选项不可选
                return false;
            }
            $this.addClass("cur").siblings().removeClass("cur");
            $this.parents(".bank_select_box").find(".selected_box .card_info").removeClass("disable").html($this.html());
            $this.parents(".tn_wallet_box").length && self.options.getActivityPay($this);//途牛钱包优惠
            _resetForm($this.parents(".hasBind_field").find(".form_box"));
            $this.parents(".card_and_wallet").length && _isCredit($this.parents(".choose_bank"));//钱包和银行卡支付切换显示有效期和卡验证码
            if($this.parents(".credit-installment-field").length){//信用卡分期部分
                var cardClass = $this.find("span").attr("name");
                var $field = $this.parents(".pay-select-con-item");
                self.options.loadInstallmentSelect(cardClass, function(self){
                    //选择分期(信用卡分期)
                    $(".credit-installment-field .fq-list li.fq-item").click(function(){
                        _bindSelectFq($(this), cardClass, self);
                    });
                }, self, $field);
            }
        });
        $(".bank_select_box .selected_box").click(function () {
            $(this).parents(".hasBind_field").find(".date_select_box dl").hide();//日期下拉隐藏
            $(this).next(".bank_select_list").toggle();
            return false;
        });
        $("body").click(function () {
            $(".bank_select_box .bank_select_list").hide();
        });

        //选择新银行卡(钱包&银行卡)
        $(".card_and_wallet .choose_bank .add_bank").click(function () {
            var $area = $(this).parents(".choose_pay");
            $(this).parents(".choose_box").find(".pay-enter").removeClass("active");//隐藏支付按钮
            $area.find(".hasBind_field").removeClass("active");
            $area.find(".bank_select_box .bank_select_list li.card_info:first").trigger("click");//重置我的银行卡
            $area.find(".unBind_field").addClass("active");
            $area.find(".top_title .left a.goMyCard").show();
        });

        //选择新银行卡(银行卡分期)
        $(".credit-installment-field .choose_bank .add_bank").click(function () {
            var $area = $(this).parents(".credit-installment-field");
            var $hasBindField = $area.find(".hasBind_field");
            $hasBindField.addClass("unBind");
            _cardInstallSelectFirstItem($hasBindField);
            $area.parents(".card_installment").find(".top_title .goMyCard").show();
            $area.find(".pay-enter a.next").off("click").on("click", function(){
                _toFormStep($area, self);
            }).show();
        });

        //返回到我的银行卡(钱包&银行卡)
        $(".card_and_wallet .top_title .left  a.goMyCard").click(function () {
            var $area = $(this).parents(".choose_pay");
            $area.find(".unBind_field").removeClass("active");
            $area.find(".form_box .sbank .blueBtn").trigger("click");//没有tab时重置选择新银行卡页面（有tab可以去掉）
            $area.find('.pay-select-tab li').removeClass("disable").show().first().trigger("click");//显示所有tab,重置选择新银行卡页面
            //重置银行卡输入绑定流程
            $area.find(".unBind_field .input-card-bind").show().find("input").val("").end().find("a").removeClass("active").end().find(".card_info").hide();
            $area.find(".hasBind_field").addClass("active");
            $(this).hide();
            $(this).parents(".choose_box").find(".pay-enter").addClass("active");//显示支付按钮
        });

        //返回到我的银行卡(银行卡分期)
        $(".card_installment .top_title .left  a.goMyCard").click(function () {
            var $area = $(this).parents(".choose_pay");
            if($area.find(".pay-select-tab li.on").attr("paytype") == "credit"){
                var $field = $area.find(".credit-installment-field .hasBind_field");
                $field.removeClass("unBind");
                _cardInstallSelectFirstOption($field);
                $(".credit-installment-field .unBind_field .sbank a").trigger("click");
            }
            $(this).hide();
        });

        //选择支付方式(快捷or网银)
        $('.card_and_wallet .pay-select-tab li').click(function () {
            if($(this).hasClass("disable") || $(this).hasClass("on")){
                return false;
            }
            var $field = $(this).parents(".unBind_field");
            //设置支付方式
            var index = $(this).index();
            $(this).addClass('on').siblings().removeClass('on');
            $field.find(".pay-select-con .pl-wrap").eq(index).show().siblings().hide();
            //显示并重置银行卡输入绑定流程
            //$field.find(".input-card-bind").show().find("input").val("").end().find("a").removeClass("active").end().find(".card_info").hide();
            $field.find(".input-card-bind").show();
            //隐藏表单
            $field.find(".pay-select-con .form_box").hide();
            //重置表单
            $field.find(".form_box ul .card_type input").removeClass("disable").first().trigger("click");
            //重置银行
            $field.find(".pl-wrap .pl-item").removeClass("on");
        });

        //选择分期支付方式(信用卡分期or网银分期or第三方分期)
        $('.card_installment .pay-select-tab li').click(function () {
            var $field = $(this).parents(".pay-select");
            //设置支付方式
            var index = $(this).index();
            $(this).addClass('on').siblings().removeClass('on');
            $field.find(".pay-select-con .pay-select-con-item").eq(index).show().siblings().hide();
            //银行卡分期重置
            _resetCardInstallment($field, self);
        });

        //选择银行(钱包和银行卡支付)
        $('.card_and_wallet .pl-wrap').on('click', '.pl-item', function () {
            var $field = $(this).parents(".unBind_field");
            $(this).addClass('on').siblings().removeClass('on');
            var $cardInfo = $(this).find("span");
            var bankObjStr = $cardInfo[0].outerHTML;
            var limitStr = self.options.bankLimit($cardInfo);
            $field.find(".input-card-bind").hide();
            if ($(this).parents(".pl-wrap").hasClass("kj-box")) {
                $(this).removeClass('on');
                $field.find(".pay-select-con .pl-wrap").hide();
                $field.find(".form_box ul li.card_info").html(bankObjStr + limitStr);
                if($field.parents(".cont_box").hasClass("tn_wallet_box")){
                    $field.find(".form_box .btn_box .goToBind").text("立即支付").attr("href", "#1").removeClass("active kj-pay wy-pay").addClass("wallet-pay").next("a").show();
                }else{
                    $field.find(".form_box .btn_box .goToBind").text("同意开通并支付").attr("href", "#1").removeClass("active wallet-pay wy-pay").addClass("kj-pay").next("a").show();
                }
                //$field.find(".form_box ul li.sbank a").attr("onclick", "toBankList("kj-box",this);");//不兼容ie7
                $field.find(".form_box ul li.sbank a").off("click").on("click",function(){
                    toBankList("kj-box",this);
                });
                self.options.checkFormShow($field);
                $field.find(".pay-select-con .form_box").show().find(".shortcut").show();
            }
            else if ($(this).parents(".pl-wrap").hasClass("wy-box")) {
                $(this).removeClass('on');
                $field.find(".pay-select-con .pl-wrap").hide();
                $field.find(".form_box ul li.card_info").html(bankObjStr + limitStr);
                $field.find(".form_box .btn_box .goToBind").text("跳转网银并支付").attr("href", "#2").removeClass("wallet-pay kj-pay").addClass("active wy-pay").next("a").hide();
                //$field.find(".form_box ul li.sbank a").attr("onclick", "toBankList("wy-box",this);");//不兼容ie7
                $field.find(".form_box ul li.sbank a").off("click").on("click",function(){
                    toBankList("wy-box",this);
                });
                self.options.checkFormShow($field);
                $field.find(".pay-select-con .form_box").show().find(".shortcut").hide();
            }
        });

        //银行卡输入卡号绑卡（支付流程改造）
        $(".card_pay_box .input-card-bind ul li").on('click', 'a.active', function(){
            if(!self.options.checkCardID()){
                return false;
            }
            //手动设置tab（快捷tab不可点，其他tab隐藏）
            $('.card_pay_box .pay-select-tab li.kj-tab').addClass("on disable").siblings().removeClass("on").hide();
            $(".card_pay_box .pay-select-con .pl-wrap").eq($('.card_pay_box .pay-select-tab li.kj-tab').index()).show().siblings().hide();

            var $inputCardBind = $(this).parents(".input-card-bind");
            var $field = $inputCardBind.parents(".unBind_field");
            var $cardInfo = $inputCardBind.find(".card_info span.bank-logo");
            var bankObjStr = $cardInfo[0].outerHTML;
            var limitStr = self.options.bankLimit($cardInfo);
            $field.find(".form_box ul li.card_info").html(bankObjStr + limitStr);
            $field.find(".form_box .btn_box .goToBind").text("同意开通并支付").attr("href", "#1").removeClass("active wallet-pay wy-pay").addClass("kj-pay").next("a").show();
            $field.find(".form_box ul li.sbank a").off("click").on("click",function(){
                toBankList("kj-box",this);
            });
            self.options.checkFormShow($field);
            //银行卡号带入表格
            $field.find(".form_box ul li input.cardInput").val($(this).parents("ul").find("input").val()).attr("readonly", "readonly").addClass("readonly");
            $field.find(".pay-select-con .pl-wrap").hide();
            $inputCardBind.hide();
            $field.find(".pay-select-con .form_box").show().find(".shortcut").show();
        });

        //银行卡分期选择银行
        $('.card_installment .pl-wrap').on('click', '.pl-item', function () {
            var $this = $(this);
            if($this.hasClass("disable")){
                return false;
            }
            $this.addClass('on').siblings().removeClass('on');
            var cardClass = $this.find("span").attr("name");
            var $field = $this.parents(".pay-select-con-item");
            self.options.loadInstallmentSelect(cardClass, function(self){
                //选择分期(信用卡分期)
                $field.find(".fq-list li.fq-item").click(function(){
                    _bindSelectFq($(this), cardClass, self);
                });
            }, self, $field);
        });

        //银行卡分期返回选择其他银行
        $(".card_installment .unBind_field .sbank a").on("click", function(){
            var $unBindField = $(this).parents(".unBind_field");
            var $hasBindField = $(this).parents(".pay-select-con-item").find(".hasBind_field");
            $unBindField.removeClass("active");
            _resetForm($unBindField.find(".form_box"));
            $hasBindField.addClass("active");
        });

        $(".bankOrderInfo .pay_money p input").on("keyup", function(){
            _canUseCardInstall.call(self, parseFloat($(this).val()));
            $(".credit-installment-field .unBind_field .sbank a").trigger("click");//信用卡分期退到选择银行
            $(".thirdparty-installment-field .unBind_field .sbank a").trigger("click");//第三方分期退到选择银行
        });

        //储蓄卡\信用卡切换
        $(".form_box .card_type").on("click", "input", function () {
            //表单有银行卡号时，不让复选框点击（因为会重置表单，把银行卡号删掉）
            if($(this).hasClass("disable")){
                return false;
            }
            var $radio = $(this);
            var $box = $radio.parents(".form_box");
            var $cardInfo = $box.find(".card_info .bank-logo");
            var bankObjStr = $box.find("ul li.card_info span")[0].outerHTML;
            var limitStr = self.options.cutBankLimit($cardInfo, $radio);//储蓄卡信用卡切换限额
            $box.find("ul li.card_info").html(bankObjStr + limitStr);
            if ($radio.hasClass("cx")) {
                $box.find(".shortcut .credit").hide();
                _resetForm($box);
            }
            else if ($radio.hasClass("xy")) {
                $box.find(".shortcut .credit").show();
                _resetForm($box);
            }
        });

        //日期选择框
        $(".date_select_box i").click(function () {
            $(this).parents(".date_select_box").find("dl").toggle();
            return false;
        });
        $("body").click(function () {
            $(".date_select_box dl").hide();
        });
        $(".date_select_box dl dd").click(function () {
            $(this).parents(".date_select_box").find("input").val($(this).text()).removeClass("error hui-shake").parents("ul").find(".ts").hide();
            $(this).addClass("cur").siblings().removeClass("cur");
        });

        //支付平台蒙层效果
        $(".mask_box").hover(function () {
            $(this).siblings(".mask_box").addClass("opacity");
        }, function () {
            $(this).removeClass("opacity").siblings(".mask_box").removeClass("opacity");
        });

        //分次支付
        $(".bankOrderInfo .pay_money a").on("click",function(){
            var $this = $(this);
            if($this.hasClass("disable")) return;
            if($this.hasClass("cancle")){
                $this.parent().find("p input").hide().val("").end().find("p span").show();
                $this.removeClass("cancle").text("分次支付");
                self.options.cancleFcPay();
                _canUseCardInstall.call(self, parseInt($this.parent().find("p span.price").text()));
                $(".shoufuchufa").removeClass("disable");
                $(".credit-installment-field .unBind_field .sbank a").trigger("click");//信用卡分期退到选择银行
                $(".thirdparty-installment-field .unBind_field .sbank a").trigger("click");//第三方分期退到选择银行
            }else{
                $this.parent().find("p span").hide().end().find("p input").show();
                $this.addClass("cancle").text("取消分次支付");
                self.options.getFcPay();
                $(".shoufuchufa").addClass("disable");
                $(".credit-installment-field .unBind_field .sbank a").trigger("click");//信用卡分期退到选择银行
                $(".thirdparty-installment-field .unBind_field .sbank a").trigger("click");//第三方分期退到选择银行
            }
        });

        //首付出发提示框
        $(".shoufuchufa .sfcf_tips").hover(function(){
            var $tips = $(this).find(".tips"),
                txtLength = $tips.find("em").text().length;
            if(txtLength >= 56){
                $tips.css("width", "654px");
            }else{
                $tips.css("width", 12*txtLength);
            }
            $tips.show();
        },function(){
            $(this).find(".tips").hide();
        });

        //选择分期(首付出发)
        $(".shoufuchufa .fq-list li.fq-item").click(function(){
            if($(".shoufuchufa").hasClass("disable")) return;
            var $this = $(this);
            $this.addClass("on").siblings(".fq-item").removeClass("on");
            var fqSelectInfo = self.options.createFqSelectInfo($this);
            $this.parents(".shoufuchufa").find(".fq-select-info").text(fqSelectInfo);
            !$(".shoufuchufa").hasClass("active") && $(".shoufuchufa").trigger("click");
            if(self.options.isZeroPay($this)){
                $(".cont_box").hide();
                $(".pay-problem").hide();
                $(".shoufuchufa .pay-enter").addClass("active");
            }
            else{
                $(".cont_box").show();
                $(".pay-problem").show();
                $(".shoufuchufa .pay-enter").removeClass("active");
            }
            return false;
        });
        $(".shoufuchufa .fq-list").on("click","li.more",function(){
            if($(".shoufuchufa").hasClass("disable")) return;
            $(this).hide();
            $(this).parent().find(".fq-item").show();
            !$(".shoufuchufa").hasClass("active") && $(".shoufuchufa").trigger("click");
            return false;
        });

        //选择首付出发开关
        $(".shoufuchufa").click(function(){
            var $this = $(this);
            var $cardInstallmentArea = $(".card_installment");//银行卡分期block
            if($this.hasClass("disable")){
                $(".pop_box .pop_win").html('<div class="head"><span>信息提示</span><img class="close" src="https://ssl.tuniucdn.com/img/20160308/jinrong/licai2/checkout/pop_close.png"></div>' +
                    '<p>您已选择分次支付，分次支付与<br>' +
                    '首付出发不可同时使用，请选择其他支付方式</p>' +
                    '<div class="butg"><a class="pop_btn confirm mar hover" href="javascript:;">我知道了</a></div>');
                $(".pop_box .pop_win").off("click").on("click", ".head img, .confirm", function () {
                    $(".pop_box").hide();
                });
                $(".pop_box").show();
                _verticalPop();
                return false;
            }
            if($this.hasClass("active")){
                //退出首付出发
                $this.removeClass("active");
                _showMoreFqBtn();
                $(".cont_box").show();//显示支付块
                $(".pay-problem").show();
                $(".shoufuchufa .fq-select-info").text("");//清空分期选择信息
                $(".shoufuchufa .pay-enter").removeClass("active");//隐藏首付分期支付按钮
                $(".bankOrderInfo .pay_money a").removeClass("disable");
                self.options.cancleSfcf();
                $cardInstallmentArea.removeClass("disable");
            }
            else{
                //选择首付出发
                $this.addClass("active");
                var fqList = $(".shoufuchufa .fq-list li.fq-item");
                var fqRecommend =  $(".shoufuchufa .fq-list li.fq-item.recommend");
                if(fqRecommend.length){//判断是否有推荐，优先选择推荐
                    !fqRecommend.eq(0).hasClass("on") && fqRecommend.eq(0).trigger("click");
                }
                else{
                    !fqList.eq(0).hasClass("on") && fqList.eq(0).trigger("click");
                }
                $(".bankOrderInfo .pay_money a").addClass("disable");

                if($cardInstallmentArea.hasClass("active")){
                    _backToInitialPage($cardInstallmentArea, self);
                }
                $cardInstallmentArea.addClass("disable");
            }

        });

        //更多支付问题
        $(".pay-problem p a").click(function(){
            $(this).hide().parent().addClass("height-auto");
        });

    }

    function payInteraction(opts) {
        this.options = opts;
        this.init();
    }

    payInteraction.prototype = {
        constructor: payInteraction,
        init: function () {
            _bindEvents.call(this);
            _isCredit($(".hasBind_field .choose_bank"));
            _moreBank($(".kj-box"), 3);
            _moreBank($(".wy-box"), 3);
            _moreBank($(".xy-installment-box"), 3);
            //_showTnWallet(this.options.hasBindTnWallet);
            _showCardPay(this.options.hasBindCard);
            _showAuth(this.options.isAuth);
            _versionHide();
            _showMoreFqBtn();
            _initCardInstallment.call(this);//银行卡分期初始化
            _initApplicants.call(this);//第三方分期申请人初始化
        }
    };
    return payInteraction;
})();

/*
 * 全局函数，在onclick,onkeyup等中使用
 *
 * */
//使用其他用户
window.otherUser = function (obj) {
    var $formBox = $(obj).parents(".form_box");
    $formBox.find(".txtLi").hide();
    $formBox.find(".inputLi").show();
};

//使用实名用户
window.realNameUser = function(obj) {
    var $userBox = $(obj).parents(".user_box");
    //重置用户信息
    $userBox.find(".inputLi").hide();
    $userBox.find("input").val("").removeClass("error hui-shake");
    $userBox.find(".ts").hide();
    $userBox.find(".txtLi").show();
    $userBox.find(".date_select_box.idType dl dd").eq(0).trigger("click");
};

//选择其他银行
window.toBankList = function (classStr, obj) {
    var $field = $(obj).parents(".unBind_field");
    $field.find(".pay-select-con .form_box").hide();
    $field.find(".form_box ul .card_type input").removeClass("disable").first().trigger("click");//重置表单
    $field.find(".pay-select-tab li").removeClass("disable").show();//显示所有tab
    $field.find(".input-card-bind").show().find("input").val("").end().find("a").removeClass("active").end().find(".card_info").hide().end().find(".ts").text("");
    $field.find('.pay-select-con .pl-wrap').each(function(){
       $(this).hasClass(classStr) && $(this).show();
    });
};

//格式化银行卡号
window.formateCard = function (obj) {
    var evt = window.event || arguments.callee.caller.arguments[0];
    if (evt.keyCode == 8) {
        return;
    }
    var value = obj.value;
    var length = value.length;
    var indexArr = [4, 9, 14, 19];
    if (length == 1 && value == " ") {
        obj.value = "";
    }
    else if (indexArr.indexOf(length) != -1) {
        obj.value = value + " ";
    }
};
//失去焦点后再次格式化银行卡号
window.blurCard = function (obj) {
    var value = obj.value.replace(/\s/g, "");
    if (value != "") {
        var blurValue = "";
        var indexArr = [3, 7, 11, 15];
        for (var i = 0; i <= value.length - 1; i++) {
            blurValue += value.charAt(i);
            if (indexArr.indexOf(i) != -1) {
                blurValue += " ";
            }
        }
        obj.value = blurValue;
    }
};

//表单月份验证
window.monthCheck = function (obj) {
    var value = obj.value,
        length = value.length;
    if (length == 1 && value.match(/[0-1]/) == null) {
        obj.value = "";
    }
    else if (length == 2 && value == '00') {
        obj.value = 0;
    }
    else if (length == 2 && value.charAt(0) == '1' && value.charAt(1).match(/[0-2]/) == null) {
        obj.value = 1;
    }
    else if (length >= 2 && value.charAt(0) != '0' && value.charAt(0) != '1') {
        obj.value = "";
    }
};


/**
 * @name 支付等待动画
 * @pram 正整数
 * */
var modalCountDown = {
    $el: $('#modalCountDown'),
    $countDownElOdd: $('.icon-odd','.time-seconds'),
    $countDownElEven: $('.icon-even','.time-seconds'),
    timer: null,
    startIndex: 7,
    reset: function(timeSecond){
        this.startIndex = typeof(timeSecond) == "undefined" ? this.startIndex : timeSecond;
        if(this.startIndex >= 100){
            this.startIndex = 99;
        }
        this.numChange();
        clearTimeout(this.timer);
    },
    open: function(timeSecond){
        this.reset(timeSecond);
        this.$el.show();
        this.countDown();
    },
    close: function(){
        this.$el.hide();
    },
    countDown: function(){
        var self = this;
        this.timer = setTimeout(function(){
            self.startIndex--;
            self.numChange();
            self.countDown();
        },1000);
        this.startIndex === 1 ? clearTimeout(this.timer) : null;
    },
    numChange: function(){
        var startIndexStr = this.startIndex + "";
        if(startIndexStr.length == 2){
            this.$countDownElOdd.attr('class','icon-even icon-number-' + startIndexStr.charAt(0));
            this.$countDownElEven.attr('class','icon-even icon-number-' + startIndexStr.charAt(1));
        }else if(startIndexStr.length == 1) {
            this.$countDownElOdd.attr('class', 'icon-even icon-number-0');
            this.$countDownElEven.attr('class', 'icon-even icon-number-' + this.startIndex);
        }
    }
};
