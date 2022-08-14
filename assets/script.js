document.addEventListener('DOMContentLoaded', function() {
	const animatedSvgs = document.querySelectorAll('svg');
	window.setTimeout(() => {
		animatedSvgs.forEach(svg => {
			svg.classList.add('animated');
		})
	},1000);
})