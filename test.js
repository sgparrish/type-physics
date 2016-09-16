requirejs.config({
    baseUrl: 'lib',
    paths: {
        bin: '../bin',
        test: '../test'
    },
    bundles: {
        'bin/main': ['src/main', 'test/main']
    }
});
requirejs(['test/main']);