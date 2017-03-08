
    var map;
    var centerPos = new google.maps.LatLng(-7.348406,-37.285585);
    var zoomLevel = 17;
    var locations = [];
    var locFilt = [];

    $(document).ready(function() {
	    $.ajax({
	        type: "GET",
	        url: "js/brejinho.txt",
	        dataType: "text",
	        success: function(data) {processData(data);}
	     });
	});

  var dat = new Date(2016-03-02);
  var dat2 = new Date(2016-03-02);

  console.log(dat.getTime() === dat2.getTime());


	function processData(allText) {
	    var record_num = 4;  // or however many elements there are in each row
	    var allTextLines = allText.split(/\r\n|\n/);
	    var entries = allTextLines[0].split(';');
	    //console.log(entries);
	    //var lines = [];

	    var headings = entries.splice(0,record_num);
	    while (allTextLines.length>0) {
	    	var e = allTextLines[0].split(';');
	        var tarr = [];
	        for (var j=0; j<record_num; j++) {
	            tarr.push(e.shift());
	        }
	        allTextLines.shift();
	        //console.log(tarr);
	        locations.push(tarr);
	    }
	}

    function initialize() {
      var mapOptions = {
        center: centerPos,
        scrollwheel: false,
        zoom: zoomLevel
      };
      map = new google.maps.Map( document.getElementById("map-canvas"), mapOptions );

      
      var cpfs = document.getElementById("cpf");
      var aux = [];

      for (var i = 1; i < locations.length; i++) {
        aux.push(locations[i][0]);
      }

      function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
      }


      var auxu = aux.filter(onlyUnique);

      for (var i = 0; i < auxu.length; i++) {
        
        var opt0 = document.createElement("option");
        opt0.value = auxu[i];
        opt0.text = "user" + i;
        cpfs.add(opt0, cpfs.options[i]);
      }

      document.getElementById("btnInfo").onclick = function() {
        locFilt = [];
        locFilt.push(locations[0]);
         for (var i = 1; i < locations.length; i++) {
           if (locations[i][0] === cpfs.options[cpfs.selectedIndex].value) {
             locFilt.push(locations[i]);
           }
         }
		  map = new google.maps.Map( document.getElementById("map-canvas"), mapOptions );
			loadPoints(locFilt);
          
      };


    $(function() {
      $( "#from" ).datepicker({
          dateFormat: 'yy-mm-dd',
          changeMonth: true,
          changeYear: true});
    });

    $(function() {
      $( "#to" ).datepicker({
          dateFormat: 'yy-mm-dd',
          changeMonth: true,
          changeYear: true});
    });

      
      
      var image = 'img/aedes.png'; //Seto o icone para substituir o icone defaut do google maps

      loadPoints(locations);


      function loadPoints(loc) {
        for (i = 1; i < loc.length; i++) {  
          marker = new google.maps.Marker({
          position: new google.maps.LatLng(loc[i][2], loc[i][3]),
          title: loc[i][0],
          map: map,
          icon: image //Adciono o icone para ser incrementado no loop
        });
      }
      }
    }


    
    google.maps.event.addDomListener(window, 'load', initialize);
