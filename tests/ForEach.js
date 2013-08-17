var should = require('should');
var yaenumerable = require("../lib/yaenumerable.js");

describe('When iterating with a forEach',function(){
	var array = [1,2,3];
	var enumerable = yaenumerable.fromArray(array);

	it("should return enumerable if no paramaters",function(){
		var result = enumerable.forEach().toArray();
		result.length.should.be.equal(3);
	});

	it("should perform action on each item in array",function(){
		var sum = 0;
		enumerable.forEach(function(item){ return sum+= item});
		sum.should.be.equal(6);
	});

});