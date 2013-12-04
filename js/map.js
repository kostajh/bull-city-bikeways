var map = L.mapbox.map('map', 'kostajh.gbn6pcib');

function popUp(feature, layer) {
    layer.bindPopup(feature.properties.metadata);
}

function styleLayer(feature) {
    return {
      color: feature.properties.color,
      opacity: feature.properties.opacity
    };
}

var geoJson = new L.GeoJSON.AJAX(dictionary, {onEachFeature:popUp, style:styleLayer});
geoJson.addTo(map)
