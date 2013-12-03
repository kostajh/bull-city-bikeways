var map = L.mapbox.map('map', 'kostajh.gbn6pcib');
function popUp(feature, layer) {
    layer.bindPopup(feature.properties.metadata);
}

var geoJson = new L.GeoJSON.AJAX(null, {onEachFeature:popUp});
$.getJSON("./data/dictionary.json", function(data) {
  $.each(data, function(index,item){
    geoJson.addUrl(data);
  });
});

geoJson.addTo(map)
