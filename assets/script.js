window.parentPage = true;
const locations = {
	home: 'pages/home',
	terms: 'pages/terms',
	privacy: 'pages/privacy',
	invite: 'https://discord.com/api/oauth2/authorize?client_id=857320531405701120&permissions=36776192&scope=bot',
	support: 'https://saweria.co/daphino',
	mr687: 'https://github.com/mr687',
	vookav2: 'https://github.com/vookav2',
	storyset: 'https://storyset.com',
	email: 'mailto:davinomoehdanino@gmail.com'
}

const loadHtml = async (filepath) => {
	if (!filepath) {
		return false;
	}

	const result = []
	const startRequest = async (path, partial = false, inc = 1, max = 1) => {
		let pathReplaced = path;
		if (partial && inc <= max) {
			pathReplaced += `.${inc}`;
		}
		const response = await fetch(`${pathReplaced}.html`)
		if (response.ok) {
			const html = await response.text();
			result.push(html);

			if (partial && inc !== max) {
				await startRequest(path, partial, inc + 1, max);
			}
		}
	}

	if (filepath.includes('home')) {
		await startRequest(filepath, true, 1, 4);
	} else {
		await startRequest(filepath);
	}
	
	return result.join('')

}

const goTo = async (path, utm_campaign = 'unknown') => {
	let location = locations[path];
	if (!location) {
		await load404Content()
		return
	}

	if (location.includes('pages')) {
		await loadContent(path)
		window.location.href = '#app'
		return
	} {
		const url = new URL(location);
		url.searchParams.set('utm_source', window.location.hostname);
		url.searchParams.set('utm_medium', 'web');
		url.searchParams.set('utm_campaign', utm_campaign);
		window.location.href = url.href;
	}

}

const loadTopHeader = async () => {
	const html = await loadHtml('template/navigation');
	if (!html) {
		return false;
	}

	document.querySelector('#top-header').innerHTML = html;
}

const getPageParam = () => {
	const params = new URLSearchParams(window.location.search);
	return params.get('page');
}

const load404Content = async () => {
	const html = await loadHtml('pages/404');
	if (!html) {
		return false;
	}

	document.querySelector('main').innerHTML = html;
}

const loadContent = async (name) => {
	let page = getPageParam();
	if (!page) {
		page = name || 'home';
	}

	if (!locations[page]) {
		await load404Content()
		return
	}

	const html = await loadHtml(`pages/${page}`);
	if (!html) {
		await load404Content()
		return
	}

	document.querySelector('main').innerHTML = html;
}

const loadFooter = async () => {
	const html = await loadHtml('template/footer');
	if (!html) {
		return false;
	}

	document.querySelector('footer').innerHTML = html;
}

const startAnimation = () => {
	const animatedSvgs = document.querySelectorAll('svg');

	if (animatedSvgs.length) {
		window.setTimeout(() => {
			animatedSvgs.forEach(svg => {
				svg.classList.add('animated');
			})
		},1000);
	}
}

const init = async () => {
	const app = document.getElementById('app');

	await Promise.all([
		loadTopHeader(),
		loadContent(),
		loadFooter()
	]);

	app.style.display = 'block';
	startAnimation();
}

document.addEventListener('DOMContentLoaded', function() {
	init()
})