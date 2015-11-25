var geographic = new OpenLayers.Projection("EPSG:4326");
var mercator = new OpenLayers.Projection("EPSG:900913");

var world = new OpenLayers.Bounds(-180, -89, 180, 89).transform(
    geographic, mercator
);

var center = new OpenLayers.LonLat('.$centerMapLat.','.$centerMapLon.').transform(
    geographic, mercator
);

var options = {
    projection: mercator,
    units: "m",
    maxExtent: world
};

var map = new OpenLayers.Map("map-id", options);

var osm = new OpenLayers.Layer.OSM();
map.addLayer(osm);
map.addControl(new OpenLayers.Control.LayerSwitcher()); 
map.setCenter(center, 2);

var mapdata = new OpenLayers.Layer.Vector("Map Data", {
    strategies: [new OpenLayers.Strategy.Fixed()],
    protocol: new OpenLayers.Protocol.HTTP({
        url: "7day-M2.5.xml",
        format: new OpenLayers.Format.GeoRSS()
    })
});
map.addLayer(mapdata);