function Searcher() {
    const that = this; 
    var charityList = [];
    const SHORT_MISSION_LEN = 100; // Change the value of the length to the size you want the short mission text to be
    /**
     * This function updates the charity information 
     * in the charity-block div element. It creates a 
     * table and updates the values inside of the table.
     * @param {*} data 
     */
    this.updateCharityBlock = function(charityList , query) {
        this.charityList = charityList; // Storing charityList in a variable to be used later 
        $("#charity-block").empty();
        const charityTable = $(`<table class = "charity-table"></table>`)
        for (let row = 0; row < charityList.length; row++) {
            const charity = charityList[row];
            let missionShort =  getShortMissionText(charity.mission); 
            let highlighedMission= highlightMission(missionShort, query);
            const tableRow = $(`
            <tr class="charity-row-${charity.uid}">
                <td>
                    <div class ="charity-address">
                        <div class="row">
                            <div class ="col">
                                <img src = "${charity.categoryImage}" alt = "Category Image">  
                            </div>
                            <div class ="col">
                                <a href= "/view?uid=${charity.uid}"> ${charity.name} </a>
                                <p> ${charity.mailAddress} </p>
                                <p> ${charity.mailCity}, ${charity.mailState}, ${charity.mailZIP} </p>
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <div class = "charity-mission" id = "charity-mission-${charity.uid}">
                        <p>${highlighedMission} </p>
                        <p class = "read-more" id="read-more-${charity.uid}"> Read More... </p>
                    </div>
                </td>
            </tr>
            `);
            $(charityTable).append(tableRow);
        }
        $("#charity-block").append(charityTable);
    }


    /**
     * This function takes the plain mission text and adds additional <span> elements to highlight the text 
     * @param {Mission Text to be highlighted} mission 
     * @param {Query fields to use for the highlighting} query
     */
    this.highlightMission = function(mission, query) {
        query = query.toLowerCase(); // converting everything to lower case
        query = query.replace("\n" , ""); // Removing return characters in the string 
        query = query.replace("\s+", " "); // Adding single spaces in place where there are more than one space 
        let queryItems = query.split(" ");

        for (let i = 0; i < queryItems; i++) {
            let curItem = queryItems[i];
            let regexStr = `(${curItem})`
            let regex = new RegExp(regexStr , 'i'); 
            // case insensitive way ma banaunu paryo regex. /${curItem}/i 
            mission.replace(regex, "<span class=\"highlighted\">$1</span>");
        }
        return mission;
    }
    
    /**
     * This  
     * @param {Mission Text to shorten} mission 
     */
    this.getShortMissionText= function(mission) {
        let missionShort = "";
        if (isShort && mission.length > SHORT_MISSION_LEN) {
            let curIndex = SHORT_MISSION_LEN - 1;
            while (mission.charAt(curIndex) != ' ' || mission.charAt(curIndex) != '\.') {
                curIndex--;
            }
            missionShort = mission.substring(0, curIndex);
            return missionShort;
        } else {
            return mission;
        }
    }




    /**
     * This function is used to find a charity based on 
     * the string from the text box 
     * @param {String from text box} query 
     */
    this.findCharity = function () {
        console.log("Inside Find Charity...");
        let query = $("#search-field").val()
        console.log(`Query String: ${query} `);
        $.post("/search", {
            "query": query
        }, function (data) {
            console.log(data);
            that.updateCharityBlock(data , query);    
        });
    } 
}