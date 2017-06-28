#target photoshop

app.bringToFront();



main();

function main()
{
    var doc = app.activeDocument; // remember the document, the selected layer, the visibility setting of the selected layer
    var currentLayer = doc.activeLayer; // remember the selected layer
    var currentVisible = currentLayer.visible;// remember the visibility setting of the selected layer
    var mySelectedLayers = getSelectedLayers(); // remember the selected layers
	var layers = doc.artLayers;

	currentLayer.duplicate(currentLayer, ElementPlacement.PLACEAFTER);
	alert(currentLayer.kind);

}

function deleteAllEmptyLayers(o){
	try{
		for(var i = o.artLayers.length-1; 0 <= i; i--){ // top level layers
			var layer = o.artLayers[i];
			if(    layer.allLocked
				|| layer.pixelsLocked
				|| layer.positionLocked
				|| layer.transparentPixelsLocked
				||(0 != layer.linkedLayers.length)){ // linked
				continue; // skip locked or linked
			}

			if((LayerKind.TEXT == layer.kind)){ // TEXT Layer
				if("" == layer.textItem.contents)	layer.remove();
			}else{ // Other Layer
				if(    (0 == layer.bounds[2])	// width = 0
					&& (0 == layer.bounds[3])){	// height = 0
					layer.remove();
				}
			}
		}
		for(var i = o.layerSets.length-1; 0 <= i; i--){ // LayerSet
			var layerSet = o.layerSets[i];
			if((layerSet.allLocked)||(0 != layerSet.linkedLayers.length)){
				continue; // skip locked or linked
			}
			deleteAllEmptyLayers(layerSet); // recursive call
		}
	}catch(e){
		; // do nothing
	}
}

// function duplicateAndMerge(adjustLayer, mergeLayer) {
// 	var 
// }

function getSelectedLayers() {
	var selectedLayers = [];
	try {
		var backGroundCounter = activeDocument.artLayers[activeDocument.artLayers.length-1].isBackgroundLayer ? 0 : 1;
		var ref = new ActionReference();
		var keyTargetLayers = app.stringIDToTypeID( 'targetLayers' );
		ref.putProperty( app.charIDToTypeID( 'Prpr' ), keyTargetLayers );
		ref.putEnumerated( app.charIDToTypeID( 'Dcmn' ), app.charIDToTypeID( 'Ordn' ), app.charIDToTypeID( 'Trgt' ) );
		var desc = executeActionGet( ref );
		if ( desc.hasKey( keyTargetLayers ) ) {
			var layersList = desc.getList( keyTargetLayers );
			for ( var i = 0; i < layersList.count; i++) {
				var listRef = layersList.getReference( i );
				selectedLayers.push( listRef.getIndex() + backGroundCounter );
			}
			//hasLayerMask = true;
		}
	}catch(e) {
		; // do nothing
	}
	return selectedLayers;
}