$('body').append($([
'<style type="text/css">#kConsoleShowHideBtn i {font-weight:bolder;padding:0 4px;}</style>',
'<div>',
	'<div id="kConsoleLogDiv" style="display:none;position:fixed;top:0;right:0;width:100%;height:80%;padding:16px 0;overflow-y:scroll;font-size:16px;line-height:24px;work-break:break-all;word-wrap:break-word;background-color:rgba(0,0,0,0.5);color:white;box-sizing:border-box;z-index:32767;"></div>',
	'<div style="display:none;width:100%;height:20%;font-size:16px;line-height:24px;position:fixed;bottom:0;work-break:break-all;word-wrap:break-word;background-color:rgba(0,0,0,0.5);box-sizing:border-box;z-index:32767;">',
		'<textarea id="kConsoleTextArea" type="text" style="display:inline-block;width:90%;height:100%;box-sizing:border-box;"></textarea>',
		'<button id="kConsoleBtnRun" style="display:inline-block;width:10%;height:100%;vertical-align:top;box-sizing:border-box;">run</button>',
	'</div>',
	'<div style="font-size:16px;line-height:24px;position:fixed;top:0;right:0;box-sizing:border-box;z-index:32767;">',
		'<button id="kConsoleClear" style="display:none;">clear</button>',
		' <button id="kConsoleShowHideBtn">console</button>',
	'</div>',
'</div>'].join('')));
kConsoleLog = function(anything, color){
	var str = undefined;
	if(undefined === anything){
		str = 'undefined';
	}else{
		try{
			var str = JSON.stringify(anything);
		}catch(ex){}
		if(undefined === str){
			str = anything.toString();
		}
	}
	var kConsoleLogDiv = document.getElementById("kConsoleLogDiv");
	var line = document.createElement("p");
	if(color){
		line.style.color=color;
	}
	line.innerHTML = str;
	kConsoleLogDiv.appendChild(line);
	kConsoleLogDiv.scrollTop = kConsoleLogDiv.scrollHeight;
};

kConsoleError = function(anything){
	kConsoleLog(anything, 'red');
};

window.addEventListener('error', function (ev) {
    var info = [
    	ev.message, "<br>",
        ev.filename, "<br>",
    	"line: ", ev.lineno, "<br>",
        "obj: " , ev.error, "<br>"
    ].join('');
    kConsoleError(info);
}, false);

document.getElementById('kConsoleBtnRun').onclick = function(){
	var result;
	var cmd = document.getElementById('kConsoleTextArea').value;
	if("" == cmd.trim()){
		return;
	}
	result = eval(document.getElementById('kConsoleTextArea').value);
	kConsoleLog(result);
};

document.getElementById('kConsoleClear').onclick = function(){
	document.getElementById('kConsoleLogDiv').innerHTML = "";
};

document.getElementById('kConsoleShowHideBtn').onclick = function(){
	if($('#kConsoleLogDiv').is(':visible')){
		$(this).siblings().hide();
		$(this).parent().siblings().hide();
		this.innerHTML = "console";
	}else{
		$(this).siblings().show();
		$(this).parent().siblings().show();
		this.innerHTML = "<i>&times;</i>";
	}
};
