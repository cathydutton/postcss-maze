var postcss = require('postcss'),
    grid = require('../'),
    assert = require('assert');

var settingsConfig = {
    margin: 1
};

var test = function (opts, input, output) {
    assert.equal(postcss(grid(opts)).process(input).css, output);
};

test(settingsConfig, '.element{col-span: mobile(1,1);}', '.element{float: left;box-sizing: border-box;margin-right: 0.5%;margin-left: 0.5%;width: 99%;transition: all 0.5s ease;}');
test(settingsConfig, '.element{col-span: mobile(1,2);}', '.element{float: left;box-sizing: border-box;margin-right: 0.5%;margin-left: 0.5%;width: 49%;transition: all 0.5s ease;}');
test(settingsConfig, '.element{col-span: mobile(1,3);}', '.element{float: left;box-sizing: border-box;margin-right: 0.5%;margin-left: 0.5%;width: 32.333333333333336%;transition: all 0.5s ease;}');
