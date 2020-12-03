
/*************************************************************************************
**	 新金额控件 author xiang
**	 2013-03-04 编写金额输入控件要求如下：
**   在控件中 小数部分两位 0.00  整数部分以千分位计数。
**   光标不可改变始终放到控件小数位最后 当用户输入时向左移位
**		输入要求 可以为正负数据 正数没有符号 负数需要显示 ‘-’
**   键盘控制要求	；
**                  当用户输入'.'自动将当前数据添加2位小数  .00  原始值放大100倍
**									 Backspace 从最后一位开始清除数据，始终保持两位小数	最后显示 0.00
**									 - 将当前数据变为负数
**                   - 如果当前为负数那么变为正数
**									 del 清楚当前控件值为空 0.00
*************************************************************************************/

function InputMoney(ele){
	//最大小数位,默认为两位

	var _DECLEN = 2;
	if (ele._dot) _DECLEN = parseInt(ele._dot);
	//加千分隔
	function addComma(n) {
		return (n + '').split('').reverse().join('').replace(/(\d{3})(?!\d*\.\d+)/g, '$1,').split('').reverse().join('').replace(/^(-?),/, '$1');
	}
	//去千分隔
	function delComma(n) {
		return n.replace(/,/g, '');
	}
	function trim(n) {
		return n.replace(/(^\s+)|(\s+$)/g, '');
	}
	function addDigit(n, digit) {
		if (n == '') n = initNumber('0');

		if(ele.amtFlag ==1){//判断是是否输入小数点

			ele.amtNum +=  1; //记录输入小数点后点击次数
			n = delComma(n).replace('.', '');
			var intPart = n.substring(0, n.length - _DECLEN);//活期小数点前数字

	 		if (n.replace('-', '').length < ele.maxLength && ele.amtNum <= _DECLEN){
	 			if(ele.amtNum == 1){//首次输入将输入值放小数点后首位
	 				var decPart =digit+n.substring(n.length - (_DECLEN-1));
	 			}else{//将输入项按顺序排序
	 				var decLength =n.substring(n.length - _DECLEN);
	 				var decPart =decLength.substring(0,ele.amtNum-1)+digit+n.substring(n.length - (_DECLEN-ele.amtNum));
	 			}
	 		}else{//超出输入长度或超出输入输入次数直接截取小数位
	 			var decPart = n.substring(n.length - _DECLEN);
	 		}

		}else{
			n = delComma(n).replace('.', '');
	 		if (n.replace('-', '').length < ele.maxLength) n += '' + digit
			var intPart = n.substring(0, n.length - _DECLEN);
			var decPart = n.substring(n.length - _DECLEN);
		}
//        if(n.substring(n.length,n.length-1)=='.'){ //判断最后一位是否为. 加一位
//        	n = delComma(n).replace('.', '');
//    		if (n.replace('-', '').length < ele.maxLength) n += '' + digit+"0";
//        }else{
//        	n = delComma(n).replace('.', '');
//    		if (n.replace('-', '').length < ele.maxLength) n += '' + digit;
//        }


		n = intPart.replace(/^(-?)0+(?=\d)/, '$1') + '.' + decPart;
		return addComma(n);
	}
	function delDigit(n) {
		var sign = n.substring(0, 1) == '-';
		n = delComma(n).replace(/\.|-/g, '');
		n = n.substring(0, n.length - 1);
		var intPart = n.substring(0, n.length - _DECLEN);
		var decPart = n.substring(n.length - _DECLEN);
		if (intPart.length == 0) {
			intPart = '0';
			if (decPart.length < _DECLEN) decPart = '0' + decPart;
		}
		n = (sign && (intPart != '0' || !/^0+$/.test(decPart)) ? '-' : '') + intPart + '.' + decPart;

		if(parseFloat(n) == 0){//判断是否清空 输入值为0.00
			ele.amtFlag = 0;//清空小数点记录
			ele.amtNum = 0;//清空小数点后输入次数
		}

		return addComma(n);
	}
	function shift(n) {
		if(ele.amtFlag!=1){
			n = delComma(n).replace('.', '')
			n = parseFloat(n) + '.';
			for (var i = 0; i < _DECLEN; i++) n += '0';
			ele.amtNum = 0;//初始化输入小数点后输入次数
		}

		ele.amtFlag=1;//记录输入小数点标识
		n = delComma(n);
		return addComma(n);
	}
	function initNumber(n) {
		//初值判断
		n = n == '' ? '0' : delComma(trim(n));
		if (isNaN(n)) n = '0';

		//因为在整个运算过程中 不使用小数位所以要还原没有小数位的整数值
		var a=1;
		if(ele._dot > 0){
			for (var i=0; i<ele._dot; i++){
				a = a*10
			}
			n = n/a;
		}

		//类型转换
		n += '';
		var posDot = n.indexOf('.');
		if (posDot < 0) {
			n += '.';
			for (var i = 0; i < _DECLEN; i++) n += '0';
		}
		else {
			var intPart = n.substring(0, posDot);
			var decPart = n.substring(posDot + 1);
			while (decPart.length < _DECLEN) decPart += '0';
			n = intPart + '.' + decPart;
		}
		return addComma(n);
	}

	if (ele.tagName && ele.tagName == 'INPUT') {
		switch (event.type) {
			case 'focus':
				//;
				if(ele.value.replace(/,/g,'').length>13+1){//添加光标重新进入后金额域输入控制，添加小数点
					ele.amtFlag=1;
					ele.amtNum=ele._dot;

				}
				ele.className = "InputMoney";
				ele.value = initNumber(ele.value);
//				ele.select();                    //将当前选中区置为当前对象。    20160921 贾真
                ele.style.imeMode="disabled"; //完全禁用IME   控制输入法
				break;
			case 'keydown':
				if (event.keyCode >= 48 && event.keyCode <= 57) {	//0~9
					//add by hanqian 20161029 金额超长处理，最大金额整数位长度13
					if(ele.amtFlag!=1&&ele.value.replace(/,/g,'').length==13+1){
						ele.value = shift(ele.value);
					}
					ele.value = addDigit(ele.value, String.fromCharCode(event.keyCode));
				}
				else if (event.keyCode >= 96 && event.keyCode <= 105) {
					//add by hanqian 20161012 金额超长处理，最大金额整数位长度13
					if(ele.amtFlag!=1&&ele.value.replace(/,/g,'').length==13+1){
						ele.value = shift(ele.value);
					}
					ele.value = addDigit(ele.value, String.fromCharCode(event.keyCode - 48));
				}
				else if (event.keyCode == 190||event.keyCode == 110) {	//小数点
					ele.value = shift(ele.value);
				}
//				else if (event.keyCode == 189||event.keyCode == 109) {	//负号
//					if (ele.value.substring(0, 1) == '-') ele.value = ele.value.substring(1);
//					else ele.value = '-' + ele.value;
//				}
				else if (event.keyCode == 8) {	//退格

					ele.value = delDigit(ele.value);
				}
				else if (event.keyCode == 46) {	//删除

					ele.amtFlag = 0;//清空小数点记录
					ele.amtNum = 0;//清空小数点后输入次数
					ele.value = initNumber('0');
				}
				//回车 或者向上键 时还原 没有小数位的真实金额
				if ((event.keyCode == 13 || event.keyCode == 38 )&& event.keyCode != 9) {
					/*
					**这里由于原来的金额处理比较零乱所以还要将控件值还原为
					**没有小数位值然后让原有JS 处理
					**如果有待好好整理
					*/

					ele.amtFlag = 0;
					ele.amtNum = 0;
					ele.value = delComma(getInputMoneyValue(ele));
					if (ele._dot) ele.value = ele.value.replace('.', '');
					if (isNaN(ele.value)){
						ele.value = 0;
						showErrorMsg("不是有效数字,或超出最大取值范围"+ele.value);
					}
				}else{
					event.cancelBubble = true;
					event.returnValue = false;
				}
				break;
			case 'blur':
				break;
		}
	}
}

function getInputMoneyValue(ele) {
	var n = ele.value.replace(/,/g, '');
	if (ele._dot == '0') n = n.replace(/\.\d*$/, '');
	return n;
}




/**
 * 类AmtControl          ： 处理金额
 * 类AmtFormat           ： 金额格式处理的基类
 * 类AmtFormatDot        ： 输入小数点录入模式
 * 类AmtFormatUnDot      ： 不需输入小数点录入模式
 * 方法isInputDot        ： 判断输入域当前的输入模式,返回true表示不需要输入小数点，false表示需要输入小数点
 * 方法createInheritance ： 类继承公共方法
 * 方法crtAmtFormatDot   ： 创建输入小数点数据的类
 * 方法crtAmtFormatUnDot ： 创建不需输入小数点数据的类

  使用方法：
   1、数据转换
		var amt = new AmtControl();
		ob.value = amt.getAmtFormatDot(ob);
   2、输入数据，失去焦点时的转换
		var amt = new AmtControl();
		ob.value = amt.getInputFormat(ob);
   3、焦点进入输入域，转换成待修改数据
		var amt = new AmtControl();
		//转换
		amt.getOutputFormat(ob);
		//返回修改数据
		ob.value = amt.getShowValue();
		//真实数据
		alert(o.getRealValue());
   4、判断输入域当前的输入模式
		if (!isInputDot()){
		}
 */
var formatAction="2";   // 1-输入小数点 2-不用输入小数点

function AmtControl() {

	//根据正常数据（包含小数点的数据）, 转换数据格式为金额显示方式
	this.getAmtFormatDot = function(ob){
		var amtObj = crtAmtFormatDot(ob);

		//处理小数点部分
		amtObj.getInputChangeDec();
		//整数部分
        var r = amtObj.getInputInteger();
		//小数部分
		r += amtObj.getInputDotSign();
		r = amtObj.setSign(r);
		return r;
	}
	//输入数据, 根据当前的处理模式, 转换数据格式为金额显示方式
	this.getInputFormat = function(ob){
		var amtObj ;
		if (isInputDot()){ //不输入小数点的模式
			amtObj = crtAmtFormatUnDot(ob);
		} else { //输入小数点模式
			amtObj = crtAmtFormatDot(ob);
		}
		//处理小数点部分
		amtObj.getInputChangeDec();

		//整数部分
        var r = amtObj.getInputInteger();

		//小数部分
		r += amtObj.getInputDotSign();
		r = amtObj.setSign(r);

        return r;
	}
    //金额格式数据转换成普通数据
	this.getOutputFormat = function(ob){
		var amtObj = crtAmtFormatDot(ob);
		//整数部分 + 小数点部分
        this.showValue = amtObj.getOutputChgInteger() + amtObj.getInputChangeDec();
		this.showValue = this.showValue * 1;
		this.showValue = amtObj.setSign(this.showValue);
		//处理得到真实值
		var dotLen = amtObj.getDotLen();
		var numStr = this.showValue+"";
		var numLen = numStr.length;
		if(numLen-dotLen>0){
			this.realValue=numStr.substring(0,numLen-dotLen)+"."+numStr.substring(numLen-dotLen,numLen);
		}else{
			this.realValue="0.";
			for(var i=0;i<dotLen-numLen;i++){
				this.realValue+="0";
			}
			this.realValue+=numStr;
		}

		//输入小数模式，则显示值和真实值相同11.11
		if (!isInputDot()){
			this.showValue = this.realValue;
		}
	}

	this.getShowValue = function(){
		return this.showValue;
	}
	this.getRealValue = function(){
		return this.realValue;
	}
}

//判断当前是否是不需输入小数点模式；返回true表示不需要输入小数点，false表示需要输入小数点
function isInputDot(){
	if (formatAction == "1"){
		return false;
	} else if (formatAction == "2"){
		return true;
	}
}

//金额处理基类
function AmtFormat(ob){
	this.name = ob.name;
	// value 数据值
	this.value = ob.value;
	// len 数据值的长度
	this.len = ob.value.length;
	// dotLen 数据设置的小数点长度
	this.dotLen = ob._dot;

	this.getValue = function(){
		return this.value;
	}
	this.getLen = function(){
		return this.len;
	}
	this.getDotLen = function(){
		return this.dotLen;
	}

	this.getDec = function(){
		return this.dec;
	}
	this.getInt = function(){
		return this.integer;
	}
	//检查数据是否是负数，是则设置属性为1，否则设置属性为0
	this.checkSign = function() {
		var v = this.value * 1;
		if (v < 0){
			this.sign = 1;
			this.value = this.value * (-1) + "";
			this.len = this.len - 1;
		} else if (v == 0){
			this.sing = 2;
			this.value = this.value * (-1) + "";
			this.len = this.len -1 ;
		} else {
			this.sign = 0;
		}
	}
	//将最终的结果设置成负数
	this.setSign = function(inputV){
		if (this.sign == 1) {
			return "-"+ inputV ;
		}
		return inputV + "";
	}
    //输入数据, 小数部分格式化
	this.getInputDotSign = function() {
		var r = "";
		if (this.dotLen!=0){ // 1-输入小数点
			r = "." + this.dec;
		}
		return r;
	}
	//输入数据, 整数部分格式化
	this.getInputInteger = function() {
		var inte = this.integer * 1;
		if(isNaN(inte)){
			inte=this.integer;
		}
	   this.integer = inte + "";
	   var r = this.integer;
	   var re=/(-?\d+)(\d{3})/;
       while(re.test(r)){
          r=r.replace(re,"$1,$2");
       }
	   return r;
	}
	//获得焦点时, 整数部分处理
	this.getOutputChgInteger = function() {
	  var r = this.integer+"";
	  r = r.replace(/,/g, "");
	  return r;
	}
}
//输入小数点录入模式
function AmtFormatDot() {
	this.format = function(){
		var ind = this.value.lastIndexOf(".");
		if (ind == -1){
			this.dec = "";
			for (var i=0; i<this.dotLen; i++ ){
				this.dec += "0";
			}
			this.integer = this.value;
		} else {
			this.dec = this.value.substring(ind+1, this.len);
			this.integer = this.value.substring(0, ind);
		}
	}
	//处理小数部分
    this.getInputChangeDec = function() {
      var amtdec = "0."+this.dec
      amtdec = parseFloat(amtdec).toFixed(2); //将小数位做保留2位操作
      amtdec = amtdec + ""
      this.dec = amtdec.split(".")[1];
	  this.dec = this.dec.substring(0, this.dotLen);
	  var dotL = this.dec.length;
	  if (dotL < this.dotLen){
		 var l = this.dotLen - dotL;
		 for (var i=0; i<l; i++ ){
			this.dec += "0";
		 }
	  }
	  return this.dec;
	}

}
//不需输入小数点录入模式
function AmtFormatUnDot() {
	this.format = function(){
		var ind = this.len - this.dotLen ;
		this.dec = this.value.substring(ind, this.len);
		this.integer = this.value.substring(0, ind);
	}
	//处理小数部分
    this.getInputChangeDec = function() {
	  var dotL = this.dec.length;
	  if (dotL < this.dotLen){
		 var l = this.dotLen - dotL;
		 for (var i=0; i<l; i++ ){
			this.dec = "0" + this.dec;
		 }
	  }
	}
}
//类继承公共方法
function createInheritance(parent, child) {
    var property;
    for(property in parent) {
        if(!child[property]) {
            child[property] = parent[property];
        }
    }
}
//创建输入小数点数据的类
function crtAmtFormatDot(ob){
	var dotFormat = new AmtFormatDot();
    createInheritance(new AmtFormat(ob), dotFormat);
	dotFormat.checkSign();
	dotFormat.format();
	return dotFormat;
}
//创建不需输入小数点数据的类
function crtAmtFormatUnDot(ob){
	var dotFormat = new AmtFormatUnDot();
    createInheritance(new AmtFormat(ob), dotFormat);
	dotFormat.checkSign();
	dotFormat.format();
	return dotFormat;
}

  function addDot(obj){
	var dotLen = obj._dot;
	var numStr = obj.value+"";
	var numLen = numStr.length;
	if(numLen-dotLen>0){
		obj.value=numStr.substring(0,numLen-dotLen)+"."+numStr.substring(numLen-dotLen,numLen);
	}else{
		obj.value="0.";
		for(var i=0;i<dotLen-numLen;i++){
			obj.value+="0";
		}
		obj.value+=numStr;
	}
}
