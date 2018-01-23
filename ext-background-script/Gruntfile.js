module.exports = function (grunt) {
    var path = require("path");

    var targetDir = path.resolve((grunt.option("targetDir") || "target").replace(/([/\\]*$)/g, ""));

    var webpackOptions = {
        cache: true,
        devtool: "source-map",
        entry: {
            background: ["./src/main/background.js"]
        },
        output: {
            path: targetDir,
            filename: "[name].bundle.js"
        },
        resolve: {
            extensions: [".js"]
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: "babel-loader",
                    exclude: /node_modules/,
                    query: {
                        presets: ["es2015"]
                    }
                }
            ],
        }
    };

    grunt.initConfig({
        webpack: {
            options : webpackOptions,
            compile : {
                output: {
                    publicPath: ""
                }
            }
        },
    });

    // Compile (e.g minification)
    grunt.registerTask("compile", ["webpack:compile"]);

    // Test is Unit Testing
    grunt.registerTask("test", ["jest"]);

    // NPM Tasks
    grunt.loadNpmTasks("gruntify-eslint");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-webpack");

    grunt.registerTask("jest", "Run tests with Jest.", function() {
        //Tell Grunt this is an async task
        var done = this.async();

        const testResults = require("jest").runCLI(this.options(), [process.cwd()], this.async());

        testResults.then( ({results}) => {
            if(!results.success){
                grunt.fail.warn("Test Failures!");
            }
            done();
        }, (error) => {
            grunt.fail.fatal("Error During Tests: " + error);
        });

    });
};
