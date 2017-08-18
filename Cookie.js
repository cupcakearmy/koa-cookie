module.exports = async(c, n) => {
	let cObj = {}
	if (typeof c.request.header.cookie === 'string')
		c.request.header.cookie.split(';').forEach(v => {
			const tmp = v.trim().split('=')
			cObj[unescape(tmp[0])] = unescape(tmp[1])
		})

	// Save them to the context
	c.request.cookies = cObj

	// Getter and Setter
	c.request.cookie = {
		get: (key) => {
			return c.request.cookies[key]
		},
		/**
		 * {String} key
		 * {String} value
		 * {String} path/
		 * {String} maxAge seconds | if not set cookie will be deleted when the browser get closed
		 * {String} httpOnly bool
		 * {String} secure bool
		 * {String} key
		 */
		set: (opt) => {
			// Add the minimal information
			let cookie = `${opt.key}=${opt.value}`

			// Optional Flags
			// Max-Age
			if (opt.maxAge !== undefined && parseInt(opt.maxAge) > 0)
				cookie += `; Max-Age=${parseInt(opt.maxAge)}`
			// Domain
			if (opt.domain !== undefined)
				cookie += `; Domain=${opt.domain}`
			// Path
			if (opt.path !== undefined)
				cookie += `; Path=${opt.path}`
			// HttpOnly
			if (opt.httpOnly !== undefined && Boolean(opt.httpOnly))
				cookie += `; HttpOnly`
			// Secure
			if (opt.secure !== undefined && Boolean(opt.secure))
				cookie += `; Secure`

			// Set The final cookie
			c.set('Set-Cookie', cookie)
		}
	}

	await n()
}