(function(){
	var w = window, d = document,
			ol = w.onload || function(){},
			s = d.getElementsByTagName('script')[0],
			r = '//localhost:8124/save?',
			p = w.msPerformance || w.webkitPerformance || w.mozPerformance || w.performance;
	function record(){
		if (p && p.timing) {
	 	  var q = [], t = p.timing, e = d.createElement('script');
	 		for (var k in t) {
	 		    q.push([k,t[k]].join('='));
	 		}
	 		e.src = r + q.join('&'); e.async = true;
	 		s.parentNode.insertBefore(e,s);
	 	}
	};
	w.onload = function(){
		setTimeout(record, 20);
		ol && ol();
	};
})();