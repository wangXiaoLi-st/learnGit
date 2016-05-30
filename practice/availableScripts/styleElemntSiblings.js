function styleElementSiblings(tag,theClass) {
  if (!document.getElementsByTagName) return false;
  var elems = document.getElementsByTagName(tag);
  for (var i=0; i<elems.length; i++) {
    var elem = getNextElement(elems[i].nextSibling);
    addClass(elem,"theClass");
  }
}
function getNextElement(node) {
  if(node.nodeType == 1) {
	return node;
  }
  if (node.nextSibling) {
    return getNextElement(node.nextSibling);
  }
  return null;
}
