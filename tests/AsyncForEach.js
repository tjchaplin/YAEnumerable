var should = require("should");
var yaenumerable = require("../lib/yaenumerable.js");

describe("When using asyncForEach", function(){
	this.timeout(10000);

	it("Should be able to execute an asnync action when no onComplete function defined", function(onComplete){
		var numberProcessed = 0;
		var itemsToProcess = [1,2,3];

		var longProcess = function(item){
			setTimeout(function(){
				numberProcessed++;
				
				if(numberProcessed === itemsToProcess.length)
				{
					numberProcessed.should.be.equal(itemsToProcess.length);
					onComplete();
				}
			},1000)
		};

		yaenumerable.fromArray(itemsToProcess)
					.asyncForEach(longProcess);

	});

	it("Should be able to execute an asnync action on each item in an array", function(onComplete){
		var numberProcessed = 0;
		var itemsToProcess = [1,2,3];

		var longProcess = function(item, onLongProcessComplete){
			setTimeout(function(){
				numberProcessed++;
				onLongProcessComplete();
			},1000)
		};

		yaenumerable.fromArray(itemsToProcess)
				.asyncForEach(longProcess,function(results){
					numberProcessed.should.be.equal(itemsToProcess.length);
					onComplete();
				});

	});

	it("Should be able to execute an asnync action on each item in an array and call back to the results", function(onComplete){
		var itemsToProcess = [1,2,3];

		var itemPlusOneAsyncMethod = function(item, onLongProcessComplete){
			setTimeout(function(){ onLongProcessComplete(++item);} , 1000);
		};

		yaenumerable.fromArray(itemsToProcess)
				.asyncForEach(itemPlusOneAsyncMethod,function(results){
					var sum = yaenumerable.fromArray(results).sum();
					sum.should.be.equal(9);
					onComplete();
				});

	});

	it("Should be able to get index of async item for each item", function(onComplete){
		var itemsToProcess = [1,2,3];

		var longProcess = function(item, onLongProcessComplete, onError, index){
			setTimeout(function(){
				item.should.be.equal(itemsToProcess[index])
				onLongProcessComplete();
			},1000)
		};

		yaenumerable.fromArray(itemsToProcess)
				.asyncForEach(longProcess,
								function(results){ 
									onComplete();
								});

	});

	it("Should call on error if an item in for each called onError", function(onComplete){
		var itemsToProcess = [1,2,3];
		var errorMessage = "error";
		var errorProcess = function(item, onComplete, onError){
			setTimeout(function(){
				onError(errorMessage);
			},1000)
		};

		yaenumerable.fromArray(itemsToProcess)
				.asyncForEach(errorProcess,
								function(results){}, 
								function(error){
									error.should.be.equal(errorMessage);
									onComplete();
								});

	});
});