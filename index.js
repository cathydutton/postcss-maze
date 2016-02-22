// max width - exact value -- rounding
// Write test - lint test.JS

var postcss = require('postcss'),
    _ = require('underscore');

// Default Media Config
var mediaConfig = {
    mobile:  20,
    phablet: 30,
    tablet:  48,
    desktop: 63.750,
    wide:    80
};

// Default Settings Config
var settingsConfig = {
    margin: 1
};

module.exports = postcss.plugin('postcss-maze', function (options) {

    // Extend the default Configs with any custom values.
    options = options || {};
    mediaConfig = _.extend(mediaConfig, options.media);
    settingsConfig = _.extend(settingsConfig, options.settings);

    // Width Function
    var columnWidth = function (coloumnSpan, totalColoumns) {
        var unitWidth = totalColoumns / coloumnSpan;
        var width = (100 - unitWidth * settingsConfig.margin) / unitWidth;
        return width + '%';
    };

    // Set widths - Add to the max width to compensate for margin
    var maxWidth = mediaConfig.wide + mediaConfig.wide / 100 *
      settingsConfig.margin;
    var minWidth = mediaConfig.mobile; /* Set min width with scroll bar */


    return function (css) {
        css.walkRules(function (rule) {
            rule.walkDecls(function (decl) {

                var value = decl.value,
                    selectorName = decl.parent.selector,
                    prop = decl.prop;

                // Set up grid container
                if (prop === 'grid-container') {
                    var gridContainerCheck = /^\s*true\s*$/;

                    if (!value.match(gridContainerCheck)) {
                        throw decl.error('Syntax Error - grid-container:true', {
                            plugin: 'postcss-maze'
                        });
                    } else {
                        decl.parent.append({
                            prop:  'max-width',
                            value: maxWidth + 'em'
                        });
                        decl.parent.append({
                            prop:  'min-width',
                            value: 'calc(' + minWidth + 'em - 20px)'
                        });
                        decl.parent.append({
                            prop:  'margin',
                            value: '0 auto'
                        });
                        decl.parent.append({
                            prop:  'box-sizing',
                            value: 'border-box'
                        });
                        css.insertBefore(
                          decl.parent,
                            selectorName + '::after {' +
                            'content: "" ;' +
                            ' display: table;' +
                            'clear: both }'
                          );
                    }
                    decl.remove();
                }

                // Set up grid elements
                if (prop === 'col-span') {
                    var colCheck = /^([a-z]+)(\([0-9]{1,2})(,[0-9]{1,2}\))$/;

                    if (!value.match(colCheck)) {
                        throw decl.error('Syntax Error - media(value,value)', {
                            plugin: 'postcss-maze'
                        });
                    } else {

                        // Variables
                        var split = value.split('('); // Split Media from values
                        // Media (mobile, desktop etc)
                        var chosenMedia = split[0];
                        var values = split[1]; // Grid values
                        // Remove trailing ) and split the two values (2,6)
                        var splitValues = values.slice(0, -1).split(',');
                        var span = splitValues[0]; // Col Span
                        var coloumns = splitValues[1]; // Total coloumns
                        var mediaValue = mediaConfig[chosenMedia];
                        var marginValue = settingsConfig.margin;

                        if (chosenMedia === 'mobile') {
                            decl.parent.append({
                                prop:  'float',
                                value: 'left'
                            });
                            decl.parent.append({
                                prop:  'box-sizing',
                                value: 'border-box'
                            });
                            decl.parent.append({
                                prop:  'margin-right',
                                value: marginValue / 2 + '%'
                            });
                            decl.parent.append({
                                prop:  'margin-left',
                                value: marginValue / 2 + '%'
                            });
                            decl.parent.append({
                                prop:  'width',
                                value: columnWidth(span, coloumns)
                            });
                            decl.parent.append({
                                prop:  'transition',
                                value: 'all 0.5s ease'
                            });
                        } else {
                            // add media query
                            css.insertBefore(decl.parent,
                              '@media only screen and (min-width:' +
                              mediaValue +
                              'em) { ' +
                              selectorName +
                              '{width:' +
                              columnWidth(span, coloumns) +
                              '} }');
                        }

                    }

                    decl.remove();
                }

            });

        });

    };

});
