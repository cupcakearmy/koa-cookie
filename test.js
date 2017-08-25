const
	assert = require('assert'),
	http = require('http'),
	Koa = require('koa'),
	router = require('cca-koa-router'),
	cookie = require('./Cookie'),
	port = 3000

let app, server, v = new Array(10)

function checkRes(options, should) {
	return new Promise((resolve, reject) => {
		http.request(options, (res) => {
			res.setEncoding('utf8');
			let d = ''
			res.on('data', chunk => d += chunk)
			res.on('end', () => {
				res.body = d
				for (const attr in should)
					assert.equal(res[attr], should[attr])
				resolve()
			})
		}).end()
	})
}

describe('Cookie', () => {
	beforeEach(() => {
		app = new Koa()
		for (let i = 0; i < v.length; ++i)
			v[i] = Math.random().toString()
	})

	afterEach(() => {
		server.close()
	})

	describe('Reading', () => {
		it('One', () => {
			app.use(cookie)
			app.use(router(_ => _.get('/get', c => c.body = c.request.cookies['a'])))
			server = app.listen(port)

			return Promise.all([
				checkRes({
					port: port,
					path: `/get`,
					headers: {
						'Cookie': `a=${v[0]}`
					}
				}, {
					statusCode: 200,
					body: v[0]
				})
			])
		})

		it('Multiple', () => {
			app.use(cookie)
			app.use(router(_ => _.get('/get', c => c.body = c.request.cookies)))
			server = app.listen(port)

			return Promise.all([
				checkRes({
					port: port,
					path: `/get`,
					headers: {
						'Cookie': `${v[0]}=${v[1]};${v[2]}=${v[3]}`
					}
				}, {
					statusCode: 200,
					body: JSON.stringify({
						[v[0]]: v[1],
						[v[2]]: v[3]
					})
				})
			])
		})
	})

	describe('Getter', () => {
		it('Simple', () => {
			app.use(cookie)
			app.use(router(_ => _.get('/get', c => c.body = c.request.cookie.get('id'))))
			server = app.listen(port)

			return Promise.all([
				checkRes({
					port: port,
					path: `/get`,
					headers: {
						'Cookie': `id=${v[0]}`
					}
				}, {
					statusCode: 200,
					body: v[0]
				})
			])
		})
	})

	describe('Setter', () => {
		it('One', () => {
			app.use(cookie)
			app.use(router(_ => _.get('/set', c => {
				c.request.cookie.set({
					key: 'id',
					value: v[0],
					path: '/',
					maxAge: 100,
					httpOnly: true,
					secure: false
				})

				c.body = v[1]
			})))
			server = app.listen(port)

			return new Promise((resolve, reject) => {
				http.request({
					port: port,
					path: `/set`
				}, (res) => {
					assert(res.statusCode, 200)
					assert(res.headers['set-cookie'], [`id=${v[0]}; Max-Age=100; Path=/; HttpOnly`])
					resolve()
				}).end()
			})
		})
	})
})