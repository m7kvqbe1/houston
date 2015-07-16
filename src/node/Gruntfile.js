module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		handlebars: {
			options: {
				namespace: 'JST',
				
				// Remove path and extension from template name
				processName: function(filePath) {
					return filePath.replace(/^(.*[\\\/])/, '').replace(/\.hbs$/, '');
				}	
			},
			
			loginapp: {				
				files: {
					'../assets/backbone/loginapp/js/templates/compiled.js': '../assets/backbone/loginapp/js/templates/*.hbs'
				}
			},
			
			ticketapp: {
				files: {
					'../assets/backbone/ticketapp/js/templates/compiled.js': '../assets/backbone/ticketapp/js/templates/*.hbs'
				}
			}
		},
		
		concat: {
			options: {
				sourceMap: true,
				separator: ';'
			},

			loginapp: {
				src: [
					'../assets/backbone/loginapp/js/templates/compiled.js',
					'../assets/backbone/loginapp/js/models/*.js',
					'../assets/backbone/loginapp/js/views/*.js',
					'../assets/backbone/loginapp/js/validate.js',
					'../assets/backbone/loginapp/js/app.js'
				],

				dest: '../../public/js/loginapp.js'
			},

			ticketapp: {
				src: [
					'../assets/backbone/ticketapp/js/templates/compiled.js',
					'../assets/backbone/ticketapp/js/houston.js',
					'../assets/backbone/ticketapp/js/handlebarshelpers.js',
					'../assets/backbone/ticketapp/js/datahelper.js',
					'../assets/backbone/ticketapp/js/events.js',
					'../assets/backbone/ticketapp/js/models/*.js',
					'../assets/backbone/ticketapp/js/collections/*.js',
					'../assets/backbone/ticketapp/js/views/*.js',
					'../assets/backbone/ticketapp/js/app.js'
				],

				dest: '../../public/js/ticketapp.js'
			}
		},
		
        uglify: {
			options: {
				banner: '/* <%= pkg.name %>, built <%=  grunt.template.today() %> */\n',
				compress: true,
				mangle: true,
				sourceMap: true
			},
			
			lib: {
				src: [
					'../assets/lib/jquery-1.11.3.js',
					'../assets/lib/underscore-min.js',
					'../assets/lib/backbone-min.js',
					'../assets/lib/handlebars.runtime-v3.0.3.js'
				],

				dest: '../../public/js/lib.min.js'
			},
			
			loginapp: {
				files: {
					'../../public/js/loginapp.min.js': ['<%= concat.loginapp.dest %>']
				}
			},
			
			ticketapp: {
				files: {
					'../../public/js/ticketapp.min.js': ['<%= concat.ticketapp.dest %>']
				}	
			}
		},
		
		watch: {			
			js: {
				files: [
					'../assets/backbone/**/*.js', 
					'../assets/backbone/**/**/*.js', 
					'../assets/backbone/**/**/**/*.js', 
					'../assets/backbone/**/js/templates/*.hbs'
				],
				
				tasks: ['handlebars', 'concat', 'uglify']
			}
		}
	});

	// Load the plugins that prvide the various Grunt tasks
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['handlebars', 'concat', 'uglify']);
}
