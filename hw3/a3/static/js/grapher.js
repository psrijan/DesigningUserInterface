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

    this.findXCoordinates = function(x) {
        return (startPosX + totalCols / 2 + x) * pixelsPerCell;
    }

    this.findYCoordinates = function(y) {
        return (startPosY + totalRows / 2 - y) * pixelsPerCell; 
    }

    this.plot = function(x_3, x_2, x_1) {
        let ctx = grapher.canvas;
        ctx.strokeStyle = 'blue';
        let curX = -3; 
        let INRECEMENT_VALUE = .028; // every x value is multiplied by 35 pixel

        for (let corX = -4; corX <= 4; corX = corX + INRECEMENT_VALUE) {
            let xx_3 = x_3 * Math.pow(corX, 3);
            let xx_2 = x_2 * Math.pow(corX, 2);
            let xx_1 = x_1 * corX;
            let corY = xx_3 + xx_2 + xx_1; 
            let canvasX = this.findXCoordinates(corX);
            let canvasY = this.findYCoordinates(corY);
            ctx.fillRect(canvasX, canvasY, 2, 2);
        }
    }
}


function Grapher() {
    
    const that = this;
    // Context here gives a surface to draw
    this.canvas = document.getElementById("canvas").getContext("2d");
    this.grid = new Grid(this);
    
    /**
     * This function adds components to the grapher object
     * Adds html comonents (canvas, equation, input controls)
     */
    this.build = function(graphId) {
        this.grid.draw();
        this.grid.plot(0, 1, 0);
        return this;
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
   }
}