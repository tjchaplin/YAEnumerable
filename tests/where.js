var should = require('should');
var yaenumerable = require("../lib/yaenumerable.js");

describe('When using a where condition',function(){
	var array = ["1","2","3"];
	var enumerable = yaenumerable.fromArray(array);

	it("should return empty enumerable when no condition ",function(){
		var result = enumerable.where();
		result.sequence.length.should.be.eql(0);
	});

	it("should return enumerable with all matching items when condition is met",function(){
		var result = enumerable.where(function(item){return typeof item === "string"});
		result.sequence.length.should.be.eql(3);
	});

	it("should return empty enumerable when condition is not met",function(){
		var result = enumerable.where(function(item){return false});
		result.sequence.length.should.be.eql(0);
	});

});