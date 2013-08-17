var should = require('should');
var yaenumerable = require("../lib/yaenumerable.js");

describe('When using Count',function(){
		var array = ["1","2","3"];
	var enumerable = yaenumerable.fromArray(array);

	it("should return number of items",function(){
		var result = enumerable.count();
		result.should.be.eql(3);
	});

	it("should return 0 if no items",function(){
		var enumerable = yaenumerable.fromArray([]);
		var result = enumerable.count();
		result.should.be.eql(0);
	});

	it("can be combined with enumerable functions",function(){
		var result = enumerable.where(function(item){return item == "1"})
							   .count();	

		result.should.be.eql(1);
	});

});