main()

function main() {
    var myDocument = app.activeDocument;
    var myPages = myDocument.pages;
    changeUnits(myDocument, MeasurementUnits.millimeters);
    //var myMargin = [0, 0, 0, 0]
    var myMargin = myGetBounds(myDocument, myPages.item(0));
    var marginBottom = myMargin[2], marginLeft = myMargin[1], marginRight = myMargin[3], marginTop = myMargin[0];

    with (myDocument.documentPreferences) {
        var myPageHeight = pageHeight;
        var myPageWidth = pageWidth;
    }

    var myLayer = myDocument.activeLayer;

    // alert(myPages.item(2));
    // alert(myPages.item(2).rectangles.item(0));
    // alert(myPages.item(2).rectangles.item(1) == null);
    // alert(myPages.item(2).rectangles.length);
    // alert(myPages.item(2).textFrames.length);
    // alert(myPages.item(2).textFrames.item(0));
    // alert(myPages.item(2).textFrames.item(1).contents);
    // alert(app.activeWindow.activePage);

    for (var page = 14; page < 131; page++)
    {
        if(page == 62){continue;}

        var currentPage = myPages.item(page);
        var pics = currentPage.rectangles;
        var labels = currentPage.textFrames;
        var currentPagePicCount = currentPage.rectangles.length;
        arrange(myDocument, pics, labels, currentPagePicCount, page);
        }



}


function arrange(myDocument, pics, labels, length, page) {
    switch (length) {
        case 1:
            resizeSingle(myDocument,pics, labels, page);
            break;
        case 2:
            resizeDouble(myDocument,pics, labels, page);
            break;
        case 3:
            break;

    }
}

function pageIter(page) {

}
function resizeSingle(myDocument, pics, labels, currentPage)
{    with (myDocument.documentPreferences) {
        var myPageHeight = pageHeight;
        var myPageWidth = pageWidth;
    }
    //超出底部边框的部分    
    var BT = 2.5;
    var myPages = myDocument.pages;
    var myMargin = myGetBounds(myDocument, myPages.item(currentPage));
    var marginBottom = myPageHeight - myMargin[2] - BT, marginLeft = myMargin[1], marginRight = myPageWidth - myMargin[3], marginTop = myMargin[0];

    var R = myMargin[3] - myMargin[1];
    var L = myMargin[2] - myMargin[0] + BT;
    var T = 0.8, W = 8.4, M = 3.0;
    //var C = 2 * T + 2 * W + M;
    //从毫米转换成点
    var p = 2.83446;
    var pic1 = pics[0];
    var label1 = labels[0];
    var x1 = pic1.geometricBounds[3] - pic1.geometricBounds[1];
    var y1 = pic1.geometricBounds[2] - pic1.geometricBounds[0];

    var newY1 = L-T-W;
    var a = y1 / newY1;
    var newX1 = x1 / a;
    if (currentPage % 2 == 0 && currentPage != 0) {
        var leftBound = (((myPageWidth - marginLeft - marginRight) / 2) + marginLeft - newX1 / 2);
        scaleObj(pic1, AnchorPoint.bottomLeftAnchor, 1 / a);
        transformObj(pic1, p * (leftBound + myPageWidth - pic1.geometricBounds[1]), p * (marginTop - pic1.geometricBounds[0]));
        label1.geometricBounds = [label1.geometricBounds[0], marginLeft, label1.geometricBounds[2], myPageWidth - marginRight];
        transformObj(label1, p * (myPageWidth + marginLeft - label1.geometricBounds[1]), p * (marginTop + newY1 + T - label1.geometricBounds[0]));

        if (newX1 > R) {
            scaleObj(pic1, AnchorPoint.bottomLeftAnchor, R / newX1);
            transformObj(pic1, p * (marginLeft + myPageWidth - pic1.geometricBounds[1]), 0);
        }

    }
    else{
        var leftBound = (((myPageWidth - marginLeft - marginRight) / 2) + marginLeft - newX1 / 2);
        scaleObj(pic1, AnchorPoint.bottomLeftAnchor, 1 / a);
        transformObj(pic1, p * (leftBound - pic1.geometricBounds[1]), p * (marginTop - pic1.geometricBounds[0]));
        label1.geometricBounds = [label1.geometricBounds[0], marginLeft, label1.geometricBounds[2], myPageWidth - marginRight];
        transformObj(label1, p * (marginLeft - label1.geometricBounds[1]), p * (marginTop + newY1 + T - label1.geometricBounds[0]));
        if (newX1 > R) {
            scaleObj(pic1, AnchorPoint.bottomLeftAnchor, R / newX1);
            transformObj(pic1, p * (marginLeft - pic1.geometricBounds[1]), 0);
        }

    }
    
    // if (x1 > R - 0.1) { 
    //     scaleObj(pic1, AnchorPoint.centerAnchor, R / newX2);
    //     transformObj(label2, 0, p * pic2D);
    
    // }
    // else {
    //     scaleObj(pic1, AnchorPoint.centerAnchor, R / newX2);        
    // }

    // if ((currentPage / 2) % 2 == 0 && currentPage != 0) {

    //  }

    // else{}

}

function resizeDouble(myDocument, pics, labels, currentPage) {

    //var myDocument = app.activeDocument;
    with (myDocument.documentPreferences) {
        var myPageHeight = pageHeight;
        var myPageWidth = pageWidth;
    }
    //超出底部边框的部分    
    var BT = 2.5;
    var myPages = myDocument.pages;
    var myMargin = myGetBounds(myDocument, myPages.item(currentPage));
    var marginBottom = myPageHeight - myMargin[2] - BT, marginLeft = myMargin[1], marginRight = myPageWidth - myMargin[3], marginTop = myMargin[0];

    var R = myMargin[3] - myMargin[1];
    var L = myMargin[2] - myMargin[0] + BT;
    var T = 0.8, W = 8.4, M = 3.0;
    var C = 2 * T + 2 * W + M;
    //从毫米转换成点
    var p = 2.83446;
    var pic1 = pics[0];
    var pic2 = pics[1];
    var label1 = labels[0];
    var label2 = labels[1];

    var x1 = pic1.geometricBounds[3] - pic1.geometricBounds[1];
    var y1 = pic1.geometricBounds[2] - pic1.geometricBounds[0];
    var x2 = pic2.geometricBounds[3] - pic2.geometricBounds[1];
    var y2 = pic2.geometricBounds[2] - pic2.geometricBounds[0];
    var a = (y1 * x2 + y2 * x1) / ((L - C) * x2);
    var b = (y1 * x2 + y2 * x1) / ((L - C) * x1);
    var newX1 = x1 / a;
    var newY1 = y1 / a;
    var newX2 = x2 / b;
    var newY2 = y2 / b;

    if (currentPage % 2 == 0 && currentPage != 0) {
        var leftBound = (((myPageWidth - marginLeft - marginRight) / 2) + marginLeft - newX1 / 2);
        scaleObj(pic1, AnchorPoint.bottomLeftAnchor, 1 / a);
        transformObj(pic1, p * (leftBound + myPageWidth - pic1.geometricBounds[1]), p * (marginTop - pic1.geometricBounds[0]));
        label1.geometricBounds = [label1.geometricBounds[0], marginLeft, label1.geometricBounds[2], myPageWidth - marginRight];
        transformObj(label1, p * (myPageWidth + marginLeft - label1.geometricBounds[1]), p * (marginTop + newY1 + T - label1.geometricBounds[0]));

        scaleObj(pic2, AnchorPoint.bottomLeftAnchor, 1 / b);
        transformObj(pic2, p * (myPageWidth + leftBound - pic2.geometricBounds[1]), p * (marginTop + newY1 + T + W + M - pic2.geometricBounds[0]));
        label2.geometricBounds = [label2.geometricBounds[0], marginLeft, label2.geometricBounds[2], myPageWidth - marginRight];
        transformObj(label2, p * (myPageWidth + marginLeft - label2.geometricBounds[1]), p * (marginTop + newY1 + T + W + M + newY2 + T - label2.geometricBounds[0]));
        if (newX1 > R) {
            scaleObj(pic1, AnchorPoint.bottomLeftAnchor, R / newX1);
            transformObj(pic1, p * (marginLeft + myPageWidth - pic1.geometricBounds[1]), 0);

            var pic2T = pic2.geometricBounds[0];
            scaleObj(pic2, AnchorPoint.bottomLeftAnchor, R / newX2);
            var pic2D = pic2T - pic2.geometricBounds[0];
            transformObj(pic2, p * (marginLeft + myPageWidth - pic2.geometricBounds[1]), p * pic2D);
            transformObj(label2, 0, p * pic2D);
        }
    }
    else {

        var leftBound = (((myPageWidth - marginLeft - marginRight) / 2) + marginLeft - newX1 / 2);
        scaleObj(pic1, AnchorPoint.bottomLeftAnchor, 1 / a);
        transformObj(pic1, p * (leftBound - pic1.geometricBounds[1]), p * (marginTop - pic1.geometricBounds[0]));
        label1.geometricBounds = [label1.geometricBounds[0], marginLeft, label1.geometricBounds[2], myPageWidth - marginRight];
        transformObj(label1, p * (marginLeft - label1.geometricBounds[1]), p * (marginTop + newY1 + T - label1.geometricBounds[0]));

        scaleObj(pic2, AnchorPoint.bottomLeftAnchor, 1 / b);
        transformObj(pic2, p * (leftBound - pic2.geometricBounds[1]), p * (marginTop + newY1 + T + W + M - pic2.geometricBounds[0]));
        label2.geometricBounds = [label2.geometricBounds[0], marginLeft, label2.geometricBounds[2], myPageWidth - marginRight];
        transformObj(label2, p * (marginLeft - label2.geometricBounds[1]), p * (marginTop + newY1 + T + W + M + newY2 + T - label2.geometricBounds[0]));

        if (newX1 > R) {
            scaleObj(pic1, AnchorPoint.bottomLeftAnchor, R / newX1);
            transformObj(pic1, p * (marginLeft - pic1.geometricBounds[1]), 0);

            var pic2T = pic2.geometricBounds[0];
            scaleObj(pic2, AnchorPoint.bottomLeftAnchor, R / newX2);
            var pic2D = pic2T - pic2.geometricBounds[0];
            transformObj(pic2, p * (marginLeft - pic2.geometricBounds[1]), p * (pic2D));
            transformObj(label2, 0, p * pic2D);

        }
    }
}

/*
function layerIter(documents, layer1, label) {

    var myLayer = documents.layers.item(layer1);
    var myLabel = documents.layers.item(label);
    var myPageItems = myLayer.pageItems;
    var myLabelItems = myLabel.pageItems;

    for (var i = 0; i < myPageItems.length; i += 2) {
        var myDocument = app.activeDocument;
        with (myDocument.documentPreferences) {
            var myPageHeight = pageHeight;
            var myPageWidth = pageWidth;
        }
        //超出底部边框的部分    
        var BT = 2.5;
        var myPages = myDocument.pages;
        var myMargin = myGetBounds(myDocument, myPages.item(i / 2));
        var marginBottom = myPageHeight - myMargin[2] - BT, marginLeft = myMargin[1], marginRight = myPageWidth - myMargin[3], marginTop = myMargin[0];

        var R = myMargin[3] - myMargin[1];
        var L = myMargin[2] - myMargin[0] + BT;
        var T = 0.8, W = 8.4, M = 3.0;
        var C = 2 * T + 2 * W + M;
        //从毫米转换成点
        var p = 2.83446;
        var pic1 = myPageItems[i];
        var pic2 = myPageItems[i + 1];
        var label1 = myLabelItems[i];
        var label2 = myLabelItems[i + 1];

        var x1 = pic1.geometricBounds[3] - pic1.geometricBounds[1];
        var y1 = pic1.geometricBounds[2] - pic1.geometricBounds[0];
        var x2 = pic2.geometricBounds[3] - pic2.geometricBounds[1];
        var y2 = pic2.geometricBounds[2] - pic2.geometricBounds[0];
        var a = (y1 * x2 + y2 * x1) / ((L - C) * x2);
        var b = (y1 * x2 + y2 * x1) / ((L - C) * x1);
        var newX1 = x1 / a;
        var newY1 = y1 / a;
        var newX2 = x2 / b;
        var newY2 = y2 / b;

        if ((i / 2) % 2 == 0 && i != 0) {
            var leftBound = (((myPageWidth - marginLeft - marginRight) / 2) + marginLeft - newX1 / 2);
            scaleObj(pic1, AnchorPoint.bottomLeftAnchor, 1 / a);
            transformObj(pic1, p * (leftBound + myPageWidth - pic1.geometricBounds[1]), p * (marginTop - pic1.geometricBounds[0]));
            label1.geometricBounds = [label1.geometricBounds[0], marginLeft, label1.geometricBounds[2], myPageWidth - marginRight];
            transformObj(label1, p * (myPageWidth + marginLeft - label1.geometricBounds[1]), p * (marginTop + newY1 + T - label1.geometricBounds[0]));

            scaleObj(pic2, AnchorPoint.bottomLeftAnchor, 1 / b);
            transformObj(pic2, p * (myPageWidth + leftBound - pic2.geometricBounds[1]), p * (marginTop + newY1 + T + W + M - pic2.geometricBounds[0]));
            label2.geometricBounds = [label2.geometricBounds[0], marginLeft, label2.geometricBounds[2], myPageWidth - marginRight];
            transformObj(label2, p * (myPageWidth + marginLeft - label2.geometricBounds[1]), p * (marginTop + newY1 + T + W + M + newY2 + T - label2.geometricBounds[0]));
            if (newX1 > R) {
                scaleObj(pic1, AnchorPoint.bottomLeftAnchor, R / newX1);
                transformObj(pic1, p * (marginLeft + myPageWidth - pic1.geometricBounds[1]), 0);

                var pic2T = pic2.geometricBounds[0];
                scaleObj(pic2, AnchorPoint.bottomLeftAnchor, R / newX2);
                var pic2D = pic2T - pic2.geometricBounds[0];
                transformObj(pic2, p * (marginLeft + myPageWidth - pic2.geometricBounds[1]), p * pic2D);
                transformObj(label2, 0, p * pic2D);
            }
        }
        else {

            var leftBound = (((myPageWidth - marginLeft - marginRight) / 2) + marginLeft - newX1 / 2);
            scaleObj(pic1, AnchorPoint.bottomLeftAnchor, 1 / a);
            transformObj(pic1, p * (leftBound - pic1.geometricBounds[1]), p * (marginTop - pic1.geometricBounds[0]));
            label1.geometricBounds = [label1.geometricBounds[0], marginLeft, label1.geometricBounds[2], myPageWidth - marginRight];
            transformObj(label1, p * (marginLeft - label1.geometricBounds[1]), p * (marginTop + newY1 + T - label1.geometricBounds[0]));

            scaleObj(pic2, AnchorPoint.bottomLeftAnchor, 1 / b);
            transformObj(pic2, p * (leftBound - pic2.geometricBounds[1]), p * (marginTop + newY1 + T + W + M - pic2.geometricBounds[0]));
            label2.geometricBounds = [label2.geometricBounds[0], marginLeft, label2.geometricBounds[2], myPageWidth - marginRight];
            transformObj(label2, p * (marginLeft - label2.geometricBounds[1]), p * (marginTop + newY1 + T + W + M + newY2 + T - label2.geometricBounds[0]));

            if (newX1 > R) {
                scaleObj(pic1, AnchorPoint.bottomLeftAnchor, R / newX1);
                transformObj(pic1, p * (marginLeft - pic1.geometricBounds[1]), 0);

                var pic2T = pic2.geometricBounds[0];
                scaleObj(pic2, AnchorPoint.bottomLeftAnchor, R / newX2);
                var pic2D = pic2T - pic2.geometricBounds[0];
                transformObj(pic2, p * (marginLeft - pic2.geometricBounds[1]), p * (pic2D));
                transformObj(label2, 0, p * pic2D);

            }
        }
    }
}
*/

function changeUnits(documents, units) {
    with (documents.viewPreferences) {
        horizontalMeasurementUnits = units;
        verticalMeasurementUnits = units;
    }
}

function transformObj(obj, x, y) {
    myTranslate(obj, AnchorPoint.bottomLeftAnchor, x, y)
}

function scaleObj(obj, anchor, factor) {
    myScale(obj, anchor, factor, factor, false);
}
function myTranslate(myObject, myAnchor, myXTranslate, myYTranslate) {
    var myTransformationMatrix = app.transformationMatrices.add({ horizontalTranslation: myXTranslate, verticalTranslation: myYTranslate });
    myObject.transform(CoordinateSpaces.pasteboardCoordinates, myAnchor, myTransformationMatrix);
}
function myScale(myObject, myAnchor, myXScale, myYScale, myUseRulerCoordinates) {
    var myTransformationMatrix = app.transformationMatrices.add({ horizontalScaleFactor: myXScale, verticalScaleFactor: myYScale });
    myObject.transform(CoordinateSpaces.pasteboardCoordinates, myAnchor, myTransformationMatrix, undefined, myUseRulerCoordinates);
}
function myGetBounds(myDocument, myPage) {
    var myPageWidth = myDocument.documentPreferences.pageWidth;
    var myPageHeight = myDocument.documentPreferences.pageHeight
    if (myPage.side == PageSideOptions.leftHand) {
        var myX2 = myPage.marginPreferences.left;
        var myX1 = myPage.marginPreferences.right;
    }
    else {
        var myX1 = myPage.marginPreferences.left;
        var myX2 = myPage.marginPreferences.right;
    }
    var myY1 = myPage.marginPreferences.top;
    var myX2 = myPageWidth - myX2;
    var myY2 = myPageHeight - myPage.marginPreferences.bottom;
    return [myY1, myX1, myY2, myX2];
}
