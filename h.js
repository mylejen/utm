function addQueryParamsToLinks() {
	const links = document.getElementsByTagName("a");
	const queryParams = window.location.search;
	for (const link of links) {
		if (link.getAttribute("href") == 'https://fames.my/checkout-wam' || link.getAttribute("href") == 'https://fames.my/checkout-wam/' ) {
						link.setAttribute("href", `${link.getAttribute("href")}${queryParams}`);		
		}
	}
addQueryParamsToLinks();
