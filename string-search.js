
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

/*
 * Rabin-Karp search algorithm (uses a rolling hash).
 */
function rabin_karp(needle, haystack) {

	var PRIME = 101;
	

	function hash(s) {

		var h = 0.0;
		for (var i = 0; i < s.length; i++) {
			var c = s[i].charCodeAt(0);
			h += c * Math.pow(PRIME, s.length - i - 1);
		}

		return h;
	}

	function nextHash(oldHash, oldChar, newChar, length) {

		var next = oldHash - oldChar.charCodeAt(0) * Math.pow(PRIME, length-1);
		next *= PRIME;
		next += newChar.charCodeAt(0);

		return next;

	}

	var needleHash = hash(needle);
	var rollingHash = hash(haystack.substring(0, needle.length))

	for (var i = 0; i <= haystack.length - needle.length; i++) {

		// same hashes ?
		if (needleHash === rollingHash) {

			// check if the strings are the same
			j = 0;
			while (j < needle.length && needle[j] === haystack[i + j]) {
		       j++;
			}
			if (j === needle.length) return i; // BINGO!!!
		}

		// get next hash
		rollingHash = nextHash(rollingHash, haystack[i], haystack[i + needle.length], needle.length);
	}

	return -1;

}


var n = "D"
var h = "AAAAAAAAAAACAABCCCCC";

console.log("n : " + n + "\nh : " + h + "\n");
console.log("solution (naive)                : " + naive(n, h));
console.log("solution (Boyer-Moore-Horspool) : " + boyer_moore_horspool(n, h));
console.log("solution (Rabin-Harp)           : " + rabin_karp(n, h));

