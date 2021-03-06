(function(exports){
	"use strict";
	
	var Enumerable = function(sequence){
		var self = this;
		if(sequence === 'undefined' || sequence === null)
			sequence = [];

		self.sequence = sequence;		
		return self;
	};

	Enumerable.prototype.where = function(condition){
		var self = this;
		var results = [];

		if(!condition)
			return new Enumerable(results);

		for (var index = 0; index < self.sequence.length; index++) {
			if(condition(self.sequence[index],index))
				results.push(self.sequence[index]);
		}

		return new Enumerable(results);
	};

	Enumerable.prototype.sum = function(selector){
		var self = this;

		if(!selector)
			selector = function(item){return item;};

		var sum = 0;
		self.forEach(function(item,index){ sum += selector(item,index); });
		return sum;
	};

	Enumerable.prototype.forEach = function(onEach){
		var self = this;

		if(!onEach)
			return self;

		for (var index = 0; index < self.sequence.length; index++) {
			onEach(self.sequence[index],index);
		}

		return self;
	};

	Enumerable.prototype.asyncForEach = function(onEachItem, onComplete, onError){
		var self = this;

		var results = [];
		var itemErrorOccured = false;
		var numberOfCallsRemaining = self.sequence.length;

		var onItemError = function(error){
			if(itemErrorOccured)
				return;

			if(onError)
				onError(error,results);

			itemErrorOccured = true;
		};

		var onItemComplete =function(resultItem){
			if(itemErrorOccured)
				return;

			results.push(resultItem);
			numberOfCallsRemaining--;

			if(numberOfCallsRemaining === 0)
			{
				if(onComplete)
				{
					onComplete(results);
				}
			}
		}; 

		self.forEach(function(item,index){ 
			onEachItem(item, onItemComplete, onItemError, index);
		});
		
		return self;
	};

	Enumerable.prototype.distinct = function(distinctSelector,valueSelector){
		var self = this;
		var selected = [];
		var distinctValues = {};
		var returnValueObject = false;

		if(!distinctSelector)
			return new Enumerable(selected);

		if(!valueSelector)
			valueSelector = function(){return '';};
		else
			returnValueObject = true;

		for (var index = 0; index < self.sequence.length; index++) {

			var value = distinctSelector(self.sequence[index],index);

			if(!(distinctValues[value] instanceof Array))
				distinctValues[value] = [];

			distinctValues[value].push(valueSelector(self.sequence[index]));
		}

		for(var x in distinctValues){
			var returnValue = x;
			if(returnValueObject){
				returnValue = {};
				returnValue[x] = distinctValues[x];
			}
			selected.push(returnValue);
		}
		
		return new Enumerable(selected);
	};

	Enumerable.prototype.select = function(selector){
		var self = this;
		var selected = [];

		if(!selector)
			return new Enumerable(selected);

		for (var index = 0; index < self.sequence.length; index++) {
			selected.push(selector(self.sequence[index],index));
		}

		return new Enumerable(selected);
	};

	Enumerable.prototype.selectMany = function(selector){
		var self = this;
		var selected = [];

		if(!selector)
			return new Enumerable(selected);

		var addItems = function(item){selected.push(item);};

		for (var index = 0; index < self.sequence.length; index++) {
			var selectedResults = new Enumerable(selector(self.sequence[index],index));
			selectedResults.forEach(addItems);
		}

		return new Enumerable(selected);
	};

	Enumerable.prototype.first = function(selector){
		var self = this;

		if(!selector)
			return self.sequence[0];

		return selector(self.sequence[0]);
	};

	Enumerable.prototype.any = function(condition){
		var self = this;

		var result = false;

		if(!condition)
			return self.sequence.length > 0;

		for (var index = 0; index < self.sequence.length; index++) {
			if(condition(self.sequence[index],index))
				result = true;
		}
		return result;
	};

	Enumerable.prototype.count = function(condition){
		var self = this;

		if(!self.sequence)
			return 0;

		return self.sequence.length;
	};

	Enumerable.prototype.toArray = function(){
		var self = this;
		return self.sequence;
	};

	exports.fromArray = function(array){
		return new Enumerable(array);
	};

})(exports);
