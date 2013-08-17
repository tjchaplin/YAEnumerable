var should = require('should');
var yaenumerable = require("../lib/yaenumerable.js");

describe('When using Select',function(){
	var array = [{a:"1"},{a:"2"},{a:"3"}];
	var enumerable = yaenumerable.fromArray(array);

	it("should return undefined when no items",function(){
		var enumerable = yaenumerable.fromArray([]);
		var result = enumerable.first();
		should.equal(result,undefined);

	});

	it("should return first",function(){
		var result = enumerable.first();
		result.a.should.be.eql("1");
	});

	it("can be combined with enumerable functions",function(){
		var result = enumerable.where(function(item){return item.a == "1"})
							   .first()

		result.a.should.be.eql("1");
	});
	it("when has a first selector should use",function(){
		var result = enumerable.first(function(item){return item.a;});

		result.should.be.eql("1");
	});

});