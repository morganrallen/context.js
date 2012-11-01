module.exports = function(grunt) {
  grunt.initConfig({
    docs: {
      data: {
        jsdoc:{},
        dest: "./docs",
        src: "context.js"
      }
    }
  });

  grunt.loadTasks("tasks");

  grunt.registerTask('default', 'docs');
}
