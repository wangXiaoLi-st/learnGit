//�������б�
function displayAbbreviations(){
	//������
	if(!document.getElementsByTagName) return false;
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	//��ȡ����������
	var abbreviations=document.getElementsByTagName("abbr");
	if(abbreviations.length<1)return false;
	//�������е����������title������ֵ���ı����浽defs[]�����С�
	var defs=[];
	for(var i=0,l=abbreviations.length;i<l;i++){
		var current_abbr=abbreviations[i];
		if(current_abbr.childNodes.length<1) continue;  //IE��������abbrԪ�ص��ӽڵ�������0
		var definition=current_abbr.getAttribute("title");
		var key=current_abbr.lastChild.nodeValue;
		defs[key]=definition;
	}
	//���������б�������ʾ�������б�
	var dl=document.createElement("dl");
	for(key in defs){
		var definition=defs[key];
		//����������⣬��ʾ������
		var dt=document.createElement("dt");
		var dttxt=document.createTextNode(key);
		dt.appendChild(dttxt);
		//����������������ʾ������Ľ���
		var dd=document.createElement("dd");
		var ddtxt=document.createTextNode(definition);
		dd.appendChild(ddtxt);
		//��ӵ������б���
		dl.appendChild(dt);
		dl.appendChild(dd);
	}
	if(dl.childNodes.length<1) return false;
	//��������
	var header=document.createElement("h2");
	var h2txt=document.createTextNode("Abbreviations");
	header.appendChild(h2txt);
	//�ѱ���Ͷ����б���ӵ�ҳ������
	document.body.appendChild(header);
	document.body.appendChild(dl);
}

addLoadEvent(displayAbbreviations);

