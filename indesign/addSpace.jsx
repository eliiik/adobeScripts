main();

function main() {
    var myDocument = app.activeDocument;
    var myPages = myDocument.pages;
    //var myTextFrame = app.selection[0].texts.item(0);
    //var lines = myTextFrame.parentStory.paragraphs.length;
    //removeText(myTextFrame, 1)
    addSpace();
}

function addSpace() {
    //var myLayer = documents.layers.item(layer1);
    var myDocument = app.activeDocument;
    var myLabel = myDocument.layers.item("Labels");
    //var myPageItems = myLayer.pageItems;
    var myLabelItems = myLabel.pageItems;
    //alert(myLabelItems.length);
    for (var i = 0; i < myLabelItems.length; i += 1) {
        if (myLabelItems[i]) {
            var label = myLabelItems[i].contents;
            //alert(label);
            var labelList = label.toString().split('');
            //alert(labelList);
            //alert(labelList.length)
            //alert(labelList);
            for (var j = 0; j < labelList.length; ++j) {
                if (labelList[j] == '（') {
                    labelList.splice(j, 0, '  ');
                    j+=2;
                }
                if (labelList[j] == '）') {
                    //alert(j);
                    labelList.splice(j+1, 0, '  ');
                    j+=2;
                    //label = labelList.splice(j, 0, ' ').join('');
                }
                if (labelList[j] == 'm') {
                    labelList.splice(j+1, 0, '  ');
                    j+=2;
                    break;
                }
            }
            //alert(labelList);
            var changedLabel = labelList.join('');
            myLabelItems[i].contents = changedLabel;

        }
    }
}