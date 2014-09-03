[![GitHub version](https://badge.fury.io/gh/mashurex%2Fsecure-skeleton.svg)](http://badge.fury.io/gh/mashurex%2Fsecure-skeleton)
[![Dependencies](https://david-dm.org/mashurex/secure-skeleton.png)](https://david-dm.org/mashurex/secure-skeleton.png)

# Express 4 Secure Skeleton Sample
Intended to be a simple sample Express.js 4.x application that demonstrates secure defaults and best practices.

## Configuration Settings
The configuration file is `config.js` and, ideally, would be configured differently for every environment. At the very least all the key/secret values would be different per environment.

- ### server
Server specific settings and connectivity details.

	+ host
The hostname or IP for the application to listen on, the default is `localhost`.
	+ port
The port to listen on, the Node default is `3000`.

- ### app
Application specific settings, such as secret keys and paths.
	+ debug
Enables/disables various debug options like extended logging and stack trace output.
	+ path
The path to start serving requests from, used to configure `app.use('[path]', routes)` when initializing the Express application. Typically, this is `/` if you want the app to reside at the root, for example `http://localhost:3000/`.
	+ key
Application secret key, used for generating hashes, etc. Longer is better.
	+ cookie
		+ secret
The cookie secret is used to sign all cookies and prevent tampering.
	+ session
		+ secret
The session secret is used to sign session data and prevent tampering.






