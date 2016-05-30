//缩略语列表
function displayAbbreviations(){
	//对象检测
	if(!document.getElementsByTagName) return false;
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	//获取所有缩略语
	var abbreviations=document.getElementsByTagName("abbr");
	if(abbreviations.length<1)return false;
	//遍历所有的缩略语，并把title的属性值和文本保存到defs[]数组中。
	var defs=[];
	for(var i=0,l=abbreviations.length;i<l;i++){
		var current_abbr=abbreviations[i];
		if(current_abbr.childNodes.length<1) continue;  //IE浏览器会把abbr元素的子节点数返回0
		var definition=current_abbr.getAttribute("title");
		var key=current_abbr.lastChild.nodeValue;
		defs[key]=definition;
	}
	//创建定义列表，用以显示缩略语列表
	var dl=document.createElement("dl");
	for(key in defs){
		var definition=defs[key];
		//创建定义标题，显示缩略语
		var dt=document.createElement("dt");
		var dttxt=document.createTextNode(key);
		dt.appendChild(dttxt);
		//创建定义描述，显示缩略语的解释
		var dd=document.createElement("dd");
		var ddtxt=document.createTextNode(definition);
		dd.appendChild(ddtxt);
		//添加到定义列表中
		dl.appendChild(dt);
		dl.appendChild(dd);
	}
	if(dl.childNodes.length<1) return false;
	//创建标题
	var header=document.createElement("h2");
	var h2txt=document.createTextNode("Abbreviations");
	header.appendChild(h2txt);
	//把标题和定义列表添加到页面主体
	document.body.appendChild(header);
	document.body.appendChild(dl);
}

addLoadEvent(displayAbbreviations);

