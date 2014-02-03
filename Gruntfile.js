'use strict';

module.exports = function (grunt) {

	//
	// LOAD PLUGINS
	//

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');

	//
	// DEFINE TASKS
	//

	grunt.registerTask('default', ['all']);

	// app task
	grunt.registerTask('all', ['clean', 'browserify:libs', 'browserify:app']);

	// server task
	grunt.registerTask('server', ['connect', 'all', 'watch:fast']);
	grunt.registerTask('server-slow', ['connect', 'all', 'watch:slow']);

	grunt.initConfig({

		// ===================
		// Config
		// ===================

		distdir: 'dist',
		libsdir: 'app/lib/angular',
		src: {
			js: './*.js'
		},

		watch: {
			fast: {
				files: '<%= src.js %>',
				tasks: ['browserify:app'],
				options: {
					livereload: true,
					nospawn: true
				}
			},
			slow: {
				files: ['<%= libsdir %>', '<%= src.js %>'],
				tasks: ['all'],
				options: {
					livereload: true,
					nospawn: true
				}
			}
		},

		// clear previous build artifacts
		clean: {
			build: ['<%= distdir %>/*']
		},

		//
		// browserify
		//
		browserify: {
			all: {
				options: {
					shim: {
						angular: { path: '<%= libsdir %>/angular.js', exports: 'angular'}
					},
					alias: [
						'<%= libsdir %>/angular.js:angular'
					]
				},
				src: ['./**/*.js'],
				dest: '<%= distdir %>/app.js'
			},
			libs: {
				options: {
					shim: {
						angular: { path: '<%= libsdir %>/angular.js', exports: 'angular' }
					}
				},
				src: ['./<%= libsdir %>/angular.js'],
				dest: '<%= distdir %>/libs.js'
			},
			app: {
				src: ['app/js/app.js'],
				dest: '<%= distdir %>/app.js',
				options: {
					alias: [
						'<%= libsdir %>/angular.js:angular'
					],
					external: [
						'<%= libsdir %>/angular.js'
					]
				}
			}
		}
	});

};
