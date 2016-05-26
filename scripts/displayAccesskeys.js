//链接的快捷键列表
function displayAccesskeys(){
	//对象检测
	if(!document.getElementsByTagName) return false;
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	//取得所有的链接
	var links=document.getElementsByTagName("a");
	//创建空数组
	var ary=[];
	//遍历所有的链接，并把accesskey的属性值和链接文本保存到空数组中。
	for(var i=0,l=links.length;i<l;i++){
		if(!links[i].getAttribute("accesskey")) continue;
		var accesskey=links[i].getAttribute("accesskey");
		var a_value=links[i].lastChild.nodeValue;
		ary[accesskey]=a_value;
	}
	//创建快捷键列表
	var list=document.createElement("ul");
	for(accesskey in ary){
		var a_value=ary[accesskey];
		var li=document.createElement("li");
		var li_txt=document.createTextNode(accesskey+":"+a_value);
		li.appendChild(li_txt);
		list.appendChild(li);
	}
	if(list.childNodes.length<1) return false;
	//创建快捷键清单标题
	var header=document.createElement("h3");
	var header_txt=document.createTextNode("Accesskeys");
	header.appendChild(header_txt);
	//添加到页面主体
	document.body.appendChild(header);
	document.body.appendChild(list);
}
addLoadEvent(displayAccesskeys);