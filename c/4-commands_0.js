var ab={ // anim shared code ("aa" is already used)
    "animWords":[], "houseId":"", "climbX":0, "houseBot":0, "houseHeight":0,
    "getClimbHouseData":function(animName){ // no animation?
        // get house data
        ab.animWords = active.queue[0][0].split("#");
        ab.houseId = ab.animWords[1];// e.g. "floorObj2"
        ab.climberId= active.getIdFromName(ab.animWords[2]);
        ab.houseBot = active.sceneObjects[ab.houseId].db.bottom;
        ab.houseHeight = active.sceneObjects[ab.houseId].db.height;
        ab.climbX = active.sceneObjects[ab.houseId].x + (active.sceneObjects[ab.houseId].db.width/2); // middle of house (where feet would be)
        // check data
        if((typeof(ab.climbX) !="number")||(typeof(ab.houseBot) !="number")||(typeof(ab.houseHeight) !="number")){
            l("WARNING: cannot climb " +ab.houseId+ " (" +active.sceneObjects[ab.houseId].db.name+ ") as I don't know its dimensions. (x:" +ab.climbX+ ",bot:" +ab.houseBot+ ",height:" +ab.houseHeight+ "). Deleting queue[0]");
            active.queue.shift(); // remove that climb
            return "error";
        }else if(ab.climbX <10){
            l("WARNING: cannot climb " +ab.houseId+ " (" +active.sceneObjects[ab.houseId].db.name+ ") as it's off screen (x=" +ab.climbX+ "). Deleting queue[0]");
            active.queue.shift(); // remove that climb
            return "error";;
        }

        active.sceneObjects.person0.x = ab.climbX; // always person0: always same animation, no other people present
        active.sceneObjects.person0.y = ab.houseBot; // measured from the bottom
        // size of climbing animation
        animName.tempScale = ((ab.houseHeight/100) * 0.7 * gameSize.height)/animName.frameHeight; // 0.7 x house height (ab.houseHeight is an percent of game)
    }
}
document.addEventListener('keydown', function(event) {
    switch (event.keyCode){
        case 27 : {  l("pressed escape"); // escape
            health('off');
            notify('off');
            map('off');
            O("notifyBox").style.display ="none";// bookmarks needs this
            O("storyTitle").style.display ="none";// click on title before it fades out
            nav.removeYesCancel();// includes clock.gamePaused =0
            break; }
    }
});
    /*
    backspace   8
    tab 	    9
    enter 	    13
    shift 	    16
    ctrl 	    17
    alt 	    18
    pause/break 19
    caps lock 	20
    escape 	    27
    page up 	33
    page down 	34
    end 	    35
    home 	    36
    left arrow 	37
    up arrow 	38
    right arrow 39
    down arrow 	40
    insert 	    45
    delete 	    46
    0 	48
    1 	49
    2 	50
    3 	51
    4 	52
    5 	53
    6 	54
    7 	55
    8 	56
    9 	57
    a 	65
    b 	66
    c 	67
    d 	68
    e 	69
    f 	70
    g 	71
    h 	72
    i 	73
    j 	74
    k 	75
    l 	76
    m 	77
    n 	78
    o 	79
    p 	80
    q 	81
    r 	82
    s 	83
    t 	84
    u 	85
    v 	86
    w 	87
    x 	88
    y 	89
    z 	90
    left window 91
    right window92
    select key 	93
    numpad 0 	96
    numpad 1 	97
    numpad 2 	98
    numpad 3 	99
    numpad 4 	100
    numpad 5 	101
    numpad 6 	102
    numpad 7 	103
    numpad 8 	104
    numpad 9 	105
    multiply 	106
    add 	    107
    subtract 	109
    decimalpoint110
    divide 	    111
    f1 	112
    f2 	113
    f3 	114
    f4 	115
    f5 	116
    f6 	117
    f7 	118
    f8 	119
    f9 	120
    f10 121
    f11 122
    f12 123
    num lock 	144
    scroll lock 145
    semi-colon 	186
    equal sign 	187
    comma 	    188
    dash 	    189
    period 	    190
    forward slash 	191
    grave accent 	192
    open bracket 	219
    back slash 	    220
    close braket 	221
    single quote 	222
    */


function animateNonPerson(id, animName){// e.g. animateObject("monster",["frame0.png","frame1.png"])
    id = active.getIdFromName(id);// in case id is a name
    active.queue.push(["animateNonPerson#" + id+ "#" +animName, "nobody",0]);
}
function assignPersonToID(who,id,toPush=0){ // why in queue? normally happens after walking off. In story, could change identity when in cupboard, etc.
    let a={"animWords":[], "placeInPeople":0};
    if(who=="_READ_QUEUE_FRAME1"){
        a.animWords = active.queue[0][0].split("#"); // ["assignPersonToID",who,id]
        who = a.animWords[1];
        id = a.animWords[2];
        addPersonFromDatabase(who,id);
    }
    //_____end_of_READ_QUEUE_FRAME1________________________________________________________________________________________________________________________________
    else{ if(toPush)active.queue.push(["assignPersonToID#" +who+ "#" +id, "nobody", 0]); // "nobody" means nobody has an animation called "yesCancel"
            else    active.queue.unshift(["assignPersonToID#" +who+ "#" +id, "nobody", 0]); // "nobody" means nobody has an animation called "yesCancel"
    }
}
function clickOn(id){ // for map clicks, see "map(which)" // (in loadScene). If in doubt, see index.html for "clickOn", "map", etc.
    let a={ "thisClick": new Ob(), "targetX":0,"i":0, "name":"", "cos":"",
            "itemNotes":"", "notesSplit":[], "notesSplit2":[], "i":0, "cutScene":"",// for notes
            "xPercent":0,"yPercent":0,"hotspots":[], "animWords":[], "id":"", // for cancelAnimations
            "inventorySpace":"", "key":"", "el":"" }; // for picking up
    function prepare(){
        a.xPercent =mouse.Xpercent;
        a.yPercent =mouse.Ypercent;
        a.thisClick = new Ob(); // ready to fill, then compare with lastClicked
        a.name =active.sceneObjects[id].db.name;
        a.itemNotes = (active.sceneObjects[id].db.hasOwnProperty("notes")) ? active.sceneObjects[id].db.notes : "";
        a.notesSplit = a.itemNotes.split(" "); // speeds up searching: only need to check start of each element, not every letter of string
        l("clicked on id:" +id+ " at (" +a.xPercent.toFixed(1)+ "," +a.yPercent.toFixed(1)+ "); name:" +a.name+ "; notes:'" +a.itemNotes+ "'; Checking...");
    }
    function safeToAddEvents(){ // cancels animations, but not TOO much
        if(active.queue.length <1)return 1; // no queue, so it's safe to add events
        function shortenStuff(){            l("XXX shortening stuff");
            function aCountingUpAnimation(){ // e.g. dance: will increment until the end
                let animName = a.animWords[0];
                if(db.animations.hasOwnProperty(animName)){// "dance", "reach", etc.
                    if(db.animations[animName].hasOwnProperty("lastFrame")) // just play frames one after another
                        active.queue[0][2] = db.animations[animName].lastFrame;// jump to the last frame
                    else active.queue[0][2] = db.animations[animName].length -1;// jump to the last frame
                    return 1;
                }return 0;
            }
            a.animWords = active.queue[0][0].split("#");
            if(a.animWords[0]=="walk"){
                active.queueShiftAndStore(); // KEEP IT SIMPLE: don't make them jump to end, just stop.
                if(active.queue.length){ // same again: walking on is often made of TWO walks
                    a.animWords = active.queue[0][0].split("#");
                    if(a.animWords[0]=="walk") active.queueShiftAndStore(); // KEEP IT SIMPLE: don't make them jump to end, just stop.
                }
            }else if(a.animWords[0].substring(0, 5) =="climb") // "climbUpHouse", "climbDownCave", etc.
                active.queue[0][2] = active.queue[0][2] + 30; // jump a couple of seconds ahead // clock.delay ==90 thousandths of a second
            else if(a.animWords[0].substring(0, 3) =="say") // "sayLonger etc.
                active.queueShiftAndStore(); // just cancel ONE say, in case the next one is important
            else if(!aCountingUpAnimation()) // jump to the last frame?
                active.queue[0][2] = 0; // jump to the end of whatever is happening
            // everything else happens automatically anyway, e.g. "goToScene"
            showQueue();
        }
        function anySceneChanges(){// click should NOT work if you are about to change a scene
            if(active.queue.length <1)return 0; // no chance of a scene change
            for(a.i=0; a.i<active.queue.length; a.i++){ // look through queue
                a.animWords = active.queue[a.i][0].split("#");
                if(a.animWords[0] =="goToScene"){ l("ignoring click becaue a scene change is already queued up");
                    return 1; // found a scene change
                }// "climbUp..." always adds a scene change after it at the same time
            }return 0;
        }
        function anythingTakesTime(){
            if(active.queue.length <1)return 0;
            for(a.i=0; a.i<active.queue.length; a.i++){ // look through queue
                if(active.queue[a.i][2] >5){ // queue[a.i] =[str,who,0]  so [a.i][2] is the timer
                    l("Ignoring click: waiting for '" +active.queue[a.i][0]+ "' to play.")
                    showQueue();
                    return 1; // found an animation of non-trivial length
                }
            }return 0;
        }
        shortenStuff()
        if(anySceneChanges())return 0;// not safe to add events yet: you're not staying in this room
        if(anythingTakesTime())return 0;// the next event might change your mind about clicking
        return 1; // it's safe to add events to the queue
    }
    function checkSpecialLocation(){ // just a picture (e.g. Stonehenge)?
        if((id=="wall")&&(nav.atMapScene == 2)){ // use hotspots instead
            a.name =""; // for now
            a.hotspots = db.mapLocations[nav.mapPixel].hotspots;// e.g. [[9,45,91,82,"monoliths","notes"],[etc]]
            for(a.i=0; a.i<a.hotspots.length; a.i++){ // stuff demanded by the story
                if((a.xPercent >=a.hotspots[a.i][0])   // between [x1,y1,x2,y2]
                    &&(a.xPercent <=a.hotspots[a.i][2])
                    &&(a.yPercent >=a.hotspots[a.i][1])
                    &&(a.yPercent <=a.hotspots[a.i][3])){
                        a.name = a.hotspots[a.i][4];
                        a.itemNotes = a.hotspots[a.i][5];
                        a.notesSplit = a.itemNotes.split(" ");
                        l("XXX clicked on (" +a.xPercent.toFixed(2)+ "," +a.yPercent.toFixed(2)+ "), hotspot '" +a.i+ "' in mapPixel:"); console.log(db.mapLocations[nav.mapPixel]);
                        // do NOT break: might be "sky", later hotspot might be object ON the sky
                }
            }
            if(a.name ==""){ // didn't find anything?
                if(a.yPercent >53) a.name="ground";
                else a.name = ((nav.sceneY % 10) ==0) ? "sky" : "wall"; // y value ends in 0? must be outside
            }
            a.thisClick.db.name =a.name; // that's all you need. A map scene only has "name" and "itemNotes" - nothing else matters. E.g. cannot pick up.
            a.thisClick.db.notes =a.itemNotes;
            a.thisClick.db.heft =-999; // means "can't pick that up right now" - don't actually know what it is
        }else{// a regular item?
            a.thisClick = active.sceneObjects[id];
            if(active.sceneObjects[id].db.hasOwnProperty("notes")) a.itemNotes = active.sceneObjects[id].db.notes;
        }
    }
    function maybeWalkTo(){
        if(active.person =="") return; // person is on screen (not the map etc.)
        // walk to click
        a.targetX =checkX(mouse.Xpercent,active.person,"notIfClose"); //"notIfClose" means return -999 if "already close enough"
        if(a.targetX ==-999)return; // means "don't bother"
        l("XXX clicked to walk.");showQueue();

        walk(a.targetX);  // still here? do it!
    }
    function DO_SOMETHING(){ // WHERE THE GAME HAPPENS!!! CHOICES ARE MADE!!!
                    // maybe also use 'matches' - checks name AND notes
        function checkCutScene(){
            for(a.i=0; a.i<a.notesSplit.length; a.i++){ // look through queue
                if(a.notesSplit[a.i].includes("^")){ //clickCutScene^climbUpCave3 etc. // uses '^' to avoid confusion with '#'
                    a.notesSplit2 = a.notesSplit[a.i].split("^");
                    if(a.notesSplit2[0] =="clickCutScene"){
                        if(db.cutScenes.hasOwnProperty(a.notesSplit2[1]))db.cutScenes[a.notesSplit2[1]]();
                        else{l("WARNING: cutScene '" +a.notesSplit2[1]+ "' not found.");
                        }return 1;
                    }
                }
            }return 0;
        }
        checkMouseClick(id);
        if(mouse.clickDone)return; // handled by story code
        // door ?
        if(id.substring(0, 4) =="door") return goToScene(id);
        // house ?
        if(a.notesSplit.includes("house")) return goToScene(id); // castle also has " house " in notes. Castle name defined in db.special[3]
        // cut scene ?
        if(checkCutScene())return;
        // default
        a.cos = (active.sceneObjects[id].db.hasOwnProperty("cos")) ? active.sceneObjects[id].db.cos : "(person)"; // to show png name
        say("clicked on " +id+ ": '" +a.name+ "', " +a.cos); // NOTE: people have no "cos" (see CSS)
    }
    function maybePickUp(){
        function findInventorySpace(){
            for(a.key in active.inventory)
                if((active.inventory[a.key] =="")&&(a.key !=="dropped")){ // do not fill "dropped" space
                    a.inventorySpace = a.key;// e.g. "inv0"
                    return;
                }
            a.inventorySpace ="";
        }
        function pickUp(){
            function hidePickedUpObject(){
                active.sceneObjects[id] = new Ob();
                active.sceneObjects[id].x = -999;
                a.el = O(id);
                a.el.style.width ="0px";
                a.el.style.left ="-999px";
                active.changes.add("removed",id);
                showChanges();
            }
            findInventorySpace();
            if(a.inventorySpace ==""){
                say("I can't pick up the " +a.thisClick.db.name+ ", my bag is full. (Click the score to see the bag)");
                return;
            }
            say("I'll pick up this " +a.thisClick.db.name+ ", it might be useful. (Click the score to see the bag)");
            l("adding " +a.thisClick.db.name+ " to inventory space '" +a.inventorySpace+ "'");
            active.inventory[a.inventorySpace]= a.thisClick;
            hidePickedUpObject();
        }
        if(mouse.clickDone)return; // already handled by story code
        if(a.thisClick == active.lastClicked){
            switch(a.thisClick.db.heft){
                case 1: {pickUp(); l("picking up " +a.thisClick.db.name+ " (heft 1)");
                    break;} // small item
                case 2: {pickUp();  l("picking up " +a.thisClick.db.name+ " (heft 2)");
                    break;}// large but easy to carry
                case 3: {say("I don't think I can pick that up."); break;}// unwieldy or needs two people at least
                case 4: {say("Pick that up? you muct be joking."); break;}// e.g. house
                case 5: {say("Pick that up? yeah, right."); break;}// e.g. mountains
                case -1: {say("I can't pick it up, I think it's glued down."); break;}
                case -2: {say("I can't pick it up, I think it's bolted down."); break;}
                case -3: {say("I can't pick that up, and besides, it's stuck in the ground."); break;}// e.g. small tree
                case -4: {say("Pick that up? You must be joking!"); break;}// e.g. large tree
                case -0: {say("I don't think that's the sort of thing you pick up."); break;}// e.g. a hole
                case -999: {say("I don't think I should try to pick that up."); break;}// just a picture on a map location
                default : {say("I's better not try to pick that up.")}
            }
        }
        active.lastClicked = a.thisClick;
        l("picked up " +a.thisClick.db.name+ "? (Must click twice to pick up)");
    }
    prepare();  l("XXX 1");
    if(!safeToAddEvents())return; // not safe to react to a click while changing scene (or major conversation that might change how you feel)
    checkSpecialLocation();// just a picture (e.g. Stonehenge)?
    maybeWalkTo();
    DO_SOMETHING();
    maybePickUp();
    startClock(); // for testing purposes
}
function climbDownCave(){// when queue is triggered: cut to scene above, show animation, cut to scene above
    let a={"who":"", "id":""};
    a.who =arguments[0];
    if(a.who=="_READ_QUEUE_FRAME1"){// reads whatever is in the queue
        a.who =checkAlias(active.queue[0][1], 1);
        a.id= active.getIdFromName(a.who);
        active.sceneObjects[a.id].x = 49.4;
        active.sceneObjects[a.id].y = 0; // measured from the bottom (this is a full height animation)
        db.animations.climbDownCave.tempScale = gameSize.height * 0.75/db.animations.climbDownCave.frameHeight; // px * 0.75 / px
    }//_____end_of_READ_QUEUE_FRAME1________________________________________________________________________________________________________________________________
    else{ // add to the queue
        a.who =typeof(a.who) !=='undefined'? a.who : active.person;
        active.queue.push(["climbDownCave",a.who,0]); // last number is current frame
    }
}
function climbDownHouse(){
    let a={"houseId":"", "who":"", "str":"", "lastXdigit":0,
            "getHouseId": function(){ // get house id based on sceneX
                //    every ten scene block is like this: // [2,0] = last digit in [sceneX,sceneY]
                //    [0,0]               [1,0]             [2,0][3,0]      [4,0][5,0]     [6,0][7,0]     [8,0][9,0] // outside
                //    [0,1] entry lounge  [1,1] bedroom     [2,1][3,1]      [4,1][5,1]     [6,1][7,1]     [8,1][9,1] etc.// inside
                //    floorObj0                             floorObj1       floorObj2      floorObj3      castle
                a.lastXdigit = nav.sceneX % 10; // 0,1=floorObj0   2,3=floorObj1   4,5=floorObj2   6,7=floorObj3
                a.houseId = "floorObj" + Math.floor(a.lastXdigit/2); // e.g. lastXdigit==3 ? "floorObj1"
                if(a.houseId =="floorObj4")a.houseId ="floorObj3"; // no floorObj4
            }
        };
    if(arguments[0]=="_READ_QUEUE_FRAME1"){// reads whatever is in the queue
        if(ab.getClimbHouseData(db.animations.climbDownHouse) =="error")return; // sets position of animation. CoreFunctions then play the animation to its end.
    }//_____end_of_READ_QUEUE_FRAME1________________________________________________________________________________________________________________________________
    else{ // add to the queue
        if((nav.sceneY % 10)==0){ l("ERROR: last Y digit is zero! Already outside, so cannot climb down from a house.");
            return;
        }; // 0=outside;
        a.who   =arguments[1]; a.who =typeof(a.who) !=='undefined'? a.who : active.person;
        function simpleClimb(){
            a.getHouseId();// sets a.houseId
            active.queue.push(["climbDownHouse " + a.houseId, a.who,0]); // e.g. "climbUpHouse floorObj2" // last number is current frame
        }
        say("I will climb out of the window!");
        goToScene("outside");
        noWalkIn();
        noStrangers();
        simpleClimb();
        goToScene("west");
        say("I got away in case anyone saw me");
    }
}
function climbUpCave(){// triggered by entering a cave with Z=-1,Z=-3, etc. where the previous cave was lower
    let a={"who":"", "id":""};
    a.who =arguments[0];
    if(a.who=="_READ_QUEUE_FRAME1"){// reads whatever is in the queue
        if((nav.sceneZ %2) !=-1){
            l("ERROR: cannot 'climbUpCave': sceneZ is " +nav.sceneZ+ ", needs to be -1,-3, etc.");
            return;
        }
        a.who =checkAlias(active.queue[0][1], 1);
        a.id= active.getIdFromName(a.who);
        active.sceneObjects[a.id].x = 49.4;
        active.sceneObjects[a.id].y = 0; // measured from the bottom (this is a full height animation)
        db.animations.climbUpCave.tempScale = gameSize.height * 0.75/db.animations.climbUpCave.frameHeight; // scene is 0.75 x game height
    }//_____end_of_READ_QUEUE_FRAME1________________________________________________________________________________________________________________________________
    else{ // add to the queue
        a.who =typeof(a.who) !=='undefined'? a.who : active.person;
        active.queue.push(["climbUpCave",a.who,0]); // last number is current frame
    }
}
function climbUpHouse(){
    let a={"houseWanted":"", "who":""}; // filling queue

    if(arguments[0]=="_READ_QUEUE_FRAME1"){// reads whatever is in the queue
        if(![" city "," town "," village "," govt ", " alien "].includes(nav.sceneType)){ l("ERROR: cannot 'climbHouse Now', this is not a city/town etc.");
            return;  }
        if(ab.getClimbHouseData(db.animations.climbUpHouse) =="error")return; // sets position of animation. CoreFunctions then play the animation to its end.
    }//_____end_of_READ_QUEUE_FRAME1________________________________________________________________________________________________________________________________
    else{ // add to the queue
        a.houseWanted =arguments[0];
        a.who   =arguments[1];
        function checkInput(){ // might say "house1" instead of "floorObj1"
            a.houseWanted =typeof(a.houseWanted) !=='undefined'? a.houseWanted : "floorObj2";
            a.who =typeof(a.who) !=='undefined'? a.who : active.person;
            switch(a.houseWanted){ // different inputs
                case "house"  : {a.houseWanted ="floorObj1"; break; } // any old house?
                case "house0"  : {a.houseWanted ="floorObj0"; break; }
                case "house1"  : {a.houseWanted ="floorObj1"; break; }
                case "house2"  : {a.houseWanted ="floorObj2"; break; }
                case "house3"  : {a.houseWanted ="floorObj3"; break; }
                default: {a.houseWanted ="floorObj1"; break; }
            }
        }
        function simpleClimb(){
            active.queue.push(["climbUpHouse#" + a.houseWanted, a.who,0]); // e.g. "climbUpHouse floorObj2" // last number is current frame
        }
        checkInput();
        say("I will go west");
        goToScene("west");
        say("I will come back and climb up");
        goToScene("east");
        noWalkIn();
        noStrangers();
        simpleClimb();
        goToScene(a.houseWanted + "-bedroom"); // e.g. "floorObj3-bedroom" - no spaces, as this is all the same variable
        say("I yam inside!");
        showQueue();
    }
}
function dance(){
    let a={"who":arguments[1]};
    a.who =typeof(a.who) !=='undefined'? a.who : active.person;
    active.queue.push(["dance",a.who,0]); // SIMPLE: no need for "checkFirstFrame()" to call "_READ_QUEUE_FRAME1" option
                                          // "CHANGE_DOM_BASED_ON_NAME_AND_FRAME()" increments whatever animation is named
}
function enter(who){ // queues up "addPersonNoQueue"
    if(who=="_READ_QUEUE_FRAME1"){
        ab.animWords = active.queue[0][0].split("#");
        active.queue.shift(); // remove "enter" - "checkAlias" will do the rest
        checkAlias(ab.animWords[1],1); // the "1" forces them on screen if not already there
    }
    //_____end_of_READ_QUEUE_FRAME1________________________________________________________________________________________________________________________________
    else active.queue.push([ "enter#" +who, "nobody", 0]); // "nobody" means nobody has an animation called "enter"
}
function goToScene(what){// e.g. goToScene("west") or goToScene(123,456)
    let a={ "Y":0, "Z":0,  // setting queue
            "animWords":[], "newX":0, "newY":0, "newZ":0, "doorNum":0,// "0" in "door0" etc.
            "sceneIncrement":10, // outside: move by 10
            "jump":1, "betweenLevels":0 // for "up3", "down8", etc
    };
    l("XXX goToScene");

    if(what=="_READ_QUEUE_FRAME1"){ // reads whatever is in the queue
        l("goToScene(" +what+ ")");
        function setVariables(){
            // reminder:    active.queue = [ [what,who,frame],[etc],]
            a.animWords  = active.queue[0][0].split("#"); // "goToScene#123#456#789" -> ["goToScene","123","456","789"]
            a.newX =a.animWords[1]; a.newY =a.animWords[2]; a.newZ =a.animWords[3];
            if(a.newY =="")a.newY =nav.sceneY; // "" = default
            if(a.newZ =="")a.newZ =nav.sceneZ;
            if(nav.sceneZ ==0) a.sceneIncrement = ( nav.sceneY % 10 ) ? 1 : 10; // division by 10 gives b remainder? Then you are inside.
            else a.sceneIncrement =1; // below ground or above, for now) move 1 at a time

                            //l("sceneIncrement: sceneY=" +nav.sceneY+ ", last digit=" +nav.sceneY % 10+ ", so sceneIncrement=" + b.sceneIncrement);
            // "door" etc
            if(typeof(a.newX)=="string"){ // "door2", "east", etc,
                if(a.newX.substring(0, 4) =="door"){
                    a.doorNum = a.newX.charAt(4),// gets last letter: "0", "3", etc.
                    a.newX = nav.getDoorDirection(Number(a.doorNum)); // door0 -> correct "north", "south", etc.
                }
            }
            l("XXX goToScene _READ_QUEUE_FRAME1 x=" +a.newX+ ", y=" +a.newY+ ", z=" +a.newZ+ ", typeof(x)='" +typeof(a.newX));

        }
        function getSceneNumbers(){ // could be "floorObj0-bedroom"
            function toRoom(x,y){ // changes (1,0) to internal room (sceneX,sceneY)
                a.newX = 10 * Math.floor(nav.sceneX/10);// strips the last zero: i.e. takes you outside
                a.newX = a.newX +x; // goes to that inside room
                a.newY = 10 * Math.floor(nav.sceneY/10);// strips the last zero: i.e. takes you outside
                a.newY = a.newY +y; // goes to that inside room
            }
            //    last digit = inside room
            //    [0,0]               [1,0]             [2,0][3,0]      [4,0][5,0]     [6,0][7,0]     [8,0][9,0] // outside
            //    house0                                house1          house2         house3         castle
            //    [0,1] entry lounge  [1,1] bedroom     [2,1][3,1]      [4,1][5,1]     [6,1][7,1]     [8,1][9,1]
            //    [0,2] lounge        [1,2] bathroom    [2,2][3,2]      [4,2][5,2]     [6,2][7,2]     [8,2][9,2]
            //    [0,3] kitchen       [1,3] bedroom     [2,3][3,3]      [4,3][5,3]     [6,3][7,3]     [8,3][9,3]
            //    [0,4] etc. unused
            function checkJump(){
                a.betweenLevels = nav.sceneZ % 2;
                a.jump = 2; // default: go to the same kind of cave (between->between or normal-<normal)
                if(a.newX.substring(0,2)=="up"){ // up, up2, up500, etc.
                    if(a.newX =="up") return;// simple, nothing to do
                    a.jump = a.newX.substring(2); // the rest of the string
                    a.jump = parseInt(a.jump);
                    if(a.jump ==0)a.jump = a.betweenLevels ? 1 : 2;// in case there was nothing, or not a number
                    else if(a.jump <0)a.jump = 0 -a.jump;//so "up-3" becomes "up3" not "down3"
                    a.newX = "up";
                }else if(a.newX.substring(0,4)=="down"){ if(a.newX =="down") return;// simple, nothing to do
                    a.jump = a.newX.substring(4); a.jump = parseInt(a.jump);
                    if(a.jump ==0)a.jump = a.betweenLevels ? 1 : 2;
                    else if(a.jump <0)a.jump = 0 -a.jump;
                    a.newX = "down";
                }
            }checkJump();
            switch(a.newX){
                case "west"  : {a.newX =nav.sceneX-a.sceneIncrement; a.newY =nav.sceneY; nav.entranceDoor ="door2"; break; }
                case "north" : {a.newX =nav.sceneX; a.newY =nav.sceneY-a.sceneIncrement; nav.entranceDoor ="door3"; break; }
                case "east"  : {a.newX =nav.sceneX+a.sceneIncrement; a.newY =nav.sceneY; nav.entranceDoor ="door0"; break; }
                case "south" : {a.newX =nav.sceneX; a.newY =nav.sceneY+a.sceneIncrement; nav.entranceDoor ="door1";  break; }
                case "up"    : {a.newX =nav.sceneX; a.newY =nav.sceneY; a.newZ =nav.sceneZ +a.jump; nav.entranceDoor ="door1";  break; }
                case "down"  : {a.newX =nav.sceneX; a.newY =nav.sceneY; a.newZ =nav.sceneZ -a.jump; nav.entranceDoor ="door1";
                l("XXX calculating climb down: nav.sceneX=" +nav.sceneX+ ", a.newX=" +a.newX);
                break; }
                case "outside":{
                                a.newX =10 * Math.floor(nav.sceneX/10); // convert last digit into zero
                                a.newY =10 * Math.floor(nav.sceneY/10);
                                a.newZ =10 * Math.floor(nav.sceneZ/10);
                                if((nav.sceneY % 10)==0){ l("ERROR: cannot goToScene('outside') - already outside!");
                                } break;
                }
                case "floorObj0"  : {toRoom(0,1); break; }
                case "floorObj0-bedroom"  : {toRoom(1,3); break; }
                case "floorObj1"  : {toRoom(2,1); break; }
                case "floorObj1-bedroom"  : {toRoom(3,3); break; }
                case "floorObj2"  : {toRoom(4,1); break; }
                case "floorObj2-bedroom"  : {toRoom(5,3); break; }
                case "floorObj3"  : {toRoom(6,1); break; }
                case "floorObj3-bedroom"  : {toRoom(7,3); break; }
                case "castle"     : {a.newX =nav.sceneX +8; break;}// clickOn sends id as "castle"
            }
        }
        function validScene(){
            if(isNaN(a.newX)){ // isNaN: cannot be automatically converted into a number
                 l("ERROR: do not recognise scene '" +a.newX+ "'");
                return 0;
            }
            // check the numbers one more time
            if((nav.sceneZ ==0)&&((a.newY % 10) ==0)) a.newX = Math.floor(a.newX / 10) * 10; // on surface: some locations are not valid
                                     // lastY zero => outside, so lastX must be zero as well
            return 1;
        }
        function doItNow(){
            nav.sceneX = parseInt(a.newX);
            nav.sceneY = parseInt(a.newY);
            nav.sceneZ = parseInt(a.newZ);
            active.queueShiftAndStore(); // remembers this new location in list
            fillScene(); // NEEDS CLOCK TO RUN!!! If you turned off the game clock nothing will happen.
        }
        function canGoThere(){ // trapped? needs a boat?
            return 1;
        }
        setVariables();
        getSceneNumbers(); // "east", "bedroom", etc. IGNORED if newX is already a number
        if(validScene()){ // surface scenes must be multiples of 10
            if(canGoThere())// trapped? need a boat?
                doItNow(); // "a.newX" finally becomes "nav.sceneX"
        }

    }//_____end_of_READ_QUEUE_FRAME1________________________________________________________________________________________________________________________________
    else{ // add to the queue
        a.Y =arguments[1]; a.Y =typeof(a.Y) !=='undefined'? a.Y : "";
        a.Z =arguments[2]; a.Z =typeof(a.Z) !=='undefined'? a.Z : "";
        l("XXX goToScene x=" +what+ ", y=" +a.Y+ ", z=" +a.Z+ ", typeof(x)='" +typeof(what)+ "'");
        active.queue.push([ "goToScene#" +what+ "#" +a.Y+ "#" +a.Z, "nobody", 0]); // e.g. "goToScene 123 456 789", "",0 //only first string matters (""=who,0=frame)
    }
}
function health(onOff){// includes code used in "notify" box. Do not confuse with "changeStatusText" - that is automatic, in coreFunctions
    let a={ "key":0, "daysUnderground":0, "hoursUnderground":0, "underString":"",
            "inventoryCount":0, "inventoryString":"", "toDrop":0, "split":[]};
    function checkUnderground(){
        if(nav.sceneZ >-1){
            O("undergroundStats").style.display ="none";
            return;
        }else O("undergroundStats").style.display ="inline-block";
        a.hoursUnderground = active.health.hoursUnderground;
        a.daysUnderground =0;
        while(a.hoursUnderground >=24){
            a.hoursUnderground -=24;
            a.daysUnderground++;
        }
        a.underString = "0 hours"; // default
        if(a.daysUnderground >0)a.underString = a.daysUnderground + "day";
        if(a.daysUnderground >1)a.underString += "s";
        if((a.daysUnderground >0)&&(a.hoursUnderground >0))a.underString += " and ";
        if(a.hoursUnderground >0)a.underString = a.underString + a.hoursUnderground + " hour";
        if(a.hoursUnderground >1)a.underString += "s";
        O("timeUnderground").innerHTML =a.underString;
        O("foodAndWater").innerHTML =active.health.foodAndWater + " days";
    }
    function showInventory(){ // NO IMAGE: mapScene has no image; and for the rest, the img.src needs the id path (e.g. "floorObjs")- gets complicated
        a.inventoryCount =0;
        a.inventoryString ="";//"Select an item TWICE to pick it up";
        for(a.key in active.inventory){// read through inventory
            if((a.key !="dropped")&&(active.inventory[a.key] !="")){ // something there?
                a.inventoryCount++;
                a.inventoryString = a.inventoryString
                                    +"<br/>"
                                    +"<span onclick='javascript:checkMouseClick(\"" +active.inventory[a.key].db.name+ "\")'>"
                                        +"<img src='" +active.inventory[a.key].db.cos+ "' style='width:4em;height:1.5em;display:inline-block;'>"
                                        +"<span style='position:relative;left:4.3em;'>" +active.inventory[a.key].db.name
                                            +" &nbsp; <span class='faint' onclick='javascript:health(\"drop#" +a.key+ "\")'>(drop?)</span>"
                                        +"</span>"
                                    +"</span>";
            }
        }
        if((active.inventory.dropped !=="")&&(a.inventoryCount <5))// something dropped, and space to put it back?
                a.inventoryString = a.inventoryString +"<br/><span onclick='javascript:health(\"undrop\")'>(Pick up " +active.inventory.dropped.db.name +" again?)</span>";
        else if(a.inventoryCount ==0) a.inventoryString ="<br/>Select an item TWICE to pick it up"; // Nothing picked up? Tell them how.
        O("inventory").innerHTML =a.inventoryString;
    }
    if(onOff =="toggle"){// turning on or off
        if(O("healthBox").offsetParent == null){// not visible (does not show up in DOM)
            l("XXX toggling: currently hidden");
            clock.gamePaused =1;
            O("healthBox").style.display ="inline-block";
            O("heroName").innerHTML = active.person;
            O("heroScore").innerHTML = active.health.heroScore;
            O("heroMoney").innerHTML = active.health.heroMoney;
            checkUnderground();
            showInventory();
        }else onOff ="off";
    }
    if(onOff =="off"){
        clock.gamePaused =0;
        O("healthBox").style.display ="none"
        return;
    }// still here?
    if(onOff.substring(0,4) =="drop"){// "drop#inv2" etc
        a.split = onOff.split("#")
        a.toDrop = a.split[1]; // e.g. "inv2"
        active.inventory.dropped = active.inventory[a.toDrop];// drop one
        active.inventory[a.toDrop] ="";
    }else if(onOff =="undrop"){
        for(a.key in active.inventory){// // find a space
            if(active.inventory[a.key] ==""){ // unused?
                active.inventory[a.key] = active.inventory.dropped;
                 active.inventory.dropped ="";
            }
        }
    }
    showInventory();
}
function jumpTo(who,x,y,unshift=0){
    let a={ "id":""};
    if(who=="_READ_QUEUE_FRAME1"){
        ab.animWords = active.queue[0][0].split("#");
        who =checkAlias(ab.animWords[1]);
        x =ab.animWords[2];
        y =ab.animWords[3];
        a.id =getPersonId(who);
        active.sceneObjects[a.id].x =parseInt(x);
        active.sceneObjects[a.id].y =parseInt(y);
    }
    //_____end_of_READ_QUEUE_FRAME1________________________________________________________________________________________________________________________________
    else if(unshift) active.queue.unshift([ "jumpTo#" +who+"#"+x+"#"+y,  who, 0]);
            else     active.queue.push([ "jumpTo#"    +who+"#"+x+"#"+y,  who, 0]);
}
function leave(who){
    if(who=="_READ_QUEUE_FRAME1"){
        ab.animWords = active.queue[0][0].split("#");
        who =checkAlias(ab.animWords[1]); // no "1", does not force them here if not
        active.queue.shift(); // remove "leave" - about to replace with "walk"
        active.queue.push([ "walk#-999",who, 0]);// -999 means "removed"
    }
    //_____end_of_READ_QUEUE_FRAME1________________________________________________________________________________________________________________________________
    else active.queue.push([ "leave#" +who, "nobody", 0]); // "nobody" means nobody has an animation called "leave"
}
function needs(what){ // adds to active.changes.wantToAdd, waits for a suitable scene, then moves to the permanent active.changes.list
    let a={ "needsSplit":[], "canWait":1};// 0= force into first room you check? 1= next suitable room? 2= next suitable unchanged room? 3= 2, maybe (random)
    a.canWait =arguments[1]; a.canWait =typeof(a.canWait) !=='undefined'? a.canWait : 2;// default: unchanged and suitable
    if(what=="_READ_QUEUE_FRAME1"){// might need something to appear ONLY at a certain time
        a.needsSplit = active.queue[0][0].split("#");// cannot just use "what" - it has been changed to "_READ_QUEUE_FRAME1"
        showQueue();
        what =a.needsSplit[1];
        a.canWait =a.needsSplit[2];
        active.changes.wantToAdd.push([what,a.canWait]); // "unassigned" is where it waits for a suitable room
        active.queue.shift(); // remove "needs" - no longer needed
        showNeeds();
    }
    //_____end_of_READ_QUEUE_FRAME1________________________________________________________________________________________________________________________________
    else active.queue.push([ "needs#" +what+ "#" +a.canWait, "nobody", 0]); // "nobody" =not linked to a particular person
}
function noStrangers(){
    active.queue.push(["noStrangers","nobody",0]);// autoWalkIn looks for this
}
function noWalkIn(){ // e.g. climbing animations: cannot have hero walking in full size!
    active.queue.push(["noWalkIn","nobody",0]);// autoWalkIn looks for this
}
function notify(what){// includes code used in "notify" box. Do not confuse with "changeStatusText" - that is automatic, in coreFunctions
l("XXX notify(" +what+ ")");
    let a={ "i":0, "iShown":0, "perPage":30, "startAtNext":0, "wasClockRunning":0,
            "whichBookmark":-1, "str":"", "bookmarkClass":"", "bookmarkClass2":"","fontClass":""};
    function boxOn(){
        clock.gamePaused =1;
        O("notifyBox").style.display ="inline-block";
    }
    function boxOff(){
        clock.gamePaused =0;
        O("notifyBox").style.display ="none";
    }
    function showHistory(startAt,justBookmarks){
        O("notifyTitle").innerHTML = (justBookmarks) ? "Bookmarks": "History";
        O("bookmark").className = (justBookmarks) ? "o40": "o1"; // pale or dark?
        a.str = "";
        // not at start?
        if(startAt !=0){
            if(!justBookmarks)a.nextStartAt = startAt -a.perPage; // easy
            else{  // count the previous bookmarks
                a.nextStartAt = startAt; // assume there are no earlier bookmarks
                a.iShown =0; // start counting
                for(a.i =startAt -1; a.i >=0; a.i--){ // step back
                    if(nav.history[a.i][0] ==1){ // found a bookmark?
                        a.iShown++; // count it
                        a.nextStartAt =a.i;// move back to that one
                        if(a.iShown >a.perPage) break;
                    }
                }
            }
            if(a.nextStartAt < startAt)
                a.str ="<a onclick=\"javascript:notify(\'moreHistory\',"+a.nextStartAt+ ")\"> < newer</a><br/>";
        }
        // this list
        a.iShown =0;
        if(startAt <0) startAt =0;
        for(a.i =startAt; a.i <nav.history.length; a.i++){
            if(justBookmarks && nav.history[a.i][0]==0)continue; // skip any not-bookmarked entries
            else{
                a.bookmarkClass = (nav.history[a.i][0] ==1) ? "smallBookmark o1" : "smallBookmark o40";
                a.fontClass = (nav.history[a.i][0] ==1) ? "historyItem bold": "historyItem normal"; // faint image, normal
                a.str= a.str+ "<img id='bookmark" +a.i+ "' src='c\\i\\bookmark-icon.png' class='" +a.bookmarkClass+ "' onclick=\"javascript:notify(\'bookmarkThis\'," +a.i+ ")\"><span id='historyItem" +a.i+ "' class='" +a.fontClass+ "' onclick=\"javascript:notify(\'clickHistoryItem\'," +a.i+ ")\">" +nav.history[a.i][4]+"</span><br/>";
            }
            a.iShown++;
            if(a.iShown >=a.perPage)break;
        }
        // not at end?
        a.nextStartAt = a.i +1;
        if(a.nextStartAt <nav.history.length) a.str =a.str+ "<a onclick=\"javascript:notify(\'moreHistory\',"+a.nextStartAt+ ")\"> older ></a>";
        // nothing found?
        if(a.str =="")a.str = "(to bookmark a location, click the small icon <img src='c\\i\\bookmark-icon.png' class='smallBookmark o40'></img> &nbsp;&nbsp;&nbsp; next to the location name)";
        // show it
        O("notify").innerHTML =a.str;
    }
    a.whichBookmark = arguments[1]; a.whichBookmark =typeof(a.whichBookmark) !=='undefined'? a.whichBookmark : -1;// for notify("bookmarkThis",23)
    switch(what){
        case "bookmark" : {// clicked bookmark icon
            if(O("notifyTitle").innerHTML == "History") showHistory(0,1);// already showing history? show bookmarks
            else showHistory(0,0);
            break;
        }
        case "bookmarkThis" :{ l("clicked bookmark '" +a.whichBookmark+ "'");
            a.str= "bookmark" +a.whichBookmark;
            O(a.str).className = (nav.history[a.whichBookmark][0] ==1) ? "smallBookmark o40" : "smallBookmark o1"; // change the bookmark icon
            a.str= "historyItem" +a.whichBookmark;
            O(a.str).className = (nav.history[a.whichBookmark][0] ==1) ? "historyItem normal" : "historyItem bold"; // change the text
            nav.history[a.whichBookmark][0] = nav.history[a.whichBookmark][0] ? 0 : 1; // flip bookmark status
            break;
        }
        case "clickHistoryItem" :{ l("clicked history item '" +a.whichBookmark+ "'");
            nav.sceneX = nav.history[a.whichBookmark][1];
            nav.sceneY = nav.history[a.whichBookmark][2];
            nav.sceneZ = nav.history[a.whichBookmark][3];
            clock.gamePaused =0;
            fillScene(); // NEEDS CLOCK TO RUN!!! If you turned off the game clock nothing will happen.
            break;
        }
        case "showHistory" : {// clicked history icon
            if(O("notifyBox").style.display =="none"){ // not displayed?
                boxOn();
                showHistory(0,0);
            }else if(O("notifyTitle").innerHTML == "Bookmarks") showHistory(0,0); // already on, but showing bookMarks?
            else boxOff();
            break;
        }
        case "moreHistory" : {
            if(O("notifyTitle").innerHTML == "History") showHistory(a.whichBookmark,0);// show more history
            else showHistory(a.whichBookmark,1); // just bookmarks
            break;
        }
        case "off" : {// clicked X
            boxOff;
            break;
        }
        default : {
            O("notifyTitle").innerHTML = (a.whichBookmark ==-1) ? "&nbsp;" : what; // might be "notify(title,text)"
            O("bookmark").className = "o1"; // dark: may as well give that option
            O("notify").innerHTML = (a.whichBookmark ==-1) ? what : a.whichBookmark; // might be "notify(title,text)"
            boxOn();
        }
    }
}
function reach(){
    let a={"who":arguments[1]};
    a.who =typeof(a.who) !=='undefined'? a.who : active.person;
    active.queue.push(["reach",a.who,0]); // SIMPLE: no need for "checkFirstFrame()" to call "_READ_QUEUE_FRAME1" option
                                          // "CHANGE_DOM_BASED_ON_NAME_AND_FRAME()" increments whatever animation is named
}
function reachLeft(){
    let a={"who":arguments[1]};
    a.who =typeof(a.who) !=='undefined'? a.who : active.person;
    active.queue.push(["reach",a.who,0]); // SIMPLE: no need for "checkFirstFrame()" to call "_READ_QUEUE_FRAME1" option
                                          // "CHANGE_DOM_BASED_ON_NAME_AND_FRAME()" increments whatever animation is named
}
function say(what){// e.g. say("hello#@do I know you?#yes, [friend,mate]#You [remember,recall] me?#@Sorry, no.", "speaker", 0, "friend")// 0=timer

    let a={ "str":"", "textColor":"", "animSplit":[], "i":0, "noAnim":0,
            "who":"", "who2":"", "whoTemp":"", "whotemp2":""}; // whoTemp = who's mouth talks
    if(what=="_READ_QUEUE_FRAME1"){// Set by "actionsWithPeople()" in "coreFunctions"
        function showText(st,col=""){// string, colour. ""=base on whoTemp
            function checkColor(){
                if(col==""){// choose colour based on whoTemp
                    let c={ "whoTempID":"",
                            "hue":0, "luminance":23, "lineDiv":"",
                            "dX":0, "dY":0, "length":0, "angle":0, "topOfHead":0}
                    function prepareColorStuff(){
                        if(a.whoTemp =="")a.whoTemp =active.person;
                        c.whoTempID =getPersonId(a.whoTemp);
                    }
                    function setColor(){
                        if(a.whoTemp ==active.person)col="black";
                        else{c.hue= getPersonPositionInDB(a.whoTemp); //number 1-50
                            c.hue = Math.floor(c.hue * 720/db.people.length); // number 1-720
                            if(c.hue >360){ c.hue-=360; c.luminance =23; } else c.luminance =25;
                            col="hsl(" +c.hue+ ", 100%, " +c.luminance+ "%)"
                        }
                    }
                    function lineToSpeaker(){
                        c.dx = active.sceneObjects[c.whoTempID].x -50;
                        c.dx = gameSize.width * c.dx/100; // in pixels: atan2 depends on the units being square
                        c.topOfHead = getTopOfHead(c.whoTempID);
                        c.dy = 78 -c.topOfHead; // 78 from bottom = 22 from top
                        c.dy = gameSize.height * c.dy/100;
                        if(c.dy <20) c.dy =20; // head higher than line?
                        c.length = 0.93*Math.sqrt( (c.dx*c.dx) + (c.dy*c.dy) );
                        c.angle = Math.atan2(c.dy, c.dx);
                        c.angle = c.angle *180 / Math.PI; // = *360/2pi = in degrees
                        c.lineDiv =O("lineToSpeaker");
                        c.lineDiv.style.width = c.length + "px";
                        c.lineDiv.style.backgroundColor =col;
                        c.lineDiv.style.transform = "rotate(" +c.angle+ "deg)";
                        c.lineDiv.style.display ="inline-block";
                        c.lineDiv.style.webkitAnimation = '';
                        c.lineDiv.className ="quickFadeOut";
                        setTimeout(function() { c.lineDiv =O("lineToSpeaker");
                                                c.lineDiv.style.display ="none";
                                                c.lineDiv.style.webkitAnimation = 'none'; // reset the CSS
                                            }, 2000);
                    }
                    prepareColorStuff();
                    setColor();
                    lineToSpeaker();
                }
            }
            checkColor();
            O("text").innerHTML = "<span style='color:" +col+ ";'>" +st+"</style>"; // add styling
        }
        function noAnimation(){// e.g. in-between cave climbing scene. No special talk animation.
            a.noAnim =0;
            if((nav.sceneZ % 2) ==-1)a.noAnim =1; // divide by -2, leaves 1? Must be an in-between cave climbing scene
            if(a.noAnim){ // VERY simple. Just show everything after "say#"
                showText(active.queue[0][0].substring(4), "black"); l("In cave, so most animations not allowed. Deleting queue[0]")
                active.queue.shift(); // forget that speech. Onto the next thing!
            }
            return a.noAnim;
        }
        function chooseAnimation(){// sayLonger?
            l("XXX chooseAnimation");
            if(a.str.length <20) return "sayShort"; // on its own, "say" triggers db.animations.say
            if(a.str.length <70) return "sayLonger"; // db.animations.sayLonger
            return "sayLongest"; // db.animations.sayLongest (has more frames)
        }
        function checkWhoAndMaybeWho2(){
            a.who =checkAlias(active.queue[0][1], 1); // this was added when first adding to the queue, 1=force that person to be present
            if(active.queue[0].length >3)// includes the name of another speaker?
                a.who2 = checkAlias(active.queue[0][3],1);// queue=[animName,who,frame,optional who2], 1=force that person to be present
            else a.who2 =""; // if no 2nd speaker present, activePerson says those lines
        }
        function unpackSay(){
            function simpleSay(){
                a.str = a.animSplit[1];
                a.whoTemp =a.who;
                if(a.animSplit[0] =="say")// not already changed to "sayLonger" etc
                    active.queue[0][0] =chooseAnimation() + "#" +a.str; // e.g. "sayLonger#bla bla bla". Decides what animation plays
                a.whoTemp2 =a.who2;
            }
            active.queue[0][0] =parseString(active.queue[0][0]); // variables -> story names

            a.animSplit = active.queue[0][0].split("#"); // "hello#@do I know you" -> ["hello","@do I know you?"]
            // multiple "say"?
            if(a.animSplit.length >2){ // more than just ["sayLonger", "hello"]
                active.queue.shift(); // remove the original combined "say" - not "queueShiftAndStore" because will "sayLonger" etc. will be stored
                for(a.i =a.animSplit.length -1; a.i >0; a.i--){// start at end, end with first one (as each one is added to the front)
                    if(a.animSplit[a.i].charAt(0) =="@"){// who2 is speaking?
                        a.str = a.animSplit[a.i].substring(1); // everything from 1 to the end
                        a.whoTemp = a.who2;
                    }else{
                        a.str = a.animSplit[a.i];
                        a.whoTemp = a.who;
                    }
                    a.whoTemp2 = (a.whoTemp ==a.who) ? a.who2 : a.who;
                    if(a.whoTemp2 =="")active.queue.unshift([chooseAnimation() + "#" +a.str, a.whoTemp,0]);
                    else active.queue.unshift([chooseAnimation() + "#" +a.str, a.whoTemp,0, a.whoTemp2]);
                }
            }else simpleSay();
        }
        if(noAnimation())return;
        checkWhoAndMaybeWho2(); // with "checkAlias": forces walk on
        if(active.queue[0][0].substring(0,3) !=="say") // say, sayLonger, etc
                                                return;// because "checkAlias" might "unshift" to insert "walk" first (etc.)
        unpackSay();
        showText(a.str);
    }//_____end_of_READ_QUEUE_FRAME1________________________________________________________________________________________________________________________________
    else{//add to the queue
        a.who =arguments[1]; a.who = typeof(a.who) !=='undefined'? a.who : "activePerson";
        a.who2 =arguments[2]; a.who2 = typeof(a.who2) !=='undefined'? a.who2 : "";
        a.str = "say#" +what;
        if(a.who2 =="")active.queue.push([a.str,a.who,0]);
        else active.queue.push([a.str,a.who,0, a.who2]); // extra person at end
    }
}
function video(which="vidEnd"){// "which=" = default
    // music should play fine at the same time. <audio><source src="bla.ogg" type="audio/ogg"></audio><video><source src="bla.mp4" type="video/mp4"></video>
    let a={"animSplit":[], "vid":"", "source":"", "sourceString":"", "scaleX":1,"scaleY":1, "vidDivStyle":"", "vidLength":5, "z":2000};
    if(which=="_READ_QUEUE_FRAME1"){
        // get video name
        a.animSplit = active.queue[0][0].split("#");
        which = a.animSplit[1]; // e.g. "video#videoName" -> "videoName"
        // get source
        a.sourceString = "i/special/video/" +which+ ".mp4"; l("XXX video a.sourceString='" +a.sourceString+ "'");
        a.source = document.createElement("source");
        a.source.setAttribute("src", a.sourceString);
        a.vid =O("video");
        a.vid.innerHTML = ''; // remove any previous videos
        a.vid.appendChild(a.source);
        // scale
        a.scaleX = gameSize.width / db.videos[which].widthPx;
        a.scaleY = 0.75 * gameSize.height / db.videos[which].heightPx;
        a.vid.style="transform: scaleX(" +a.scaleX+ ") scaleY(" +a.scaleY+ "); transform-origin:0 0;";
        // play
        a.vidLength =10;
        a.vid.play();
        a.z = Math.round(100-active.sceneObjects["person0"].y) -1;
        a.vidDivStyle ="z-index:" +a.z+ "; display:inline-block; ";
        if(which =="vidEnd")a.vidDivStyle = a.vidDivStyle +"opacity:1; animation: vidEnd " +a.vidLength+ "s linear; "; // vidEnd fades up and down again
        else a.vidDivStyle +="opacity:1; ";
        O("videoDiv").style =a.vidDivStyle;
        // ready to remove
        a.vidLength *=1000; // in milliseconds for setTimeout
        setTimeout(function () { video("off"); }, a.vidLength);

    }//_____end_of_READ_QUEUE_FRAME1________________________________________________________________________________________________________________________________
    else if(which =="off"){
        a.vid =O("video");
        a.vid.pause();
        a.vid.innerHTML = ''; // remove any previous videos
        O("videoDiv").style ="display:none;";
    }
    else  active.queue.push(["video#" +which,"nobody",0]);
}
function wait(howLong){// in game frames
    active.queue.push(["wait","nobody",0 -howLong]);// negative amount, as it counts UP
}
function walk(x){// x,y, who. "swim" = walk when in water. "run" = speed up game clock?
    let a={"y":"",  "who":"",  "toPush":1, // e.g. "toPush"
        "str":"", "targetXY":[],  "distFromMid":0, "whoSplit":[] }; // distFromMid = distance from middle of scene (lowest point)
    a.y=arguments[1];a.y =typeof(a.y) !=='undefined'? a.y : "";// string => ignore
    a.who=arguments[2];a.who =typeof(a.who) !=='undefined'? a.who : active.person;
    if(typeof(x)=="undefined"){l("walk(undefined) - walk cancelled");
        return;
    }

    if(typeof(x)=="string"){ // walk("floorObj2") etc.
        a.targetXY =getIdPosition(x); // if can't find an id, checks for "name" on screen
        x = a.targetXY[0];
        a.y = a.targetXY[1];
    }else{ // normal walk
        a.distFromMid =Math.abs(x -50); // distFromMid = distance from middle of scene (lowest point)
        if(nav.sceneType ==" mountains ")a.y = (a.distFromMid/7 -2); // "y" is much lower
        else if(nav.sceneType ==" alien ")a.y=0; // leave plenty of space for weird plants
        a.whoSplit = a.who.split("#");
        if(a.whoSplit[0] =="toShift"){// called by "addPersonNoQueue"
            a.who =a.whoSplit[1]; // the rest of the string
            a.toPush =0;
        }else a.toPush =1;
    }
    a.str = "walk#" +x;
    if(a.y !="")a.str = a.str + "#" +a.y; // e.g. "walk 80 30"
    if(a.toPush) active.queue.push([a.str,a.who,0]);
    else active.queue.unshift([a.str,a.who,0]);// unshift: e.g. 4 people already on screen? Walk off, change, walk on, BEFORE anything else.
}
function yesCancel(text,action){ // see 6-storyEvents-clickYes() // e.g. yesCancel("do you?","result#var#var") -> clickYes() reacts to "result#var#var"
    let a={"animWords":[]};
    if(text=="_READ_QUEUE_FRAME1"){
        showQueue();
        a.animWords = active.queue[0][0].split("#"); // ["yesCancel","text","action","clickY","mapX","mapY","etc"]
        text = a.animWords[1];
        a.animWords = a.animWords.slice(2); // ["action","clickY","mapX","mapY","etc"]
        action = a.animWords.join("#"); // "action#clickY#mapX#mapY#etc"
        showYesCancel(text,action);
    }
    //_____end_of_READ_QUEUE_FRAME1________________________________________________________________________________________________________________________________
    else{   text = "yesCancel#" +text+ "#" +action;
            active.queue.push([text, "nobody", 0]); // "nobody" means nobody has an animation called "yesCancel"
    }
}

loadJavascript("c/5-database_0.js");
