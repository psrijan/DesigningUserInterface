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
                <a href = "${charity.websiteURL}">${charity.name}</a> 
                <p>${charity.mailStreet} </p>
                <p>${charity.mailCity}, ${charity.mailState}, ${charity.mailZIP}</p>
            </div>`)
            rowHolder.append(curColumn);
        }
        orgHolder.append(rowHolder);
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