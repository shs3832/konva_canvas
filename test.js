// var canvasWidth = window.innerWidth;
// var canvasHeight = window.innerHeight;

$ = (selector) => document.querySelector(selector);

window.addEventListener("load", () => {
    $(".spinner").style.display = "none";
});

var ratio = document.body.getAttribute("data-ratio");
var canvasWidth = document.body.getAttribute("data-kw") / ratio;
var canvasHeight = document.body.getAttribute("data-kh") / ratio;
var canvasBg = document.body.getAttribute("data-bg");

var stage = new Konva.Stage({
    container: "canvas",
    width: canvasWidth,
    height: canvasHeight,
});
var layer = new Konva.Layer();
var index = 0;
var chairIndex = 0;
var gridValue = 10;
var menuNode = $("#menu");
var currentShape;
var tr_options = {
    anchorStroke: "red",
    anchorFill: "yellow",
    anchorSize: 3,
    borderStroke: "green",
    borderDash: [1, 1],
};

stage.getContainer().style.backgroundImage = canvasBg;
stage.getContainer().style.backgroundSize = "100% 100%";

function addShape(rotate) {
    // var tr = new Konva.Transformer(tr_options);
    var parseRotate = parseInt(rotate);
    var rVal = parseRotate != 0 ? parseRotate : 0;
    var imageObj = new Image();
    imageObj.src = "/images/yoda.jpg";
    imageObj.onload = function () {
        var rect = new Konva.Image({
            x: stage.width() / 2,
            y: stage.height() / 2,
            width: gridValue * 9,
            height: gridValue * 1,
            rotation: rVal,
            image: imageObj,
            draggable: true,
            text: "table",
            fill: "yellow",
            id: "table_" + index,
            offset: {
                x: rVal !== 0 && rVal !== 180 ? (gridValue * 9) / 2 : 0,
                y: rVal !== 0 && rVal !== 180 ? (gridValue * 1) / 2 : 0,
            },
        });
        // console.log(rVal != 0 && 180 ? (gridValue * 9) / 2 : 0);
        index++;
        layer.add(rect);
        stage.add(layer);
        layer.batchDraw();
        // stage.add(layer);
        // addEvent(rect, tr);
        addEvent(rect);
    };
}

// function addShape(rotate) {
//     rotate ? rotate : 0;
//     var tr = new Konva.Transformer(tr_options);
//     var rect = new Konva.Rect({
//         x: stage.width() / 2,
//         y: stage.height() / 2,
//         width: gridValue * 3,
//         height: gridValue,
//         rotation: rotate,
//         fill: "green",
//         draggable: true,
//         text: "테이블",
//         id: "table_" + index,
//     });
//     index++;
//     layer.add(rect);
//     console.log(rect);
//     stage.add(layer);
//     addEvent(rect, tr);
// }
function addEvent(rect) {
    rect.on("mousedown", () => {
        // layer.add(tr);
        // tr.nodes([rect]);
        layer.draw();
        $(".type").innerText = rect.attrs.text;
        $(".id").innerText = rect.attrs.id;
    });
    rect.on("dragmove", () => {
        rect.position({
            x: Math.round(rect.x() / gridValue) * gridValue,
            y: Math.round(rect.y() / gridValue) * gridValue,
        });
        stage.batchDraw();
    });
}

function addShapeChair(rotate) {
    var parseRotate = parseInt(rotate);
    var rVal = parseRotate != 0 ? parseRotate : 0;
    // console.log(parseRotate === 0);
    // var tr = new Konva.Transformer(tr_options);
    // console.log(parseRotate);
    var imageObjChair = new Image();
    imageObjChair.src = "/images/darth-vader.jpg";
    imageObjChair.onload = function () {
        var rectChair = new Konva.Image({
            x: stage.width() / 2,
            y: stage.height() / 2,
            width: gridValue * 3,
            height: gridValue * 3,
            rotation: rVal,
            image: imageObjChair,
            draggable: true,
            text: "chair",
            fill: "black",
            id: "chair_" + chairIndex,
            offset: {
                x: rVal !== 0 && rVal !== 180 ? (gridValue * 3) / 2 : 0,
                y: rVal !== 0 && rVal !== 180 ? (gridValue * 3) / 2 : 0,
            },
        });

        chairIndex++;
        layer.add(rectChair);
        stage.add(layer);
        layer.batchDraw();
        // addEventChair(rectChair, tr);
        addEventChair(rectChair);
    };
}

// function addShapeChair(rotate) {
//     rotate ? rotate : 0;
//     var tr = new Konva.Transformer(tr_options);
//     var rectChair = new Konva.Rect({
//         x: stage.width() / 2,
//         y: stage.height() / 2,
//         width: gridValue,
//         height: gridValue,
//         rotation: rotate,
//         fill: "black",
//         draggable: true,
//         text: "의자",
//         id: "chair_" + chairIndex,
//     });
//     chairIndex++;
//     layer.add(rectChair);
//     stage.add(layer);
//     addEventChair(rectChair, tr);
// }
function addEventChair(rectChair) {
    rectChair.on("mousedown", function () {
        // layer.add(tr);
        // tr.nodes([rectChair]);
        layer.draw();
        $(".type").innerText = this.attrs.text;
        $(".id").innerText = this.attrs.id;
    });
    rectChair.on("dragmove", (e) => {
        rectChair.position({
            x: Math.round(rectChair.x() / gridValue) * gridValue,
            y: Math.round(rectChair.y() / gridValue) * gridValue,
        });
        stage.batchDraw();
    });
}

function getJson() {
    var json = stage.toJSON();
    console.log(json);
}

$(".getJson").addEventListener("click", function () {
    getJson();
    alert("생성완료");
});

$("#delete-button").addEventListener("click", () => {
    // const tr = layer
    //     .find("Transformer")
    //     .toArray()
    //     .find((tr) => tr.nodes()[0] === currentShape);
    // tr.destroy();
    currentShape.destroy();
    layer.draw();
});

stage.on("contextmenu", function (e) {
    e.evt.preventDefault();
    if (e.target === stage) {
        return;
    }
    currentShape = e.target;
    menuNode.style.display = "initial";
    // var containerRect = stage.container().getBoundingClientRect();
    menuNode.style.top =
        // containerRect.top + stage.getPointerPosition().y + 4 + "px";
        stage.getPointerPosition().y + 4 + "px";
    menuNode.style.left =
        // containerRect.left + stage.getPointerPosition().x + 4 + "px";
        stage.getPointerPosition().x + 4 + "px";
});

window.addEventListener("click", () => {
    menuNode.style.display = "none";
});

$(".drawRect_deg").addEventListener("click", function () {
    var getDeg = $(".input_table_deg").value;
    addShape(getDeg);
});

$(".drawRectChair_deg").addEventListener("click", function () {
    var getDeg = $(".input_chair_deg").value;
    addShapeChair(getDeg);
});

/* responsive */
// fitStageIntoParentContainer();
// function fitStageIntoParentContainer() {
//     var container = document.querySelector("#canvas");
//     var containerWidth = container.offsetWidth;
//     var scale = containerWidth / canvasWidth;

//     stage.width(canvasWidth * scale);
//     stage.height(canvasHeight * scale);
//     stage.scale({ x: scale, y: scale });
//     stage.draw();
// }
// window.addEventListener("resize", function () {
//     fitStageIntoParentContainer();
// });
var gridLayer = new Konva.Layer();
gridLayer.add(new Konva.Line({ points: [0, 0, gridValue, gridValue] }));
for (var i = 0; i < canvasWidth / gridValue; i++) {
    gridLayer.add(
        new Konva.Line({
            points: [
                Math.round(i * gridValue),
                0,
                Math.round(i * gridValue),
                canvasHeight,
            ],
            stroke: "#fff",
            strokeWidth: 0.4,
            dash: [1, 1],
        })
    );
}
for (var j = 0; j < canvasHeight / gridValue; j++) {
    gridLayer.add(
        new Konva.Line({
            points: [
                0,
                Math.round(j * gridValue),
                canvasWidth,
                Math.round(j * gridValue),
            ],
            stroke: "#fff",
            strokeWidth: 0.4,
            dash: [1, 1],
        })
    );
}
stage.add(gridLayer);

document.querySelector(".save").addEventListener("click", function () {
    var json = stage.toJSON();
    localStorage.setItem("seatData", json);
    alert("저장완료");
});

// document.querySelector(".load").addEventListener("click", function () {
//     const data = localStorage.getItem("seatData") || "[]";
//     console.log(data);
//     var stage = Konva.Node.create(data, "canvas");

//     var stageLayer = stage.children[1].children;

//     stageLayer.forEach((element, index) => {
//         console.log(element, index);
//         element.on("mousedown", () => {
//             layer.draw();
//             $(".type").innerText = element.attrs.text;
//             $(".id").innerText = element.attrs.id;
//         });
//         element.on("dragmove", () => {
//             element.position({
//                 x: Math.round(element.x() / gridValue) * gridValue,
//                 y: Math.round(element.y() / gridValue) * gridValue,
//             });
//             stage.batchDraw();
//         });
//     });
// });
