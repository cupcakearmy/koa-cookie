# koa-cookie
Koa Cookie Utility

### Complete Example
```javascript
const
	Koa = require('koa'),
    router = require('koa-simple-router'),
	cookie = require('cca-koa-cookie')

const 
	app = new Koa(),
	port = 3000
	
// Parse Parameters
app.use(require(cookie))

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
		
		c.body = [200, 'Cookie Set']
	})

	_.get('/get', (c, n) => {
		c.body = [200, c.request.cookies]
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
c.request.cookie.set({
	key: 'my_id',
	value: '12345678',
	path: '/',
	maxAge: 100,
	httpOnly: true,
	secure: false
})
```
```javascript
// Get a cookie
ctx.request.cookie.get('my_id') => "12345678"
```

