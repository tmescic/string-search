
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
function boyer_moore_horspool (heedle, haystack) {

	
	var m = needle.length;
	var n = haystack.length;

	return -1;
}

