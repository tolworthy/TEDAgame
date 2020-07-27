//
function startGame(){
    fillScene();
    startClock();
    nav.tunnelHints=[1,0];
}
function offerStory(){
    let a={"oldVar":"", "possibleStarters":[], "canBeAnyone":0, "i":0, "parsedString":"" };
    function chooseMaybeStory(){
        for (a.oldVar in story.maybe.vars) delete story.maybe.vars[a.oldVar]; // clear vars from previous game offer
        // choose new story.maybe
        story.maybe.num = m.random(db.stories.length);
        db.stories[story.maybe.num][0].latestVersion++;
        story.maybe.version = db.stories[story.maybe.num][0].latestVersion; // determines which synonyms are chosen

        // read, remember
        story.maybe.title = parseString(db.stories[story.maybe.num][0].name[0],1) // 1= use "maybe" values. Fills in story.maybe.vars
                            +" "+ parseString(db.stories[story.maybe.num][0].name[1],1);// " " - so parts don't squash together
                            l("story.maybe.title ='" +story.maybe.title+ "'");
        story.history.push([story.maybe.num, story.maybe.version, 0]); // 0 = only offered
    }
    function chooseStarter(){
        a.possibleStarters =[];
        a.canBeAnyone = (db.stories[story.maybe.num][0].starter =="anyone") ? 1 : 0;
        for(a.i=0; a.i<db.people.length; a.i++){ // all possible people
            if(db.people[a.i].name ==active.person)continue; // cannot be himself!
            if(story.cast.includes())continue; // can't use them: not a stranger
            if(db.people[a.i].hasOwnProperty("notes")){
                if(db.people[a.i].notes.includes(" dead "))continue; // dead people cannot walk
                if(db.people[a.i].notes.includes(" transport "))continue; // transport (ships, etc) cannot be storyStarters
            }
            if(a.canBeAnyone || db.people[a.i].role ==db.stories[story.maybe.num][0].starter) // matches the "starter" requirement?
                a.possibleStarters.push(db.people[a.i].name);
        }
        a.i = m.random(a.possibleStarters.length);
        story.maybe.starter = a.possibleStarters[a.i];
    }
    chooseMaybeStory();   // say("( choosing story: '" +story.maybe.title+ "')", story.maybe.starter);
    chooseStarter();
    say(parseString(db.stories[story.maybe.num][0].startOffer, 1), story.maybe.starter); // "parse" to add the "1" to force "maybe" variables
    say(parseString(db.stories[story.maybe.num][0].startReply, 1));
    yesCancel(parseString(db.stories[story.maybe.num][0].yesCancelQuestion, 1), "acceptMaybeStory"); // "acceptMaybeStory" is detected by the yesCancel list
}
function startStory(){ l(" STARTING STORY!");
    let a={"oldVar":"", "toCopy":[], "tempStr":"","i":0};
    function showStoryTitle(){ // ADD SIGNATURE MUSIC!!!
        function doStoryTitleLine(line){
            let b={"words":"", "id":"", "el":"", "fontSize":0};
            function getFontSize(){ // 1vw = 1% of viewport size. In theory! But often wider.
                b.fontSize = 85/b.words.length; // Ideally, all letters make 80%. Wide letters take up more space.
                if(b.fontSize >12)b.fontSize *=0.9; // for some reason, very wide letters are even wider. Made worse by the lack of spaces?
                else if(b.fontSize >8)b.fontSize *=0.95;
                else if(b.fontSize <3)b.fontSize =3; // not too small: better to have multiple lines
                b.fontSize = b.fontSize.toFixed(2); // 3.10 looks better than 3.0957284632473948
                b.fontSize = b.fontSize +"vw";
                return b.fontSize;
            }
            b.words =parseString(db.stories[story.maybe.num][0].name[line]);
            b.id = "storyTitle" +line; // e.g. "storyTitle0"
            b.el = O(b.id);
            b.el.className = "storyTitle3D shadow " +b.id; // e.g. class "storyTitle0" = "bottom:50%; z-index 2" or similar
            b.el.style.fontSize = b.words.length ? getFontSize() :10; // avoid divide by zero errors
            b.el.innerHTML =b.words; // 0 or 1
            return b.words;
        }
        clock.gamePaused =1;
        story.titleOff =setTimeout(storyTitleOff,10000); // SAME AS CSS "animation-duration" !!!  (but in microseconds, not seconds)
        a.el = O("storyTitle0");
        story.title = doStoryTitleLine(0) + " " + doStoryTitleLine(1);
        O("storyTitle").className ="show storyTitle storyTitleAnimate";
        O("notifyLine-default").innerHTML =story.title;
    }
    function copyMaybeToStory(){
        for (a.oldVar in story.vars) delete story.vars[a.oldVar]; // clear current story
        a.toCopy =["num","version","title","starter"];
        for(a.i=0; a.i<a.toCopy.length; a.i++){
            a.tempStr =a.toCopy[a.i];
            story[a.tempStr] = story.maybe[a.tempStr];
        }
        story.vars = JSON.parse(JSON.stringify(story.maybe.vars)); // deep copy
    }
    copyMaybeToStory();
    showStoryTitle();
    // use "maybe" values (from offerStory)
    // title animation
    // hero says clue
}
function storyTitleOff(){ // separate function so can click on title
    O("storyTitle").className ="hide";
    clearTimeout(story.titleOff); // cancel any that are still running
    clock.gamePaused =0;           l("storyTitleOff");
    say(db.stories[story.maybe.num][0].startDialogue, story.maybe.starter);
}
function endGame(){
    function animateScore(){
        // enlarge score (return to normal when "endGame" video ends)
        // set targetScore
        // setTimer: repeatedly change core until targetScore is met
    }
    video(); showQueue();
    animateScore();
    walk(50); // centre stage for dance
    dance();
    say("wait, somebody's coming, sounds like they are in distress");
    offerStory();
}
function clickYes(){// reads active.yesCancelAction
    let a={"actions":[], "x":0, "y":0, "islandNum":0 };
    nav.removeYesCancel(); // removes box
    l("clicked yes: acting on '" +active.yesCancelAction+ "'");
    a.actions = active.yesCancelAction.split("#"); // e.g. "tryForSea#123#456" -> [tryForSea,123,456]
    active.yesCancelAction ="";
    function goToMapLocation(x,y){
        a.x = Number(x *nav.scenesPerPixel);
        a.y = Number(y *nav.scenesPerPixel);
        goToScene(a.x, a.y, 0 ); // uses queue, but that's OK, as yesCancel just DELETED the queue
        map("off"); // game is no longer paused
    }
    switch(a.actions[0]){
        case "triggerGetStory"  : return offerStory(); // "acceptMaybeStory"
        case "acceptMaybeStory" : return startStory(); // "acceptMaybeStory"
        case "tryForIsland" : {// "tryForIsland#" +islandNumber+ "#" +a.y;
            a.islandNum = a.actions[1];
            return goToMapLocation(db.islands[a.islandNum][0], db.islands[a.islandNum][1]);
        }
        case "tryForLand" : // "tryForLand#" +a.x+ "#" +a.y;
                            return goToMapLocation(a.actions[1],a.actions[2]);
        case "tryForSea" :  return goToMapLocation(a.actions[1],a.actions[2]);
    }
}
function checkEventsForWalkIn(){ // Keep It Simple: no separate "load before walking in" events
    l("checkEventsForWalkIn");
    if(!db.people[0].hasOwnProperty("surname"))getName("everybody"); //sets everybody's names

}
function checkMouseClick(idOrString){       l("checkMouseClick(" +idOrString+ ")");
    // prepare
    let a={"x":0,"y":0,"yPxClicked":"","yesCancelText":"", "yesAction":""}; // yesAction combines text#mapX#mapY as needed
    mouse.clickDone =1; // assume something happens
    a.x =arguments[1]; a.x =typeof(a.x) !=='undefined'? a.x : 0; // e.g. X on map, OR island number
    a.y =arguments[2]; a.y =typeof(a.y) !=='undefined'? a.y : 0; // e.g. Y on map
    a.yPxClicked =arguments[3]; a.yPxClicked =typeof(a.yPxClicked) !=='undefined'? a.yPxClicked : "";// e.g. Y on screen (px)
    // game object?
    switch(idOrString){
        case "mapIsland": {
            a.yesCancelText ="Sail to the island of " +getName("island",a.x)+ "?<br/>(Could be expensive)";
            a.yesAction = "tryForIsland#" +a.x; // text and island number
            return showYesCancel(a.yesCancelText, a.yesAction, a.yPxClicked);   } // yPxClicked is optional: says that the position of the box matters.
        case "mapLand" : {
            a.yesCancelText ="Try to reach this spot?<br/>(Could be expensive)";
            a.yesAction = "tryForLand#" +a.x+ "#" +a.y; // text, map XY
            return showYesCancel(a.yesCancelText, a.yesAction, a.yPxClicked);   }
        case "mapSea" : {
            a.yesCancelText ="Try to sail to this part?<br/>(You'll need a ship - could be expensive)";
            a.yesAction = "tryForSea#" +a.x+ "#" +a.y; // text, map XY
            return showYesCancel(a.yesCancelText, a.yesAction, a.yPxClicked);   }
    }
    // No story click? Can you at least talk?
    if(["person0","person1","person2","person3"].includes(idOrString)) return talkToPerson(idOrString);
    mouse.clickDone =0; // still here? Use default action (e.g. pick up)
}
loaded.storyEvents=1; // ready to be called

loadJavascript("c/7-stories_0.js");
