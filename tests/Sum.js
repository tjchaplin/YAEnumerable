var should = require('should');
var yaenumerable = require("../lib/yaenumerable.js");

describe('When using sum',function(){
	var array = [1,2,3];
	var enumerable = yaenumerable.fromArray(array);

	it("should sum all items if no object selector paramaters",function(){
		var result = enumerable.sum();
		result.should.be.equal(6);
	});

	it("should sum all items based on selector paramaters",function(){
		var objectArray = [{a:1},{a:2},{a:3}];
		var result = yaenumerable.fromArray(objectArray)
							   .sum(function(item){return item.a;});
							   
		result.should.be.equal(6);
	});

});