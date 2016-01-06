// max width - exact value

// Write test
// Readme file
// Content and style seperation blog
// Demo folder
// Tidy up

var postcss = require('postcss');
var _ = require('underscore');

// Default Media Config
var mediaConfig = {
  'mobile': 280,
  'landscape': 480,
  'tablet': 768,
  'desktop': 1020,
  'wide': 1280
}

// Default Settings Config
var settingsConfig = {
  'margin': 1
}

module.exports = postcss.plugin('postcss-maze', function (options) {

  options = options || {};
  // Extend the default mediaConfig option with any custom devices set in the plugin's options (Gulp)
  mediaConfig = _.extend(mediaConfig, options.media);
  msettingsConfig = _.extend(settingsConfig, options.settings);

  // Width Function
  var columnWidth = function (coloumnSpan, totalColoumns) {
    var unitWidth = totalColoumns / coloumnSpan;
    var width = (100 - (unitWidth * settingsConfig.margin)) / unitWidth;
    return width  + '%';
  };

  // Margin Function - Widths function????
  var maxWidth = mediaConfig.wide + ((mediaConfig.wide / 100)  * settingsConfig.margin);
  var minWidth = mediaConfig.mobile - 20; /* Set min width with scroll bar */
  // ????????
  return function (css) {

    css.walkRules(function (rule) {

      rule.walkDecls(function (decl, i) {

        var value = decl.value;
        var selectorName = decl.parent.selector;
        var prop = decl.prop;

        if(prop === 'grid-container') {
          var valueCheck = /^\s*true\s*$/;

          if (!(value.match(valueCheck))) {
            throw decl.error('Syntax Error - grid-container = true', { plugin: 'postcss-maze' });
          } else {
            decl.parent.append({ prop: 'max-width', value: maxWidth +'px' });
            decl.parent.append({ prop: 'min-width', value: minWidth +'px' });
            decl.parent.append({ prop: 'margin', value: '0 auto' });
            decl.parent.append({ prop: 'box-sizing', value: 'border-box' });
            css.insertBefore(decl.parent ,(selectorName +'::after {content: "" ; display: table; clear: both}'));
          }
          decl.remove();
        }

        if(prop === 'col-span') {
          var valueCheck = /^([a-z]+)(\([0-9]{1,2})(,[0-9]{1,2}\))$/;

          if (!(value.match(valueCheck))) {
            throw decl.error('Syntax Error - col-span should be entered as media(span,totalColumns)', { plugin: 'postcss-maze' });
          } else {

          // Variables
          var split = value.split('('); // Split Media from values
          var chosenMedia = split[0]; // Media (mobile, desktop etc)
          var values = split[1]; // Grid values
          var splitValues = values.slice(0, -1).split(','); // Remove trailing ) and split the two values (2,6)
          var span = splitValues[0]; // Col Span
          var coloumns = splitValues[1]; // Total coloumns
          var mediaValue = mediaConfig[chosenMedia];
          var marginValue = settingsConfig['margin'];

          if(chosenMedia === 'mobile') {

            decl.parent.append({ prop: 'float', value: 'left' });
            decl.parent.append({ prop: 'box-sizing', value: 'border-box' });
            decl.parent.append({ prop: 'margin-right', value: marginValue/2 +'%' });
            decl.parent.append({ prop: 'margin-left', value: marginValue/2 +'%' });
            decl.parent.append({ prop: 'width', value: columnWidth(span,coloumns) });

          } else {
            // add media query
            css.insertBefore(decl.parent ,('@media only screen and (min-width:' + mediaValue + 'px) { '+ selectorName +'{width:' + columnWidth(span,coloumns) + '} }'));
          }

        }

      decl.remove();
    }

  });

});

};

});
