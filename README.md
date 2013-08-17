#YAEnumerable

  Yet Another Enumerable Java Script Framework

[![Build Status](https://travis-ci.org/tjchaplin/YAEnumerable.png)](https://travis-ci.org/tjchaplin/YAEnumerable)

##Purpose

  To create and maintain a linq type JS framework.  See Credits/Other Frameworks for alternatives.

##Install

  ```
  npm install yaenumerable
  ```

##Example
Each selector will at a minimum return an item and the index of the item.
The index is always the last item returned in the callback.  See tests for additional examples.


###where Condition
  ```javascript
  var enumerable = require("yaenumerable");
  var anArray = [{a:1},{a:2},{a:3}];
  
  //aValues will now be [{a:2},{a:3}]
  var aValues = enumerable.fromArray(anArray)
                          .where(function(item){return item.a > 1;})
                          .toArray();
  ```

###select
  ```javascript
  var enumerable = require("yaenumerable");
  var anArray = [{a:1},{a:2},{a:3}];
  
  //aValues will now be [1,2,3]
  var aValues = enumerable.fromArray(anArray)
                          .select( function(item){ return item.a; } )
                          .toArray();
  ```

###selectMany
  Allows you to flatten an array
  
  ```javascript
  var enumerable = require("yaenumerable");
  var anArray = [ {a:[1,2,3]}, {a:[4,5,6]}, {a:[7,8,9]} ];
  
  //Will return: [1,2,3,4,5,6,7,8,9]
  var flattenedArray = enumerable.selectMany(function(item){return item.a})
                                 .toArray();
  ```

###first
  ```javascript
  var enumerable = require("yaenumerable");
  var anArray = [{a:1},{a:2},{a:3}];
  
  //if no function specified will return first item:{a:1}
  var firstObject = enumerable.fromArray(anArray).first();
  
  //Since function is specfied to return a, will return 1
  var firstA = enumerable.fromArray(anArray)
                            .first(function(item){return item.a;});
  ```

###sum
  ```javascript
  var enumerable = require("yaenumerable");

  //sum without a selector
  //In this case it will return 6
  var sum = enumerable.fromArray([1,2,3]).sum();

  //When specified with a selector will return the sum of that item:
  //In this case it will return 6
  var sumOfA = enumerable.fromArray([{a:1},{a:2},{a:3}])
                            .sum(function(item){return item.a;});
  ```

###count
  count items in enumerable.  Example use is with an enumerable
  
  ```javascript
  var enumerable = require("yaenumerable");
  var anArray = [1,2,3];
  
  //Will return 2
  var count = enumerable.fromArray([1,2,3])
                        .where(function(item){return item > 1;})
                        .count();
  ```

###any
  Determines if any items meet a condtion
  
  ```javascript
  var enumerable = require("yaenumerable");
  var anArray = [1,2,3];
  
  //Will return true
  var hasItemGreaterThan1 = enumerable.fromArray([1,2,3])
                        .any(function(item){return item > 1;});
  
  //Can use with a selector as well
  var hasItemAGreaterThan1 = enumerable.fromArray([{a:1},{a:2},{a:3}])
                        .any(function(item){return item.a > 1;});
  
  ```

###forEach
  ```javascript
  var enumerable = require("yaenumerable");
  var anArray = [{a:1},{a:2},{a:3}];
  
  //aValues will now be [1,2,3]
  var aValues = enumerable.fromArray(anArray)
                          .forEach( function(item){/*Do something useful*/})
                          .toArray();
  ```

###asyncForEach
  Allows you to make async calls on each item in an array and get the results of all calls when each call is complete.
  
  ```javascript
  var enumerable = require("yaenumerable");
  var anArray = [{a:1},{a:2},{a:3}];

	var longProcess = function(item, onLongProcessComplete){
    //Some long process
    var result = item;
    onLongProcessComplete(result);
	};

	enumerable.fromArray(anArray)
      			.asyncForEach(longProcess,
                          function(results){ 
                            //results is an array with each updated item
                            onComplete(results);
                          });
  ```
  

###For additional examples see the tests.  To run them:
  ```
  npm test
  ```
  
##Credits/Other Frameworks
  
  * [enumerablejs - lukesmith's very comprehensive framework](https://github.com/lukesmith/enumerablejs.git)
  * [enumerable - VisionMedia TJ Holowaychuk](https://github.com/component/enumerable.git)
