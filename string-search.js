
/**
 * A naive implementation with O ( n * m ) time complexity (worst case).
 */
function naive(needle, haystack) {
	
	var m = needle.length;
	var n = haystack.length;

	for (var i = 0; i < n - m + 1; i++) {
		j = 0;
		while (j < m && needle[j] === haystack[i + j]) {
		       j++;
		}
		if (j === m) return i;
	}

	return -1;
}



/**
 * Boyer-Moore-Horspool algorithm
 */ 
function boyer_moore_horspool (needle, haystack) {

	
	var m = needle.length;
	var n = haystack.length;
	
	// 128 ASCII characters, initialy fill with needle length
	var skipTable = [];
	for (var i=0; i < 128; i++) {
		skipTable[i] = m;
	}

	for (var i=0; i < m-1; i++) {
		skipTable[needle[i].charCodeAt(0)] = m - i - 1;
	}

	var i = 0;
	while (i < n-m+1) {

		var j = m-1;
		for (; j >= 0 && needle[j] === haystack[i + j]; j--) {
			
		}

		if (j === -1) { // bingo
			return i;
		}
		i += skipTable[haystack[i + m -1].charCodeAt(0)];
			
	}

	return -1;
}



var n = "C"
var h = "AAAAAAAAAAACAABCCCCC";

console.log("n : " + n + "\nh : " + h + "\nsolution(naive) : " + naive(n, h));
console.log("solution(boyer-moore-horspool) : " + boyer_moore_horspool(n, h));


