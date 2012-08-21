function getSelectionCoords() {
  var sel = document.selection, range;
  var x = 0, y = 0;
  if (sel) {
    if (sel.type != "Control") {
      range = sel.createRange();
      range.collapse(true);
      x = range.boundingLeft;
      y = range.boundingTop;
    }
  } else if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0).cloneRange();
      if (range.getClientRects) {
          range.collapse(true);
          var rect = range.getClientRects()[0];
          x = rect.left;
          y = rect.top;
      }
    }
  }
  return { x: x, y: y };
}

document.addEventListener("dblclick", function(event){
  if(event.ctrlKey){
    var query = window.getSelection().toString();
    chrome.extension.sendMessage({op: "query", q: query});
  }
});

window.addEventListener("click", function(event){
  chrome.extension.sendMessage({op: "close"});
});