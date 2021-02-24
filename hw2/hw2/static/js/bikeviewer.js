/** 
  Srijan Pandey, sp3557@drexel.edu
  CS530: DUI, Assignment 2
*/

function BikeViewer() {
    const that = this;
    /**
     * Takes the bikes json data and repopulates the table.
     * This is done by clearing out the table field and 
     * adding new entries into the table.  
     */
    this.update = function(bikes) {
        console.log("Updating After Fetching...")
        $('#biker').empty();
        console.log("Length" + bikes.length)

        const bikeTable = $(`<table class="table">
            <thead>
                    <tr>
                    <th scope="col"> Image </th>
                    <th scope="col"> Name </th>
                    <th scope="col"> Available</th>
                    <th scope="col"> <button class="reset btn btn-danger">Reset</button></th>
                </tr>
            </thead>

            <tbody id="biker"> 
            </tbody>
        </table>`);

        $(bikeTable).find('.reset').click(function() {
            that.reset();
        });
        /* 
            The code loops through the bikes datastructure and creates table rows and columns. 
            If bike availability is 0, there are conditions in the code to disable - button and change opacity 
            by adding unavailable class. 
        */
        for (var row = 0; row < bikes.length; row++) {
                const bike = bikes[row];
                const tableRow = $(`
                <tr class="${bike.available <= 0 ? 'unavailable': ''}">
                    <td scope="col">
                        <img class="tabimage"  alt="Bike Image" src="../static/img/bikes/${bike.image}">
                    </td>
                    <td scope="col" class="name-col">${bike.name}</td>
                    <td scope="col">${bike.available}</td>
                    <td scope="col"> 

                            <button ${bike.available == 0 ? 'disabled': ''} class="minus-button generic-button" > - </button> 
                            <button class="plus-button generic-button"> + </button>
                        </div>
                    <td>
                </tr>
            `);

            /*  The below code adds handlers to the plus and minus button. 
                Which both call same function with different addition 
                values to change the availability 
            */
            $(tableRow).find('.plus-button').click(function () {
                console.log("Plus Button Clicked...")
                that.updateBikeAvailable(bike, +1);
            });
            
            $(tableRow).find('.minus-button').click(function () {
                console.log("Minus buttion Clicked...")
                that.updateBikeAvailable(bike, -1);
            })
            $(bikeTable).append(tableRow)
        }
        $('#biker').append(bikeTable);
    }

    /**
     * This function performs a HTTP POST request to Flask backend to update the availability of the bike.
     * Sends id, and bike availability for the backend to update these values to the database. 
     * @param { Single bike dictionary value } bike 
     * @param { Value which indicates either to increment or drecrement availability of the bike} val 
     */
    this.updateBikeAvailable = function(bike, val) {
        console.log("Update Bike Available...")
        var curAvail = bike.available + val;
        $.post('/api/update_bike', {
            id: bike.id,
            available: curAvail 
        }, function(bikes) {
            that.update(bikes);
        })
    }
    /**
     * Performs Get request to get_bikes API and returns all bikes. Calls update function to repopulate the view.
     */
    this.load = function() {
        console.log("Loading Bikes...")
        $.get('/api/get_bikes', function (bikes) {
            that.update(bikes);    
        });
    }
    /**
     * Sends a POST request to reset_bikes API, which resets availability of all bikes to the value of 3
     */
    this.reset = function() {
        console.log("Resetting Bikes...")
        $.post('/api/reset_bikes', 
        {
            available: 3
        }, function (bikes) {
            that.update(bikes);
        });
    }
}