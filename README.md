# PostCSS Maze

A fully flexible mobile first grid to suit any design pattern.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/cathydutton/postcss-maze.svg
[ci]:      https://travis-ci.org/cathydutton/postcss-maze


Maze is a flexible and semantic mobile first responsive grid built with [PostCSS]. Maze is fully customisable with editable options for total grid columns, column span, gutter widths and break points. 

Maze removes the reliance on last column margin overrides by instead applying the margin to both sides of the column and adjusting the wrapper with accordingly. 


## Installation

```js
npm install postcss-maze
```

## Creating a grid

Firstly the wrapper is given a property of grid-container with a value of true.

```css
.wrapper {
  grid-container: true;
}
```

This calculates the wrapper width based on the values assigned to the largest and smallest media queries, and adds a clearfix.

```css
.wrapper {
  max-width: 1030.2px;
  min-width: 260px;
  margin: 0 auto;
  box-sizing: border-box;
}

.wrapper::after {
  content: "" ;
  display: table;
  clear: both;
}
```
Each column is then created as a ratio at a set media query.

```css
.four-columns {
  col-span: mobile(1,1);
  col-span: landscape(1,2);
  col-span: tablet(1,4);
}
```

```css
.four-columns {
  float: left;
  box-sizing: border-box;
  margin-right: 0.5%;
  margin-left: 0.5%;
  width: 99%;
}

@media only screen and (min-width:480px) {

  .four-columns {
    width: 49%;
  }

}

@media only screen and (min-width:768px) {

  .four-columns {
    width: 24%;
  }

}
```

The above element will display one per row at mobile, two per row at landscape and 4 per row at tablet.

### Gulp set up

```js
// CSS TASK
gulp.task('css', function () {
    var concat = require('gulp-concat'),
        postcss = require('gulp-postcss'),
        mqpacker = require('css-mqpacker'),
        postcssMaze = require('./index.js'),
        autoprefixer = require('autoprefixer');

    var processors = [
        postcssMaze({
            media: {
                // mobile: 280,
                // landscape: 480,
                // tablet: 768,
                // desktop: 1020,
                wide: 1020
            },
            settings: {
                // margin: 10
            }
        }),
        mqpacker,
        autoprefixer({
            browsers: ['> 2%', 'IE >= 9', 'iOS >= 7'],
            cascade:  false,
            map:      true,
            remove:   true
        })
    ];

    return gulp.src([
          'demo/layout.css',
          'demo/theme.css'
        ])
        .pipe(postcss(processors))
        .pipe(concat('demo/output.css'))
        .pipe(gulp.dest('.'));
});


```

### Support
If you have any questions get in touch:

-   [info@cathydutton.co.uk](mailto:info@cathydutton.co.uk)
-   [@cathy_dutton](http://twitter.com/cathy_dutton)




