var map = L.mapbox.map('map', 'kostajh.gbn6pcib');
  var geoJson = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        title: '<h2>Ride to work</h2>',
        description: '<p><img src="http://www.gravatar.com/avatar/a66db4554497e4b94a51aca8b598cf56" /> Submitted by <strong>Kosta</strong>. This route is <strong>7.5</strong> miles and Kosta rated this a <strong>3</strong> for safety.</p>',
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            -78.91436576843262,
            35.987208808917345
          ],
          [
            -78.91196250915527,
            35.98713935914
          ],
          [
            -78.91196250915527,
            35.98387515064802
          ],
          [
            -78.91053557395935,
            35.983779653153704
          ],
          [
            -78.9098596572876,
            35.98333689053364
          ],
          [
            -78.90893697738647,
            35.983788334748866
          ],
          [
            -78.90842199325562,
            35.98271180966412
          ],
          [
            -78.90837907791136,
            35.981704724514906
          ],
          [
            -78.90876531600952,
            35.97848370210557
          ],
          [
            -78.90871167182922,
            35.97558380128718
          ],
          [
            -78.90865802764893,
            35.97466345120999
          ],
          [
            -78.90828251838684,
            35.97373440770142
          ],
          [
            -78.90731692314148,
            35.97251882024272
          ],
          [
            -78.90653371810913,
            35.97144214143283
          ],
          [
            -78.90637278556824,
            35.970808283330825
          ],
          [
            -78.90635132789612,
            35.9693147893243
          ],
          [
            -78.90747785568237,
            35.96618878018512
          ],
          [
            -78.9076280593872,
            35.965155433279946
          ],
          [
            -78.90726327896118,
            35.96420891038279
          ],
          [
            -78.9064371585846,
            35.96336658230036
          ],
          [
            -78.90203833580017,
            35.95881611852698
          ],
          [
            -78.90097618103027,
            35.9570444930208
          ],
          [
            -78.90025734901428,
            35.9550122854184
          ],
          [
            -78.90028953552246,
            35.953379533741
          ],
          [
            -78.90108346939087,
            35.95179885901038
          ],
          [
            -78.90478491783142,
            35.94346071067776
          ],
          [
            -78.90751004219055,
            35.936876426075166
          ],
          [
            -78.9087438583374,
            35.93533016889624
          ],
          [
            -78.90855073928833,
            35.935156430244376
          ],
          [
            -78.90875458717346,
            35.933453771248395
          ],
          [
            -78.91093254089355,
            35.92831951115165
          ],
          [
            -78.9109969139099,
            35.92520925574134
          ],
          [
            -78.91146898269653,
            35.9244620811897
          ],
          [
            -78.91273498535156,
            35.923428188481324
          ],
          [
            -78.91345381736754,
            35.922229203540276
          ],
          [
            -78.91403317451477,
            35.920482823389584
          ],
          [
            -78.91592144966125,
            35.917215859471
          ],
          [
            -78.91734838485718,
            35.915816932065646
          ],
          [
            -78.91750931739807,
            35.914861128929424
          ],
          [
            -78.91623258590698,
            35.90723166812853
          ],
          [
            -78.9172089099884,
            35.90553709806301
          ],
          [
            -78.90901207923889,
            35.90303428205359
          ],
          [
            -78.90729546546936,
            35.902721424486984
          ],
          [
            -78.90091180801392,
            35.90268666245877
          ],
          [
            -78.89766097068785,
            35.90266928143896
          ]
        ]
      }
    }
  ]
  };
  map.markerLayer.setGeoJSON(geoJson);
map.markerLayer.on('mouseover', function(e) {
    e.layer.openPopup();
});
  map.markerLayer.on('mouseout', function(e) {
    e.layer.closePopup();
});
