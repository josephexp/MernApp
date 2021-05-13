const proxy = require('http-proxy-middleware');
var apiProxy = proxy('/api', { target: 'http://localhost:3000' });
app.use(apiProxy);
