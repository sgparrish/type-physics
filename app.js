requirejs.config({
    baseUrl: 'lib',
    paths: {
        bin: '../bin',
        test: '../test'
    },
    bundles: {
        'bin/main': ['main']
    }
});
requirejs(['main']);