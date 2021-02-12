function BikeViewer() {
    const that = this;

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

        for (var row = 0; row < bikes.length; row++) {
                const bike = bikes[row];
                console.log("BIKE" + bike);
                const tableRow = $(`
                <tr class="${bike.available <= 0 ? 'unavailable': ''}">
                    <td scope="col">
                        <img class="tabimage" width="100px" alt="Bike Image" src="../static/img/bikes/${bike.image}">
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

    this.load = function() {
        console.log("Loading Bikes...")
        $.get('/api/get_bikes', function (bikes) {
            that.update(bikes);    
        });
    }

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