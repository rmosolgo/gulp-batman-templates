# gulp-batman-templates

This is [gulp](http://gulpjs.com/) port of [davemo/grunt-batman-templates](https://github.com/davemo/grunt-batman-templates). Bravo to him for thinking this up.

### Install

`npm install gulp-batman-templates`

### Example

Lets say you have some `.jade` files that you want to preload in your batman.js app:

```javascript
var gulp = require('gulp');
var concat = require('gulp-concat');
var jade = require('gulp-jade');
var batmanTemplates = require("gulp-batman-templates")

gulp.task("html", function(){
  gulp.src(["./public/batman/html/**/*.jade"])  // Load the .jade files
    .pipe(jade())                               // Convert to HTML
    .pipe(batmanTemplates())                    // Convert HTML to JavaScript for Batman.HTMLStore
    .pipe(concat('templates.js'))               // Join all into one file
    .pipe(gulp.dest("./public/batman/build/"))  // Spit that file out!
})
```

Now, make sure `templates.js` is included in your app:

```html
  <script src='/path/to/batman.js'></script>
  <script src='/path/to/my_app.js'></script>
  <script src='/path/to/templates.js'></script>
```

You're done!
