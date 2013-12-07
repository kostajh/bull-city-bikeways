// Load default map.
var map = L.mapbox.map('map', 'kostajh.gbn6pcib');

// Set up importer and parser.
var ds = new Miso.Dataset({
  importer : Miso.Dataset.Importers.GoogleSpreadsheet,
  parser : Miso.Dataset.Parsers.GoogleSpreadsheet,
  key : "0AlZGBQh5vhE1dGFObVAtT0VKRjUxSUJjNnRaQlFIemc",
  worksheet : "1",
  extract: function(data) {
    return data.results;
  }
});

// Fetch data and add to map.
ds.fetch({
  // Successfully fetched data.
  success : function() {
    // We have unparsed JSON.
    results = this.toJSON();
      // Loop through each row in the Google Spreadsheet.
      for (i = 0; i < results.length; i++) {
        // Attempt to parse the JSON.
        try {
          var route = JSON.parse(results[i]['Enter the GeoJSON for your route']);
          // If Email isn't set, it's a deleted row.
          if (route['And your e-mail address?']=== null) {
            return;
          }
          // Loop through Features; someone may have submitted a route with
          // multiple Features.
          for (k = 0; k < route.features.length; k++) {
            var properties = setProperties(results[i]);
            route.features[k].properties = properties;
          }
          // Add geoJson to map.
          L.geoJson(route, {onEachFeature:popUp, style:styleLayer}).addTo(map);
        }
        catch (e) {
          // Errors. In most cases, these are submissions that were deleted. But
          // it's also possible that the GeoJSON was not decoded.
          console.log('Error parsing data', e);
        }
      }
    },
  error : function() {
    console.log("Are you sure you are connected to the internet?");
  }
});

// Set a popup for the description.
function popUp(feature, layer) {
    layer.bindPopup(feature.properties.metadata);
}

// Style the layer.
function styleLayer(feature) {
    return {
      color: feature.properties.color,
      opacity: feature.properties.opacity
    };
}

// Set the description, color and other values.
function setProperties(row) {
  console.log(row);
  properties = {
    "metadata": getMetadata(row),
    "color": getColor(row["What's the purpose of riding this route?"]),
    "opacity": "0.5"
  };
  return properties;
}

// Returns a string for displaying in the popup.
function getMetadata(row) {
  firstname = row["What's your name?"].split(' ')[0];
  date = row.Timestamp.split(' ')[0];
  hash = md5(row['And your e-mail address?']);
  gravatar = "http://www.gravatar.com/avatar/" + hash;
  string = '<img src="' + gravatar + '" id="gravatar"><p>Submitted by <strong>' + firstname + '</strong> on <strong>' + date + '</strong></p>' + '<strong>' + firstname + '</strong> rides this route for <strong>' + row["What's the purpose of riding this route?"] + '</strong> and the trip takes about <strong>' + row["How many minutes is this route, approximately?"] + '</strong>.</p><p><strong>Comments:</strong> ' + row['What are your comments on this route?']+ '</strong>';
  if (row["What time do you usually start out on this route?"] !== null) {
    string += '<p><strong>Typical starting time:</strong> ' + row["What time do you usually start out on this route?"] + '</p>';
  }
return string;
}

// Set a color depending on the type of cycling.
function getColor(purpose) {
  switch (purpose) {
    case 'Work':
      return 'red';
    case 'Errands':
      return 'blue';
    case 'School':
      return 'yellow';
    case 'Fun':
      return 'green';
    default:
      return 'black';
  }
}

