'use strict';

var Hapi = require('hapi'),
		server = new Hapi.Server();

server.connection({ port: 3000});

server.register(require('inert'), function(err) {

	    if (err) {
		            throw err;
		        }

	    server.route({
		            method: 'GET',
		            path: '/js/{file*}',
		            handler: {
				                directory: {
							                path: 'js'
							            }
				            }
		        });

	    server.route({
		            method: 'GET',
		            path: '/css/{file*}',
		            handler: {
				                directory: {
							                path: 'css'
							            }
				            }
		        });

	    server.route({
		            method: 'GET',
		            path: '/img/{file*}',
		            handler: {
				                directory: {
							                path: 'img'
							            }
				            }
		        });

	    server.route({
		            method: 'GET',
		            path: '/',
		            handler: function (request, reply) {
				                reply.file('./index.html');
				            }
		        });
	});


server.start();
