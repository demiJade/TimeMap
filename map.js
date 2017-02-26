var mapByDate = function(){
	var date = this.created_at_local.substr(0, 10);
	emit({
		date: date
	}, {
		trips: [this]
	});
}

var reduce = function(key, values){
	var array = [];
	values.forEach(function(x){
		array.push(x.trips[0]);
	});
	return {
		trips: array
	}
}

var mapByTime = function(){
	var created_at_local = this.created_at_local.split(" ");
	var time = created_at_local[1];
	emit({
		time: time
	}, {
		trips: [this]
	});
}

var mapByHour = function(){
	var created_at_local = this.created_at_local.split(" ");
	var time = created_at_local[1];
	var hour = time.substr(0,2);
	emit({
		hour: hour
	}, {
		trips: [this]
	});
}