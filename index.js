// Add to values with string split
// Add media queries
// Write test
// Readme file


var postcss = require('postcss');

module.exports = postcss.plugin('postcss-maze', function (opts) {
    opts = opts || {
      mobile: 480,
      tablet: 768,
      desktop: 960
    };

    var margin = 1;
    var marginOveride = /\s*!marginOveride\s*$/;


    // Work with options here

    // Functions
    var columnWidth = function (coloumnSpan, totalColoumns) {
      var unitWidth = totalColoumns / coloumnSpan;
  		var width = (100 - ( (unitWidth - 1) * margin) ) / unitWidth;
  		return width;
  	};


    // Transform CSS AST here
    return function (css, result) {


      css.eachDecl(function (decl) {

        if(decl.prop === 'col-width') {

          // RegEx
          var value = decl.value; // ( 2 of 6)
          var span = value.split;
          var coloumns = value.split;

          decl.parent.append({ prop: 'width', value: columnWidth(span, coloumns) }); // add two inputs get property values and split
          decl.parent.append({ prop: 'float', value: 'left' });
          decl.parent.append({ prop: 'background', value: 'orange' });
          decl.parent.append({ prop: 'padding', value: '10px' });

          // Margin
          if (!(decl.value.match(marginOveride))) {
						  decl.parent.append({ prop: 'margin-right', value: margin + '%' });
              // Add coloumns child margin 0 - append to css property
					}

          decl.remove();
        }

        else {
					throw decl.error('Invalid declaration', { plugin: 'postcss-maze' });
				}

      });



    };



});
