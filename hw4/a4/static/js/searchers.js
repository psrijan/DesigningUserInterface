function Searcher() {
    const that = this; 
    var charityList = [];
    const SHORT_MISSION_LEN = 370; // Change the value of the length to the size you want the short mission text to be
    /**
     * This function updates the charity information 
     * in the charity-block div element. It creates a 
     * table and updates the values inside of the table.
     * @param {*} data 
     */
    this.updateCharityBlock = function(charityList , query) {
        this.query = query;
        this.charityList = charityList; // Storing charityList in a variable to be used later 
        $("#charity-block").empty();
        const charityTable = $(`<table class = "charity-table"></table>`)
        for (let row = 0; row < charityList.length; row++) {
            const charity = charityList[row];
            let missionShort =  this.getShortMissionText(charity.mission); 
            let highlighedMission= this.highlightMission(missionShort, query);
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
                    <div class = "charity-mission" id = "charity-mission-${row}">
                        <p>${highlighedMission} </p>
                        <p class = "read-more" id="read-more-${row}"> Read More... </p>
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
        for (let i = 0; i < queryItems.length; i++) {
            let curItem = queryItems[i];
            let regexStr = `(${curItem})`;
            console.log("Regex String: " + regexStr)
            let regex = new RegExp(regexStr , 'i'); 
            // case insensitive way ma banaunu paryo regex. /${curItem}/i 
            mission = mission.replace(regex, "<span class=\"highlighted\">$1</span>");
        }
        console.log("Final Highlited Text: " + mission);
        return mission;
    }
    
    /**
     * This  
     * @param {Mission Text to shorten} mission 
     */
    this.getShortMissionText= function(mission) {
        let missionShort = "";
        if (mission.length > SHORT_MISSION_LEN) {
            let curIndex = SHORT_MISSION_LEN - 1;
            // while ((mission.charAt(curIndex) != ' ' || mission.charAt(curIndex) != '\.') && curIndex >= 0) {
            //     curIndex--;
            //     console.log("Cur Index: " + curIndex)
            // }
            missionShort = mission.substring(0, curIndex);
            return missionShort;
        } else {
            return mission;
        }
    }

    /**
     * This function takes on the readmore press and shows the full text 
     * inside the table. 
     * @param {DomId of the read more text} domId 
     */
    this.expandMissionStatement = function(domId) {
        let idFrag = domId.split("-");
        let index = idFrag[2]
        let actualIndex = 0;
        try {
            actualIndex = parseInt(index,  10);
        } catch(err) {
            console.log("Parsing DOM ID to Index Error ");
        }
        let charity = this.charityList[actualIndex];
        let completeMission = charity.mission;
        let highlightedMission = this.highlightMission(completeMission, this.query);
        let charityMissionId = `#charity-mission-${actualIndex}`;
        $(charityMissionId).empty();
        let missionTextField = $(`<p>${highlightedMission}</p>`)
        $(charityMissionId).append(missionTextField);
    }

    /**
     * This function is an initialization function that is instantiated at the start of the 
     * document ready. This ensures that read more adds additional test to the charity mission.
     */
    this.initialize = function() {
        // initialize a handler for future, when read-more is pressed then change the text to complete mission statement
        // for charity mission statement 
        $(".read-more").click(function() {
            console.log("Read More Clicked");
            let id = $(this).attr('id');
            that.expandMissionStatement(id);
        })
    }


    /**
     * This function is used to find a charity based on 
     * the string from the text box 
     * @param {String from text box} query 
     */
    this.findCharity = function () {
        console.log("Inside Find Charity...");
        let query = $("#search-field").val()
        $.post("/search", {
            "query": query
        }, function (data) {
            that.updateCharityBlock(data , query);    
            that.initialize();
        });
    } 
}