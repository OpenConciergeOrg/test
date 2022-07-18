/*
 * @copyright 2015 commenthol
 * @license MIT
 */
// const apiKey = "AAPKaa6c3fb9ed42485a91895342bfc89f57sg1uva8dmkqo3nLKLAUfHNmALWOPx2TNqgWQQEWk-Z71UrpFWzHWXnuXXfkKlIcl";
const fl = "https://services1.arcgis.com/qvPIahekAMWThrhc/arcgis/rest/services/%E5%9B%B3%E5%B9%85/FeatureServer/0";

// URLを取得
const url = new URL(window.location.href);

// URLSearchParamsオブジェクトを取得
const params = url.searchParams;
const imageid = params.get('imageid');

const regionname_title = document.getElementById('regionname_title');
const code_title = document.getElementById('code_title');
const name_title = document.getElementById('name_title');
const scale_title = document.getElementById('scale_title');
const color_title = document.getElementById('color_title');

const sidepanel = document.getElementById('sidepanel');
const buttonControlSidePanel = document.getElementById('buttonControlSidePanel');
const metadata = document.getElementById('metadata');

(function (window) {
    function init (mapid) {
      var minZoom = 0
      var maxZoom = 7
      var img = [
        6360, // original width of image `karta.jpg`
        8362  // original height of image
      ]
  
      // create the map
      var map = L.map(mapid, {
        crs: L.CRS.Simple,
        minZoom: minZoom,
        maxZoom: maxZoom,
        zoomControl: false
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
        attribution: 'Tohoku University'
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

          function addAtt (field, title) {
            const div = document.createElement('div');
            const value = properties[field];
            if (value == "") {
              div.textContent = "-";
            } else {
              div.textContent = value;
            };
            title.parentNode.insertBefore(div, title.nextSibling); 
          };

          addAtt("area2", regionname_title);
          addAtt("area3", code_title);
          addAtt("area_name", name_title);
          addAtt("scale", scale_title);
          addAtt("color", color_title);


        });
    }
  
    
  
    init('map')
  }(window))

let IsSidePanelOpen = true;

buttonControlSidePanel.onclick = function(event){
  if (IsSidePanelOpen == true) {
    sidepanel.style.width = '100px';
    metadata.style.display = 'none';
    buttonControlSidePanel.textContent = '>>';
    IsSidePanelOpen = false;
  } else {
    sidepanel.style.width = '300px';
    metadata.style.display = 'block';
    buttonControlSidePanel.textContent = '<<';
    IsSidePanelOpen = true;
  }
  
};