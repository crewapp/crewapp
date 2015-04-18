module.exports = function(grunt) {
  'use strict';
  /* Project configuration */
  grunt.initConfig({
    shell: {
      'build-web': {
        command: [
          'cd server', 
          'npm install'
          ].join(' && ')
      },
      'build-app': {
        command: [
          'cd app', 
          'npm install'
          ].join(' && ')
      },
      'run-server': {
        command: [
          'cd server',
          'node server.js'
        ].join(' && ')
      },
      'open-app': {
        command: [
          'cd app',
          'open app.xcodeproj'
        ].join(' && ')
      },
      'mysql-start': {
        command: [
          'mysql.server start'
        ].join(' && ')
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        ignores: ['./**/node_modules', '**/*.ios.js', 'app/views/**/*.js', 'app2/**/*'], 
      },
      all: ['./']
    },
    eslint: {
      options: {
        eslintrc: '.eslintrc',
      },
      target: ['./app/index.ios.js', 'app/views/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-eslint');

  /* Build Tasks */
  grunt.registerTask('build-web', ['shell:build-web']);
  grunt.registerTask('build-app', ['shell:build-app']);

  grunt.registerTask('build', ['build-web', 'build-app']);

  /* Run Server */
  grunt.registerTask('run-server', ['shell:run-server']);

  /* Open iOS app */
  grunt.registerTask('app', ['shell:mysql-start','shell:open-app', 'run-server']);
  
  /* Testing */
  grunt.registerTask('test', ['jshint', 'eslint']);
};
