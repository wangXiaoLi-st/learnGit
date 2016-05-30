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