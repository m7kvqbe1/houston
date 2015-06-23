module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		concat: {
			options: {
				sourceMap: true,
				separator: ';'
			},

			loginapp: {
				src: [
					'../assets/backbone/loginapp/js/models/*.js',
					'../assets/backbone/loginapp/js/views/*.js',
					'../assets/backbone/loginapp/js/login.js',
					'../assets/backbone/loginapp/js/app.js'
				],

				dest: '../../public/js/loginapp.js'
			},

			ticketapp: {
				src: [
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
					'../assets/backbone/lib/underscore-min.js',
					'../assets/backbone/lib/backbone-min.js',
					'../assets/backbone/lib/handlebars.js'
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
				files: ['../assets/backbone/**/*.js', '../assets/backbone/**/**/*.js', '../assets/backbone/**/**/**/*.js'],
				tasks: ['concat', 'uglify']
			}
		}
	});

	// Load the plugins that prvide the various Grunt tasks
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['concat', 'uglify']);
}
