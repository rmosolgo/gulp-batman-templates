var Buffer = require('buffer').Buffer;
var es = require('event-stream');

// Escape quotes:
var prepareHTML = function(str){
  return str.replace(/"/g, "\\\"").replace(/'/g, "\\\'").split("\n").join("\\n")
}

// Turn the file path into a path like Batman.HTMLStore expects
// by removing everything before (and including) html/
// and removing .html.*
var pathToStorageKey = function(str){
  var newStr = str.replace(/^.*\/html/, "").replace(/\.html.*/, '')
  return newStr
}

// Take an HTML File and return JavaScript text for preloading the file's contents
var templateStringForFile = function(file){
    var storageKey = pathToStorageKey(file.path)
    var str = file.contents.toString('utf8');
    var preparedStr = prepareHTML(str)
    data = "Batman.View.store.set('" + storageKey + "', '" + preparedStr + "');";
    return data
}

// Returns a gulp-compliant function
var batmanTemplates = function() {
  var writeTemplate = function(file){
    if (file.isNull()) { return this.emit('data', file); }
    data = templateStringForFile(file)
    file.contents = new Buffer(data);
    return this.emit('data', file);
  }
  return es.through(writeTemplate)
}

module.exports = batmanTemplates;
