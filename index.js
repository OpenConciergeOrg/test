/*
 * @copyright 2015 commenthol
 * @license MIT
 */

/* global L */

;(function (window) {
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
  
      // add layer control object
    //   L.control.layers({}, {
    //     'Polygon': layerPolygon(map, rc),
    //     'Countries': layerCountries(map, rc),
    //     'Bounds': layerBounds(map, rc, img),
    //     'Info': layerGeo(map, rc),
    //     'Circles': layerCircles(map, rc)
    //   }).addTo(map)
  
      // the tile layer containing the image generated with gdal2tiles --leaflet ...
      L.tileLayer('https://openconciergeorg.github.io/test/img/TH008053/{z}/{x}/{y}.png', {
        noWrap: true,
        bounds: rc.getMaxBounds(),
        maxNativeZoom: rc.zoomLevel(),
        attribution: 'Map <a href="https://commons.wikimedia.org/wiki/' +
          'File:Karta_%C3%B6ver_Europa,_1672_-_Skoklosters_slott_-_95177.tif">' +
          'Karta över Europa, 1672 - Skoklosters</a> under ' +
          '<a href="https://creativecommons.org/publicdomain/zero/1.0/deed.en">CC0</a>'
      }).addTo(map)
    }
  
    
  
    init('map')
  }(window))