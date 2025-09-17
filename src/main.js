import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.css'
import logoPng from './assets/logo.png'

// Define/override favicon with the provided logo asset
function setFavicon(href) {
	if (!href) return
	let link = document.querySelector('link[rel="icon"]')
	if (!link) {
		link = document.createElement('link')
		link.rel = 'icon'
		document.head.appendChild(link)
	}
	link.type = 'image/png'
	link.href = href
}
setFavicon(logoPng)

const app = createApp(App)
app.mount('#app')
