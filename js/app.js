if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('../sw.js').then(() => {
			console.log('Soy el service Worker registrado y funcionando.')
		})
	})
}