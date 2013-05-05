#YAEnumerable

  Yet Another Enumerable Javas Script Framework

[![Build Status](https://travis-ci.org/tjchaplin/YAEnumerable.png)](https://travis-ci.org/tjchaplin/YAEnumerable)

##Install

  `npm install YAEnumerable`

##Example

  ```javascript
  var Enumerable = require("YAEnumerable");
  var anArray = [{a:1},{a:2},{a:3}];
  //aValues will now be [1,2,3]
  var aValues = Enumerable.Select(function(item){return item.a;}).ToArray();
  ```
  For additional examples see the tests.  To run them:
  `npm test`
  
##Credits
  
  lukesmith - https://github.com/lukesmith/enumerablejs.git
