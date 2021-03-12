// Srijan Pandey, sp3557@drexel.edu
// CS530: DUI, Assignment 3 

var pixelsPerCell = 35;
var totalCols = 20; // adding 1 col in left and right
var totalRows = 12; // adding 1 row in top and bottom
var canvasSizeX = 22 * 35; // Pixel into number of unit boxes
var canvasSizeY = 14 * 35;

/**
 * Grid is used to draw all necessary grid components in the
 * canvas. 
 * @param {Passes in the grapher object for reference} grapher 
 */
function Grid(grapher) {

    /** Leave a space equivalent to 1 gridbox in canvas before drawing the grid lines */
    const startPosX = 1;
    const startPosY = 1;

    /**
     * This function draws a basic grid inside the canvas
     * Draws the column lines, and the row lines
     * Highlights the axes 
     * Marks integer values to individual grids.
     */ 
    this.draw = function () {
        grapher.canvas.clearRect(0, 0, canvasSizeX * pixelsPerCell, canvasSizeY * pixelsPerCell);
        let ctx = grapher.canvas;
        // Drawing Rows 
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'gray';
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
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000';
        ctx.moveTo((startPosX + totalCols / 2) * pixelsPerCell, startPosY * pixelsPerCell);
        ctx.lineTo((startPosX + totalCols / 2) * pixelsPerCell, (startPosY + totalRows) * pixelsPerCell);
        ctx.stroke();
        
        // Drawing the Column Axis Line
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(startPosX * pixelsPerCell, (startPosY + totalRows / 2) * pixelsPerCell);
        ctx.lineTo((startPosX + totalCols) * pixelsPerCell , (startPosY + totalRows / 2 ) * pixelsPerCell);
        ctx.stroke();

        // Adding Text to Graph Axis
        ctx.font = "12px Helvetica";
        ctx.fillStyle = "gray";
        // Row Axis
        let index = 6; 
        const ADJUSTMENT_PIXEL = 15;
        const TEXT_OFFSET_ROW = 5; 
        // Adds markings for each row of the grid value
        for (let i = startPosY; i <= startPosY + totalRows; i++) {
            ctx.fillText(index, (startPosX + totalCols / 2) * pixelsPerCell - ADJUSTMENT_PIXEL, i * pixelsPerCell + TEXT_OFFSET_ROW);
            index--; 
        }
       
        const TEXT_OFFSET_COL = 3;
        // Adds markings column for each of the grid value
        index = -10;
        for (let i = startPosX; i <= startPosX + totalCols; i++ ) {
            ctx.fillText(index, i * pixelsPerCell - TEXT_OFFSET_COL, (startPosY + totalRows / 2) * pixelsPerCell + ADJUSTMENT_PIXEL);
            index++;
        }
    }
    
    /**
     * Reverse Translational function to map canvas value of X to actual value of the X coordinate in the equation 
     */
    this.findCoordX = function(canvasX) {
       return canvasX / pixelsPerCell - totalCols /2 - startPosX; 
    }

    /**
     * Translational function to map the corX value 
     * to corY value   
     */
    this.findCoordY = function (corX , x_0, x_1, x_2, x_3) {
            let xx_3 = x_3 * Math.pow(corX, 3);
            let xx_2 = x_2 * Math.pow(corX, 2);
            let xx_1 = x_1 * corX;
            let coord_y = xx_3 + xx_2 + xx_1 + x_0 * 1; 
            return coord_y;
    }

    /**
     * Translational function between equational value of x 
     * to the equivalent scaled value of X in the canvas. 
     */
    this.findCanvasX = function(corX) {
        return (startPosX + totalCols / 2 + corX) * pixelsPerCell;
    }

    /**
     * Translation function between equaltional value of y 
     * to the equivalent scaled value of Y in the canvas. 
     */
    this.findCanvasY = function(corY) {
        return (startPosY + totalRows / 2 - corY) * pixelsPerCell; 
    }
    /**
     * Plots the graph in the grid 
     * parameters are the coefs of the polynomial 
     */
    this.plot = function(x_0, x_1, x_2, x_3) {
        console.log("Value of x_0: " + x_0);
        let ctx = grapher.canvas;
        let curX = -3; 
        let INRECEMENT_VALUE = .1; // every x value is multiplied by 35 pixel
        ctx.lineWidth = 2; 
        let prevcX = 0;
        let prevcY = 0;
        ctx.strokeStyle = 'blue';

        const GRAPH_START_VALUE = -10;
        
        for (let corX = GRAPH_START_VALUE; corX <= -1 * GRAPH_START_VALUE; corX = corX + INRECEMENT_VALUE) {
            let corY = this.findCoordY(corX, x_0, x_1, x_2, x_3);
            let canvasX = this.findCanvasX(corX);
            let canvasY = this.findCanvasY(corY);
            if (corX > GRAPH_START_VALUE) {
                ctx.beginPath();
                ctx.moveTo(prevcX, prevcY);
                ctx.lineTo(canvasX, canvasY);
                ctx.stroke(); 
            }
            prevcX = canvasX;
            prevcY = canvasY;
        }
    }

    /**
     * This function draws the Index that indicates the coordinates on the graph 
     * @param {Coordinate value of X in the canvas} canvasX 
     * @param {Coeffs the user has specified for the polynomial} coeffs 
     */
    this.drawIndex = function(canvasX, coeffs) {
        let corX = this.findCoordX(canvasX);
        let corY = this.findCoordY(corX, coeffs[0], coeffs[1], coeffs[2], coeffs[3]); 
        let canvasY = this.findCanvasY(corY);
        let ctx = grapher.canvas;
        ctx.fillStyle = 'green';
        ctx.fillRect(canvasX, canvasY, 68, 15);
        
        let corXTrunc = corX.toFixed(2);
        let corYTrunc = parseFloat(corY).toFixed(2);

        let text =  + corXTrunc + " , " + corYTrunc; 
        ctx.font = '10px serif';
        ctx.fillStyle = "#fff";
        ctx.fillText(text, canvasX + 5, canvasY + 12);
    }

}

/**
 * Mediator class that gets 
 *  - necessary values from the UI
 *  - invokes functions to draw, redraw, index points
 * 
 */
function Grapher() {
    
    const that = this;
    // Context here gives a surface to draw
    this.canvas = document.getElementById("canvas").getContext("2d");
    this.grid = new Grid(this);

    /**
     * getter that fetches values of coefficients from the 
     * UI TextArea 
     */
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
 * Function call from the UI that draws the green UI index 
 * that indicates the points in the graph
 */
function drawIndex(canvasX) {
    grapher.drawIndex(canvasX);
}
