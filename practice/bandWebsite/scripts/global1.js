//全局方法
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}
function insertAfter(newElement,targetElement) {
  var parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement,targetElement.nextSibling);
  }
}
function addClass(element,value){
	if(!element.className){
		element.className=value;
	}else{
		newClassName=element.className;
		newClassName+=" ";
		newClassName+=value;
		element.className=newClassName;
	}
}
function highlightPage(){
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false; 
	var headers=document.getElementsByTagName("header");
	if(headers.length==0)return false;
	var navs=headers[0].getElementsByTagName("nav");
	if(navs.length==0)return false;
	
	var links=navs[0].getElementsByTagName("a");
	var linkurl;
	for(var i=0; i<links.length; i++){
		linkurl=links[i].getAttribute("href");
		if(window.location.href.indexOf(linkurl)!=-1){
			links[i].className="here";
			var linktext=links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id",linktext);
		}	
	}	
}
addLoadEvent(highlightPage);

//HOME页面
function moveElement(elementID,final_x,final_y,interval){
	//对象检测,确保浏览器理解DOM方法
	if(!document.getElementById)return false;
	if(!document.getElementById(elementID))return false;
	//获取要移动的元素
	var elem=document.getElementById(elementID);
	//如果上次的移动还存在，先清除
	if(elem.movement){
		clearTimeout(elem.movement);
	}
	if(!elem.style.left){
		elem.style.left="0px";
	}
	if(!elem.style.top){
		elem.style.top="0px";
	}
	//取移动元素的当前坐标值
	var xpos=parseInt(elem.style.left);
	var ypos=parseInt(elem.style.top);
	var dist=0;
	//如果到达终点，调用结束
	if( xpos == final_x && ypos == final_y ){return true;}
	//比较元素目前坐标和最终坐标,移动元素接近最终坐标
	if( xpos < final_x ){
		dist=Math.ceil((final_x-xpos)/10); //差距大的时候移动大，差距小的时候移动小，平滑移动。向上取整。
		xpos=xpos+dist; 
	}
	if( xpos > final_x ){
		dist=Math.ceil((xpos-final_x)/10); 
		xpos=xpos-dist; 
	}
	if( ypos < final_y ){
		dist=Math.ceil((final_y-ypos)/10); 
		ypos=ypos+dist; 
	}
	if( ypos > final_y ){
		dist=Math.ceil((ypos-final_y)/10); 
		ypos=ypos-dist; 
	}
	elem.style.left=xpos+"px";
	elem.style.top=ypos+"px";
	var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement=setTimeout(repeat,interval);
}
function prepareSlideshow(){
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById("intro")) return false;
  var intro = document.getElementById("intro");
  var slideshow = document.createElement("div");
  slideshow.setAttribute("id","slideshow");
  var frame = document.createElement("img");
  frame.setAttribute("src","images/frame.gif");
  frame.setAttribute("alt","");
  frame.setAttribute("id","frame");
  slideshow.appendChild(frame);
  var preview = document.createElement("img");
  preview.setAttribute("src","images/slideshow.gif");
  preview.setAttribute("alt","a glimpse of what awaits you");
  preview.setAttribute("id","preview");
  slideshow.appendChild(preview);
  insertAfter(slideshow,intro);
  
  var links=document.getElementsByTagName("a");
  for(var i=0; i<links.length; i++){
	  links[i].onmouseover = function() {
      var destination = this.getAttribute("href");
      if (destination.indexOf("index1.html") != -1) {
        moveElement("preview",0,0,5);
      }
      if (destination.indexOf("about1.html") != -1) {
        moveElement("preview",-150,0,5);
      }
      if (destination.indexOf("photos1.html") != -1) {
        moveElement("preview",-300,0,5);
      }
      if (destination.indexOf("live1.html") != -1) {
        moveElement("preview",-450,0,5);
      }
      if (destination.indexOf("contact1.html") != -1) {
        moveElement("preview",-600,0,5);
      }
    }
  }
	
}
addLoadEvent(prepareSlideshow);

//About页面
function showSection(id){
	var sections=document.getElementsByTagName("section");
	for(var i=0;i<sections.length;i++){
		if(sections[i].getAttribute("id")!=id){
			sections[i].style.display="none";
		}else{
			sections[i].style.display="block";
		}
	}
}
function prepareInternalnav(){
	//对象检测
	if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
	
	var articles=document.getElementsByTagName("article");
	if(articles.length==0) return false;
	var navs=articles[0].getElementsByTagName("nav");
	if(navs.length==0) return false;
	var links=navs[0].getElementsByTagName("a");
	
	for(var i=0;i<links.length;i++){
		var sectionId=links[i].getAttribute("href").split("#")[1];
		if(!document.getElementById(sectionId)) continue;
		//页面加载时，默认是不显示。
		document.getElementById(sectionId).style.display="none";
		//sectionId是局部变量，只存在于 prepareInternalnav函数执行期间，等事件处理函数执行的时候已经不存在，所以，给每个链接元素创建自定义属性，这个属性的作用域是持久的。
		links[i].destination=sectionId;
		links[i].onclick=function(){
			showSection(this.destination);
			return false;
		}
	}
}
addLoadEvent(prepareInternalnav);

//photos页面
function preparePlaceholder(){
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var placeholder=document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/placeholder.gif");
	placeholder.setAttribute("alt","选中的图片");
	
	var description=document.createElement("p");
	description.setAttribute("id","description");
	var desctxt=document.createTextNode("choose an image");
	description.appendChild(desctxt);
	
	var gallery=document.getElementById("imagegallery");
	insertAfter(description,gallery);
	insertAfter(placeholder,description);	
}



function prepareGallery(){
	//对象检测
	if(!document.getElementsByTagName||!document.getElementById) return false;
	//下面这种格式更有可读性
	if(!document.getElementById("imagegallery")){
		return false;
	}
	var gallery=document.getElementById("imagegallery");
	var links=gallery.getElementsByTagName("a");
	for(var i=0,l=links.length;i<l;i++){
		links[i].onclick=function(){
			return !showPic(this);   //如果切换图片不成功，返回true，链接仍然可以跳转。
		}
	}
}


function showPic(whichpic){
	if(!document.getElementById("placeholder")) return false;
	var source=whichpic.getAttribute('href');
	var placeholder=document.getElementById("placeholder");
	if(placeholder.nodeName!='IMG') return false;
	placeholder.setAttribute("src",source);
	
	if(document.getElementById("description")){ 
		if(whichpic.getAttribute('title')){
			var txt=whichpic.getAttribute('title');
		}else{
			var txt="";
		}
		var description=document.getElementById("description");
		if(description.firstChild.nodeType===3){
			description.firstChild.nodeValue=txt;
		}
		
	}
	return true;
}
addLoadEvent(prepareGallery);
addLoadEvent(preparePlaceholder);

//Live页面
function stripeTables() {
  if (!document.getElementsByTagName) return false;
  var tables = document.getElementsByTagName("table");
  for (var i=0; i<tables.length; i++) {
    var odd = false;
    var rows = tables[i].getElementsByTagName("tr");
    for (var j=0; j<rows.length; j++) {
      if (odd == true) {
        addClass(rows[j],"odd");
        odd = false;
      } else {
        odd = true;
      }
    }
  }
}
function highlightRows() {
  if(!document.getElementsByTagName) return false;
  var rows = document.getElementsByTagName("tr");
  for (var i=0; i<rows.length; i++) {
    rows[i].oldClassName = rows[i].className
    rows[i].onmouseover = function() {
      addClass(this,"highlight");
    }
    rows[i].onmouseout = function() {
      this.className = this.oldClassName;
    }
  }
}
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
	var header=document.createElement("h3");
	var h2txt=document.createTextNode("Abbreviations");
	header.appendChild(h2txt);
	//把标题和定义列表添加到页面
    var articles=document.getElementsByTagName("article");
	var article=articles[0];
	article.appendChild(header);
	article.appendChild(dl);
}

addLoadEvent(displayAbbreviations);
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);

//contact页面
//点击label，对应表单字段获得焦点
function focusLabels(){
	if(!document.getElementsByTagName)return false;
	var labels=document.getElementsByTagName("label");
	if(labels.length == 0) return false;
	for(var i=0; i<labels.length; i++){
		if(!labels[i].getAttribute("for")) continue;	
		labels[i].onclick=function(){
				var id=labels[i].getAttribute("for");
				if(!document.getElementById(id)) return false;
				var elem=document.getElementById(id);
				elem.onfocus();
				
		}	
	}
}
addLoadEvent(focusLabels);

function resetFields(whichform){
	if(Modernizr.input.placeholder) return;
	for(var i=0; i<whichform.elements.length; i++){
		var elem=whichform.elements[i];
		if(elem.type=="submit") continue;
		if(!(elem.placeholder || elem.getAttribute("placeholder"))) continue;
		elem.onfocus=function(){
			var text=this.placeholder || this.getAttribute("placeholder");
			if(this.value==text){
				this.value="";
				this.className="";
			}
		}
		elem.onblur=function(){
			if(this.value==""){
				this.value=this.placeholder || this.getAttribute("placeholder");
				this.className="placeholder";
			}
		}
		elem.onblur();
	}
}

function isFilled(field){
	if(field.value.replace(' ','').length == 0) return false;
	var text=field.placeholder || field.getAttribute("placeholder");
	return (field.value != text);
}
function isEmail(field){
	return(field.value.indexOf("@")!=-1 && field.value.indexOf(".")!=-1 );
}
function validateForm(whichform){
	for(var i=0; i<whichform.elements.length; i++){
		var elem=whichform.elements[i];
		if(elem.getAttribute("required")=="required"){
			if(!isFilled(elem)){
				alert("Please fill in the "+element.name+" field.");
        return false;
			}
		}
		if(elem.getAttribute("type")=="email"){
			if(!isEmail(elem)){
				alert("The "+element.name+" field must be a valid email address.");
        return false;
			}
		}
	}
	return true;
}

function prepareForms(){
	for(var i=0; i<document.forms.length; i++){ 
		var thisform=document.forms[i];
		resetFields(thisform);
		thisform.onsubmit=function(){
			if (!validateForm(this)) return false;
      var article = document.getElementsByTagName('article')[0];
      if (submitFormWithAjax(this, article)) return false;
      return true;
		}
	}
}
addLoadEvent(prepareForms);

function getHttpObject(){
	if(typeof XMLHttpRequest=="undefined"){
		XMLHttpRequest=function(){
			try{return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
			catch(e){}
			try{return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
			catch(e){}
			try{return new ActiveXObject("Msxml2.XMLHTTP");}
			catch(e){}
		}
		return false;
	}
	return new XMLHttpRequest();
	
}
function displayAjaxLoading(element) {
    // Remove the existing content.
  while (element.hasChildNodes()) {
      element.removeChild(element.lastChild);
  }
  //  Create a loading image.
  var content = document.createElement("img");
  content.setAttribute("src","images/loading.gif");
  content.setAttribute("alt","Loading...");
  // Append the loading element.
  element.appendChild(content);
}

function submitFormWithAjax( whichform, thetarget ) {
  
  var request = getHTTPObject();
  if (!request) { return false; }

  // Display a loading message.
  displayAjaxLoading(thetarget);

  // Collect the data.
  var dataParts = [];
  var element;
  for (var i=0; i<whichform.elements.length; i++) {
    element = whichform.elements[i];
    dataParts[i] = element.name + '=' + encodeURIComponent(element.value);
  }
  var data = dataParts.join('&');

  request.open('POST', whichform.getAttribute("action"), true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  request.onreadystatechange = function () {
    if (request.readyState == 4) {
        if (request.status == 200 || request.status == 0) {
          var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
          if (matches.length > 0) {
            thetarget.innerHTML = matches[1];
          } else {
            thetarget.innerHTML = '<p>Oops, there was an error. Sorry.</p>';
          }
        } else {
          thetarget.innerHTML = '<p>' + request.statusText + '</p>';
        }
    }
  };

  request.send(data);
   
  return true;
};