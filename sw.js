importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js");

if (workbox) { 
	console.Log("Ajua! Workbox esta cargado! :) "); 
	workbox.precaching.precacheAndRoute([]); 

	/*Cache de imagenes en la carpeta, por ejemplo "others-, editamos a otras carpetas que se obtuvieron y configuramos en el archivo sw config.js */ 
	workbox.routing.registerRoute( 
		/(.*)others(.*)\.(?:png|gif|jpg)/, 
		new workbox.strategies.CacheFirst({ 
			cacheName: "images",
			plugins:[
				new workbox.expiration.Plugin({
					maxEntries: 50,
					maxAgeSeconds: 30 * 24 * 60 * 60,
				})

			] 
		})
	);
	/*hacemos el contenido den JS Y CSS sean rapidos devolviendo los "assets" de la noche,mientras se asegura de que se actualizan en un segundo plano para su maximo uso */
	workbox.routing.registerRoute( 
	//Cache de JS, CSS y SCC 
	/.*\.(?:css|js|scss|)/, 
	//Usamos el cache pero actualizasmos en segundo piano lo antes posible. 
	new workbox.strategies.StaleWhileRevalidate({ 
	//Usamos el nombre de un cache personalizado. 
	cacheName: "assets", 
}) 
); 
//Cache de fuentes de Google 
workbox.routing.registerRoute( 
new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"), 
new workbox.strategies.CacheFirst({ 
	cacheName: "google-fonts",
	plugins: [
	new workbox.cacheableResponse.Plugin({
		statuses: [0, 200],
	}),
	],
	}) 
);

//agregar analisis offline
workbox.googleAnalytics.initialize();

/*instalar un nuevo service worker y hacer que actualice y controle la pagina web lo antes posible*/
workbox.core.skipWaiting();
workbox.core.clientsClaim();

} else {
	console.log("¡Fallo! workbox no esta cargado ): ");
}