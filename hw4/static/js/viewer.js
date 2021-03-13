//Srijan Pandey, sp3557@drexel.edu
// CS530: DUI, Assignment [4]

function Viewer () {

    const that = this;
    /**
     * This function takes the charityList obtained from the REST Api 
     * and displays the data inside a div element. 
     * @param {List of Similar or related charities} charityList 
     */
    this.populateRelatedCharities = function (charityList) {
        this.charityList = charityList;
        $("#org-holder").empty();
        let orgHolder = $("#org-holder");
        
        let rowHolder = null;
        for (let i = 0; i < charityList.length; i++) {
            let charity = charityList[i];
            if ( i / 3 == 0) {
                if (i != 0) {
                    orgHolder.append(rowHolder);
                }
                rowHolder = $(`<div class = "row">
                </div>`)
            }
            const curColumn = $(`<div class = "col col-md-4">
                <div class = "rcorners1 p-2 m-2 pl-3">
                    <a href = "${charity.websiteURL}" class= "bold-text">${charity.name}</a> <br/>
                    ${charity.mailStreet} <br/>
                    ${charity.mailCity}, ${charity.mailState}, ${charity.mailZIP}<br/>
                </div>
            </div>`)
            rowHolder.append(curColumn);
        }
        orgHolder.append(rowHolder); // Last entry must be inserted outside the loop 
    }

    /**
     *  This function finds similar charities for the particular viewer 
     *  and sends the data to populateRealatedCharities for displaying 
     *  in the DOM
     */
    this.getRelatedCharities = function() {
        const params = (new URL(document.location)).searchParams;
        const uid = params.get('uid');
        const url = `/search/related?uid=${uid}`;

        $.get(url, function (data) {
            console.log(data);
            that.populateRelatedCharities(data);
        });
    }
}