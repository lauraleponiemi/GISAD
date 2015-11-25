/**
 * @author Sanna
 */
$(function() {

	//Tänne kaikki karttaan liittyvät js-scriptit
	//Openlayersistä käytössä nyt uusi ja vanha versio. uudessa versiossa ei voi lukea XML:ää suoraan (vain OSMXML:ää). Jos kirjastoja pystyy näin käyttämään rinnakkain ilman virheitä, mennään tällä.


//Luetaan XML aineistot
	var xml = new OpenLayers.Format.XML(),
	    wkt = new OpenLayers.Format.WKT(),
	    vectorLayer = new OpenLayers.Layer.Vector('features'),
	    doc,
	    markers,
	    i,
	    feature;
	    
	var type1_index = 13;
	
	OpenLayers.Request.GET({
		url : "js/helsinki_restaurants.xml", //dataa ei voi suoraan ladata visithelsinki sivuilta, se pitää ensin ladata meidän sivuille ja lukea sieltä, jotta saadaan aina ajantasainen tieto
		success : function(request) {
			doc = xml.read(request.responseText);
			items = doc.documentElement.getElementsByTagName('item'); //tässä on kaikki itemsit ja niiden sisällöt
			for ( i = 0; i < items.length; i++) {
				if (items[i].childNodes[type1_index].nodeName !== "matko:type1"){
					
				}
				else if(items[i].childNodes[type1_index].textContent !== "RAVINTOLA"){
					console.log(items[i]);  
				} 
				//feature = wkt.read(items[i].attributes.geometry.nodeValue);
				//vectorLayer.addFeatures([feature]);
				 //testataan, että data luettu
			}
		}
	});
/*
	var vector = new ol.layer.Vector({
		source : new ol.source.Vector({
			features : [feature]
		})
	});
*/
	var raster = new ol.layer.Tile({
		source : new ol.source.BingMaps({
			imagerySet : 'Aerial',
			key : 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3'
		})
	});

	//Kartan määritys
	var map = new ol.Map({
		target : 'map',
		layers : [raster]/*[new ol.layer.Tile({
		 source : new ol.source.MapQuest({
		 layer : 'sat'
		 })
		 })]*/,
		view : new ol.View({
			center : ol.proj.fromLonLat([24.94, 60.16]),
			zoom : 13
		})
	});

	//testifunktio: onko data luettu oikein
	/*
	 $.get("js/helsinki_restaurants.xml", function(data) {
	 console.log("print1");
	 var myArray = format.read(data);
	 console.log(myArray);
	 console.log("print2");
	 });
	 */
})