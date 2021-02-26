// Srijan Pandey, sp3557@drexel.edu
// CS530: DUI, Assignment 3 

 /* 
    STEPS:
    - Set up mechanics to invoke a method from the UI to build a grapher first - DONE
    - Build Canvas (Done)
    - Draw a grid on top of the canvas (done)
    - Draw central grid lines (done)
    - Draw numbers in each of the grid  (done)
    - Draw Graph Logic (done) 
    - Make the graph dynamically created ()
    - Add points to the graph ()
    - 
*/



var pixelsPerCell = 35;
var totalCols = 20; // adding 1 col in left and right
var totalRows = 12; // adding 1 row in top and bottom
var canvasSizeX = 22 * 35;
var canvasSizeY = 14 * 35;


function Grid(grapher) {

    const startPosX = 1;
    const startPosY = 1;

    // This function draws a basic grid inside the canvas
    this.draw = function () {
        grapher.canvas.clearRect(0, 0, canvasSizeX * pixelsPerCell, canvasSizeY * pixelsPerCell);
        let ctx = grapher.canvas;
        // Drawing Rows 
        ctx.beginPath();
        ctx.lineWidth = .4;
        ctx.strokeStyle = '#888888';
        for (let i = startPosX; i <= totalCols + startPosX; i++) {
            ctx.moveTo(i * pixelsPerCell, startPosY * pixelsPerCell);
            ctx.lineTo(i * pixelsPerCell, (startPosY + totalRows) * pixelsPerCell);
        }
        // Drawing Columns
        for (let j = startPosY; j <= totalRows + startPosY; j++) {
            ctx.moveTo(startPosX * pixelsPerCell, j * pixelsPerCell);
            ctx.lineTo((startPosX + totalCols) * pixelsPerCell, j * pixelsPerCell);
        }
        ctx.stroke();

        // Drawing the axis lines in the middle of the grid

        // Drawing Row Axis Line
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#000';
        ctx.moveTo((startPosX + totalCols / 2) * pixelsPerCell, startPosY * pixelsPerCell);
        ctx.lineTo((startPosX + totalCols / 2) * pixelsPerCell, (startPosY + totalRows) * pixelsPerCell);
        ctx.stroke();
        
        // Drawing the Column Axis Line
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(startPosX * pixelsPerCell, (startPosY + totalRows / 2) * pixelsPerCell);
        ctx.lineTo((startPosX + totalCols) * pixelsPerCell , (startPosY + totalRows / 2 ) * pixelsPerCell);
        ctx.stroke();

        // Adding Text to Graph Axis
        ctx.font = "10px";
        ctx.fillStyle = "#888";
        // Row Axis
        let index = 6; 
        const ADJUSTMENT_PIXEL = 15;

        for (let i = startPosY; i <= startPosY + totalRows; i++) {
            ctx.fillText(index, (startPosX + totalCols / 2) * pixelsPerCell - ADJUSTMENT_PIXEL, i * pixelsPerCell);
            index--; 
        }

        index = -10;
        for (let i = startPosX; i <= startPosX + totalCols; i++ ) {
            ctx.fillText(index, i * pixelsPerCell, (startPosY + totalRows / 2) * pixelsPerCell + ADJUSTMENT_PIXEL);
            index++;
        }
    }

    this.findCoordX = function(canvasX) {
       return canvasX / pixelsPerCell - totalCols /2 - startPosX; 
    }

    this.findCoordY = function (corX , x_0, x_1, x_2, x_3) {
            let xx_3 = x_3 * Math.pow(corX, 3);
            let xx_2 = x_2 * Math.pow(corX, 2);
            let xx_1 = x_1 * corX;
            return xx_3 + xx_2 + xx_1 + x_0; 
    }

    this.findCanvasX = function(corX) {
        return (startPosX + totalCols / 2 + corX) * pixelsPerCell;
    }

    this.findCanvasY = function(corY) {
        return (startPosY + totalRows / 2 - corY) * pixelsPerCell; 
    }

    this.plot = function(x_0, x_1, x_2, x_3) {
        console.log("Value of x_0: " + x_0);
        let ctx = grapher.canvas;
        let curX = -3; 
        let INRECEMENT_VALUE = .00028; // every x value is multiplied by 35 pixel
        ctx.lineWidth = 2; 
        let prevcX = 0;
        let prevcY = 0;
        ctx.strokeStyle = 'blue';
        for (let corX = -4; corX <= 4; corX = corX + INRECEMENT_VALUE) {
            let corY = this.findCoordY(corX, x_0, x_1, x_2, x_3);
            let canvasX = this.findCanvasX(corX);
            let canvasY = this.findCanvasY(corY);
            //ctx.fillRect(canvasX, canvasY, 1, 1);
            if (corX > -4) {
                ctx.beginPath();
                ctx.moveTo(prevcX, prevcY);
                ctx.lineTo(canvasX, canvasY);
                ctx.stroke(); 
            }
            prevcX = canvasX;
            prevcY = canvasY;
        }
    }

    this.drawIndex = function(canvasX, coeffs) {
        let corX = this.findCoordX(canvasX);
        let corY = this.findCoordY(corX, coeffs[0], coeffs[1], coeffs[2], coeffs[3]); 
        let canvasY = this.findCanvasY(corY);
        let ctx = grapher.canvas;
        ctx.fillStyle = 'green';

        ctx.fillRect(canvasX, canvasY, 60, 15);
        
        console.log("TYPE OF X: " + typeof(corX));
        console.log("TYPE OF Y: " + typeof(corY));
        let corXTrunc = corX.toFixed(2);
        let corYTrunc = parseFloat(corY).toFixed(2);

        let text =  + corXTrunc + " , " + corYTrunc; 
        ctx.font = '10px serif';
        ctx.fillStyle = "#fff";
        ctx.fillText(text, canvasX + 5, canvasY + 12);
    }

}


function Grapher() {
    
    const that = this;
    // Context here gives a surface to draw
    this.canvas = document.getElementById("canvas").getContext("2d");
    this.grid = new Grid(this);

    this.getCoeff = function() {
        let x_3 = $("#x_3").val();
        let x_2 = $("#x_2").val();
        let x_1 = $("#x_1").val();
        let x_0 = $("#x_0").val();

        x_3 = isNaN(x_3) ? 0 : x_3;
        x_2 = isNaN(x_2) ? 0 : x_2;
        x_1 = isNaN(x_1) ? 0 : x_1;
        x_0 = isNaN(x_0) ? 0 : x_0; 
        return [x_0, x_1, x_2, x_3];
    }

    /**
     * This function adds components to the grapher object
     * Adds html comonents (canvas, equation, input controls)
     */
    this.build = function(graphId) {
        this.grid.draw();
        let coeffs = this.getCoeff();
        this.grid.plot(coeffs[0], coeffs[1], coeffs[2], coeffs[3]);
        return this;
    } 

    this.drawIndex = function(canvasX) {
        this.grid.drawIndex(canvasX, this.getCoeff());
    }
  
}


var grapher = null; 

/*
    Starting function that gets invoked once the DOM is ready
    this is used to setup basics of the application. 
*/
function startGraph() {
   if (!grapher) {
        grapher = new Grapher().build("grapher-wrapper");
   } else {
       grapher.build("grapher-wrapper");
   }
}

/**
 * 
 */
function drawIndex(canvasX) {
    grapher.drawIndex(canvasX);
}

/**
 * 
 */
function redrawGraph() {
    console.log("YOLO!!!");
    grapher.getCoeff();
}