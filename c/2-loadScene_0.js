//______________LOAD SCENE________________________
function fillScene(){ // called by "nextGameFrame()" when it reads "active.queue" and finds "goToScene"
    l("FILLING SCENE (" +nav.sceneX+ "," +nav.sceneY+ "," +nav.sceneZ+ ")");
    showChanges();
    let a={"addRiver":0, "addCastle":0, "which":""}; // which: e.g. from "navigate('back')"
    clock.tStart = performance.now();  // measure how long this takes
    O("scene").style.display = "none"; // so no reflowing during this!
    a.which = arguments[0]; a.which =typeof(a.which) !=='undefined'? a.which : "";

    function checkIfAtMapLocation(){// used by emptyScene: removes EVERYTHING off screen (except the wall). Other scenes leave them on, ready to change.
        let b={"i":0, "scenePixel":{"x":0,"y":0}, "onIsland":0,
                "distX":0,"distY":0, "dist":0, "closestDist":0}; // nearestMapLocation: inherits its location details
        // prepare
        nav.atMapScene =0; // assume Not. 1=yes, 2=yes+picture
        nav.mapPixel = 0; // assume generic anywhere
        b.closestDist = nav.worldMapGifWidth * nav.scenesPerPixel;// assume the furthest possible point
        // current pixel
        b.scenePixel.x = Math.floor(nav.sceneX / nav.scenesPerPixel);
        b.scenePixel.y = Math.floor(nav.sceneY / nav.scenesPerPixel);
        for(b.i =2; b.i <db.mapLocations.length; b.i ++){// look through all map locations (0= generic, 1=island)
            // in the same pixel?
            if((db.mapLocations[b.i].xPx ==b.scenePixel.x)&&(db.mapLocations[b.i].yPx ==b.scenePixel.y))
                nav.mapPixel = b.i;
            // distance from the map pixel center scene
            b.distX = nav.mapScene.x(b.i) -nav.sceneX;
            b.distY = nav.mapScene.y(b.i) -nav.sceneY;
            b.dist = Math.hypot(b.distX, b.distY);// distance to this map location
            // l(db.mapLocations[b.i].name+ " is " +Math.round(b.dist/1000)+ "px from (" +Math.round(b.mapX/1000)+ "," +Math.round(b.mapY)/1000+ ")");
            if(b.dist <b.closestDist){
                nav.closestNamedPixel = b.i;
                b.closestDist = b.dist;
                if(b.dist ==0){// on that exact spot?
                    if(!db.mapLocations[nav.mapPixel].hasOwnProperty("z"))nav.atMapScene =1;// no Z specified? Must be on map surface
                    else if(nav.sceneZ == db.mapLocations[nav.mapPixel].z)nav.atMapScene =1;// specified and it's the same? Also good
                    if((nav.atMapScene ==1) &&  db.mapLocations[nav.mapPixel].hasOwnProperty("cos")) nav.atMapScene =2; // has wall image!
                    l("ON MAP LOCATION '" +db.mapLocations[b.i].name+ "'");
                    return; // your job here is done!
                }
            }
        }
        l("closest map location: '" +db.mapLocations[nav.closestNamedPixel].name+ "', " +Math.round(b.closestDist)+ " scenes away");

        // on an island harbour (where you start) // pick up island name here, lose it when you enter the sea
        b.onIsland = nav.sceneXYisIsland(nav.sceneX,nav.sceneY,nav.sceneZ); // 0 = not island, 1=on pixel, 2= precise corner harbour
        if(b.onIsland >0)nav.mapPixel =1; // 0= generic, 1 = island 2= named locations
        if(b.onIsland ==2)nav.atMapScene =1;// can use this for "name" etc.
    }
    function decideScale(){ // sprites are multiples of 12 pixels. Once scaled, must be whole pixels to avoid wobbling
        let b={"distant":0, // default distance is close. Only use c.distant if you have to.
                "targetAdultHeightPx": 0}; // i
        switch(nav.sceneType){
            case " city " : { b.distant =1;  break; }
            case " govt " : { b.distant =1;  break; }
            case " town " : { b.distant =1;  break; }
            case " village " : { b.distant =1;  break; }
            case " sea " : { b.distant =1;  break; }
            case " mountains " : { b.distant =1;  break; }
        }
        b.targetAdultHeightPx = gameSize.height * 0.5; // in pixels
        if(b.distant) b.targetAdultHeightPx *= 0.7;
        nav.personScale = b.targetAdultHeightPx / 300; // e.g. need typical adult to be 600px? Sprite for typical adult is 300px, so scale by 2
        nav.personScale = (Math.round(nav.personScale * 12)/12); // 1/12, 2/12, 3/12. etc. (Sprites are multiples of 12px, so creates whole pixels)
        if(nav.personScale <0.1) nav.personScale = 1/12; // just in case!
        //l("nav.personScale =" +nav.personScale+ ", b.targetAdultHeightPx=" +b.targetAdultHeightPx+ ", gameSize.height=" +gameSize.height);
    }
    function emptyScene(){
        active.sceneObjects={
            "wall":new Ob(), "floor":new Ob(), "ceiling":new Ob(), "wallObj0":new Ob(), "wallObj1":new Ob(), "wallObj2":new Ob(),
            "door0":new Ob(), "door1":new Ob(), "door2":new Ob(), "door3":new Ob(),
            "floorObj0":new Ob(), "floorObj1":new Ob(), "floorObj2":new Ob(), "floorObj3":new Ob(),
            "table0":new Ob(), "table1":new Ob(),
            "tableObj0":new Ob(), "tableObj1":new Ob(), "tableObj2":new Ob(), "tableObj3":new Ob(), "tableObj4":new Ob(), "tableObj5":new Ob(),
            "veryBottom":new Ob(),
            "person0":new Ob(), "person1":new Ob(), "person2":new Ob(), "person3":new Ob() };

        // special objects: not necessarily re-written in each scene
        let b={"bot":O("veryBottom"), "key":""}
        b.bot.style =""; b.bot.src ="";

        // mapPixel?
        if(nav.atMapScene == 2){ // at map location AND has its own wall image?
            for(b.key in active.sceneObjects){ // move EVERYTHING off screen
                if(b.key !="wall"){ // except the wall image
                    active.sceneObjects[b.key].x = -999;
                    O(b.key).style.width="0%";
                    O(b.key).style.left="-999px";// doesn't matter, as width is zero anyway
                }
            }
            O("streetSign").style.left="-999px";
        }else{ // only move people off screen
            O("person0").style.left="-999px";
            O("person1").style.left="-999px";
            O("person2").style.left="-999px";
            O("person3").style.left="-999px";
        }
        active.sceneObjects["person0"].x =-999;
        active.sceneObjects["person1"].x =-999;
        active.sceneObjects["person2"].x =-999;
        active.sceneObjects["person3"].x =-999;


        // clear DIVs
            // O("text").innerHTML = ""; // leave text: this will often change anyway.
        O("notifyBox").style.display ="none";
        O("strangerChat").style.display ="none";
        clock.strangerChatTimer =0;
        strangers.on =0;
        strangers.who0 ="";
        strangers.who1 ="";
    }
    function justUseAmapPicture(){
        if(!nav.autoScene){ l("TEST WARNING: not autoscene, so not checking room name etc. ")
            return 0;
        }
        if(nav.atMapScene != 2) return 0;// 2 = map location AND own picture
        // read values
        nav.sceneName = db.mapLocations[nav.mapPixel].name;
        nav.ownedBySurname = "Royal"; // assume outside
        if(db.mapLocations[nav.mapPixel].hasOwnProperty("midFloorY")) gameSize.midFloorY = db.mapLocations[nav.mapPixel].midFloorY;
        // sceneType
        if(db.mapLocations[nav.mapPixel].hasOwnProperty("sceneType")) nav.sceneType = db.mapLocations[nav.mapPixel].sceneType;
            else {nav.sceneType =" govt "; l("WARNING: mapPixel " + db.mapLocations[nav.mapPixel].name +" has no sceneType. Defaulting to ' govt '.");
        }

        // DOM changes
        let b=O("wall");
        b.style="left:0%; top:25%; width:100%; height:75%; z-index:24";
        b.src="i\\wall\\special\\" + db.mapLocations[nav.mapPixel].cos;
        // quick N_S_E_W
        b = O("door0");
        b.style="left:0%; top:25%; width:8%; height:75%; z-index:100";
        b.src="i\\transparent.png";
        b = O("door3");
        b.style="right:0%; top:25%; width:8%; height:75%; z-index:100";
        b.src="i\\transparent.png";
        b = O("direction0");
        b.style="left:1.2%; top:55%; z-index:100";
        b.src="c\\i\\w0.png";
        b = O("direction1");
        b.style="left:10%; top:50%; z-index:100";
        b.src="c\\i\\n1.png";
        b = O("direction2");
        b.style="left:85%; top:50%; z-index:100";
        b.src="c\\i\\e2.png";
        b = O("direction3");
        b.style="left:93%; top:55%; z-index:100";
        b.src="c\\i\\s3.png";
        decideScale(); // relies on sceneType
        return 1;// success!
    }
    function chooseScene(){
        if(!nav.autoScene) return; // when testing: click e.g. "lounge" and EVERY room is a lounge
        // hiding doors: see 'switch(nav.sceneType)'
        // compact village? Sprawling metropolis?
        if(nav.sceneZ % 2 ==-1){nav.sceneType =" caveClimb "; return;} // Z -1, -3, etc.
        nav.howSprawling = db.mapLocations[nav.mapPixel].hasOwnProperty("howSprawling") ? db.mapLocations[nav.mapPixel].howSprawling : 200;
        let b={ "lastXdigit": 0, "lastYdigit": 10,
                "defaultLand": " wilderness ", // from world map showing deserts etc

                "startScene": " govt ",  // from clicking on map (see db.mapLocations)
                "fromStartScene" :{"x":0,"y":0},

                "toCity":Math.ceil(nav.howSprawling *0.15),// Math.ceil rounds up (so you don't risk a zero)
                "toTown":Math.ceil(nav.howSprawling *0.35),
                "toVillage":Math.ceil(nav.howSprawling *0.55),
                "toCountryside":Math.ceil(nav.howSprawling *0.7), // howSprawling = how many scenes to the default land

                "landMargin":20, // distances between villages etc. (for use in defaultLand)
                "forestAtEvery":100,  "distToForest":0, // e.g. forest at every 100th scene in the wilderness (10 scenes = 1 outdoor scene)
                "villageAtEvery":200, "distToVillage":0,
                "mountainsAtEvery":300, "distToMountains":0,
                "tempLand": " wilderness ",
                "temp":0, "tempDir":"" // for "byCoast"
        };
        function getDefaultLand(){ // read the ASCII world map
            let c={"ASCIIx": Math.round(nav.sceneX/50000), // full map =5000px, 1 px =1000 scenes (100 outside). 1 scene =10m (outside =100m)
                   "ASCIIy": Math.round(nav.sceneY/50000),
                   "defaultMap": [ // D=desert,  W=wilderness,   F=forest, M=mountain  ASCII art: https://www.degraeve.com
//1234567890    5    0    5    0    5    0    5    0    5    0    5    0    5    0    5    0    56789
"                                      DD                                                            ", // line=0, y=0, sceneY =0
"                         D D   DDDDDDDDDD       D D               D                                 ", // 100 characters wide -> 5000 px main map
"                  DDD D D       DDDDDDDDD                  D      DDDDDD     DD                     ", // first character: sceneX = 0;
"               DDDDD DD DDD     DDDDDDD                   D   D  DDDDDDDDDDD   D                    ", // last character: sceneX = 99 x 50 scale x 1000 = 4,950,000
"     WWWWWW WDDD DDD DD D  D     DDDDDD          DDDDD   D  D DDDDDDDDDDDDDDDDDDDDDDDDDDDD          ",
"   WWWFFFFFFFFFDDDDDDDD   DD    DDD              WFFFD  DDDMDDDDDDDDDDDDDFFDDDDDDFFFFDDDDDDD        ", // line 5 = line 250 on big map, so sceneY = 250,000
"  WFFFFFMFFFFFFFDDDDDD     D    DD     W       WWF FFFFDDDMMDDDDDDFFFFFFFFFFFDDDDDDDDDDDDDDD        ",
"  FFFW WMMFFWWFFDDDD     DD      D             FFF F FFFFFFMMFFFFFFFFFFFFFFFFFFFFFFDDDD D           ",
"  F     WMMFFFFFFFFFF   DDDDD               W    F FFFFFFFFMMFFFFFFFFFFFFFFFFFFFFFF     FD          ",
"         MMFFFFFFFFFFF FFDDDD              WW     WFFFFFFFFMMFFFFWWWWWFFFFF FFFFFFFF     D          ",
"         MMFFFWWWFFFFFFFFFFFFF              W WWFFFFWWFFFFFWWWWWWWWWWWWWWFFFFFFFFFFFFW              ", // 500,000
"         FMFFWWWWWFFFFFFF F FF               WWFMFWFWWWWWWWWDDDDWWWWWWWMMWWDDDDDFFFFFF              ",
"         FMMFWWWWWFFFFFFFFFF                 WMMMFFMMW  WWWD DDDDWDWWWMMMDDDDDDDWWFFFF              ",
"         FMMDWWWWWF FF F                   FFF  W WFMW   WMWDDDDDDDDMMMDDDDDDDDDWWFFF  F            ",
"        FDMMDWWWWWWWWFW                    WW     WW WWWWWWM DDDDDWWMMDDDDDDDDDWW FF   F            ",
"        DDMMDDWWFFFFMW                     WW    W  W WWWWWWF DDDDWWDDDDDDDDDDWWW  F   F            ", // 750,000
"        DDMMDDDWFFFMMF                     MMMMMD      WWMMMWWWWWWWWMDDDWWFDWWWWWW  F FF            ",
"         WMMDDWFFFFW                      MMMMDDDD      WDDMWWDDDWWWWMMMWWWWWFFFWWW  F              ",
"         WMMDDWWF  W                      MMDDDDDDDDDDDDDDDD WDDDDMMWMMMMMWWFFWWFWF                 ",
"         W MMWW    W                     DDDDDDDDDDDDDDD DDDD FDDMMDDWWMMMMFFFWWFFF                 ",
"           MMW                          DDDDDDDDDDDDDDDD DDDDDD    DDDDDWWFFFFFFFFFW                ", // 1000,000
"            MM      F                   DDDDDDDDDDDDDDDDD DDDDDD   DDDDFW  FFFFFF                   ",
"            FMM F     F                 DDDDDDDDDDDDDDDDD DDDDDD     WWF   FWFF F                   ",
"              MFF                       DDWWDDWDDDDDDDDDDD DDD       WWW     WFF    W               ",
"                FF                      FWFFFFWWWWWWWWWWWDDDW        WW      FWFF                   ",
"                     WW W               FFFFFFFFFFWWWWWWWDD DD        W      F F                    ", // 1250,000
"                    FWWWFF               FFFFFFFFFFFFFWWWWDWDD        WW     F                      ",
"                    MWFFFFFF              FFF  FFFFFFFFWWWWDD                 F    F                ",
"                    MMFFFFFFF                    FFFFFFWWWWD                 FF   FF                ",
"                   WMMFFFFFFF                   FFFFFFFWWWD                   F  FFF F              ",
"                   WMFFFFFFFFFF                 FFFFFFFWWDD                   F  FF F   F F         ", // 1500,000
"                   MMFFFFFFFFFFFW                FFFFFFWWD                     F          FFF       ",
"                   DMMFFFFFFFFFFWW                FFFFFWWW                       W        FFF       ",
"                    MMFDFFFFFFFFW                 FFFFFFFF                                          ",
"                     MMMDFFFFFFWW                FFFWFFFFF                             FF  F        ",
"                      DMWFFFFFFWW                WWWWWFFFF  W                        WWWW  W        ", // 1750,000
"                       MWFFFFFFWW                DWWWWWWF  WF                       WWWWWWWW        ",
"                       MDDFFFFFW                  DWWWWW   WF                     WWWDDDDDDWF       ",
"                       MDDFWWW                    DDDWWW   W                     WDDDDDDDDDDF       ",
"                       MMDWWWW                    DDDDWW                         WDDDDDDDDDDWF      ",
"                       MMDWWW                      DDWW                          WWDDDDDDDDWW       ", // 2000,000
"                       MMWW W                      DDW                           WWWW WDDDWWF       ",
"                       MMWWW                       W                             W      WWWF        ",
"                       MMDW                                                             WWF       W ",
"                       MMD                                                                          ",
"                        WD                                                              F       W   ", // 2250,000
"                        WD                                                                    W     ",
"                                                                                                    ",
"                                                                                                    ",
"                                                                                                    ",
"                                                                                                    ", // 2500,000
"                            D                           D       DDDDDD DDDD                         ",
"                             D                      DDDDDDD DDDDDDDDDDDDDDDDDD                      ",
"                    DD DDDDDDDD          DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD                      ",
"                 DDDDDDDDDDDD     D  DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD                        ",
"                   DDDDDDDDDDDD   D DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD                          "] // 2750,000
            }
            // check they are inside the map!
            if(c.ASCIIx <0) c.ASCIIx =0;
            else if(c.ASCIIx >=c.defaultMap[0].length) c.ASCIIx =c.defaultMap[0].length -1; // just in case
            if(c.ASCIIy <0) c.ASCIIy =0;
            else if(c.ASCIIy >=c.defaultMap.length) c.ASCIIy =c.defaultMap.length -1;


            if(nav.sceneXYisLand( nav.sceneX, nav.sceneY)) { // more precise map (if loaded)
                l("sceneXYisLand: pixel=(" +Math.floor(nav.sceneX/nav.scenesPerPixel)+ "," +Math.floor(nav.sceneY/nav.scenesPerPixel)+ ")");
                switch(c.defaultMap[c.ASCIIy].charAt(c.ASCIIx)){
                    case("D"): {nav.defaultLand = " desert "; break;};
                    case("F"): {nav.defaultLand = " forest "; break;};
                    case("M"): {nav.defaultLand = " mountains "; break;};
                    default: {nav.defaultLand = " wilderness "; break;};
                };
            }else{                l("XXX mapXYis NOT Land");
                    nav.defaultLand = " sea ";
            }
        }
        function mapLocationSaysSea(){// in sea? All the same, Simple.
            if(!db.mapLocations[nav.mapPixel].hasOwnProperty("sceneType")) return 0;
            if(db.mapLocations[nav.mapPixel].sceneType == " sea "){
                nav.sceneType = " sea ";
                nav.defaultLand = " sea ";
                nav.howSprawling = 0;
                nav.howFarToOcean =0;
                nav.howNatural =10; // all that matters is this is more than "howSprawling"
                nav.howFarFromStart = Math.abs(b.fromStartScene.x) + Math.abs(b.fromStartScene.y);
                l("nav.mapPixel =" +nav.mapPixel+ ", nav.defaultLand =sea");
                return 1;

            }return 0;
        }
        function getInsideScene(){
            b.lastXdigit = nav.sceneX % 10;
            b.lastYdigit = nav.sceneY % 10;
            if(b.lastYdigit ==0) return 0; // must be outside
            //    every ten scene block is like this: // [2,0] = last digit in [sceneX,sceneY]
            //    [0,0]               [1,0]             [2,0][3,0]      [4,0][5,0]     [6,0][7,0]     [8,0][9,0] // outside
            //    floor plan 1:
            //    [0,1] entry lounge  [1,1] bedroom     [2,1][3,1]      [4,1][5,1]     [6,1][7,1]     [8,1][9,1]
            //    [0,2] lounge        [1,2] bathroom    [2,2][3,2]      [4,2][5,2]     [6,2][7,2]     [8,2][9,2]
            //    [0,3] kitchen       [1,3] bedroom     [2,3][3,3]      [4,3][5,3]     [6,3][7,3]     [8,3][9,3]
            //    [0,4] etc. unused
            //    floorObj0                             floorObj1       floorObj2      floorObj3      castle
            switch(b.lastYdigit){
                case 1 : { nav.sceneType = ( b.lastXdigit % 2) ? " bedroom " : " lounge "; break; }
                    // ( b.lastXdigit % 2) = "if you divide by 2, is there a remainder? i.e is it [1,1],[3,1],[5,1],[7,1] or [9,1]?
                case 2 : { nav.sceneType = ( b.lastXdigit % 2) ? " bathroom " : " lounge "; break; }
                case 3 : { nav.sceneType = ( b.lastXdigit % 2) ? " bedroom " : " kitchen ";break; }
            }return 1;
        }
        function getHowNatural(){ // sets nav.howNatural: how many scenes away from "govt"
            if(db.mapLocations[nav.mapPixel].hasOwnProperty("sceneType")) b.startScene = db.mapLocations[nav.mapPixel].sceneType;
            else {b.startScene =" govt "; l("WARNING: mapPixel has no sceneType. Defaulting to ' govt '."); // if in doubt, it's govt
            }
            b.fromStartScene.x = nav.sceneX - nav.mapScene.x(nav.mapPixel); // current sceneX minus mapPixel sceneX
            b.fromStartScene.y = nav.sceneY - nav.mapScene.y(nav.mapPixel);
            nav.howFarFromStart = Math.abs(b.fromStartScene.x) + Math.abs(b.fromStartScene.x); // how many scenes from government = how natural is your environment
            nav.howNatural = nav.howFarFromStart; // assume the start scene was " govt "
            switch(b.startScene){ // already away from govt?
                case " city ": { nav.howNatural +=b.toCity;  break; }
                case " town ": { nav.howNatural +=b.toTown;  break; }
                case " village ": { nav.howNatural +=b.toVillage;  break; }
                case " countryside ": { nav.howNatural +=b.toCountryside;  break; }
                case " forest ": { nav.howNatural +=b.toCountryside;  break; }
                case " mountains " : { nav.howNatural +=nav.howSprawling;  break; }
                case " desert ": { nav.howNatural +=nav.howSprawling;  break; }
                case " wilderness " : { nav.howNatural +=nav.howSprawling;  break; }
                case " tent ": { nav.howNatural +=nav.howSprawling;  break; }
                case " lounge ":  { nav.howNatural +=b.toTown;  break; }  // map goes to inside ? or underground sho who knows? Assume " town ""
                case " kitchen ":  { nav.howNatural +=b.toTown;  break; }
                case " bathroom ":  { nav.howNatural +=b.toTown;  break; }
                case " bedroom ":  { nav.howNatural +=b.toTown;  break; }
                case " tunnel ":  { nav.howNatural +=b.toTown;  break; }
                case " cave ":  { nav.howNatural +=b.toTown;  break; }
                case " alien ":  { nav.howNatural +=b.toTown;  break; }
                case " ship ": { nav.howNatural = nav.howNatural + nav.howFarToOcean + 10;  break; }
                case " sea ": { nav.howNatural = nav.howNatural + nav.howFarToOcean + 10;  break; }
                        // does not mean "1 scene from coast", just means "this scene is the sea." Distance from coast is decided by sceneX, etc.
            }
        }
        function getOutsideScene(){
            function getExpectedLand(){ // sets "templand" (for before final checks)
                function checkDefaultland(){ // you are outside normal countryside. Then where are you?
                    function randomVillages(){ // in defaultLand? Add random villages, forests, mountains etc.
                        if(nav.howNatural >(nav.howSprawling + b.villageAtEvery)){// far enough out for villages? ""
                            // get forest related land
                            b.distToForest = m.distanceFrom(nav.sceneX,nav.sceneY, b.forestAtEvery,b.forestAtEvery, 1);
                            if(b.distToForest <b.landMargin)b.tempLand = " forest ";
                            else if(b.distToForest <(2 * b.landMargin))b.tempLand = " countryside ";
                            else if(b.distToForest <(3 * b.landMargin))b.tempLand = " wilderness ";
                            // override this with village
                            b.distToVillage = m.distanceFrom(nav.sceneX,nav.sceneY, b.villageAtEvery,b.villageAtEvery, 1);
                            if(b.distToVillage <b.landMargin)b.tempLand = " village ";
                            else if(b.distToVillage <(2 * b.landMargin))b.tempLand = " countryside ";
                            else if(b.distToVillage <(3 * b.landMargin))b.tempLand = " wilderness ";
                            // override this with mountain
                            b.distToMountains = m.distanceFrom(nav.sceneX,nav.sceneY, b.mountainsAtEvery,b.mountainsAtEvery, 1);
                            if(b.distToMountains <b.landMargin)b.tempLand = " mountains ";
                            else if(b.distToMountains <(2 * b.landMargin))b.tempLand = " wilderness ";
                        }
                    }
                    b.tempLand = nav.defaultLand; // default... unless...
                    if(nav.howFarFromStart <b.landMargin) b.tempLand = b.startScene; // still close to map start point
                    else if(nav.defaultLand ==" sea "){ // an island in the sea? Add some wilderness around it
                        if(nav.howNatural <(nav.howSprawling + b.landMargin)) b.tempLand =" wilderness ";
                        else if(nav.howNatural == (nav.howSprawling + b.landMargin)) b.tempLand = " coast "; // right on the border? Add a coastline
                        else b.tempLand =" sea ";
                    }else if(nav.howNatural <(nav.howSprawling + b.landMargin)) b.tempLand =" wilderness "; // don't jump straight into desert or mountains
                    else randomVillages();
                }
                if(nav.howNatural < b.toCity) b.tempLand = " govt "; // only a few clicks from govt? sceneType is still govt
                else if(nav.howNatural < b.toTown) b.tempLand = " city "; // still here? Check if you have reached the town yet
                else if(nav.howNatural < b.toVillage) b.tempLand = " town ";
                else if(nav.howNatural < b.toCountryside) b.tempLand = " village ";
                else if(nav.howNatural < nav.howSprawling) b.tempLand = " countryside ";
                else checkDefaultland(); // beyond sprawling limit: in defaultLand
            }
            function checkByCoast(){
                nav.facing ="north"; // set default
                if(b.tempLand ==" sea ")return; // already defined as being at sea
                if(nav.sceneZ !==0)return; // coast is only on the surface

                function yesCoast(dir){//repetitive code
                    b.tempLand = " coast ";
                    nav.facing =dir;
                }

                if(db.mapLocations[nav.mapPixel].hasOwnProperty("distanceToCoast")){// a coast is defined within that pixel?
                    l("XXX coast: nav.mapPixel=" +nav.mapPixel+ ", has 'distanceToCoast' set");
                    let d = db.mapLocations[nav.mapPixel].distanceToCoast; // shortcut to {"east":5,"west":10}
                    if(d.hasOwnProperty("east")){
                        if(b.fromStartScene.x >= d.east){ // coast OR sea
                            if(b.fromStartScene.x == d.east) return yesCoast("east");
                            else b.tempLand = " sea "; // the rest of that pixel if now forced to be sea instead
                        }
                    }if(d.hasOwnProperty("west")){
                        if(b.fromStartScene.x <= (0 -d.west)){
                            if(b.fromStartScene.x == (0-d.west)) return yesCoast("west");
                            else b.tempLand = " sea ";
                        }
                    }if(d.hasOwnProperty("south")){
                        if(b.fromStartScene.y >= d.south){
                            if((b.fromStartScene.y == d.south)&&(b.tempLand != " sea ")) return yesCoast("south");
                            else b.tempLand = " sea ";
                        }
                    }if(d.hasOwnProperty("north")){
                        if(b.fromStartScene.y <= (0 -d.north)){
                            if((b.fromStartScene.y == (0-d.north))&&(b.tempLand != " sea ")) return yesCoast("north");
                            else b.tempLand = " sea ";
                        }
                    }
                }
                // on island pixel
                else{
                    let f={"mapXpx":0, "mapYpx":0, "remainder":0, "coastDistance":20};
                    if(nav.sceneXYisIsland(nav.sceneX,nav.sceneY) >0){
                        l("XXX coast: sceneXYisIsland(" +nav.sceneX+ "," +nav.sceneY+ "): true");

                        // y
                        f.remainder = nav.sceneY % nav.scenesPerPixel; // from 0 to 999: 1000 scenes per pixel.
                        // top edge of island pixel
                        if(f.remainder ==0) return yesCoast("north"); // FIRST option, as facing north is the default
                        // bottom edge
                        if(f.remainder >=(nav.scenesPerPixel -10)) return yesCoast("south");// outide scenes: steps of ten
                        // x
                        f.remainder = nav.sceneX % nav.scenesPerPixel;
                        // left edge of island pixel?
                        if(f.remainder ==0) return yesCoast("west");
                        // right edge of island pixel
                        if(f.remainder >=(nav.scenesPerPixel -10)) return yesCoast("east");
                        // NEXT PIXEL??
                                // island pixels are nearly ALWAYS in squares all defined as sea.
                                // so the next scene, not being an island will default to the sea
                        // tempLand for island?
                                // set elsewhere: do not change it here
                        return;
                    }
                }
                // still here? Default land or sea
                if(nav.atMapScene ==0){// remember: this is LAND (" sea " caused "return")
                    // prepare
                    let f={"scenesPerLandSeaPixel":0, "outside":{"x":0,"y":0}, "remainder":{"x":0,"y":0}, "nextOutsideScene":0};
                    f.scenesPerLandSeaPixel = nav.scenesPerPixel *5; // land/sea map is 1000px for 5000px map
                    f.outside.x = nav.sceneX - nav.sceneX %10;// the scene that ends in zero
                    f.outside.y = nav.sceneY - nav.sceneY %10;// the scene that ends in zero
                    // x
                    f.remainder.x = f.outside.x % f.scenesPerLandSeaPixel; // e.g. 5000 scenes per pixel + 0,1,2,..,4999
                    if(f.remainder.x ==0){// left edge of land/sea pixel
                        f.nextOutsideScene = f.outside.x -10; // outside scene to the left
                        if(!nav.sceneXYisLand(f.nextOutsideScene,f.outside.y)){// next to sea
                            l("XXX coast: next to sea (1), f.remainder.x=" +f.remainder.x+ ", f.outside.x=" +f.outside.x+ ", f.scenesPerLandSeaPixel=" +f.scenesPerLandSeaPixel);
                            return yesCoast("west");}
                    }else if(f.remainder.x ==(f.scenesPerLandSeaPixel -1)){// right edge: position 4999
                        f.nextOutsideScene = f.outside.x +10; // outside scene to the right
                        if(!nav.sceneXYisLand(f.nextOutsideScene,f.outside.y)){
                            l("XXX coast: next to sea (2), f.remainder.x=" +f.remainder.x+ ", f.outside.x=" +f.outside.x+ ", f.scenesPerLandSeaPixel=" +f.scenesPerLandSeaPixel);
                        return yesCoast("east");}
                    }
                    // y
                    f.remainder.y = f.outside.y % f.scenesPerLandSeaPixel;
                    if(f.remainder.y ==0){// top edge of land/sea pixel
                        f.nextOutsideScene = f.outside.y -10; // outside scene above
                        if(!nav.sceneXYisLand(f.outside.x, f.nextOutsideScene)){
                            l("XXX coast: next to sea (3): f.nextOutsideScene(Y)=" +f.nextOutsideScene+ ", f.remainder.y=" +f.remainder.y+ ", f.outside.y=" +f.outside.y+ ", f.scenesPerLandSeaPixel=" +f.scenesPerLandSeaPixel);
                            return yesCoast("north");}
                    }else if(f.remainder.y ==(f.scenesPerLandSeaPixel -1)){// bottom edge: position 4999
                        f.nextOutsideScene = f.outside.y +10; // outside scene below
                        if(!nav.sceneXYisLand(f.outside.x, f.nextOutsideScene)){
                            l("XXX coast: next to sea (4): f.nextOutsideScene(Y)=" +f.nextOutsideScene+ ", f.remainder.y=" +f.remainder.y+ ", f.outside.y=" +f.outside.y+ ", f.scenesPerLandSeaPixel=" +f.scenesPerLandSeaPixel);
                            return yesCoast("south");}
                    }
                }
            }
            getHowNatural(); // sets how far from start, howNatural, etc. // howNatural = how far along line from "govt" to "wilderness"
            getExpectedLand(); // sets b.tempLand
            checkByCoast(); // mapLocations might define a nearby coast
            if(nav.sceneTypes.includes(b.tempLand)){ nav.sceneType = b.tempLand;
                }else{nav.sceneType =" village "; l("WARNING: '" +b.tempLand+ "' is not a sceneType. Using ' village ' instead.");
                }
        }
        function zNotZero(){// in sky or underground?
            if(nav.sceneZ ==0)return; // on ground: not sky or tunnel, etc.
            if(nav.sceneZ <0){
                if([" govt "," city "," town "].includes(nav.sceneType) &&(nav.sceneZ >-3))// =built up area, and not too deep (>-3 means -2, -1, etc.)
                    nav.sceneType = " tunnel ";
                else nav.sceneType = " cave ";
            }else {// 0 was already caught. so muct be >1
                l("sceneZ is up in the sky: changing sceneType to 'alien' ");
                nav.sceneType = " alien "; // for now. LATER, add skyline, space, etc.
            }
        }
        function getSceneNameAndOwner(){ // owner = person who owns it, for house name purposes
            nav.sceneName =""; // re-set
            nav.ownedBySurname = "Royal"; // assume outside
            let c={"n":0, "lastYdigit":0, "xDif":0,"yDif":0,"zDif":0, "extraName":"", "streetNames":[]};
            c.lastYdigit = nav.sceneY % 10;
            // surname
            if(c.lastYdigit >0){ // inside?
                c.n = m.fakeRandom(0,db.names.surnames.length, "forHouse"); // "forHouse": tells it to get same result for different rooms
                nav.ownedBySurname = db.names.surnames[c.n]; // e.g. "Smith"
                // hyphenated?
                c.n = m.fakeRandom(0,7,"forHouse"); // takes ANY number, returns a number from 0 to n-1
                if(c.n ==1){ // only add "Bulwer-Lyton" etc. SOME of the time
                    if(nav.ownedBySurname.indexOf("-") ==-1){ // not already hyphenated?
                        c.n = m.fakeRandom(1,db.names.surnames.length,"forHouse"); // first number ensures it's a different fake number calculation
                        c.extraName =db.names.surnames[c.n]; // e.g. "Harrington-Jeeves"
                        if((c.extraName.indexOf("-") ==-1)&&(c.extraName !=nav.ownedBySurname)) // not already hyphenated?
                            nav.ownedBySurname =nav.ownedBySurname + "-" +c.extraName;
                    }
                }
            }
            // inside?
            if([" lounge ", " kitchen "," bathroom "," bedroom "," tent "].includes(nav.sceneType)){ // "the Smith house"
                //    [0,1] entry lounge  [1,1] bedroom     [2,1][3,1]      [4,1][5,1]     [6,1][7,1]     [8,1][9,1]
                //    [0,2] lounge        [1,2] bathroom    [2,2][3,2]      [4,2][5,2]     [6,2][7,2]     [8,2][9,2]
                //    [0,3] kitchen       [1,3] bedroom     [2,3][3,3]      [4,3][5,3]     [6,3][7,3]     [8,3][9,3]
                switch(nav.sceneType){
                    case " lounge " : {
                        if(c.lastYdigit ==1)nav.sceneName = "The " +nav.ownedBySurname+ " house"; // first room you enter
                        else nav.sceneName = "The " +nav.ownedBySurname+ " lounge";
                        break;
                    }
                    case " bedroom " : {
                        if(c.lastYdigit ==1)nav.sceneName = "The " +nav.ownedBySurname+ " master bedroom"; // first room you enter
                        else nav.sceneName = "The " +nav.ownedBySurname+ " bedroom two";
                        break;
                    }
                    default : {
                        nav.sceneName = "The " +nav.ownedBySurname+ nav.sceneType; // includes space at the end, so...
                        nav.sceneName = nav.sceneName.slice(0,-1); // returns that slice of the string. Negative numbers = from end.
                        break;
                    }
                }
                return;
            }
            // town?
            if([" govt "," city "," town "].includes(nav.sceneType)){
                // start with "north" etc?
                c.n = m.fakeRandom(0,6); // takes ANY number, returns a number from 0 to n-1
                if(c.n ==1){ // only add "north" etc. SOME of the time
                    c.n = m.fakeRandom(1,db.street.starts.length); // first number ensures it's a different fake number calculation
                    nav.sceneName = db.street.starts[c.n] +" "; // e.g. "north "
                }
                // the main word, e.g. "Jack"
                c.streetNames = db.names.nouns.concat(db.names.saints.male, db.names.saints.female, db.names.royalFemale); // join useful arrays of names
                c.n = m.fakeRandom(2,c.streetNames.length);
                nav.sceneName = nav.sceneName + c.streetNames[c.n] + " "; // e.g. "north Jack "
                // "street", "road", etc
                c.n = m.fakeRandom(3,db.street.ends.length);
                nav.sceneName = nav.sceneName + db.street.ends[c.n]; // e.g. "north Jack Terrace"
                return;
            }
            // country?
            if([" village "," countryside "," forest "," coast "].includes(nav.sceneType)){
                c.n = m.fakeRandom(0,6); // takes ANY number, returns a number from 0 to n-1
                if(c.n ==1){ // only add "north" etc. SOME of the time
                    c.n = m.fakeRandom(1,db.lane.starts.length); // first number ensures it's a different fake number calculation
                    nav.sceneName = db.lane.starts[c.n] +" "; // e.g. "north "
                }
                // the main word, e.g. "Jack"
                c.n = m.fakeRandom(2,db.lane.names.length);
                nav.sceneName = nav.sceneName + db.lane.names[c.n] + " "; // e.g. "north Jack "
                // "street", "road", etc
                if(nav.sceneType ==" coast "){
                    c.n = m.fakeRandom(3,db.coast.ends.length);
                    nav.sceneName = nav.sceneName + db.coast.ends[c.n]; // e.g. "north Jack Terrace"
                }else{
                    c.n = m.fakeRandom(3,db.lane.ends.length);
                    nav.sceneName = nav.sceneName + db.lane.ends[c.n]; // e.g. "north Jack Terrace"
                }
                return;
            }
            // default (sea, cave, wilderness, sky, etc.)
            // get x,y,z
            c.xDif = nav.sceneX - nav.mapScene.x(nav.closestNamedPixel); // relative to closestNamedPixel
            c.yDif = nav.sceneY - nav.mapScene.y(nav.closestNamedPixel);
            if(db.mapLocations[nav.mapPixel].hasOwnProperty("z")) c.zDif = nav.sceneZ - db.mapLocations[nav.mapPixel].z;
            else c.zDif = nav.sceneZ;
            function readable(num){  num = num.toFixed(2);  num =num *100; num = num/100; return num;   } // removes trailing zeroes
            if(c.yDif !=0){ // north or south
                c.yDif = c.yDif *10; // metres 1 scene =10m (outside, 10 at a time, =100m)
                if(c.yDif >=1000){  c.yDif = c.yDif/1000;  nav.sceneName =readable(c.yDif) + "km south"; }
                else if(c.yDif >0){  nav.sceneName =c.yDif + "m south";}
                else if(c.yDif <=-1000){  c.yDif = c.yDif/(-1000); nav.sceneName =readable(c.yDif) + "km north";  }
                else if(c.yDif <0){  nav.sceneName =(c.yDif *-1) + "m north";   }
            }
            if(c.xDif !=0){ // east or west
                c.xDif = c.xDif *10;
                if(nav.sceneName !="") nav.sceneName =nav.sceneName + ", ";
                if(c.xDif >=1000){ c.xDif = c.xDif/1000; nav.sceneName =nav.sceneName +readable(c.xDif)+ "km east";} // e.g. "32.10km east"
                else if(c.xDif >0){ nav.sceneName =nav.sceneName +c.xDif+ "m east"; }
                else if(c.xDif <=-1000){ c.xDif = c.xDif/(-1000); nav.sceneName =nav.sceneName +readable(c.xDif)+ "km west";}
                else if(c.xDif <0){ nav.sceneName =nav.sceneName +(c.xDif *-1)+ "m west";  }
            }
            if(c.zDif !=0){ // up or down
                if(nav.sceneName !="") nav.sceneName =nav.sceneName + ", ";
                if(c.zDif >=1000){ c.zDif = c.zDif/1000;  nav.sceneName =nav.sceneName +readable(c.zDif) + "km up";}
                else if(c.zDif >0){ nav.sceneName =nav.sceneName +(c.zDif *10) + "m up"; }
                else if(c.zDif <=-1000){ c.zDif = c.zDif/(-1000); nav.sceneName =nav.sceneName +readable(c.zDif) + "km down";}
                else if(c.zDif <0){ nav.sceneName =nav.sceneName +(c.zDif *-10) + "m down"; }
            }
            nav.sceneName =nav.sceneName +" from " + db.mapLocations[nav.closestNamedPixel].name;// must be "from" because not mapPixel
        }
        getDefaultLand();
        if(!mapLocationSaysSea()){ // sea?
            if(!getInsideScene()) // inside?
                getOutsideScene(); // outside?
        }zNotZero(); // tunnel, underwater, or sky? - last: based on surface sceneType
        getSceneNameAndOwner(); // based on sceneType, but might be used in filling the scene
                l("scene name='" +nav.sceneName+ "', owner='" +nav.ownedBySurname+ "'");
    }
    function FILL_SCENE_NOW(){ // called by "setTimeout" at end of "fillScene" so VALUES MIGHT CHANGE BY THEN
        //prepare
        let b={"styleAndSrc":[], "i":0,
            "doorWidth":10, // for now! // has to be defined here, not in "get style" - can't remember why
            // country roads: 189px on 1200px background
            "betweenDoors":72, // for fitting wallthisSceneObjects between doors
            "defaultHouseWidth":15,// changed later!!!!
            "removeStyles":function(arrayOfNames){ // e.g. removeStyles(["door1","door2"]);
                let c={"i":0, "objectToHide":""};
                for(c.i=0; c.i < arrayOfNames.length; c.i++){
                    c.objectToHide = arrayOfNames[c.i];
                    b.styleAndSrc.push([c.objectToHide,"",""]);
                }
            }
        };
        function SET_ALL_STYLES(){ //
            let c={ // doors
                    "doorHeight":55, "doorBottom":20,
                // floorObjs
                    "floorObjHeight":20,
                    "floorHeight":25, "floorZ":2,
                    "doorLeftBot":0, "doorLeftW":6,
                // tables (space in between, etc.)
                    "tableTop":10, "tableBottom":-1, // ... so cannot start further right than 100 -tableWidth -any gap
                    "numberOfTables":1, "tableWidth":70,
                    "maxGapBetweenTables":10, "halfGap":0 // for now
            };
            function setDefaults(){
                active.sceneObjects.door0.x =0;
                active.sceneObjects.door1.x =10;
                active.sceneObjects.door2.x =80;
                active.sceneObjects.door3.x ="right0"; // right0 is a reminder for "doLeft" to align from the right
                active.sceneObjects.floorObj0.x =24;
                active.sceneObjects.floorObj1.x =34;
                active.sceneObjects.floorObj2.x =50;
                active.sceneObjects.floorObj3.x =60;
                active.sceneObjects.table0.x =6;
                active.sceneObjects.table1.x =50;
                active.sceneObjects.tableObj0.x =9;
                active.sceneObjects.tableObj1.x =21;
                active.sceneObjects.tableObj2.x =21;
            }
            function addSomewhereInRoom(what, forId=""){ // e.g bathroom wants "bath", changes wants "bath" in specific id
                let d={"i":0,"j":0, "possiblesFussy":[],
                        // possiblesNotFussy (called by STYLES_AND_SOURCES)= ANY object for random filling, e.g. "flower", "spanner"
                        // possiblesFussy (called by sceneDifferences)= SPECIFIC object, e.g. "bath1", "bath2"
                        "possiblesFussylength":0, "positionInPossiblesFussy":0, "which":0,
                        "toGoWhere":"", "whatDb":"" // floorObjs, etc.
                    };
                    forId =arguments[1];// floorObj2, etc

                function alreadyHere(){ // bed, etc. already in active.changes, somewhere in this room?
                    if(typeof(forId) !=="undefined")return 0; // force it there anyway
                        // if "toGoWhere" is defined, this is probably called by "changes" so don't stop just because it is in changes!!
                    return active.changes.match("defineId", "anything", what); // e.g. does "defineId","floorObj0", "chair" exist?
                }
                function fillPossiblesFussy(){ // make list of Only the kind of object desired (e.g. bed). "notFussy" lists ANY object for that room.
                    function chooseDatabase(){
                        if(typeof(forId) =='undefined'){
                            forId ="";
                            d.whatDb =""; // depends on forId
                        }
                        else if(forId.substring(0, 8) =="floorObj")d.whatDb = "floorObjs";// could be "floorObj", "floorObj0", etc.
                        else if(forId.substring(0, 8) =="tableObj")d.whatDb = "tableObjs";
                        else if(forId.substring(0, 7) =="wallObj")d.whatDb = "wallObjs";
                        else if(forId.substring(0, 5) =="table")d.whatDb = "tables";
                        else {  forId ="";
                                d.whatDb =""; // depends on forId
                        }
                    }
                    function findPossiblesFussyIn(thisDb){ // search one particular database
                        for(d.j =db[thisDb].length -1; d.j >=0; d.j--){ // search that database
                            if(matches(what, db[thisDb][d.j]))  // looks for a match in "name" or "notes"
                                d.possiblesFussy.push(d.j); // e.g. positions2 =[1,4,26]; // positions within that database
                        }
                        if(d.possiblesFussy.length ==0)return 0;  // did not find any
                        // still here? found one!
                        if(d.whatDb ==""){ // you were guessing?
                            d.whatDb = thisDb; // in case it was not set
                            forId = thisDb; // e.g. "floorObjs" ("findFreeId" then narrows it down to "floorObj2" etc.
                        }
                        return 1;
                    }
                    chooseDatabase();
                    if((d.whatDb !="")&& findPossiblesFussyIn(d.whatDb) ) return 1;
                    // still here? Brute force search
                    if(findPossiblesFussyIn("floorObjs"))return 1; // also sets "d.whatDb"
                    if(findPossiblesFussyIn("tableObjs"))return 1;
                    if(findPossiblesFussyIn("wallObjs"))return 1;
                    if(findPossiblesFussyIn("tables"))return 1;
                    // still here? :(
                    l("ERROR: trying to add '" +what+ "' but cannot find it in any database!");
                    return 0;
                }
                function prepareId(){ // find best id; final check - is it free and usable?
                    function chooseId(){
                        if((what =="bed")||(what =="bath"))
                            forId = "floorObj2"; // large items only fit in one place
                        else if((typeof(forId) =="undefined")||(forId ==""))// no id defined?
                            forId =active.findFreeId(what);// choose ID, using the string as a hint
                        else forId =active.findFreeId(forId);// might be "tables" etc. - use this string as a clue
                    }
                    function checkId(){
                        if(forId =="")return 1; // waiting to be filled
                        if(active.sceneObjects[forId].x ==-999){
                                l("ERROR: cannot add '" +what+ "' to '" +forId+ "' because '" +forId+ "' is off screen.");
                                l("TO DO: objects you cannot add? Add to 'active.changes.wantToAdd' for the next suitable room");
                                return 0;
                        }
                        if((typeof(active.sceneObjects[forId]).db =='undefined')||(active.sceneObjects[forId].db =="")) // available!
                                return 1;
                        // still here? Bad.
                        l("ERROR: cannot add '" +what+ "' to '" +forId+ "' - already contains '" +active.sceneObjects[forId].db.name+ "'");
                        return 0;
                    }
                    if(!active.sceneObjects.hasOwnProperty(forId)) chooseId(); // not an Id? Could be "" or a hint (e.g. "bed" or "wallObj")
                    return checkId();// available and on screen?
                }
                function addObject(){ // adds to active.sceneObjects
                    d.positionInPossiblesFussy =m.fakeRandom(123, d.possiblesFussy.length); // returns 0 to possiblesLength-1
                    d.which = d.possiblesFussy[d.positionInPossiblesFussy]; // d.g. positions2 =[1,4,26]; // positions within db.floorObjs
                    active.sceneObjects[forId].db = db[d.whatDb][d.which];
                }
                if(alreadyHere()){ l("Not adding '" +what+ "' - it is already in the room.");
                    return; // check for "use#"+what
                }
                if(fillPossiblesFussy()){// found some candidates for specific items (e.g. bath) ("possiblesNotFussy" is for ANY random object to fill gaps)
                    if(prepareId()) // find it, check it is on screen
                        addObject();
                };
            }// end "addSomewhereInRoom"

            function sceneDifferences(){ // only check this once per scene (e.g. not for every door, every chair)
                function checkNeeds(){// add this to "changes"?
                    let f={ "what":"", "id":"",
                            "scenesWanted":"", "lookInDb":"",
                            "i":0, "j":0, // i: reads "whatToAdd"; j: reads database
                          }
                    if(active.changes.wantToAdd.length <1)return;
                    function checkThisNeed(){ // e.g. wantToAdd[["horse",2],["buggy",2]]
                        function wantItNow(){// add(bla,0)= force it;  add(bla,1)=wants unchanged scene;  add(bla,2)=any suitable scene
                            l("XXX reading 'wantItNow' for '" +f.what+ "'");
                            function findMatch(){
                                function lookIn(thisDb){ // search one particular database
                                    for(f.j =0; f.j < db[thisDb].length; f.j++){ // search that database
                                        if(matches(f.what, db[thisDb][f.j])){ // looks in "name" AND "notes"
                                            f.lookInDb =thisDb;
                                            f.scenesWanted= db[thisDb][f.j].for; // e.g. " lounge bathroom kitchen ship "
                                            return 1;
                                        }
                                    }return 0;
                                }
                                if(lookIn("floorObjs"))return 1;
                                if(lookIn("tableObjs"))return 1;
                                if(lookIn("wallObjs"))return 1;
                                if(lookIn("tables"))return 1;
                                if(lookIn("doors"))return 1;
                                // still here? :(
                                l("ERROR: need '" +f.what+ "' but cannot find it in any database!");
                                return 0;
                            }
                            f.canWait=active.changes.wantToAdd[f.i][1];// 0= force here; 1= next matching scene; 2= 2+no other changes; 3= 2+maybe (random)
                            if(!findMatch())return 0; // find its typical properties. Needed here and by "active.findFreeId"
                            if(f.canWait ==0)return 1; // force it into this scene

                            // >0: scenes must match
                            if(!f.scenesWanted.includes(nav.sceneType))return 0; // not a suitable scene
                            if(f.canWait ==1)return 1; // tmatchign scene is all you need

                            // >1: want an unchanged scene
                            if(active.changes.match("anything","anything","anything",nav.sceneX,nav.sceneY,nav.sceneZ) <0){// room not yet used?
                                if(f.canWait ==2)return 1; // that's all you need
                                // >2: very picky. Only accept 1/3, 1/4, etc.
                                if((1/f.canWait) < Math.random()) return 1;// bigger "canWait", less chance of being accepted
                            }
                            return 0;
                        }
                        function addWantedThing(){ l("Making a permanent change to this room: adding '" +f.what+ "' to changes");
                            f.id= active.findFreeId(f.lookInDb); // where to put it in this room?
                            if(f.id ==""){l("WARNING: cannot find a free space to put '" +f.what+ "' (database: '" +f.lookInDb+ "')");
                                return;
                            }
                            active.changes.add("defineId",f.id,f.what);// e.g.("defineId","floorObj2","buggy")"addSomewhereInRoom" makes it specific
                            l("XXX just added '" +f.what+ "' to '" +f.id+ "'");

                            active.changes.wantToAdd.splice(f.i,1);// remove that element (you are counting downwards: earlier elements are unaffected)
                        }
                        f.what=active.changes.wantToAdd[f.i][0];  // format: wantToAdd[["horse",2],["buggy",2]]
                        if(wantItNow())
                            addWantedThing();
                    }
                    l("XXX before checkNeeds:"); showNeeds(); showChanges();
                    for(f.i =active.changes.wantToAdd.length -1; f.i >=0; f.i--) // read DOWN through unassigned changes, as you might delete last item
                        checkThisNeed();
                    l("XXX AFTER checkNeeds:"); showNeeds(); showChanges();
                }
                function setMidFloorY(){
                    //midFloorY - also changed by "justAMapPicture"
                    gameSize.midFloorY =7;//default
                    if([" mountains "," alien "].includes(nav.sceneType))gameSize.midFloorY =0;//very low down
                }
                function riversAndCastles(){
                    // rivers (etc) every "n"th scene
                    if(nav.riverScenes.includes(nav.sceneType)) a.addRiver = nav.sceneY % 20; // A % B is modulus: like division, but gives the remainder.
                    if(a.addRiver && (nav.sceneType !==" countryside "))b.doorWidth= 20; // not countryside: those "doors" must be pixel perfect
                    if(nav.castleScenes.includes(nav.sceneType)) a.addCastle = (m.fakeRandom(9,5) <2) ? 1: 0; // 9 is just a seed. look for number from 0-5
                }
                function twoTables(){ // repetitive code in bedroom and lounge
                    c.numberOfTables =2;
                    c.tableWidth =38;
                    active.sceneObjects.tableObj1.x = active.sceneObjects.table0.x +12;
                    c.maxGapBetweenTables = 100 -active.sceneObjects.table0.x -(2 *c.tableWidth), // table2 is 'c.tableWidth' wide...
                    c.halfGap       = Math.round(c.maxGapBetweenTables/2);
                    active.sceneObjects.table1.x    = m.newNumber(active.sceneObjects.table0.x +c.tableWidth +c.halfGap, c.halfGap, "twoTables"); // m.newNumber(original,varyBy, seed) // seed can be string, so tables always get same result
                }
                function specificScenes(){ // e.g. bathroom has just 1 door, and a bath somewhere in room
                    // alphabetical
                    switch(nav.sceneType){
                        case " alien " : {
                            c.tableTop =-0.5;
                            active.sceneObjects.tableObj0.x = m.newNumber(20,20, 1);
                            active.sceneObjects.tableObj1.x = m.newNumber(60,20, 2);
                            active.sceneObjects.floorObj0.x = m.newNumber(14,5, 3);
                            active.sceneObjects.floorObj1.x = m.newNumber(37,6, 4);
                            active.sceneObjects.floorObj2.x = m.newNumber(56,6, 5);
                            active.sceneObjects.floorObj3.x = m.newNumber(77,5, 6);
                            break;
                        }
                        case " bathroom " : {
                            c.tableTop =11;
                            c.tableBottom = -0.5;
                            active.sceneObjects.door1.x = -999; // still loads, but to KEEP IT SIMPLE, just take the performance hit
                            active.sceneObjects.door2.x = -999; // bathrooms only have one door
                            active.sceneObjects.door3.x = -999;
                            active.sceneObjects.floorObj0.x = 10;
                            active.sceneObjects.floorObj1.x = 28; // avioid overlapping the bath
                            active.sceneObjects.floorObj2.x = 50;
                            active.sceneObjects.floorObj3.x = -999; // floorObj2 is the bath, so squashes out the other stuff
                            addSomewhereInRoom("bath"); // AFTER setting -999 (so "active.findFreeId" knows which ids are available)
                            break;
                        }
                        case " bedroom " : {
                            twoTables();
                            c.tableTop =11;
                            c.tableBottom = -0.5;
                            active.sceneObjects.door1.x = -999; // still loads, but to KEEP IT SIMPLE, just take the performance hit
                            active.sceneObjects.door2.x = -999;
                            active.sceneObjects.floorObj0.x = 10;
                            active.sceneObjects.floorObj1.x = 28; // avioid overlapping the bed
                            active.sceneObjects.floorObj2.x = 50;
                            active.sceneObjects.floorObj3.x = -999; // flooorObj2 is the bed, so squashes out the other stuff
                            addSomewhereInRoom("bed");
                            break;
                        }
                        case " cave " : { // cave door maze!
                            function caveDoorMaze(){ // e.g. active.sceneObjects.door1.x = -999 (this also triggers door icon to jump left)
                                let d={ "mazeX":0, "mazeY":0,// this maze is 50 rooms wide
                                        "caveMaze":[// 50 wide, 25 deep. Enter and leave at y=25. Gap at top and bottom so repeated maps join up
                                    //1234567 10 234567 20 234567 30 234567 40 234567 50 234567 60 234567 70 234567 80 234567 90 23456 100
                                    "+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ + +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+",
                                    "|a b     c|   |OOO|    w    |lOkOm|     |   |       |OOOOOOOOO  |OOO|OOO|OOOOOOOOO|     |   | |    z|",
                                    "+-+-+-+-+ + + +O+O+-+-+-+-+ +O+-+O+ +-+ + + +-+-+-+ +O+-+-+-+O+-+O+O+O+O+O+-+-+-+O+ +-+ + + + + + +-+",
                                    "|    a e|a  |d|O|OqO|OOO|  OOO|OOO|   | | |       | |O| |   |OOOOO|OOO|OOO|     |O  |   | | |   |   |",
                                    "+ + +-+ +-+-+ +O+-+O+O+O+-+O+-+O+-+-+ + + +-+-+-+ + +O+ + +-+ +-+-+-+-+-+-+-+-+ +O+-+-+-+ + +-+-+-+ +",
                                    "| |   |     | |O|OOk|O|OOn0p  |OOOOO| | |       |   |OOO|   | |  t  |   |       |O|OOO|   | |     | |",
                                    "+ +-+ +-+-+ + +O+O+-+O+-+-+-+-+-+-+O+ + +-+-+-+ +-+-+-+O+-+ +-+ +-+ +-+ + +-+-+-+O+O+O+ +-+ + +-+ + +",
                                    "| |   |   |   |O|O|OOO|   |   |   |o| | | |   |s   OOOOO|       | |   |     |    OOO|O| |   | |   | |",
                                    "+ + +-+ + +-+-+O+O+O+-+-+ + + + + +O+-+ + + + +-+-+O+-+-+ + +-+-+ +-+ +-+-+ +-+-+-+-+O+ + +-+-+ +-+ +",
                                    "| |     | |OOO|O|gOj|     | | | |  O    | | |  OOO|O|     | | |   |   |   | |OOO|OOOOO| | |   |     |",
                                    "+ +-+-+-+ +O+O+O+-+ + +-+-+ + + +-+O+-+-+ + +-+O+O+O+ +-+-+ + + +-+ +-+ +-+ +O+O+O+-+-+ + + + +-+ +-+",
                                    "|f  |OOO| |i|OOO|   |   |   |   |  OOO  |   |OOO|O|O| |       | |  OOO| |  OOO|OOO|   | |   |     | |",
                                    "+-+ +O+O+-+O+-+-+-+-+-+ + +-+-+-+-+-+O+-+-+-+O+-+O+O+ + +-+-+-+ +-+O+O+ + +O+-+-+-+ + + +-+-+-+-+-+ +",
                                    "|OOgOO|OOO|O|   |       |     |OOO  |O|OOOOOOO|  OOO| | |       |OOO|O|   |O|   |   |   |OOOOOOO|   |",
                                    "+O+-+-+-+O+O+ + + +-+-+ +-+-+ +O+O+-+O+O+-+-+-+-+-+-+ +-+ +-+-+-+O+-+O+-+-+O+-+ + +-+-+-+O+-+-+O+ + +",
                                    "|OOOOO|OOO|O| | |     |       |O|OOOOO|O|         | |     |     |OOO|OOOOOOO    | |   | |OOO|OOO| | |",
                                    "+-+-+O+O+-+O+-+ +-+-+ +-+-+ +-+O+-+-+-+O+-+-+ +-+ + +-+-+-+ +-+ +-+O+-+-+-+ +-+-+ + + + +-+O+O+-+ + +",
                                    "|OOOOO|hOO|O|   |     |     | |OOOOOrOOO|       | | |     | |   | |OOO| |   |   |   |   |  O|O    | |",
                                    "+O+-+-+-+O+O+ +-+ +-+ + +-+-+ +-+-+-+-+-+ +-+-+-+ + + +-+ + + +-+ +-+O+ + +-+ + + +-+-+ + +O+O+-+-+-+",
                                    "|O|OOOOOOO|O| |   |   |     |   |   |   |   |   | | |   |   | | |    O  |     |   |     | |O|OOOOOOO|",
                                    "+O+O+-+-+-+O+ + +-+-+-+-+ + +-+ + + + +-+-+ + + + + + +-+-+-+ + + +-+O+-+-+ +-+-+-+-+-+-+ +O+ +-+-+O+",
                                    "|O|OOOOOOOOO|   |     |   |     | |   |     | | |           | |   |OOO|   |     |   |     |O| |OOOOO|",
                                    "+O+-+-+-+-+-+-+-+ + +-+ + +-+-+-+ + +-+ +-+-+ +-+-+-+ +-+-+ + +-+ +O+-+-+ +-+-+ +-+ + +-+-+O+-+O+-+-+",
                                    "|O|   |       |   | |   |   |     | | | |     |       |     |   | |O|       | | |   |     |OOO|OOO| |",
                                    "+O+ + +-+-+-+ + +-+ + +-+-+ + +-+ + + + +-+ +-+ +-+-+-+ +-+-+-+ + +O+ +-+-+ + + + +-+-+-+-+-+O+-+O+ +",
                                    "OO  |   |   | |   |   |   | |   | |   |   |     |       |     | | |OOOOO|   | |   |  OOOOO| |O|OOO|OO",
                                    "+-+-+-+ + + + + + +-+-+ + + +-+ +-+-+-+-+ +-+-+-+ +-+ +-+ +-+ + +-+-+ +O+ +-+ +-+-+-+O+-+O+ +O+O+-+O+",
                                    "| |   | | | | | |   |   | |   |           |         | |   |   |       |O| | |OOOOOOO|O  |O|OOO|O|OOO|",
                                    "+ + + + +-+ + +-+-+ +-+-+ +-+-+ +-+-+-+-+-+ +-+-+-+-+ +-+ + +-+-+ +-+-+O+ + +O+-+-+O+O+ +O+O+-+O+O+ +",
                                    "|   | |     | |   |     |     | |     |   |   |     |   | |     | |   |O|   |OOOOO|OOO| |OOO|  OOO| |",
                                    "+ +-+ + +-+-+ + +-+-+-+ +-+-+ + + +-+ + +-+-+ +-+ + + + + +-+-+ + +-+ +O+-+-+-+-+O+-+-+ +-+-+ +-+-+ +",
                                    "| | |   |     | |   |   |   | | |   |   |   |     | | |   |     |     |OOO      |OOOOO|     |   |   |",
                                    "+ + +-+-+ +-+-+ + + + +-+ + + + +-+ +-+-+ +-+-+-+-+ +-+-+-+ +-+-+-+-+-+-+O+-+-+-+-+-+O+-+-+ +-+ + +-+",
                                    "|   |   |       | |   |   | | | | |     |         | |     |       | |    OOOOOOOOOOOOO|   | |   |   |",
                                    "+-+-+-+ + +-+ +-+ +-+-+-+-+ + + + +-+ +-+-+ +-+-+ + + +-+-+-+-+-+ + + +-+ +-+-+-+-+ +-+ + +-+ +-+-+ +",
                                    "| |     |   |   |   |         |   |         |   |   |             | |   | |   |       | |     |   | |",
                                    "+ + +-+-+-+ +-+ +-+ + +-+-+-+-+-+-+-+ +-+-+-+ +-+-+-+-+-+-+-+-+-+-+ +-+ +-+ +-+ +-+-+-+ +-+-+-+-+ +-+",
                                    "| |         | |     | | |  u  |     | |   |       |   |         |     |   |     | |   |         |   |",
                                    "+ +-+-+-+-+-+ +-+-+-+ + + +-+ + +-+ +-+ +-+ + +-+ + + + +-+-+-+ + + +-+-+ +-+-+-+ + + + +-+-+ + + + +",
                                    "| |         | | |   | | | |       |   |     | | |   | | |   |     | |     | |   |   | | | |   | | | |",
                                    "+ + +-+-+-+ + + + + + + + + +-+-+-+-+ +-+-+-+ + +-+-+ + +-+ +-+-+-+-+ +-+-+ + + +-+-+ + + + +-+-+ + +",
                                    "| | |     |   |   | | | | |   |   |   |  v  |       |       |       | |   |   | |   |   |     |   | |",
                                    "+ + + +-+ +-+-+ +-+-+ + + + +-+ + + +-+ +-+ +-+ +-+ +-+ +-+-+ +-+-+ + +-+ +-+-+ +-+ +-+-+-+-+ + +-+ +",
                                    "| | |   |     | |   |     | |   |   | |   | |   | | |     |       | |   | |     |   |       |   |   |",
                                    "+ + +-+-+-+ +-+ + + +-+ +-+-+ +-+-+-+ +-+ +-+ +-+ + + +-+ + +-+-+ + + + + + +-+-+ +-+ +-+-+ +-+-+ + +",
                                    "|    x    |   |   | |   |   |       |   |     |     |   | |     | |   |   |     | |     |   |  y  | |",
                                    "+-+ +-+-+ +-+ +-+-+ +-+ + + + +-+-+ +-+ +-+-+-+ +-+-+-+ +-+-+-+ + +-+-+-+-+-+-+ + + + + +-+-+ +-+-+ +",
                                    "|   |   |   |   | |     | |   |   |   | | |   |       |       | |           |   |   | |       |   | |",
                                    "+ +-+ + +-+ + + + +-+-+-+ +-+-+ + +-+ + + + + +-+-+ + +-+-+ +-+ +-+-+-+-+-+ + +-+-+-+ +-+ +-+-+ +-+ +",
                                    "|     |   |   |                 |   |       |       |     |               |   |       |       |     |",
                                    "+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ + +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"],
                                    // Every point can reached. Later: flip the maze for variety. Adapted from delorie.com/game-room/mazes/genmaze.cgi
                                    "arrayX":0, "arrayY":0, // 50 rooms = 100 characters in the array
                                    "caveN":"","caveE":"","caveS":"", "caveW":"",
                                    "cave":"", // |- = barriers.
                                    "holeLevel":0, "superDeepLoops":0, // a = hole on first level, b on 2nd. etc Loops: got to z, back to a
                                    "canClimbDown":0,  // for convenience. climbUp is auto created when you climb down. MUST go down to get up.
                                    "monster":0, "monsterId":""
                                };
                                function getPositionInMaze(){ // maze is INSIDE (could be under a house), so moves ONE at a time
                                    d.mazeX = nav.sceneX % 50; // 50 columns //  % = modulo = division remainder
                                    d.mazeY = nav.sceneY % 25; // 25 rows.
                                    d.arrayX = (d.mazeX * 2) +1; // the maze map has 2 spaces per scene (as it needs to record N,S,E and W)
                                    d.arrayY = (d.mazeY * 2) +1;
                                    l("position in maze:(" +d.mazeX+ "," +d.mazeY+ "), array position: (" +d.arrayX+ "," +d.arrayY+ ")");
                                }
                                function readLetters(){
                                    d.cave = d.caveMaze[d.arrayY].charAt(d.arrayX);// space, or "O" if you are on the route
                                    d.arrayX-=1;             d.caveW = d.caveMaze[d.arrayY].charAt(d.arrayX);
                                    d.arrayX+=2;             d.caveE = d.caveMaze[d.arrayY].charAt(d.arrayX);
                                    d.arrayX-=1; d.arrayY-=1; d.caveN = d.caveMaze[d.arrayY].charAt(d.arrayX);
                                    d.arrayY+=2;             d.caveS = d.caveMaze[d.arrayY].charAt(d.arrayX);
                                }
                                function hideSceneDoors(){// cave ALWAYS faces north. So door0=west, door1=north, door2=east, door3=south
                                    if(d.caveW =="|") active.sceneObjects.door0.x = -999;
                                    if(d.caveN =="-") active.sceneObjects.door1.x = -999;
                                    if(d.caveE =="|") active.sceneObjects.door2.x = -999;
                                    if(d.caveS =="-") active.sceneObjects.door3.x = -999;
                                }
                                function findHoles(){ // letters (a,b,c,etc) = holes at each level. The deeper you go, the more points you score
                                    function findAutoHoles(){
                                        d.holeLevel = d.cave.charCodeAt(0) -96; // ASCII a=97, b=98... z=122
                                        if((d.holeLevel <1)||(d.holeLevel >26)){// not a letter from a to z?
                                            if(d.cave =="O"){l("In the cave and not lost!");
                                            }else{l("cave code '" +d.cave+ "', nothing to see here.");
                                            }return; // no holes to find
                                        }
                                        // still here? must have found a hole!
                                        d.holeLevel = (d.holeLevel * -2) +1; // a=-1, b=-3, ... z= -51
                                        if(nav.sceneZ <-51){ // more than 26 layers down? How low can you go???
                                            d.superDeepLoops = Math.floor((0-nav.sceneZ)/52); // e.g. -51=>0, -52=>1
                                            d.holeLevel = d.holeLevel % 52; // so -52 goes back to 0, -53 goes to -1, etc.
                                        }
                                        if(d.holeLevel == (nav.sceneZ -1)% 52){ // hole below, allowing for looping after 52
                                            d.canClimbDown =1;
                                            l("cave code '" +d.cave+ "' =holeLevel "+d.holeLevel+ ": HOLE BELOW (auto creates hole up in scene below)");
                                        }
                                    }
                                    function checkHoleDownwards(){ // adds hole object: clicking it triggers "climbDown"
                                        if(!d.canClimbDown)return; // no hole here
                                        function emptyTables(){
                                            active.sceneObjects.tableObj0.x =-999;  active.sceneObjects.tableObj1.x =-999;
                                        }
                                        addSomewhereInRoom(" clickCutScene^climbDownCave2 ");// uses table slot
                                        active.sceneObjects.table0.x = m.newNumber(20,4, "table0");// fairly central
                                        emptyTables(); // cavehole uses tables, so don't have anything on top
                                    }
                                    findAutoHoles();
                                    checkHoleDownwards();
                                }
                                function addMonster(){
                                    d.monster = m.fakeRandom(0,5); // (seed, outOf) // number from 0 to(n-1)
                                    if(d.monster <3)addSomewhereInRoom(" monster ");
                                }
                                getPositionInMaze();
                                readLetters();
                                hideSceneDoors();
                                findHoles();
                                addMonster();
                            }// end caveDoorMaze
                            nav.facing ="north"; // always faces north. Makes the maze easier to code
                            caveDoorMaze(); // do LAST, after any -999s are set (calls "active.findFreeId", needs to know which ids are free)
                            break;
                        }
                        case " caveClimb " : { // everything is set to transparent, so it doesn't matter
                        }
                        case " city " : {
                            b.doorWidth= 15.75;
                            c.tableTop =-2;
                            c.doorHeight =25; c.doorBottom =26;
                            active.sceneObjects.door1.x = (a.addRiver) ? 0 : 5;
                            active.sceneObjects.door2.x = (a.addRiver) ? (100 -b.doorWidth) : (95 -b.doorWidth);
                            b.betweenDoors = active.sceneObjects.door2.x -(active.sceneObjects.door1.x + b.doorWidth); // see also betweenDoors(); recalculate often: based on stuff that changes
                            b.defaultHouseWidth = (b.betweenDoors/4) + 0.8;
                            active.sceneObjects.floorObj0.x = active.sceneObjects.door1.x + b.doorWidth -0.5;
                            active.sceneObjects.floorObj1.x = active.sceneObjects.floorObj0.x + b.defaultHouseWidth -0.75;
                            active.sceneObjects.floorObj2.x = active.sceneObjects.floorObj1.x + b.defaultHouseWidth -0.75;
                            active.sceneObjects.floorObj3.x = active.sceneObjects.floorObj2.x + b.defaultHouseWidth -0.75;
                            c.floorObjHeight =30;
                            c.floorHeight =15;
                            active.sceneObjects.tableObj0.x = 14 + m.fakeRandom(0,62);
                            break;
                        }
                        case " coast " : {
                            c.tableTop =-0.5;
                            doorLeftZ =5; // so the coastline is behind the pier
                            active.sceneObjects.floorObj0.x = -999; // still loads, but to KEEP IT SIMPLE, just take the performance hit
                            active.sceneObjects.floorObj1.x = -999;
                            active.sceneObjects.floorObj2.x = -999;
                            active.sceneObjects.floorObj3.x = 85; // pier. For bottom, see "doBottomAndZ" // floorObjs and wallObj vary up and down
                            c.doorLeftBot =47;
                            c.doorLeftW =15;
                            break;
                        }
                        case " countryside " : {
                            b.doorWidth= 15.75;
                            c.tableTop =-2;  // no tables, objects are on ground
                            c.doorHeight =28.875;   c.doorBottom =15; active.sceneObjects.door2.x =74.25; // country roads are 15.75 wide, plus 10% at edge
                            break;
                        }
                        case " govt " : {
                            active.sceneObjects.tableObj0.x = 14 + m.fakeRandom(0,62);
                            break;
                        }
                        case " kitchen " : {
                            active.sceneObjects.door0.x = -999; // cannot go west. Kitchen opens north and east
                            c.door4left = -999; // cannot go south UNLESS this is a special longer scene
                            break;
                        }
                        case " lounge " : {
                            twoTables();
                            c.doorHeight =45; c.doorBottom =21.5; doorLeftZ =3; // behind tables: user assumes his back is to a wall, so does not worry about this
                            active.sceneObjects.door0.x = -999; // cannot go west. Lounge iopens north, east and south
                            break;
                        }
                        case " mountains " : {
                            c.floorHeight =15; floorZ =6;
                            active.sceneObjects.door1.x =0; c.doorBottom=0; c.doorHeight =75; b.doorWidth =15; active.sceneObjects.door2.x =85;
                            c.tableTop =-2;
                            active.sceneObjects.tableObj0.x = 14 + m.fakeRandom(0,62);
                            break;
                        }
                        case " sea " : {
                            c.floorHeight =37.5;
                            break;
                        }
                        case " ship " : {
                            c.tableTop =6;
                            c.tableBottom = -6;
                            break;
                        }
                        case " tent " : {
                            c.tableTop =-0.5;  // no tables, objects are on ground
                            break;
                        }
                        case " town " : {
                            b.doorWidth= 15.75;
                            c.doorHeight =15; c.doorBottom =30;  active.sceneObjects.door1.x = (a.addRiver) ? 0 : 6;
                            c.floorHeight =15;
                            break;
                        }
                        case " tunnel " : {
                            c.floorHeight = 15;
                            c.doorHeight =45; c.doorBottom =15;
                            break;
                        }
                        case " village " : {
                            c.tableTop =-0.5;
                            c.doorHeight =45;  // doors not as high, or houses look enormous
                            break;
                        }
                    }
                }
                function setBetweenDoorsValue(){// just sets that value
                    if((active.sceneObjects.door1.x >0)&&(active.sceneObjects.door2.x >0))
                        b.betweenDoors = active.sceneObjects.door2.x -(active.sceneObjects.door1.x + b.doorWidth);
                }
                setMidFloorY(); // used in lots of places
                riversAndCastles();
                checkNeeds(); // e.g. "needs('boxes')" does not yet have a fixed scene. Could this be the scene?
                    // changes are read by 'SET_ALL_STYLES' (because changes could be many different things)
                specificScenes(); // stuff that depends on sceneType: e.g. width =5, add bath ("addSomewhereInRoom")
                setBetweenDoorsValue(); // used when deciding object widths
            }//end sceneDifferences
            function STYLES_AND_SOURCES(){
                let d={"src":"", "key":""};
                // SPECIFIC floorObjs etc
                function STYLE_AND_SOURCE(id,path, thisStyle, initialHeight){
                    function idNeedsToBeSet(){ // not removed, not already set
                        if(active.changes.match("removed",id) >-1){  l("XXX '" +id+ "' is REMOVED");
                            active.sceneObjects[id].x =-999; // ensure it is off screen
                            return 0;
                        }
                        if(active.sceneObjects[id].db !=="")return 0; // already defined
                        if(active.sceneObjects[id].x ==-999) return 0; // off screen
                        return 1;
                    }
                    function definedInChanges(){// e.g.("defineId","floorObj2","buggy")"addSomewhereInRoom" makes it specific
                        let g = active.changes.match("defineId",id);
                        if(g >-1){  l("changes: " +id+ " now set as '" +active.changes.list[g].details+ "'");
                            addSomewhereInRoom(active.changes.list[g].details, id)
                            return 1;
                        }return 0;
                    }
                    function chooseObject(){ // for particular id. Contrast "addSomewhereInRoom" (can use any suitable id)
                        let g={"whatArray":[], "possiblesNotFussy":[],"possiblesLength":0, "positionInPossibles":-1};
                            // possiblesNotFussy = for random filling. E.g. bath, table.  possiblesFussy = SPECIFIC needed object, e.g. bath

                        function chooseObjectArray(path){ // e.g. path is "wall" so array is 'walls'
                            switch(path){
                                case "i\\wall\\"       : { g.whatArray  = db.walls;     return; }
                                case "i\\ceiling\\"    : { g.whatArray  = db.ceilings;  return; }
                                case "i\\floor\\"      : { g.whatArray  = db.floors;    return; }
                                case "i\\wallObj\\"    : { g.whatArray  = db.wallObjs;  return; }
                                case "i\\door\\"       : { g.whatArray  = db.doors;     return; }
                                case "i\\doorLeft\\"   : { g.whatArray  = db.doorLefts; return; }
                                case "i\\floorObj\\"   : { g.whatArray  = db.floorObjs; return; }
                                case "i\\table\\"      : { g.whatArray  = db.tables;    return; }
                                case "i\\tableObj\\"   : { g.whatArray  = db.tableObjs; return; }
                                case "i\\special\\streetSign\\" : { g.whatArray  = db.street.signs; return; }
                            }
                            l("ERROR! no array for path '" +path+ "'"); // still here?
                        }

                        function chooseObjectFromArray(){ // fills "g.possiblesNotFussy" using "g.whatArray", then chooses one for "active.sceneObjects[id].db"
                            g.possiblesNotFussy =[]; // reset
                            let h={"i":0, "which":0};
                            for(h.i =g.whatArray.length -1; h.i >=0; h.i--){
                                if("for" in g.whatArray[h.i]){
                                    if(g.whatArray[h.i].for.includes(nav.sceneType)){
                                        // SPECIAL: big wide objects
                                        if((g.whatArray[h.i].hasOwnProperty("notes"))&&(g.whatArray[h.i].notes.includes(" bigWide "))){
                                            if((id =="floorObj2") || !path.includes("floorObj") ) // only floorObj2 or non-floorObjs can be "bigWide"
                                                    g.possiblesNotFussy.push(h.i);
                                            else if(g.possiblesNotFussy.length ==0){l("WARNING: having trouble finding '"+id+"' that is not 'bigWide'");
                                                    }
                                        }else
                                            if((g.whatArray[h.i].hasOwnProperty("notes"))&&(g.whatArray[h.i].notes.includes(" notRandom "))){// not for random use
                                            }else{ g.possiblesNotFussy.push(h.i); // don't use "notRandom" stuff
                                        }
                                    }
                                }
                            }
                            g.possiblesLength = g.possiblesNotFussy.length;
                                if(g.possiblesLength <1){l("ERROR: cannot find any '" +id+ "' for '" +nav.sceneType+ "'");
                                }
                            g.positionInPossibles =m.fakeRandom(id, g.possiblesLength); // "id" is the seed. Returns 0 to g.possiblesLength-1
                            g.which = g.possiblesNotFussy[g.positionInPossibles];
                            active.sceneObjects[id].db =g.whatArray[g.which];
                        }

                        function avoidDuplicates(){ // if "alreadyInRoom" choose something else instead
                            let h={"key":0, "cos":"", "i":0, "which":0};
                            function alreadyInRoom(){ // looks for "active.sceneObjects[id].db"
                                for(h.key in active.sceneObjects){ // checks every object in scene
                                    if(active.sceneObjects[h.key].db ==active.sceneObjects[id].db)return 1;// already there?
                                }return 0;
                            }
                            for(h.i =0; h.i <=g.possiblesLength; h.i++){ // h.i = maximum number of tries: one for every object in "g.possiblesNotFussy" list
                                if(!alreadyInRoom() )break;
                                if(g.possiblesLength <1)break; // no other possible choices, bad luck
                                // still here? "active.sceneObjects[id].db" is already in the scene!
                                g.positionInPossibles++; // sue the NEXT possible object instead of the bad one
                                if(g.positionInPossibles >=g.possiblesLength)g.positionInPossibles =0; // loop at end if needed
                                h.which = g.possiblesNotFussy[g.positionInPossibles]; // now using that next object instead
                                active.sceneObjects[id].db =g.whatArray[h.which];// update active.sceneObjects[id].db to the next one. Parent loop will now check if THIS is already used as well.
                            }
                        }
                        chooseObjectArray(path);
                        chooseObjectFromArray();
                        avoidDuplicates();
                    } // end "chooseObject"
                    function addAnyChanges(){
                        // let g = active.changes.match("hasWritingOnIt", id, "kilroy was ere");
                    }
                    function DO_STYLE(){ // TO TEST: thisStyle =thisStyle+"border: 2px solid red; ";
                        let f={"zIndex":0, "itemNotes":"", "src":""};

                        function shortCuts(){ // IDs that don't need much work
                            if((active.sceneObjects[id].db =="")||(active.sceneObjects[id].x ==-999)) return 1; // nothing to style, or offscreen
                            d.src = active.sceneObjects[id].db.cos;
                            if(id=="wall"){
                                thisStyle="left:0%; top:25%; width:100%; height:75%; z-index:24; opacity:0.9;";// opacity lighter to not confuse with front
                                return 1;
                            }else if(id=="ceiling"){
                                if((nav.sceneType ==" tunnel ")||(nav.sceneType ==" cave ")) thisStyle ="left:0%; width:100%; top:25%; height:10%; z-index:101";
                                else thisStyle ="left:6%; width:88%; top:25%; height:4%; z-index:101";
                                return 1;
                            }
                            active.sceneObjects[id].y = -999; // default
                            f.itemNotes = active.sceneObjects[id].db.notes;// for convenience
                            if(typeof(f.itemNotes) !=='string') f.itemNotes ="";  // just in case
                            return 0;
                        }
                            // do bottom FIRST: height ("fromCeiling") may depend on it
                        function doBottomAndZ(){ // or top // floorObjs and wallObj vary up and down
                            // default: z = top% (so lower is in front of higher)
                            if((id=="wall")||(id=="ceiling"))return; // already handled all at once by DO_STYLE
                            if(path =="i\\floorObj\\"){
                                if(nav.sceneType ==" countryside ") active.sceneObjects[id].y = m.newNumber(22,3, 11); // countryside trees further up
                                else if(nav.sceneType ==" coast ") active.sceneObjects[id].y = 15; // pier position
                                else if(nav.sceneType ==" alien ") active.sceneObjects[id].y = m.newNumber(8,2, 12); // alien objects further down
                                else if(nav.sceneType ==" tent ") active.sceneObjects[id].y = 11; // tent, etc. ditto
                                else if(nav.sceneType ==" ship ") active.sceneObjects[id].y = 9;
                                else if((nav.sceneType ==" city ")&&(f.itemNotes.includes(" house "))) active.sceneObjects[id].y =26; //city houses in a row
                                else if(d.src.includes("-far-low-wide")) active.sceneObjects[id].y =32;
                                else if(d.src.includes("-far")) active.sceneObjects[id].y =31;
                                else if(d.src.includes("-mid")) active.sceneObjects[id].y =29;
                                else if(f.itemNotes.includes(" house "))active.sceneObjects[id].y =26; // houses are well behind other street furniture
                                else active.sceneObjects[id].y =17;
                                f.zIndex =90-active.sceneObjects[id].y; // not 100-x  - floor objects HIGHER UP so hero is always in front
                                f.zIndex = Math.round(f.zIndex);// decimals don't work!
                                if(f.itemNotes.includes(" monster ")){active.sceneObjects[id].y = active.sceneObjects[id].y-5; f.zIndex =f.zIndex +10;} // in front
                                // remember
                                active.sceneObjects[id].db.bottom = active.sceneObjects[id].y;
                                thisStyle = thisStyle + "bottom:" +active.sceneObjects[id].y+ "%; z-index:" +f.zIndex+ ";";
                                if(f.itemNotes.includes(" fromCeiling "))thisStyle = thisStyle + "height:" +(75-active.sceneObjects[id].y)+ "%;";
                            }
                            else if (path =="i\\wallObj\\"){ // wallObjects can move up and down
                                let h={"top":0};
                                if(f.itemNotes.includes(" fromCeiling ")){h.top = 25;// lights, stalactites, etc
                                    f.zIndex = 103; // "ceiling" z is 101, full height doors are 102
                                }else{
                                    if(f.itemNotes.includes(" fixTopAt40% ")) h.top =40;
                                    else if(f.itemNotes.includes(" window ")) h.top =32;
                                    else  h.top = m.newNumber(38,10, id); // "top" is 25% down due to text box
                                    f.zIndex = Math.round(h.top);// decimals don't work!
                                }
                                if(f.itemNotes.includes(" monster ")){h.top = h.top-20; f.zIndex =f.zIndex +10;} // in front of other objects
                                //remember
                                active.sceneObjects[id].db.bottom = "top:" +h.top;
                                thisStyle =thisStyle+ "top:"+ h.top+ "%; z-index:" +f.zIndex+ ";";
                            }
                            else{// still here?
                                if(f.itemNotes.includes(" fixToBottom ")){active.sceneObjects[id].y =0; f.zIndex =100;}
                                else switch(id){
                                    case "floor" : { active.sceneObjects[id].y =0; f.zIndex=25; break} // Z: game starts at 25%. Wall is 24; ceiling and floor 25
                                    // ceiling" is handled in DO_STYLE
                                    case "door0" : { active.sceneObjects[id].y =c.doorLeftBot;
                                                     f.zIndex =(90 -active.sceneObjects[id].y);// like floorObs, must be BEHIND hero
                                                     if(active.sceneObjects[id].y <2)f.zIndex =102; break;} // full height doors: in front of ceiling
                                    case "door1" : { active.sceneObjects[id].y =c.doorBottom;  f.zIndex =(90 -active.sceneObjects[id].y); break;}
                                    case "door2" : { active.sceneObjects[id].y =c.doorBottom;  f.zIndex =(90 -active.sceneObjects[id].y); break;}
                                    case "door3" : { active.sceneObjects[id].y =c.doorLeftBot; f.zIndex =(90 -active.sceneObjects[id].y);
                                                        if(active.sceneObjects[id].y <2)f.zIndex =102; break;} // full height doors: in front of ceiling
                                    // wallObj was handled above
                                    // floorObj was handled above
                                    case "table0": { active.sceneObjects[id].y =c.tableBottom; f.zIndex =120; break;}
                                    case "table1": { active.sceneObjects[id].y =c.tableBottom; f.zIndex =121; break;}
                                    case "tableObj0" :{ // remote scenes have no table, and just one tableObj
                                        switch(nav.sceneType){
                                            case " city "     :{ active.sceneObjects[id].y =0; f.zIndex =130; break;}
                                            case " govt "     :{ active.sceneObjects[id].y =0; f.zIndex =130; break;}
                                            case " mountains ":{ active.sceneObjects[id].y =-2.5; f.zIndex =132;break;}
                                            default: { active.sceneObjects[id].y =c.tableTop +0.5; f.zIndex =129; break;}
                                        }break;
                                    }
                                    case "tableObj1" : { active.sceneObjects[id].y =c.tableTop;      f.zIndex =130; break;}
                                    case "tableObj2" : { active.sceneObjects[id].y =c.tableTop +0.5; f.zIndex =129; break;}
                                    case "tableObj3" : { active.sceneObjects[id].y =c.tableTop;      f.zIndex =130; break;}
                                    case "tableObj4" : { active.sceneObjects[id].y =c.tableTop +0.5; f.zIndex =129; break;}
                                    case "tableObj5" : { active.sceneObjects[id].y =c.tableTop;      f.zIndex =130; break;}
                                }
                                //remember
                                active.sceneObjects[id].db.bottom = active.sceneObjects[id].y;
                                f.zIndex = Math.round(f.zIndex);// decimals don't work!
                                thisStyle =thisStyle+ "bottom:"+ active.sceneObjects[id].y +"%; z-index:" +f.zIndex+ ";";
                            }
                        }// do bottom FIRST: height ("fromCeiling") may depend on it
                        function doHeight(){ // first, in case this is "active.bigTableObj" and you then need to remember its width
                            var h = initialHeight; // may be scaled later
                            if(h ==0) return; // zero means wall, etc: stylesheet handles it
                            if(f.itemNotes.includes(" fromCeiling ")){ // not "else" - this overwrites other stuff
                                if((active.sceneObjects[id].y !=-999)&&(path !=="i\\wallObj\\")) // bottom is set, and it's not a wallObject?
                                    h= 75-active.sceneObjects[id].y; // must be big. (75% is full height of scene: 25% is top text)
                            }else{
                                if(path =="i\\table\\") h= 15;
                                else if((path =="i\\floorObj\\")&&(h >58)) h =58; // higher than the ceiling?
                                else if((nav.sceneType ==" coast ")&&(d.src.includes("\\cloud"))&&(h >19)) h=19;// coastal horizons are high
                                else if((nav.sceneType ==" coast ")&&(d.src.includes("doorLeft")) ) h=11; // short wide coastline
                                else if(f.itemNotes.includes(" window ")) h =21;
                                else if(f.itemNotes.includes(" painting ")) h =25;
                                else if((f.itemNotes.includes(" fromCeiling "))&&(path =="i\\floorObj\\")) h =58;
                                            // full height floor object (e.g. tree): 100-17-25 = 58 (floor is 17% from bottom, ceiling is 25% from top)
                                else if((d.src.includes("-low-wide"))&&((nav.sceneType ==" town ")&&(nav.sceneType !==" city "))) h =m.newNumber(10,2, id);
                                            // big posh buildings, not too high
                                else if((path !="i\\door\\")&&(path !=="i\\doorLeft\\")&&(h >8)) h =m.newNumber(h,2, id);// id = for seed number
                                if("heightScale" in active.sceneObjects[id].db) { // scale it up?
                                    if(! ((nav.sceneType ==" city ")&&(f.itemNotes.includes(" house "))) )  // do NOT scale houses in city
                                        h = h * active.sceneObjects[id].db.heightScale;
                                }
                            }
                            if(h >75) h =75; // just in case! (higher than the scene?)
                            thisStyle =thisStyle+ "height:" +h +"%; ";
                            // remember
                            active.sceneObjects[id].db.height = h;
                            // remember big tableObj
                            if((h>25)&&(path =="i\\tableObj\\")){ active.bigTableObj.name =active.sceneObjects[id].db["name"];     l("bigTableObj: " +active.bigTableObj.name);
                            }
                        }
                        function doWidth(){// AFTER height, as bigTableObject may need it
                            let g={"width":0};
                            // long thin objects? set height only
                            if((active.sceneObjects[id].db.hasOwnProperty("notes"))&& f.itemNotes.includes(" fixedRatio "))return;
                            else if(active.sceneObjects[id].db.name =="nothing") g.width =0;
                            else if(active.sceneObjects[id].db.name =="bed") g.width =35;
                            else switch(path){
                                case "i\\wall\\" : { g.width =100;   break;   }// ceiling is simple, so handled elsewhere
                                case "i\\floor\\" : { g.width =100;  break;   }
                                case "i\\door\\" : { g.width =b.doorWidth; break; }
                                case "i\\doorLeft\\" : { g.width = a.addRiver ? 6 : c.doorLeftW; break;
                                }
                                case "i\\wallObj\\" : {
                                    g.width = b.betweenDoors/3; // one third of available space (minus wiggle room as follows)
                                    if(f.itemNotes.includes(" window ")) g.width = g.width * 0.7; // subtract wiggle room,. i.e. as wide as possible
                                    else if(f.itemNotes.includes(" painting ")) g.width = g.width * 0.5; // narrower
                                    else if(d.src.includes("\\cloud"))g.width = g.width * 1.5;
                                    g.width = Math.floor(g.width);
                                   break;
                                }
                                case "i\\floorObj\\" : {
                                    if(d.src.includes("-low-wide")){ // e.g. wide houses
                                        if(nav.sceneType ==" town ") g.width =20; // wide but not TOO wide
                                    }
                                    else if((nav.sceneType ==" village ")&&(f.itemNotes.includes(" house "))) g.width =15; // e.g. tall, narrow village houses
                                    else if(nav.sceneType ==" city ") g.width =b.defaultHouseWidth; // fixed widths
                                    else if((active.sceneObjects[id].db.hasOwnProperty("notes"))&&(active.sceneObjects[id].db.notes.includes("bigWide"))) g.width =22;
                                    else if(d.src.includes("pier"))g.width = 22;
                                    else g.width = m.newNumber(15,3, id);
                                    break;
                                }
                                case "i\\table\\" : { g.width =c.tableWidth; break; }
                                case "i\\tableObj\\" : { // if it cannot be squashed, specify "fixedRatio"
                                    g.width =m.newNumber(c.tableWidth/3, 2, id); // (original,varyBy)
                                    // remember big table object g.width, in case it blocks another object
                                    if(active.sceneObjects[id].db["name"]==active.bigTableObj.name){
                                        if(g.width ==0)g.width =8; // just in case, Assume it has SOME g.width
                                        active.bigTableObj.x2 =active.bigTableObj.x1 +g.width;
                                    }
                                    break;
                                }
                            }
                            // remember
                            active.sceneObjects[id].db.width = g.width;
                            thisStyle =thisStyle+ "width:" +g.width+ "%; "; // otherwise zero g.width is handled elsewhere
                        }
                        function doLeft(){
                            let g={ "left":0,
                                    "right":-999, // in case we need to align right
                                    "randomise":1,
                                    "specialCase":0}; // ready to add to thisStyle
                            switch(id){
                                case "wall"     : {active.sceneObjects[id].x=0;   g.randomise=0; break;}
                                case "floor"    : {active.sceneObjects[id].x=0;   g.randomise=0; break;}
                                case "ceiling"  : {active.sceneObjects[id].x=0;   g.randomise=0; break;}
                                case "door0"    : {g.randomise =0;break;} // keep default, but don't mess with it! // could be -999 (e.g. in bathroom or maze)
                                case "door1"    : {if(nav.sceneType ==" city ")g.randomise =0;break;}// houses rely on precise value of x
                                case "door2"    : {if(nav.sceneType ==" city ")g.randomise =0;break;}
                                case "door3"    : {if(active.sceneObjects[id].x !=-999) g.right=0;// door is on screen?
                                                   g.randomise =0;          break;}// align its RIGHT to the edge of the screen
                                case "floorObj0": {if(nav.sceneType ==" city ")g.randomise =0;break;}// houses are fixed widths
                                case "floorObj1": {if(nav.sceneType ==" city ")g.randomise =0;break;}
                                case "floorObj2": {if(nav.sceneType ==" city ")g.randomise =0;break;}
                                case "floorObj3": {if(nav.sceneType ==" city ")g.randomise =0;break;}
                                case "wallObj0" : {if(d.src.includes("\\cloud")) active.sceneObjects[id].x = 8; // clouds are wide
                                                    else{
                                                        if(active.sceneObjects.door1.x !=-999)                // door is present?
                                                            active.sceneObjects[id].x= active.sceneObjects.door1.x + b.doorWidth +2;  // wallobject is to right of door
                                                        else{ if(nav.sceneType ==" cave ") // indent is part of cave scene (even if indent goes nowhere)
                                                                active.sceneObjects[id].x= 20; // leave space for it
                                                            else active.sceneObjects[id].x= 12; // no door, and not a cave, so fill up the wall space
                                                        }
                                                    } break;}
                                case "wallObj1" : {active.sceneObjects[id].x=40;               break;} // in the middle, regardless of doors
                                case "wallObj2" : { if(active.sceneObjects.door2.x ==-999){ //no door
                                                        if(nav.sceneType ==" cave ") g.right= 20; // leave space for the cave entrance
                                                        else g.right= 12; // fill up the space
                                                    }else g.right= (100- active.sceneObjects.door2.x) -2;  // if door2 is present, align wallobject's RIGHT edge
                                                                            break;}
                                case "table0" : {if(nav.sceneType==" village ")active.sceneObjects.table0.x =0; // actually a wall
                                                  g.randomise =0; break;} // table0.x already has a random position set
                                case "table1" : {g.randomise =0; break;}
                                case "tableObj0" : {g.randomise =0; break;}
                                case "tableObj1" : {g.randomise =0; break;}
                                case "tableObj2" : {active.sceneObjects[id].x=active.sceneObjects.table0.x +20; break;}
                                case "tableObj3" : {active.sceneObjects[id].x=active.sceneObjects.table1.x +3; break;}
                                case "tableObj4" : {active.sceneObjects[id].x=active.sceneObjects.table1.x +12; break;}
                                case "tableObj5" : {active.sceneObjects[id].x=active.sceneObjects.table1.x +20; break;}
                            }
                            if(active.sceneObjects[id].x ==-999)g.randomise=0;
                            if(g.randomise)active.sceneObjects[id].x =m.newNumber(active.sceneObjects[id].x,1.7, id); // slight variation
                            // remember the position of the big tableObj
                            if((path =="i\\tableObj\\")&&(active.sceneObjects[id].db.name==active.bigTableObj.name)) active.bigTableObj.x1 =active.sceneObjects[id].x;
                            // do it!
                            if(g.right !=-999) thisStyle =thisStyle+ "right:" +g.right +"%; ";
                            else thisStyle =thisStyle+ "left:" +active.sceneObjects[id].x +"%; ";
                        }
                        function doSpecial(){
                            if((id=="door3")||(id=="door2"))// right hand doors: especially important for countryside
                            thisStyle =thisStyle+"transform: scaleX(-1); ";
                            if(f.itemNotes.includes(" faint ")) thisStyle =thisStyle+"opacity: 0.5; ";
                        }
                        if(shortCuts())return;// walls etc. always have the same style
                        doHeight();
                        doWidth(); // do FIRST so that active.sceneObjects.person1.x can be MIDDLE of image
                        doLeft();
                        doBottomAndZ();
                        doSpecial();
                    }// end "DO_STYLE"
                    if(idNeedsToBeSet()){// not removed?
                        if(!definedInChanges()) // e.g. "needs" forced an object onto this id
                            chooseObject();// if removed, style was set to just "left:-999%"
                        addAnyChanges(); // e.g. hasWritingOnIt
                        DO_STYLE();
                    }
                    b.styleAndSrc.push([id,thisStyle,d.src]); // array of [style string,source string]. "" means display it as empty
                } // end of 'STYLE_AND_SOURCE'

                //              id,           path,           thisStyle,               height (default)
                STYLE_AND_SOURCE("wall",   "i\\wall\\",  " ",                            0); // style handled by "DO_STYLE"
                STYLE_AND_SOURCE("floor",  "i\\floor\\", "height:" +c.floorHeight+ "%;", 0);
                STYLE_AND_SOURCE("ceiling", "i\\ceiling\\"," ",                          0); // style handled by "DO_STYLE"
                if(a.addRiver){ b.styleAndSrc.push(["door0","left:0%;bottom:0%;height:77%;", "i\\transparent.png"]);//finished style
                                b.styleAndSrc.push(["door3","right:0%;bottom:0%;height:77%;","i\\transparent.png"]);//transparent but clickable
                }else{STYLE_AND_SOURCE("door0","i\\doorLeft\\",    " ", 77);
                      STYLE_AND_SOURCE("door3","i\\doorLeft\\",    " ", 77);
                }if(nav.sceneType !==" govt "){// govt floorObjs are are handled separately
                    STYLE_AND_SOURCE("door1",  "i\\door\\",        " ", c.doorHeight);
                    STYLE_AND_SOURCE("door2",   "i\\door\\",       " ", c.doorHeight);
                    STYLE_AND_SOURCE("floorObj0",  "i\\floorObj\\"," ", c.floorObjHeight); //" " =NOT empty ""
                    STYLE_AND_SOURCE("floorObj1",  "i\\floorObj\\"," ", c.floorObjHeight);
                    STYLE_AND_SOURCE("floorObj2",  "i\\floorObj\\"," ", c.floorObjHeight);
                    STYLE_AND_SOURCE("floorObj3",  "i\\floorObj\\"," ", c.floorObjHeight);
                }   STYLE_AND_SOURCE("wallObj0",   "i\\wallObj\\","top:25%; ", 14);
                    STYLE_AND_SOURCE("wallObj1",   "i\\wallObj\\","top:25%; ", 14);// ~1/3 across
                    STYLE_AND_SOURCE("wallObj2",   "i\\wallObj\\","top:25%; ", 14);// ~2/3
                if(a.addRiver) b.removeStyles(["table0","table1","tableObj0","tableObj1","tableObj2","tableObj3","tableObj4","tableObj5"]);
                else{STYLE_AND_SOURCE("tableObj0", "i\\tableObj\\"," ", 7);// always one table (at least). Might be zero height
                    if((nav.sceneType ==" city ")||(nav.sceneType ==" govt ")||(nav.sceneType ==" mountains ")) b.removeStyles(["table0","tableObj1"]);
                    else{STYLE_AND_SOURCE("tableObj1","i\\tableObj\\"," ",  7 );
                        STYLE_AND_SOURCE("table0",   "i\\table\\",   " ",   23);
                    }if(c.numberOfTables <2) b.removeStyles(["table1","tableObj2","tableObj3","tableObj4","tableObj5"]);
                    else { STYLE_AND_SOURCE("tableObj2","i\\tableObj\\"," ",7 );
                        STYLE_AND_SOURCE("table1",   "i\\table\\",    " ",  23);
                        STYLE_AND_SOURCE("tableObj3","i\\tableObj\\", " ",  7 );
                        STYLE_AND_SOURCE("tableObj4","i\\tableObj\\", " ",  7 );
                        STYLE_AND_SOURCE("tableObj5","i\\tableObj\\", " ",  7 );
                    }
                }
            }



            function finalTouches(){ // stuff that confuses me. So BRUTE FORCE it last of all
                // rivers, castles, signs, etc.
                let d={"table0p":-1, "table1p":-1, "p":0, "thisId":"", // find table location
                        "whichBank":0, "whichCastle":0, // 11 is just the 11th fake number for the scene. 36 castle pictures.
                        "floorObj2p":0, "castleHeight":0, // find floorObj2, so you can replace it with a castle
                        "govtHeight":0, // how high to make govt buildings
                        "path":"", "whichGrass":0, "whichGovt":0
                    };
                function checkGrass(){ // uses "veryBottom"
                    if(a.addRiver) return; // river uses "veryBottom" instead
                    if([" village "," forest "," countryside "," wilderness "].includes(nav.sceneType)){ // only these have grass at the front
                        d.path="i\\special\\grass\\";
                        d.whichGrass= m.fakeRandom(12,10); // 12 is just the 12th fake number for the scene. 0-10 grass pictures.
                        active.sceneObjects["veryBottom"].db = db.special[7]; // special[7] = grass properties
                        b.styleAndSrc.push(["veryBottom","bottom:0; left:0; width:100%; height:5%; z-index:132;", d.path +d.whichGrass+".png"]);
                            // z: tables ~110, tableObjs ~120
                    }
                }
                function checkRiver(){
                    if(!a.addRiver) return;
                    // front river (z IN FRONT of people: hides feet, drownings, etc)
                    active.sceneObjects["veryBottom"].db = db.special[1]; // special[0] = river top, special[1] = river bot
                    b.styleAndSrc.push(["veryBottom","bottom:0; left:0; width:100%; height:2.55%;", active.sceneObjects["veryBottom"].db.cos]);
                   // bank
                    for(d.p=0; d.p< b.styleAndSrc.length; d.p++){ // find table locations
                        d.thisId = b.styleAndSrc[d.p][0];
                        if(d.thisId =="table0") d.table0p =d.p;
                        else if(d.thisId =="table1") d.table1p =d.p;
                    }d.thisId ="";// reset
                    // bank image
                    d.whichBank =nav.sceneX % 20; // country riverbanks are numbered 0-19. A % B is modulus: like division, but gives remainder
                    d.path="i\\special\\river\\country\\";     l("nav.sceneX:" +nav.sceneX+ ", whichBank:" +d.whichBank);
                    if((nav.sceneType ==" town ")||(nav.sceneType ==" city ")){
                        d.whichBank = nav.sceneX % 36,
                        d.path="i\\special\\river\\town\\";
                    }
                    // back river (z BEHIND feet: step in front of when paddling, drowning, etc.)
                    active.sceneObjects["table0"].db = db.special[0]; // river = element 0, narrow river = element 1
                    b.styleAndSrc[d.table0p] =["table0","bottom:2.5%; left:0; width:100%; height:2.55%; z-index:100;", active.sceneObjects["table0"].db.cos];
                                // Z: 100, drowning Z: 101, river frons Z: 102, river bank: 105
                    // bank again
                    active.sceneObjects["table1"].db = db.special[2]; // generic riverbank reference for dialog purposes
                    b.styleAndSrc[d.table1p] =["table1", "bottom:5%; left:0; width:100%; height:6%; z-index:105;", d.path +d.whichBank+".png"];
                }
                function checkCastle(){
                    if(!a.addCastle) return;
                    d.whichCastle =m.fakeRandom(11,36); // 11 is just the 11th fake number for the scene. 36 castle pictures.
                    d.path="i\\special\\castle\\";              l("whichCastle:" +d.whichCastle);
                    active.sceneObjects["floorObj2"].db = db.special[3]; // generic castle reference for dialog purposes
                    // find floorObj2: will be replaced with castle
                    d.floorObj2p =-1;
                    for(d.p=0; d.p< b.styleAndSrc.length; d.p++){ // find table locations
                        d.thisId = b.styleAndSrc[d.p][0];
                        if(d.thisId =="floorObj2") d.floorObj2p =d.p;
                    }
                    d.castleHeight =(d.whichCastle <27) ? 27 : 18; // early castles are tall, later castles are short ("27" is just a coincidence)
                    b.styleAndSrc[d.floorObj2p] =["floorObj2", "bottom:41%; z-index:59;left:39%; width:27%; height:" +d.castleHeight+ "%;", d.path +d.whichCastle+".png"];
                    // z-index = (100-bottom)
                }
                function checkGovtBuildings(){// govt buildings: these scene objects were skipped, ready to add now
                    if(nav.sceneType !=" govt ") return;
                    // generic objects for clicking purposes
                    active.sceneObjects["door1"].db = db.special[4]; // db.special[4] is an array of image names
                    active.sceneObjects["door2"].db = db.special[4]; // same, to be flipped
                    active.sceneObjects["floorObj0"].db = db.special[5];
                    active.sceneObjects["floorObj3"].db = db.special[5]; // same, flipped
                    active.sceneObjects["floorObj1"].db = db.special[6];
                    active.sceneObjects["floorObj2"].db = db.special[6]; // same, flipped
                    // doors
                    d.path="i\\door\\govt\\";
                    d.whichGovt = m.fakeRandom(12,30);
                    b.styleAndSrc.push(["door1", "bottom:29%; z-index:69; left:5.2%; width:16%; height:15%;", d.path +d.whichGovt+".png"]);
                    // door east is same but flipped
                    b.styleAndSrc.push(["door2", "bottom:29%; z-index:69; right:5.2%; width:16%; height:15%; transform: scaleX(-1);", d.path +d.whichGovt+".png"]);
                    // floorObj0 and 3 (edge of building)
                    d.path="i\\special\\govt\\edge\\"; d.whichGovt = m.fakeRandom(13,23);
                    b.styleAndSrc.push(["floorObj0", "bottom:28%; z-index:70; left:18%; width:17%; height:18%;", d.path +d.whichGovt+".png"]);
                    b.styleAndSrc.push(["floorObj3", "bottom:28%; z-index:70; right:18%; width:17%; height:18%; transform: scaleX(-1);", d.path +d.whichGovt+".png"]);
                    // floorObj1 and 2 (mid building)
                    d.path="i\\special\\govt\\mid\\"; d.whichGovt = m.fakeRandom(13,23);
                    d.govtHeight =(d.whichGovt <10) ? 33 : 20; // z-index = (100-bottom)
                    b.styleAndSrc.push(["floorObj1", "bottom:27%; z-index:73; left:34%; width:16.1%; height:" +d.govtHeight+ "%;", d.path +d.whichGovt+".png"]);
                    b.styleAndSrc.push(["floorObj2", "bottom:27%; z-index:73; right:34%; width:16.1%; height:" +d.govtHeight+ "%; transform: scaleX(-1);", d.path +d.whichGovt+".png"]);
                }
                function streetSigns(){
                   function styleTheSign(){ // "thisStyle" = argument to STYLE_AND_SOURCE
                       let g={"signTop":35, "n":0, "fontWeight":"bold", "signName":nav.sceneName, "signStyle":"", "fixingSrc":""};
                       g.fixingSrc = "i\\special\\streetSign\\fixing\\" + m.fakeRandom(3,14)+ ".png";
                       b.styleAndSrc.push(["signFixing","display:inline;top:" +g.signTop+ "%;z-index:100;left:1%;width:4%;", g.fixingSrc]);  // signFixing

                       // streetSign is a SPECIAL separate element! goes ON TOP of signFixing; "div", not "img"
                       // uppercase?
                       g.n = m.fakeRandom(4,9);
                       if(g.n <6) g.signName = nav.sceneName.toUpperCase(); // most of the time it's upper case
                       g.n = m.fakeRandom(5,2);
                       if(g.n <1) g.fontWeight ="normal";
                       // now choose the background image
                       g.n = m.fakeRandom(6,26);
                       g.signStyle = "display:inline; z-index:103;top:" +g.signTop+ "%; font-weight:" +g.fontWeight+
                       "; background-image:url('i/special/streetSign/" +g.n+ ".png');";
                       b.styleAndSrc.push(["streetSign",g.signStyle,""]); // EXTRA element gets pushed as well as sign image!
                       O("streetSign").innerHTML = g.signName;
                   }
                   if( ((nav.sceneType ==" town ")||(nav.sceneType ==" city ")) && !a.addRiver ) styleTheSign();
                   else {
                       b.removeStyles(["signFixing","streetSign"]);
                       O("streetSign").innerHTML ="";
                   }
                }
                function doorIcons(){ // NSEW icon positions. NOTE: "mapPixel" scene does it manually in "justUseAmapPicture"
                    let f={// positions
                            "icon0left":1.2, "icon0top":55, // normally west
                            "icon1left":10, "icon1top":50, // north
                            "icon2left":83, "icon2top":50, // east
                            "icon3left":90, "icon3top":55, // south
                            // directions
                            "icon0":nav.getDoorDirection(0), // e.g. "west"
                            "icon1":nav.getDoorDirection(1), // note: cave ALWAYS faces north. i.e nav.facing=="north"
                            "icon2":nav.getDoorDirection(2),
                            "icon3":nav.getDoorDirection(3)
                    };
                    // "getDoorDirection" is defined in variables>nav
                            // Why? "animate>goToScene" also needs it. Why? to know where to go when you click "door0" etc.
                    function moveDoorIcons(){ // where to position "N", "S", etc
                        // inside
                        if(nav.ordinaryRooms.includes(nav.sceneType)){
                            f.icon0left= 1.2;  f.icon3left= 93.7;
                        }else{
                            f.icon0left= 0;    f.icon3left= 94;
                        }
                        // outside
                        if(nav.sceneType ==" countryside "){
                            f.icon1left= active.sceneObjects.door1.x-2;   f.icon2left= active.sceneObjects.door2.x+7.4;
                        }else if(nav.sceneType ==" town "){
                            f.icon1left= active.sceneObjects.door1.x+5;   f.icon2left= active.sceneObjects.door2.x+5;
                        }else{
                            f.icon1left= active.sceneObjects.door1.x+2;   f.icon2left= active.sceneObjects.door2.x+2;
                        }
                        // sea
                        if(nav.sceneType ==" sea "){
                            f.icon1top= 55;     f.icon2top= 55;   f.icon3top= 75;  f.icon0top= 75;
                        }else{
                            f.icon3top= 55;     f.icon0top= 55;
                            if(nav.sceneType ==" city "){
                                                f.icon1top= 46;  f.icon2top= 46;
                            }else{              f.icon1top= 50;  f.icon2top= 50;
                            }
                        }
                    }
                    function hideDoorIcons(){ // e.g. bathroom, cave: not all four doors
                        // hidden doors (e.g. bathroom)
                        if(active.sceneObjects.door0.x ==-999)f.icon0left = -999;
                        if(active.sceneObjects.door1.x ==-999)f.icon1left = -999;
                        if(active.sceneObjects.door2.x ==-999)f.icon2left = -999;
                        if(active.sceneObjects.door3.x ==-999)f.icon3left = -999;
                    }
                    function setDoorIconStyles(){
                        // ready to change the DOM all at once
                        // charAt(0): first character gives name of PNG: e.g. "eastIcon" -> "e" -> "e0.png" // "east" -> "c\\i\\e0.png"
                        b.styleAndSrc.push(["direction0","left:" +f.icon0left+ "%; top:" +f.icon0top+ "%;", "c\\i\\" +f.icon0.charAt(0)+ "0.png"]);
                        b.styleAndSrc.push(["direction1","left:" +f.icon1left+ "%; top:" +f.icon1top+ "%;", "c\\i\\" +f.icon1.charAt(0)+ "1.png"]);
                        b.styleAndSrc.push(["direction2","left:" +f.icon2left+ "%; top:" +f.icon2top+ "%;", "c\\i\\" +f.icon2.charAt(0)+ "2.png"]);
                        b.styleAndSrc.push(["direction3","left:" +f.icon3left+ "%; top:" +f.icon3top+ "%;", "c\\i\\" +f.icon3.charAt(0)+ "3.png"]);
                    }
                    moveDoorIcons();
                    hideDoorIcons();
                    setDoorIconStyles();
                }
                checkGrass();
                checkRiver();
                checkCastle();
                checkGovtBuildings();
                streetSigns();
                doorIcons();
            }
            setDefaults();
            sceneDifferences();
            STYLES_AND_SOURCES();
            finalTouches(); // rivers etc: do last, as it overwrites normal scene elements and occurs across scene types
        }// end 'SET_ALL_STYLES'

        function addPeople(){
            addPersonNoQueue();// active.person walks on: do this LAST, in case it has to override other code
            addStrangers();// add AFTER because it is shifted to the START
        }
        function changeDOMallAtOnce(){ // from "b.styleAndSrc.push([id,thisStyle,src]);"" ;
            if(test.skipRendering)return;
            let c={"i":0, "id":"", "el":""};
            for(c.i=0; c.i< b.styleAndSrc.length; c.i++){
                c.id=b.styleAndSrc[c.i][0];// for convenience
                if ((active.sceneObjects.hasOwnProperty(c.id)) // signFixing is not in active.sceneObjects
                    &&((active.sceneObjects[c.id].x ==-999)||(active.sceneObjects[c.id].db =="")))// hide?
                    O(c.id).style="left:-999px; width:0px";
                else{ // DO IT!
                    c.el       =O(c.id);
                    c.el.style =  b.styleAndSrc[c.i][1];
                    c.el.src   =  b.styleAndSrc[c.i][2];
                }
            }clock.resetInactivityTimer();
        }
        function revealScene(){
            O("scene").style.display = "inline"; // finally reflow the html DOM all at once
            clock.tEnd = performance.now();
            if(!test.skipRendering){l("********** filling the scene took " + Math.floor(clock.tEnd- clock.tStart) + " ms.******");
            }
        }
        function recordScene(){// called by setTimeOut
            changeStatusText(nav.sceneName);// displays the new location at the top
            for(b.i =0; b.i < nav.history.length; b.i++){// avoid showing the same record twice (makes bookmarking awkward)
                if((nav.history[b.i][4]==nav.sceneName)&&(nav.history[b.i][1]==nav.sceneX)){ // two variables should do it
                    nav.history.splice(b.i, 1); // removes those array members
                    break;
                }
            }
            nav.history.unshift([0, nav.sceneX, nav.sceneY, nav.sceneZ, nav.sceneName]);// first variable: favourite?
        }
        function onEnteringRoom(){
            let c={"key":"", "whichId":"", "notesSplit":[],"i":0, "notesSplit2":[]}
            function checkAllNotes(){// e.g. "onRoomEnterCutScene^scorpionAttack"
                function roomEnterCutScene(){
                    if(c.notesSplit[c.i].includes("^")){ //onRoomEnterCutScene^scorpionAttack etc. // use '^' to avoid confusion with '#'
                        c.notesSplit2 = c.notesSplit[c.i].split("^");
                        if(c.notesSplit2[0] =="onRoomEnterCutScene"){// cutScene found!
                            if(db.cutScenes.hasOwnProperty(c.notesSplit2[1])){// that cutScene exists?
                                l("XXX found roomEnterCutScene '" +c.notesSplit2[1]+ "'");
                                db.cutScenes[c.notesSplit2[1]](c.key);
                                return 1;
                            }else l("WARNING: cutScene '" +c.notesSplit2[1]+ "' not found.");
                        }
                    }return 0;// no cutscene found
                }
                for(c.key in active.sceneObjects){
                    if(active.sceneObjects[c.key].db.hasOwnProperty("notes")){
                        c.notesSplit =active.sceneObjects[c.key].db.notes.split(" ");
                        for(c.i=0; c.i < c.notesSplit.length; c.i++){
                            if(roomEnterCutScene())return;
                        }
                    }
                }l("no roomEnterCutScene found");
            }
            checkAllNotes();
            if(loaded.storyEvents)checkEventsForWalkIn();
            else l("WARNING: JAVASCRIPT NOT YET LOADED! Cannot check 'walkIn' events")
        }

        checkIfAtMapLocation();// updates nav.atMapScene
        emptyScene();
        if(!justUseAmapPicture()){ // has own image? then sets its own default values
            chooseScene();
            decideScale();
            SET_ALL_STYLES(); // includes doors, special styles, STYLE_AND_SOURCE, etc.
            changeDOMallAtOnce(); // *******************************************************************************************
        }
        testShowData(); // show "scene, room" etc. on screen for debugging
        addPeople(); // DOM changes in "addPersonNoQueue" -> "changeDOM"
        recordScene();
        onEnteringRoom(); // monster attacks, etc.
        setTimeout(revealScene,150); // unhide all AFTER changing the DOM
    }// end "FILL_SCENE_NOW"
    setTimeout(FILL_SCENE_NOW,150); // unhide all AFTER changing the DOM
}//end fillScene

loadJavascript("c/3-map_0.js");