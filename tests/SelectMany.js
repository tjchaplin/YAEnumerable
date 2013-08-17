var should = require('should');
var yaenumerable = require("../lib/yaenumerable.js");

describe('When using selectMany',function(){
	var array = [{a:[1,2,3]},{a:[4,5,6]},{a:[7,8,9]}];
	var enumerable = yaenumerable.fromArray(array);

	it("should return empty enumerable when no selector",function(){
		var result = enumerable.selectMany();
		result.any().should.be.false;
	});

	it("when using a property selector should return enumerable with flatten results",function(){
		var result = enumerable.selectMany(function(item){return item.a}).toArray();
		result.length.should.be.eql(9);
		var resultIndex = 0;
		for (var i = 0; i < array.length; i++) {
			for(var j = 0; j < array[i].a.length; j++)
			{
				(array[i].a[j] == result[resultIndex]).should.be.true;
				resultIndex++;
			}
		};
	});
	it("Should be able to combine with other enumerable functions",function(){
		var result = enumerable.selectMany(function(item){return item.a}).sum();
		result.should.eql(45)
	});
	it("Should be able to combine with other enumerable functions",function(){
		var result = enumerable.selectMany(function(item){return item.a}).count();
		result.should.eql(9)
	});
});