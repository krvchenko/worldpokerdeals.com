/**
 * Get cookie from request.
 *
 * @param  {Object} req
 * @param  {String} key
 * @return {String|undefined}
 */
export function cookieFromRequest(req, key) {
	if (!req.headers.cookie) {
		return
	}

	const cookie = req.headers.cookie
		.split(';')
		.find(c => c.trim().startsWith(`${key}=`))

	if (cookie) {
		return cookie.split('=')[1]
	}
}

/**
 * https://router.vuejs.org/en/advanced/scroll-behavior.html
 */
export function scrollBehavior(to, from, savedPosition) {
	if (savedPosition) {
		return savedPosition
	}

	let position = {},
		offset = document.getElementById('header').offsetHeight

	if (to.matched.length < 2) {
		position = { x: 0, y: 0, offset: { x: 0, y: offset } }
	} else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
		position = { x: 0, y: 0, offset: { x: 0, y: offset } }
	}
	if (to.hash) {
		position = {
			selector: to.hash,
			offset: { x: 0, y: offset },
			behavior: 'smooth',
		}
	}

	return position
}

/**
 * Deep copy the given object.
 *
 * @param  {Object} obj
 * @return {Object}
 */
export function deepCopy(obj) {
	if (obj === null || typeof obj !== 'object') {
		return obj
	}

	const copy = Array.isArray(obj) ? [] : {}

	Object.keys(obj).forEach(key => {
		copy[key] = deepCopy(obj[key])
	})

	return copy
}

/**
 * Chunk array.
 */
export function chunks(arr, size) {
	arr.reduce((resultArray, item, index) => { 
		const chunkIndex = Math.floor(index/size)

		if(!resultArray[chunkIndex]) {
			resultArray[chunkIndex] = [] // start a new chunk
		}

		resultArray[chunkIndex].push(item)

		return resultArray
	}, [])
}
