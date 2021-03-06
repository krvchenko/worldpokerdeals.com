require('dotenv').config()

export default {
	env: {
		apiUrl: process.env.API_URL,
		apiHost: process.env.API_HOST,
		mediaUrl: process.env.MEDIA_URL,
		mediaHost: process.env.MEDIA_HOST,
		hostName: process.env.HOST_NAME,
		appName: process.env.APP_NAME,
		appLocale: process.env.APP_LOCALE,
		appGeo: process.env.APP_GEO,
		recaptchaPublic: process.env.RECAPTCHA_PUBLIC,
		recaptchaSecret: process.env.RECAPTCHA_SECRET
	},

	head: {
		title: 'worldpokerdeals.com',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: 'Worldpokerdeals' },
			{ hid: 'og:image', name: 'og:image', content: '/og-image-default.webp' },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},

	loading: { color: '#2E87C8', throttle: 0, height: '3px' },

	pageTransition: {
		// name: 'page',
		// mode: 'out-in',
		name: '',
		mode: '',
		beforeEnter (el) {
			document.getElementById('preloader-container').style.display = 'block'
		},
		afterLeave(el) {
			setTimeout(() => {
				document.getElementById('preloader-container').style.display = 'none'
			}, 500)
		}
	},

	layoutTransition: {
		// name: 'layout',
		// mode: 'out-in',
		name: '',
		mode: '',
	},

	router: {
		middleware: ['locale', 'location', 'check-auth'],
		prefetchLinks: false
	},

	css: [{ src: '~assets/sass/app.scss', lang: 'scss' }],

	components: true,

	plugins: [
		'~directives',
		'~plugins/axios',
		'~plugins/i18n',
		'~plugins/vform',
		'~plugins/element-ui',
		'~/plugins/asyncComputed',
		{ src: '~/plugins/glightbox', mode: 'client' },
		{ src: '~/plugins/vue-carousel', mode: 'client' },
	],

	modules: [
		'@nuxtjs/router',
		'@nuxtjs/svg',
		'@nuxtjs/device',
		'@nuxtjs/axios',
		'@nuxtjs/style-resources',
		[
			'@nuxtjs/recaptcha', {
				hideBadge: true,
				siteKey: process.env.RECAPTCHA_PUBLIC,
				version: 2,
				language: 'ru',
				size: 'invisible'
			}
		],
	],

	styleResources: {
		scss: ['~assets/sass/_mixins.scss'],
	},

	axios: {
		baseURL: process.env.apiUrl,
		proxyHeaders: true,
	},

	build: {
		extractCSS: true,
		// analyze: true,
		splitChunks: {
			layouts: false,
			pages: false,
			commons: false
		},
		babel: {
			presets: ['@nuxt/babel-preset-app'],
			plugins: [
				[
					'component',
					{
						libraryName: 'element-ui',
						styleLibraryName: 'theme-chalk',
					},
				],
				'@babel/plugin-proposal-optional-chaining',
			],
		},
		extend(config, { isDev, isClient }) {
			if (isDev && isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/,
				})
			}

			config.resolve.alias['vue'] = 'vue/dist/vue.common'
		},
	},
}
