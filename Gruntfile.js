module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-shell');

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
      }
    }
  });
  
  /* Build Tasks */
  grunt.registerTask('build-web', ['shell:build-web']);
  grunt.registerTask('build-app', ['shell:build-app']);

  grunt.registerTask('build', ['build-web', 'build-app']);
};
