// TESTING:     console search "NaN", "undefined", "error", "warning". Write "debugger" to force break
// MINIFY:      replace "l" (whole word only!!) with "// l", then enable "atom-auto-uglify" (edit-preferences-packages)
// FORCE LATEST VERSION: name_0 number at end = best practice for getting the latest files
// SAVING:      localStorage; maybe text to cut and paste to share with others. no PHP (yippee!)
// MORE: 		add code while running (to add to databases etc) "element.appendChild(whatToAppend)"
function l(what){console.log(what);}
function O(id){  return document.getElementById(id);}
class Ob {// for active.sceneObjects
    constructor() { this.db = ""; // db =data from database. "" ="new scene, not yet used"
                    this.x = 0; this.y = 0; }// y = BOTTOM of object. x,y =percent of screen
}
class Person{// what each person has
    constructor(thisName,thisRole,thisCos,thisSpriteXpositions,thisSpriteHeightPx,thisNotes){
        // visual
        this.name =thisName;
        this.cos =thisCos;
        this.spriteXpositions =thisSpriteXpositions;
        this.spriteHeightPx =thisSpriteHeightPx;
        this.role =thisRole;
        this.notes =thisNotes;
        // got
        this.stuff ={"money":100, "clothes":1.0, "food":1.0};
        this.wants ={ // if you have that thing, they will pay
                        "winningLotteryNumbers":1000 };// or "kiss" (frog prince), "conquest" (warrior), "magicTemple" (tower of Babel), etc.
        this.problems={}; // if you can remove that probelem, they will pay this much
                    // "frogCurse", "brokenLeg", "terribleAcne", etc.
        this.health =1.0;
        this.skills= {"talkToAnimals":0 };// e.g. Fish can find stuff at sea; ants can find dust-like stuff
                    // "geniePowers"= can give anything, but hidden limit triggers TRAP or LOSE ALL. Messing with dangeous powers!
        this.rights={"useBoat":0};// so can sail around. Also, keys to locked doors.
        // how people react
        this.moral=0.8;
        this.lastInteract="";// to avoid instant repeat of interaction.
        this.followedBy=[]; // they follow you to scenes. owns["name#lost"] =name does not follow. Owner gives reward if found.
        this.likes={};// e.g. {"name1":1.0, "name2":0.5},// how much you are likely to help that person
        this.clubs={};// ="likes" but for whole group; + reciprocal. Number = your status in group. 1.0 = you rule group; they always say yes
                        // e.g. {"aliens":0.5; "elvisFans":0.5; "guruFans":0; "towerOfBabel":1.0} Number of people in club = power of club, e.g. towerOfBabel
}}
class Change {// e.g. new Change("floorObj3", "doingWhat", "Chris", 1234, 5678, 90);
    constructor(change, idOrWho ="", details="", x =-1, y =-1, z =-1){
        this.change =change; // no default: MUST have this.
        this.idOrWho =idOrWho; // e.g. "Chris", "floorObj1", "floorObj" (for any floorObj)
        this.details =details; // split by "#": "bla#bla#bla"
        if(x <0){ this.x =nav.sceneX; this.y =nav.sceneY; this.z = nav.sceneZ;  } // default: current scene. IGNORED if the change does not need it
        else{ this.x =x; this.y =y; this.z =z;} // "needs" usually decides a particular scene or person
}}
//__________VARIABLES +dependent functions + m.fakeRandom ________________________________
var clock ={"delay":90, // in 1/1000 second: 80 or 90 looks best for walking
            "time":0,
            "nextTimer":0, // give it a value so that each use of it cancels the previous one
            "gamePaused":0, // should you check Animations?
            "tStart":0,"tEnd":0,"t0":0,"t1":0, "t2":0,// debugging timers: e.g. t2 = performance.now();
            "strangerChatTimer":0,
            "inactivityTimer":0, // for preloading
            "resetInactivityTimer":function(){
                clearTimeout(clock.inactivityTimer);
             // XXX    clock.inactivityTimer = setTimeout(clock.preLoadSomething, 1500)// nothing happens for a while? preload something
            },
            "preLoadSomething": function(){
                if(clock.gamePaused)return;
                clock.resetInactivityTimer();// ready for the next preload
                if(db.preload.length <1)return;
                l("No activity: preloading '" +db.preload[0]+ "'");
                O("preloadOffscreen").src =db.preload[0];
                db.preload.shift();// removes that first element
            },
            "preLoadAnimations":function(arrayOfAnimations){// e.g. preLoadAnimations(["locustAttack","scorpionAttack"])
                function preLoadAnimation(name){// LATER: preload LIST of
                    let f={"i":0, "img":"" };
                    for(f.i =0; f.i < db.animations[name].frames.length; f.i++){// for every frame
                        f.img = db.animations[name].path + db.animations[name].frames[f.i];// get image name
                        db.preload.push(f.img);// add it to list of images to preload when there is time
                    }
                }
                for(let d =0; d < arrayOfAnimations.length; d++) preLoadAnimation(arrayOfAnimations[d]);
            }
    },
    mouse ={   "Xpercent":50,
               "Ypercent":80,  // percent of screen
               "clickDone":0}, // called by "checkMouseClick()"
    gameSize ={ "midFloorY":0, // set by loadScene. Percent of game height, from BOTTOM
                "edgeX":0,     // counts as "not yet on screen" because 'addPersonNoQueue' can confuse the queue.
                "width":O("game").clientWidth, // width of an element in pixels, including padding, but not the border, scrollbar or margin.
                "height":O("game").clientHeight},
    test ={"skipRendering":0} // testing code speed (not DOM): load a thousand pages or something
var loaded={"storyEvents":0           // set to "1" when storyEvents loads
}
var m={ // math (not Math)
    "positiveInteger" : function(input){
        switch (typeof(input)){
            case "number" : { return (input >=0) ? 1 : 0;} // simple: it's type "number" and above 1
            case "string" : { return /^\d+$/.test(input); } // 'test' uses regex to find a match in a string.
                // '/^...$/' means from beginning to end of string, '\d' means it must be an integer. Goodness knows what the '+' is for, but it works.
            default : {return 0; }
        }
    },
    "distanceFrom":function(x1,y1,x2,y2){ // returns positive integer
        let a={"manyTargets":0, "xDif":0, "yDif":0, "result":0}; // e.g. villages spaced out EVERY multiple of x2 and y2
        a.manyTargets = arguments[4]; a.manyTargets =typeof(a.manyTargets) !=='undefined'? a.manyTargets : 0;
        if(a.manyTargets){
            x1 = Math.abs(x1); y1 = Math.abs(y1); x2 = Math.abs(x2); y2 = Math.abs(y2); // just in case
            a.xDif = Math.abs(x1 % x2); // remainder: e.g. if x1==20, x2==7,  remainder==6
            if(a.xDif > (x2/2))a.xDif = x2 - a.xDif; // e.g. x==20, x2==7, remainder==6 ==distance from LAST multiple of 7, ==1 from NEXT one
            a.yDif = Math.abs(y1 % y2);
            if(a.yDif > (y2/2))a.yDif = x2 - a.yDif; // e.g. x==20, x2==7, remainder==6 ==distance from LAST multiple of 7, ==1 from NEXT one
        }else{// just a simple calculation
            a.xDif = x2-x1;
            a.yDif = y2-y1;
        }
        a.result = Math.sqrt(Math.pow(a.xDif,2) + Math.pow(a.yDif,2));
        return Math.round(a.result); // a whole number
    },
    "random": function(){//returns from 0 to n-1. Default n=100
        let a={"outOf":0};
        a.outOf = arguments[0]; a.outOf =typeof(a.outOf) !=='undefined'? a.outOf : 100;
        return Math.floor(Math.random() * a.outOf); // Math.random returns 0-0.999999, so this returns 0-99
    },
    "seedRandom": function(seed,outOf=199){// random, but same for this seed
        let a = {"str":"", "n":0, "howManyDigits":0 }; // for stripping unwanted zeroes etc
        function checkInput(){// choosing from fewer then 2 choices
            if(outOf <2){// l("hmm -choose from " +outOf+ " (ignore if shuffling)");// seedShuffle reduces by 1 each time, to 1, then 0
                outOf =1;}
        }
        function stripZeroes(){ // the seed is often "123000, 124000" etc. so consecutive rooms get similar results
            a.str = seed.toString();
            if(a.str.includes("000"))a.str = a.str.replace(/000/g, ""); // "g" means global (every occurence)
            else if(a.str.includes("00"))a.str = a.str.replace(/00/g, ""); // single zeroes are OK
            a.n = parseInt(a.str);
        }
        function mixWithPi(){ // to get a nice long varied number
            a.n = a.n *Math.PI;
            // get rid of decimal point
            a.str = a.n.toString();
            a.str = a.str.replace(".", "");
            // read the last few numbers
            a.howManyDigits = outOf.toString().length; // e.g. if outOf is 100, you need 3 digits
            a.str = a.str.substring(a.str.length-a.howManyDigits, a.str.length);
            a.n = parseInt(a.str); // back to a number
        }
        checkInput();
        stripZeroes();
        mixWithPi();
        return a.n % outOf; // in case the number is too big
    },
    "seedShuffle": function(seed,array){ // seedRandom shuffle. Returns new array
        let a={"position":0, "temp":"", "i":0, "newArray":[]};
        a.newArray = array.slice();// makes a proper copy, not justa  reference
        for(a.i = array.length -1; a.i >= 0; a.i--){ // start at end. Swaps it with an earlier number
            //a.iminus1 = a.i-1;
            a.position = m.seedRandom(seed,a.i);//Math.floor(Math.random() * a.i); // a point somewhere in the first "i" values. e.g. position 5
            // make the swap
            a.temp = a.newArray[a.position]; // remember the early value
            a.newArray[a.position] = a.newArray[a.i];// make late value same as early value (a step in swapping them over)
            a.newArray[a.i] = a.temp; // early value is what late value USED to be
            // Then "i" MOVES BACK ONE so the randomly swapped value stays at the end. Then we will randomly swap fro the remaining pool.
        }return a.newArray;
    },
    "fakeRandom": function (seed=0, outOf=199, special=0){ // seed: 1,2,3, etc. to get different results for same room
        // prepare
        let a={ "x":0,"y":0,"z":0, // for calculating
                "lastXdigit":0 }; // for if different scenes need the same numbers (e.g. rooms in a house have the same house name)
        function inputIsOK(){
            if(outOf <0){ l("ERROR: m.fakeRandom trying to choose from negative number. Changing to positive");
                outOf= 0 - outOf;}
            outof= Math.floor(outOf); // just in case
            if(outOf <2)return 0; // i.e. you want to choose from an array with only 1 entry
            return 1;
        }
        function seedFromString(){
            if(typeof(seed) == "string"){ // e.g. use id as string
                let n = seed.charCodeAt(0); // often the same ("floorObj..."), so...
                if(seed.length >1) n+=seed.charCodeAt(seed.length -1);// last character: often 0,1,2
                n +=seed.length; // so "table1" and "tableObj1" get different seeds
                seed = n;
            }
        }
        function seedFromHouse(){// e.g. house owner: force SAME seed across multiple rooms
            if(special =="forHouse"){ // rooms share the same fakeRandom, e.g. for house owner
                a.x =Math.floor(nav.sceneX/10); // IGNORE scene numbers, use PARENT scene numbers then add which house
                a.y=Math.floor(nav.sceneY/10);
                a.lastXdigit = nav.sceneX % 10; // what room
                seed = Math.floor(a.lastXdigit/2); // seed = which house 0,1=>house0  2,3=>house1  4,5=>house2  6,7=>house3
            }
            else{ a.x =nav.sceneX; a.y=nav.sceneY; a.z=nav.sceneZ; }
            seed = (a.x * a.y) + a.z+ seed; // this unique number gives the same result each time
        }
        if(!inputIsOK())return 0; // problem? Maybe position 0 will work, who knows?
        seedFromString(); // e.g. so id name gives the same seed
        seedFromHouse();
        return m.seedRandom(seed,outOf);
    },
    "newNumber" : function(original,varyBy){ // varies a number, so all objects are not in same place
        let a=0; // number that ensures you don't get the same variation twice
        a = arguments[2]; a =(typeof(a) =='number')? a : 0; // increment: 1,2,3, etc. to get different results
        return original -(varyBy) + m.fakeRandom(a, varyBy *20)/10; // *20 then /10 so we get a decimal, not just 1 or 2
    }
}
var nav ={  // map
        // FIRST LINE: DO NOT CHANGE
        "worldMapGifWidth":5000,  "worldMapGifHeight" : 2837, "scenesPerPixel" : 1000,
        // metres: world map =5000px (40,000km) =>8km per px. 1scene = 8m (outside 80m). SIMPLIFY: 10m, 100m


        // San Francisco
        "mapPixel" : 2,// list of defined map pixels. 0=default, 1=islands, 2=SanFran, 9-snaeffels // read name, scenetype, etc. from this.
        "sceneX" : 407510, "sceneY" : 785500,  "sceneZ" : 0, //  x407,y785 = San Francisco. Add 500 to be the mid pixel
        // bedroom
        // "mapPixel" : 1, // position is measured relative to this
        //"sceneX" : 407511, "sceneY" : 785501, "sceneZ" : 0, //bedroom  in San Francisco
        // snaeffels
        //"mapPixel" : 9,
        //"sceneX" : 1953500, "sceneY" : 286500, "sceneZ":-2; // x 1000 and add 500 to be central pixel (nav.scenesPerPixel = 1000)


        "closestNamedPixel":0, // nearest defined city etc
        "atMapScene":0, // 1=yes, 2=yes + own picture. Set by checkIfAtMapLocation
        "mapStatus" : "off",
        "yesCancelStatus" : "off",// showing the yesCancel box?

        // map gif
        "worldMapZoom":    1,  "maxMapZoom" : 10,   "minMapZoom" : 1,  "minMapZoomX" : 1, // both zoom and zoomX for comparing Y and X
        "mapPixelYouWant": {"x":1000, "y":500}, // from map corner to the part you look at, after scaling
        "mapOffsetScaled": {"x":0,"y":0}, // =style.left  =how many pixels to move the scaled map
        "mapTarget":       [1164,2221,""],// [-1,-1],
        "mapOutline":[], // to be filled with 1000px image

        // sceneTypes
        "autoScene":1,
        "sceneTypes" : [" lounge ", " kitchen "," bathroom "," bedroom "," tent "," ship ",
                        " village "," town "," city "," govt ",
                        " countryside "," forest "," wilderness "," mountains "," desert "," coast "," sea ",
                        " tunnel "," cave "," caveClimb "," alien "],// caveCLimb is just a background image
                        // NOT DONE: castle, church, hall (government building) // just different objects on wall
                        //          inn, shop, workshop // user walks in FRONT of tables, owner stands behind them
        "riverScenes":" countryside forest village town city ",
        "castleScenes":" forest ",
        "sceneType" : " govt ", // " space " around word, so " horse " is not found in " seahorse "
        "ordinaryRooms" : " lounge bedroom bathroom kitchen castle hall inn shop ", // assume regular four walls
        "history" :[], // incremented when entering room. sceneList =[[x,y,z,name],[x,y,z,name],[x,y,z,name]],
        "i":-1,// sceneListPosition

        // local region
        "defaultLand":" wilderness ", // if you go too far from
        "howFarFromStart":0,// how many scenes from map location to user
        "howNatural":0, // how many scenes from " govt " centre to user
        "howSprawling":200, // if this contained " govt ", how many scenes would it be from the centre to defaultLand? (remember: outside jumps 10 at a time)

        // this scene
        "tunnelHints":{"howOften":3,"counter":0}, // e.g. every 3 correct tunnels see "Saknussemm" scratched in the wall
        "facing" : "north", // change N,S,E,W positions, e.g. for coast facing east
        "sceneName":"",
        "ownedBySurname":"",
        "personScale" : 1, // sprites are multiples of 12 pixels. Once scaled, must be whole pixels to avoid wobbling
        "entranceDoor" : "door1", // add person here. Change when moving between rooms

        "magicDoor" : {"door":"", "doesWhat":""},// overrides the current door, triggers something instead

        // functions
        "startGame" : function(){
            nav.minMapZoom = gameSize.height/nav.worldMapGifHeight;
            nav.minMapZoomX =gameSize.width/nav.worldMapGifWidth;
            if(nav.minMapZoomX >nav.minMapZoom)nav.minMapZoom = nav.minMapZoomX; // don't risk going too small!
            nav.mapPixelYouWantX = nav.sceneX/nav.scenesPerPixel; // from map corner to the part you look at, after scaling
            nav.mapPixelYouWantY = nav.sceneY/nav.scenesPerPixel;
        },

        "getDoorDirection" : function(n){ // dfault = north = no change:  1= north. // why is the function here? Used by loadScene AND by animate>goToScene
            switch(nav.facing){ // default faces north:  0 west,  1 north, 2 east,  3 south
                case "west" : { n = n-1; break;}      // 0 south, 1 west,  2 north, 3 east
                case "south": { n = n-2; break;}      // 0 east,  1 south, 2 west,  3 north
                case "east" : { n = n-3; break;}      // 0 north, 1 east,  2 south, 3 west
            }if(n <0)n = n +4;
            switch(n){
                case 0 : return "west";
                case 1 : return "north";
                case 2 : return "east";
                case 3 : return "south";
            }
            l("ERROR: could not get door direction from n='" +n+ "'. nav.facing=" +nav.facing);
        },
        "mapScene":{// what is nav.sceneX for that map location?
            "x":function(mapI){ return ((db.mapLocations[mapI].xPx +0.5) * nav.scenesPerPixel);},// set as HALF WAY through the pixel
                       // so "distance from mapPixel scene" makes sense: otherwise, one step left puts you in a different map location
            "y":function(mapI){ return ((db.mapLocations[mapI].yPx +0.5) * nav.scenesPerPixel);}
        },
        "removeYesCancel":function(){
            active.yesAction ="";
            O("yesCancel").style.display="none";
            O("circleOnMapClick").style.display="none";
            nav.yesCancelStatus ="off";
            clock.gamePaused =0;
        }
    };
nav.startGame();

var db ={ // "notes":" spaces " on each side, so you don't confuse " house " with " doghouse "
    // navigation
    "islands": [],
    "mapLocations" : [],
    "special": [{"name":"river", "x":0,"y":97.5, "cos":"i\\special\\river\\river-top.gif", "notes":" river "}],
    "walls"     : [],    "ceilings"  : [],    "floors"    : [],    "wallObjs"  : [],    "doorLefts" : [],    "doors"     : [],
                    "floorObjs" : [],    "tables"    : [],    "tableObjs" : [],

    // story
    "stories"   :[],
    "animations":{},
    "cutScenes" :{},
    "music"     : [],
    "videos"    :{},
    "notes"     : {}, // add MANY subcatagories at database stage
    "strangerChat" : [],
    "talkLists":{},// e.g. "hello ()foo" -> ()foo is replaced by a different string

    // places
    "street"    :{"starts":[],"ends":[],"signs":[]},
    "lane"      :{"starts":[],"names":[],"ends":[]},
    "coast"     :{"ends":[]},

    //people
    "people" : [],
    "names"     :{ // prefixes
                   "nickNamePrefixes":[],
                   "commonRank":[],// captain etc. Use with surnames
                   "imperialRank":{"female":[], "male":[]}, // king, etc. Use with FIRST names.
                   // names
                   "boys":[], // Simple strong names like "Jane" and "John"
                   "girls":[], // 19th century fiction and before.
                   "royalFemale":[], // combine with "saints.female" for plenty of female names
                   "saints":{"female":[],"male":[]}, // plenty of male names
                   "surnames":[],
                   "surnamesStrong":[],
                   // misc.
                   "angels":[],
                   "bible":{"patriarchs":[]},
                   "demons":[],
                   "exoticPlaces":[],// for ship names, etc. Also use "The" + girl's name
                   "explorers":[],
                   "heroes":[],
                   "gods":{ "aeons":[], "canaanite":[], "egyptian":[], "gnostic":[], "greek":[], "hittite":[], "titans":[]},// aeons =gnostic
                   "goddesses":{"canaanite":[], "egyptian":[], "greek":[], "hittite":[], "titans":[]},
                   "magic":[],
                   "myth":{ "creatures":[], "lands":[]},
                   "pharaohs":[],
                   "nouns":[] // huge list, for street names etc.
                  },
    "preload"   :[],// still images for animations: to instantly change images
    "spriteXpositions" : {// [spriteX, feetX, width]
                // [0default,1saysmile,2sayangry,3saysurprise,4saybig,5saysmall,6saymid,7side,8-15walk,16-18sit,19-21climb,22-26run,27-29reach]
                // how far foot moves: 8-9:31px  9-10:46px  10-11:41px  11-12:26px  12-13:47px  13-14:43px  14-15:34px  15-8:35px
                // always use the same array numbers when animating (simple). If a sprite can't do something (e.g. ship can't climb) use frame 0 (standing).
                "ship": [[0,119,220],[221,119,220],[0,119,220],[221,119,220],[0,119,220],[221,119,220],[0,119,220],//talk
                    [442,169,347],//side
                    [789,169,347],[1138,169,347],[1486,169,347],[1829,169,347],[789,169,347], [1138,169,347],[1486,169,347],[1829,169,347],//walk
                    [0,119,220],[0,119,220],[0,0,0],//bend (sit is deleted)
                    [0,119,220],[0,119,220],[0,119,220],//climb
                    [0,0,0],// (sit deleted)
                    [442,169,347],// side talk
                    [0,119,220],[0,119,220],[0,119,220]],//reach
                "default":  // talk (or any frames that must NEVER wobble) must be multiples of 96, and 96 wide
                    [[0,48,96],[96,48,96],[192,48,96],[288,48,96],[384,48,96],[480,48,96],[576,48,96],//talk frames 0-6
                    [672,46,88],//side 7
                    [760,86,164],[924,81,138],[1062,50,103],[1165,53,106],[1271,74,166],[1437,90,149],[1586,57,100],[1686,67,116],//walk 8-15
                    [1802,36,125],[0,0,0],// bend (sit is deleted) 16-17
                    [2195,33,97],[2293,33,98],[2393,18,93],//climb 18-20
                    [0,0,0],[0,0,0],// sit, talk 21-22
                    [2880,46,98],// side talk  23
                    [3168,48,96],[3264,48,96],[3360,48,96]//reach 24-26  //MULTIPLES OF 96
                    ],
                "default75":[], // 75% * default. Talk frames are 72px, not 96px (must be multiple of 12)  // 1/.75 =1.33333
                "default625":[], // 62.5% * default. Talk frames are 60px, not 96px (must be multiple of 12) // 1/.625 =1.6

                "monsterSnake":[[0,125,247]],// no talk, etc. Only use initial position, then apply simple animation
                "monsterSpider":[[0,135,277]],
                "monsterScorpion":[[0,130,254]],
                "monsterCricket":[[0,163,326]]
            },
    "s":{}
};
function scaleSpriteX(input, output, percent){ // create smaller versions: some children are saved at 75% or 60%
    let a={"i":0,"j":0};
    for(a.i=0; a.i <input.length; a.i++){
        output.push([]); // create that element
        for(a.j=0; a.j <input[a.i].length; a.j++) output[a.i].push(Math.round(input[a.i][a.j] * percent / 100)); // fill that element
    }// l("scaling to " +percent+ "%");
}
scaleSpriteX(db.spriteXpositions.default, db.spriteXpositions.default75, 75);
scaleSpriteX(db.spriteXpositions.default, db.spriteXpositions.default625, 62.5);

var active = { // people, actions, etc. that are currently being used
    "person" : "Chris", //people[0].name;//big hair boy";
    "health" : {"heroScore":0, "heroMoney":0, "foodAndWater":0, "hoursUnderground":0},
    "inventory":{"inv0":"","inv1":"","inv2":"","inv3":"","inv4":"","dropped":""},
    "queue" : [], // animation queue:  ([str,who,0]); each entry is an array: as big as you like
    "queueHistory" : [], // remember recent events - avoid being trapped in a loop, maybe later have "rewind" function, etc.
    "queueHistoryMax": 100, // how much history to remember?
    "sceneObjects" : { // id:name  e.g. "wallObj0":"clock5"
                        "wall":new Ob(), "floor":new Ob(), "ceiling":new Ob(), "wallObj0":new Ob(), "wallObj1":new Ob(), "wallObj2":new Ob(),
                        "door0":new Ob(), "door1":new Ob(), "door2":new Ob(), "door3":new Ob(),
                        "floorObj0":new Ob(), "floorObj1":new Ob(), "floorObj2":new Ob(), "floorObj3":new Ob(),
                        "table0":new Ob(), "table1":new Ob(),
                        "tableObj0":new Ob(), "tableObj1":new Ob(), "tableObj2":new Ob(), "tableObj3":new Ob(), "tableObj4":new Ob(), "tableObj5":new Ob(),
                        "veryBottom":new Ob(),
                        "person0":new Ob(), "person1":new Ob(), "person2":new Ob(), "person3":new Ob() },
                        // soon filled by objects; reset to empty strings by 'emptyScene'
    "lastClicked" : new Ob(),
    "yesCancelAction":"",  // guides clickYes()
    "bigTableObj" : {"name":"","x1":0,"x2":0}, // do not place people behind this statue, lamppost, etc. (unless hiding)
    "peopleScenes" : {}, //  e.g. { "polar bear":{"sceneX":123,"sceneY":456}, "bla":{} } // Keep track! So hero can find them, and not in 2 places at once
    "personInShip" : "", // when the scene demands a ship, remember the selected person!
    "queueShiftAndStore": function(){ // shift=remove item, store= remember it in history.
        active.queueHistory.push(active.queue[0]);
        if(active.queueHistory.length >active.queueHistoryMax)// too long?
            active.queueHistory.shift();// remove one from the start
        active.queue.shift();
    },
    "findFreeId":function(hint){// e.g. findFreeId("table") -> returns "table1" or "" if nothing suitable is found
        function available(id){
            if(active.sceneObjects[id].x ==-999)return 0; // deliberately offscreen, so cannot use
            if(active.sceneObjects[id].db !=="")return 0; // already used (was reset as "" when changing rooms)
            return 1;// still here? Good.
        }
        if((typeof(hint) =='undefined')||(hint =="")) hint = "floorObjs";// no idea? Place it on the floor.
        if(active.sceneObjects.hasOwnProperty(hint))return hint; // "hint" is already specific ("floorObj2" etc.)
        // bath, bed, etc. (large items), already caught by laodScene (sceneDifferences > addThisNow > prepareId)

        let c={"a":[],"i":0, "r":0}; //a = array of possible items; r = fakeRandom number
        if(hint.substring(0, 8) =="floorObj"){ // I might forget and write either "floorObj" or "floorObjs"
            c.a=["floorObj2", "floorObj1", "floorObj3", "floorObj0"]; // scrambled order
            if(m.fakeRandom() >99) c.a=["floorObj1", "floorObj2", "floorObj0", "floorObj3"]; // so not always same
            for(c.i =0; c.i < c.a.length; c.i++)// checks every object
                if(available(c.a[c.i])) return c.a[c.i];
        }
        else if(hint.substring(0, 8) =="tableObj"){
            c.r =m.fakeRandom(); // default: 0-199
            if(c.r >130)       c.a=["tableObj1", "tableObj3", "tableObj5", "tableObj0", "tableObj2", "tableObj4"];
            else if(c.r >66)  c.a=["tableObj4", "tableObj2", "tableObj0", "tableObj3", "tableObj1", "tableObj5"];
            else                c.a=["tableObj0", "tableObj1", "tableObj2", "tableObj3", "tableObj4", "tableObj5"];
            for(c.i =0; c.i < c.a.length; c.i++)if(available(c.a[c.i])) return c.a[c.i];
        }
        else if(hint.substring(0, 7) =="wallObj"){
            c.a=["wallObj1", "wallObj0", "wallObj2"];
            if(m.fakeRandom() >99) c.a=["wallObj0", "wallObj2", "wallObj1"];
            for(c.i =0; c.i < c.a.length; c.i++)if(available(c.a[c.i])) return c.a[c.i];
        }
        else if(hint.substring(0, 5) =="table"){
            c.a=["table0", "table1"];
            if(m.fakeRandom() >99) c.a=["table1", "table0"];
            for(c.i =0; c.i < c.a.length; c.i++)if(available(c.a[c.i])) return c.a[c.i];
        }
        else if(hint.substring(0, 4) =="door"){
            c.a=["door1", "door2", "door0", "door3"];
            if(m.fakeRandom() >99) c.a=["door2", "door1", "door3", "door0"];
            for(c.i =0; c.i < c.a.length; c.i++)if(available(c.a[c.i])) return c.a[c.i];
        }else if(hint.substring(0, 6) =="person"){
            c.a=["person3", "person2", "person1"];// person0 is always the hero
            if(m.fakeRandom() >99) c.a=["person2", "person1", "person3"];
            for(c.i =0; c.i < c.a.length; c.i++)if(available(c.a[c.i])) return c.a[c.i];
        }else return "";
    },
    "getIdFromName": function(name){
        let key=0;
        for (key in active.sceneObjects) {
            if(key ==name)return key;
            if ((active.sceneObjects[key].db.hasOwnProperty("name"))&&(active.sceneObjects[key].db.name == name)) // search all names on screen
                return key;
        }return ""; // not found
    },
    "changes":{ // ***CHANGES TO IDs***, not people etc. // store changes (e.g. "A sits on B") in ID ONLY, so no danger of person recodring something different
        "list":[], // [{"x":0,"y":0,"z":0, "idChanges":{ "floorObj2":["use image X","sat on by Y","has writing:kilroy was ere"]} }]
        "wantToAdd":[], // items to add, and how urgent they are
        "add":function(change, idOrWho="", details="", x=-1,y=-1,z=-1){ // add EVERY variant. E.g.("tall","all"),("tall","Fred"). Differences might matter.
            let tempChange = new Change(change, idOrWho, details, x,y,z); // e.g. ("doingWhat","Chris") x==-1 changes to CURRENT nav.sceneX etc.
            for(let i=0; i <active.changes.list.length; i++){ // already there?
                if(     (active.changes.list[i].change ==tempChange.change)
                    &&  (active.changes.list[i].idOrWho ==tempChange.idOrWho)
                    &&  (active.changes.list[i].details ==tempChange.details)
                    &&  (active.changes.list[i].x ==tempChange.x)
                    &&  (active.changes.list[i].y ==tempChange.y)
                    &&  (active.changes.list[i].z ==tempChange.z)
                )return; // must be PRECISE match. Small changes might matter
            }
            active.changes.list.push(tempChange); // still here?
        },
        "match":function(change, idOrWho="", details="", x=-1,y=-1,z=-1){  // E.g. list=[{"tall","all"},{"short","Fred"}] => "John" is tall, "Fred" is short
            let tempChange = new Change(change, idOrWho, details, x,y,z); // e.g. ("doingWhat","Chris") x==-1 changes to CURRENT nav.sceneX etc.
            function numbersMatch(a,b){ return((a==b)||(a ==-1)||(b ==-1));} // returns "1" if either is correct
            function wordsMatch(a,b){ return((a =="")||(b =="")||(a =="anything")||(b =="anything")||(a==b));}
            function changesMatch(a,b){ return(wordsMatch(a,b));} // might be in a "close enough" group
            function namesMatch(a,b){ return(wordsMatch(a,b));}
            function detailsMatch(a,b){ return(wordsMatch(a,b));}
            for(let i=0; i <active.changes.list.length; i++){
                if(     numbersMatch(tempChange.x, active.changes.list[i].x)
                    &&  numbersMatch(tempChange.y, active.changes.list[i].y)
                    &&  numbersMatch(tempChange.z, active.changes.list[i].z)
                    &&  changesMatch(tempChange.change, active.changes.list[i].change)
                    &&  namesMatch(tempChange.idOrWho, active.changes.list[i].idOrWho)
                    &&  detailsMatch(tempChange.details, active.changes.list[i].details)
                )return i;
            }// still here?
            return -1;
        }
    }
}
var story ={ // "titleFull":["",""], // for splitting, to look nice.
    "num":0, // "stories" is an array
    "version":0, // 0 = canonical.
    "title":"", // for convenience: save calculating it every time - used at top of screen
    "difficulty":0, // ask at start.   0="needs" stuff placed nearby.   1=further away.   2=nowhere: rely on random stuff.
    "vars":{},// e.g. "paradise":"eden", "godName":"God"
    "doorKeys":[],// e.g. [{"x":0,"y":0,"z":0,"dir":"north","key":{"doorKey":"notGot"}, // "key" might be many objects: need them all
    "cast":[],// for choosing strangers
    "maybe":{ "num":0, "version":0,"title":"",  "vars":{}, "starter":"" },
    "titleOff":"", // for timeOut, remove big title
    "history":[] // [0,6,0] = story 0, version 6, used 1 (0 = merely offered) // enables sharing: leads to the same variables
}
var strangers={
    "on":0, // Present in scene? E.g. no strangers on mountain.
    "which":0,
    "topic":0,
    "timeOfLastChange":0, // for when the timer is interrupted and the same person was talking for too long
    "timeToRandomTalk":0, // sometimes you want a gap before they start talking (e.g. after talking to them on some other topic)
    "maxTimeToRandomTalk":30,
    "who0":"",
    "who1":"" // if who2 joins a story, STOP them being a stranger - or "flipped" will mean they always face left.

}
function loadJavascript(fileName){ // load at the end of each section, so the previous one is fully loaded first
    var fileref=document.createElement('script');
    fileref.setAttribute("type","text/javascript");
    fileref.setAttribute("src", fileName);
    document.getElementsByTagName("head")[0].appendChild(fileref);
        l("Loaded javascript: " +fileName);
}
loadJavascript("c/1-coreFunctions_0.js");
