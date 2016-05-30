//显示引用的来源链接
function displayCitations(){
	//对象检测
	if(!document.getElementsByTagName) return false;
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	//取得所有块引用
	var quotes=document.getElementsByTagName("blockquote");
	//遍历所有块引用
	for(var i=0,q=quotes.length;i<q;i++){
		if(!quotes[i].getAttribute("cite")) continue;  
		var url=quotes[i].getAttribute("cite");
		//创建链接
		var link=document.createElement("a");
		link.setAttribute("href",url);
		var link_txt=document.createTextNode("source");
		link.appendChild(link_txt);
		//获取块引用里的最后一个元素节点
		var quotesChildren=quotes[i].getElementsByTagName("*");
		if(quotesChildren.length<1) continue;
		var elem=quotesChildren[quotesChildren.length-1]
		//创建上标元素
		var sup=document.createElement("sup");
		sup.appendChild(link);
		//添加到块引用最后一个元素里
		elem.appendChild(sup);
	}
}
addLoadEvent(displayCitations);