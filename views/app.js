	  var app = new Vue({
		  el: '#app',
		  data: {
		    hour: 0
		  },
		  watch: {
		  	hour: function(newHour){
		  		drawMap();
		  	}
		  }
		})
var hourData = {};
// $.getJSON( "tripsByDate.json", function( data ) {
// 		  var chartdata = data;
// 		  console.log(data);
// 		  // $.each( data, function( key, val ) {
		    
// 		  // });
// 		});
// 		$.getJSON( "tripsByTime.json", function( data ) {
// 		  var chartdata = data;
// 		  console.log(data);
// 		  // $.each( data, function( key, val ) {
		    
// 		  // });
// 		});
		$.getJSON( "tripsByHour.json", function( data ) {
		  var chartdata = data;
		  console.log(data);
		  data.forEach(function(x){
		  	hourData[x._id.hour] = x["value"]["trips"];
		  });
		  // $.each( data, function( key, val ) {
		    
		  // });
		});
		google.charts.load('current', { 'packages': ['map'] });
	    google.charts.setOnLoadCallback(drawMap);

	    function drawMap() {
	    	var data = new google.visualization.DataTable();
	    	data.addColumn('number', 'Lat');
	    	data.addColumn('number', 'Long');
	    	data.addColumn('string', 'Date');
	    	var hour = app.hour;
	    	if (app.hour < 10){
	    		hour = '0' + app.hour;
	    	}
	    	for (var i = 0; i < 100; i++){

	    		var x = hourData[hour][i];
	    		data.addRow([x.pick_up_latitude, x.pick_up_longitude, x.created_at_local]);
	    	}
	    	// hourData[app.hour].forEach(function(x){
	    	// 	data.addRow([x.pick_up_latitude, x.pick_up_longitude, x.created_at_local]);
	    	// })

	   //    var data = google.visualization.arrayToDataTable([
		  //   ['Lat', 'Long', 'Name'],
		  //   [37.4232, -122.0853, 'Work'],
		  //   [37.4289, -122.1697, 'University'],
		  //   [37.6153, -122.3900, 'Airport'],
		  //   [37.4422, -122.1731, 'Shopping']
		  // ]);

	    var options = {
	      showTooltip: true,
	      showInfoWindow: true
	    };

	    var map = new google.visualization.Map(document.getElementById('chart_div'));

	    map.draw(data, options);
	  };

