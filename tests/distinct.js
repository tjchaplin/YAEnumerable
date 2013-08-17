var should = require('should');
var yaenumerable = require("../lib/yaenumerable.js");

describe('When using distinct',function(){
	var array = [{a:"1"},{a:"2"},{a:"3"},{a:"3"}];
	var expected = ['1','2','3'];
	var expectedWithSelector = [{'1':[{a:"1"}]},{'2':[{a:"2"}]},{'3':[{a:"3"},{a:"3"}]}];

	var enumerable = yaenumerable.fromArray(array);

	it("should return empty enumerable when no selector",function(){
		var result = enumerable.distinct();
		result.any().should.be.false;
	});

	it("when using a property selector should return enumerable with distinct selected values",function(){
		var result = enumerable.distinct(function(item){return item.a}).toArray();
		result.length.should.be.eql(expected.length);
		for (var i = 0; i < expected.length; i++) {
			(expected[i] == result[i]).should.be.true;
		};
	});

	it("when using distinct value selector should return enumerable with distinct selected values",function(){
		var result = enumerable.distinct(function(item){return item.a},
											function(item){return item;}).toArray();

		result.length.should.be.eql(expectedWithSelector.length);
		
		for (var i = 0; i < expectedWithSelector.length; i++) {

			var expectedResult = expectedWithSelector[i];
			var actualResult = result[i];

			for(var value in expectedResult){
				(expectedResult[value].length === actualResult[value].length).should.be.true;

				var expectedDistinctValueObject = expectedResult[value];
				var actualDistinctValueObject = actualResult[value];

				for (var j = 0; j < expectedDistinctValueObject.length; j++) {
					(expectedDistinctValueObject[j].a == actualDistinctValueObject[j].a).should.be.true;
				}
			}
		};
	});

	it("can be combined with enumerable functions",function(){
		var result = enumerable.where(function(item){return true;})
							   .distinct(function(item){return item.a})
							   .count();	

		result.should.be.eql(3);
	});

});