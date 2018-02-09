var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    x = 100,
    y = 100,
    z = 100;
canvas.setAttribute('width',canvas.parentElement.offsetWidth);
var points = [
    [0, 0],
    [x, 0],
    [x, -y],
    [0, -y],
    [z * Math.cos(45 * Math.PI / 180), -z * Math.sin(45 * Math.PI / 180)],
    [z * Math.cos(45 * Math.PI / 180), -y - z * Math.sin(45 * Math.PI / 180)],
    [x + z * Math.cos(45 * Math.PI / 180), -z * Math.sin(45 * Math.PI / 180)],
    [x + z * Math.cos(45 * Math.PI / 180), -y - z * Math.sin(45 * Math.PI / 180)]
];
var faces = [
    [points[4], points[5], points[7], points[6]], //后
    [points[0], points[4], points[6], points[1]], //下
    [points[0], points[3], points[5], points[4]], //左
    [points[1], points[2], points[7], points[6]], //右
    [points[2], points[3], points[5], points[7]], //上
    [points[0], points[3], points[2], points[1]], //前
]
draw(0,300);
draw(300,300,true);
function draw(x, y, fill) {
    ctx.save();
    ctx.translate(x, y);
    for (var i = 0, len = faces.length; i < len; i++) {
        var p = faces[i];
        ctx.beginPath();
        for (var j = 0, l = p.length; j < l; j++) {
            if (j == 0) {
                ctx.moveTo(p[j][0], p[j][1]);
            } else {
                ctx.lineTo(p[j][0], p[j][1]);
            }
        }
        ctx.closePath();
        if (fill) {
            ctx.fillStyle = randC(0.8);
            ctx.fill();
        } else {
            ctx.stroke();
        }
    }
    ctx.restore();
}

function randC(perc) {
    return 'rgba(' + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + ',' + (perc || 1) + ")";
}

var canvas1 = document.getElementById("canvas1"),
    graphs = [],
    graphAttr = [
        {x: 60, y: 60, w: 100, h: 100, bgColor: randC(0.8), canvasObj: canvas1},
        {x: 350, y: 120, w: 50, h: 50, bgColor: randC(0.8), canvasObj: canvas1, shape: "circle"},
        {x: 200, y: 130, w: 70, h: 70, bgColor: randC(0.8), canvasObj: canvas1, shape: "triangle"}
    ],
    tempGraphArr = [];
canvas1.setAttribute('width',canvas1.parentElement.offsetWidth);
dragGraph = function (x, y, w, h, fillStyle, canvas, graphShape) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.fillStyle = fillStyle;
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.canvasPos = canvas.getBoundingClientRect();
    this.graphShape = graphShape;
}

dragGraph.prototype = {
    paint: function () {
        this.context.beginPath();
        this.context.fillStyle = this.fillStyle;
        this.shapeDraw();
        this.context.fill();
        this.context.closePath();
    },
    isMouseInGraph: function (mouse) {
        this.context.beginPath();
        this.shapeDraw();
        return this.context.isPointInPath(mouse.x, mouse.y);
    },
    shapeDraw: function () {
        if (this.graphShape == "circle") {
            this.context.arc(this.x, this.y, 50, 0, Math.PI * 2);
        }
        else if (this.graphShape == "triangle") {
            this.context.moveTo(this.x + 50, this.y + 50);
            this.context.lineTo(this.x + 100, this.y + 130);
            this.context.lineTo(this.x, this.y + 130);
        }
        else {
            this.context.rect(this.x, this.y, this.w, this.h);
        }
    },
    erase: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

canvas1.addEventListener("mousedown", function (e) {
    var mouse = {
        x: e.clientX - canvas1.getBoundingClientRect().left,
        y: e.clientY - canvas1.getBoundingClientRect().top
    };
    graphs.forEach(function (shape) {
        var offset = {
            x: mouse.x - shape.x,
            y: mouse.y - shape.y
        };
        if (shape.isMouseInGraph(mouse)) {
            tempGraphArr.push(shape);
            canvas1.addEventListener("mousemove", function (e) {
                mouse = {
                    x: e.clientX - canvas1.getBoundingClientRect().left,
                    y: e.clientY - canvas1.getBoundingClientRect().top
                };

                if (shape === tempGraphArr[tempGraphArr.length - 1]) {
                    shape.x = mouse.x - offset.x;
                    shape.y = mouse.y - offset.y;

                    shape.erase();
                    drawGraph();
                }
            }, false);
            canvas1.addEventListener("mouseup", function () {
                tempGraphArr = [];
            }, false);
        }
    });
    e.preventDefault();
}, false);

for (var i = 0; i < graphAttr.length; i++) {
    var graph = new dragGraph(graphAttr[i].x, graphAttr[i].y, graphAttr[i].w, graphAttr[i].h,
        graphAttr[i].bgColor, graphAttr[i].canvasObj, graphAttr[i].shape);
    graphs.push(graph);
}

function drawGraph() {
    for (var i = 0; i < graphAttr.length; i++) {
        graphs[i].paint();
    }
}

drawGraph();

// document.getElementById('drag').addEventListener('click', () => {
// });
// document.getElementById('cube').addEventListener('click', () => {
//     draw(0, 300);
//     draw(300, 300, true);
// });
