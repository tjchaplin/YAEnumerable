var should = require('should');
var yaenumerable = require("../lib/yaenumerable.js");

describe('When using ToArray',function(){
	var array = ["1","2","3"];
	var enumerable = yaenumerable.fromArray(array);

	it("should return array",function(){
		var result = enumerable.toArray();
		result.length.should.be.eql(3);
		for (var i = 0; i < array.length; i++) {
			(array[i] == result[i]).should.be.true;
		};
	});

	it("can be combined with enumerable functions",function(){
		var result = enumerable.where(function(item){return item == "1"})
							   .count();	

		result.should.be.eql(1);
	});

});