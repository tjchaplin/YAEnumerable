(function(exports){
	"use strict";

	var ToArray = function(sequence){
		return sequence;
	};

	var Any = function(sequence,condition){
		var result = false;

		if(!condition)
			return sequence.length > 0;

		for (var i = 0; i < sequence.length; i++) {
			if(condition(sequence[i]))
				result = true;
		}
		return result;
	};

	var Count = function(sequence){
		if(!sequence)
			return 0;

		return sequence.length;
	};

	var First = function(sequence, selector){
		if(!selector)
			return sequence[0];

		return selector(sequence[0]);
	};

	var Select = function(sequence, selector){
		var selected = [];

		if(!selector)
			return new Enumerable(selected);

		for (var i = 0; i < sequence.length; i++) {
			selected.push(selector(sequence[i]));
		}

		return new Enumerable(selected);
	};

	var Where = function(sequence,condition){
		var results = [];

		if(!condition)
			return new Enumerable(results);

		for (var i = 0; i < sequence.length; i++) {
			if(condition(sequence[i]))
				results.push(sequence[i]);
		}

		return new Enumerable(results);
	};

	var Enumerable = function(sequence){
		var self = this;
		if(sequence === 'undefined' || sequence === null)
			sequence = [];

		self.sequence = sequence;		
		return self;
	};

	Enumerable.prototype.Where = function(condition){
		var self = this;
		return Where(self.sequence,condition);
	};

	Enumerable.prototype.Select = function(selector){
		var self = this;
		return Select(self.sequence,selector);
	};

	Enumerable.prototype.First = function(selector){
		var self = this;
		return First(self.sequence,selector);
	};

	Enumerable.prototype.Any = function(condition){
		var self = this;
		return Any(self.sequence,condition);
	};

	Enumerable.prototype.Count = function(condition){
		var self = this;
		return Count(self.sequence);
	};

	Enumerable.prototype.ToArray = function(){
		var self = this;
		return ToArray(self.sequence);
	};

	exports.FromArray = function(array){
		return new Enumerable(array);
	};

})(exports);