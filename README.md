# koa-cookie

[![Join the chat at https://gitter.im/cupcakearmy/koa-cookie](https://badges.gitter.im/cupcakearmy/koa-cookie.svg)](https://gitter.im/cupcakearmy/koa-cookie?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![npm](https://img.shields.io/npm/v/cca-koa-cookie.svg)](https://www.npmjs.com/package/cca-koa-cookie)
[![npm](https://img.shields.io/npm/dt/cca-koa-cookie.svg)]()
[![npm](https://img.shields.io/npm/l/cca-koa-cookie.svg)]()
[![Travis](https://img.shields.io/travis/CupCakeArmy/koa-cookie.svg)]()

Lightweight Koa-Middleware for Cookies

### Install
```bash
npm install cca-koa-cookie --save
```

### Complete Example
```javascript
const
	Koa = require('koa'),
	cookie = require('cca-koa-cookie'),
	router = require('cca-koa-router')

const
	app = new Koa(),
	port = 3000

app.use(cookie)

app.use(router({}, _ => {
	_.get('/set', (c, n) => {

		// Set a cookie 
		c.request.cookie.set({
			key: 'my_id',
			value: '12345678',
			path: '/',
			maxAge: 100,
			httpOnly: true,
			secure: false
		})

		c.body = 'Cookie Set'
	})

	_.get('/get', (c, n) => {
		c.body = c.request.cookies
	})
}))

app.listen(port)
```

## Documentation

##### ~ `cookies` Array
The Cookie Parser sets an array `ctx.request.cookies` with the cookies that where sent with the request.
###### Example
Let's say we get a cookie (`Foo=Bar;`) We can access it in the context of Koa like this: `ctx.request.cookies['Foo']` => `"bar"`

##### ~ `cookie` Element
The Parser also defines a getter and setter for cookies

###### Example
```javascript
// Set a cookie
ctx.request.cookie.set({
	key: 'my_id',
	value: '12345678',
	path: '/',
	maxAge: 100,
	httpOnly: true,
	secure: false
})
```

|Options | Value                          |
|--------| -------------------------------|
|Key     | Cookie Name                    |
|Value   | Cookie Value                   |
|Path    | Url Path                       |
|Domain  | Sub or Domain                  |
|httpOnly| bool                           |
|secure  | bool                           |
|max-age | seconds after the cookie expres|

```javascript
// Get a cookie
ctx.request.cookie.get('my_id') => "12345678"
```

