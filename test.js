function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		action();
	}
}

whenDocumentLoaded(() => {
	var data = []
	fetch('https://api.spotify.com/v1/audio-analysis/4VkgY55sUbfszX3XjS3LxW')
	.then(d => d.json)
	.then(json => console.log(json));
});