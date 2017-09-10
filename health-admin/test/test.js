function onlyOnce(fn){
	var execute;

	if(execute === undefined){
		execute = true;
		return function(arg){
			fn(arg);
		};
	}
}

function doRepeat(func, times, wait) {
	var i = 0;
	return function(){
		var totalTime = times * wait;
		var sI = setInterval(function(){
			if(i <= times){
				func();
				i++;
			}
		},wait);

		settimeout(function(){
			clearInterval(sI);
		},totalTime);
 } 