module.exports = function(grunt) {
	var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'scss',
          src: ['*.scss'],
          dest: './css',
          ext: '.css'
        }]
      }
    },
    cssmin: {
      compress: {
        files: {
          './css/min.css': [
            './css/html5reset-1.6.1.css',
            './css/common.css',
            './css/test.css'
          ]
        }
      }
    },
//    connect: {
//      livereload: {
//        options: {
//          port: 8000
//        }
//      }
//    },
    watch: {
      sass: {
        files: ['./scss/*.scss'],
        tasks: ['sass', 'cssmin']
      },
      css: {
        files: ['./css/*.css', '!./css/min.css'],
        tasks: ['cssmin']
      },
      html: {
        files: ['./*.html'],
        tasks: []
      },
      options: {
        livereload: true,
        nospawn: true
      }
    }
  });

  // loadNpmTasksã‚’å¤‰æ›´
  var taskName;
  for(taskName in pkg.devDependencies) {
    if(taskName.substring(0, 6) == 'grunt-') {
      grunt.loadNpmTasks(taskName);
    }
  }

  //connect‚Ìİ’è
  var connect = require('connect');
  
  grunt.registerTask('connect', 'Start a custom static web server.', function() {
    grunt.log.writeln('Starting static web server on port 8000.');
    var app = connect();
    app.use(connect.directory(__dirname)); //directory‚Ì•\¦‚ğ—Dæ
    app.use(connect.static(__dirname)); //html‚Ì•\¦‚Í‚»‚ÌŸ
    app.listen(8000);
  });
  
  grunt.registerTask('default', ['connect', 'sass', 'cssmin', 'watch']);
};