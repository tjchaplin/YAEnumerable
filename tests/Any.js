var should = require('should');
var yaenumerable = require("../lib/yaenumerable");

describe('When selecting Any',function(){
	var array = ["1","2","3"];
	var enumerable = yaenumerable.fromArray(array);

	it("should return false when no condition ",function(){
		var result = enumerable.any(function(item){return false;});
		result.should.be.false;
	});

	it("should return true when can match an item",function(){
		var result = enumerable.any(function(item){return item == "1"});
		result.should.be.true;
	});

	it("should return false when condition is not met for all items",function(){
		var result = enumerable.any(function(item){return false;});
		result.should.be.false;
	});

	it("can be combined with Where condition",function(){
		var result = enumerable.where(function(item){return item == "1";})
							   .any();
		result.should.be.true;
	});

});