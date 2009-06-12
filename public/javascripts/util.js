/**
* islide - Image Slider
*
* Copyright (c) 2009 Eric D. White
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*/

/**
 * A logger for use within the application.
 *
 * The console be a fucntion that takes
 * a level and a string as a parameter.
 *
 * For example:
 *   var l = new Log('MyClassName', BrowserAlert.console());
 *   l.error("Some message");
 *
 *     or
 *
 *   var spool = new SpoolingConsole(Log.INFO);
 *   var l = new Log('MyClassName', spool.console());
 *   l.error("Some message");
 *   var messages = spool.contents;
 */
function Log(source, console) {
  this.source = source;
  this.console = console;
  this.levels = ["TRACE", "DEBUG", "INFO", "WARN", "ERROR"];
}

Log.TRACE = 0;
Log.DEBUG = 1;
Log.INFO= 2;
Log.WARN = 3;
Log.ERROR = 4;

Log.prototype.level_string_for = function(level) {
  return this.levels[level];
}

Log.prototype.trace = function(msg){
  this._log(Log.TRACE, msg);
};

Log.prototype.debug= function(msg){
  this._log(Log.DEBUG, msg);
};

Log.prototype.info= function(msg){
  this._log(Log.INFO, msg);
};

Log.prototype.warn = function(msg){
  this._log(Log.WARN, msg);
};

Log.prototype.error = function(msg){
  this._log(Log.ERROR, msg);
};

Log.prototype._log = function(level, msg) {
  this.console(level,
	       "[" + this.level_string_for(level) + "] " +
	       this.source +
	       " -- " + msg + "\n");
};

/*
 * This spools all the messages into an array
 * which then can be used to display results
 * to the user.  Only messages greater or equal
 * to the 'log_level' will be captured.
 */
function SpoolingConsole(log_level) {
  this.level = log_level;
  this.contents = [];
}

SpoolingConsole.prototype._spool = function(level, msg) {
  if( level<this.level) {
    return;
  }
  this.contents.push(msg);
};

SpoolingConsole.prototype.console = function() {
  // This allows us to pass the current instance
  // of the  SpoolingConsole object in as 'this'
  // in a callback function.
  return this._spool.bind(this);
};


/*
 * This uses the browsers alert function
 * to display messages to the user as they
 * are logged regardless of level.
 */
function BrowserAlert () {
}

BrowserAlert.console = function() {
  return function(level, msg) {
    alert(msg);
  };
};


var ISlide = {}; // Namespace

//
// Simple Map
//   Better versions can be found here:
//   http://stackoverflow.com/questions/368280/javascript-hashmap-equivalent
//   This is basically pottedmeat's solution (They get all the credit).

ISlide.Map = function() {
  this.dict = new Array();
}

ISlide.Map.KEY = 0;
ISlide.Map.VALUE = 1;

ISlide.Map.prototype.put = function(key, value) {
  if(value==null) {
    value = true;
  }
  var i = this._find(key);
  if(i==null) {
    this.dict.push([key,value]);
  } else {
    this.dict[i][ISlide.Map.VALUE] = value;
  }
};

ISlide.Map.prototype.get = function(key) {
  var i = this._find(key);
  if(i==null) {
    return null;
  }

  return this.dict[i][1];
};

ISlide.Map.prototype.keys = function() {
  var list = new Array();
  for(var i=0; i<this.dict.length; i++) {
    list.push(this.dict[i][ISlide.Map.KEY])
  }
  return list;
};

ISlide.Map.prototype.values = function() {
  var list = new Array();
  for(var i=0; i<this.dict.length; i++) {
    list.push(this.dict[i][ISlide.Map.VALUE])
  }
  return list;
};

ISlide.Map.prototype._find = function(key) {
  for(var i=0; i<this.dict.length; i++) {
    if( this.dict[i][ISlide.Map.KEY]==key ) {
      return i;
    }
  }
  return null;
}