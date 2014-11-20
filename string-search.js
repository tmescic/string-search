
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

	var RollingHash = function RollingHash(s) {
		this.length = s.length;
		this.PRIME = 101;

		// calculate initial hash
		this.hash = 0;
		for (var i = 0; i < s.length; i++) {
			var c = s[i].charCodeAt(0); // numeric code of a char
			this.hash += c * Math.pow(this.PRIME, s.length - i - 1);
		}
	}

	/*
	 * Calculate next hash - old char out - new char in.
	 */
	RollingHash.prototype.next = function (oldChar, newChar) {
		var next = this.hash - oldChar.charCodeAt(0) * Math.pow(this.PRIME, this.length-1);
		next *= this.PRIME;
		next += newChar.charCodeAt(0);

		this.hash = next;
	}
	
	var needleHash = new RollingHash(needle);
	var rollHash = new RollingHash(haystack.substring(0, needle.length));
	var i = 0;

	while (true) {

		// IMPORTANT - because numbers in javascript are always 64-bit floating 
		// point (thank you Brendan Eich) - for large inputs with many characters, 
		// hash value will be very big value and we will start to lose precision, 
		// so this comparison might fail 
		if (needleHash.hash === rollHash.hash) {

			// check if the strings are the same
			j = 0;
			while (j < needle.length && needle[j] === haystack[i + j]) {
		       j++;
			}
			if (j === needle.length) return i; // BINGO!!!
		}

		if (i === haystack.length - needle.length) {
			return -1; // end, no matches
		} else {
			// recalcuate the hash because we are moving one char to the right
			rollHash.next(haystack[i], haystack[i + needle.length]);
			i++;
		}
	}

	return -1;
}


var n = "AAC";
var h = "AAAAAAAAAAACAABCCCCC";

console.log("n : " + n + "\nh : " + h + "\n");
console.log("solution (naive)                : " + naive(n, h));
console.log("solution (Boyer-Moore-Horspool) : " + boyer_moore_horspool(n, h));
console.log("solution (Rabin-Harp)           : " + rabin_karp(n, h));

