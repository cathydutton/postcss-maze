var postcss = require('postcss');
var expect  = require('chai').expect;

var plugin = require('../');

var test = function (input, output, opts, done) {
    postcss([ plugin(opts) ]).process(input).then(function (result) {
        expect(result.css).to.eql(output);
        expect(result.warnings()).to.be.empty;
        done();
    }).catch(function (error) {
        done(error);
    });
};


describe('postcss-maze', function () {

    /* Tests

    it('does something', function (done) {
        test('a{ }', 'a{ }', { }, done);
    });*/

    it('adds row styling', function () {
        test('a:hover, b {}', 'a:hover, b, a:focus {}');
    });

    it('adds column styling', function () {
        test('a:hover, b:hover {}', 'a:hover, b:hover, a:focus, b:focus {}');
    });

    test('.element{grid-column: 1/12;}',
    '.element{float: left;width: 6.42361%;margin-right: 2.08333%;}');

});
