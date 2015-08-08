// webpack requires all test in this directory and all sub directories
var context = require.context('.', true, /-test\./);
context.keys().forEach(context);
