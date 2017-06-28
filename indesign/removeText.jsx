main();

function main() {
    var myDocument = app.activeDocument;
    var myPages = myDocument.pages;

    with (myDocument.documentPreferences) {
        var myPageHeight = pageHeight;
        var myPageWidth = pageWidth;
    }



    var myTextFrame = app.selection[0].texts.item(0);
    var lines = myTextFrame.parentStory.paragraphs.length;
    //removeText(myTextFrame, 1)
    for (var i = 1; i < lines; ++i) {
        removeText(myTextFrame, i);
    }
}

function findText() {

}

function removeText(myTextFrame, line) {
    var myStartCharacter = myTextFrame.parentStory.paragraphs.item(line).characters.item(0);
    var myEndCharacter = myTextFrame.parentStory.paragraphs.item(line).characters.item(-2);
    var content = myTextFrame.texts.itemByRange(myStartCharacter, myEndCharacter).contents;
    //alert(content);
    var contentList = content.toString().split('');
    var end = 1;
    for (var i = 0; i < contentList.length; ++i) {
        if (contentList[i] != '）')++end;

        else break;
    }
    var pageBegin = 0;
    for (var j = end; j < contentList.length; ++j) {
        if (contentList[j] == '\t'){
            pageBegin = ++j;
            break;
        }
    }
    var page = contentList.slice(pageBegin, contentList.length).join('');
    var wordChanged = contentList.slice(0, end).join('');
    var wordChanged = wordChanged + '\t' + page;
    
    myTextFrame.texts.itemByRange(myStartCharacter, myEndCharacter).contents = wordChanged;

    //alert(myTextFrame.texts.itemByRange(myStartCharacter, myEndCharacter).contents);
    alert(wordChanged);
    // alert(app.selection[0].texts.item(line));  
}

function changeUnits(documents, units) {
    with (documents.viewPreferences) {
        horizontalMeasurementUnits = units;
        verticalMeasurementUnits = units;
    }
}