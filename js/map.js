var map = L.mapbox.map('map', 'kostajh.gbn6pcib');
function popUp(feature, layer) {
    layer.bindPopup(feature.properties.metadata);
}
$.getJSON("./data/dictionary.json", function(data) {
  $.each(data, function(index,item){
    var geoJson = new L.GeoJSON.AJAX("./data/" + data, {onEachFeature:popUp});
    geoJson.addTo(map);
  });
});
