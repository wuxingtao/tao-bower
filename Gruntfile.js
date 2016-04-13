//包装函数
module.exports = function(grunt) {

    //任务配置，所有插件的配置信息
    grunt.initConfig({

        //获取package.json的信息
        pkg: grunt.file.readJSON('package.json'),

        //uglify插件的配置信息
        uglify: {
            options: {
                stripBanner: true,
                banner: '/*<%=pkg.name%>-<%=pkg.version%>.js<%=grunt.template.today("yyyy-mm-dd")%>*/\n'
            },
            build: {
                src: './public/javascripts/*.js',
                dest: 'build/<%=pkg.name%>-<%=pkg.version%>.js.min.js'
            }
        },
        //jshint插件的配置信息
        jshint: {
            build: ['Gruntfile.js', 'src/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        //watch插件的配置信息
        watch: {
            build: {
                files: ['./public/javascripts/*.js', './public/stylesheets/*.css'],
                tasks: ['uglify'],
                // tasks: ['jshint', 'uglify'],
                options: {
                    spawn: false
                }
            }
        },

        bower: {
            install: {
              options: {
                targetDir: './public/javascripts',
                layout: 'byComponent',
                install: true,
                verbose: false,
                cleanTargetDir: false,
                cleanBowerDir: false,
                bowerOptions: {}
              }
            }
          }

    });

    //告诉grunt我们将使用插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');

    //告诉grunt当我们在终端输入grunt时需要做些什么(注意先后顺序)
    grunt.registerTask('default', ['uglify', 'watch']);
}
