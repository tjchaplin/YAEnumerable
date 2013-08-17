var should = require('should');
var yaenumerable = require("../lib/yaenumerable.js");

describe('When using Select',function(){
	var array = [{a:"1"},{a:"2"},{a:"3"}];
	var enumerable = yaenumerable.fromArray(array);

	it("should return empty enumerable when no selector",function(){
		var result = enumerable.select();
		result.any().should.be.false;
	});

	it("when using a property selector should return enumerable with selected",function(){
		var result = enumerable.select(function(item){return item.a}).toArray();
		result.length.should.be.eql(3);
		for (var i = 0; i < array.length; i++) {
			(array[i].a == result[i]).should.be.true;
		};
	});

	it("can be combined with enumerable functions",function(){
		var result = enumerable.where(function(item){return true;})
							   .select(function(item){return item.a})
							   .count();	

		result.should.be.eql(3);
	});

});