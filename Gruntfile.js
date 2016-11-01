module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      buildLibs: {
        src: 'js/libs.js',
        dest: 'js/libs.min.js'
      },
      buildApp: {
        src: 'js/app.js',
        dest: 'js/app.min.js'
      }
    },
	concat: {
	  options: {
		stripBanners: true,  
	    separator: ';'
	  },
	  libs: {
		nonull: true,  
	    src: [
	    	'node_modules/jquery/jquery.js',
	    	'node_modules/jquery.maskedinput/src/jquery.maskedinput.js',
	    	'node_modules/bootstrap/dist/js/bootstrap.js',
	    	'node_modules/datatables.net/js/jquery.dataTables.js',
	    	'node_modules/datatables-responsive/js/dataTables.responsive.js',
	    	'node_modules/angular/angular.min.js',
	    	'node_modules/angular-route/angular-route.min.js',
	    	'node_modules/ng-storage/ngStorage.min.js',
	    	'node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.min.js',
	    	'node_modules/sweetalert/dist/sweetalert.min.js',
	    	'node_modules/chartjs/chart.js',
	    	'lib/dataTables.bootstrap.min.js',
	    	'lib/loading-bar.js',
	    	'lib/switchery.min.js',
	    	'lib/raphael-min.js',
	    	'lib/morris.min.js'	    	
	    ],
	    dest: 'js/libs.js'
	  },
	  app: {
		nonull: true,  
	    src: ['scripts/app.js', 'scripts/controllers.js', 'scripts/services.js' ],
	    dest: 'js/app.js'
	  }
	}
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['concat', 'uglify']);
};