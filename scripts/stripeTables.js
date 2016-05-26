function stripeTables(){
	if(!document.getElementsByTagName) return false;
	var tables=document.getElementsByTagName("table");
	var odd,rows;
	for(var i=0;i<tables.length;i++){
		odd=false;
		rows=tables[i].getElementsByTagName("tr");
		for(var l=0;l<rows.length;l++){
			if(odd==true){
				rows[l].style.backgroundColor="#ffc";
				odd=false;
			}else{
				odd=true;
			}
		}
	}
}
addLoadEvent(stripeTables);