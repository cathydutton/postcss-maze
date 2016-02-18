# PostCSS Maze

A fully flexible mobile first grid to suit any design pattern.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/cathydutton/postcss-maze.svg
[ci]:      https://travis-ci.org/cathydutton/postcss-maze


Maze is a flexible and semantic mobile first responsive grid built with PostCSS. Maze is fully customisable and removes the reliance on .last-column classes by instead applying the margin to both sides of each element and adjusting the wrapper width accordingly.


## Installation


## Creating a grid

Firstly the wrapper is given a property of grid-container with a value of true.

```css
.wrapper {
  grid-container: true;
}
```

This calculates the wrapper width based on the values assigned to the largest and smallest media queries, and adds a clearfix.

The max width is calculated accounting for the element margins...

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
Each column is then created as a ratio at a set media query...

```css
.four-elements {
  col-span: mobile(1,1);
  col-span: phablet(1,2);
  col-span: tablet(1,4);
}
```

```css
.four-elements {
  float: left;
  box-sizing: border-box;
  margin-right: 0.5%;
  margin-left: 0.5%;
  width: 99%;
}

@media only screen and (min-width:30em) {

  .four-elements {
    width: 49%;
  }

}

@media only screen and (min-width:48em) {

  .four-elements {
    width: 24%;
  }

}
```

The above element will display one per row at mobile, two per row at landscape and 4 per row at tablet. The Mobile declaration is the default value and therefore is not rendered inside a media query.

### Examples

```css
.twelve-elements {
  col-span: mobile(1,1);
  col-span: phablet(1,2);
  col-span: tablet(1,4);
  col-span: desktop(1,6);
  col-span: wide(1,12);
}
```

```css
.six-elements {
  col-span: mobile(1,2);
  col-span: tablet(1,3);
  col-span: desktop(1,6);
}
```

### Settings

By default Maze works with 5 media queries and has a margin of 1%. These settings can be overridden with custom config.

All media query dimensions should be written in EM's, and margins as a percentage...

```js
var processors = [
postcssMaze({
media: {
 mobile:    20,
 phablet:   30,
 tablet:    48,
 desktop:   63.750,
 wide:      80
},
settings: {
 margin: 10
}
}),
```

An example using Gulp as a task runner...

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
        mobile:    20,
        phablet:   30,
        tablet:    48,
        desktop:   63.750,
        wide:      80
      },
      settings: {
        margin: 10
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

  return gulp.src('src/input.css')
    .pipe(postcss(processors))
    .pipe(concat('dist/output.css'))
    .pipe(gulp.dest('.'));
});


```

### Support
If you have any questions get in touch:

-   [info@cathydutton.co.uk](mailto:info@cathydutton.co.uk)
-   [@cathy_dutton](http://twitter.com/cathy_dutton)
