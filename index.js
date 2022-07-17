/*
 * @copyright 2015 commenthol
 * @license MIT
 */
const apiKey = "AAPKaa6c3fb9ed42485a91895342bfc89f57sg1uva8dmkqo3nLKLAUfHNmALWOPx2TNqgWQQEWk-Z71UrpFWzHWXnuXXfkKlIcl";
const fl = "https://services1.arcgis.com/qvPIahekAMWThrhc/arcgis/rest/services/%E5%9B%B3%E5%B9%85/FeatureServer/0";

// URLを取得
const url = new URL(window.location.href);

// URLSearchParamsオブジェクトを取得
const params = url.searchParams;
const imageid = params.get('imageid');

const sidepanel = document.getElementById('sidepanel');

(function (window) {
    function init (mapid) {
      var minZoom = 0
      var maxZoom = 5
      var img = [
        6360, // original width of image `karta.jpg`
        8362  // original height of image
      ]
  
      // create the map
      var map = L.map(mapid, {
        crs: L.CRS.Simple,
        minZoom: minZoom,
        maxZoom: maxZoom
      })
  
      // assign map and image dimensions
      var rc = new L.RasterCoords(map, img)
  
      // set the view on a marker ...
      map.setView(rc.unproject([1589, 1447]), 4)
  
      // the tile layer containing the image generated with gdal2tiles --leaflet ...
      // TH008053
      L.tileLayer('https://openconciergeorg.github.io/test/img/' + imageid + '/{z}/{x}/{y}.png', {
        noWrap: true,
        bounds: rc.getMaxBounds(),
        maxNativeZoom: rc.zoomLevel(),
        attribution: 'Map <a href="https://commons.wikimedia.org/wiki/' +
          'File:Karta_%C3%B6ver_Europa,_1672_-_Skoklosters_slott_-_95177.tif">' +
          'Karta över Europa, 1672 - Skoklosters</a> under ' +
          '<a href="https://creativecommons.org/publicdomain/zero/1.0/deed.en">CC0</a>'
      }).addTo(map)

      const featureLayer = L.esri.featureLayer({
        url: fl
      })
      featureLayer.query()
        .where("ID = '" + imageid + "'")
        .returnGeometry(false)
        .run(function(error, featureCollection){
          const feature = featureCollection.features[0];
          const properties = feature.properties;
          console.log(properties);

          const regionname = document.createElement('div');
          regionname.textContent = "region name: " + properties.area2;
          sidepanel.appendChild(regionname);

          const code = document.createElement('div');
          code.textContent = "code: " + properties.area3;
          sidepanel.appendChild(code);

          const name = document.createElement('div');
          name.textContent = "name: " + properties.area_name;
          sidepanel.appendChild(name);

          const scale = document.createElement('div');
          scale.textContent = "scale: " + properties.scale;
          sidepanel.appendChild(scale);

          const size = document.createElement('div');
          size.textContent = "size (H*W): " + properties.height + "cm x " + properties.width + "cm";
          sidepanel.appendChild(size);

          const color = document.createElement('div');
          color.textContent = "color: " + properties.color;
          sidepanel.appendChild(color);


        });
    }
  
    
  
    init('map')
  }(window))