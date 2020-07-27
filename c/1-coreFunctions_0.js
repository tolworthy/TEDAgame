//______________CORE FUNCTIONS________________________

let aa={"nowWalking":0}; // for detecting the first frame. So must be persistent outside of 'getStyleForPerson'
function addListeners(){// fror resizing, preloading
    function listenForQuietTimeToPreload() { // based on code by "equiman" https://stackoverflow.com/questions/667555/how-to-detect-idle-time-in-javascript-elegantly
        window.onload = clock.resetInactivityTimer;
        // DOM Events
        document.onmousemove = clock.resetInactivityTimer;
        document.onmousedown = clock.resetInactivityTimer; // touchscreen presses
        document.ontouchstart = clock.resetInactivityTimer;
        document.onclick = clock.resetInactivityTimer;     // touchpad clicks
    };
    //resize
    window.addEventListener("resize", function (){
        gameSize.width = O("game").clientWidth, gameSize.height = O("game").clientHeight; l("Resized: " +gameSize.width+ "," +gameSize.height)});
    //mouse position
    window.onmousemove=function(e) {
        if (document.all) {
            mouse.Xpercent = event.clientX + document.body.scrollLeft;
            mouse.Ypercent = event.clientY + document.body.scrollTop;
        } else {
            mouse.Xpercent = e.pageX;
            mouse.Ypercent = e.pageY;
        }
        mouse.Xpercent = 100 * mouse.Xpercent /gameSize.width; // as percent
        mouse.Ypercent = 100 * mouse.Ypercent /gameSize.height; // as percent
    };
    // quiet time
    listenForQuietTimeToPreload(); // the last thing: only do when quiet
}
function addPersonFromDatabase(who,id){// copies data from database (who) to id
    let a={"placeInPeople":0,"id":""};
    a.placeInPeople = getPersonPositionInDB(who);
    if(a.placeInPeople <0){l("Cannot find '" +who+ "' in database.");
        return 0;
    }
    active.sceneObjects[id].db = db.people[a.placeInPeople]; // add that whole object
    // remember the scene
    if(who !=active.person){ // they follow you manually, so no need to record their location
        active.peopleScenes[who] = {"nav.sceneX":nav.sceneX, "nav.sceneY":nav.sceneY, "x":a.x};
            // use "a.who", not "id": only 4 "id" db.people, but could be 100s of people in the database
    }
}
function addPersonNoQueue(){ // called by "addPeople", "positionStrangers", and "checkAlias" for last minute forcings
    let a={"id":"person0", "who":"", "x":0, "y":0, "special":"",
            "queueEnd":0, "i":0, "tempId":"", "jumpTo":0};
    a.who = arguments[0]; a.who =typeof(a.who) !=='undefined'? a.who : active.person;
    a.x = arguments[1]; x =typeof(a.x) !=='undefined'? a.x : 50;
    a.y = arguments[2]; y =typeof(a.y) !=='undefined'? a.y : gameSize.midFloorY;
    a.special = arguments[3]; a.special =typeof(a.special) !=='undefined'? a.special : ""; // e.g. stranger: different z number
    a.jumpTo =0; //for now
        // scale: see "scaleDirectionRotate" in "getStyleForPerson"

    function alreadyThere(){
        for(a.i=0; a.i<4; a.i++){
            a.tempId ="person" +a.i;
            if(samePerson(a.tempId,a.who)&&(active.sceneObjects[a.tempId].x >0)){
                l("'" +a.who+"' (" +a.tempId+ ") is already on screen. No need to add.");
                return 1;
            }
        }return 0;
    }

    function checkIfAtSea(){
        if(nav.sceneType ==" sea "){
            if(a.who !="ship"){// not a boat?   KEEP IT SIMPLE:   very few ships in the game. Can list them all here.
                if(a.who ==active.person){ // not checkAlias or "samePerson" - only take a PRECISE match
                    active.personInShip =a.who; // remember them for when you leave
                    active.person = "ship"
                    a.who = "ship"; // replace them with a ship
                }else{ l("ERROR: trying to add " +a.who+ " in the sea, but they are not a ship");
                    return;}
            }
        }else{ //  not " sea "
            if(a.who =="ship"){// still a ship from last time?
                if(active.personInShip == ""){ l("ERROR: trying to leave a ship, but no ship person is defined");
                    return;
                }else {active.person = active.personInShip; // read the previously saved name
                    a.who = active.person;
                    active.personInShip =""; // not in ship any more
                }
            }
        }
    }
    function chooseId(){ // which of the 4 person divs?
        // a.special
        if(a.special=="stranger0")      {a.id = "person2"; a.jumpTo =1;}
        else if(a.special =="stranger1"){a.id = "person3"; a.jumpTo =1;}// moves to -999 when emptying scene
        // else
        else if(a.who ==active.person)a.id ="person0"; // for now, assign to hero
        else if(!onScreen("person1")) a.id ="person1";
        else if(!onScreen("person2")) a.id ="person2";
        else if(!onScreen("person3")) a.id ="person3";
        else { l("WARNING: chooseId: (" +a.who+ ") has no free slots. Gonna use person3. They need to walk off first.");
            a.id ="person3";
        }
    }
    function autoWalkIn(){ // NEVER CALL MANUALLY. Called  by "addPersonNoQueue" at the last moment.
        let b={"fromX":gameSize.edgeX, // always LESS THAN 10. Counts as "not yet on screen" because 'addPersonNoQueue' can confuse the queue.
                "fromY":10, "toX1":20, "toX2":30, // default: from north (entering room / leaving house)
                "walkOutFirst":0,"i":0};// hash = how strings are divided
        function decidePath(){
            switch(nav.sceneType){
                case " mountains " :{ b.fromY=5; break; }// path is very low
                case " alien " :{ b.fromY=0; break; }// path is EXTREMELY low
            }
            switch(nav.entranceDoor){
                case "door3"  : { b.fromX=96; b.toX1=90;  b.toX2 =80; break; }
                case "door0"  : { b.fromX=3; b.fromY = 10; b.toX1=20; b.toX2 =30; break; }
                case "door2"   : { b.fromX= 100 -gameSize.edgeX; b.fromY =15; b.toX1=80; b.toX2 =70;  break; }
            }
        }
        function prepareWalkIn(fromOffScreen=1){
            if(fromOffScreen){ // if already on screen, no need to place them at astarting point almost offscreen
                active.sceneObjects[a.id].x =parseInt(b.fromX);
                active.sceneObjects[a.id].y =parseInt(b.fromY);
            }
            if(a.id=="person0")b.toX2 =30;  // don't all stand in the same place
            else if(a.id=="person1")b.toX2 =20;
            else if(a.id=="person2")b.toX2 =38;
            else b.toX2 = 46;
            b.toX2 = checkX(b.toX2,a.who); // final stage: don't end up behind a lamppost
        }
        function cancelWalk(){ // don't risk auto-walking in circles
            if(active.queue.length <1) return 0; // nothing queued, you are OK
            if((active.queue[0][0].substring(0, 4) =="walk")&&(samePerson(active.queue[0][1],a.who))){ l("cancel autoWalkIn# hero is walking already");
                    return 1;  }
            if(active.queue[0][0] =="noWalkIn"){l("noWalkIn [0] - deleting queue[0]");
                active.queue.shift(); // no longer needed
                return 1;
            }// might be next, after "noStrangers": THIS IS A FUDGE: do not add any more "extras" like "noWalkIn" and "noStrangers"
            if((active.queue.length >1)&&(active.queue[1][0] =="noWalkIn")){l("noWalkIn [0]"); // position 1?
                active.queue.splice(1,1);
                return 1;
            }
            if(typeof(b.toX1) !="number")return 1; // not a meaningful number

            return 0;
        }
        function screenIsFull(){;("XXX checking is screen is full:");
            if(!onScreen("person0"))return 0;
            if(!onScreen("person1"))return 0;
            if(!onScreen("person2"))return 0;
            if(!onScreen("person3"))return 0;
            return 1;
        }
        function maybeWalkOutFirst(){ // person is on screen, so no need to add: can just queue up changes
            if(screenIsFull()){  // need person3 to walk out before changing
                prepareWalkIn(0); // 0 = do NOT place them near theexit to start with
                // IN REVERSE ORDER because of UNSHIFT
                walk(b.toX2,gameSize.midFloorY,"toShift#" +a.who); // "autoWalkin" tells "walk" to add it to the start
                walk(b.toX1,gameSize.midFloorY,"toShift#" +a.who); // X2 before X1, because added to the start
                assignPersonToID(a.who,a.id,0); // 0 =not push, but unshift!
                walk(-10,gameSize.midFloorY,"toShift#" +active.sceneObjects.person3.db.name); // this is CURRENT person3
                return 1;
            }return 0;
        }
        function queueUpJumpTo(){
            prepareWalkIn();
            jumpTo(a.who, b.toX2, b.fromY,1); // 1 = unshift
        }
        function queueStuffUp(){ // IN REVERSE ORDER because of UNSHIFT.
            if(!cancelWalk()){// check BEFORE unshifting stuff, as it only checks queue [0] and [1]
                prepareWalkIn();
                walk(b.toX2,gameSize.midFloorY,"toShift#" +a.who); // "toShift" = add to the start
                walk(b.toX1,gameSize.midFloorY,"toShift#" +a.who); // reverse order, due to toShift
            }
        }
        if(alreadyThere())  return;
        // still here? Must walk on
        decidePath();
        if(maybeWalkOutFirst())return; // in this case, do not add person until off screen.
        // why not queue up the regular add as well? Because other code (BEFORE the queue runs) assumes that person has a costume assigned.

        // still here? Just add immediately and THEN queue up walking in.
        addPersonFromDatabase(a.who, a.id);
        if(a.jumpTo)queueUpJumpTo();
        else queueStuffUp();
    }
    function changeDOM(){
        // ****** T H I S   I S   I T ! ! ! ************  AGAIN !!!   "addPersonNoQueue" happens outside the queue !!!!
        //**********************************************
        //**********************************************
        //**********************************************
        //**********************************************
        let b={"personDiv":"", "baseClass":"", "str":""};
        b.personDiv =O(a.id);
        b.personDiv.className =  a.special.includes("stranger") ? "person strangerZ" : "person"; // position:absolute etc.
        b.str= getStyleForPerson(a.id,a.special);
        b.personDiv.style= b.str;
        //**********************************************
        //**********************************************
        //**********************************************
        //**********************************************
    }
    checkIfAtSea();
    if (alreadyThere()){ l("XXX " +a.who+ " (" +a.id+ ") is already here");
        return;}// autoWalkIn is cancelled if already on screen, or climbing in cave, etc
    chooseId();
    autoWalkIn(); // (queues up for later) KEEP IT SIMPLE!!! only hero walks in at this stage.
    changeDOM();
}// end 'addPersonNoQueue'

function addStrangers(){ // person2 and person3 talk in every 2nd scene (randomly)
    //  ******  WARNING:  THIS WILL OVERWRITE ANY PEOPLE ALREADY THERE
    // specified no strangers for this scene
    if((active.queue.length >0)&&(active.queue[0][0] =="noStrangers")){l("noStrangers [0]"); // position 0?
        active.queueShiftAndStore(); // no longer needed
        return;
    }// might be NEXT, after "noWalkIn"
    if((active.queue.length >1)&&(active.queue[1][0] =="noStrangers")){l("noStrangers [1]"); // position 1?
        active.queue.splice(1,1); // no longer needed  array.splice(index, 1);
        return;
    }
    // no strangers here?
    if((nav.sceneType !==" village ")&&(nav.sceneType !==" town ")&&(nav.sceneType !==" city ")&&(nav.sceneType !==" govt ")){
        strangers.on =0;
        return;
    }

    let a={"strangersList":[], "gender":""};
    function fillStrangersList(){ // LATER: find people NOT in the story
        let b=0;
        for(b =0; b < db.people.length; b++){
            a.gender =getGender(b);
            if((db.people[b].name !=active.person)&& ["male","female","girl","boy"].includes(a.gender)){
                if(db.people[b].hasOwnProperty("notes") && db.people[b].notes.includes(" dead ")){
                    l("cannot use " +db.people[b].name+ ": they are dead");
                }else a.strangersList.push(db.people[b].name);
            }
        }
    }
    function chooseStrangers(){
        let b ={"n":m.random(a.strangersList.length)};
        strangers.who0 =a.strangersList[b.n];
        a.strangersList.splice(b.n,1); // removes that element
        b.n = m.random(a.strangersList.length);
        strangers.who1 =a.strangersList[b.n];             l("strangers chosen: " +strangers.who0+ " and " +strangers.who1);
    }
    function positionStrangers(){
        let b={"x1":0, "x2":0, "y":0};
        b.x1 = 20 + m.random(50); // not too close to edge, or walking down from exit will float above them
        b.y = gameSize.midFloorY +3; // so hero walks IN FRONT of them (default z value set in CSS)
        b.x1 = checkX(b.x1,"strangers");

        addPersonNoQueue(strangers.who0, b.x1, b.y,"stranger0");// "stranger0" tells "addPersonNoQueue" to use "person2" and use different Z value
        b.x2 = b.x1 +10; // friend stands 10% away
        addPersonNoQueue(strangers.who1, b.x2, b.y,"stranger1");
        strangers.on =1;
    }
    fillStrangersList();
    chooseStrangers();
    positionStrangers();
}
function capitalise(str) {
    let a={"splitStr":[], "i":0};
    a.splitStr = str.toLowerCase().split(' '); // in case there is more than one word
    for (a.i = 0; a.i < a.splitStr.length; a.i++)
    a.splitStr[a.i] = a.splitStr[a.i].charAt(0).toUpperCase() + a.splitStr[a.i].substring(1); // "substring(1)" =everything from position 1
    l("XXX capitalised = '" +a.splitStr.join(' ') +"'")
    return a.splitStr.join(' ');
}
function changeStatusText(what){  l("changeStatusText('" +what+ "')");
    var el= document.getElementById("notifyLine");
    el.innerHTML ="<b>" +what+ "</b>";
    el.className ="visible notifyLineStart"; // normal
    document.getElementById("notifyLine-default").className ="opacity0 notifyLineStart"; // invisible
    setTimeout(function(){
        document.getElementById("notifyLine").className ="notifyLineRemove notifyLineStart"; // move to left and fade out
        document.getElementById("notifyLine-default").className ="fadeIn notifyLineStart"; // fade back in
    },3000);
}
function checkId(id){ // make sure it's a real id
    let a={"key":""};
    for(a.key in active.sceneObjects){
        if( (id ==a.key)// it's good
            ||((active.sceneObjects[a.key].db.hasOwnProperty("name"))&&(active.sceneObjects[a.key].db.name == id))// whoops, given us a name instead?
        )return a.key;
    }
    return "";// bad
}
function checkAlias(who){ // e.g. "stranger0" -> "Fred" // WHEN CALLING, DO NOT USE "" FOR OBJECTS // "" is assumed to be active.person
    let a={"force":0};
    a.force = arguments[1]; a.force =typeof(a.force) !=='undefined'? a.force : 0; // force them to enter if not present?
    if(typeof(who)=="undefined")who =active.person;
    else switch(who){
        case "stranger0" : { who =strangers.who0; break;}
        case "stranger1" : { who =strangers.who1; break;}
        case ""          : { who =active.person; break;}
        case "activePerson" : { who =active.person; break;}
    }
    if(a.force) addPersonNoQueue(who);// cancels if already there
    return who;
}
function checkX(targetX, who){ // for walking to, placing strangers, etc
    let a={"special":0, "id":0, "dist":0, "i":0,
            "personX":0, "personLeft":0, "personRight":0, "personMiddle":0, "bigObjMiddle":0};
    a.special = arguments[2]; a.special =typeof(a.special) !=='undefined'? a.special : ""; // default: not walking, so don't care about distance
    function avoidThis(x1,x2){
        a.personLeft = targetX -3; // each is 6% wide.
        a.personRight = targetX +3;
        if(a.special =="strangers") a.personRight = a.personRight +10; // stranger2 is 10% right of stranger1

        if((x1 <a.personRight)&&(x2 >a.personLeft)){
            a.bigObjMiddle = (active.bigTableObj.x1 + active.bigTableObj.x2)/2;
            a.personMiddle = (a.personLeft + a.personRight)/2;
            if(a.personMiddle <a.bigObjMiddle){ l("targetX partly hidden, so moving left");
                if(a.who =="strangers") targetX = targetX -12;
                else targetX = targetX -5;
            }else{ l("targetX partly hidden, so moving right");
                if(a.who =="strangers") targetX = targetX +12;
                else targetX = targetX +5;
            }
        }
    }
    function avoidPeople(){
        function avoidPerson(theirId){
            if(samePerson(theirId,who))return; // cannot avoid yourself!
            if(active.sceneObjects[theirId].x <0)return; // not on screen anyway
            avoidThis(active.sceneObjects[theirId].x -3, active.sceneObjects[theirId].x +3); // assume they are 6% wide
        }
        for(a.i =0; a.i<4; a.i++)avoidPerson("person" +a.i);
    }
    function notIfClose(){
        if(a.special !=="notIfClose") return 0;
        a.id = getPersonId(who); // e.g. "polar bear" is "person0"
        if(a.id =="")return 1; // error: can't find
        a.personX = active.sceneObjects[a.id].x;
        a.dist = targetX - a.personX;
        if((a.dist<5)&&(a.dist >-5)){l("Clicked very close to '" +a.id+ "': no need to walk. (PersonX:" +a.personX.toFixed(2)+ ", targetX:" +targetX.toFixed(2) );
            return 1; }// don't bother moving
        return 0;
    }
    function avoidEdges(){
        if(targetX <5) targetX =5;
        else if(targetX >95) targetX =95;
    }
    avoidThis(active.bigTableObj.x1, active.bigTableObj.x2); // big object on table
    avoidPeople();
    avoidEdges();
    if(notIfClose())return -999;
    return targetX; // new, better target
}
function dbNext(whichDb){// synonyms etc: [0,name1,name2] - 0 stores the position
    if(typeof(whichDb[0]) !="number")l("ERROR: no number at start of " +whichDb);
    whichDb[0] = whichDb[0] +1;
    if(whichDb[0] >=whichDb.length) whichDb[0] =0;
    return whichDb[0];
}
// deepCopy: must do it directly in the code:  newObject = JSON.parse(JSON.stringify(oldObject)); // good for layers, bad for blobs, date, etc
function getGender(id){// id OR number in database
    let a={"cos":"","gender":""};
    if(typeof(id)=="string") a.cos =active.sceneObjects[id].db.cos;
    else if(typeof(id)=="number") a.cos = db.people[id].cos;
    else{l("ERROR: cannot get gender for '" +id+ "'");
    }
    if(a.cos.indexOf("i/person/g-") >-1) return "female";
    if(a.cos.indexOf("i/person/w-") >-1) return "female";
    if(a.cos.indexOf("i/person/a-") >-1) return "animal";
    if(a.cos.indexOf("i/person/t-") >-1) return "transport";
    return "male"; // "m-" and "b-"
}
function getIdPosition(id){// where do you stand?
    let a={"special":"", "specialSplit":[], "personId":"", // personId might affect where you stand
            "x":0,"y":0, "itemNotes":"", "itemWidth":10, "howFarAlong":0.5, "oldId":""};
    a.special=arguments[1];a.special =typeof(a.special) !=='undefined'? a.special : "";
    a.oldId =id;
    id =checkId(id);
    if(id==""){ l("ERROR: getIdPosition(" +a.oldId+ "): not a valid id or name. Returning a generic position.");
        return [50,2];
    }
    a.itemNotes =active.sceneObjects[id].db.notes;
    a.itemWidth =active.sceneObjects[id].db.width;
    if(a.itemWidth==undefined){ l("WARNING: getIdPosition: " +id+ ".width is undefined, guessing it's 15");
        a.itemWidth=15;      }
    a.howFarAlong = 0.5; // stand half way along
    a.y = active.sceneObjects[id].db.bottom;
    a.x = active.sceneObjects[id].x + (a.itemWidth * a.howFarAlong);
    if(a.y==undefined){ l("WARNING: getIdPosition: " +id+ ".y is undefined, walking to 5 instead");
        a.y=5;      }
    return [a.x,a.y];
}
function getPersonId(who){ // i.e. input "polar bear" output "person0"
    let a={"key":"", "dbI":0};
    for(a.key in active.sceneObjects){
        if(active.sceneObjects[a.key].db.hasOwnProperty("name") && (samePerson(a.key,who)))return a.key;
    }// still here?
    l("'" +who+ "' is not on screen. Cancelling."); showQueue();
    return "";
}
function getPersonPositionInDB(name){ // look in the array of 50 (or so) possible people
    name=checkAlias(name);
    let a={"i":0};
    for(a.i =0; a.i < db.people.length; a.i++){
        if(db.people[a.i].name ==name) return a.i;
    }l("ERROR: cannot find '" +name+ "' in 'db.people'.");
    return -1;
}
function getTopOfHead(id){ // y position, in percent. Add 10 to be safe.
    let a={"heightPx":0, "heightPercent":0, "heightPlusFeet":0};
    a.heightPx = active.sceneObjects[id].db.spriteHeightPx  * nav.personScale; // pixel height
    a.heightPx *=0.9; // aim at mouth
    a.heightPercent =   (a.heightPx / gameSize.height) *100;  // e.g. 300 px / 1000 px height   * 100
    a.heightPlusFeet = active.sceneObjects[id].y +a.heightPercent; // feet plus height
    return a.heightPlusFeet;
}
function getStyleForPerson(id){ // CSS style string for (e.g.)"Mother Bear". Called by "addPersonNoQueue" and "CHECK_ANIMATIONS"
    // check values
    if(id=="")return;
    if(id=="nobody")return;
    if(!active.sceneObjects[id].db.hasOwnProperty("spriteXpositions")){ // nothing to animate?
        l("'" +active.sceneObjects[id].db.name+ "' (" +id + ") has no sprite numbers. Abandoning animation.");
        return;
    }

    // variables
    let a={"flipped":0, "scale":0, "spriteWidthPx":0, "special":"",
        "spriteHeightPx":306, "spriteFrame":0,"spriteNums":[], // spriteNums =use "default" numbers, or "ship" numbers
        "newX":50, "newY":7,
        "targetX":0, "targetY":0, "yStyle":"", "z":100,
        "animating":0, // so they stand still at the end
        "anim":[], "animName":"[no animName yet]", "animFrame":0,// e.g. ["say","hello"] -> animName = "say"
        "who":"", // e.g. active.person
        "journeyX":0, "journeyY":0, "stepX":0, "stepY":0, "stepXpercent":0, "stepYpercent":0, "howManySteps":0,
        "footPxFromEdge":0,"footXpercent":0, "leftPercent":0, "backgroundPosition":0,
        "cos":"", "transform":"", "tempStyle":"", "myStyle":0
    };
    a.special=arguments[1];a.special =typeof(a.special) !=='undefined'? a.special : "";// in case this person MUST be onscreen
    a.spriteFrame =0;
    function readQueue(){
        if(active.queue.length <1)return 0;// only change if animating OR special (to save changing the DOM for everything every frame)
        a.anim =active.queue[0][0].split("#"); // "say hello" becomes ["say","hello"]
        a.animName = a.anim[0]; // "say" (or "walk" or "climbUpHouse" etc)
        a.who =checkAlias(active.queue[0][1]); // e.g. active.person, e.g. "Mother Bear"
        a.animFrame =active.queue[0][2];

        // the animation is you?
        if(active.sceneObjects[id].db.name ==a.who) // "id" = the object you are styling, "who" = the object waiting to be animated: active.queue[0]
            a.animating =1;
        return 1;// continue to examine that animation
    }
    function updateVariables(){ // do not set variables in "a" - those are only set ONCE
        a.spriteHeightPx = (active.sceneObjects[id].db.hasOwnProperty("spriteHeightPx")) ? active.sceneObjects[id].db.spriteHeightPx : 306;
        a.spriteNums = db.spriteXpositions[active.sceneObjects[id].db.spriteXpositions]; // e.g. use "default" numbers, or "ship" numbers
        a.newX =active.sceneObjects[id].x;
        a.newY =active.sceneObjects[id].y;
        a.yStyle = "bottom:" +active.sceneObjects[id].y+"%; ";
        if(a.spriteHeightPx >(gameSize.height *0.7)){  a.yStyle ="top:25%; "; l("adjusting height for small screen (e.g. phone)"); // tiny screen?
            }
    }

    function prepareWalk(){
        if(active.queue.length <1)return;
        if(!a.animating)return;
        if(a.animName !="walk")return;
        // read
        a.targetX = parseInt(a.anim[1]); // turns string into percent
        a.targetY = gameSize.midFloorY; // walk to floor unless specified
        if(a.anim.length >2)// e.g. ["walk"]["80"]["20"] has 3 parts, implying Y is defined
            a.targetY = parseInt(a.anim[2]); // e.g. "20" becomes 20
        // walk?
        if(a.targetX !=active.sceneObjects[id].x){ // not the same (if same X but difY, stay: moving only in Y direction is bad)
            a.journeyX = a.targetX -active.sceneObjects[id].x; // could be negative (= go left)
            a.journeyY = a.targetY -active.sceneObjects[id].y;
            a.stepPx =40; // default character feet move 31-46 pixes per frame: the animation SHOULD be rough, that's OK!!!
            if(a.journeyX <0) a.flipped =1;
            if(a.flipped) a.stepPx = 0 -a.stepPx; // separate line: could be just facing left
            // steps
            a.stepXpercent = 100 * a.stepPx/gameSize.width;
            a.howManySteps = Math.abs(Math.floor(a.journeyX/a.stepXpercent)); // e.g. journey 80 percent, step 10 percent? 8 steps
            if(a.howManySteps ==0){
                a.newX = a.targetX; // update position for next time
                a.newY = a.targetY;
                aa.nowWalking =0; // ready to detect the first frame
                a.animating =0;  // ready to stand still
                a.spriteFrame =0;
                if(active.queue.length >1){  // another animation next?
                    if(active.queue[1][0].includes("goToScene")){  // a scene change?
                        active.queue.shift(); // forget walk
                        return "display:none; "; // they disappear (avoids problems with exact position and direction)
                    }
                }
            }else { // need steps
                a.stepYpercent = a.journeyY / a.howManySteps;
                a.newX = active.sceneObjects[id].x;
                a.newY = active.sceneObjects[id].y;
                if(aa.nowWalking){ // do NOT move on the first step
                    a.newX = a.newX + a.stepXpercent,
                    a.newY = a.newY + a.stepYpercent;
                }else aa.nowWalking =1; // for next time
            }
            // off screen? don't make the user wait
            if((a.targetX <0)&&(a.newX <0))a.newX = a.targetX; // e.g. -999 "leave()"
            else if((a.targetX >100)&&(a.newX >100))a.newX = a.targetX; // e.g. -999 "leave()"
            active.sceneObjects[id].x = parseInt(a.newX); // update position for next time
            active.sceneObjects[id].y = parseInt(a.newY);
        }// end move
    }// end walk
    function getSpriteFrame(){
        if(active.queue.length <1)return;
        if(!a.animating) return;
        if(!db.animations.hasOwnProperty(a.animName))return; // not an animation - e.g. "wait"
        if(db.animations[a.animName].hasOwnProperty("lastFrame")&&(db.animations[a.animName].lastFrame >=a.animFrame)) // just play frames one after another
            a.spriteFrame = a.animFrame;// just records spriteFrame, not animFrame (animFrame = location of spriteFrame. See db.animations[animName]
        else{// read the frame
            a.spriteFrame = db.animations[a.animName][a.animFrame]; // lists frames: useful for skipping or repeating frames
            if(typeof(a.spriteFrame) =='undefined')a.spriteFrame =0; // just in case
            if(typeof(a.spriteFrame) !== "number"){ // e.g. [1,90] includes rotation
                a.transform = a.spriteFrame[1]; // e.g. "rotate(20deg); "
                a.spriteFrame = a.spriteFrame[0];
            }else a.transform = "";
            if(a.spriteFrame <0){ // face left
                a.flipped =1;
                a.spriteFrame = Math.round(0 -a.spriteFrame); // -0 is saved as -0.1
            }
        }
    }
    function scaleDirectionRotate(){
        function turnToOtherPerson(){ // ["say#bla", "speaker", 0, "friend"] // 0=timer
            if(active.queue[0][0].substring(0,3) !=="say")return;
            let c={"friendId":"", "maybeFriend":"", "i":0, "last":0}
            function checkFriend(friendWho){
                if(samePerson(id, friendWho)) return;
                c.friendId = getPersonId(friendWho);
                if(active.sceneObjects[id].x > active.sceneObjects[c.friendId].x) a.flipped =1;
            }
            function friendIsDefined(){
                if(active.queue[0].length <4)return 0;
                checkFriend(active.queue[0][3]);
                return 1;
            }
            function somebodyJustSpoke(){
                c.last = active.queueHistory.length -1;
                if(c.last <0) return 0; // no history
                if(active.queueHistory[c.last][0].substring(0,3) !=="say") return 0; // not talking
                c.friendId = (active.queueHistory[c.last].length >1) ? active.queueHistory[c.last][1] : active.person;
                checkFriend(c.friendId);
                return 1;
            }
            function somebodyAboutToSpeak(){
                if(active.queue.length <2)return 0; // nothing comes next
                if(active.queue[1][0].substring(0,3) !=="say") return 0; // not "say"
                if(active.queue[1].length <2)return 0; // not somebody else
                if(!onScreen(active.queue[1][1]))return 0; // that name is on screen?
                checkFriend(active.queue[1][1]);// change "flipped" to face them
                return 1;
            }
            if(friendIsDefined())return;
            if(somebodyJustSpoke())return;
            if(somebodyAboutToSpeak())return;
            checkFriend(active.person); // last chance: face active.person
        }
        function doScale(){
            if(   (db.animations.hasOwnProperty(a.animName))
                &&(db.animations[a.animName].hasOwnProperty("forceScale"))){ // e.g. must stay at original scale
                a.scale = db.animations[a.animName].forceScale;  // scales everything, including background
            }else a.scale =nav.personScale;
        }
        function makeTempStyle(){
            a.tempStyle = "transform: " +a.transform+ " scale("; // e.g. "transform: rotate(20deg) scale("
            if(a.flipped) a.tempStyle = a.tempStyle + "-"; // flip left? use negative sign
            a.tempStyle = a.tempStyle +a.scale+ ", "+a.scale+ "); transform-origin: bottom;";// e.g. "transform: rotate(20deg) scale(-1,1); transform-origin: bottom;"
        }
        turnToOtherPerson();
        doScale();
        makeTempStyle();
        return a.tempStyle;
    }
    function checkCostume(){ //l("checkCostume: a.spriteFrame=" +a.spriteFrame+ ", a.spriteNums="); console.log(a.spriteNums);
        // special animation // e.g. climbUpHouse
        if((db.animations.hasOwnProperty(a.animName))&&(db.animations[a.animName].hasOwnProperty("cos"))) a.cos = db.animations[a.animName].cos;
        else a.cos = "url('" + active.sceneObjects[id].db.cos +"')";
        if((db.animations.hasOwnProperty(a.animName))&&(db.animations[a.animName].hasOwnProperty("frameWidth")))
            a.backgroundPosition = a.spriteFrame * db.animations[a.animName].frameWidth; // fixed width? e.g. frame 2, 48 pixels wide, start at 2x48
        else{
            if(a.spriteFrame >=a.spriteNums.length){l("ERROR: sprite frame " +a.spriteFrame+ " does not exist")}
            else a.backgroundPosition = a.spriteNums[a.spriteFrame][0];
        }
    }
    function heightAndWidth(){
        // height
        if((db.animations.hasOwnProperty(a.animName))&&(db.animations[a.animName].hasOwnProperty("frameHeight"))){
            a.spriteHeightPx = db.animations[a.animName].frameHeight; // ignore scaling: handled by 'scaleDirectionRotate'
        }
        // width
        if((db.animations.hasOwnProperty(a.animName))&&(db.animations[a.animName].hasOwnProperty("frameWidth")))
             a.spriteWidthPx = db.animations[a.animName].frameWidth; // ignore scaling: handled by 'scaleDirectionRotate'
        else a.spriteWidthPx = a.spriteNums[a.spriteFrame][2];
    }
    function checkFeet(){
        if((db.animations.hasOwnProperty(a.animName))&&(db.animations[a.animName].hasOwnProperty("frameWidth"))){
            a.footPxFromEdge = Math.round(a.spriteWidthPx /2); // assume feet are half way along
            // do NOT adjust for scaling reasons: "transform-origin" "bottom" scales from half way acros already
        }else  a.footPxFromEdge = (a.flipped) ? (a.spriteWidthPx -a.spriteNums[a.spriteFrame][1]) : a.spriteNums[a.spriteFrame][1];
        a.footXpercent = (a.footPxFromEdge/gameSize.width)*100; // how far are feet into sprite? Express as a percentage of game
    }
    function XandZandStyle(){
        a.z = Math.round(100-active.sceneObjects[id].y);// decimals don't work!
        if(id=="person0")a.z = a.z +1;// if in doubt, hero is in front
        a.leftPercent = a.newX -a.footXpercent;
        active.sceneObjects[id].x = parseInt(a.newX); // keep it up to date
        a.myStyle = "display:inline; height:" +a.spriteHeightPx+ "px; width:" +a.spriteWidthPx+ "px; background-image:" +a.cos+ "; background-position:-" +a.backgroundPosition+ "px 0; left:" +a.leftPercent+ "%; " +a.yStyle+ "; z-index:" +a.z+ ";" +scaleDirectionRotate();
    }
    if(!readQueue())return 0; // "0" means "not an animation"
    updateVariables();
    prepareWalk();
    getSpriteFrame();
    checkCostume();
    heightAndWidth();
    checkFeet();
    XandZandStyle();
    // BORDER FOR TESTING: a.myStyle =a.myStyle +"border: 2px solid red; ";
    return a.myStyle; // "0" means "not an animation"
}
function matches(want,got){ // want=string got= string or object
    if(got.name == want)return 1; // same thing(usually a string)?
    if((typeof(got)=="string")&&(got.includes(want)))return 1; // string that includes want?
    if(!got.hasOwnProperty("notes"))return 0; // no notes to check
    if(got.notes.includes(want))return 1; // has notes, and they include got?
    return 0;
}
function NEXT_GAME_FRAME(){
    function CHECK_ANIMATIONS(){ // e.g. 0,1,2,3
        let b={"who":"",// e.g. "Fred Bloggs"
            "id":"", // e.g. "person0"
            "howLong":0, "sceneDetails":[], //  sceneDetails: ["goToScene","123","456"]
            "thisDiv":"", "personStyle":"", // to apply the results
            "animWords" :[],// e.g. // e.g. "walk 80" -> ["walk","80"] DO NOT READ IT HERE: "b" is defined at the start of the game, but stuff changes
            "animName":"", // e.g. "walk"
            "animFrame":0, // active.queue[0][1]
            "targetX":0, // ready for next time
            "tempDiv":0, // for O("bla")
            "key":0 // for searching active.sceneObjects
        };
        function prepareQueue(){ // queue: ([str,who,frame])  called by "queueReady" and again by "finalChecks"
            b.animWords = active.queue[0][0].split("#");
            b.animName = b.animWords[0];
            b.who =checkAlias(active.queue[0][1]);
            b.id= active.getIdFromName(b.who);
        }
        function queueReady(){
            function checkStrangers(){
                if(!strangers.on)return;
                if(strangers.timeToRandomTalk >0)return;
                let c={"strangerId":"", "div":"", "who":"", "x":0, "strangerTopPercent":0 };

                function changeWhichStrangerChats(){ // changes person speaking.
                    quickSprite(c.strangerId,0); // shut current stranger's mouth
                    strangers.which = (strangers.which ==1) ? 2 : 1; // toggle who talks
                    // get their details
                    c.strangerId = (strangers.which ==1) ? "person2" : "person3"; // 0 = no strangers, 1 or 2 = stranger2 or stranger3
                    c.who = (strangers.which ==1) ? strangers.who0 : strangers.who1;
                    // where should the text box go?
                    c.x = active.sceneObjects[c.strangerId].x -7; // just to their left (so they are clearly different)
                    c.strangerTopPercent = getTopOfHead(c.strangerId); // strangers' feet are 10% from base
                    // change the text box
                    c.div = O("strangerChat");
                    c.div.innerHTML = db.strangerChat[strangers.topic];
                    c.div.style.left = c.x + "%";
                    c.div.style.bottom = c.strangerTopPercent + "%";
                    c.div.style.display = "inline";
                    c.div.style.visibility = "visible"; // maybe strangers were paused?
                    // ready for next time
                    strangers.topic++; // not at the start, or you never see topic 0
                    if(strangers.topic >=db.strangerChat.length) strangers.topic =0; // loop back to the start
                    strangers.timeOfLastChange = performance.now(); // so you notice if they haven't changed for a while
                    clock.strangerChatTimer =6 + (db.strangerChat[strangers.topic].length *1); // long line: 100 characters, 10.5 seconds.
                }
                function faceOtherStranger(){
                    let flipped =0;
                    if(active.sceneObjects["person2"].x < active.sceneObjects["person3"].x){ // person3 on LEFT
                        if(c.strangerId =="person3") flipped =1;
                    }else{ // person3 on RIGHT
                        if(c.strangerId =="person2") flipped =1;
                    }
                    if(flipped){
                        O(c.strangerId).style.transform ="scale(-" +nav.personScale+ ", "+nav.personScale+ ")";
                    }
                }
                clock.strangerChatTimer--; // count down to the next change
                // get their id
                c.strangerId = (strangers.which ==2) ? "person3" : "person2";
                // time to change?
                if((clock.strangerChatTimer <1)||((performance.now() -strangers.timeOfLastChange) >5000) ) // clock runs down, or...
                    changeWhichStrangerChats();            // "timeOfLastChange": something unexpected happened, so force a restart
                else{
                    faceOtherStranger();
                    quickSprite(c.strangerId,m.random(6)); // normal, random sprite
                    O("strangerChat").style.visibility = "visible"; // maybe strangers were paused?
                }
            }
            function stopStrangers(){
                if(!strangers.on)return;
                O("strangerChat").style.visibility = "hidden";
                b.tempDiv = (strangers.which ==2) ? O("person3") : O("person2");// who is talking?
                b.tempDiv.style.backgroundPosition = "0 0";  // closed mouth
            }
            if(active.queue.length <1){
                checkStrangers(); // time to change?
                return 0;
            }// still here?
            stopStrangers(); // remove text, close mouth
            prepareQueue(); // yay! Something to do!
            return 1;
        }
        function checkFirstFrame(){ // moves character into position for animation
            if(active.queue[0][2] >1)return 1; // allow TWO frames - sometimes first frame is still the last one
            function personReady(){
                // find person
                if(b.who =="nobody")return 1; // this animation does not need a person
                if(!db.animations.hasOwnProperty(b.animWords[0]))return 1; // not an animation - e.g. "wait"
                if(b.animWords[0].substring(0, 5) =="climb") return 1; // "climbup", "climbDown" etc. does not care, happens anyway
                if(b.who =="activePerson"){
                    b.who = active.person;
                    active.queue[0][1] = b.who;
                }
                b.id= active.getIdFromName(b.who);
                if(b.id ==""){ // that name is not found on the screen?
                    showQueue();
                    l("Cannot '" +active.queue[0][0]+ "', as '" +b.who+ "', is not found in scene. Deleting queue[0]")
                    active.queue.shift();
                    return 0;
                }
                // are they normal?
                if(!active.sceneObjects[b.id].db.hasOwnProperty("spriteXpositions")){
                    l("'" +b.id+ " ' requests an animation, but has no sprite PNG");
                    return 0; // no sprite PNG
                }
                return 1; // still here? Must be OK.
            }
            function canDoItHere(){ // e.g. cannot have a ship sit down
                if(nav.sceneType == " sea "){
                    if(["climbDownCave","climbDownHouse","climbUpCave","climbUpHouse"].includes(b.animWords[0])){
                        l("WARNING: cannot '" +active.queue[0][0]+ "' when sceneType='" +nav.sceneType+ ". Deleting queue[0]");
                        active.queue.shift();
                        return 0; //a ship cannot do those things
                    }
                }return 1;
            }
            if(!canDoItHere())return 0;
            switch(b.animWords[0]){
                case "animateNonPerson":{return 1;}// pretty simple, usually works
                case "assignPersonToID":{assignPersonToID("_READ_QUEUE_FRAME1"); active.queue.shift(); return 1;}
                case "needs"        : {needs("_READ_QUEUE_FRAME1");     return 1;}
                case "enter"        : {enter("_READ_QUEUE_FRAME1");     return 1;} // "enter" is not after "personReady" because this MAKES the person ready
                case "goToScene"    : {goToScene("_READ_QUEUE_FRAME1"); return 1;}
                case "jumpTo"       : {jumpTo("_READ_QUEUE_FRAME1"); return 1;} //don't shift yet: DOM will not change if queue is zero
                case "noStrangers"  : {return 1;}  // handled by 'addStrangers'
                case "noWalkIn"     : {return 1;}  // handled by 'autoWalkIn'
                case "video"        : {video("_READ_QUEUE_FRAME1"); active.queue.shift(); return 0;} // nothing else to do
                case "wait"         : {return 1;}  // leave it, so "active.queue[0][2] +1" can count down. Nothing else.
                case "yesCancel"    : {yesCancel("_READ_QUEUE_FRAME1",""); return 1;}
            }
            if(!personReady()){ l("Cannot animate person for " +b.animWords[0]+ ": no 'personReady'");
                                return 1; }
            switch(b.animWords[0]){ // animwords can have any number of words
                case "climbDownCave" : {if(b.atSeaEtc){active.queue.shift(); return 0;} climbDownCave("_READ_QUEUE_FRAME1");  return 1;}
                case "climbDownHouse": {if(b.atSeaEtc)return 0; climbDownHouse("_READ_QUEUE_FRAME1"); return 1;}
                case "climbUpCave"   : {if(b.atSeaEtc)return 0; climbUpCave("_READ_QUEUE_FRAME1");    return 1;}
                case "climbUpHouse"  : {if(b.atSeaEtc)return 0; climbUpHouse("_READ_QUEUE_FRAME1");   return 1;}
                case "leave"         : {leave("_READ_QUEUE_FRAME1");  return 1;}
                case "say"           : {say("_READ_QUEUE_FRAME1");  return 1;}
                case "sayLonger"     : {say("_READ_QUEUE_FRAME1");  return 1;} //same code, to change the text
                case "sayLongest"    : {say("_READ_QUEUE_FRAME1");  return 1;}
                case "sayShort"      : {say("_READ_QUEUE_FRAME1");  return 1;}
                case "walk"          : {return 1;} // handled by 'prepareWalk()'
                default              : { // the name of an animation? // format: queue[0] =[str,who,frame]; e.g. ["climbUpHouse#floorObj3", "Fred", 0]
                                        if(active.queue[0][0]) return 1; // it will just play that animation. No moving for first frame, etc.
                                        l("ERROR: cannot find animation '" +active.queue[0][0]+ "'. Deleting queue[0]" ); // still here?
                                        active.queue.shift();
                                        return 0;
                                    }
            }
        }
        function finalChecks(){
            function personHasId(){
                for (b.key in active.sceneObjects) { //search all names on screen
                    if(active.sceneObjects[b.key].db.hasOwnProperty("name")){
                        if(active.sceneObjects[b.key].db.name == active.queue[0][1])return 1;
                        if((active.queue[0][1] =="activePerson")&&(active.sceneObjects[b.key].db.name ==active.person))return 1;
                    }
                }return 0; // not found
            }
            prepareQueue(); // AGAIN. BUG FIX. For some reason b.who is often wrong by this point. So refreshing it.
            // nothing to animate?
            if(b.who =="nobody") return 1; // "wait" etc = nothing to change, but not an error
            if(b.who ==""){l("ERROR: no 'who' to animate. Deleting queue[0]");
                active.queue.shift(); // remove current animation.
                return 0;
            }else if(!personHasId()){ showQueue();
                    l("ERROR: '" +b.who+ "' does not have an ID. Deleting queue[0] (" +active.queue[0][0]+ "," +active.queue[0][1]+ ")");
                active.queue.shift(); // remove current animation.
                return 0;
            }
            if(b.id ==""){l("ERROR no id to animate. Deleting queue[0].");
                active.queue.shift(); // remove current animation.
                return 0; // error: cancel animation
            }
            return 1;
        }
        // ****** T H I S   I S   I T ! ! ! ************   this is the queue: see also 'addPersonNoQueue'
        //**********************************************
        //**********************************************
        //**********************************************
        //**********************************************
        function CHANGE_DOM_BASED_ON_NAME_AND_FRAME(){ //l("reading active.queue[0]=[" +active.queue[0][0]+ "," +active.queue[0][1]+ "," +active.queue[0][2]+ "]");
            function changeImg(){ // changes floorObj, etc., NOT person
                if(b.animWords[0] !=="animateNonPerson")return 0; // not animating an id (floorObj etc.)
                b.id =b.animWords[1]; // e.g. active.queue[0] =["animateNonPerson#floorObj2#snakeAttack,"nobody",0]
                b.animName =b.animWords[2];
                b.animFrame = active.queue[0][2];// for convenience
                if(db.animations.hasOwnProperty(b.animName)){
                    O(b.id).src =db.animations[b.animName].path + db.animations[b.animName].frames[b.animFrame];// e.g. "i/floorObj/monster/locust2.png"
                    clock.resetInactivityTimer();
                }else{l("ERROR: no animation called '" +b.animName+ "'. Deleting queue[0]");
                    active.queue.shift(); // remove current animation.
                }
                return 1; // it was a floorObj etc
            }
            // it exists?
            if(!active.queue.length)return 0; // no queue
            if(changeImg())return 1;// floorObj etc., not person
            if(!finalChecks())return 0;
            if(b.who =="nobody") return 1; // wait etc., not a person
            // do style
            b.thisDiv = O(b.id); // e.g. O("person0")
            b.personStyle = getStyleForPerson(b.id);
            b.thisDiv.style= b.personStyle; // ********* T H I S   I S   I T ! ! ! ************
            clock.resetInactivityTimer();
            return 1; // everything is OK
        }
        //**********************************************
        //**********************************************
        //**********************************************
        //**********************************************
        //**********************************************
        function walkEnds(){ // arrived at x?
            if(b.animName =="jumpTo")active.queueShiftAndStore();
            if(b.animWords[0] !=="walk")return 0;
            if(b.id =="")b.id= active.getIdFromName(b.who);
            //arrived at x?
            b.targetX = parseInt(b.animWords[1]); // x destination (parseInt turns string into number)
            b.i =active.sceneObjects[b.id].db; // in case it's undefined
            if((typeof(b.i)=="undefined")||(b.i=="")){
                l("ERROR: checking 'walkEnds' for id=" +b.id+ " but not on screen.");
                return 0;
            }else if(b.targetX == active.sceneObjects[b.id].x){// you are at x destination?
                quickSprite(b.id,0);
                if(active.queue[0][0].substring(0, 4) =="walk")// BUG FIX: if walk was already deleted it deletes the wrong thing!
                    active.queueShiftAndStore(); // remove current animation. Most animations are much simpler, so are handled in coreFunctions
                showQueue();
                return 1;  // nothing more to do
            }
        }
        function animationEnds(){// last frame?
            if(active.queue.length <1)return;
            // next frame
            active.queue[0][2] = active.queue[0][2] +1; // next frame (or next spriteFrame, if there is no list of spriteFrames)
            // convenient names
            b.animFrame = active.queue[0][2];// for convenience
            b.animName = b.animWords[0];     // " "

            // img.src?
            if(b.animName =="animateNonPerson"){ // e.g. active.queue[0] =["animateNonPerson#floorObj2#snakeAttack,"nobody",0]
                b.animName =b.animWords[2]; // e.g. "snakeAttack"
                if(b.animFrame >= db.animations[b.animName].frames.length){// no more images to load
                    active.queueShiftAndStore();
                    return;
                }
            }

            // wait, etc.?
            if(!db.animations.hasOwnProperty(b.animName)){ // not an animation - e.g. "wait" // queueShiftAndStore: because ANYTHING that happens should be stored
                if((b.animName =="wait")&&(b.animFrame >0))active.queueShiftAndStore(); // counted up to nothing (starts negative)? Delete it from the queue
                return;
            }
            // play all (e.g. climb)?
            if(db.animations[b.animName].hasOwnProperty("lastFrame")){ // just play frames one after another
                if(b.animFrame >db.animations[b.animName].lastFrame){// spriteFrame has gone too far?
                    active.queueShiftAndStore(); // it's over. Delete it from ther queue
                    l("reached last frame of " +b.animName+ ", deleting");
                }return;
            }
            // walk, etc.?
            if(b.animFrame >= db.animations[b.animName].length){ // whoops, no more frames?
                if(b.animName =="walk") active.queue[0][2] =0; //  loop to start
                else active.queueShiftAndStore(); // not a looping animation? delete it
            }
        }

        if(!queueReady())return; // if there is an animation, read its name. If not, check strangers.
        if(!checkFirstFrame())return; // reads queue
        if(!CHANGE_DOM_BASED_ON_NAME_AND_FRAME())return;// error. Cancel animation.
        if(walkEnds())return; // no "last frame". check for destination instead
        animationEnds();
    } // end "CHECK_ANIMATIONS"

    function updateClock(){
        if(!clock.gamePaused){
            clock.time++;
            O("clock-data").innerHTML = clock.time;
            // start stranger talk?
            if(active.queue.length >0) strangers.timeToRandomTalk =strangers.maxTimeToRandomTalk;
            else if(strangers.timeToRandomTalk >0)strangers.timeToRandomTalk--;
        }
        clock.nextTimer =setTimeout(NEXT_GAME_FRAME,clock.delay);
    }
    if(!clock.gamePaused) CHECK_ANIMATIONS();
    updateClock();
}
function onScreen(idOrWho){
    let a={"key":"", "i":0, "personId":""};
    function xOnScreen(id){
        if(active.sceneObjects[id].x <=gameSize.edgeX)return 0;
        if(active.sceneObjects[id].x >=(100 -gameSize.edgeX))return 0;
        return 1;
    }
    function idIsOnScreen(id){
        if(typeof(active.sceneObjects[id]) == "undefined")return 0;
        if(typeof(active.sceneObjects[id].db) == "undefined")return 0;
        if(active.sceneObjects[id].db =="")return 0;
        return xOnScreen(id);
    }
    // it's an id?
    for(a.key in active.sceneObjects)
        if(idOrWho ==a.key)return idIsOnScreen(idOrWho);
    // still here? might be a name
    for(a.i=0; a.i<4; a.i++){ // cycle through four persons
        a.personId = "person" +a.i;
        if(active.sceneObjects[a.personId].db.name == idOrWho)// this is them?
           return xOnScreen(a.personId);
    }return 0;
}
function parseString(str,justMaybe=0){ // "hello [mate,friend], I am [$Hercules,hero]"
    let a={ "whatStory":"", // shortcut to either "story" or "a.whatStory"
            "newStr":""}// results
    function eatString(){ // cycle through, looking for normal + choices // e.g. "the [fall,destruction] and rise, of [$man,paradise][forever,when]"  ->
        let b={  "upTo":0,// subString length
                "tempStr":"", "tempPair":[],// results
                "toBeRemembered":0,
                "zeroChoice":"", "choice":""};
        function removeFrontOfString(){
            a.upTo++;               // so we lose the "[" or "]"
            str = str.substring(a.upTo); // delete that part
        }
        function findNormalPart(){
            function itsAllNormal(){
                if(a.upTo <0){          // no "[" found
                    a.newStr +=str;     // it's all normal text, so use whole string as is
                    str = "";           // so the rest of the code knows to stop
                    return 1;
                }   return 0;
            }
           function useNormalPart(){
                if(a.upTo >0)           // there is something to copy?
                    a.newStr += str.substring(0,a.upTo); // add everything BEFORE that into newStr
                removeFrontOfString();
            }
            a.upTo = str.indexOf("[");  // find position of first [
            if(itsAllNormal())return;
            useNormalPart();
        }
        function findPairedPart(){
            if(!str.length)return;      // nothing left?
            function findPairedPart(){
                if(a.upTo <0){ l("WARNING: unpaired brackets. Expected ']' in '" +str+ "'");  // no "]" found
                    a.upTo = str.length;// keep going just in case it works
                    a.tempStr =str;
                    str = "";           // so the rest of the code knows to stop
                    return;
                }                       // still here?
                a.tempStr =str.substring(0,a.upTo);
                removeFrontOfString();
            }
            function splitIntoPair(){
                b.tempPair = a.tempStr.split(",");
                if(b.tempPair.length <2){l("WARNING: tempPair could not split '" +a.tempStr+ "' (no comma found)");
                }else{
                    b.tempPair[1] =b.tempPair[1].trim(); // removes white space from the ends, so "[name,   name2]" works
                    if(b.tempPair.length >2){l("WARNING: tempPair split '" +a.tempStr+ "' into " +b.tempPair.length+ ", not 2");
                    }
                }
            }
            a.upTo = str.indexOf("]");  // find position of first ]
            findPairedPart();
            splitIntoPair();
        }
        function findName(){
            if(!b.tempPair.length)return;      // nothing to look for?
            function checkIfToRemember(){
                if(b.tempPair[0].charAt(0) =="$"){
                    b.toBeRemembered =1;
                    b.tempPair[0] = b.tempPair[0].substring(1);// cut off the "$"
                }else b.toBeRemembered =0;
            }
            function justUseZeroChoice(){
                b.choice = b.tempPair[0];// use the first name
                return 1;
            }
            function chooseName(){
                function nameIsAlreadySet(){
                    if(b.toBeRemembered && a.whatStory.vars.hasOwnProperty(b.zeroChoice)){
                        b.choice = a.whatStory.vars[b.zeroChoice];
                        l("name '" +b.choice+ "' is already set")
                        return 1;
                    }return 0;
                }
                function noChoice(){
                    if(a.whatStory.version ==0)return justUseZeroChoice();// 0 = canonical version
                    if(b.tempPair.length <2){l("Choosing name: no other choices for '" +b.tempPair[0]+ "'");
                        return justUseZeroChoice();
                    }else if(!db.s.hasOwnProperty(b.tempPair[1])){l("WARNING: no '" +b.tempPair[1]+ "' synonyms. Using zeroChoice name.");
                        return justUseZeroChoice();
                    }
                }
                function chooseFromSynonyms(){
                    let f={ "synonymGroup":"", "which":0};
                    f.synonymGroup = b.tempPair[1];
                    f.which = a.whatStory.version -1; // change 1->bla to 0->bla // previous 0 means "canonical" and was already trapped, so this is 1,2...
                    f.which = f.which % db.s[f.synonymGroup].length; // loop at the end  // x1 % x2 = remainder: e.g. if x1==10, x2==7,  remainder==3
                    b.choice = db.s[f.synonymGroup][f.which]; // finally: uses 1st, then 2nd, then 3rd, etc.
                }
                b.zeroChoice =b.tempPair[0];
                if(nameIsAlreadySet())return;
                if(noChoice())return;
                chooseFromSynonyms();
            }
            checkIfToRemember();
            chooseName();
        }
        function useName(){
            a.newStr +=b.choice;  // add to newStr
            if(b.toBeRemembered && !a.whatStory.hasOwnProperty(b.zeroChoice)){ // should remember, and it's not already there? Remember it!
                l("Remembering story variable: '" +b.zeroChoice+ "'='" +b.choice+ "'");
                a.whatStory.vars[b.zeroChoice] = b.choice;
            }
        }
        findNormalPart();
        findPairedPart();
        if(b.tempPair.length){// found something interesting?
            findName();
            useName();
        }
    }
    a.whatStory = justMaybe ? story.maybe : story;
    while(str.length)eatString();
    return a.newStr;
}
function quickSprite(id,spriteFrame){// simply move the background image, nothing else
    let a={"spriteXpositions":[], "styleString":""};
    // which spriteXpositions
    if(typeof(arguments[2]) !='undefined') // use different spriteXpositions?
         a.spriteXpositions = arguments[2];
    else a.spriteXpositions = active.sceneObjects[id].db.spriteXpositions; //default positions
    a.styleString = "-" +db.spriteXpositions[a.spriteXpositions][spriteFrame][0]+ "px 0px";

    // ****** CHANGING DOM *********************************************************************
    // NOT part of 'getStyleForPerson' - does not use active.queue, simply changes the background sprite position
    O(id).style.backgroundPosition = a.styleString; // e.g. "1000px 0"
}
function samePerson(whoA,whoB){// who_A might be "id"
    function checkIfID(who){// who_A is an id?
        if(active.sceneObjects.hasOwnProperty(who))// "floorObj2","person1",etc.
            if(who.includes("person"))return active.sceneObjects[who].db.name;
            else return "noPerson";
        return who;
    }
    whoA =checkIfID(whoA);
    if(whoA=="noPerson")return 0;
    whoB =checkIfID(whoB);
    if(whoB=="noPerson")return 0;

    // OK, both are people
    if(whoA ==whoB)return 1;
    if((whoA=="anybody")||(whoB=="anybody"))return 1;
    if((whoA=="nobody")||(whoB=="nobody"))return 0;
    if((whoA=="activePerson")&&(whoB==active.person))return 1;
    if((whoA==active.person)&&(whoB=="activePerson"))return 1;
    if(checkAlias(whoA) ==checkAlias(whoB))return 1;
    return 0;
}
function sameScene(sc1,sc2){
    return ((sc1.sceneX == sc2.sceneX)&&(sc1.sceneY == sc2.sceneY)&&(sc1.sceneZ == sc2.sceneZ)); // returns 1 (yes) or 0 (no)
}
function showChanges(){
    let a={"i":0,"key":0};
    if(active.changes.list.length <1){l("(showChanges: no changes to show)");
    }else{ l("_________CHANGES_(time_"+clock.time+")________");
        for(a.i =0; a.i <active.changes.list.length; a.i++){
            l("changes[" +a.i+ "]= {change:" +active.changes.list[a.i].change+ ", idOrWho:" +active.changes.list[a.i].idOrWho+ ", details:" +active.changes.list[a.i].details+ ", x:" +active.changes.list[a.i].x+ ", y:" +active.changes.list[a.i].y+ ", z:" +active.changes.list[a.i].z+ "}");
        }
    }
}
function showNeeds(){
    let a={"i":0,"key":0};
    if(active.changes.wantToAdd.length <1){l("(showNeeds: no needs to show)");
    }else{ l("_________NEEDS_(time_"+clock.time+")________");
        for(a.i =0; a.i <active.changes.wantToAdd.length; a.i++){
            l("wantToAdd[" +a.i+ "]= [needs='" +active.changes.wantToAdd[a.i][0]+ "', canWait='" +active.changes.wantToAdd[a.i][1]+ "']");
        }
    }
}
function showQueue(){
    let a={"i":0,"j":0,"str":"", "line":-1};
    function showLine(n){
        a.str = active.queue[n][0];
        for(a.j =1; a.j < active.queue[n].length; a.j ++)a.str = a.str +", " +active.queue[n][a.j];
        l("queue[" +n+ "]= [" +a.str+"]");
    }
    if(active.queue.length <1){l("(showQueue (time_"+clock.time+"): no queue to show)"); // no queue
       return;    }
    a.line = arguments[0]; a.line =(typeof(a.line) =='number')? a.line : -1; // just one line?
    if((a.line > -1)&&(a.line <active.queue.length)) showLine(a.line);
    else{l("_________QUEUE_(time_"+clock.time+")________"); // every line
        for(a.i =0; a.i <active.queue.length; a.i++) showLine(a.i);
    }
}
function showQueueHistory(){
    let a={"i":0,"j":0,"str":"", "line":-1, "startAt":0};
    function showLine(n){
        a.str = active.queueHistory[n][0];
        for(a.j =1; a.j < active.queueHistory[n].length; a.j ++)a.str = a.str +", " +active.queueHistory[n][a.j];
        l("queueHistory[" +n+ "]= [" +a.str+"]");
    }
    if(active.queueHistory.length <1){l("(showQueueHistory (time_"+clock.time+"): no queueHistory to show"); // no queue
       return;    }
    a.line = arguments[0]; a.line =(typeof(a.line) =='number')? a.line : -1; // just one line?
    if((a.line > -1)&&(a.line <active.queueHistory.length)) showLine(a.line);
    else{l("_________QUEUE_(time_"+clock.time+")________"); // every line
        a.startAt = active.queueHistory.length-5;
        if(a.startAt <0) a.startAt =0;
        for(a.i =a.startAt; a.i <active.queueHistory.length; a.i++) showLine(a.i);
    }
}
function showYesCancel(text,action){
    let a={"clickedYpx":-1, "boxEl":""};
    clock.gamePaused =1;
    active.queue =[]; l("queue DELETED: yesCancel returns control to the user.");
    a.clickedYpx = arguments[2]; a.clickedYpx =typeof(a.clickedYpx) !=='undefined'? a.clickedYpx : -1; // box position matters?
    active.yesCancelAction = action; // e.g. "doThis#x#y#z" - combines all variables until needed
    nav.yesCancelStatus ="on";
    O("yesCancelText").innerHTML =text;
    a.boxEl = O("yesCancel");
    // position of box
    if(a.clickedYpx >-1){ // vertical position matters
        if(a.clickedYpx > (gameSize.height /2))// clicked bottom half of screen?
                a.boxEl.style = "display:inline; left: 50%; bottom:" +(gameSize.height -a.clickedYpx +50)+ "px; transform: translate(-50%, 0);";
        else    a.boxEl.style = "display:inline; left: 50%; top:" +(a.clickedYpx +50)+ "px; transform: translate(-50%, 0);";
    }else       a.boxEl.style = "display:inline; left: 50%; top:50%; transform: translate(-50%, -50%);" // center
}
function testShowData(){
    let a={"room":"","s":0, "zoom":0};
    a.room = nav.sceneX %10 + "," +nav.sceneY % 10; // last digit of the scene number
    a.s = "scene(" +nav.sceneX+"," +nav.sceneY+ "," +nav.sceneZ+ "); room(" + a.room+ "); <span class='smaller'>type:'" +nav.sceneType+ "', howFarFromStart:</span>" +nav.howFarFromStart+ "<span class='smaller'>, howNatural:</span>" +nav.howNatural+ "<span class='smaller'>, howSprawling:</span>" +nav.howSprawling+ "<span class='smaller'>, defaultLand: " +nav.defaultLand+ ", facing: " +nav.facing+ "</span>";

    if(nav.mapStatus =="worldMap"){  // show zoom
        a.zoom = nav.worldMapZoom.toFixed(3); if(a.zoom ==1) a.zoom ="1"; // not too much precision, but not "1.000"
        a.s = "scene(" +nav.sceneX+"," +nav.sceneY+ "); <span class='smaller'>defaultLand: " +nav.defaultLand+ ", </span>>mapZoom:</span>" +a.zoom;
    }
    O("game-data").innerHTML =a.s;
}


addListeners();

loadJavascript("c/2-loadScene_0.js");
