//______________DATABASE________________________
//
function addStuff() {
   let p=""; // path, e.g. "i/person/"
   function pushMany(whatDb, name, cosPath, forScenes, num, heft) {
      // heft:0=not that kind of thing; 1,2= can pick up; 3=needs2people; 4=house etc.; 5=mountains etc.;
      // -minus=same,fixed down. +0.5=don't want to(e.g. spiders)
      let a = {
         "heightScale":arguments[6],
         "notes":arguments[7],
         "i":0
      };
      a.heightScale = typeof (a.heightScale) !== 'undefined' ? a.heightScale :1;
      a.notes = typeof (a.notes) !== 'undefined' ? a.notes :"";
      for (a.i = 0; a.i <= num; a.i++)
         whatDb.push({ "name":name, "heft":heft, "cos":(p+ cosPath + a.i + ".png"), "for":forScenes, "heightScale":a.heightScale, "notes":a.notes });
      //console.log(whatDb);
   }
   function addPeople() { // notes/got/social: notes = for choosing, positioning. got = for trading. Social = subset of trading
      p="i/person/";
      // how to find if transport, etc.: "cos.indexOf": look for "/a-" "/b-" "/g-" "/-m" "/w-" "/t-"
      db.people.push( // see stylesheet // "spriteXpositions" means they can walk, talk, etc. All distances in percents.
         // animals
		new Person("mother bear",    "",        p+"a-bear.png","default",277,""),//name, cos. spriteXpositions, spriteHeighX, role, notes
		new Person("black bear",     "",        p+"a-blackBear.png", "default", 306 ,""),
		new Person("polar bear",     "",        p+"a-polarBear.png", "default", 306 ,""),
		// boys
		new Person("afro boy",       "",        p+"b-afro.png", "default625", 191 ,""),
		new Person("babyface boy",   "",        p+"b-babyface.png", "default625", 163 ,""),
		new Person("indian boy",     "",        p+"b-indian.png", "default75", 223 ,""),
		new Person("older boy",      "",        p+"b-older.png", "default", 248 ,""),
		// girls
		new Person("girl with hair in buns","", p+"g-buns.png", "default625", 191 ,""),
		new Person("goldilocks",     "",        p+"g-goldilocks.png", "default75", 230 ,""),
		new Person("pre-teen",       "",        p+"g-preTeen.png", "default", 254 ,""),
		new Person("ragged teen",    "",        p+"g-raggedTeen.png", "default", 275 ,""),
		new Person("ridinghood",     "",        p+"g-ridinghood.png", "default625", 191 ,""),
		// men
		new Person("man with braids","",        p+"m-braids.png", "default", 276 ,""),
		new Person("bald man",       "scientist",p+"m-bald.png", "default", 300 ,""),
		new Person("Chinese man",    "richFriend",p+"m-Chinese.png", "default", 300 ,""),
		new Person("young guy, hair","exBadGuy",p+"m-younghair.png", "default", 300 ,""),
		new Person("man with afro",  "exBadGuy",p+"m-afro.png", "default", 300 ,""),
		new Person("Sancho",         "badGuy",  p+"m-Sancho.png", "default", 263 ,""),
		new Person("tough guy",      "badGuy",  p+"m-tough.png", "default", 300 ,""),
		new Person("bouncer",        "badGuy",  p+"m-bouncer.png", "default", 278 ,""),
		new Person("wise man",       "badGuy",  p+"m-wisebeard.png", "default", 279 ,""),
		new Person("African man",    "hero",    p+"m-African.png", "default", 300 ,""),
		new Person("Chris",          "hero",    p+"m-Chris.png", "default", 300 ,""),
		new Person("handsome man",   "hero",    p+"m-handsome.png", "default", 300 ,""),
		new Person("ancient man",    "ancient", p+"m-ancient.png", "default", 300 ,""),
		new Person("north African man","",      p+"m-northAfrican.png", "default", 300 ,""),
		new Person("Samoan man",     "",        p+"m-Samoan.png", "default", 276 ,""),
		new Person("Victorian man",  "",        p+"m-Victorian.png", "default", 300 ,""),
		// women
		new Person("older woman",    "mother",  p+"w-older.png", "default", 282 ,""),
		new Person("bald woman",     "badBoss", p+"w-bald.png", "default", 280 ,""),
		new Person("afro woman",     "",        p+"w-afro.png", "default", 268 ,""),
		new Person("black hair",     "",        p+"w-blackHair.png", "default", 285 ,""),
		new Person("elegant",        "",        p+"w-elegant.png", "default", 281 ,""),
		new Person("headscarf",      "",        p+"w-headscarf.png", "default", 283 ,""),
		new Person("Peri",           "",        p+"w-Peri.png", "default", 288 ,""),
		new Person("pointy hair",    "",        p+"w-pointyHair.png", "default", 288 ,""),
		new Person("Stef",           "",        p+"w-Stef.png", "default", 287 ,""),
		new Person("deadBad",        "deadBad", p+"w-.png", "default", 0," dead " ,""), // NEVER SEEN. "cos" is only for gender. Build their legend!
		// transport
      new Person("ship",          "",             p+"t-ship.png", "ship", 341," transport ","")
      );
   }
   function addLocations() {p="";
      db.mapLocations.push(
         // pixel positions:See nav.scenesPerPixel and nav.worldMapGifWidth
         //                       each pixel is 1000 scenes. For more precision, use decimals
         // hotspot:big areas first (e.g. sky). small areas later (e.g. sun in sky)
         // sceneType:default is " govt " (most are cities, and they all need centers)
         //             if " coast ", make it " town " (etc.) and "distanceToCoast":0 (otherwise it is a lone coast surrounded by sea)
         // distanceToCoast:****** MULTIPLES OF TEN ****** !!!!!!!!!!  because the coast is only possible outside

         // 0= generic sea or land (changed depending on nav.sceneX etc.)
         { "name":"land or sea", "xPx":0, "yPx":0, "sceneType":" wilderness " },// "clicked" is cycled from db.synonyms.somewhere  bla[0] = position
         // 1= island
         { "name":"island name", "xPx":0, "yPx":0, "sceneType":" wilderness " },// "distanceToCoast" measured in scenes (outside=10 at a time)
         // 2= default
         { "name":"San Francisco", "xPx":407, "yPx":785, "zoom":0, "cos":"San-Francisco.png", "sceneType":" city ", "distanceToCoast":{ "west":20 }, "hotspots":[[4.2, 31.9, 96.9, 38.9, "East Bay area", "notes"], [16.2, 38.4, 95.7, 44.9, "Bay", "notes"], [43.7, 35.3, 64.9, 40.7, "Treasure Island", "notes"], [23.2, 37.9, 33.3, 41.4, "Alcatraz", "notes"], [6.2, 45.1, 95.7, 86.3, "streets of San Francisco", "notes"], [5.2, 37.6, 21.9, 47.8, "Nob Hill", "notes"]] },

      //Europe
         { "name":"Athens", "xPx":2622, "yPx":780, "zoom":0, "notes":["labelBelowRight"], "cos":"Athens.png", "hotspots":[[22.8, 37.8, 79.1, 63, "acropolis", "notes"], [30.1, 25.9, 46.8, 38.5, "Parthenon", "notes"], [55.8, 25.9, 63.7, 35.2, "statue of Athena", "notes"], [13.2, 61, 36.1, 75.7, "theatre of Dianysos", "notes"], [70.7, 52.6, 95.2, 82.6, "Sanctuary of Asclepius", "notes"], [50.3, 32.1, 61.7, 42.6, "old temple of Athena", "notes"]] },// the acropolis
         { "name":"Copenhagen", "xPx":2439, "yPx":457, "zoom":1, "notes":["labelAbove"], "cos":"Copenhagen.png", "sceneType":" city ", "midFloorY":-3, "hotspots":[[41.7, 53.1, 65.5, 85.2, "Church of Our Saviour", "notes"], [42.7, 26.9, 48.9, 56.2, "twisted spire", "notes"], [21.7, 67.8, 41.2, 85.8, "house", "notes"], [66.8, 63.2, 88, 85.1, "house", "notes"]] },//The Church of Our Saviour (Danish:Vor Frelsers Kirke)
         // NOT ON MAP:Copenhagen-high //  ,"cos":".png", "hotspots":[[1.2,35.1,99.5,99.4,"city of Copenhagen","notes"],[48.2,25.8,55.3,39.3,"statue on top of the spire","notes"],[46.4,40,59,99.5,"twisted spire with winding steps","notes"], [29.2,78.8,99.7,99.5,"South Harbour","notes"]]
         { "name":"London", "xPx":2261, "yPx":529, "zoom":0, "cos":"London.png", "hotspots":[[4.9, 49.8, 87.3, 68, "palace of Westminster", "notes"], [25.3, 40.7, 32.9, 54.9, "palace of Westminster", "notes"], [83.2, 36.2, 88.2, 68.4, "Big Ben", "notes"]] },// palace of Westminster
         { "name":"Moscow", "xPx":2781, "yPx":452, "zoom":0, "cos":"Moscow.png", "midFloorY":0.1, "hotspots":[[12, 60.5, 36.2, 72.3, "house", "notes"], [80.2, 64.3, 89.8, 73, "house", "notes"], [36.8, 38.4, 80.8, 76.8, "St Basil's Cathedral", "notes"], [59.3, 25.3, 65, 39.8, "St Basil's Cathedral", "notes"]] },// St Basil's Cathedral
         { "name":"Paris", "xPx":2297, "yPx":579, "zoom":1, "notes":["labelBelow"], "cos":"Paris.png", "midFloorY":0.1, "hotspots":[[27.3, 26.4, 69.9, 90.6, "Notre Dame Cathedral", "notes"], [16.9, 70.7, 28, 86.9, "house", "notes"], [70.9, 71.5, 81.7, 86.4, "house", "notes"]] },// Notre Dame. Nearby: Chartres cathedral
         { "name":"St&nbsp;Petersburgh", "xPx":2668, "yPx":381, "zoom":1, "cos":"St-Petersburg.png", "hotspots":[[21.8, 33.8, 34.2, 60.1, "bronze horseman statue", "notes"], [19.5, 58.6, 43.7, 85.4, "rock undeneath the statue", "notes"], [9, 75.9, 59.5, 85.4, "barrier", "notes"], [37.1, 41, 77.7, 79.9, "St Isaac's Cathedral", "notes"], [46.7, 26.3, 59.7, 41.8, "St Isaac's Cathedral", "notes"], [78.4, 81.2, 62.5, 72.3, "trees", "notes"], [77.4, 60.4, 91.9, 76.3, "government buildings", "notes"]] },// Bronze Horseman, St Isaac's Cathedral
         { "name":"Snaefellsjokull", "xPx":1953, "yPx":286, "sceneType":" mountains ", "midFloorY":0.1, "zoom":0, "cos":"Sneffels.png", "distanceToCoast":{ "west":50 }, "hotspots":[[19.6, 56.2, 90.3, 96.8, "Sneffels", "notes"], [32.5, 81.8, 39.9, 96.3, "first crater", " clickCutScene^climbDownCave6 "], [44, 74, 50, 81, "second crater", " clickCutScene^climbDownCave4 "], [53, 77, 60, 87, "third crater", " clickCutScene^climbDownCave100 "], [63, 71, 68, 78, "fourth crater", " clickCutScene^climbDownCave2 "], [16.8, 28.1, 85.7, 43.7, "clouds", "notes"]] },//Journey to the center of the Earth
         { "name":"Stonehenge", "xPx":2223, "yPx":541, "sceneType":" countryside ", "notes":["labelLeft"], "cos":"Stonehenge.png", "howSprawling":200, "hotspots":[[9, 45, 91, 82, "monoliths", "notes"], [64, 35, 76, 81, "monoliths", "notes"]], "zoom":2 },// nearby: Avebury;
         { "name":"Stromboli", "xPx":2493, "yPx":764, "sceneType":" countryside ", "notes":["labelLeft"], "zoom":2, "cos":"Stromboli.png", "midFloorY":2, "hotspots":[[43.3, 25.7, 58.5, 34.9, "volcanic cloud", "notes"], [35, 34.8, 71.2, 47.9, "volcano", "notes"], [21.4, 45.3, 91, 61.3, "volcano", "notes"], [8.7, 54.7, 32.3, 59.8, "houses", "notes"], [36, 61.7, 65.7, 82.3, "trees", "notes"], [26.2, 69.4, 36.7, 81.5, "tree", "notes"], [76.7, 67.7, 88, 76.4, "trees", "notes"]] },//Journey to the center of the Earth
         { "name":"Toulon", "xPx":2350, "yPx":686, "zoom":1, "cos":"Toulon.png", "hotspots":[[14.7, 49.4, 44.7, 55.9, "boats", "notes"], [16.5, 56.2, 54.3, 66.2, "harbour", "notes"], [45.8, 42.6, 69.2, 57.6, "ship being built", "notes"], [54.5, 53.7, 85.9, 65.7, "ramp", "notes"], [18.5, 27.6, 80.7, 43.5, "clouds", "notes"], [12.7, 74.8, 55.4, 82.7, "cannonballs", "notes"], [72.9, 68.2, 88.5, 81.2, "cannonballs", "notes"], [25, 68.4, 32.5, 75.3, "cannonballs", "notes"], [32.4, 68.2, 43.4, 79.2, "cannon", "notes"], [59.3, 70.3, 75.5, 82.3, "cannon parts", "notes"], [53.4, 63.9, 61.5, 68.8, "rowing boat", "notes"], [64.4, 63.8, 72.4, 69.6, "rowing boat", "notes"], [27.7, 63.4, 49.4, 66.9, "boat", "notes"]] },

      // Americas
         { "name":"Cusco", "xPx":1106, "yPx":1746, "sceneType":" countryside ", "zoom":0, "cos":"Cusco.png", "notes":["labelBelowRight"], "midFloorY":0.1, "hotspots":[[38.4, 26.4, 99.7, 75, "mountainside", "notes"], [27.8, 70.9, 99.8, 89.2, "Ollantaytambo countryside", "notes"], [66.2, 37.3, 71.7, 57.9, "face of Viracoccha", "notes"], [77.5, 39.3, 90.5, 49.4, "ancient granary", "notes"], [48.9, 39.2, 59.2, 44.2, "ancient granary", "notes"]] }, // face in cliffs, Ollantaytambo, Cusco, Peru.
         { "name":"Guanahacabibes", "xPx":921, "yPx":1085, "sceneType":" sea ", "zoom":1, "cos":"Guanahacabibes.png", "hotspots":[[.7, 80.5, 15.3, 99.2, "seaweed", "notes"], [80, 82, 99.5, 99.9, "seaweed", "notes"], [7.4, 36.2, 42.8, 76.1, "sunken temple", "notes"], [52.3, 49.4, 69.3, 70.1, "ruined arches", "notes"], [70.9, 49.2, 89.9, 74.7, "sunken temple", "notes"], [13.3, 77.3, 36.4, 87.9, "steps", "notes"]] },//Zak, Atlantis:near western end of Cuba
         { "name":"Mt Ranier", "xPx":492, "yPx":612, "sceneType":" mountains ", "zoom":0, "cos":"Mt-Rainier.png", "hotspots":[[30.2, 28.9, 60.4, 69.4, "Mt Rainier", "notes"], [4.2, 41.2, 33.5, 69.9, "Mt Rainier", "notes"], [19, 69.2, 45.3, 90.7, "trees", "notes"], [62.3, 25.6, 98.9, 85.2, "cliff side", "notes"], [82, 69.1, 97.8, 92.4, "cave", "notes"]] },//Zak
         { "name":"New York", "xPx":1155, "yPx":729, "zoom":0, "cos":"New-York.png", "midFloorY":0.1, "hotspots":[[22.3, 25.7, 43.9, 85.2, "Brooklyn Bridge", "notes"], [4.7, 44.6, 22.9, 87.6, "Brooklyn Bridge", "notes"], [42.8, 70.6, 94.8, 85.8, "Hudson River", "notes"], [56.4, 55.1, 63.4, 72.3, "Brooklyn Bridge", "notes"], [66.7, 76.4, 92.8, 90.3, "boats", "notes"], [58.5, 78.8, 66.2, 89.4, "crane", "notes"]] },// Brooklyn Bridge, 1883
         { "name":"Salt Lake City", "xPx":585, "yPx":729, "sceneType":" city ", "zoom":1, "cos":"Salt-Lake.png", "hotspots":[[16.8, 31.9, 45.2, 73.5, "Salt Lake Temple", "notes"], [51.2, 46.7, 91.9, 73.4, "Tabernacle", "notes"], [72.3, 25.4, 94.3, 53.3, "tree", "notes"]] },// for tunnels under the temple, and maybe Sherlock Holmes
         { "name":"Tikal", "xPx":829, "yPx":1165, "sceneType":" countryside ", "notes":["labelAbove"], "zoom":0, "cos":"Tikal.png", "hotspots":[[25, 26.6, 40.7, 66.6, "Mayan temple", "notes"], [13.5, 42.3, 49.4, 66.3, "Mayan temple", "notes"], [61, 32.9, 93, 59.9, "Mayan temple", "notes"], [34.5, 75.7, 46.9, 80.8, "rocks", "notes"], [70.2, 55.2, 77.2, 62.1, "monuments", "notes"]] },//ruins are the acropolis at Tikal, Guatemala (just over the border from Mexico). Further west is Palenque (with the famous lid of lord Pacal). Looks similar to Tikal, so I don't want to draw it unless there's a good reason.

      // Asia
         { "name":"Babylon", "xPx":2949, "yPx":876, "sceneType":" desert ", "zoom":0, "cos":"Babylon.png", "midFloorY":0.1, "hotspots":[[.5, 55.7, 99.3, 79.2, "great walls of Babylon", "notes"], [25.6, 34.2, 69.2, 49.7, "streets of Babylon", "notes"], [36.9, 66.8, 42, 80.1, "statue of an accient king", "notes"], [59.5, 67.8, 64.6, 80.7, "statue of an accient king", "notes"], [10.7, 27.5, 27.1, 51.3, "great ziggurat", "notes"], [8, 43.1, 39.8, 54.4, "hanging gardens of Babylon", "notes"], [44.9, 63.6, 55.9, 80.6, "great gate of Babylon", "notes"], [63.3, 35.7, 87.9, 51.9, "Euphrates River", "notes"], [76.4, 36.2, 98.4, 45.1, "wealthy villas", "notes"]] },// area just south of Baghdad
         { "name":"Calcutta", "xPx":3669, "yPx":1075, "zoom":1, "cos":"Calcutta.png", "hotspots":[[13.4, 38.8, 21.3, 68.9, "palace", "notes"], [79.7, 37.5, 88, 71.9, "palace", "notes"], [14, 53.5, 88, 72.7, "palace", "notes"], [43, 37.7, 57.2, 54.3, "domed roof", "notes"], [48, 62.5, 53, 782, "statue", "notes"], [14.9, 74.3, 85.3, 84.7, "ornamental lawn", "notes"]] },// Victoria Memorial, built between 1906-1921
         { "name":"Hong Kong", "xPx":4079, "yPx":1077, "zoom":0, "cos":"Hong-Kong.png", "hotspots":[[5.2, 35.4, 75.5, 55.6, "mountains", "notes"], [75.5, 27.1, 95.5, 42.6, "mountains", "notes"], [5.7, 59.2, 73, 80.6, "harbour", "notes"], [8, 72.4, 37, 82.1, "boats", "notes"], [10.9, 58.4, 37.8, 66.7, "boats", "notes"], [37.7, 62.3, 72.2, 68.7, "boats", "notes"], [66.9, 67.8, 94.5, 78.9, "boats", "notes"], [34.2, 53.9, 72.4, 63.4, "house", "notes"], [66, 42.3, 95.4, 66.8, "house", "notes"]] },//80 days
         { "name":"Jerusalem", "xPx":2810, "yPx":899, "sceneType":" countryside ", "zoom":1, "notes":["labelAbove"], "cos":"Jerusalem.png", "hotspots":[[25.5, 40.1, 74.9, 51.7, "Jerusalem", "notes"], [40.8, 42.1, 47.7, 49.4, "Temple Mount", "notes"], [71.7, 25.5, 96.4, 46.9, "olive tree", "notes"], [28.5, 64, 4.9, 76.5, "rock", "notes"], [24.9, 59, 79.5, 82.4, "Kidron valley", "notes"]] },
         { "name":"Kathmandu", "xPx":3603, "yPx":976, "sceneType":" town ", "zoom":0, "notes":["labelBelowRight"], "cos":"Kathmandu.png", "hotspots":[[35.5, 36.7, 43, 86.5, "pillar", "notes"], [16.5, 49.2, 29.8, 82.9, "temple", "notes"], [44, 32.9, 61, 83.8, "temple", "notes"], [61.2, 44, 79.2, 80.9, "temple", "notes"]] },//Hanuman Dhoka (square, lots of monkeys)
         { "name":"Mumbai", "xPx":3431, "yPx":1139, "zoom":0, "cos":"Mumbai.png", "hotspots":[[5.7, 35.8, 92.8, 72.2, "Chhatrapati Shivaji Railway Terminus", "notes"]] },//Chhatrapati Shivaji Terminus, 1887
         { "name":"Shuruppak", "xPx":2963, "yPx":897, "sceneType":" desert ", "zoom":1, "notes":["labelBelow"], "cos":"Shuruppak.png", "hotspots":[[27.2, 32.2, 66.8, 49.7, "temple", "notes"], [1.3, 45.5, 22.3, 55, "desert", "notes"], [32.3, 45.8, 40.9, 58.5, "palm trees", "notes"], [6.7, 52.7, 33.3, 70.9, "houses", "notes"], [31.3, 58.7, 62.8, 78, "house", "notes"], [60.7, 45.9, 94.4, 64.7, "houses", "notes"], [42.2, 48.2, 62.9, 58.8, "temple courtyard", "notes"], [78.4, 56.5, 85, 65.4, "palm tree", "notes"], [64.4, 41.1, 91.2, 45.5, "walls", "notes"]] },
         { "name":"Yokohama", "xPx":4403, "yPx":831, "sceneType":" town ", "zoom":0, "cos":"Yokohama-100-steps.png", "hotspots":[[5.4, 40.5, 94.2, 76.4, "hillside", "notes"], [39.4, 37.2, 47.1, 78.7, "steps", "notes"], [16, 27.7, 92.3, 40.3, "top of the hill", "notes"]] },//100 stone steps at Motomachi, Yokohama

      // Africa
         { "name":"Carthage", "xPx":2419, "yPx":805, "sceneType":" city ", "zoom":1, "notes":["labelLeft"], "cos":"Carthage.png", "hotspots":[[87.3, 61.4, 79.9, 41.6, "statue of a bull", "notes"], [54.3, 32.1, 72.4, 42.5, "temples", "notes"], [46.9, 51.5, 57.5, 57.2, "temple", "notes"], [6.7, 55.6, 67.6, 43.1, "houses", "notes"], [6.3, 55.4, 65.7, 82.4, "harbour", "notes"], [74.8, 28.2, 94.6, 52, "defensive walls", "notes"]] },// by Tunis, Tunisia
         { "name":"Durban", "xPx":2745, "yPx":2064, "sceneType":" city ", "zoom":0, "notes":["labelBelowLeft"] },//Alan Quartermain's home
         { "name":"Giza", "xPx":2747, "yPx":938, "sceneType":" desert ", "zoom":0, "cos":"Giza.png", "notes":["labelLeft"], "hotspots":[[24.5, 38.4, 36.9, 53.8, "Sphinx", "notes"], [23.2, 51.9, 47.9, 63.3, "Sphinx", "notes"], [5.3, 62, 31, 70.9, "Sphinx", "notes"], [39.2, 57.7, 44.8, 64, "entrance to the Sphinx", "notes"], [55.5, 54.7, 77.3, 68.5, "platform", "notes"], [76.5, 31.2, 93.5, 44.3, "Great Pyramid of Khufu", "notes"], [70.9, 43.5, 98.9, 52.7, "Great Pyramid of Khufu", "notes"], [43, 47.2, 53.9, 53.7, "Pyramid of Khafre", "notes"], [11.8, 46.5, 21, 52.7, "Pyramid of Menkaure", "notes"], [76.8, 52.9, 99.5, 58.6, "stone blocks", "notes"]] },//Zak. By Cairo.
         { "name":"Kinshasa", "xPx":2515, "yPx":1584, "sceneType":" countryside ", "zoom":0, "cos":"Kinshasa.png", "hotspots":[[63.5, 42.8, 93.8, 75, "hut", "notes"], [11.2, 28.9, 59.9, 62.2, "tree", "notes"], [20.4, 55.8, 49.4, 69.2, "huts", "notes"]] },//Zak
         { "name":"Kukuanaland", "xPx":2745, "yPx":2037, "sceneType":" countryside ", "notes":["labelAbove"], "zoom":1, "cos":"Kukuanaland.png", "hotspots":[[14, 29.1, 82.8, 49.9, "twin mountains", "notes"], [1.8, 49.1, 98.7, 56.3, "distant trees", "notes"]] },//King Solomon's Mines. Book compares dialect to Zulu, so Zulu.
         { "name":"Suez", "xPx":2773, "yPx":932, "sceneType":" desert ", "zoom":2, "notes":["labelBelowRight"], "cos":"Suez.png", "hotspots":[[.7, 43.9, 33.4, 88.7, "Mediterranean Sea", "notes"], [31, 67.2, 60.4, 86.2, "Suez Canal", "notes"], [65.4, 37.4, 85, 74.3, "Suez Canal", "notes"], [52.7, 51.7, 69.2, 68.8, "palm trees", "notes"], [84, 32.8, 99.8, 78.2, "palm trees", "notes"], [74, 55.3, 84.9, 71.2, "palm tree", "notes"], [33.8, 59.7, 41.8, 71.2, "boat", "notes"], [45.4, 59, 54.4, 69.3, "boat", "notes"], [12.8, 58.4, 33.9, 66.8, "government buildings", "notes"], [37.5, 56.7, 46.2, 65.9, "houses", "notes"], [45.7, 55.6, 52, 59.2, "houses", "notes"]] },

      // Oceania
         { "name":"Emerald City", "xPx":4427, "yPx":1524, "sceneType":" countryside ", "zoom":0, "cos":"Emerald-City.png", "hotspots":[[20.5, 26, 76, 51.9, "Emerald City", "notes"], [38.1, 53.2, 70.8, 66.2, "yellow brick road", "notes"], [54.5, 65.2, 95.8, 77.9, "yellow brick road", "notes"], [31.2, 76.4, 95.8, 88.2, "yellow brick road", "notes"]] }, // in country:draw special scenes; very few
         // Oz map fits West Papua:shape, many peoples, southen hemisphere, yet northern constellations; Momi = Mombi
         { "name":"Easter Island", "xPx":326, "yPx":1979, "sceneType":" countryside ", "zoom":0, "cos":"Easter-Island.png", "notes":["island"], "hotspots":[[6.9, 40.6, 16, 53.1, "moai", "notes"], [39.9, 42, 51.3, 72.4, "moai", "notes"], [86.2, 25.5, 68.9, 68.2, "moai", "notes"], [52.3, 42.5, 64.3, 53.1, "moais", "notes"]] },

      // NOT ON MAP: to close to other places. Let user DISCOVER unlisted places!
         // { "name":"Entrance to Kukuanaland", "xPx":2745, "yPx":2037, "sceneType":" desert ", "notes":["notOnMap"], "cos":"Kukuanaland-close.png", "hotspots":[[2,24.6,17,86.7,"gigantic stone head","notes"], [82.2,26.1,99.8,85.7,"gigantic stone head","notes"],[18,29,84.2,82.4,"gigantic carvings of warriors","notes"], [38.2,26.2,56.8,68.3,"enormous carved mask","notes"], [36.9,69.9,56.4,86.3,"tunnel entrance","notes"]] }, // Great image! Sacred Grove of Osun-Osogbo. One of the last sacred sites of the Yoruba people

         // " //

// NEED DRAWINGS (fit into auto scenes where possible). 72 new scenes to draw. Currently 30!

      // ancient + important
      // super ancient
         { "name":"Gobekli Tepe", "xPx":2856, "yPx":803, "sceneType":" wilderness ", "notes":["ancient","veryAncient"] }, //

      // tombs
         { "name":"NewGrange", "xPx":2176, "yPx":492, "sceneType":" countryside ", "notes":["ancient","tombs"] }, // north of Dublin. 5000 year old passage grave, finest in Europe. From 3000 BC.
         { "name":"Carnac", "xPx":2221, "yPx":602, "sceneType":" wilderness ", "notes":["ancient","tombs","labelBelow"] }, // Brittany: 4700 BC, oldest structure in Europe, lines of standing stones as far as the eye can see.
         { "name":"Tarxien", "xPx":2489, "yPx":820, "sceneType":" wilderness ", "notes":["ancient","tombs"] }, // Malta: large temple complex and red painted catacombs from 3500-3000 BC
      // holy
         { "name":"Throne&nbsp;of Solomon", "xPx":2985, "yPx":814, "sceneType":" wilderness ", "notes":["ancient","holy"] }, // Takht-e Soleyman, Iran: fire temple by bottomless lake- most important of 3 fires kings must bow before. AD 620. Zoriastrians' holiest place.
         { "name":"Mt Tai", "xPx":4042, "yPx":830, "sceneType":" mountains ", "notes":["ancient","holy","mountain"] }, // T'ai Shan: most important of China's five sacred mountains, for 3000+ years. Various gods and shrines. Great steps image.
         { "name":"Mecca", "xPx":2901, "yPx":1098, "sceneType":" wilderness ", "notes":["ancient","holy"] }, //

      // Africa, ancient
         { "name":"Great Zimbabwe", "xPx":2752, "yPx":1882, "sceneType":" wilderness ", "notes":["ancient"] }, // 11-15th century city, only major iron age civilisation in southern hemisphere
         { "name":"The&nbsp;Eye of&nbsp;Africa", "xPx":2087, "yPx":1115, "sceneType":" wilderness ", "notes":["ancient","veryAncient"] }, // Solon's Atlantis, as opposed to Plato's Atlantis in the ocean
         { "name":"Olduvai&nbsp;Gorge", "xPx":2843, "yPx":1549, "sceneType":" wilderness ", "notes":["ancient","veryAncient","labelAbove"] }, // more remains than anywhere else, over very long period, BUT close to other locations
         { "name":"Valley&nbsp;of&nbsp;the&nbsp;Kings", "xPx":2782, "yPx":1014, "sceneType":" wilderness ", "notes":["ancient"] }, // Tutankhamun etc. 1 mile from Luxor, which is 3 miles from Thebes
         { "name":"Island of&nbsp;Meroe", "xPx":2797, "yPx":1168, "sceneType":" wilderness ", "notes":["ancient"] }, // me: uncover secret! First clue: not an island!! Realise the secret of Atlantis - realise these ancient accounts were accurate
         { "name":"Aswan", "xPx":2774, "yPx":1047, "sceneType":" wilderness ", "notes":["ancient"]  }, // first Cataract of the Nile: gateway to upper Egypt. the original location of Abu Simbel and other monuments, now moved when the new dam created Lake Nasser and stopped the ancient flooding of the Nile
         { "name":"Axum", "xPx":2888, "yPx":1231, "sceneType":" wilderness ", "notes":["ancient"] }, // houses the Ark of the Covenant
         { "name":"Lalibela", "xPx":2901, "yPx":1272, "sceneType":" wilderness ", "notes":["ancient"] }, // rock hewn churches from 1200s, connected by subterranean passages
         { "name":"Chongoni", "xPx":2824, "yPx":1760, "sceneType":" wilderness ", "notes":["ancient","veryAncient"] }, // Dedza district: more ancient rock art than anywhere else
         { "name":"Zerzura", "xPx":2443, "yPx":1057, "sceneType":" wilderness ", "notes":["ancient"] }, // 'Shining City' in the Libyan desert. Founded by lost Templars? Guarded by black giants? =city of Dionysius? I place it at Tadrart Acacus, Libya: tons of Saharan rock art to 12,000 BC: use for Atlantis mystery. Too far west? On western edge of Libya. Maybe the Templars knew the remannts of the wet Saharan golden age was here, so headed for it: good place to hide.
         { "name":"Senegambia", "xPx":2014, "yPx":1243, "sceneType":" wilderness ", "notes":["ancient","tombs"] }, // Stone circles as burial grounds, 3rd century BC-16th AD
         { "name":"Sterkfontein", "xPx":2702, "yPx":1985, "sceneType":" wilderness ", "notes":["ancient"] }, // caves: oldest human ancestors: 4 million years

      // Africa, other
         { "name":"Victoria Falls", "xPx":2683, "yPx":1829, "sceneType":" wilderness " }, // world's highest waterfall
         { "name":"Mt. Kilimanjaro", "xPx":2875, "yPx":1560, "sceneType":" wilderness " }, // NOT scenetype mountains: free standing. World's highest free standing mountain, "the roof of Africa"
         { "name":"Table Mountain", "xPx":2749, "yPx":2054, "sceneType":" wilderness " }, // NOT scenetype mountains: free standing. Near Durban, South Africa. Huge, flat topped
         { "name":"Mountain&nbsp;of&nbsp;God", "xPx":2845, "yPx":1563, "sceneType":" wilderness ", "notes":["labelBelowLeft"]  }, // Masai name for the still active remains of the ancient volcano that produced the Ngorongoro Crater: world's biggest: 2km deep, 19km across:  volcano may have been Everest sized when it exploded, 2.45-2 million years ago. Near Kilimanjaro
         { "name":"Virunga&nbsp;Mountains", "xPx":2725, "yPx":1525, "sceneType":" wilderness ", "notes":["labelLeft"] }, // mountain gorillas
         { "name":"Timbuktu", "xPx":2218, "yPx":1188, "sceneType":" wilderness " }, // 16th century: golden age, intellectual crossroads of Islamic world
         { "name":"Bay&nbsp;of Arguin", "xPx":2006, "yPx":1115, "sceneType":" wilderness ", "notes":["labelBelow"] }, // part of secret of Atlantis - find Tamanrasett - made lower part - jungle, not desert - an island
         { "name":"Marienfluss valley", "xPx":2472, "yPx":1827, "sceneType":" wilderness " }, // Namibia: fairy circles - thousands of mysterious circles in the desert

      // other
         { "name":"Glastonbury", "xPx":2226, "yPx":537, "sceneType":" countryside ", "notes":["ancient","labelAboveLeft"] }, // founded by Joseph of Arimathea, site of King Arthur and the Holy Grail. see also: island of Avalon
         { "name":"Cumae", "xPx":2476, "yPx":728, "sceneType":" wilderness ", "notes":["ancient","labelLeft"] }, // Cave, home to the oracle the Sybil of Cumae, and entrance to the underworld
         { "name":"Delphi", "xPx":2600, "yPx":774, "sceneType":" wilderness ", "notes":["ancient"] }, // Oracle, and canter or navel of the world
         { "name":"Externsteine", "xPx":2395, "yPx":528, "sceneType":" wilderness ", "notes":["ancient"] }, // dramatic rocks, great image. Landmark since prehistoric times; monks lived in its chambers. South of Hamburg
         { "name":"Nazca", "xPx":1059, "yPx":1773, "sceneType":" wilderness ", "notes":["ancient","labelLeft"] }, // Nazca lines. Unknown purpose and date. Similar to ancetor worship figures, and line similar to those made when walking a prescribed path of pilgrimage. Not noticed by westerners until 1920s. Region occupied for 12,000 years. Close to Cusco and Machu Picchu.
         { "name":"Knossos", "xPx":2652, "yPx":833, "sceneType":" wilderness ", "notes":["ancient"] }, // Minoan Crete, site of Labyrinth built by Daedalus
         { "name":"Ayer's Rock", "xPx":4346, "yPx":1972, "sceneType":" desert ", "notes":["ancient","holy"] }, //
         { "name":"Cerne&nbsp;Abbas", "xPx":2228, "yPx":543, "sceneType":" wilderness ", "notes":["ancient","labelBelowRight"] }, // chalk giant carved into hill
         { "name":"Dragon&nbsp;Hill", "xPx":2243, "yPx":529, "sceneType":" wilderness ", "notes":["ancient","labelAbove"] }, // overlooking White Horse hill - perfect graphics!! Where George killed the dragon. Symbol of the crusades: old story about Anatolia, but vbecame popular in the crusades when passing through those lands: "The knights of the First Crusade believed that St. George, along with his fellow soldier-saints Demetrius, Maurice and Theodore, had fought alongside them at Antioch and Jerusalem."
         { "name":"Machu&nbsp;Picchu", "xPx":1095, "yPx":1740, "sceneType":"  mountains ", "notes":["ancient","labelAboveLeft"] }, // large, great stonework, still in remote jungle until 1911 - over rope bridges. Close to Cusco.
         { "name":"Teotihuacan", "xPx":683, "yPx":1134, "sceneType":" wilderness ", "notes":["ancient","labelAboveLeft"] }, // city of the gods: gigantic temple of the sun, temple of the moon, etc.
         { "name":"AngKor Wat", "xPx":3944, "yPx":1249, "sceneType":" wilderness ", "notes":["ancient"] }, // if only for the image! Leads to caves inside
         { "name":"Troy", "xPx":2661, "yPx":743, "sceneType":" wilderness ", "notes":["ancient"] }, //
         { "name":"Petra", "xPx":2818, "yPx":926, "sceneType":" desert ", "notes":["ancient"] }, //
         { "name":"Mohenjo Daro", "xPx":3343, "yPx":984, "sceneType":" wilderness ", "notes":["ancient"] }, // 2500 BC, implied by the Rigveda: god Indra defeated advanced civilisation, many forts and castles later in 1500 BC
         { "name":"El Dorado", "xPx":1068, "yPx":1408, "sceneType":" wilderness ", "notes":["ancient"] }, // Lake Guatavita near Bogota


         { "name":"Devil's Tower", "xPx":722, "yPx":675, "sceneType":" wilderness " }, //
         { "name":"Giant's&nbsp;Causeway", "xPx":2175, "yPx":464, "sceneType":" coast ", "notes":["labelAbove"] }, //
         { "name":"Xiangkhoang", "xPx":3934, "yPx":1134, "sceneType":" wilderness ", "notes":["ancient","tombs"] }, // Xiangkhoang Plateau. Plain of Jars, Laos: thousands of stone jars, from 500 BC-AD 500. Presumed to be burial related
         { "name":"Palmar Sur", "xPx":911, "yPx":1333, "sceneType":" wilderness ", "notes":["ancient"] }, // Costa Rica: over 300 large stone spheres: 300 BC -AD 1550
         { "name":"Tres&nbsp;Zapotes", "xPx":738, "yPx":1151, "sceneType":" wilderness ", "notes":["labelBelowLeft"] }, // great stone head: still partly buried? Only one discovered before 1930s, then many
         { "name":"Great&nbsp;Blue&nbsp;Hole", "xPx":865, "yPx":1172, "sceneType":" wilderness ", "notes":["labelBelow"] }, // off coast of Belize: coral circle

      // buried treasure
         { "name":"Oak Island", "xPx":1319, "yPx":659, "sceneType":" coast ", "notes":["buriedTreasure"] }, // huge treasure allegedly, but never found
         { "name":"Victorio peak", "xPx":613, "yPx":896, "sceneType":" wilderness ", "notes":["buriedTreasure"] }, // 'Doc' Noss claimed to find an enormous treasure. Dynamited the entrance to enlarge it, but it caved in
         { "name":"Cocos", "xPx":852, "yPx":1394, "sceneType":" coast ", "notes":["buriedTreasure","island"] }, // huge treasure allegedly, but never found
         { "name":"Mahe", "xPx":3172, "yPx":1586, "sceneType":" wilderness ", "notes":["buriedTreasure","island"] }, // Seychelles: pirate Olivier Levasseur, "the buzzard" allegedly buried a huge treasure here before his death in 1730

      // mystical - e.g. fairies live there, or may disappear
         { "name":"Hy&nbsp;Brasil", "xPx":2096, "yPx":491, "sceneType":" wilderness ", "notes":["mystical","island","labelLeft"] }, // hidden by mists, west of Ireland. Visible every seven years. Advanced civilization. Has old man who gave gold to sailors, and a magician in a castle.
         { "name":"Mammoth Cave", "xPx":961, "yPx":811, "sceneType":" wilderness ", "notes":["mystical","underground"] }, // entrance to Agartha: Buddhist, center of Earth.
         { "name":"Ryugu-jo", "xPx":4293, "yPx":909, "sceneType":" wilderness ", "notes":["mystical","underwater"] }, // Japanese 'Dragon Palace', underwater. Location is Ryugu Shrine near the coast, the only known way in. Then swim for several days.

      // utopias:
         { "name":"Avalon", "xPx":2194, "yPx":594, "sceneType":" wilderness ", "notes":["utopia","island","labelLeft"] }, // Avalon ('Isle of Apples') where Arthur is nursed back to health after battle with Mordred. Île-de-Sein, off Brittany, one of Geoffrey of Monmouth's original inspirations.
         { "name":"Tir na&nbsp;nog", "xPx":1918, "yPx":960, "sceneType":" wilderness ", "notes":["utopia","island"] }, // Celtic 'Land of Ever Young' - I identify it with Elysian Fields =Fortunate Isles =Isles of the Blessed =St Brendan's Isle, as it used to be on maps, west of the Canaries
         { "name":"Cockaigne", "xPx":1805, "yPx":749, "sceneType":" wilderness ", "notes":["utopia","island"] }, //AD 1250, from earlier traditions. "west of Spain". Food walks the streets, etc. make it scientific.
         { "name":"Alfheimr", "xPx":2419, "yPx":392, "sceneType":" wilderness ", "notes":["utopia"] }, // Norse, where light-elves live. =border of south Norway(Ostfold) ad Sweden(Bohuslän): stione circles, ancient elvish kings, etc.

      // godHomes (mountains):
         { "name":"Mt Fuji", "xPx":4389, "yPx":831, "sceneType":" mountains ", "notes":["godHome","labelLeft"]}, // Japan
         { "name":"Kun&nbsp;Lun", "xPx":3793, "yPx":946, "sceneType":" mountains ", "notes":["godHome","labelLeft"]}, // Mountain (end of mountain range): Chinese, an axis mundi, supreme deity lives here, Fuxi and Nuwa married here [only survivors of the great flood], etc. ould be anywhere along 3000km mountain range. Chinese ened = closest large mountain to Shambala
         { "name":"Mt Elbrus", "xPx":2892, "yPx":687, "sceneType":" mountains ", "notes":["godHome"]}, // Elburz, formerly Omphalos: Caucasus creation myth set here. Persians said all other mountains grew from this one. A Pelasgian word (see Atlantis). Also Prometheus was chained here
         { "name":"Mt&nbsp;Olympus", "xPx":2596, "yPx":743, "sceneType":" mountains ", "notes":["godHome","labelAbove"]}, // Greek and Roman

      // godHomes (other):
         { "name":"Ile-Ife", "xPx":2341, "yPx":1356, "sceneType":" wilderness ", "notes":["godHome"]}, // Yoruba, Nigeria, "On par with Jerusalem, Mecca, or Rome", epicenter of all that will ever exist, birthplace of gods and humans
         { "name":"Shambala", "xPx":3807, "yPx":965, "sceneType":" wilderness ", "notes":["godHome","labelBelowRight"]}, // later fictionaised as Shangri-la) - Palace of the Yellow Emperor, the mythical originator of Chinese culture. This UNESCO 3 rivers region, at the end of the 3000 mile Kunlun mountain range, seems the most likely candidate.
         { "name":"Ayodhya", "xPx":3577, "yPx":1014, "sceneType":" wilderness ", "notes":["godHome","labelBelowLeft"]}, // city of lord Rama and may early kings, founded by Manu, the progenitor of mankind
         { "name":" Mt&nbsp;Meru", "xPx":3596, "yPx":972, "sceneType":" wilderness ", "notes":["godHome","labelAboveLeft"]}, // Mt Kailash. Shiva, sacred to Hindu, Buddist, Jain and Bon (Tibet)
         { "name":"Eden", "xPx":2964, "yPx":791, "sceneType":" wilderness ", "notes":["godHome"]}, // Tabriz and eastward toward Caspian Sea. Based on David Rohl's persuasive work
         { "name":"Buyan", "xPx":2452, "yPx":478, "sceneType":" wilderness ", "notes":["godHome","island"]}, // Rugen island, Germany, Slavic Gods)
         { "name":"Hawaiki", "xPx":12, "yPx":1816, "sceneType":" wilderness ", "notes":["godHome","island"]}, // Raiatea, ancient first place of the Polynesians. Note distortion of map: middle of Pacific.
         { "name":"Kilauea", "xPx":12, "yPx":1668, "sceneType":" wilderness ", "notes":["godHome","island"] } // Hawaii: Pele, goddess of volcanoes, lives in the Halema'uma'u crater

      // NOT ON MAP: to close to other places. Let user DISCOVER unlisted places!
         // { "name":"Osogbo", "xPx":2336, "yPx":1356, "sceneType":" wilderness ", "notes":["holy","notOnMap"] }, // Great image! Sacred Grove of Osun-Osogbo. One of the last sacred sites of the Yoruba people



         // space:new image, as needed
         // {"name":"", "xPx":,"yPx":, "sceneType":"", "zoom":0},
      );
      db.islands = [// pixel positions of tiny islands (does not include the Mediterranean)
      [105, 442], [115, 441], [1164, 2221], [1169, 2302], [1170, 2287], [1174, 2267], [1176, 2283], [1178, 2219], [1179, 2261], [1179, 2317], [1180, 2266], [1183, 2321], [1186, 2225], [1186, 2305], [1188, 2261], [1188, 2315], [1189, 2252], [1189, 2349], [1202, 2361], [1218, 2388], [1227, 2395], [1232, 2399], [1235, 2411], [1245, 2420], [1280, 2432], [1287, 2433], [1296, 2433], [1312, 2441], [1341, 2438], [1347, 2436], [15, 466], [157, 318], [20, 471], [208, 392], [231, 378], [291, 379], [298, 375], [3, 471], [302, 368], [31, 467], [322, 371], [34, 464], [388, 197], [391, 203], [397, 203], [426, 850], [444, 556], [449, 470], [452, 476], [454, 569], [455, 515], [456, 530], [46, 463], [486, 564], [494, 585], [496, 1040], [499, 583], [504, 958], [51, 464], [512, 1011], [515, 1008], [517, 1017], [517, 1029], [519, 1037], [526, 1043], [554, 222], [57, 461], [584, 231], [597, 224], [668, 215], [751, 1197], [774, 1507], [788, 1505], [794, 1512], [809, 1516], [852, 237], [875, 242], [879, 1282], [895, 244], [900, 245], [904, 248], [910, 255], [915, 246], [937, 1357], [98, 404], [989, 1451], [1004, 649], [1015, 638], [1018, 1075], [1025, 600], [1028, 1084], [1031, 636], [1045, 632], [1049, 634], [1054, 635], [1066, 637], [1083, 1149], [1085, 1158], [1097, 1102], [1098, 1145], [1102, 1121], [1110, 823], [1112, 794], [1118, 1168], [1165, 1157], [1176, 447], [1182, 444], [1183, 727], [1184, 725], [1186, 445], [1213, 718], [1216, 1158], [1225, 366], [1229, 1293], [1245, 336], [1251, 668], [1252, 663], [1274, 1195], [1278, 1209], [1279, 1191], [1279, 1198], [1280, 1335], [1282, 1223], [1282, 1236], [1295, 335], [1331, 2175], [1332, 598], [1333, 2198], [1340, 656], [1359, 554], [1381, 187], [1400, 350], [1402, 343], [1422, 447], [1423, 231], [1428, 305], [1428, 448], [1429, 424], [1429, 428], [1430, 439], [1431, 219], [1432, 239], [1434, 317], [1434, 454], [1439, 242], [1442, 1498], [1443, 245], [1445, 1462], [1451, 2079], [1455, 605], [1456, 290], [1458, 1501], [1467, 284], [1474, 284], [1475, 546], [1476, 568], [1477, 259], [1477, 490], [1478, 1522], [1481, 272], [1481, 605], [1484, 523], [1485, 2020], [1491, 565], [1491, 578], [1504, 1987], [1506, 1982], [1522, 1522], [1533, 1924], [1534, 1525], [1541, 1553], [1543, 1920], [1548, 1922], [1554, 1544], [1554, 1914], [1558, 1913], [1578, 1552], [713, 1090], [715, 1094], [751, 968], [786, 945], [798, 1146], [832, 941], [851, 1169], [869, 947], [871, 951], [874, 1095], [878, 1113], [913, 1206], [938, 1328], [947, 1091], [982, 595], [985, 650], [998, 639], [1831, 770], [1838, 772], [1861, 1176], [1864, 1181], [1882, 785], [1885, 1215], [1892, 1212], [1899, 1195], [2006, 965], [2008, 1283], [2012, 1288], [2013, 1051], [2022, 971], [2041, 970], [2047, 963], [2052, 951], [2778, 2611], [2887, 2617], [3163, 2610], [3284, 2601], [3291, 2604], [3335, 2592], [2287, 764], [2311, 752], [2328, 744], [2385, 669], [2419, 692], [2474, 730], [2476, 653], [2482, 656], [2487, 669], [2512, 682], [2516, 685], [2517, 773], [2520, 688], [2525, 690], [2527, 694], [2565, 752], [2577, 777], [2583, 787], [2616, 813], [2617, 742], [2623, 741], [2626, 737], [2626, 752], [2632, 760], [2634, 731], [2635, 788], [2638, 803], [2639, 749], [2639, 794], [2641, 782], [2643, 786], [2645, 806], [2647, 789], [2649, 800], [2652, 806], [2653, 799], [2653, 810], [2655, 739], [2658, 747], [2659, 772], [2659, 802], [2663, 810], [2664, 836], [2665, 789], [2673, 798], [2673, 831], [2675, 787], [2676, 803], [2679, 807], [2680, 826], [2684, 816], [2685, 805], [2689, 808], [2693, 817], [2727, 622], [2747, 632], [2772, 630], [2779, 630], [2783, 812], [2776, 2030], [2787, 1544], [2791, 1509], [2795, 1544], [2798, 1500], [2803, 1539], [2808, 1496], [2808, 971], [2819, 1509], [2832, 1910], [2841, 1015], [2860, 1102], [2904, 1615], [2910, 1650], [2912, 1202], [2913, 1597], [2914, 1214], [2957, 1236], [2968, 1721], [3022, 942], [3062, 1006], [3068, 1822], [3070, 1818], [3097, 1303], [3098, 1041], [3104, 993], [3115, 999], [3117, 1042], [3149, 1179], [3153, 988], [3153, 994], [3154, 1899], [3186, 1885], [3203, 1117], [3286, 1023], [3313, 1018], [3558, 1321], [3560, 1329], [3564, 1317], [3631, 1128], [3677, 1089], [3708, 1085], [3714, 1079], [3720, 1075], [3765, 1297], [3766, 1144], [3766, 1283], [3768, 1263], [3771, 1273], [3788, 1362], [3791, 1368], [3816, 1390], [3830, 1451], [3852, 1269], [3856, 1481], [3858, 1263], [3858, 1311], [3861, 1279], [3863, 1348], [3867, 1349], [3870, 1508], [3871, 1470], [3878, 1527], [3885, 1374], [3887, 1321], [3891, 1381], [3896, 1400], [3898, 1555], [3921, 1271], [3927, 1280], [3950, 1481], [3951, 1486], [3962, 1481], [3968, 1511], [3969, 1481], [3971, 1504], [3974, 1481], [4006, 1556], [4016, 1555], [4058, 1551], [4117, 1633], [4135, 1669], [4143, 1667], [4145, 1659], [4160, 1564], [4174, 1656], [4199, 1655], [4205, 1662], [4237, 1490], [4242, 1656], [4249, 1598], [4252, 1660], [4262, 1661], [4268, 1527], [4270, 1579], [4271, 1533], [4275, 1526], [4279, 1532], [4279, 1659], [4290, 1492], [4299, 1467], [4306, 1657], [4336, 1574], [4338, 1514], [4339, 1526], [4340, 1493], [4341, 1486], [4342, 1498], [4344, 1522], [4344, 1560], [4348, 1515], [4349, 1556], [4351, 1568], [4359, 1568], [4375, 1650], [4392, 1508], [4394, 1517], [4394, 1646], [4395, 1654], [4396, 1641], [4426, 1567], [4437, 1579], [4448, 1529], [4455, 1539], [4455, 1628], [4486, 1534], [4573, 1676], [4590, 1672], [4595, 1661], [3974, 1107], [3982, 1104], [4029, 1101], [4036, 1262], [4049, 1091], [4059, 1090], [4063, 1090], [4084, 1077], [4124, 1057], [4138, 1039], [4140, 1399], [4141, 1038], [4145, 754], [4154, 783], [4154, 997], [4155, 1003], [4157, 1015], [4170, 1365], [4173, 468], [4177, 483], [4188, 796], [4190, 811], [4192, 1062], [4200, 843], [4206, 701], [4210, 852], [4216, 869], [4218, 687], [4222, 846], [4229, 1273], [4232, 1193], [4232, 1219], [4234, 1232], [4236, 1221], [4236, 1248], [4237, 841], [4250, 483], [4255, 1255], [4256, 883], [4258, 877], [4265, 1263], [4269, 500], [4270, 1288], [4270, 1327], [4271, 1259], [4273, 1239], [4275, 1267], [4279, 881], [4280, 897], [4283, 1299], [4285, 1279], [4286, 1308], [4296, 1310], [4297, 927], [4299, 1389], [4304, 924], [4310, 1317], [4314, 1325], [4335, 572], [4337, 649], [4340, 704], [4412, 674], [4434, 650], [4455, 634], [4475, 399], [4484, 550], [4597, 1660], [4627, 1577], [4627, 2457], [4630, 287], [4643, 1587], [4667, 1625], [4671, 1605], [4691, 505], [4703, 1676], [4704, 2388], [4710, 1679], [4711, 1700], [4712, 1686], [4713, 1547], [4720, 1551], [4747, 1673], [4798, 1634], [4813, 2328], [4820, 1660], [4823, 1665], [4854, 2266], [4859, 1673], [4865, 1674], [4888, 1692], [4931, 2196], [4934, 1897], [4943, 1908], [4943, 2194], [4968, 1835], [4969, 1807], [4976, 1856], [4057, 1988], [4062, 1989], [4073, 2165], [4125, 1890], [4131, 1889], [4161, 2143], [4273, 1790], [4281, 1784], [4293, 1770], [4342, 2154], [4355, 1781], [4413, 1710], [4426, 1721], [4428, 1718], [4430, 2254], [4437, 2269], [4462, 2227], [4464, 2306], [4465, 1794], [4466, 1761], [4471, 1767], [4473, 1797], [4479, 2233], [4488, 2264], [4489, 2255], [4507, 1814], [4507, 1823], [4571, 1702], [4647, 1884], [4662, 1924], [4676, 2016], [4676, 2021], [417, 857], [420, 855], [422, 872], [440, 871], [437, 880], [429, 953], [456, 968], [563, 1090], [564, 1094], [509, 1122], [985, 1338], [982, 1340], [793, 1497], [791, 1525], [1034, 2104], [1061, 2098], [1327, 2444], [1374, 2427], [1134, 1260], [1140, 1267], [1188, 1280], [1224, 1274], [1275, 1263], [1268, 1179], [1262, 1174], [1265, 1166], [1255, 1170], [1249, 1160], [1249, 1155], [1233, 1154], [1231, 1156], [1227, 1155], [1227, 1163], [1221, 1154], [1177, 1158], [1064, 1152], [1016, 1112], [1006, 1106], [988, 1130], [958, 1141], [968, 1090], [960, 1092], [954, 1089], [936, 1087], [872, 1138], [857, 1173], [875, 1194], [883, 1192], [933, 1226], [952, 1244], [946, 1265], [978, 1058], [986, 1060], [1005, 1071], [1055, 1079], [1058, 1083], [979, 1030], [975, 1032], [966, 1033], [960, 1035], [1122, 1091], [1116, 1088], [1112, 1090], [1110, 1092], [1099, 1078], [1087, 1080], [1085, 1074], [1088, 1069], [1059, 1057], [1066, 1058], [1070, 1054], [1073, 1047], [1060, 1043], [1055, 1040], [1052, 1048], [1040, 1027], [1050, 1028], [1031, 1021], [1032, 1016], [1038, 1012], [1026, 1012], [1028, 1005], [1015, 1017], [979, 1030], [975, 1032], [966, 1033], [961, 1036], [882, 937], [1283, 659], [1373, 605], [1443, 619], [1806, 748], [1884, 800], [1873, 1184], [1897, 1180], [2130, 503], [2004, 909], [1998, 981], [2020, 1589], [2142, 1709], [2801, 2354], [3014, 2309], [3034, 2316], [3040, 2317], [3292, 2382], [2972, 1732], [2981, 1725], [2985, 1734], [3020, 1679], [2936, 1176], [3519, 1547], [3521, 1554], [4100, 1886], [4176, 1839], [4186, 1832], [4616, 1856], [4930, 1931], [4924, 1888], [4879, 1873], [4982, 1871], [4954, 1766], [4944, 1727], [4933, 1716], [4754, 1703], [4744, 1696], [4714, 1667], [4793, 1639], [4768, 1586], [4728, 1558], [4703, 1536], [4673, 1546], [4655, 1599], [3988, 1665], [4243, 1696], [4339, 1654], [4353, 1639], [4333, 1645], [4235, 1639], [4230, 1634], [4226, 1613], [4134, 1632], [4106, 1614], [4042, 1532], [4251, 1507], [4256, 1506], [4375, 1501], [4461, 1521], [4407, 1454], [4471, 1359], [4306, 1434], [4323, 1419], [4214, 1407], [4221, 1398], [4230, 1380], [4239, 1386], [4191, 1371], [4141, 1341], [4125, 1302], [4176, 1305], [4047, 1348], [4038, 1361], [3990, 1332], [3959, 1448], [3986, 1447], [3993, 1442], [4038, 1443], [3977, 1111], [4061, 1185], [4085, 1133], [4110, 1094], [4117, 1098], [4204, 1140], [4209, 1138], [4208, 1145], [4208, 1120], [4206, 1114], [4163, 1053], [4217, 1036], [4224, 1035], [4241, 1026], [4252, 1003], [4262, 1002], [4273, 987], [4277, 979], [4282, 970], [4173, 927], [4262, 862], [4247, 849], [4293, 822], [4297, 819], [4259, 796], [4404, 869], [4401, 856], [4365, 783], [4332, 642], [4417, 667], [4424, 677], [4430, 674], [4466, 616], [4473, 604], [4474, 598], [4475, 587], [4480, 582], [4480, 572], [4475, 569], [4525, 451], [4532, 453], [4566, 480], [4571, 486], [4589, 487], [4598, 490], [4604, 488], [4632, 497], [4644, 504], [4655, 503], [4727, 502], [4751, 500], [4762, 496], [4795, 488], [4822, 476], [4846, 461], [4858, 456], [4880, 442], [4804, 406], [4794, 394]
      ];
   }
   function addObjects() {
      function addWalls() { p="i\\wall\\";
         pushMany(db.walls, "wall", "", " lounge bathroom bedroom kitchen ", 59, 0);
         pushMany(db.walls, "alien scene", "alien\\", " alien ", 152, 0);
         pushMany(db.walls, "cave", "cave\\", " cave ", 38, 0);
         pushMany(db.walls, "cave", "caveClimb\\", " caveClimb ", 42, 0);
         pushMany(db.walls, "city", "city\\", " city ", 21, 0);
         pushMany(db.walls, "countryside", "countryside\\", " countryside ", 52, 0);
         pushMany(db.walls, "desert scene", "desert\\", " desert ", 68, 0);
         pushMany(db.walls, "forest", "forest\\", " forest ", 37, 0);
         pushMany(db.walls, "govt", "govt\\", " govt ", 21, 0);
         pushMany(db.walls, "mountains", "mountains\\", " mountains ", 25, 0);
         pushMany(db.walls, "ship", "ship\\", " ship ", 3, 0);
         pushMany(db.walls, "tent", "tent\\", " tent ", 9, 0);
         pushMany(db.walls, "town", "town\\", " town ", 49, 0);
         pushMany(db.walls, "tunnel", "tunnel\\", " tunnel ", 76, 0);
         pushMany(db.walls, "village", "village\\", " village ", 37, 0);
         pushMany(db.walls, "wilderness", "wilderness\\", " wilderness ", 53, 0);
         db.walls.push(    // cos =costume; 0 = don't change image in this frame
            { "name":"sky", "heft":0, "cos":p+"seaSkyGood.png ", "for":" sea " },
            { "name":"coast", "heft":0, "cos":p+"coast\\0.gif", "for":" coast " }, // animated GIF, not PNG!
            { "name":"coast", "heft":0, "cos":p+"coast\\1.gif", "for":" coast " }
         );
      }
      function addCeilings() {p="i\\ceiling\\";
         pushMany(db.ceilings, "ceiling", "", " lounge kitchen bedroom bathroom ", 14, 0);
         pushMany(db.ceilings, "cave roof", "cave\\", " cave ", 32, 0);
         pushMany(db.ceilings, "tunnel roof", "tunnel\\", " tunnel ", 17, 0);
         db.ceilings.push(
            { "name":"sky", "heft":0, "cos":p+"transparentSky.png ", "for":" village town city govt forest countryside mountains sea alien ship coast wilderness desert " },
            { "name":"tent roof", "heft":0, "cos":p+"transparent.png ", "for":" tent " },
            { "name":"rocks", "heft":0, "cos":p+"transparent.png ", "for":" caveClimb " }
         );
      }
      function addFloors() {p="i\\floor\\";
         pushMany(db.floors, "floor", "", " lounge kitchen bedroom bathroom castle workshop ", 39, 0);
         pushMany(db.floors, "tunnel floor", "tunnel\\", " tunnel ", 23, 0);
         pushMany(db.floors, "grass", "grass\\", " village forest ", 10, 0);
         pushMany(db.floors, "ground", "mountains\\", " mountains ", 13, 0);
         pushMany(db.floors, "ground", "stones\\", " countryside ", 11, 0);
         pushMany(db.floors, "ground", "town\\", " town city govt ", 28, 0);
         db.floors.push(
            { "name":"floor", "heft":0, "cos":p+"transparent.png", "for":" alien tent ship coast wilderness desert cave caveClimb " },
            { "name":"sea", "heft":0, "cos":p+"seaAnimated.gif", "for":" sea " }
         );
      }
      function addWallObjs() {p="i\\wallObj\\";
         pushMany(db.wallObjs, "nothing", "transparent\\", " forest village countryside town city govt tent alien wilderness desert tunnel caveClimb ", 5, 0); // empty:multiple copies create occasional spaces
         pushMany(db.wallObjs, "rock fragments", "cave-breccia\\", " cave ", 13, 3, 1, " faint ");
         pushMany(db.wallObjs, "cave painting", "cave-painting\\", " cave ", 12, 0, 1, " faint ");
         pushMany(db.wallObjs, "stalactite", "cave-stalactite\\", " cave ", 29, 3, 2.5, " fromCeiling fixedRatio ");// heightScale, notes
         pushMany(db.wallObjs, "crystals", "cave-crystal\\", " cave ", 27, 2, 1, " faint ");
         pushMany(db.wallObjs, "rock fault", "cave-fault\\", " cave ", 9, 0, 1, " faint ");
         pushMany(db.wallObjs, "fossil", "cave-fossil\\", " cave ", 18, 3, 1, " faint ");
         pushMany(db.wallObjs, "hand painting", "cave-painting-hand\\", " cave ship ", 10, 0, 1, " faint ");
         pushMany(db.wallObjs, "exposed rock", "cave-igneous-dyke\\", " cave ", 11, 4, 1, " faint "); // igneous dyke = volcanic dyke (rock intrusion)
         pushMany(db.wallObjs, "sediment layers", "cave-layers\\", " cave ", 9, 0, 1, " faint "); // sediment layers = "bedding"
         pushMany(db.wallObjs, "rock seam", "cave-seam\\", " cave ", 11, 4);
         pushMany(db.wallObjs, "clock", "clock\\", " lounge ", 3, 1);
         pushMany(db.wallObjs, "cloud", "cloud\\", " sea mountains coast ", 74, 0, 1.8, " fromCeiling ");
         pushMany(db.wallObjs, "hooks", "hook\\", " lounge bathroom kitchen ship ", 3, -1, 0.5, " fixTopAt40% ");
         pushMany(db.wallObjs, "light", "light\\", " lounge bedroom ", 19, -1, 1, " fromCeiling ");
         pushMany(db.wallObjs, "paneling", "panel\\", " bedroom ", 5, 3);
         pushMany(db.wallObjs, "painting", "painting\\", " lounge ", 62, 2);
         pushMany(db.wallObjs, "water stain", "stain\\", " cave ship ", 10, 0, 1, " faint ");
         pushMany(db.wallObjs, "tapestry", "tapestry\\", " castle ", 3, 2);
         pushMany(db.wallObjs, "wall design", "wall-design\\", " castle ", 11, -2);
         pushMany(db.wallObjs, "window", "window\\", " lounge kitchen ", 28, -3, 1.8, " window ");
         pushMany(db.wallObjs, "arched window", "window-arched\\", " castle ", 13, -3); // pushMany(db,name,forScenes,howMany,heft,scale,notes
         pushMany(db.wallObjs, "fissure", "cave-climbUp\\", " cave ", 23, 0, 1, " notRandom clickCutScene^climbUpCave2 "); // like clickCutScene^climbDownCave2
         pushMany(db.wallObjs, "fissure", "cave-climbUp\\", " cave ", 14, 0, 1, " notRandom clickCutScene^climbUpCave4 ");// different totals for fakeRandom
         pushMany(db.wallObjs, "fissure", "cave-climbUp\\", " cave ", 12, 0, 1, " notRandom clickCutScene^climbUpCave6 ");
         pushMany(db.wallObjs, "fissure", "cave-climbUp\\", " cave ", 10, 0, 1, " notRandom clickCutScene^climbUpCave100 ");
         db.wallObjs.push(
            { "name":"towel", "heft":1, "cos":p+"bathroom\\towel.png", "fixedTop":"50%", "for":" bathroom " },
            // cave
            { "name":"hole", "heft":0, "cos":p+"cave\\caveHole1.png", "for":" cave " },
            { "name":"hole", "heft":0, "cos":p+"cave\\caveHole2.png", "for":" cave " },
            { "name":"hole", "heft":0, "cos":p+"cave\\caveHole3.png", "for":" cave " },
            { "name":"cave popcorn", "heft":2, "cos":p+"cave\\cavePopcorn1.png", "for":" cave " }, // popcorn = balls of calcium
            { "name":"cave popcorn", "heft":2, "cos":p+"cave\\cavePopcorn2.png", "for":" cave " },
            { "name":"cave popcorn", "heft":2, "cos":p+"cave\\cavePopcorn3.png", "for":" cave " },
            { "name":"cave popcorn", "heft":2, "cos":p+"cave\\cavePopcorn4.png", "for":" cave " },
            { "name":"damaged wall", "heft":3, "cos":p+"cave\\wallDamage.png", "for":" cave " },
            { "name":"spider", "heft":1.5, "cos":p+"cave\\spider.png", "for":" cave " },
            { "name":"spiders", "heft":1.5, "cos":p+"cave\\spiders.png", "for":" cave " },
            //church
            { "name":"bell", "heft":1, "cos":p+"church\\bell.png", "for":" church " },
            { "name":"hymns", "heft":1, "cos":p+"church\\hymns1.png", "for":" church " },
            { "name":"hymns", "heft":1, "cos":p+"church\\hymns2.png", "for":" church " },
            //exotic
            { "name":"antlers", "heft":2, "cos":p+"exotic\\antlers.png", "for":" castle " },
            { "name":"cloth", "heft":1, "cos":p+"exotic\\cloth.png", "for":" castle " },
            { "name":"disc", "heft":2, "cos":p+"exotic\\disc1.png", "for":" castle " },
            { "name":"disc", "heft":2, "cos":p+"exotic\\disc2.png", "for":" castle " },
            //light
            { "name":"candle", "heft":1, "cos":p+"light\\candle.png", "notes":" fromCeiling fixedRatio ", "for":" lounge bathroom " },// candle
            { "name":"oil lamp", "heft":1, "cos":p+"light\\oil-lamp1.png", "notes":" fromCeiling ", "for":" lounge bathroom " },
            { "name":"oil lamp", "heft":1, "cos":p+"light\\oil-lamp2.png", "notes":" fromCeiling ", "for":" lounge bathroom " },
            //painting
            { "name":"American Gothic, by Wood", "heft":1, "cos":p+"painting\\American-Gothic-by-Wood.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Arabs Crossing the Desert, by Gerome", "heft":1, "cos":p+"painting\\Arabs-Crossing-the-Desert-by-Gerome.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Bedroom in Arles, by Van Gogh", "heft":1, "cos":p+"painting\\Bedroom-in-Arles-by-Van-Gogh.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Blue Boy, by Gainsborough", "heft":1, "cos":p+"painting\\Blue-Boy-by-Gainsborough.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Boat Building near Flatford Mill, by Constable", "heft":1, "cos":p+"painting\\Boat-Building-near-Flatford.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Cardsharps, by Caravaggio", "heft":1, "cos":p+"painting\\Cardsharps-by-Caravaggio.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Charles I, by Van Dyck", "heft":1, "cos":p+"painting\\Charles-I-by-Van-Dyck.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Chinese Girl, by Tretchikoff", "heft":1, "cos":p+"painting\\Chinese-Girl-by-Tretchikoff.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Comtesse d Haussonville, by Ingres", "heft":1, "cos":p+"painting\\Comtesse-d-Haussonville-by-Ingres.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Dance at Bougival, by Renoir", "heft":1, "cos":p+"painting\\Dance-at-Bougival-by-Renoir.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Death of Morat, by David", "heft":1, "cos":p+"painting\\Death-of-Morat-by-David.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Diogenes, by Gerome", "heft":1, "cos":p+"painting\\Diogenes-by-Gerome.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Don Gabriel de la Cueva Count of Albuquerque, by Moroni", "heft":1, "cos":p+"painting\\Don-Gabriel.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Flaming June, by Leighton", "heft":1, "cos":p+"painting\\Flaming-June-by-Leighton.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Girl With a Pearl Earring, by Vermeer", "heft":1, "cos":p+"painting\\Girl-With-a-Pearl-Earring-by-Vermeer.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"God Speed, by Leighton", "heft":1, "cos":p+"painting\\God-Speed-by-Leighton.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Grand Canal Near the Campo San Vio, by Canaletto", "heft":1, "cos":p+"painting\\Grand-Canal.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Hatsuhana doing penance under the Tonosawa waterfall, by Kuniyoshi", "heft":1, "cos":p+"painting\\Hatsuhana.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Hunters in the Snow, by Brueghel", "heft":1, "cos":p+"painting\\Hunters-in-the-Snow-by-Brueghel.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"illpg_021_lg", "heft":1, "cos":p+"painting\\illpg_021_lg.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Island of the Dead, by Boecklin", "heft":1, "cos":p+"painting\\Island-of-the-Dead-by-Boecklin.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Lady With a Unicorn, by Raphael", "heft":1, "cos":p+"painting\\Lady-With-a-Unicorn-by-Raphael.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Liberty Leading the People, by Delacroix", "heft":1, "cos":p+"painting\\Liberty-Leading-the-People.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Mona Lisa, by DaVinci", "heft":1, "cos":p+"painting\\Mona-Lisa-by-DaVinci.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Mt Fuji, by Hokusai", "heft":1, "cos":p+"painting\\Mt-Fuji-by-Hokusai.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Napoleon I on the Imperial Throne, by Ingres", "heft":1, "cos":p+"painting\\Napoleon-I-on-the-Imperial-Throne.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Napoleon Crossing the Alps, by David", "heft":1, "cos":p+"painting\\Napoleon-Crossing-the-Alps-by-David.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Off, by Leighton", "heft":1, "cos":p+"painting\\Off-by-Leighton.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Old Jew With the Boy, by Picasso", "heft":1, "cos":p+"painting\\Old-Jew-With-the-Boy-by-Picasso.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Ossian Receiving the Spirits of the French Heroes, by Trioson", "heft":1, "cos":p+"painting\\Ossian.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Paris Street In Rainy Weather, by Caillebotte", "heft":1, "cos":p+"painting\\Paris-Street.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Pelt Merchant of Cairo, by Gerome", "heft":1, "cos":p+"painting\\Pelt-Merchant-of-Cairo-by-Gerome.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Philip IV of Spain, by Velazquez", "heft":1, "cos":p+"painting\\Philip-IV-of-Spain-by-Velazquez.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Pollice Verso, by Gerome", "heft":1, "cos":p+"painting\\Pollice-Verso-by-Gerome.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Polyphemus, by Gerome", "heft":1, "cos":p+"painting\\Polyphemus-by-Gerome.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Portrait of Sir Richard Arkwright, by Derby", "heft":1, "cos":p+"painting\\Portrait-of-Sir-Richard.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Portrait of a Gentleman Skating, by Stuart", "heft":1, "cos":p+"painting\\Portrait-of-a-Gentleman-Skating.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Portrait of a Young Man, by Raphael", "heft":1, "cos":p+"painting\\Portrait-of-a-Young-Man-by-Raphael.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Portrait of Mari Clasen, by Egedius", "heft":1, "cos":p+"painting\\Portrait-of-Mari-Clasen-by-Egedius.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"praying hands, by Durer", "heft":1, "cos":p+"painting\\praying-hands-by-Durer.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Saint Francis of Assisi in Ecstasy, by Caravaggio", "heft":1, "cos":p+"painting\\Saint-Francis.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Saturn Devouring His Son, by Goya", "heft":1, "cos":p+"painting\\Saturn-Devouring-His-Son-by-Goya.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"self portrait, by Durer", "heft":1, "cos":p+"painting\\self-portrait-by-Durer.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"self portrait, by Goya", "heft":1, "cos":p+"painting\\self-portrait-by-Goya.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Self Portrait, by Van Gogh", "heft":1, "cos":p+"painting\\Self-Portrait-by-Van-Gogh.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Sick Bacchus, by Caravaggio", "heft":1, "cos":p+"painting\\Sick-Bacchus-by-Caravaggio.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"St John the Baptist, by DaVinci", "heft":1, "cos":p+"painting\\St-John-the-Baptist-by-DaVinci.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Summer, by Gunnar Berndtson", "heft":1, "cos":p+"painting\\Summer-by-Gunnar-Berndtson.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Tama, by Hokusai", "heft":1, "cos":p+"painting\\Tama-by-Hokusai.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"The Allegory of Simulation, by Pitti", "heft":1, "cos":p+"painting\\The-Allegory-of-Simulation-by-Pitti.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"The Execution of Lady Jane Grey, by Delaroche", "heft":1, "cos":p+"painting\\The-Execution-of-Lady-Jane-Grey.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"The Sea of Ice, by Friedrich", "heft":1, "cos":p+"painting\\The-Sea-of-Ice-by-Friedrich.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"The Shepherdess, by Bouguereau", "heft":1, "cos":p+"painting\\The-Shepherdess-by-Bouguereau.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"The Stages of Life, by Friedrich", "heft":1, "cos":p+"painting\\The-Stages-of-Life-by-Friedrich.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"The Three Whites, by Hokusai", "heft":1, "cos":p+"painting\\The-Three-Whites-by-Hokusai.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"The Titans Goblet, by Cole", "heft":1, "cos":p+"painting\\The-Titans-Goblet-by-Cole.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"The Ambassadors, by Holbein", "heft":1, "cos":p+"painting\\The-Ambassadors-by-Holbein.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"The Arnolfini Portrait, by vanEyck", "heft":1, "cos":p+"painting\\The-Arnolfini-Portrait-by-vanEyck.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"The Astronomer, by Vermeer", "heft":1, "cos":p+"painting\\The-Astronomer-by-Vermeer.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"The Bar At The Folies Bergere, by Manet", "heft":1, "cos":p+"painting\\The-Bar-At-The-Folies-Bergere-by-Manet.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"The Birth of Venus, by Botticelli", "heft":1, "cos":p+"painting\\The-Birth-of-Venus-by-Botticelli.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"The Boat Trip, by Cassatt", "heft":1, "cos":p+"painting\\The-Boat-Trip-by-Cassatt.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"The Broken Pitcher, by Bouguereau", "heft":1, "cos":p+"painting\\The-Broken-Pitcher-by-Bouguereau.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"The Creation of Adam, by Michelangelo", "heft":1, "cos":p+"painting\\The-Creation-of-Adam-by-Michelangelo-.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"The Fortune Teller, by deLaTour", "heft":1, "cos":p+"painting\\The-Fortune-Teller-by-deLaTour.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"The Fountain of Vaucluse, by Cole", "heft":1, "cos":p+"painting\\The-Fountain-of-Vaucluse-by-Cole.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"The Gleaners, by Millet", "heft":1, "cos":p+"painting\\The-Gleaners-by-Millet.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"The Great Wave Off Kanagawa, by Hokusai", "heft":1, "cos":p+"painting\\The-Great-Wave-Off-Kanagawa-by-Hokusai.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"The Kiss, by Hayez", "heft":1, "cos":p+"painting\\The-Kiss-by-Hayez.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"The Ladies Waldegrave, by Reynolds", "heft":1, "cos":p+"painting\\The-Ladies-Waldegrave-by-Reynolds.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"The Lady of Shalott, by Waterhouse", "heft":1, "cos":p+"painting\\The-Lady-of-Shalott-by-Waterhouse.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"The Laughing Cavalier, by Hals", "heft":1, "cos":p+"painting\\The-Laughing-Cavalier-by-Hals.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"The Milkmaid, by Vermeer", "heft":1, "cos":p+"painting\\The-Milkmaid-by-Vermeer.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"The Oath Of Horatii, by David", "heft":1, "cos":p+"painting\\The-Oath-Of-Horatii-by-David.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"The Persistence of Memory, by Dali", "heft":1, "cos":p+"painting\\The-Persistence-of-Memory-by-Dali.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"The Princess Sabra Led to the Dragon, by Burne Jones", "heft":1, "cos":p+"painting\\The-Princess-Sabra.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"The Scream, by Munch", "heft":1, "cos":p+"painting\\The-Scream-by-Munch.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"The Sleeping Gypsy, by Rousseau", "heft":1, "cos":p+"painting\\The-Sleeping-Gypsy-by-Rousseau.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"The Tower Of Babel, by Bruegel", "heft":1, "cos":p+"painting\\The-Tower-Of-Babel-by-Bruegel.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"The Triumph Of Galatea, by Raphael", "heft":1, "cos":p+"painting\\The-Triumph-Of-Galatea-by-Raphael.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Wanderer Above the Sea of Fog, by Friedrich", "heft":1, "cos":p+"painting\\Wanderer-Above-the-Sea-of-Fog.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Washington Crossing the Delaware, by Leutze", "heft":1, "cos":p+"painting\\Washington.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Whistlers Mother, by Whistler", "heft":1, "cos":p+"painting\\Whistlers-Mother-by-Whistler.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            { "name":"Young Girl in a Straw Hat, by Renoir", "heft":1, "cos":p+"painting\\Young-Girl-in-a-Straw-Hat-by-Renoir.png", "notes":" painting ", "toSay":"", "for":" lounge " },
            //wall-weapon
            { "name":"axes", "heft":1, "cos":p+"wall-weapon\\axes.png", "for":" castle " },
            { "name":"bow", "heft":1, "cos":p+"wall-weapon\\bow1.png", "for":" castle ship ", "heightScale":2, "notes":" fixedRatio " },
            { "name":"bow", "heft":1, "cos":p+"wall-weapon\\bow2.png", "for":" castle ship ", "heightScale":2, "notes":" fixedRatio " },
            { "name":"crossbow", "heft":1, "cos":p+"wall-weapon\\crossbow.png", "for":" castle ship " },
            { "name":"helmet", "heft":1, "cos":p+"wall-weapon\\helmet1.png", "for":" castle " },
            { "name":"helmet", "heft":1, "cos":p+"wall-weapon\\helmet2.png", "for":" castle " },
            { "name":"musket", "heft":1, "cos":p+"wall-weapon\\musket.png", "for":" castle " },
            { "name":"pike", "heft":1, "cos":p+"wall-weapon\\pike.png", "for":" castle ship ", "heightScale":2, "notes":" fixedRatio " },
            { "name":"pistol", "heft":1, "cos":p+"wall-weapon\\pistol.png", "for":" castle " },
            { "name":"shield", "heft":1, "cos":p+"wall-weapon\\shield1.png", "for":" castle ship " },
            { "name":"shield", "heft":1, "cos":p+"wall-weapon\\shield2.png", "for":" castle ship " },
            { "name":"shields", "heft":1, "cos":p+"wall-weapon\\shields.png", "for":" castle ship " },
            { "name":"sword", "heft":1, "cos":p+"wall-weapon\\sword1.png", "for":" castle ", "heightScale":2, "notes":" fixedRatio " },
            { "name":"sword", "heft":1, "cos":p+"wall-weapon\\sword2.png", "for":" castle ", "heightScale":2, "notes":" fixedRatio " },
            { "name":"sword", "heft":1, "cos":p+"wall-weapon\\sword3.png", "for":" castle " },
            { "name":"swords", "heft":1, "cos":p+"wall-weapon\\swords.png", "for":" castle " },
            { "name":"weapons", "heft":1, "cos":p+"wall-weapon\\weapons1.png", "for":" castle " },
            { "name":"weapons", "heft":1, "cos":p+"wall-weapon\\weapons2.png", "for":" castle " },
            //window
            { "name":"round window", "notes":" window ", "heft":1, "cos":p+"window\\round-window.png", "for":" castle ship " },
            // wall monster
            { "name":"scorpion creature", "heft":0, "cos":p+"monster/scorpion.png", "for":" cave ", "heightScale":3.5, "notes":" monster fixedRatio  onRoomEnterCutScene^scorpionAttack " }
         );
      }
      function addDoorLefts() {p="i\\doorLeft\\";
         pushMany(db.doorLefts, "door", "", " lounge kitchen bedroom bathroom ", 39, -3);
         pushMany(db.doorLefts, "coastline", "coast-country\\", " coast ", 22, 0);
         pushMany(db.doorLefts, "coastline", "coast-town\\", " coast ", 27, 0, 1, " built-up "); // "objType" "built-up" = not for desert island
         pushMany(db.doorLefts, "fence", "fence\\", " countryside ", 7, 3);
         pushMany(db.doorLefts, "next field", "field-edge\\", " countryside ", 1, 0);
         pushMany(db.doorLefts, "hedge", "hedge\\", " countryside ", 3, 3);
         pushMany(db.doorLefts, "rocks", "in-cave\\", " cave ", 79, 3);
         pushMany(db.doorLefts, "street corner", "house\\", " village town city govt ", 49, 0);
         pushMany(db.doorLefts, "mountain", "mountains\\", " mountains ", 20, 5);
         pushMany(db.doorLefts, "pillar", "pillar\\", " castle church ", 13, 4);
         pushMany(db.doorLefts, "roots", "roots\\", " forest ", 12, -3);
         pushMany(db.doorLefts, "tree", "tree-edge\\", " forest ", 63, -4);
         pushMany(db.doorLefts, "small tree", "tree-small\\", " countryside ", 5, -3);
         pushMany(db.doorLefts, "other tunnel", "tunnel\\", " tunnel ", 52, 0);
         pushMany(db.doorLefts, "undergrowth", "undergrowth\\", " countryside ", 27, 2);
         pushMany(db.doorLefts, "wall", "wall\\", " countryside ", 4, -3);
         db.doorLefts.push(
            { "name":"", "heft":0, "cos":p+"transparentDoorLeft.png", "for":" alien tent ship wilderness desert cave caveClimb " },
            { "name":"more sea", "heft":0, "cos":p+"transparentDoorLeft.png", "for":" sea " }
      );
      }
      function addDoors() {p="i\\door\\";
         // "govt" is handled by "notes" // because the left side must mirror the right
         pushMany(db.doors, "door", "", " lounge kitchen bathroom bedroom ", 96, -3);
         pushMany(db.doors, "archway", "arch\\", " castle ", 36, -3);
         //pushMany(db.doors,"another cave","cave\\",      " cave ", 109,0);
         pushMany(db.doors, "country road", "countryside\\", " countryside ", 49, 0);
         pushMany(db.doors, "nice looking door", "exotic\\", " castle ", 4, -3);
         pushMany(db.doors, "forest path", "forest\\", " forest ", 37, 0);
         pushMany(db.doors, "mountain path", "mountains\\", " mountains ", 32, 0);
         pushMany(db.doors, "street", "street\\", " town city ", 40, 0);
         pushMany(db.doors, "other tunnel", "tunnel\\", " tunnel ", 43, 0);
         pushMany(db.doors, "village street", "village\\", " village ", 36, 0);
         db.doors.push(
            { "name":"", "heft":0, "cos":p+"transparentDoor.png", "for":" alien tent ship coast wilderness desert cave caveClimb " },
            { "name":"more sea", "heft":0, "cos":p+"transparentDoor.png", "for":" sea " }
         );
      }
      function addFloorObjs() {p="i\\floorObj\\";
         //pushMany: name, cosPath, forScenes, highestNumber, heightScale,notes});
         pushMany(db.floorObjs, "sea", "transparent\\", " sea coast wilderness desert ", 5, 0); // coast ALSO has piers
         pushMany(db.floorObjs, "Aztec statue", "statue-Aztec\\", " castle ", 7, 3);
         pushMany(db.floorObjs, "strange growth", "alien\\", " alien ", 70, 2, 2);
         pushMany(db.floorObjs, "barrel", "barrel\\", " lounge tent ship ", 2, 3);
         pushMany(db.floorObjs, "bed", "bed\\", " bedroom ", 8, 3, 1, " bigWide "); // heightScale, notes
         pushMany(db.floorObjs, "bath", "bath\\", " bathroom ", 9, -3, 1, " bigWide fixedRatio "); // bigWide can ONLY be in position floorObj2
         pushMany(db.floorObjs, "clothes basket", "basket-clothes\\", " bathroom ", 9, 2, 1.1);
         pushMany(db.floorObjs, "chair", "chair-any\\", " lounge kitchen bedroom ", 22, 3, 1);
         pushMany(db.floorObjs, "chair", "chair-old\\", " lounge kitchen bedroom ", 9, 3, 1);
         pushMany(db.floorObjs, "chair", "chair-lounge\\", " lounge ", 15, 3, 1);
         pushMany(db.floorObjs, "chest", "chest\\", " lounge castle tent ship ", 16, 3, 1, " bigWide ");
         pushMany(db.floorObjs, "clock", "clock\\", " lounge ", 2, 3, 2.6);
         pushMany(db.floorObjs, "cooker", "cooker\\", " kitchen ", 8, 3, 3.7);
         pushMany(db.floorObjs, "couch", "couch\\", " lounge bedroom ", 7, 3, 1, " bigWide ");
         pushMany(db.floorObjs, "cupboard", "cupboard\\", " lounge kitchen bedroom ", 9, 3, 1.7, " bigWide ");
         pushMany(db.floorObjs, "desk", "desk\\", " lounge bedroom ", 9, 3, 1.5, " bigWide ");
         pushMany(db.floorObjs, "dresser", "dresser\\", " bedroom ", 15, 3, 1.5, " bigWide ");
         pushMany(db.floorObjs, "fireplace", "fireplace\\", " lounge kitchen ", 20, -3, 1.7, " bigWide ");
         pushMany(db.floorObjs, "grave", "grave\\", " village ", 12, 3, 0.7);
         pushMany(db.floorObjs, "giant mushroom", "mushroom\\", " alien ", 43, 3, 2);
         pushMany(db.floorObjs, "house", "house-city\\", " city ", 73, 4, 1.0, " house ");
         pushMany(db.floorObjs, "large house", "house-rich-far\\", " town ", 8, 4, 0.7, " house ");
         pushMany(db.floorObjs, "large house", "house-rich-far-low-wide\\", " town ", 30, 4, 1, " house ");
         pushMany(db.floorObjs, "large house", "house-rich-mid\\", " town ", 1, 4, 0.7, " house ");
         pushMany(db.floorObjs, "large house", "house-rich-mid-low-wide\\", " town ", 3, 4);
         pushMany(db.floorObjs, "shop", "house-shop\\", " city ", 1, 4, 1.5, " house ");
         pushMany(db.floorObjs, "shop", "house-shop-mid\\", " city ", 7, 4, 1.5, " house ");
         pushMany(db.floorObjs, "shop", "house-shop-far\\", " city ", 3, 4, 1.5, " house ");
         pushMany(db.floorObjs, "house", "house-town\\", " town ", 14, 4, 0.7, " house ");
         pushMany(db.floorObjs, "house", "house-town-far\\", " town ", 1, 4, 0.7, " house ");
         pushMany(db.floorObjs, "house", "house-town-mid\\", " town ", 10, 4, 0.8, " house ");
         pushMany(db.floorObjs, "house", "house-village\\", " village ", 33, 4, 1.0, " house ");
         pushMany(db.floorObjs, "house", "house-village-far\\", " village ", 2, 4, 1.6, " house ");
         pushMany(db.floorObjs, "house", "house-village-mid\\", " village ", 13, 4, 1.6, " house ");
         pushMany(db.floorObjs, "inn", "house-inn-mid\\", " town ", 2, 4, 1.0, " house ");
         pushMany(db.floorObjs, "mirror", "mirror\\", " lounge bedroom ", 2, 2, 1.5);
         pushMany(db.floorObjs, "monument", "monument\\", " village town ", 6, -3, 2.0);
         pushMany(db.floorObjs, "ornament", "ornament\\", " lounge ", 16, 1, 1.2);
         pushMany(db.floorObjs, "pier", "pier\\", " coast ", 28, 4, 1.7, " built-up "); // "objType" "built-up" = not for desert island
         pushMany(db.floorObjs, "pillar", "pillar\\", " workshop church castle ", 6, -3, 3.3);
         pushMany(db.floorObjs, "plant", "plant\\", " lounge ", 24, 2);
         pushMany(db.floorObjs, "rock", "cave-rock\\", " cave ", 46, 2);
         pushMany(db.floorObjs, "rocks", "rock\\", " countryside ", 38, 3, 0.3);
         pushMany(db.floorObjs, "stalagmite", "cave-stalagmite\\", " cave ", 3, -2, 1.5, " fixedRatio ");
         pushMany(db.floorObjs, "sink", "sink\\", " kitchen workshop ", 1, -3);
         pushMany(db.floorObjs, "statue", "statue-small\\", " castle ", 7, -3, 2.0);
         pushMany(db.floorObjs, "toilet", "toilet\\", " bathroom ", 10, -3, 1.6);
         pushMany(db.floorObjs, "towel rail", "towel-rail\\", " bathroom ", 9, -2, 1.5);
         pushMany(db.floorObjs, "tree", "tree\\", " village forest countryside ", 31, -3, 1, " fromCeiling ");
         pushMany(db.floorObjs, "wash basin", "wash-basin\\", " bathroom ", 9, -3, 1.5);
         db.floorObjs.push(
            { "name":"", "heft":0, "cos":p+"transparent\\0.png", "for":" wilderness desert tunnel mountains caveClimb " },
            //bathroom
            { "name":"toilet stand", "heft":3, "cos":p+"bathroom\\toilet-stand1.png", "heightScale":1.5, "for":" bathroom " },
            { "name":"toilet stand", "heft":3, "cos":p+"bathroom\\toilet-stand2.png", "toSay":"reads OK", "heightScale":1.5, "for":" bathroom " },
            //church
            { "name":"lecturn", "heft":3, "cos":p+"church\\lecturn1.png", "heightScale":1.4, "for":" church " },
            { "name":"pulpit", "heft":3, "cos":p+"church\\pulpit1.png", "for":" church " },
            //container
            { "name":"churn", "heft":2, "cos":p+"container\\churn.png", "for":" lounge tent ship " },
            { "name":"sack", "heft":2, "cos":p+"container\\sack.png", "for":" lounge tent ship " },
            { "name":"sacks", "heft":2, "cos":p+"container\\sacks.png", "for":" lounge tent ship " },
            { "name":"tub", "heft":2, "cos":p+"container\\tub.png", "for":" lounge tent ship " },
            //exotic
            { "name":"Assyrian statue", "heft":3, "cos":p+"exotic\\Assyrian-statue.png", "for":" castle ", "heightScale":1.7 },
            { "name":"cylinder seal", "heft":1, "cos":p+"exotic\\cylinder-seal.png", "for":" castle " },
            { "name":"double-bass", "heft":2, "cos":p+"music\\double-bass.png", "for":" castle ", "heightScale":2 },
            { "name":"Egyptian statue", "heft":3, "cos":p+"exotic\\Egyptian-statue.png", "for":" castle ", "heightScale":3 },
            { "name":"font", "heft":-3, "cos":p+"exotic\\font.png", "for":" castle " },
            { "name":"litter", "heft":3, "cos":p+"exotic\\litter.png", "for":" castle ", "heightScale":1.7 },
            { "name":"Mayan statue", "heft":3, "cos":p+"exotic\\Mayan-statue.png", "for":" castle ", "heightScale":3 },
            { "name":"mummy case", "heft":3, "cos":p+"exotic\\mummy-case1.png", "for":" castle ", "heightScale":2.3 },
            { "name":"mummy case", "heft":3, "cos":p+"exotic\\mummy-case2.png", "for":" castle " },
            { "name":"Roman statue", "heft":3, "cos":p+"exotic\\Roman-statue.png", "for":" castle ", "heightScale":3 },
            { "name":"sphinx", "heft":3, "cos":p+"exotic\\sphinx.png", "for":" castle ", "heightScale":2.7 },
            { "name":"the Ark of the Covenant", "heft":3, "cos":p+"exotic\\ark-of-covenant.png", "for":" castle ", "heightScale":1.7 },
            //fireplace
            { "name":"coal-bucket", "heft":1, "cos":p+"fireplace\\coal-bucket.png", "heightScale":0.7, "for":" lounge kitchen ship " },
            { "name":"irons", "heft":1, "cos":p+"fireplace\\irons.png", "for":" lounge ship " },
            //furniture (misc)
            { "name":"chalkboard", "heft":2, "cos":p+"furniture\\chalkboard.png", "heightScale":1.7 },
            { "name":"globe", "heft":2, "cos":p+"furniture\\globe1.png", "heightScale":1.5, "for":" lounge ship " },
            { "name":"globe", "heft":2, "cos":p+"furniture\\globe2.png", "heightScale":1.5, "for":" lounge ship " },
            { "name":"organ", "heft":3, "cos":p+"furniture\\organ.png", "heightScale":1.5, "for":" lounge ", "notes":"bigWide" },
            { "name":"grand piano", "heft":3, "cos":p+"furniture\\piano-grand.png", "heightScale":1.7, "for":" lounge ", "notes":"bigWide" },
            { "name":"upright piano", "heft":3, "cos":p+"furniture\\piano-upright.png", "heightScale":1.7, "for":" lounge ", "notes":"bigWide" },
            { "name":"radiator", "heft":-3, "cos":p+"furniture\\radiator.png", "for":" lounge bathroom bedroom" },
            { "name":"safe", "heft":3, "cos":p+"furniture\\safe.png", "for":" lounge " },
            //kitchen
            { "name":"ironing-board", "heft":2, "cos":p+"kitchen\\ironing-board.png", "heightScale":1.7, "for":" kitchen " },
            //machine
            { "name":"dynamo", "heft":2, "cos":p+"machine\\dynamo.png", "for":" workshop ", "heightScale":2, "notes":"bigWide" },
            { "name":"press", "heft":3, "cos":p+"machine\\press.png", "for":" workshop ", "heightScale":2 },
            { "name":"printer", "heft":3, "cos":p+"machine\\printer.png", "for":" workshop ", "heightScale":2 },
            { "name":"puller", "heft":3, "cos":p+"machine\\puller.png", "for":" workshop ", "heightScale":2 },
            { "name":"sewing machine", "heft":2, "cos":p+"machine\\sewing-machine.png", "for":" workshop ", "for":" kitchen " },
            { "name":"spinning wheel", "heft":2, "cos":p+"machine\\spinning-wheel.png", "for":" workshop ", "for":" kitchen " },
            { "name":"spinning", "heft":2, "cos":p+"machine\\spinning.png", "for":" workshop ", "for":" kitchen ", "notes":"bigWide" },
            { "name":"steam hammer", "heft":3, "cos":p+"machine\\steam-hammer.png", "for":" workshop ", "heightScale":3, "notes":"bigWide" },
            //statue
            { "name":"statue of Alexander The Great", "heft":3, "cos":p+"statue\\Alexander-the-Great.png", "for":" castle " },
            { "name":"statue of Ambiorix", "heft":3, "cos":p+"statue\\Ambiorix.png", "for":" castle " },
            { "name":"statue of Antonino Pio", "heft":3, "cos":p+"statue\\Antonino Pio.png", "for":" castle " },
            { "name":"statue of Asklepios", "heft":3, "cos":p+"statue\\Asklepios.png", "for":" castle " },
            { "name":"statue of Avalokitesvara", "heft":3, "cos":p+"statue\\Avalokitesvara.png", "for":" castle " },
            { "name":"statue of a badger", "heft":3, "cos":p+"statue\\badger.png", "for":" castle " },
            { "name":"statue of a bear", "heft":3, "cos":p+"statue\\bear.png", "for":" castle " },
            { "name":"statue of a bee", "heft":3, "cos":p+"statue\\bee.png", "for":" castle " },
            { "name":"statue of the Buddha", "heft":3, "cos":p+"statue\\Buddha.png", "for":" castle " },
            { "name":"statue of a buddhist", "heft":3, "cos":p+"statue\\buddhist.png", "for":" castle " },
            { "name":"statue of a bull", "heft":3, "cos":p+"statue\\bull.png", "for":" castle " },
            { "name":"statue of a Chinese dragon", "heft":3, "cos":p+"statue\\chinese-dragon.png", "for":" castle " },
            { "name":"statue of a Chinese lion", "heft":3, "cos":p+"statue\\chinese-lion2.png", "for":" castle " },
            { "name":"statue of a Chinese lion", "heft":3, "cos":p+"statue\\chinese-lion3.png", "for":" castle " },
            { "name":"statue of a Chinese lion", "heft":3, "cos":p+"statue\\chinese-lion.png", "for":" castle " },
            { "name":"statue of Guian Di", "heft":3, "cos":p+"statue\\chinese-statue-of-guian-di.png", "for":" castle " },
            { "name":"statue of Dionysos", "heft":3, "cos":p+"statue\\Dionysos.png", "for":" castle " },
            { "name":"statue of Dioskouros", "heft":3, "cos":p+"statue\\Dioskouros.png", "for":" castle " },
            { "name":"statue of a dog", "heft":3, "cos":p+"statue\\dog2.png", "for":" castle " },
            { "name":"statue of a dog", "heft":3, "cos":p+"statue\\dog.png", "for":" castle " },
            { "name":"statue of an Indonesian dragon", "heft":3, "cos":p+"statue\\dragon-indonesia.png", "for":" castle " },
            { "name":"statue of an eagle", "heft":3, "cos":p+"statue\\eagle2.png", "for":" castle " },
            { "name":"statue of an eagle", "heft":3, "cos":p+"statue\\eagle.png", "for":" castle " },
            { "name":"statue of an Egyptian", "heft":3, "cos":p+"statue\\Egyptian1.png", "for":" castle " },
            { "name":"statue of an Egyptian", "heft":3, "cos":p+"statue\\egyptian2.png", "for":" castle " },
            { "name":"statue of an Egyptian cat", "heft":3, "cos":p+"statue\\egyptian-cat.png", "for":" castle " },
            { "name":"statue of an Egyptian", "heft":3, "cos":p+"statue\\egyptian.png", "for":" castle " },
            { "name":"statue of an elephant", "heft":3, "cos":p+"statue\\elephant2.png", "for":" castle " },
            { "name":"statue of an elephant", "heft":3, "cos":p+"statue\\elephant.png", "for":" castle " },
            { "name":"statue of an elk", "heft":3, "cos":p+"statue\\elk.png", "for":" castle " },
            { "name":"statue of the goddess Nana of Afghanistan", "heft":3, "cos":p+"statue\\Goddess-Nana-Afghanistan.png", "for":" castle " },
            { "name":"statue of the goddess Nike", "heft":3, "cos":p+"statue\\goddess-Nike.png", "for":" castle " },
            { "name":"statue of a gorilla", "heft":3, "cos":p+"statue\\gorilla2.png", "for":" castle " },
            { "name":"statue of a griffin", "heft":3, "cos":p+"statue\\griffin.png", "for":" castle " },
            { "name":"statue of Guanyin Bodhisattva Avalokitesvara", "heft":3, "cos":p+"statue\\Guanyin-Bodhisattva-Avalokitesvara.png", "for":" castle " },
            { "name":"statue of Isabel de Braganza", "heft":3, "cos":p+"statue\\Isabel-de-Braganza.png", "for":" castle " },
            { "name":"statue of Iulia Soaemias", "heft":3, "cos":p+"statue\\Iulia-Soaemias.png", "for":" castle " },
            { "name":"statue of a lion", "heft":3, "cos":p+"statue\\lion.png", "for":" castle " },
            { "name":"statue of Livia, mother of Tiberius", "heft":3, "cos":p+"statue\\Livia-mother-of-Tiberius.png", "for":" castle " },
            { "name":"statue of Melpomene, the muse of tragedy", "heft":3, "cos":p+"statue\\Melpomene-muse-of-tragedy.png", "for":" castle " },
            { "name":"statue of a Minoan", "heft":3, "cos":p+"statue\\minoan2.png", "for":" castle " },
            { "name":"statue of a Minoan", "heft":3, "cos":p+"statue\\minoan3.png", "for":" castle " },
            { "name":"statue of a Minoan bull", "heft":3, "cos":p+"statue\\minoan-bull.png", "for":" castle " },
            { "name":"statue of a Minoan", "heft":3, "cos":p+"statue\\minoan.png", "for":" castle " },
            { "name":"statue of the Minoan snake goddess", "heft":3, "cos":p+"statue\\minoan-snake-goddess2.png", "for":" castle " },
            { "name":"statue of the Minoan snake goddess", "heft":3, "cos":p+"statue\\minoan-snake-goddess.png", "for":" castle " },
            { "name":"statue of Nicholas, count of Salm", "heft":3, "cos":p+"statue\\Nicholas-count-of-Salm.png", "for":" castle " },
            { "name":"statue of Octavia minor", "heft":3, "cos":p+"statue\\Octavia_minor.png", "for":" castle " },
            { "name":"an Olmec statue", "heft":3, "cos":p+"statue\\olmec1.png", "for":" castle " },
            { "name":"an Olmec statue", "heft":3, "cos":p+"statue\\olmec2.png", "for":" castle " },
            { "name":"statue of an own", "heft":3, "cos":p+"statue\\owl.png", "for":" castle " },
            { "name":"statue of Penelope, wife of -Odysseus", "heft":3, "cos":p+"statue\\Penelope-wife-of-Odysseus.png", "for":" castle " },
            { "name":"statue of a pharaoh", "heft":3, "cos":p+"statue\\pharaoh2.png", "for":" castle " },
            { "name":"statue of a pharaoh", "heft":3, "cos":p+"statue\\pharaoh.png", "for":" castle " },
            { "name":"statue of Psyche, abandoned", "heft":3, "cos":p+"statue\\Psyche-abandoned.png", "for":" castle " },
            { "name":"statue of a rabbit", "heft":3, "cos":p+"statue\\rabbit.png", "for":" castle " },
            { "name":"statue of Rachel, daughter of Laban", "heft":3, "cos":p+"statue\\Rachel-daughter-of-Laban.png", "for":" castle " },
            { "name":"statue of a ram", "heft":3, "cos":p+"statue\\ram.png", "for":" castle " },
            { "name":"statue of a Roman woman as Venus", "heft":3, "cos":p+"statue\\Roman-lady-as-Venus.png", "for":" castle " },
            { "name":"statue of a Roman woman", "heft":3, "cos":p+"statue\\Roman-lady.png", "for":" castle " },
            { "name":"statue of a Roman woman", "heft":3, "cos":p+"statue\\Roman_woman.png", "for":" castle " },
            { "name":"statue of a Roman woman", "heft":3, "cos":p+"statue\\Roman-woman.png", "for":" castle " },
            { "name":"statue of Sabina, a Roman woman", "heft":3, "cos":p+"statue\\Sabina-a-Roman-Woman.png", "for":" castle " },
            { "name":"statue of a satyr", "heft":3, "cos":p+"statue\\Satyr.png", "for":" castle " },
            { "name":"statue of Saint Barbara", "heft":3, "cos":p+"statue\\St_Barbara.png", "for":" castle " },
            { "name":"statue of Saint Boniface", "heft":3, "cos":p+"statue\\St_Boniface.png", "for":" castle " },
            { "name":"statue of Saint Christopher", "heft":3, "cos":p+"statue\\St_Christopher.png", "for":" castle " },
            { "name":"statue of Saint Paul", "heft":3, "cos":p+"statue\\St_Paul.png", "for":" castle " },
            { "name":"statue of a swan", "heft":3, "cos":p+"statue\\swan.png", "for":" castle " },
            { "name":"statue of Syamatara", "heft":3, "cos":p+"statue\\Syamatara.png", "for":" castle " },
            { "name":"statue of a tortoise", "heft":3, "cos":p+"statue\\tortoise.png", "for":" castle " },
            { "name":"statue of a unicorn", "heft":3, "cos":p+"statue\\unicorn.png", "for":" castle " },
            { "name":"statue of Vishnu", "heft":3, "cos":p+"statue\\Vishnu.png", "for":" castle " },
            { "name":"statue of young Hercules", "heft":3, "cos":p+"statue\\young_Hercules.png", "for":" castle " },
            // town
            { "name":"church", "heft":4, "cos":p+"town\\church1-mid.png", "for":" town ", "notes":" house school " },
            { "name":"church", "heft":4, "cos":p+"town\\church2-mid.png", "for":" town ", "notes":" house school " },
            { "name":"school", "heft":4, "cos":p+"town\\school1-far.png", "for":" town ", "notes":" house school " },
            { "name":"school", "heft":4, "cos":p+"town\\school2-mid.png", "for":" town ", "notes":" house school ", "heightScale":0.8 },
            // garden //
            //                              *********** TO DO:"offsetY" **************
            //                              so they are IN FRONT of the other objects (which are houses)
            { "name":"bucket", "heft":1, "cos":p+"garden\\bucket-close.png", "for":" village ship ", "heightScale":0.7 },
            { "name":"flowerpot", "heft":1, "cos":p+"garden\\flowerpot-close.png", "heightScale":0.6, "for":" village " },
            { "name":"lawn mower", "heft":3, "cos":p+"garden\\lawn-mower-close.png", "for":" village " },
            { "name":"sundial", "heft":3, "cos":p+"garden\\sundial-close.png", "for":" village ", "heightScale":1.7 },
            { "name":"watering can", "heft":1, "cos":p+"garden\\watering-can-close.png", "for":" village " },
            //tool
            { "name":"adz", "heft":2, "cos":p+"tool\\adz.png", "for":" workshop tent ship ", "heightScale":1.4 },
            { "name":"axe", "heft":2, "cos":p+"tool\\axe.png", "for":" workshop tent ship ", "heightScale":1.4 },
            { "name":"axe", "heft":2, "cos":p+"tool\\axe2.png", "for":" workshop tent ship ", "heightScale":1.4 },
            { "name":"fork", "heft":1, "cos":p+"tool\\fork.png", "for":" workshop ", "heightScale":1.4 },
            { "name":"hoe", "heft":1, "cos":p+"tool\\hoe.png", "for":" workshop " },
            { "name":"industrial drill", "heft":3, "cos":p+"tool\\industrial-drill.png", "for":" workshop ", "heightScale":1.4 },
            { "name":"mattock", "heft":2, "cos":p+"tool\\mattock.png", "for":" workshop tent ship " },
            { "name":"mill stone", "heft":3, "cos":p+"tool\\mill-stone.png", "for":" workshop ", "heightScale":2 },
            { "name":"pick axe", "heft":2, "cos":p+"tool\\pick-axe.png", "for":" workshop tent ship " },
            { "name":"rake", "heft":1, "cos":p+"tool\\rake.png", "for":" workshop ", "heightScale":1.4 },
            { "name":"sickle", "heft":1, "cos":p+"tool\\sickle.png", "for":" workshop " },
            { "name":"spade", "heft":1, "cos":p+"tool\\spade.png", "for":" workshop tent ship ", "heightScale":1.4 },
            //military
            { "name":"armour", "heft":2, "cos":p+"military\\armour1.png", "for":" workshop " },
            { "name":"arrows", "heft":1, "cos":p+"military\\arrows1.png", "for":" workshop " },
            { "name":"cannon", "heft":3, "cos":p+"military\\cannon1.png", "for":" workshop ship " },
            { "name":"cannon", "heft":3, "cos":p+"military\\cannon2.png", "for":" workshop ship " },
            { "name":"cannon", "heft":3, "cos":p+"military\\cannon3.png", "for":" workshop ship " },
            { "name":"cannon", "heft":3, "cos":p+"military\\cannon4.png", "for":" workshop ship " },
            { "name":"ram", "heft":3, "cos":p+"military\\ram1.png", "for":" workshop " },
            { "name":"seige tower", "heft":3, "cos":p+"military\\seige-tower.png", "for":" workshop ", "heightScale":3 },
            { "name":"spikes", "heft":1, "cos":p+"military\\spikes.png", "for":" workshop " },
            { "name":"tank", "heft":3, "cos":p+"military\\tank1.png", "for":" workshop ", "heightScale":2.5 },
            //tree-exotic
            { "name":"acrocomia palm tree", "notes":" tree ", "heft":-3, "cos":p+"tree-exotic\\acrocomiaPalm.png", "for":" forest village ", "heightScale":2.2 },
            { "name":"astrocaryum palm tree", "notes":" tree ", "heft":-3, "cos":p+"tree-exotic\\astrocaryumPalm.png", "for":" forest village ", "heightScale":2.2 },
            { "name":"banana tree", "notes":" tree ", "heft":-3, "cos":p+"tree-exotic\\banana1.png", "for":" forest village ", "heightScale":2.2 },
            { "name":"banana tree", "notes":" tree ", "heft":-3, "cos":p+"tree-exotic\\banana2.png", "for":" forest village ", "heightScale":2.2 },
            { "name":"canary date palm", "notes":" tree ", "heft":-3, "cos":p+"tree-exotic\\canaryDatePalm.png", "for":" forest village ", "heightScale":2.2 },
            { "name":"coconut tree", "notes":" tree ", "heft":-3, "cos":p+"tree-exotic\\coconut.png", "for":" forest village ", "heightScale":2.2 },
            { "name":"date tree", "notes":" tree ", "heft":-3, "cos":p+"tree-exotic\\date.png", "for":" forest village ", "heightScale":2.2 },
            { "name":"date palm", "notes":" tree ", "heft":-3, "cos":p+"tree-exotic\\datePalm.png", "for":" forest village ", "heightScale":2.2 },
            { "name":"fan palm", "notes":" tree ", "heft":-3, "cos":p+"tree-exotic\\fanPalm.png", "for":" forest village ", "heightScale":2.2 },
            { "name":"melon tree", "notes":" tree ", "heft":-3, "cos":p+"tree-exotic\\melon.png", "for":" forest village ", "heightScale":2.2 },
            { "name":"miniature cononut palm tree", "notes":" tree ", "heft":-3, "cos":p+"tree-exotic\\miniatureCoconutPalm.png", "for":" forest village ", "heightScale":2.2 },
            { "name":"palm tree", "notes":" tree ", "heft":-3, "cos":p+"tree-exotic\\palm1.png", "for":" forest village ", "heightScale":2.2 },
            { "name":"palm tree", "notes":" tree ", "heft":-3, "cos":p+"tree-exotic\\palm2.png", "for":" forest village ", "heightScale":2.2 },
            { "name":"parlour palm tree", "notes":" tree ", "heft":-3, "cos":p+"tree-exotic\\parlourPalm.png", "for":" forest village ", "heightScale":2.2 },
            { "name":"pawpaw tree", "notes":" tree ", "heft":-3, "cos":p+"tree-exotic\\pawpaw1.png", "for":" forest village ", "heightScale":2.2 },
            { "name":"pawpaw tree", "notes":" tree ", "heft":-3, "cos":p+"tree-exotic\\pawpaw2.png", "for":" forest village ", "heightScale":2.2 },
            { "name":"pawpaw tree", "notes":" tree ", "heft":-3, "cos":p+"tree-exotic\\pawpaw3.png", "for":" forest village ", "heightScale":2.2 },
            { "name":"phoenix tree", "notes":" tree ", "heft":-3, "cos":p+"tree-exotic\\phoenixPlant.png", "for":" forest village ", "heightScale":2.2 },
            { "name":"piassava palm tree", "notes":" tree ", "heft":-3, "cos":p+"tree-exotic\\piassavaPalm.png", "for":" forest village ", "heightScale":2.2 },
            { "name":"plantain tree", "notes":" tree ", "heft":-3, "cos":p+"tree-exotic\\plantain.png", "for":" forest village ", "heightScale":2.2 },
            { "name":"screwpine tree", "notes":" tree ", "heft":-3, "cos":p+"tree-exotic\\screwPine.png", "for":" forest village ", "heightScale":2.2 },
            { "name":"umbrella pine tree", "notes":" tree ", "heft":-3, "cos":p+"tree-exotic\\umbrellaPalm.png", "for":" forest village ", "heightScale":2.2 },
            //tree-northern
            { "name":"Abies Venusta tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\abiesVenusta.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"Afghan pine tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\afghanPine.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"Aleppo pine tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\aleppoPine.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"almond tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\almond.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"american lin tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\americanLin.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"aralia chinensis tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\araliaChinensis.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"araucaria tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\araucaria.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"Arizona cyprus tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\arizonaCyprus.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"ash tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\ash.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"bald cypress tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\baldCypress1.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"bald cypress tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\baldCypress2.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"bald cypress tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\baldCypress3.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"bald swamp tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\baldSwamp.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"black Tupelo tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\blackTupelo.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"bristlecone pine", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\bristleconePine.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"carya glabra tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\caryaGlabra.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"carya ovalis tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\caryaOvalis.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"common ash tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\commonAsh.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"crabapple tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\crabapple.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"crape myrtle tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\crapeMyrtle.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"cupressus tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\cupressus.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"cypress tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\cypress1.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"cypress tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\cypress2.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"dragon tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\dragonTree.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"elm tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\elm1.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"elm tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\elm2.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"Eve's Necklace tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\evesNecklace.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"golden raintree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\goldenRaintree.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"hackberry tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\hackberry.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"japanese black pine tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\japaneseBlackPine.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"Jerusalem thorn tree", "notes":" tree ", "heft":-3, "notes":["labelAbove"], "cos":p+"tree-northern\\JerusalemThorn.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"juniper tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\juniper2.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"juniper tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\juniper3.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"molle tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\molle1.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"molle tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\molle2.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"Montezuma cyprus tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\montezumaCyprus.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"Norway spruce", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\norwaySpruce.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"oak tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\oak1.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"oak tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\oak2.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"oak tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\oak3.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"oak tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\oak4.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"oak tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\oak5.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"pecan tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\pecan.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"picea excels tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\piceaExcels.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"picea smith tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\piceaSmith.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"pine tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\pine1.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"pine tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\pine2.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"rusty blackhaw tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\rustyBlackhaw.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"Scots elm tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\scotsElm.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"screw pine tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\screwPine.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"sugar maple", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\sugarMaple1.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"sugar maple", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\sugarMaple2.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"sugar maple", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\sugarMaple3.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"summer tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\summerTree.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"sycamore tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\sycamore.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"swiss pine tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\swissPine1.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"swiss pine tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\swissPine2.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"terebinth tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\terebinth1.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"terebinth tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\terebinth2.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"Texas-ebony", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\TexasEbony.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\tree1.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\tree2.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\tree3.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\tree4.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\tree5.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\tree6.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\tree7.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\tree8.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\tree9.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\tree10.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\tree11.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"ulmus scabra tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\ulmusScabra.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"umbrella tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\umbrellaTree.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"willow tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\willow1.png", "for":" village forest countryside ", "heightScale":3 },
            { "name":"willow tree", "notes":" tree ", "heft":-3, "cos":p+"tree-northern\\willow2.png", "for":" village forest countryside ", "heightScale":3 },
            // monster
            { "name":"spider creature", "heft":0, "cos":p+"monster/spider.png", "for":" cave ", "heightScale":3.0, "notes":" monster fixedRatio onRoomEnterCutScene^spiderAttack " },
            { "name":"snake creature", "heft":0, "cos":p+"monster/snake.png", "for":" cave ", "heightScale":1.8, "notes":" monster fixedRatio onRoomEnterCutScene^snakeAttack " },
            { "name":"locust creature", "heft":0, "cos":p+"monster/locust.png", "for":" cave ", "heightScale":2.3, "notes":" monster fixedRatio onRoomEnterCutScene^locustAttack " }
         );
      }
      function addTables() {p="i\\table\\";
         pushMany(db.tables, "table", "", " lounge kitchen bedroom bathroom ", 34, 3);
         pushMany(db.tables, "fallen tree", "fallen-log\\", " forest ", 13, 3);
         pushMany(db.tables, "grassy bank", "grassy-bank\\", " forest ", 1, 0);
         pushMany(db.tables, "large rock", "rock-table\\", " forest ", 16, 3);
         pushMany(db.tables, "tree stump", "tree-stump\\", " forest ", 10, -3);
         pushMany(db.tables, "rocks", "cave\\", " cave ", 39, 3, 1.2);
         pushMany(db.tables, "sea", "transparent\\", " sea coast ", 1, 0);
         pushMany(db.tables, "wall", "low-wall\\", " village ", 29, -3);
         pushMany(db.tables, "fissure", "cave-hole\\", " cave ", 7, 0, 1, " fixToBottom notRandom clickCutScene^climbDownCave2 ");
         db.tables.push(
            { "name":"nothing", "heft":0, "cos":p+"transparent\\noTable.png", "for":" countryside town city alien tent wilderness desert tunnel caveClimb " },// nothing to see
            { "name":"table", "heft":3, "cos":p+"pub-bar.png", "for":" lounge ship workshop" },
            { "name":"wooden chest", "heft":2, "cos":p+"ship-chest-table.png", "for":" lounge ship workshop" },
            { "name":"wooden chest", "heft":2, "cos":p+"ship-chest-table2.png", "for":" lounge ship workshop" },
            { "name":"wooden chest", "heft":2, "cos":p+"ship-chest-table3.png", "for":" lounge ship workshop" },
            { "name":"trestle-table", "heft":3, "cos":p+"ship-chest-table3.png", "for":" lounge ship workshop" },
            { "name":"wall", "heft":-3, "cos":p+"low-wall\\29.png", "for":" village " }
         );
      }
      function addSpecial() {
         db.special.push( // 1 = river bottom, 2= river back, 3 = castle:ORDER MATTERS!!
            { "name":"river edge", "cos":"i\\special\\river\\river-bot.gif", "notes":" river " }, // "x":0,"y":95,
            // generic river bank dialog etc. for clicking purposes:if you need specifics, add it to the story
            { "name":"river bank", "cos":"i\\special\\river\\town\\1.png" },
            // generic castle dialog etc.
            { "name":"castle", "notes":" castle house ", "cos":"i\\special\\castle\\1.png" }, // actually 37 castles

            // govt door:position 4
            { "name":"street", "notes":" govt house ", "cos":"i\\door\\govt\\0.png" }, // 0-30:"notes" has its own code
            // govt edge:position 5
            { "name":"building", "notes":" govt house ", "cos":"i\\special\\govt\\edge\\0.png" }, // 0-22
            // govt middle:position 6
            { "name":"building", "notes":" govt house ", "cos":"i\\special\\govt\\mid\\0.png" }, // 0-22

            // grass in front:position 7
            { "name":"grass", "notes":"", "cos":"i\\special\\grass\\0.png" } // 0-11
         );
      }
      function addTableObjs() {p="i\\tableObj\\";
         pushMany(db.tableObjs, "Aztec statue", "street-statue-Aztec\\", " exotic ", 7, 3, 2.4);
         pushMany(db.tableObjs, "bag", "bag\\", " lounge bedroom tent ship ", 1, 1);
         pushMany(db.tableObjs, "barrels", "street-barrel\\", " city govt tent ship ", 6, 3, 2);
         pushMany(db.tableObjs, "bin", "street-bin\\", " city govt ", 12, 3); // may need to rescale one
         pushMany(db.tableObjs, "bollard", "street-bollard\\", " city govt ship ", 6, -3);
         pushMany(db.tableObjs, "boxes", "street-boxes\\", " city govt ship ", 3, 2, 2.5);
         pushMany(db.tableObjs, "bush", "street-bush\\", " city govt ", 12, -2);
         pushMany(db.tableObjs, "books", "book\\", " lounge bedroom tent ", 6, 1, 1.5); // may need to change some in the GIMP
         pushMany(db.tableObjs, "bottle", "bottle\\", " kitchen tent ship ", 6, 1, 1.5);
         pushMany(db.tableObjs, "bowl", "bowl\\", " kitchen bedroom bathroom ", 10, 1);
         pushMany(db.tableObjs, "candelabra", "light-candelabra\\", " lounge castle ", 5, 1, 3.4);
         pushMany(db.tableObjs, "candle", "light-candle\\", " lounge bedroom kitchen bathroom castle ", 2, 1, 2.7, " fixedRatio ");
         pushMany(db.tableObjs, "cart", "street-cart\\", " city govt ", 21, 3); // may need to rescale some
         pushMany(db.tableObjs, "clock", "clock\\", " lounge bedroom ", 3, 1);
         pushMany(db.tableObjs, "cup", "cup\\", " kitchen bedroom bathroom tent ", 5, 1);
         pushMany(db.tableObjs, "flowers", "street-flowers\\", " city govt ship ", 5, 1);
         pushMany(db.tableObjs, "fountain", "street-fountain\\", " city govt ", 4, -3);
         pushMany(db.tableObjs, "goblet", "cup-goblet\\", " kitchen lounge ", 4, 1);
         pushMany(db.tableObjs, "hole in the pavement", "street-hole\\", " city govt ", 4, 0);
         pushMany(db.tableObjs, "hydrant", "street-hydrant\\", " city govt ", 5, -3);
         pushMany(db.tableObjs, "jug", "jug\\", " kitchen bedroom bathroom tent ship ", 4, 1, 1.8);
         pushMany(db.tableObjs, "junk", "street-junk\\", " city govt ", 3, 2);
         pushMany(db.tableObjs, "key", "key\\", " lounge bedroom kitchen bathroom ", 1, 1, 0.6);
         pushMany(db.tableObjs, "lamp", "light\\", " lounge bedroom kitchen ", 5, 2, 2.7, " fixedRatio ");
         pushMany(db.tableObjs, "perfume", "perfume\\", " bedroom bathroom tent ", 6, 1, 1.8);
         pushMany(db.tableObjs, "rocks", "cave-rock\\", " cave ", 34, 3);
         pushMany(db.tableObjs, "rocks", "street-rock\\", " mountains ", 34, 3, 0.3);
         pushMany(db.tableObjs, "strange growth", "alien\\", " alien ", 80, 3);
         pushMany(db.tableObjs, "street lamp", "street-lamp\\", " city govt ", 23, -3, 2.5, " fixedRatio ");
         pushMany(db.tableObjs, "tree", "street-tree\\", " city govt ", 6, -3, 2.4);
         pushMany(db.tableObjs, "urn", "urn\\", " kitchen castle ship ", 2, 2, 2);
         db.tableObjs.push(
            { "name":"sea", "heft":0, "cos":p+"transparent.png", "for":" sea coast " },
            { "name":"nothing", "heft":0, "cos":p+"transparent.png", "for":" town city wilderness desert tunnel caveClimb " }, // town:use floorObj instead
            //bathroom
            { "name":"ether", "heft":1, "cos":p+"bathroom\\ether.png", "for":" bathroom " },
            { "name":"razor", "heft":1, "cos":p+"bathroom\\razor.png", "for":" bathroom " },
            { "name":"toothbrush", "heft":1, "cos":p+"bathroom\\toothbrush.png", "for":" bathroom " },
            { "name":"tweezers", "heft":1, "cos":p+"bathroom\\tweezers.png", "for":" bathroom " },
            //bedroom
            { "name":"brush", "heft":1, "cos":p+"bedroom\\brush.png", "for":" bedroom " },
            { "name":"comb", "heft":1, "cos":p+"bedroom\\comb.png", "for":" bedroom " },
            //book
            { "name":"book", "heft":1, "cos":p+"book\\book1.png", "for":" lounge bedroom ", "heightScale":0.9 },
            { "name":"book", "heft":1, "cos":p+"book\\book2.png", "for":" lounge bedroom ", "heightScale":0.9 },
            { "name":"book", "heft":1, "cos":p+"book\\book3.png", "for":" lounge bedroom ", "heightScale":0.9 },
            { "name":"papers", "heft":1, "cos":p+"book\\papers.png", "for":" lounge bedroom ", "heightScale":1.5 },
            { "name":"scroll", "heft":1, "cos":p+"book\\scroll.png", "for":" lounge bedroom ", "heightScale":1.5 },
            { "name":"scrolls", "heft":1, "cos":p+"book\\scrolls1.png", "for":" lounge bedroom ", "heightScale":1.5 },
            { "name":"scrolls", "heft":1, "cos":p+"book\\scrolls2.png", "for":" lounge bedroom ", "heightScale":1.5 },
            //clock
            { "name":"watch", "heft":1, "cos":p+"clock\\watch1.png", "for":" lounge bedroom ", "heightScale":0.9 },
            { "name":"watch", "heft":1, "cos":p+"clock\\watch2.png", "for":" lounge bedroom ", "heightScale":0.6 },
            //tableObj\clothe
            { "name":"glove-long", "heft":1, "cos":p+"clothe\\glove-long.png", "toSay":"", "for":" lounge bedroom " },
            { "name":"glove", "heft":1, "cos":p+"clothe\\glove.png", "for":" lounge bedroom tent " },
            { "name":"medal", "heft":1, "cos":p+"clothe\\medal1.png", "for":" lounge bedroom tent " },
            { "name":"mitten", "heft":1, "cos":p+"clothe\\mitten.png", "for":" lounge bedroom tent " },
            //communicate
            { "name":"ink", "heft":1, "cos":p+"communicate\\ink.png", "toSay":"", "for":" lounge bedroom ", "heightScale":2 },
            { "name":"phone", "heft":1, "cos":p+"communicate\\phone1.png", "for":" lounge bedroom ", "heightScale":2.4 },
            { "name":"typewriter", "heft":2, "cos":p+"communicate\\typewriter.png", "for":" lounge " },
            //kitchen
            { "name":"broom", "heft":1, "cos":p+"kitchen\\broom.png", "for":" kitchen " },
            { "name":"butchers-knife", "heft":1, "cos":p+"kitchen\\butchers-knife.png", "for":" kitchen tent ", "heightScale":0.6 },
            { "name":"butter-knife", "heft":1, "cos":p+"kitchen\\butter-knife.png", "for":" kitchen tent ", "heightScale":0.6 },
            { "name":"can", "heft":1, "cos":p+"kitchen\\can.png", "for":" kitchen " },
            { "name":"cupcake", "heft":1, "cos":p+"cup\\cake.png", "for":" kitchen " },
            { "name":"cake", "heft":1, "cos":p+"kitchen\\cake1.png", "for":" kitchen " },
            { "name":"coffee grind", "heft":1, "cos":p+"kitchen\\coffee grind.png", "for":" kitchen " },
            { "name":"corkscrew", "heft":1, "cos":p+"kitchen\\corkscrew.png", "for":" kitchen tent ", "heightScale":0.6 },
            { "name":"fork", "heft":1, "cos":p+"kitchen\\fork.png", "for":" kitchen " },
            { "name":"hair-scissors", "heft":1, "cos":p+"kitchen\\hair-scissors.png", "for":" kitchen ", "heightScale":0.6 },
            { "name":"hourglass", "heft":1, "cos":p+"kitchen\\hourglass.png", "for":" kitchen " },
            { "name":"kettle", "heft":1, "cos":p+"kitchen\\kettle.png", "for":" kitchen " },
            { "name":"knife", "heft":1, "cos":p+"kitchen\\knife.png", "for":" kitchen tent ", "heightScale":0.6 },
            { "name":"kitchen-knife", "heft":1, "cos":p+"kitchen\\kitchen-knife.png", "for":" kitchen tent " },
            { "name":"napkin", "heft":1, "cos":p+"kitchen\\napkin.png", "for":" kitchen " },
            { "name":"pan", "heft":1, "cos":p+"kitchen\\pan.png", "for":" kitchen " },
            { "name":"pepper", "heft":1, "cos":p+"kitchen\\pepper.png", "for":" kitchen " },
            { "name":"pot", "heft":1, "cos":p+"kitchen\\pot1.png", "for":" kitchen tent " },
            { "name":"pot", "heft":1, "cos":p+"kitchen\\pot2.png", "for":" kitchen tent " },
            { "name":"rolling-pin", "heft":1, "cos":p+"kitchen\\rolling-pin.png", "for":" kitchen " },
            { "name":"salt", "heft":1, "cos":p+"kitchen\\salt.png", "for":" kitchen " },
            { "name":"scales", "heft":1, "cos":p+"kitchen\\scales.png", "for":" kitchen " },
            { "name":"scissors", "heft":1, "cos":p+"kitchen\\scissors.png", "for":" kitchen tent ", "heightScale":0.6 },
            { "name":"scoop", "heft":1, "cos":p+"kitchen\\scoop.png", "for":" kitchen ", "heightScale":0.6 },
            { "name":"spoon", "heft":1, "cos":p+"kitchen\\spoon.png", "for":" kitchen ", "heightScale":0.6 },
            //light
            { "name":"davy lamp", "heft":1, "cos":p+"light\\davy-lamp.png", "heightScale":2.7, "for":" lounge kitchen " },
            { "name":"hand lamp", "heft":1, "cos":p+"light\\hand-lamp1.png", "heightScale":3.3, "for":" lounge kitchen  " },
            { "name":"hand lamp", "heft":1, "cos":p+"light\\hand-lamp2.png", "heightScale":3.3, "for":" lounge kitchen  " },
            { "name":"hand lamp", "heft":1, "cos":p+"light\\hand-lamp3.png", "heightScale":4, "for":" lounge kitchen  " },
            { "name":"metal lamp", "heft":1, "cos":p+"light\\metal-lamp.png", "heightScale":2.7, "for":" lounge " },
            { "name":"oil lamp", "heft":1, "cos":p+"light\\oil-lamp.png", "heightScale":2.7, "for":" lounge bedroom kitchen " },
            //light-candle
            { "name":"candles", "heft":1, "cos":p+"light-candle\\candles.png", "heightScale":2.7, "for":" lounge bedroom kitchen " },
            //tableObj\music
            { "name":"bagpipes", "heft":1, "cos":p+"music\\bagpipe.png", "heightScale":1.0, "for":" lounge tent " },
            { "name":"banjo", "heft":1, "cos":p+"music\\banjo.png", "heightScale":1.0, "for":" lounge tent " },
            { "name":"bass clarinet", "heft":1, "cos":p+"music\\bass-clarinet.png", "heightScale":1.0, "for":" lounge " },
            { "name":"basset horn", "heft":2, "cos":p+"music\\basset_horn.png", "heightScale":1.0, "for":" lounge " },
            { "name":"bassoon", "heft":2, "cos":p+"music\\bassoon.png", "heightScale":0.8, "for":" lounge " },
            { "name":"bell", "heft":1, "cos":p+"music\\bell.png", "heightScale":1.6, "for":" lounge tent " },
            { "name":"concertina", "heft":2, "cos":p+"music\\concertina.png", "for":" lounge tent " },
            { "name":"cornet", "heft":1, "cos":p+"music\\cornet.png", "heightScale":1.3, "for":" lounge " },
            { "name":"cor de chasse", "heft":1, "cos":p+"music\\cor_de_chasse.png", "heightScale":1.3, "for":" lounge tent " },
            { "name":"cymbals", "heft":1, "cos":p+"music\\cymbals.png", "for":" lounge " },
            { "name":"drum", "heft":2, "cos":p+"music\\drum.png", "heightScale":1.5, "for":" lounge tent " },
            { "name":"egyptian lyre", "heft":1, "cos":p+"music\\egyptian-lyre.png", "heightScale":4, "for":" lounge tent " },
            { "name":"egyptian harp", "heft":1, "cos":p+"music\\egyptian_harp.png", "heightScale":1.2, "for":" lounge tent " },
            { "name":"electric guitar", "heft":2, "cos":p+"music\\electric-guitar.png", "heightScale":1.7, "for":" lounge " },
            { "name":"guitar", "heft":2, "cos":p+"music\\guitar.png", "heightScale":1.3, "for":" lounge " },
            { "name":"hunting-horn", "heft":1, "cos":p+"music\\hunting-horn.png", "heightScale":1.3, "for":" lounge tent " },
            { "name":"lyre", "heft":1, "cos":p+"music\\lyre.png", "heightScale":2, "for":" lounge tent " },
            { "name":"mandolin", "heft":1, "cos":p+"music\\mandolin.png", "heightScale":1.3, "for":" lounge tent " },
            { "name":"mishrokitha", "heft":1, "cos":p+"music\\mishrokitha.png", "heightScale":1.3, "for":" lounge tent " },
            { "name":"saxophone", "heft":1, "cos":p+"music\\saxophone.png", "heightScale":1.8, "for":" lounge " },
            { "name":"serpent", "heft":2, "cos":p+"music\\serpent.png", "heightScale":1.5, "for":" lounge " },
            { "name":"trombone", "heft":1, "cos":p+"music\\trombone.png", "heightScale":1.3, "for":" lounge " },
            { "name":"tuba", "heft":1, "cos":p+"music\\tuba.png", "heightScale":1.3, "for":" lounge " },
            { "name":"ugar", "heft":1, "cos":p+"music\\ugar.png", "heightScale":1.3, "for":" lounge tent " },
            { "name":"violin", "heft":1, "cos":p+"music\\violin.png", "for":" lounge tent " },
            { "name":"whistle", "heft":1, "cos":p+"music\\whistle.png", "heightScale":0.4, "for":" lounge tent " },
            { "name":"xylophone", "heft":2, "cos":p+"music\\xylophone.png", "heightScale":1.4, "for":" lounge tent " },
            //plant // OUTSIDE plants
            { "name":"alsophila", "heft":1, "cos":p+"plant\\alsophila.png", "heightScale":1.9, "for":" village forest countryside " },
            { "name":"artichoke", "heft":1, "cos":p+"plant\\artichoke.png", "heightScale":1.9, "for":" village forest countryside " },
            { "name":"bastard balm", "heft":1, "cos":p+"plant\\bastard_balm.png", "heightScale":1.9, "for":" village forest countryside " },
            { "name":"begonia", "heft":1, "cos":p+"plant\\begonia.png", "heightScale":1.9, "for":" village forest countryside " },
            { "name":"blumenbachia", "heft":1, "cos":p+"plant\\blumenbachia.png", "heightScale":2.4, "for":" village forest countryside " },
            { "name":"bouvardia", "heft":1, "cos":p+"plant\\bouvardia.png", "heightScale":1.9, "for":" village forest countryside " },
            { "name":"broccoli", "heft":1, "cos":p+"plant\\broccoli.png", "heightScale":1.9, "for":" village forest countryside " },
            { "name":"cabbage", "heft":1, "cos":p+"plant\\cabbage.png", "heightScale":1.9, "for":" village forest countryside " },
            { "name":"cabbage", "heft":1, "cos":p+"plant\\cabbage2.png", "heightScale":1.9, "for":" village forest countryside " },
            { "name":"cactus", "heft":1, "cos":p+"plant\\cacti.png", "heightScale":4, "for":" village forest countryside " },
            { "name":"calandrin", "heft":1, "cos":p+"plant\\calandrin.png", "heightScale":1.9, "for":" village forest countryside " },
            { "name":"calochortus", "heft":1, "cos":p+"plant\\calochortus.png", "heightScale":1.9, "for":" village forest countryside " },
            { "name":"campanula", "heft":1, "cos":p+"plant\\campanula1.png", "heightScale":1.8, "for":" village forest countryside " },
            { "name":"campanula", "heft":1, "cos":p+"plant\\campanula2.png", "heightScale":2.3, "for":" village forest countryside " },
            { "name":"cauliflower", "heft":1, "cos":p+"plant\\cauliflower.png", "heightScale":1.9, "for":" village forest countryside " },
            { "name":"christmas-rose", "heft":1, "cos":p+"plant\\christmas-rose.png", "heightScale":1.9, "for":" village forest countryside " },
            { "name":"daisy", "heft":1, "cos":p+"plant\\daisy.png", "heightScale":1.9, "for":" village forest countryside " },
            { "name":"dipladenia atropurpure	", "heft":1, "cos":p+"plant\\dipladenia-atropurpurea.png", "heightScale":1.9, "for":" village forest countryside " },
            { "name":"double flowered stock", "heft":1, "cos":p+"plant\\double-flowered-stock.png", "heightScale":1.9, "for":" village forest countryside " },
            { "name":"dracaena moorei", "heft":1, "cos":p+"plant\\dracaena-moorei.png", "heightScale":1.9, "for":" village forest countryside " },
            { "name":"geranium", "heft":1, "cos":p+"plant\\geranium.png", "heightScale":1.9, "for":" village forest countryside " },
            { "name":"kidneywort", "heft":1, "cos":p+"plant\\kidneywort.png", "heightScale":1.9, "for":" village forest countryside " },
            { "name":"lilac", "heft":1, "cos":p+"plant\\lilac.png", "heightScale":1.9, "for":" village forest countryside " },
            { "name":"locoweed", "heft":1, "cos":p+"plant\\locoweed.png", "heightScale":1.9, "for":" village forest countryside " },
            { "name":"myrtle", "heft":1, "cos":p+"plant\\myrtle.png", "heightScale":1.9, "for":" village forest countryside " },
            { "name":"oxeye daisy", "heft":1, "cos":p+"plant\\oxeye-daisy.png", "heightScale":1.9, "for":" village forest countryside " },
            { "name":"rhododendron", "heft":1, "cos":p+"plant\\rhododendron.png", "heightScale":1.9, "for":" village forest countryside " },
            //science
            { "name":"abacus", "heft":1, "cos":p+"science\\abacus.png", "for":" workshop tent ship ", "heightScale":1.5 },
            { "name":"ammeter", "heft":1, "cos":p+"science\\ammeter.png", "for":" workshop " },
            { "name":"artists-curve", "heft":1, "cos":p+"science\\artists-curve.png", "for":" workshop " },
            { "name":"balloons", "heft":1, "cos":p+"science\\balloons.png", "for":" workshop ", "heightScale":1.5 },
            { "name":"barometer", "heft":1, "cos":p+"science\\barometer.png", "for":" workshop tent ship " },
            { "name":"circuit breaker", "heft":1, "cos":p+"science\\circuit-breaker.png", "for":" workshop " },
            { "name":"gears", "heft":2, "cos":p+"science\\gears.png", "for":" workshop " },
            { "name":"gears", "heft":2, "cos":p+"science\\gears2.png", "for":" workshop " },
            { "name":"glass dome", "heft":1, "cos":p+"science\\glass-dome.png", "for":" workshop ship ", "heightScale":1.5 },
            { "name":"meter", "heft":1, "cos":p+"science\\meter.png", "for":" workshop ship " },
            { "name":"microscope", "heft":1, "cos":p+"science\\microscope.png", "for":" workshop tent ship ", "heightScale":1.5 },
            { "name":"orrery", "heft":2, "cos":p+"science\\orrery.png", "for":" workshop castle tent ship " },
            { "name":"planimeter", "heft":1, "cos":p+"science\\planimeter.png", "for":" workshop tent ship " },
            { "name":"sextant", "heft":1, "cos":p+"science\\sextant.png", "for":" workshop tent ship " },
            { "name":"skull", "heft":1, "cos":p+"science\\skull.png", "for":" workshop tent ship ", "heightScale":1.5 },
            { "name":"slide rule", "heft":1, "cos":p+"science\\slide-rule.png", "for":" workshop tent ship " },
            { "name":"telegraph", "heft":1, "cos":p+"science\\telegraph.png", "for":" workshop " },
            { "name":"telescope", "heft":2, "cos":p+"science\\telescope.png", "for":" workshop tent ship ", "heightScale":2 },
            //weapon
            { "name":"arrowhead", "heft":1, "cos":p+"weapon\\arrowhead.png", "for":" workshop castle " },
            { "name":"flint spear", "heft":1, "cos":p+"weapon\\flint-spear.png", "for":" workshop castle " },
            { "name":"grenade", "heft":1, "cos":p+"weapon\\grenade.png", "for":" workshop castle " },
            { "name":"grenade", "heft":1, "cos":p+"weapon\\grenade2.png", "for":" workshop castle " },
            { "name":"pistol", "heft":1, "cos":p+"weapon\\pistol.png", "for":" workshop castle " },
            { "name":"powder horn", "heft":1, "cos":p+"weapon\\powder-horn.png", "for":" workshop castle tent ship " },
            //tableObj\work
            { "name":"auger", "heft":1, "cos":p+"work\\auger.png", "for":" workshop tent ship " },
            { "name":"bar tap", "heft":1, "cos":p+"work\\bar-tap.png", "for":" workshop ", "heightScale":2 },
            { "name":"block and tackle", "heft":1, "cos":p+"work\\block-and-tackle.png", "for":" workshop tent ship ", "heightScale":1.5 },
            { "name":"bolt", "heft":1, "cos":p+"work\\bolt.png", "for":" workshop tent ship ", "heightScale":0.7 },
            { "name":"book press", "heft":1, "cos":p+"work\\book-press.png", "for":" workshop " },
            { "name":"brush", "heft":1, "cos":p+"work\\brush.png", "for":" workshop tent ship " },
            { "name":"chisel", "heft":1, "cos":p+"work\\chisel.png", "for":" workshop tent ship " },
            { "name":"clamp", "heft":1, "cos":p+"work\\clamp.png", "for":" workshop tent ship " },
            { "name":"drill bits", "heft":1, "cos":p+"work\\drill-bits.png", "for":" workshop tent ship " },
            { "name":"drill", "heft":1, "cos":p+"work\\drill.png", "for":" workshop tent ship " },
            { "name":"dynamo", "heft":3, "cos":p+"work\\dynamo.png", "for":" workshop ", "heightScale":1.5 },
            { "name":"file", "heft":1, "cos":p+"work\\file.png", "for":" workshop tent ship ", "heightScale":0.7 },
            { "name":"hole punch", "heft":1, "cos":p+"work\\hole-punch.png", "for":" workshop tent ship " },
            { "name":"monkey wrench", "heft":1, "cos":p+"work\\monkey-wrench.png", "for":" workshop tent ship " },
            { "name":"paint brush", "heft":1, "cos":p+"work\\paint-brush.png", "for":" workshop tent ship " },
            { "name":"pincers", "heft":1, "cos":p+"work\\pincers.png", "for":" workshop tent ship " },
            { "name":"pipe wrench", "heft":1, "cos":p+"work\\pipe-wrench.png", "for":" workshop tent ship " },
            { "name":"pruning shears", "heft":1, "cos":p+"work\\pruning-shears.png", "for":" workshop tent ship " },
            { "name":"putty knife", "heft":1, "cos":p+"work\\putty-knife.png", "for":" workshop ship ", "heightScale":0.7 },
            { "name":"roller", "heft":1, "cos":p+"work\\roller.png", "for":" workshop ship " },
            { "name":"saw", "heft":1, "cos":p+"work\\saw.png", "for":" workshop tent ship " },
            { "name":"screw press", "heft":1, "cos":p+"work\\screw-press.png", "for":" workshop ", "heightScale":2 },
            { "name":"screw", "heft":1, "cos":p+"work\\screw.png", "for":" workshop ship ", "heightScale":0.7 },
            { "name":"shears", "heft":1, "cos":p+"work\\shears.png", "for":" workshop tent ship " },
            { "name":"trowel", "heft":1, "cos":p+"work\\trowel.png", "for":" workshop tent ship " },
            { "name":"vice", "heft":1, "cos":p+"work\\vice.png", "for":" workshop ship " },
            //city
            { "name":"'A' frame", "heft":2, "cos":p+"city\\aFrame1.png", "for":" city govt " },
            { "name":"statue of Alexander The Great", "heft":-3, "cos":p+"city\\Alexander-the-Great.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of Ambiorix", "heft":-3, "cos":p+"city\\Ambiorix.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of Antonino Pio", "heft":-3, "cos":p+"city\\Antonino Pio.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of Asklepios", "heft":-3, "cos":p+"city\\Asklepios.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of a badger", "heft":-3, "cos":p+"city\\badger.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"bike stand", "heft":1, "cos":p+"city\\bikeStand.png", "for":" city govt ", "heightScale":0.7 },
            { "name":"bin", "heft":1, "cos":p+"city\\bollard1.png", "for":" city govt " },
            { "name":"statue of the Buddha", "heft":-3, "cos":p+"city\\Buddha.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of a buddhist", "heft":-3, "cos":p+"city\\buddhist.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of a bull", "heft":-3, "cos":p+"city\\bull.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of a Chinese lion", "heft":-3, "cos":p+"city\\chinese-lion2.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of a Chinese lion", "heft":-3, "cos":p+"city\\chinese-lion.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"lamp post", "heft":-3, "cos":p+"city\\LampPost1.png", "for":" city govt " },
            { "name":"lamp post", "heft":-3, "cos":p+"city\\LampPost2.png", "for":" city govt " },
            { "name":"lamp post", "heft":-3, "cos":p+"city\\LampPost3.png", "for":" city govt " },
            { "name":"tree", "heft":-4, "cos":p+"city\\TreeStump2.png", "for":" city govt " },
            { "name":"tree stump", "heft":-3, "cos":p+"city\\TreeStump.png", "for":" city govt " },
            { "name":"statue of Dionysos", "heft":-3, "cos":p+"city\\Dionysos.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of Dioskouros", "heft":-3, "cos":p+"city\\Dioskouros.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of a dog", "heft":-3, "cos":p+"city\\dog2.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of a dog", "heft":-3, "cos":p+"city\\dog.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"drinking fountain", "heft":-2, "cos":p+"city\\drinkingFountain1.png", "for":" city govt " },
            { "name":"drinking fountain", "heft":-2, "cos":p+"city\\drinkingFountain2.png", "for":" city govt ", "heightScale":0.6 },
            { "name":"statue of an eagle", "heft":-3, "cos":p+"city\\eagle2.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of an eagle", "heft":-3, "cos":p+"city\\eagle.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of an Egyptian", "heft":-3, "cos":p+"city\\egyptian2.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of an Egyptian", "heft":-3, "cos":p+"city\\egyptian.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of an elk", "heft":-3, "cos":p+"city\\elk.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of the goddess Nana of Afghanistan", "heft":-3, "cos":p+"city\\Goddess-Nana-Afghanistan.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of the goddess Nike", "heft":-3, "cos":p+"city\\goddess-Nike.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of a griffin", "heft":-3, "cos":p+"city\\griffin.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of Guanyin Bodhisattva Avalokitesvara", "heft":-3, "cos":p+"city\\Guanyin-Bodhisattva-Avalokitesvara.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"hay bales", "heft":2, "cos":p+"city\\hayBales2.png", "for":" city govt tent ", "heightScale":2.9 },
            { "name":"hay bales", "heft":2, "cos":p+"city\\hayBales3.png", "for":" city govt tent ", "heightScale":2.9 },
            { "name":"hay bales", "heft":2, "cos":p+"city\\hayBales.png", "for":" city govt tent ", "heightScale":2.9 },
            { "name":"statue of Isabel de Braganza", "heft":-3, "cos":p+"city\\Isabel-de-Braganza.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of Iulia Soaemias", "heft":-3, "cos":p+"city\\Iulia-Soaemias.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of a lion", "heft":-3, "cos":p+"city\\lion.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of Livia, mother of Tiberius", "heft":-3, "cos":p+"city\\Livia-mother-of-Tiberius.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of Melpomene, the muse of tragedy", "heft":-3, "cos":p+"city\\Melpomene-muse-of-tragedy.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of a Minoan", "heft":-3, "cos":p+"city\\minoan2.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of a Minoan", "heft":-3, "cos":p+"city\\minoan3.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of a Minoan", "heft":-3, "cos":p+"city\\minoan.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of the Minoan snake goddess", "heft":-3, "cos":p+"city\\minoan-snake-goddess.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of Nicholas, count of Salm", "heft":-3, "cos":p+"city\\Nicholas-count-of-Salm.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of Octavia minor", "heft":-3, "cos":p+"city\\Octavia_minor.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of an owl", "heft":-3, "cos":p+"city\\owl.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of Penelope, wife of -Odysseus", "heft":-3, "cos":p+"city\\Penelope-wife-of-Odysseus.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of a pharaoh", "heft":-3, "cos":p+"city\\pharaoh.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"post box", "heft":-3, "cos":p+"city\\postBox1.png", "for":" city govt ", "heightScale":1.3 },
            { "name":"post box", "heft":-3, "cos":p+"city\\postBox2.png", "for":" city govt ", "heightScale":1.3 },
            { "name":"statue of Psyche, abandoned", "heft":-3, "cos":p+"city\\Psyche-abandoned.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of a rabbit", "heft":-3, "cos":p+"city\\rabbit.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of Rachel, daughter of Laban", "heft":-3, "cos":p+"city\\Rachel-daughter-of-Laban.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of a ram", "heft":-3, "cos":p+"city\\ram.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of a Roman woman as Venus", "heft":-3, "cos":p+"city\\Roman-lady-as-Venus.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of a Roman woman", "heft":-3, "cos":p+"city\\Roman-lady.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of a Roman woman", "heft":-3, "cos":p+"city\\Roman_woman.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of a Roman woman", "heft":-3, "cos":p+"city\\Roman-woman.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of Sabina, a Roman woman", "heft":-3, "cos":p+"city\\Sabina-a-Roman-Woman.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of a satyr", "heft":-3, "cos":p+"city\\Satyr.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of Saint Barbara", "heft":-3, "cos":p+"city\\St_Barbara.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of Saint Boniface", "heft":-3, "cos":p+"city\\St_Boniface.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of Saimt Christopher", "heft":-3, "cos":p+"city\\St_Christopher.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of Saint Paul", "heft":-3, "cos":p+"city\\St_Paul.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"bin", "heft":2, "cos":p+"city\\streetBin3.png", "for":" city govt " },
            { "name":"bush", "heft":-3, "cos":p+"city\\streetFlowers2.png", "for":" city govt " },
            { "name":"statue of a swan", "heft":-3, "cos":p+"city\\swan.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of Syamatara", "heft":-3, "cos":p+"city\\Syamatara.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of a unicorn", "heft":-3, "cos":p+"city\\unicorn.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of young Hercules", "heft":-3, "cos":p+"city\\young_Hercules.png", "for":" city govt ", "heightScale":2.4 },
            { "name":"statue of Avalokitesvara", "heft":-3, "cos":p+"street-statue-exotic\\Avalokitesvara.png", "for":" exotic ", "heightScale":2.4 },
            { "name":"statue of a bear", "heft":-3, "cos":p+"street-statue-exotic\\bear.png", "for":" exotic ", "heightScale":2.4 },
            { "name":"statue of a bee", "heft":-3, "cos":p+"street-statue-exotic\\bee.png", "for":" exotic ", "heightScale":2.4 },
            { "name":"statue of a Chinese dragon", "heft":-3, "cos":p+"street-statue-exotic\\chinese-dragon.png", "for":" exotic ", "heightScale":2.4 },
            { "name":"statue of a Chinese lion", "heft":-3, "cos":p+"street-statue-exotic\\chinese-lion3.png", "for":" exotic ", "heightScale":2.4 },
            { "name":"statue of Guian Di", "heft":-3, "cos":p+"street-statue-exotic\\chinese-statue-of-guian-di.png", "for":" exotic ", "heightScale":2.4 },
            { "name":"statue of an Indonesian dragon", "heft":-3, "cos":p+"street-statue-exotic\\dragon-indonesia.png", "for":" exotic ", "heightScale":2.4 },
            { "name":"statue of an Egyptian", "heft":-3, "cos":p+"street-statue-exotic\\Egyptian1.png", "for":" exotic ", "heightScale":2.4 },
            { "name":"statue of an Egyptian cat", "heft":-3, "cos":p+"street-statue-exotic\\egyptian-cat.png", "for":" exotic ", "heightScale":2.4 },
            { "name":"statue of an elephant", "heft":-3, "cos":p+"street-statue-exotic\\elephant2.png", "for":" exotic ", "heightScale":2.4 },
            { "name":"statue of an elephant", "heft":-3, "cos":p+"street-statue-exotic\\elephant.png", "for":" exotic ", "heightScale":2.4 },
            { "name":"statue of a gorilla", "heft":-3, "cos":p+"street-statue-exotic\\gorilla2.png", "for":" exotic ", "heightScale":2.4 },
            { "name":"statue of a Minoan bull", "heft":-3, "cos":p+"street-statue-exotic\\minoan-bull.png", "for":" exotic ", "heightScale":2.4 },
            { "name":"statue of the Minoan snake goddess", "heft":-3, "cos":p+"street-statue-exotic\\minoan-snake-goddess2.png", "for":" exotic ", "heightScale":2.4 },
            { "name":"an Olmec statue", "heft":-3, "cos":p+"street-statue-exotic\\olmec1.png", "for":" exotic ", "heightScale":2.4 },
            { "name":"an Olmec statue", "heft":-3, "cos":p+"street-statue-exotic\\olmec2.png", "for":" exotic ", "heightScale":2.4 },
            { "name":"statue of a pharaoh", "heft":-3, "cos":p+"street-statue-exotic\\pharaoh2.png", "for":" exotic ", "heightScale":2.4 },
            { "name":"statue of a tortoise", "heft":-3, "cos":p+"street-statue-exotic\\tortoise.png", "for":" exotic ", "heightScale":2.4 },
            { "name":"statue of Vishnu", "heft":-3, "cos":p+"street-statue-exotic\\Vishnu.png", "for":" exotic ", "heightScale":2.4 }
         );
      }
      addWalls();
      addCeilings();
      addFloors();
      addWallObjs();
      addDoorLefts();
      addDoors();
      addFloorObjs();
      addTables();
      addTableObjs();
      addSpecial();
   }
   function addNames() {
      // prefixes
      db.names.nickNamePrefixes.push(
         "Affable", "Babe", "Barefoot", "Beetle", "Black", "Blind", "Boots", "Crazy", "Deadeye", "Django", "Doc", "Do-nothing", "Don", "Flatnose", "Gentle", "Half-pint", "Happy", "Honest", "Iron", "Kaiser", "Jughead", "Leatherface", "Little", "Lockjaw", "Lonesome", "Long", "Longshanks", "Lucky", "Mad", "Merry", "Moneybags", "Old", "One-eyed", "Oneshot", "Pious", "Professor", "Red", "Rusty", "Spike", "Velvet", "Wild", "Yeoman", "Young");
      db.names.commonRank.push( // use with SURnames. E.g:"The Commander Smith Inn"
         "Admiral", "Captain", "Cardinal", "Colonel", "Commander", "Commodore", "General", "Major"); // not king, etc.:they use FIRST names
         // not "major general" or "vice admiral" - need punchy title, e.g. "Captain Kidd"
      db.names.imperialRank.female.push( // use with FIRST names. E.g. "the Queen Jane Inn"
         "Baroness", "Duchess", "Empress", "Queen", "Princess" );
      db.names.imperialRank.male.push( // use with FIRST names. E.g. "the King Robert Inn"
         "Baron", "Duke", "Emperor", "Kaiser", "King", "Marquis", "Prince", "Tsar", "Viscount"  );
      db.lane.starts.push(
         "Lower", "Nether", "Upper", "High", "Higher", "North", "South", "East", "West", "Little", "Great", "Old");
      db.street.starts.push(
         "North", "South", "East", "West", "Upper", "Lower", "Great", "Old", "New", "Middle");

      // suffixes
      db.lane.ends.push(
         "Bank", "Bend", "Bottom", "Chase", "Crag", "Croft", "Crossing", "Crossroad", "Dale", "Dell", "Descent", "Dyke", "Edge", "End", "Estates", "Farm", "Fen", "Field", "Gap", "Gate", "Glade", "Glen", "Green", "Gutter", "Haven", "Hill", "Hole", "Hollow", "Hope", "Lane", "Lane", "Lane", "Lane", "Leah", "Marsh", "Meadow", "Mill", "Moss", "Mount", "Nook", "Paddock", "Park", "Pathway", "Pike", "Plain", "Point", "Prairie", "Rise", "Rocks", "Toft", "Trail", "Turnpike", "Vale", "View", "Valley", "View", "Walk", "Way", "Wynd");
      db.coast.ends.push(
         "Bay", "Beach", "Beach", "Beach", "Cape", "Channel", "Cove", "Harbor", "Point", "Rocks", "Shore");
      db.street.ends.push(
         "Approach", "Arcade", "Alley", "Avenue", "Avenue", "Buildings", "Bypass", "Circle", "Close", "Corner", "Cottages", "Court", "Crescent", "Cross", "Drive", "Flats", "Gardens", "Gate", "Grove", "Junction", "Lane", "Mews", "Passage", "Promenade", "Quadrant", "Retreat", "Rise", "Road", "Road", "Road", "Road", "Row", "Square", "Street", "Street", "Street", "Street", "Terrace", "Villas", "Wood", "Yard", "Heights", "Place", "View", "Walk", "Way");

      // first names
      db.names.saints.male.push( // enough for general male names
         "Achilleus", "Adalbert", "Adelin", "Adrian", "Agapitus", "Agatho", "Aidan", "Alberic", "Albertus", "Alda", "Alcuin", "Alexander", "Alexei", "Aloysius", "Alphonsa", "Ambros", "Ammon", "Andronicus", "Andrei", "Andrew", "Anselm", "Ansgar", "Anthony", "Antoine", "Apollonia", "Arnold", "Athanasius", "Augustine", "Baldred", "Basil", "Bede", "Benedict", "Bernard", "Bonaventure", "Boniface", "Boris", "Brendan", "Bruno", "Canute", "Casimir", "Celadion", "Charles", "Christopher", "Chrysanthus", "Clement", "Columba", "Constantine", "Conrad", "Cristobal", "Cuthbert", "Cyrus", "Cyril", "Dagobert", "Damian", "Declan", "Demetrius", "Didier", "Dietrich", "Dimitry", "Dionysius", "Dominic", "Drogo", "Dunstan", "Edmund", "Edward", "Edwin", "Egbert", "Emeric", "Engelbert", "Erentrude", "Etheldred", "Eugene", "Eustace", "Euthymius", "Faustus", "Felix", "Ferdinand", "Finbarr", "Frances", "Xavier", "Francisco", "Gaspar", "Gelasius", "George", "Gerasimus", "Gerard", "Gerulfus", "Gilbert", "Godric", "Gregory", "Gunther", "Hedwig", "Henry", "Herman", "Hildebrand", "Hildegard", "Ignatius", "Innocent", "Igor", "Isaac", "Isidore", "Joaquin", "Julian", "Kessog", "Kevin", "Konstantin", "Lambert", "Lawrence", "Leo", "Leopold", "Louis", "Lupus", "Martin", "Maximilian", "Maximus", "Modwen", "Nicholas", "Nikola", "Noel", "Norbert", "Odo", "Olaf", "Oswald", "Oliver", "Paschal", "Patrick", "Pavel", "Pedro", "Peregrine", "Petroc", "Pierre", "Quintian", "Ralph", "Raymond", "Richard", "Robert", "Roger", "Rosalia", "Salonius", "Scholastica", "Seraphim", "Sergei", "Sergius", "Silverius", "Sophronius", "Sylvester", "Theodore", "Theophanes", "Tydfil", "Vicent", "Vergilius", "Vitalis", "Wenceslaus", "Wilfrid", "William", "Wolfgang", "Wulfram", "Xenophon", "Zachary");
      db.names.saints.female.push(
         "Adelaide", "Agatha", "Agnes", "Alexis", "Alice", "Anastasia", "Angela", "Anna", "Beatrix", "Berlinda", "Bernadette", "Bridget", "Catherine", "Celestine",   "Christina", "Cleopatra", "Clotilde", "Colette", "Dorothea", "Edith", "Elisabeth", "Emma", "Euphemia", "Francesca", "Helena", "Hilda", "Hyacinth",   "Irene", "Isabel", "Jean", "Katharine", "Laura", "Margaret", "Paulina", "Rita", "Tatiana", "Therese", "Ursula", "Veronica", "Virginia");
      db.names.girls.push(
         "Agatha", "Agnes", "Alice", "Amelia", "Anne", "Arabella", "Athena", "Caroline", "Cassandra", "Catherine", "Charlotte", "Christina", "Clara", "Delilah", "Dorothy", "Elizabeth", "Erica", "Esther", "Florence", "Genevieve", "Harriet", "Hazel", "Helen", "Jane", "Jennifer", "Julia", "June", "Kathleen", "Leonora", "Louisa", "Lucie", "Lydia", "Madeline", "Maria", "Martha", "Matilda", "Moll", "Olive", "Persephone", "Rebecca", "Rosa", "Ruth", "Sally", "Serena", "Sophie", "Stephanie", "Tabitha", "Vanessa", "Victoria"),
      db.names.boys.push(
         "Alexander", "Alfred", "Amos", "Arthur", "Benjamin", "Charles", "Cornelius", "David", "Edmund", "Edwin", "Ernest", "Floyd", "Francis", "Harold", "Henry", "Herbert", "Horatio", "Howard", "Jack", "Jasper", "James", "Jeremiah", "Jerome", "Joseph", "John", "Julian", "Matthew", "Mortimer", "Myron", "Nicholas", "Norman", "Paul", "Percy", "Peter", "Randall", "Reed", "Richard", "Robert", "Rudolph", "Stephen", "Sylvester", "Thomas", "Virgil", "William"),
      db.names.royalFemale.push(
         "Aelia", "Agrippina", "Alexandra", "Amina", "Aquilia", "Charlotte", "Eleanor", "Esther", "Eudocia", "Henrietta", "Isabella", "Jadwiga", "Joan", "Josephine", "Juliana", "Licinia", "Livia", "Lucilla", "Lucrezia", "Marcia", "Margrethe", "Marie Louise", "Matilda", "Messalina", "Nefertiti", "Olga", "Philippa", "Rani", "Rania", "Razia", "Sabina", "Tarabai", "Theodora", "Victoria", "Wilhemina");
      db.lane.names.push(
         "Adder's Fork", "Agardsley", "Badgers", "Haddiscoe", "Alne", "Apple Leaf", "Appleby", "Arnside", "Arthingworth", "Arundel", "Ashover", "Aspeden", "Aveley", "Azazel's", "Barachiel's", "Bardfeld", "Barking", "Bartlow", "Baseborn", "Battle", "Beccles", "Bedlam", "Beedon", "Berry", "Biggleswade", "Billing", "Bilney", "Bindlestiff", "Bisham", "Bittering", "Blickling", "Bodwen", "Bog Treacle", "Bogler", "Bogshole", "Bolweevil", "Brabble", "Brackley", "Bradninch", "Bradwell", "Bramber", "Bramfeld", "Brickhill", "Brigg", "Brigstock", "Brimstone", "Brisley", "Briston", "Brundish", "Bucksteep", "Bumfuzzle", "Bungay", "Burnt Corn", "Burstead", "Bushmead", "Butleigh", "Butterwick", "Button", "Caldecott", "Camelopard", "Campsall", "Cattywampus", "Chalk", "Champaign", "Chapman", "Chipping", "Coates", "Cockle Swamp", "Codnor", "Coggeshall", "Coldsden", "Coleshill", "Combe", "Cordwangle", "Corney", "Cottier", "Creslow", "Cromer", "Crow's", "Crowthorne", "Cutpurse", "Datchet", "Dead Cat", "Dead Man's", "Denchworth", "Devil's Milk", "Digdog", "Dingley", "Donnybrook", "Dragonwort", "Driffeld", "Drypool", "Dunge", "Dunmow", "Eamont", "Edingale", "Eland", "Elm", "Elmsett", "Ely", "Fairybell", "Fandangle", "Fane", "Farlegh", "Farndon", "Farthinghoe", "Fell", "Fenny", "Finchingfeld", "Fittleworth", "Flamstead", "Fowey", "Frog's Foot", "Gaddesden", "Gadreel's", "Galimaufrey", "Gardyloo", "Garth", "Gatcombe", "Glapthorne", "Goat's Foot", "Godalming", "Gomshall", "Goodrich", "Goodwin", "Grampound", "Gravelly", "Greeble", "Greenford", "Greenwood", "Grendon", "Grimoldby", "Grittenham", "Groby", "Grub", "Grusset", "Hadleigh", "Hadstock", "Hagthorn", "Hanibal's", "Hanningfeld", "Harbury", "Harlestone", "Harpsden", "Harringay", "Harting", "Hatfield", "Hautboy", "Haxby", "Helmsley", "Herringby", "Highgate", "Highworth", "Hilmarton", "Holborn", "Holgate", "Hollesley", "Holme", "Holwell", "Horehound", "Hormead", "Horrid", "Horsford", "Hounds", "Hurley", "Iden", "Irchenfeld", "Jophiel's", "Kemsing", "Kingspell", "Kingstone", "Kingswood", "Kirkby Stephen", "Lambourne", "Langley", "Larkfeld", "Leake", "Lechlade", "Legfeld", "Leigh", "Leydon", "Lillingstone", "Limbury", "Limpsfield", "Lincoln", "Liscomb", "Lisson", "Lollygag", "Longstow", "Loseley", "Lost", "Lostwithiel", "Lothingland", "Lovers'", "Ludgershall", "Ludlow", "Luffield", "Lyminge", "Maidenhair", "Manningtree", "Marlow", "Maypops", "Melreth", "Milfoil", "Mimms", "Montford", "Moulie", "Mousehole", "Munden", "Netley", "Newhithe", "Northwold", "Orison", "Oundle", "Palter", "Partney", "Pende", "Pentlow", "Pentney", "Periwinkle", "Pertenhall", "Pettyfogger", "Petworth", "Pevensey", "Pinchbeck", "Pleasant", "Pluck's", "Plumstead", "Postern", "Puckeridge", "Purbeck", "Purleigh", "Quire", "Radcot", "Ragamuffin", "Ragnall", "Raguel's", "Ratoon", "Rauceby", "Rayleigh", "Reculver", "Redewynd", "Ringwood", "Ringwould", "Ripple", "Rivenhall", "Rocky", "Rosla", "Ross", "Ruggemere", "Rushden", "Rye", "Sacring", "Saddle-bow", "Saleby", "Salthouse", "Sandwell", "Sandwich", "Screaming", "Sea coal", "Sedgeberrow", "Selby", "Setchey", "Shambles", "Shameface", "Sheering", "Shelswell", "Smallhythe", "Snickersnee", "Sowerby", "Spaldwick", "Spiderlily", "Squeezepenny", "Stebbing", "Stockwith", "Stony", "Stonysich", "Stranger's", "Sutton", "Swaffham", "Tadlow", "Taiga", "Taradiddle", "Thaxted", "Thorney", "Thrigby", "Thurrock", "Ticklebelly", "Tilney", "Todhunters", "Trollingdown", "Tunstall", "Turnagain", "Walden's", "Walpole", "Walton", "Watton", "Weasel Snout", "Weedon", "Welkin", "Wellow", "Wells", "Wendover", "Westacre", "Westoning", "Wheatley", "Whitwell", "Wicken", "Wicklewood", "Widdershins", "Wilton", "Winchester", "Windley", "Windy", "Wingham", "Wingrave", "Wisbech", "Wishford", "Witney", "Woburn", "Woggler's", "Wolseley", "Woodcott", "Woodmaster", "Woolpit", "Wootton", "Wormingford", "Worzel", "Wragby", "Wylye", "Wyvelsthorn", "Yaxley", "Yoxford");
      // surnames
      db.names.surnamesStrong.push(
         "Axe", "Barbarossa", "Bellisario", "Blood", "Cayce", "Caesar", "Crane", "Darkmore", "Delacroix", "Demont", "Diamond", "Dominus", "Duro", "Flint", "Hardison", "Grail", "Grimm", "Gunn", "Heathcliff", "Hellion", "Howler", "Imperador", "Kane", "Kremen", "Kutuzov", "Kyd", "Leider", "Lysander", "Magnus", "Magwitch", "Mahan", "Malagrowther", "Mallor", "Morelli", "Moses", "Mantooth", "Omar", "Overlagsen", "Paine", "Pound", "Quartermain", "Raffles", "Rask", "Riskinner", "Rostov", "Savage", "Sharpe", "Skaggs", "Stark", "Stone", "Stoneking", "Strangewayes", "Strong", "Thorn", "Vanclein", "Wild", "Youngblood", "Xenio"),
      db.names.surnames.push(
         "Abawi", "Abbington", "Abbott", "Abella", "Abernathy", "Ablewhite", "Abner", "Abrell", "Acampora", "Acker", "Ackerman", "Acosta", "Acuff", "Adair", "Adams", "Adara", "Adderley", "Adelson", "Adkins", "Adler", "Agassi", "Agnello", "Agnew", "Agrippa", "Agterberg", "Aguillar", "Aiken", "Ainge", "Akkad", "Akuna", "Albertson", "Albright", "Alcott", "Aldrich", "Alexander", "Algarotti", "Alinsky", "Allard", "Allen", "Allington", "Allred", "Almond", "Alstott", "Alterio", "Alvarez", "Amado", "Amherst", "Anders", "Anderson", "Andruzzi", "Annenberg", "Applebee", "Archer", "Argento", "Aristotle", "Armani", "Armas", "Armstrong", "Arrhenius", "Arrington", "Arrowood", "Ashdown", "Ashmore", "Asola", "Asterio", "Astrro", "Atkinson", "Attard", "Atwater", "Atwood", "Audlington", "Austin", "Axworthy", "Ayresleigh", "Bachelor", "Badger", "Bagman", "Bagnet", "Bagstock", "Baldemor", "Baldwin", "Ballard", "Bamber", "Bamberger", "Bandini", "Bandong", "Banner", "Bantam", "Banu", "Barbary", "Bardell", "Barks", "Barley", "Barnacle", "Barrentine", "Barrick", "Barsad", "Bartley", "Bates", "Bauer", "Baxter", "Bazzard", "Beaumont", "Bedgberry", "Beebe", "Beechworth", "Beeks", "Belakbir", "Belinski", "Bender", "Bennett", "Benoit", "Bensen", "Benton", "Benwikere", "Benz", "Berman", "Bernthal", "Berry", "Berrycloth", "Bessemer", "Bester", "Betteredge", "Bettis", "Bevan", "Bickersdyke", "Biddle", "Biddy", "Biles", "Binion", "Binny", "Birtwhistle", "Bishop", "Bishoptree", "Bisley", "Bitzer", "Bixby", "Blackpool", "Blanks", "Blaustein", "Blenkinsop", "Blimber", "Bloch", "Blodwell", "Blumenfeld", "Boddenham", "Bodkin", "Boffin", "Bogaerts", "Boggs", "Boldon", "Boldwood", "Bolkonsky", "Bonanno", "Booker", "Booth", "Borden", "Bosa", "Bostwick", "Botkin", "Boulware", "Bounderby", "Bourland", "Bowden", "Bowls", "Bowman", "Bowser", "Boythorn", "Bozzelli", "Bracco", "Brackenborough", "Braddock", "Bradshaw", "Brager", "Bragg", "Brandt", "Branwhaite", "Brass", "Braunstone", "Bray", "Brembilla", "Brennan", "Breslin", "Brewer", "Brick", "Bridehead", "Briggs", "Brinkhurst", "Brinkmann", "Bristow", "Browdie", "Brown", "Brownlow", "Brunt", "Bucket", "Buckner", "Budreau", "Bullard", "Bullock", "Bulwer-lytton", "Bumble", "Bunsby", "Burris", "Bushbury", "Buslingthorpe", "Buzfuz", "Bynes", "Byrne", "Cabrera-Bello", "Cagle", "Cahill", "Cain", "Calaway", "Carker", "Carmichael", "Carney", "Carstone", "Carton", "Carver", "Casby", "Cassidy", "Castle", "Cates", "Catherick", "Cauley", "Cavalletto", "Caylor", "Celino", "Chadband", "Chadwick", "Chalut", "Chamberlain", "Chattoway", "Chatwin", "Cheerible", "Cheesewright", "Cherry", "Chester", "Chickenstalker", "Chillingworth", "Chivery", "Chowser", "Chuffnell", "Chung", "Chuzzlewit", "Clack", "Clapp", "Clay", "Claypole", "Cleary", "Clennam", "Cleveland", "Cline", "Cobb", "Coffey", "Cogdill", "Coggins", "Cohen", "Colt", "Coltrane", "Compeyson", "Conard", "Conklin", "Coolidge", "Cooper", "Copeland", "Copernicus", "Coppens", "Copperfield", "Cortse", "Cotheran", "Coulter", "Cox", "Crabtree", "Craggs", "Cranham", "Crankshaw", "Crassus", "Cratchit", "Crawley", "Craye", "Creakle", "Creed", "Creel", "Crespo", "Crewler", "Crimple", "Crisp", "Crisparkle", "Crisper", "Cross", "Crowley", "Crummles", "Cruncher", "Crusher", "Crusoe", "Cruz", "Cuff", "Cugat", "Cullen", "Culpepper", "Curie", "Curio", "Curry", "Cutler", "Cuttle", "Cuxsom", "Cyrus", "Dabney", "Daddario", "Dahl", "Dallesandro", "Dalton", "Dandridge", "Danglars", "Dankworth", "Dantes", "Danton", "Darby", "Dark", "Darnay", "Dartle", "Datchery", "Daundelyon", "Davenport", "Dawkins", "De jong", "Decker", "Dedlock", "Defarge", "Delpy", "Dempsey", "Dennis", "Denton", "Derbyshire", "Devereaux", "Devitt", "Devlin", "Diggs", "Dilber", "Dimmesdale", "Disraeli", "Diver", "Dobbin", "Dobermann", "Dobra", "Dodge", "Dodson", "Dombey", "Dominguez", "Donnelly", "Dorrit", "Dosett", "Doyce", "Draper", "Drewitt", "Driskel", "Drood", "Drummle", "Drusilla", "Dubois", "Duff", "Dufner", "Dukas", "Dumont", "Durbeyfield", "Durdles", "Dusteby", "Dwyer", "Dyer", "Earp", "Earwood", "Ebersol", "Eberstark", "Edevane", "Egan", "Ekker", "Eldridge", "Ellenburg", "Ellerbrock", "Elway", "Emsworth", "Eroshka", "Escobar", "Eslinger", "Etter", "Everdene", "Everhart", "Everson", "Evert", "Faddis", "Fagin", "Fairbanks", "Fairchild", "Fairlee", "Fallah", "Fangio", "Faraday", "Farfrae", "Farley", "Farrell", "Fawzi", "Featherston-Ukridge", "Fenner", "Ferber", "Ferenz", "Fernsby", "Fezziwig", "Fiche", "Fielding", "Finch", "Finching", "Finchum", "Fingermann", "Fink-Nottle", "Finn", "Firkin", "Fishman", "Fissolo", "Fitzgeoffrey", "Fitzgerald", "Fitzherbert", "Fitzpatrick", "Fitzwarren", "Fitzwilliam", "Fizkin", "Flanagan", "Flashman", "Fleetwood", "Fleiss", "Flintwinch", "Flite", "Floquet", "Floris", "Fogerty", "Foley", "Follywolle", "Folsham", "Fontana", "Forge", "Fortescue", "Fosco", "Fotherington-Tomas", "Freeman", "Froggenhall", "Frollo", "Froning", "Frost", "Fry", "Fullbright", "Fuller", "Gabbard", "Gabel", "Gainsford", "Gaither", "Galindo", "Gamp", "Gannon", "Gardel", "Gargery", "Garland", "Gearey", "Gedge", "Gelpi", "Gilardi", "Giles", "Girdwood", "Gisborne", "Gladstone", "Glossop", "Goddard", "Godfrey", "Godwin", "Goodenouth", "Goodnestone", "Goodrington", "Gotti", "Goulding", "Gowan", "Graber", "Gradgrind", "Grainger", "Grave", "Grayper", "Greenway", "Greer", "Grell", "Grenefeld", "Gribble", "Gride", "Gridley", "Griffiths", "Griggs", "Grimbald", "Grimes", "Grimshaw", "Grimwig", "Grobbam", "Grofhurst", "Grooms", "Grueby", "Gulliver", "Gulpidge", "Gummidge", "Gundlach", "Guppy", "Gustavus", "Habgood", "Hadwin", "Haggard", "Hale", "Halleck", "Hamilton", "Hammer", "Hammond", "Handford", "Hanifin", "Harbottle", "Hardin", "Hardy", "Harker", "Harleth", "Harmon", "Harris", "Harthouse", "Hartright", "Hartsell", "Harvick", "Hatcher", "Hatton", "Havisham", "Hawdon", "Hawk", "Hawksworth", "Haystack", "Hayward", "Heep", "Heers", "Helbig", "Heller", "Hembree", "Hemmings", "Henchard", "Henderson", "Herncastle", "Herrera", "Hess", "Hester", "Hexam", "Hibben", "Hickey", "Higden", "Higginbottom", "Higgins", "Highmore", "Hightower", "Hilliard", "Hindley", "Hoagland", "Hobgood", "Hodder", "Holmwood", "Honeythunder", "Hood", "Hooper", "Hopkin", "Hornblower", "Horrocks", "Hortense", "Hostetler", "Howell", "Hubble", "Huffman", "Hunter", "Huntingdon", "Hutley", "Hutton", "Huxley", "Huxx", "Hyde", "Idelson", "Ichstein", "Inch", "Ingram", "Ives", "Jaggers", "Jammer", "Jarndyce", "Jarvis", "Jasper", "Jeddler", "Jellicoe", "Jellyby", "Jemmy", "Jett", "Jorkins", "Jurado", "Kaminsky", "Karenina", "Katts", "Kaylock", "Keagan", "Keckilpenny", "Kedgick", "Keene", "Keller", "Kellett", "Kenge", "Kenward", "Kenwigs", "Kerrigan", "Kersey", "Kessler", "Keys", "Kicklighter", "Kidd", "Kidgerbury", "Killingworth", "Kirby", "Kirsch", "Kitt", "Klecko", "Kobayashi", "Koker", "Kotek", "Koufax", "Kubiak", "Kuchar", "Kulikov", "Kumara", "Kuragin", "Lacer", "Lacroix", "Laker", "Landless", "Langdale", "Larkins", "Lattimore", "Laudermilk", "Lawler", "LeMay", "Lecter", "Ledford", "Leeford", "Lennox", "Lentz", "Lenville", "Lesnar", "Leventhorpe", "Lewsome", "Lichter", "Lightwood", "Lillyvick", "Linkinwater", "Liston", "Littimer", "Livesey", "Livingston", "Loddington", "Lomax", "Lombardo", "Londos", "Longford", "Longways", "Longwood", "Lopes", "Loughty", "Lovecraft", "Lovin", "Lowten", "Lupin", "Lynch", "MacQuoid", "Mackey", "Macklin", "Macmurdo", "Makepiece", "Maker", "Malenko", "Mallory", "Manders", "Manette", "Mann", "Mannix", "Mantalini", "Manus", "Marcheford", "Marino", "Marley", "Marshall", "Marshland", "Marton", "Massey", "Massingberd", "Matisse", "Mattingly", "Maylie", "McCabe", "McEachern", "McGillicutty", "McKracken", "Meagles", "Meer", "Meilyr", "Melia", "Mercer", "Merdle", "Messi", "Metcalf", "Metz", "Micawber", "Michelgrove", "Minter", "Mintz", "Modest", "Moffett", "Molinari", "Monks", "Montacute", "Montoya", "Moody", "Moreau", "Morikowa", "Morozov", "Morris", "Mortimer", "Moss", "Motter", "Mudd", "Mulder", "Mullard", "Mullinax", "Murdstone", "Murillo", "Namath", "Napier", "Neckett", "Neiderman", "Nemo", "Nethercoat", "Newton", "Nickleby", "Nightingale", "Nipper", "Noggs", "Noonan", "Norris", "Norwood", "Novak", "Nubbles", "Nunley", "Nunsuch", "Nupkins", "Nygard", "Nyland", "Nystrom", "O'Bannon", "O'Brien", "O'Donnell", "O'Dowd", "O'Leary", "O'Malley", "O'Rourke", "Oak", "Oakley", "Oberman", "Odenkirk", "Ogle", "Ogletree", "Oldman", "Ollenshaw", "Orlick", "Ortega", "Orton", "Ottinger", "Otto", "Overholt", "Paisley", "Palmer", "Pancks", "Pardiggle", "Parker", "Patterson", "Pavlov", "Pawar", "Pawkins", "Payne", "Peacock", "Pecksniff", "Peerybingle", "Peggotty", "Pell", "Pemberton", "Penhallick", "Pennyways", "Pepin", "Pepper", "Perkins", "Perrin", "Phillifent", "Phillotson", "Pickering", "Pickwick", "Pinch", "Pinder", "Pinkerton", "Platt", "Plimmswood", "Plornish", "Plummer", "Pocket", "Podsnap", "Poldervaart", "Pollock", "Pontmercy", "Poorgrass", "Popelier", "Portington", "Portis", "Pott", "Powell", "Prescott", "Prosser", "Pumblechook", "Qua", "Quaice", "Quaid", "Quall", "Quan", "Quartermaster", "Quilp", "Quimby", "Quinion", "Quint", "Quirico", "Quivers", "Radfoot", "Radiguet", "Raffles", "Raggles", "Rainwater", "Ramirez", "Ramos", "Rand", "Redlaw", "Redman", "Repetto", "Rhodes", "Ribeiro", "Richter", "Riderhood", "Rifkin", "Rigaud", "Riggs", "Ripley", "Ripperton", "Robin", "Rochefort", "Rokesmith", "Romirez", "Romo", "Rooney", "Rosenberg", "Rossetti", "Rossi", "Rostov", "Rostova", "Rouncewell", "Rowe", "Rowland", "Rudd", "Ruddock", "Rudge", "Ruthven", "Sabanthia", "Saintaubin", "Sallow", "Salt", "Saltonstall", "Santos", "Sarkis", "Saunterton", "Savoy", "Saxon", "Scarcliff", "Scardino", "Scroggs", "Scrooge", "Sedley", "Seibert", "Seward", "Seymour", "Sharp", "Shaw", "Shea", "Sheepshanks", "Sheills", "Sherbourne", "Shevington", "Shingleton", "Shufflebottom", "Sibari", "Sikes", "Silverman", "Simerly", "Simple", "Sinnett", "Skimpole", "Skirth", "Slammer", "Sloane", "Slowboy", "Slumkey", "Slyme", "Smallweed", "Smike", "Smollett", "Snagsby", "Snedeker", "Snodgrass", "Soria", "Sorrel", "Sotelo", "Southdown", "Sowerberry", "Sparkler", "Sparrow", "Spears", "Spebbington", "Spelman", "Spenlow", "Spode", "Spottletoe", "Squeers", "Squod", "Stagg", "Stamper", "Stanbury", "Standifer", "Stapleton", "Steerforth", "Stevenson", "Steyne", "Stiggins", "Stiltstalking", "Stitchen", "Stoddeley", "Streelman", "Stroud", "Stubble", "Summerson", "Surrett", "Swafford", "Swartz", "Sweedlepipe", "Sweeney", "Swiatek", "Swidger", "Swift", "Swiveller", "Tabrizi", "Tackleton", "Tait", "Tamlin", "Tapley", "Tapp", "Tappertit", "Tartar", "Tattycoram", "Taymor", "Teague", "Templeton", "Tetterby", "Thain", "Theo", "Thorisdottir", "Thornburgh", "Thornton", "Threepwood", "Throckmorton", "Tillerson", "Tippett", "Tisher", "Tissiman", "Todgers", "Toller", "Toodle", "Tooms", "Topsfield", "Torrington", "Tox", "Traddles", "Tregonwell", "Trelawney", "Trench", "Trent", "Tringham", "Tripper", "Trotter", "Trotwood", "Troy", "Trumbald", "Trumbo", "Trumpington", "Tuco", "Tulkinghorn", "Tupman", "Turner", "Turpin", "Turveydrop", "Tussac", "Twist", "Twistleton", "Ulett", "Underhill", "Unger", "Uplinger", "Urwin", "Vanderberg", "Veal", "Venn", "Verinder", "Vestine", "Vinge", "Visser", "Voight", "Voles", "Vroman", "Vye", "Wade", "Wagner", "Wainright", "Wakefield", "Walcott", "Waldegrave", "Wallace", "Warbulton", "Wardle", "Wardyworth", "Warrick", "Waterbrook", "Weaver", "Webb", "Wegg", "Weller", "Wemmickis", "Wenham", "Westlock", "Weston", "Wexler", "Whalen", "Whesker", "Whimple", "Whipple", "Whiston", "Whitby", "Whitlock", "Whitner", "Whittock", "Wickes", "Wickfield", "Widdowson", "Wight", "Wigsby", "Wilberforce", "Wilde", "Wildeve", "Willardsey", "Willcotts", "Williams", "Winchell", "Wingfield", "Winkle", "Winstringham", "Winterbottom", "Winters", "Winthrop", "Wirt", "Witherfield", "Withers", "Withinghall", "Wititterley", "Witt", "Wolfenstein", "Wolownik", "Wolstonton", "Woodard", "Woodbrygg", "Woodcourt", "Woodland", "Woodson", "Wooster", "Wooten", "Wopsle", "Wraith", "Xanders", "Xang", "Xenakis", "Ximinez", "Yaeger", "Yale", "Yamaguchi", "Yanetta", "Yarborough", "Yates", "Yearwood", "Yeobright", "York", "Younger", "Yount", "Zabik", "Zabinski", "Zader", "Zavaroni", "Zeigler", "Zeller", "Zephyr", "Zimmerman", "Zondervan", "Zukoff");

      // misc.
      db.names.angels.push(
         "Abathar", "Ananiel", "Arariel", "Ariel", "Armaros", "Azrael", "Barachiel", "Batariel", "Bezaliel", "Camael", "Cassiel", "Chazaqiel", "Dadrail", "Eleleth", "Gabriel", "Gadreel", "Hadraniel", "Hahasiah", "Hanibal", "Haniel", "Harut", "Hashmal", "Hofniel", "Imamiah", "Jegudiel", "Jehoel", "Jequn", "Jerahmeel", "Jophiel", "Kepharel", "Kushiel", "Lailah", "Mebahiah", "Melek Taus", "Metatron", "Michael", "Moroni", "Munkar", "Muriel", "Nanael", "Netzach", "Nithael", "Nuriel", "Ophaniel", "Pahaliah", "Penemue", "Phanuel", "Poyel", "Pravuil", "Puriel", "Radueriel", "Raguel", "Ramiel", "Raphael", "Raziel", "Rikbiel", "Sabriel", "Sachiel", "Sahaquiel", "Samyaza", "Sandalphon", "Sarathiel", "Sariel", "Schemhampharae", "Selaphiel", "Seraphiel", "Shamnail", "Shamsiel", "Sidriel", "Temeluchus", "Tennin", "Turail", "Turiel", "Uriel", "Uziel", "Vasiariah", "Vehuel", "Wormwood", "Yarhibol", "Yomiel", "Zachariel", "Zadkiel", "Zaphkiel", "Zaqiel", "Zephaniel", "Zephon");
      db.names.bible.patriarchs.push(
         "Adam", "Eve", "Cain", "Abel", "Seth", "Enos", "Irad", "Kenan", "Mehujael", "Mahalalel", "Methushael", "Jared", "Adah", "Lamech", "Zillah", "Enoch", "Jabal", "Jubal", "Tubal-Cain", "Naamah", "Methuselah", "Noah", "Shem", "Ham", "Japheth", "Elam", "Ashur", "Arphaxad", "Lud", "Aram", "Salah", "Eber", "Peleg", "Joktan", "Reu", "Serug", "Nahor", "Terah");
      db.names.demons.push(// for dangerous islands
         "Aamon", "Abaddon", "Abraxas", "Abyzou", "Achlys", "Agares", "Agiel", "Akuma", "Alastor", "Amdusias", "Andhaka", "Apophis", "Astaroth", "Azazel", "Baal", "Baku", "Balam", "Banshee", "Baphomet", "Belial", "Charun", "Dantalion", "Ghaddar", "Gorgon", "Jinn", "Kali", "Lilith", "Maricha", "Pazuzu", "Puloman", "Rahab", "Saleos", "Samael", "Shedim", "Surgat", "Tannin", "Toyol", "Vassago");
      db.names.exoticPlaces.push(// Real place names, for ship names, etc. Also use "The" + girl's name for the ship
         "Hispaniola", "Alamonde", "Annenkov", "Atiu", "Babushkin", "Challenger", "Debutante", "Espiritu", "Figure of Eight", "Five isters", "Honshu", "Kiribati", "Kiwai", "Kotor", "Lantern", "Mangareva", "Macquarie", "Merir", "Mindanao", "Occidental", "Palawan", "Palmas", "Palmyra", "Pamati", "Pearl", "Petit Aiguille", "Quito", "Rarotonga", "Ringgold", "Roche Debout", "San Cristobal", "Santa Cruz", "Santa Isabel", "Sentinelle", "Sulawesi", "Tierra del Fuego", "Tobi");
      db.names.explorers.push(// date order, to 1500. Best:Xu Fu, Lavrador, Joao Serrao
         "Hippalus", "Posidonius", "Eudoxus", "Xu Fu", "Nearchus", "Pytheas", "Saint Brendan", "Euthymenes", "Hanno", "Himilco", "Scylax", "Du Huan", "Ingolfur Arnarson", "Khashkhash", "Naddoddur", "Gardar Svavarsson", "Floki Vilgeroarson", "Erik the Red", "Bjarni Herjulfsson", "Leif Eriksson", "Thorfinn Karlsefni", "Guoriour Porbjarnardottir", "Benjamin of Tudela", "The Vivaldi Brothers", "Marco Polo", "Ibn Battuta", "Wang Dayuan", "Goncalo Álvares", "Hong Bao", "John Cabot", "Sebastian Cabot", "Alvise Cadamosto", "Alvaro Caminha", "Pero Vaz de Caminha", "Diogo Cao", "Nicolau Coelho", "Niccolo Da Conti", "Joao Corte-Real", "Jean Cousin", "Bartolomeu Dias", "Pedro Escobar", "Paulo da Gama", "Lopes Goncalves", "Zheng He", "Gaspar de Lemos", "Alvaro Martins", "Duarte Pacheco Pereira", "Martin Alonzo Pinzon", "Pero de Alenquer", "Jean Alfonse", "Duarte Barbosa", "Pero de Barcelos", "Pedro Alvares Cabral", "Goncalo Coelho", "Juan de la Cosa", "Vasco da Gama", "Joao Fernandes Lavrador", "Joao de Lisboa", "Ferdinand Magellan", "Fernao de Noronha", "Joao Serrao", "Ludovico di Varthema", "Amerigo Vespucci");
      db.names.heroes.push(
         "Aeneas", "Ahmed", "Aladdin", "Ali Baba", "Ali Shar", "Arash", "Arngrim", "Baba Nanak", "Badroulbadour", "Douban", "Dunyazad", "Enkidu", "Evander", "Gilgamesh", "Giv", "Gukumatz", "Hanuman", "Helgi", "Hercules", "Hussain", "Iktomi", "Izanagi", "Izanami", "Jafar", "Janus", "Jingu", "Karna", "Kaveh", "King Shivi", "Kintaro", "Krishna", "Kukulkan", "Lakshmi", "Loki", "Mahavira", "Manco Capac", "Manu", "Marcus", "Maruf", "Morgiana", "Odin", "Parashurama", "Prometheus", "Quirinus", "Rama", "Remus", "Rishabha", "Romulus", "Rostam", "Scheherazade", "Shah Zaman", "Shahryar", "Shahzaman", "Shakuni", "Sigurd", "Silvius", "Sinbad", "Sita", "Starkad", "Susanoo", "Theseus", "Thor", "Triptolemos", "Tsukuyomi", "Vili", "Viracocha", "Zeyn Alasnam", "Ziusudra", "Zoroaster", "Zumurrud");
      db.names.gods.canaanite.push(
         "Adonis", "Aglibol", "Arsu", "Attar", "Azizos", "Ba'al Hadad", "Ba'al Hermon", "Baal Hammon", "Baalshamin", "Baal-zephon", "Bel", "Chemosh", "Dagon", "El", "Eshmun", "Gad", "Horon", "Kothar-wa-Khasis", "Lotan", "Malakbel", "Manuzi", "Marqod", "Melqart", "Misor", "Moloch", "Mot", "Resheph", "Shadrafa", "Shachar", "Shalim", "Shamayim", "Sydyk", "Yam", "Yarhibol", "Yarikh");
      db.names.gods.egyptian.push(
         "Aker", "Amun", "Anhur", "Anubis", "Aten", "Atum", "Bennu", "Geb", "Hapi", "Horus", "Khepri", "Khnum", "Khonsu", "Maahes", "Nefertum", "Osiris", "Ptah", "Ra", "Set", "Shu", "Sobek", "Tatenen", "Thoth");
      db.names.gods.gnostic.push(// includes Norea and Sophia (female)
         "Abatur", "Abraxas", "Aeon", "Barbelo", "The Demiurge", "The Father of Greatness", "The Monad", "Norea", "Ptahil", "Setheus", "Sophia");
      db.names.gods.aeons.push(
         "Bythos", "Sige", "Charis", "Ennoea", "Thelesis", "Monogenes", "Aletheia", "Anthropos", "Ecclesia", "Logos", "Zoe", "Bythius", "Mixis", "Ageratos", "Henosis", "Autophyes", "Hedone", "Acinetos", "Syncrasis", "Macaria", "Paracletus", "Pistis", "Patricos", "Elpis", "Metricos", "Agape", "Synesis", "Ecclesiasticus", "Macariotes", "Theletos");
      db.names.gods.greek.push(// see also "titans"
         "Achelous", "Aeolus", "Aether", "Alastor", "Apollo", "Ares", "Aristaeus", "Asclepius", "Attis", "Boreas", "Caerus", "Castor", "Cerus", "Charon", "Crios", "Cronus", "Dinlas", "Deimos", "Dionysus", "Erebus", "Eros", "Eurus", "Glaucus", "Hades", "Helios", "Hephaestus", "Heracles", "Hermes", "Hesperus", "Hymenaios", "Hypnos", "Kratos", "Momus", "Morpheus", "Nereus", "Notus", "Oceanus", "Oneiroi", "Paean", "Pallas", "Pan", "Plutus", "Pollux", "Pontus", "Poseidon", "Pricus", "Tartarus", "Thanatos", "Triton", "Typhon", "Uranus", "Zelus", "Zephyrus", "Zeus");
      db.names.gods.hittite.push(
         "A'as", "Aduntarri", "Alalus", "Amunki", "Apaliunas", "Api", "Aranzah", "Arma", "Aruna", "Elkunirsa", "Ellel", "Enzili", "Halki", "Hasameli", "Hatepuna", "Hazzi", "Irpitiga", "Istanu", "Kaskuh", "Khebe", "Kumarbi", "Kurunta", "Lelwani", "Minki", "Miyatanzipa", "Namsara", "Nara", "Pihassassa", "Pirwa", "Rundas", "Sandas", "Sarruma", "Sutekh", "Suwaliyat", "Tarhunna", "Tarhunt", "Taru", "Tasimmet", "Tasmisu", "Telipinu", "Teshub", "Tilla", "Ubelluris", "Wurrukatte", "Zababa", "Zaliyanu", "Zashapuna", "Zintuhi", "Zulki");
      db.names.gods.titans.push(
         "Adanos", "Andes", "Anytus", "Astraeus", "Atlas", "Coeus", "Crius", "Cronos", "The Curetes", "Epimetheus", "The Gigantes", "Helios", "Hoplodamos", "Hyperion", "Iapetos", "Lelantos", "Megamedes", "Melisseus", "Menoitios", "Mylinos", "Okeanos", "Olymbros", "Ophion", "Pallas", "Perses", "Phorkys", "Polos", "Sykeus", "Titan");
      db.names.goddesses.canaanite.push(
         "Anat", "Arsay", "Athirat", "Astoreth", "Asherah", "Ashtar-Chemosh", "Ashima", "Atargatis", "Baalah", "Ba'alat Gebal", "Ishat", "Kotharat", "Liluri", "Nikkal-wa-Ib", "Pidray", "Qadeshtu", "Shapshu", "Tallay");
      db.names.goddesses.egyptian.push(
         "Amunet", "Anuket", "Bastet", "Bat", "Hathor", "Heqet", "Hesat", "Imentet", "Isis", "Maat", "Menhit", "Mut", "Neith", "Nekhbet", "Nephthys", "Nepit", "Nut", "Pakhet", "Renenutet", "Satet", "Sekhmet", "Tefnut", "Wadjet", "Wosret");
      db.names.goddesses.greek.push(
         "Achelois", "Alcyone", "Alectrona", "Amphitrite", "Antheia", "Apate", "Aphaea", "Aphrodite", "Artemis", "Astraea", "Athena", "Atropos", "Bia", "Brizo", "Calliope", "Calypso", "Celaeno", "Ceto", "Circe", "Clio", "Clotho", "Cybele", "Demeter", "Doris", "Eileithyia", "Electra", "Elpis", "Enyo", "Erato", "Eris", "Euterpe", "Gaia", "Harmonia", "Hebe", "Hecate", "Hemera", "Hera", "Hestia", "Hygea", "Iris", "Keres", "Kotys", "Lachesis", "Maia", "Mania", "Melpomene", "Merope", "Metis", "Nemesis", "Nike", "Nyx", "Peitho", "Persephone", "Pheme", "Polyhymnia", "Sterope", "Styx", "Taygete", "Terpsichore", "Thalia", "The Erinnyes", "The Graces", "Thetis", "Tyche", "Urania");
      db.names.goddesses.titans.push(
         "Anchiale", "Asteria", "Aura", "Clymene", "Dione", "Eos", "Eurybia", "Eurynome", "Hecate", "Leto", "Metis", "Mnemosyne", "Phoebe", "Rhea", "Selene", "Styx", "Tethys", "Theia", "Themis");
      db.names.goddesses.hittite.push(
         "Arinna", "Aserdus", "Gul Ses", "Hannahannah", "Hanwasuit", "Hapantali", "Huttellurra", "Inara", "Irsirra", "Ishara", "Ishtar", "Kamrusepa", "Mezulla", "Sala", "Sauska", "Tarawa");
      db.names.magic.push(
         "Abramelin", "Akashi", "Apparitions", "Argenteum", "Asatru", "Banishing", "Bolines", "Bon", "Chalice", "Chaos", "Charm", "Covens", "Crystals", "Da'at", "Damballa", "Druids", "Elementals", "Enchanting", "Galdr", "Gematria", "Gnosis", "Goetia", "Hadit", "Haruspicy", "Hoodoo", "Invocation", "Kundalini", "Lucifer", "Maleficium", "Merkabah", "Naguals", "Nephilim", "Nuit", "Obeah", "Omens", "Oracles", "Penuel", "Qabalah", "Qi", "Quareia", "Runes", "Scrying", "Seidr", "Servitors", "Sigils", "Stregheria", "Ukehi", "Vodun");
      db.names.myth.creatures.push(
         "Abaia", "Adarna", "Aethon", "Ajatar", "Akhlut", "Amarok", "Anansi", "Arion", "Asena", "Asura", "Bakeneko", "Basilisk", "Bigfoot", "Bunyip", "Buraq", "Caladrius", "Cerberus", "Cetan", "Chamrosh", "Chimera", "Cipactli", "Cockatrice", "Curupira", "Dahu", "Dilong", "Dragon", "Dullahan", "Encantado", "Fenghuang", "Fenrir", "Fucanglong", "Galatea", "Garuda", "Gef", "Goldhorn", "Griffin", "Grootslang", "Hell Hound", "Hydra", "Ifrit", "Ipotane", "Jengu", "Jotun", "Kappa", "Karkinos", "Kelpie", "Kishi", "Kraken", "Kui", "Lamassu", "Lamia", "Lich", "Lindworm", "Longma", "Lorelei", "Maenad", "Makara", "Manticore", "Minotaur", "Moon rabbit", "Orthrus", "Ouroboros", "Peluda", "Penghou", "Piasa", "Pooka", "Qiulong", "Raiju", "Roc", "Selket", "Selkie", "Shenlong", "Sirin", "Tanuki", "Tianlong", "Tomte", "Tupilaq", "Turul", "Vetala", "Wendigo", "Wyvern", "Yinglong", "Yokai");
      db.names.myth.lands.push(// "island"+name // lands from mythology with no certain location
         "Alfheim", "Annwn", "Amaravati", "Arcadia", "Axis Mundi", "Aztlan", "Baltia", "Brahmapura", "Hy-Brasil", "Brittia", "Cloud cuckoo land", "Cockaigne", "Elysian Fields", "Hawaiki", "of the Blessed", "Jotunheim", "Laestrygon", "Lemuria", "Lintukoto", "Lyonesse", "Meropis", "Mictlan", "Mu", "Muspelheim", "Naraka", "Nirvana", "Pleroma", "Samavasarana", "Summerland", "Svarga", "Westernesse");
      db.names.pharaohs.push(
         "Narmer", "Menes", "Djoser", "Snefru", "Khufu", "Khafre", "Neferefre", "Pepi", "Senusret", "Hatshepsut", "Amenhotep", "Tutankhamun", "Seti", "Merenptah", "Ramses");
      db.names.nouns.push(  // includes some place names.
         "Adder", "Adjunct", "Adobe", "Adze", "Aegean", "Aerie", "Afghan", "Aggregate", "Agora", "Airway", "Aisle", "Alcazar", "Alcove", "Alehouse", "Aloes", "Alpaca", "Alpenstock", "Altar", "Amazon", "Ammonite", "Amphora", "Anchor", "Andromeda", "Angara", "Anklet", "Antares", "Anthill", "Antique", "Anvil", "Apiary", "Apple", "Applecart", "Apron", "Apse", "Apsis", "Aquarium", "Aquarian", "Aquifer", "Aquila", "Arabesque", "Ararat", "Aras", "Araxes", "Arbour", "Arcade", "Argyll", "Aries", "Armature", "Armoury", "Arras", "Arrowhead", "Arsenal", "Artillery", "Ascent", "Ascot", "Assembly", "Asylum", "Atheneum", "Atlantic", "Atlas", "Atrium", "Attic", "Auberge", "Auger", "Aviary", "Avon", "Awl", "Axe", "Axis", "Axle", "Babushka", "Back", "Backstay", "Backsword", "Badlands", "Bagpipe", "Baikal", "Bailey", "Bakehouse", "Balaclava", "Balaton", "Balbriggan", "Bale", "Balmoral", "Bandana", "Banjo", "Baptistry", "Bar", "Barbershop", "Barrack", "Barrelhouse", "Bastille", "Bastion", "Bathhouse", "Batiste", "Bayou", "Bazaar", "Beaver", "Beehive", "Belfry", "Bell", "Belmont", "Belvedere", "Bentwood", "Bighorn", "Birch", "Birchbark", "Birdfeeder", "Birdhouse", "Birdnest", "Bludgeon", "Bobsled", "Bolero", "Bonanza", "Bond", "Bookbinder", "Boomerang", "Bootstrap", "Botanical", "Bottle", "Bottleneck", "Bottomland", "Bounty", "Bowknot", "Bowl", "Bowlder", "Bowler", "Bowline", "Brass", "Brewery", "Briar", "Brickfield", "Brickkiln", "Brickyard", "Brigand", "Broadaxe", "Broadside", "Broadsword", "Brogue", "Bronze", "Broom", "Brownstone", "Buckler", "Buckskin", "Bullhorn", "Bullion", "Bullpen", "Burberry", "Burrow", "Cabaret", "Caber", "Caftan", "Calculus", "Caldera", "Callisto", "Candelabra", "Candlewick", "Canon", "Capricorn", "Cardcastle", "Cardhouse", "Cargo", "Carpathian", "Carrack", "Cartouche", "Cartwheel", "Cashmere", "Cassiopeia", "Cassock", "Catacomb", "Catchment", "Cathouse", "Catskills", "Caucasus", "Cauldron", "Cavern", "Celesta", "Cellarage", "Cenotaph", "Centaurus", "Centrefield", "Cesspit", "Cesspool", "Chalkpit", "Chancellery", "Chandelier", "Chapel", "Chapterhouse", "Charcoal", "Chariot", "Charioteer", "Charnel", "Charterhouse", "Chase", "Chimney", "Chimneystack", "Choir", "Cirque", "Cirrus", "Claxon", "Claymore", "Cleaver", "Clipper", "Clodhopper", "Clothespin", "Cloverleaf", "Clubhead", "Clyde", "Cobble", "Cobblestone", "Cobweb", "Cockleshell", "Coffin", "Cogwheel", "Coliseum", "Colonnade", "Colosseum", "Columbia", "Comfort", "Compact", "Concourse", "Confetti", "Congo", "Cookhouse", "Copperplate", "Cordage", "Cordite", "Corker", "Corkscrew", "Corncrib", "Corner", "Cornerstone", "Cornet", "Cornice", "Corona", "Corral", "Corsair", "Cosmos", "Cottar", "Cotton", "Counterpane", "Counterweight", "Courthouse", "Cowbarn", "Cowbell", "Coxcomb", "Cradle", "Craft", "Crag", "Cramp", "Crater", "Cream", "Creamery", "Credence", "Credenza", "Crenel", "Crenelation", "Crepe", "Crest", "Crib", "Crimper", "Crochet", "Crook", "Crown", "Crucible", "Ruet", "Crust", "Crutch", "Crypt", "Crystal", "Cudgel", "Culvert", "Cumberland", "Curbstone", "Curler", "Customhouse", "Cutlass", "Cutter", "Cygnus", "Cylinder", "Dairy", "Danube", "Dart", "Daub", "Daybook", "Daystar", "Deadeye", "Deanery", "Deep", "Deerstalker", "Deft", "Detour", "Dewar", "Diaglyph", "Diary", "Digger", "Diggings", "Dipper", "Dirk", "Distaff", "Distillery", "Doeskin", "Doghouse", "Dogtooth", "Dolman", "Doohickey", "Doublet", "Doubletree", "Dovecote", "Dovetail", "Drapery", "Drawbridge", "Dredger", "Drey", "Dugout", "Dulcimer", "Dungeon", "Earthenware", "Earthwork", "Easel", "Eaves", "Echelon", "Echinus", "Eggshell", "Egis", "Eiderdown", "Elbow", "Eli", "Embankment", "Embroidery", "Ensign", "Entrenchment", "Epaulette", "Erie", "Escarpment", "Escutcheon", "Etagere", "Ether", "Etna", "Euphoriant", "Euphrates", "Excalibur", "Eyebath", "Eyepatch", "Eyrie", "Fabric", "Face", "Facility", "Facsimile", "Factory", "Falderol", "Fall", "Fallow", "Fan", "Fantail", "Farthingale", "Fashion", "Fatigue", "Faucet", "Feather", "Featherbed", "Fedora", "Feedbag", "Feeder", "Feedlot", "Felt", "Fen", "Fenland", "Fetter", "Fez", "Fibre", "Fiddle", "Fiddlestick", "Fig", "Figleaf", "Figurine", "Filagree", "Filament", "Filler", "Fillet", "Fin", "Finger", "Fireball", "Firebox", "Firebrick", "Fireguard", "Firehouse", "Fireside", "First", "Fishbowl", "Fissure", "Fixer", "Flack", "Flag", "Flagpole", "Flagstaff", "Flagstone", "Flake", "Flannel", "Flap", "Flare", "Flash", "Flat", "Flatbed", "Flatiron", "Flatware", "Fleabag", "Fleapit", "Fleece", "Flight", "Flint", "Flintlock", "Flipper", "Float", "Flood", "Floodgate", "Floodplain", "Floor", "Floorboard", "Florist", "Flotsam", "Flowerbed", "Flowerpot", "Flue", "Fluff", "Flute", "Fly", "Flytrap", "Flywheel", "Foam", "Fob", "Foghorn", "Foible", "Foil", "Fold", "Foliage", "Folio", "Font", "Foodstuff", "Footage", "Football", "Footbath", "Foothold", "Footplate", "Footstool", "Ford", "Fore", "Forecastle", "Fork", "Form", "Fort", "Forum", "Fossil", "Foundation", "Fount", "Fountain", "Foxhole", "Foyer", "Fraction", "Fracture", "Frame", "Freight", "Fresco", "Freshener", "Fret", "Fretwork", "Friary", "Fringe", "Frippery", "Frock", "Frog", "Front", "Froth", "Fruit", "Frypan", "Fulcrum", "Funicular", "Funnel", "Fur", "Furnace", "Furrow", "Fuse", "Future", "Gabardine", "Gable", "Gadget", "Gaff", "Gag", "Galleon", "Gallery", "Gallows", "Gallstone", "Game", "Gangplank", "Gangway", "Gantry", "Gap", "Garbage", "Gargoyle", "Garibaldi", "Garment", "Garnish", "Garotte", "Garrison", "Gas", "Gasbag", "Gasket", "Gate", "Gatehouse", "Gatepost", "Gateway", "Gauge", "Gauntlet", "Gauze", "Gavel", "Gazebo", "Gear", "Gearing", "Gel", "Gemini", "Geode", "Georgette", "Geyser", "Ghillie", "Giant", "Gibbet", "Gig", "Gildhall", "Gilding", "Gilt", "Gimbal", "Gimcrack", "Gimlet", "Gin", "Gingham", "Girder", "Girdle", "Girth", "Glacier", "Glass", "Glasscutter", "Glasshouse", "Glassworks", "Glen", "Globe", "Glyph", "Go", "Goad", "Goalpost", "Goblet", "Goggles", "Goldbrick", "Goldmine", "Gondola", "Gong", "Gorge", "Gossamer", "Gouache", "Gouge", "Governor", "Gown", "Graduate", "Graffiti", "Grail", "Granary", "Grandstand", "Grange", "Granite", "Granule", "Grape", "Grapeshot", "Grapple", "Grate", "Grating", "Gravestone", "Greasepaint", "Greatcoat", "Greave", "Greengrocer", "Greenhouse", "Greensward", "Griddle", "Grinder", "Grindstone", "Gripsack", "Grizzle", "Grommet", "Grotesque", "Grotto", "Growler", "Guard", "Guardhouse", "Gubbins", "Guest", "Guildhall", "Guillotine", "Guitar", "Gulag", "Gumshoe", "Gunnery", "Gunnysack", "Gurney", "Gutter", "Gym", "Gymslip", "Gyro", "Haberdasher", "Habergeon", "Habitation", "Hack", "Hackbut", "Hackney", "Hail", "Hair", "Hairball", "Hairpin", "Halberd", "Hall", "Halter", "Hammerhead", "Hammock", "Hamper", "Hand", "Handbarrow", "Handbell", "Handcart", "Handcraft", "Handhold", "Handicraft", "Handiwork", "Handle", "Handrest", "Hangar", "Hansom", "Harem", "Harmonica", "Harness", "Harp", "Harpoon", "Hasp", "Hassock", "Hat", "Hatchet", "Havelock", "Haven", "Hayfork", "Hayloft", "Hazard", "Head", "Headfast", "Headrest", "Headstone", "Heap", "Hearse", "Heart", "Hearth", "Hearthstone", "Hedge", "Hedgerow", "Helix", "Helm", "Hemp", "Henhouse", "Heraldry", "Hermitage", "Herringbone", "Hessian", "Hideaway", "High", "Highland", "Highroad", "Highway", "Hillside", "Hinge", "Hipflask", "Hippodrome", "Hive", "Hoarding", "Hobble", "Hobby", "Hobnail", "Hod", "Hoe", "Hogan", "Hog", "Hogshead", "Holdfast", "Hollow", "Home", "Homespun", "Homestead", "Homestretch", "Honey", "Honeycomb", "Hook", "Hookah", "Hoop", "Hoosegow", "Hooter", "Hopper", "Horn", "Hornpipe", "Horseback", "Horsehair", "Horseshoe", "Hose", "Hosepipe", "Hosiery", "Hospice", "Hospital", "Hostelry", "Hotbed", "Hotbox", "Hothouse", "Hotplate", "Hourglass", "Hubbard", "Hudson", "Humber", "Ice", "Icebox", "Icehouse", "Icepick", "Icon", "Idol", "Igloo", "Illumination", "Imitation", "Impeller", "Imperial", "Import", "Incendiary", "Incinerator", "Inductor", "Infirmary", "Inkpad", "Inkpot", "Inkwell", "Inn", "Insole", "Instrument", "Interchange", "Intrenchment", "Invention", "Inventory", "Iodine", "Ion", "Iron", "Ironmonger", "Ironware", "Ironworks", "Jacket", "Jackhammer", "Jackknife", "Jackscrew", "Ailhouse", "James", "Jampot", "Jar", "Javelin", "Jaw", "Jersey", "Jet", "Jetsam", "Jewel", "Jib", "Jig", "Jigsaw", "Job", "Jodhpur", "John", "Joiner", "Joist", "Joker", "Jolly", "Journal", "Judas", "Jug", "Juggernaut", "Jumper", "Junk", "Kaftan", "Kayak", "Kazoo", "Keep", "Keepsake", "Keg", "Kennel", "Kerbstone", "Kettle", "Kettledrum", "Key", "Keystone", "Kibble", "Kilt", "Kimono", "Kingpin", "Kirk", "Kitbag", "Kite", "Kitsch", "Klavier", "Klaxon", "Knapsack", "Knave", "Knight", "Knitwear", "Knockabout", "Knot", "Labyrinth", "Lace", "Lacuna", "Ladle", "Lance", "Lancet", "Latchkey", "Laudanum", "Laurel", "Leafy", "Lectern", "Lederhosen", "Ledger", "Levee", "Libra", "Library", "Limekiln", "Limelight", "Lilac", "Linen", "Liniment", "Lintel", "Livery", "Lodestar", "Lodge", "Longbeard", "Lookout", "Loveseat", "Lowland", "Lozenge", "Lumber", "Lumberjack", "Lute", "Lyceum", "Lynchpin", "Macadam", "Machete", "Macintosh", "Mack", "Mackenzie", "Mackinaw", "Macrame", "Madeira", "Madras", "Magdalena", "Magnet", "Magnum", "Main", "Mainspring", "Majolica", "Makalu", "Malacca", "Manakin", "Mandala", "Mandolin", "Mandril", "Manger", "Mangle", "Mannequin", "Manor", "Manse", "Mantrap", "Maraca", "Marble", "Mare", "Maria", "Marina", "Marline", "Marlinspike", "Marquetry", "Marquise", "Mars", "Marseille", "Marsh", "Martingale", "Matchwood", "Matrix", "Matterhorn", "Mattock", "Mausoleum", "Mayflower", "Maypole", "Meander", "Meerschaum", "Meetinghouse", "Megalith", "Mekong", "Memorial", "Menorah", "Merchandise", "Mercury", "Meteor", "Middling", "Milk", "Milkwagon", "Mill", "Milldam", "Millinery", "Millpond", "Millrace", "Millstone", "Minaret", "Mineshaft", "Mink", "Minster", "Mitre", "Moat", "Moleskin", "Monastery", "Monocle", "Monolith", "Monument", "Moorland", "Mortice", "Mortuary", "Mosaic", "Mural", "Museum", "Nail", "Narrow", "Nautilus", "Nave", "Nebuchadnezzar", "Nebula", "Needle", "Neptune", "Ness", "Niagara", "Nib", "Nile", "Nimbus", "Ninepin", "Noose", "Nostrum", "Nugget", "Nunnery", "Nursery", "Oarlock", "Oasis", "Obelisk", "Oboe", "Observatory", "Ocarina", "Oeuvre", "Oilskin", "Oilstone", "Olympusonega", "Opera", "Opium", "Orchestra", "Organ", "Orinoco", "Orion", "Orphanage", "Ossuary", "Ottoman", "Outcrop", "Outfield", "Outpost", "Oven", "Overhang", "Oxbridge", "Oxcart", "Oxford", "Packinghouse", "Packsaddle", "Paddlewheel", "Pagoda", "Palace", "Palaestra", "Paleolith", "Panacea", "Panetella", "Pangaea", "Panhandle", "Panpipe", "Parapet", "Parnassus", "Parsonage", "Parthenon", "Parvis", "Paternoster", "Patina", "Patisserie", "Pavilion", "Peacoat", "Peephole", "Pegasus", "Pegleg", "Pelmet", "Pendant", "Pendulum", "Penn", "Perfumery", "Periwig", "Perseus", "Petard", "Petticoat", "Pharos", "Phobos", "Physic", "Piccolo", "Pickaxe", "Piedmont", "Pikestaff", "Pillory", "Pilothouse", "Pinafore", "Pinnacle", "Pithead", "Plantation", "Plaza", "Pleiades", "Ploughshare", "Poachers", "Polaris", "Poleaxe", "Polestar", "Polynya", "Poncho", "Pond", "Ponycart", "Porcelain", "Portcullis", "Portmanteau", "Pothouse", "Potomac", "Potsherd", "Poultice", "Powderpuff", "Presbytery", "Pretorium", "Primary", "Priory", "Privateer", "Proscenium", "Psaltery", "Pullman", "Pulpit", "Puppeteer", "Pyramid", "Quadrangle", "Quagmire", "Quarry", "Quarterdeck", "Quarterstaff", "Quickener", "Quicksand", "Quill", "Quiver", "Rabbit", "Rabbit Warren", "Racecourse", "Raceway", "Rachet", "Racquetball", "Ragbag", "Rainbow", "Rainfly", "Rainier", "Rakaposhi", "Rampart", "Ramrod", "Rangeland", "Rathole", "Rattler", "Reaper", "Rectory", "Redoubtable", "Reed", "Reef", "Reel", "Refectory", "Refinery", "Refuge", "Regimental", "Regulus", "Relief", "Remnant", "Repertory", "Requisite", "Reservoir", "Restoration", "Retainer", "Reticulum", "Rhine", "Rhone", "Rickshaw", "Riddle", "Ridge", "Ridgepole", "Rill", "Ring", "Ringlet", "Ritz", "Roach", "Robe", "Rock", "Rook", "Roost", "Rope", "Ropeway", "Rosary", "Rosette", "Rostrum", "Rotary", "Rotisserie", "Rotunda", "Rouleau", "Roundel", "Roundhouse", "Rowlock", "Rudderpost", "Rudderstock", "Ruff", "Rug", "Rumble", "Rundle", "Rushlight", "Rushmore", "Russet", "Sabaton", "Sabine", "Sable", "Sabot", "Sabre", "Sackbut", "Saddleback", "Saddlebag", "Sagittarius", "Salmon", "Salon", "Saltpan", "Sanatorium", "Sanctuary", "Sandbag", "Sangraal", "Sarcophagus", "Saucepan", "Sawmill", "Scabbard", "Scablands", "Scarecrow", "Schoolhouse", "Scimitar", "Scorpio", "Scratchpad", "Scrimshaw", "Scriptorium", "Scutcheon", "Seedbed", "Semigloss", "Sepulchre", "Serpens", "Serpent", "Setscrew", "Sewerage", "Shaker", "Sharkskin", "Sheepcote", "Sheepfold", "Sheraton", "Sherman", "Shield", "Shoelace", "Shoulder", "Sierra", "Silkscreen", "Sinai", "Singleton", "Sinkhole", "Siren", "Sirius", "Sitar", "Skeleton", "Skidpan", "Skittle", "Skullcap", "Skunk", "Slapstick", "Slaughterhouse", "Sledgehammer", "Slingback", "Sluicegate", "Smithy", "Smokehouse", "Smokestack", "Snakepit", "Snowbank", "Snowdrift", "Snuffbox", "Soapbox", "Solent", "Sombrero", "Soutane", "Spandau", "Spanner", "Spearhead", "Spearpoint", "Sphinx", "Spicemill", "Spider", "Spikenard", "Spindle", "Splicer", "Spyglass", "Stagecoach", "Stalactite", "Stalagmite", "Stanchion", "Starboard", "Statehouse", "Steakhouse", "Stemmer", "Sternpost", "Stetson", "Stewpan", "Stickpin", "Stiletto", "Stillroom", "Stirrup", "Stockade", "Stockhorn", "Stockpot", "Stockroom", "Stoker", "Stomacher", "Stoneware", "Stovepipe", "Stradavarius", "Stratus", "Stressor", "Striker", "Stringer", "Stump", "Summerhouse", "Surcoat", "Surgery", "Surrey", "Sward", "Swingletree", "Synagogue", "Tabard", "Tabernacle", "Tackle", "Tailcoat", "Talisman", "Tambourine", "Tangle", "Tapestry", "Taphouse", "Tarot", "Tartan", "Tavern", "Teapot", "Temple", "Tender", "Tenterhook", "Terrarium", "Thames", "Theatre", "Thimble", "Thingamajig", "Thresher", "Thunderer", "Tiber", "Tidy", "Tiepin", "Tightrope", "Tigris", "Tiller", "Timber", "Timberland", "Timpani", "Tin", "Tincture", "Tinderbox", "Tinfoil", "Tinplate", "Toboggan", "Toga", "Tollbooth", "Tollgate", "Tollhouse", "Tombstone", "Tongue", "Tonic", "Topcoat", "Topiary", "Topside", "Torch", "Torus", "Totem", "Tourniquet", "Tractor", "Trapping", "Treadmill", "Treasury", "Trebuchet", "Trellis", "Trephine", "Trestle", "Trestlework", "Triangulum", "Tribune", "Tricolour", "Trident", "Trigger", "Trim", "Triphammer", "Trousseau", "Truckle", "Trumpet", "Truncheon", "Trunnel", "Tuba", "Tuileries", "Tundra", "Tuner", "Tunnel", "Turnpike", "Turret", "Turtle", "Twill", "Twin", "Tympani", "Tyrolean", "Unction", "Union", "Upland", "Urn", "Vagabond", "Valance", "Varnish", "Vatican", "Vega", "Veil", "Venturi", "Vernier", "Versailles", "Versant", "Verso", "Vesper", "Vestry", "Viaduct", "Vibraphone", "Vicarage", "Vicuna", "Villa", "Vineyard", "Viola", "Virgo", "Voodoo", "Wabash", "Waders", "Wainscot", "Waistcoat", "Warehouse", "Warhorse", "Warren", "Washboard", "Washhouse", "Watchtower", "Waxwork", "Wayside", "Weatherglass", "Weathervane", "Weighbridge", "Weisshorn", "Wellhead", "Wellpoint", "Wetland", "Whatnot", "Wheelhouse", "Whetstone", "Whiffletree", "Whinstone", "Whipcord", "Whippletree", "Whipsaw", "Whirligig", "Whistler", "Wicker", "Wigwam", "Willow", "Willowware", "Wilson", "Wimple", "Windbreak", "Windbreaker", "Windjammer", "Windlass", "Windmill", "Wineglass", "Winepress", "Winery", "Wineskin", "Wonderland", "Woollen", "Workhouse", "Wormhole", "Worsted", "Xenolith", "Yardarm", "Yardstick", "Yarn", "Yashmak", "Yawl", "Yurt", "Zen", "Ziggurat", "Zither", "Zodiac", "Zoo");
      pushMany(db.street.signs, "sign", "fixing//", " village town city", 14, 1.4); // just numbered images
   }
   function addSynonyms(){
      //actions
      db.s.challenge = ["oppose","challenge","defy","confront","fight against","clash with"];
      db.s.prepared =["ready","prepared","all set","equipped","primed","in position","geared up"];
      //events
      db.s.destruction =["end","destruction","last days","doom"];
      //cosmic
      db.s.bigGodName =["God","Zeus","The Great Spirit", "Elohim", "Amon-Ra","Marduk","Odin","Ba'al"];
      db.s.eternity =["eternity","forever","ever after","perpetuity", "everlasting time","ages without end","evermore","always","the eternities"];
      db.s.paradise    =["the golden age","paradise","Eden"];
      db.s.somewhere =["somewhere", "somewhere else", "that place", "someplace", "someplace else", "there", "starting point", "square one", "not sure where"];
      //nature
      db.s.treeSubstance =["fruit","sap","roots","leaves","seeds","shoots","flowers"];// potentially edible
      db.s.treeType =["oak","almond","willow","ash","elm","banana","spruce","cedar","pine","coconut","crabapple","palm","cyprus","umbrella","sycamore","juniper","pawpaw","pecan","maple","terebinth"]; // should have images


/* synonyms: how to use? Create game text, then see what I need.
         // GROUP SIMILAR STUFF.       // later add more words from the power theasaurus site
 * abandon, leave, quit, desert, renounce, forsake, evacuate
 * abduct, kidnap, spirit away, shanghai.
 * ability, competency, capacity, power, strength, talent, faculty
 * abnormal, eccentric, unnatural, monstrous
 * abominable, odious, detestable, execrable, hateful, damnable, accursed, nefarious, hideous, horrible, unspeakable, disgusting, foul, loathsome,
 * abstract, ideal, metaphysical, transcendental
 * absurd, irrational, preposterous, unreasonable, fallacious, illogical, incoherent, nonsensical, ludicrous, ridiculous
 * abundance, plenty, profusion, luxuriance, opulence, wealth, richness, exuberance, super-abundance, lavishness
 * abuse, ill-use, vilification, malediction, scurrility, opprobrium, blackguardism, disparagement
 * abyss, chasm, pit, void
 * accept, honor, believe, embrace, adopt
 * account, reckoning, statement, report, description, narrative, record
 * accursed, anathematized, cursed, damned
 * advantageous, profitable, good, clever, expedient, wise, advisable, beneficial
 * advice, counsel, opinion, recommendation
 * affair, business, proceeding, matter, concern
 * afraid, apprehensive, fearful, alarmed
 * agent, operator, worker, representative, emissary, envoy, proxy,
 * aid, help, assist, avail, succor, serve
 * aider, helper, associate, assistant, ally, henchman, acolyte
 * ailing, invalid, unwell, ill, sick
 * aim, object, goal, purpose
 * animal, brute, beast, creature
 * annihilate, destroy, obliterate, nullify, extinguish
 * answer, reply, rejoin, respond, retort, react
 * anxious, distressed, troubled, careful, uneasy, concerned, apprehensive
 * apathetic, cold, impassive, indifferent, insensible
 * apparatus, machine, mechanism, instrument, equipment
 * apparently, evidently, it appears that, it looks like, it seems to me
 * apparition, specter, phantasm, phantom, ghost
 * apprehensive, fearful, anxious, afraid
 * approval, approbation, support, sanction, imprimatur, endorsement
 * army, forces, troops, legions, battalions
 * associate, companion, fellow, comrade, crony, confederate, accomplice, partner, mate, ally, colleague
 * association, company, fellowship, band, crew, gang, union, party
 * assume, presume, venture, hypothesize, suppose, speculate
 * attempt, try, essay, undertake, endeavour
 * attract, draw, pull, entice, tempt, lure, bait,
 * autocrat, despot, tyrant, dictator
 * average, mean, normal, standard, ordinary
 * avoid, elude, evade, escape, dodge
 * bad, poor, wretched, execrable, miserable, horrid
 * beginning, commencement, start, outset, inauguration, opening, inception, onset
 * behavior, conduct, demeanor, bearing, manners
 * blockhead, simpleton, dunce, dullard, numskull, dunderhead, lunkhead, idiot, dummy
 * bold, assured, stout-hearted, forward, audacious, fearless, intrepid
 * frontier, borderland, boundary, outskirts, edge, limit // of a nation etc.
 * boundless, unlimited, infinite, limitless, immeasurable, unbounded
 * brittle, breakable, fragile, easily broken, delicate
 * broken, fractured, shattered, ruptured
 * buffoon, clown, fool, punchinello, jester, joker,
 * but, however, nevertheless
 * buy, purchase
 * calamity, trouble, distress, misfortune, disaster, catastrophe, cataclysm
 * capture, seize, apprehend, catch
 * careless, cavalier, imprudent, unprepared, inattentive, thoughtless, unthinking, negligent, inobservant
 * cave, cavern
 * choice, preference, selection, option, pick, favorite
 * climb down, descend, get down, clamber down, scramble down
 * climb up, ascend, scale, clamber up, scramble up
 * collect, gather, aggregate, concentrate, muster, accumulate
 * communicate, impart, convey, say, express
 * compel, force, oblige, necessitate, coerce, make drive, impel, coax
 * component, part, constituent, ingredient, element
 * condition, proviso, prerequisite, precondition
 * confine, imprison, incarcerate, circumscribe, restrict, pen, enclose, jail, lock, intern, constrain
 * connect, concatenate, link, associate, join, unite, attach
 * consider, deliberate, cogitate, ponder, contemplate, ruminate, think, reflect, meditate
 * considerable, large, sizable, substantial, big
 * conspiracy, confederacy, plot, collusion, cabal
 * constant, continual, persistent, sustained, unremitting, uninterrupted, ceaseless, endless
 * contention, contest, fight, conflict, combat, struggle, quarrel, battle, tussle, skirmish
 * correct, right, true
 * corrupt, wicked, immoral, depraved,
 * dark, dingy, dim, murky, gloomy, shadowy, pitch black, inky black
 * decree, decision, command, edict, order, ordinance law
 * dispirited, dejected, discouraged, despondent, hopeless
 * destroy, kill, annihilate, demolish, ruin, devastate, crush
 * dislike, loathe, detest, abhor, abominate, hate,
 * earnest, intent, serious, intense, impassioned
 * elaborate, complicated, detailed, curious
 * enemy, opponent, adversary, antagonist, foe
 * eternally, forever, everlastingly,
 * exact, definite, precise, absolute, specific
 * examine, investigate, inspect, scrutinize, peruse, search, survey, probe
 * expert, adept, master, specialist, technician, virtuoso
 * explanation, account, interpretation, elucidation, exposition, explication, commentary
 * farewell, goodby, adieu
 * fearful, dreadful, fearsome, terrible, ghastly, dire, awful, grim, gruesome, frightful, horrible, appalling, horrendous
 * feeling, perception, consciousness, affection, emotion, sentiment,
 * follow, tag along with, attend, go with
 * forbid, prohibit, ban, proscribe, disallow, veto, embargo
 * force, energy, power, might
 * form, shape, figure, configuration
 * form, make, produce, fashion, develop, organize, create, fabricate, arrange, construct, build
 * fragile, brittle, weak, delicate
 * freedom, independence, liberty, emancipation, manumission, release, delivery, ransom, rescue, etc.
 * full, replete, crammed, crowded, packed, stuffed, overflowing
 * genuine, true, real, veritable
 * get, obtain, procure, gain, secure, acquire, find, attain
 * good, excellent, admirable
 * good-natured, kind, amiable, good-humored, accommodating, agreeable
 * guess, conjecture, surmise, suspect, divine, theorize, imagine, speculate, hypothesise
 * harsh, rough, acrimonious, brutal, unkind, brutish, severe
 * hasten, quicken, hurry, dispatch, speed, rush, hustle
 * hate, dislike, abhor, detest, execrate, abominate, loathe
 * have, possess, own
 * history, account, record, story, chronicle
 * impenetrable, dense, impermeable, impervious
 * important, notable, interesting, significant, weighty, momentous, eventful, consequential, substantial, serious, critical
 * impossible, unfeasible, insuperable, impracticable, hopeless
 * increase, grow, augment, enhance, intensify, extend, enlarge, strengthen
 * ingenious, inventive, artful, clever
 * injure, hurt, harm, damage, impair
 * innocent, blameless, guiltless, harmless
 * intrigue, plan, scheme, plot, maneuver, machination, conspiracy
 * journey, excursion, expedition, odyssey, trek, travels
 * locality, place, location
 * lurk, hide, sneak, skulk
 * manage, arrange, regulate, handle, guide, engineer, maneuver
 * material, substance, stuff
 * method, manner, procedure, process, plan, system, scheme
 * mysterious, hidden, enigmatic
 * natural, normal, ordinary, regular
 * near, close to
 * necessary, indispensable, vital, essential,
 * need, require, lack
 * nonsense, drivel, twaddle, balderdash, trumpery, rubbish, claptrap, bosh, rot
 * notice, perceive, observe, note, see
 * object, challenge, protest
 * odd, unusual, peculiar, funny, strange, bizarre, singular
 * opinion, idea, thought, judgment, belief, view, notion, verdict, speculation
 * opportunity, chance, occasion
 * overcome, conquer, vanquish, crush, defeat, overpower
 * painful, difficult, annoying, distressing, agonizing, tormenting, torturous, sore
 * pay, compensate, remunerate, reward, indemnify, recompense, settle
 * people, folk
 * period, time, epoch, era, age
 * permanent, fixed, immovable
 * permission, allowance, liberty
 * pernicious, evil, destructive, harmful, ruinous
 * piece, hunk, chunk, chuck, lump, scrap, bit, fragment
 * plan, contrive, arrange, design, devise, plot
 * poison, venom, toxin, drug
 * position, place, situation
 * powerful, strong, forceful, potent, prepotent, mighty
 * powerless, weak, impotent, helpless
 * predict, foretell, forecast, prophesy, presage, divine, augur
 * primordial, original, elementary, ancient
 * protect, defend, guard, shield
 * question, ask, enquire, interrogate, query, interview
 * recognize, acknowledge, notice, perceive, identify
 * remedy, cure, elixir, antidote
 * remember, recollect, recall, mind
 * representative, agent, delegate, deputy
 * resemble, simulate, copy, imitate, mimic, reproduce, duplicate
 * residence, abode, dwelling, habitation
 * rich, prosperous, wealthy, opulent, affluent
 * riddle, question, conundrum, enigma
 * road, highway, street, avenue, turnpike, boulevard, track, drive, way
 * save, preserve, rescue, recover, redeem, deliver
 * spectacle, view, sight
 * skill, expertise, dexterity, proficiency, cleverness, mastery, adeptness, virtuosity
 * solution, resolution, unraveling, explanation, answer
 * source, origin, fountainhead, wellspring
 * spiritual, immaterial, psychical, ethereal, ghostly
 * stop, cease, discontinue, desist, halt
 * strengthen, fortify, buttress, invigorate, harden
 * strict, unyielding, inflexible, uncompromising
 * symbol, representation, sign, signifier, figure, token, representation
 * talk, discourse, parley, jaw
 * think, understand, use brain, use mind use intelligence, use head
 * tired, weary, fatigued, exhausted
 * trouble, problems, in distress
 * use this, make use of this, employ this, utilize this, apply this
 * useful, serviceable, practical, advantageous, valuable, helpful
 * villain, blackguard, miscreant, rascal
 * warn, caution, admonish, forewarn, advise
 * watch, observe, see
 * withdraw, retire, retreat, exit, leave
 * wonderful, marvelous, miraculous, wondrous, prodigious, astonishing, stupendous
 * work, labor, business, handiwork
*/
   }
   function addNotes() { // can add to object to make it special. E.g. "madeOfGold"
      db.notes.treasure = [ // REMEMBER TO ADD SPACES if using in bla.notes  " example "
         "book", // a grimoire:sells and has power on its own
         "boots", // seven league boots, Hermes' winged sandals, ruby slippers, etc:cross space and dimensions
         "blood", // special DNA bilities - see Dune and spice
         "box", // high technology:ancient or alien
         "brain", // preserved thriough magic, can communicate through rituals, bigBad now with added power from Hell :)
         "breath",// breath of life:makes anything live. Good for spying, serving, or becoming self replicating machines replace humans
         "cloak",
         "code", // formula for scientific breakthrough
         "curse",// necklace of Harmonia. Made by Hephaestus:makes wearer irresistible, but cursed.
         "doll",// voodoo
         "earth", // Xirang:Chinese soil that grows forever - can grow to stop flood, but see Magic Porridge Pot
         "feather",// of Simurgh (Iranian). Burn it, bird comes, lived through 3 previous worlds. Will tell ANYTHING. (e.g. super science)
         "fiddle",// Swedish legend of the Hargadance. Devil's fiddle:once played, dance until you die.
         "gold",
         "grail",// of Iranian king Jamshid (immortality) or Holy Grail - heaven?
         "harp",// or Orpheus, Daghda, Kantele, etc. Draws things to you (even trees and rocks) so they can listen
         "heart",// Fafnir's heart:roasted and consumed by Sigurd, giving him the gift of prophecy.
         "horn", // summons judgement day (Gabriel, or Heimdall)
         "key", // to distant past or alien world
         "lamp", // aladdin style
         "lyre", // Amphion's lyre, let him telekinetically move stones to build the walls of Thebes. (Greek mythology)
         "mirror",// Snow White, or Tezcatlipoca:can see anything
         "net", // Indra's net, one of the weapons of the sky-god Indra, can ensnare any enemy
         "pearl", // oriental dragons have a flaming pearl under their chin. Gives energy, wisdom, prosperity, thunder, the moon, etc.
         "pipes", // pied piper:manes anybody blindly follow you
         "potion", // e.g. elixir of life
         "prophecy", // of some enormous event about to take place
         "ring", // for seal of Solomon:can control demons
         "secret", // e.g. military, royal, anything with massive power
         "stone", // philosopher's stone, moonstone, etc.
         "sword",// actually SHEATH of excalibir:you cannot be harmed
      ]
   }
   function addMusicAndVideo(){
      function addMusic() {
         db.music.push(
            { "trackName":"Alexander-Nakarada-freePD-Le-Baguette2", "details":"" },
            { "trackName":"Alexander-Nakarada-freePD-Ambient Bongos2", "details":"" },
            { "trackName":"Alexander-Nakarada-freePD-Bonfire2", "details":"" },
            { "trackName":"Alexander-Nakarada-freePD-Burt's Requiem2", "details":"" },
            { "trackName":"Alexander-Nakarada-freePD-Marked2", "details":"" },
            { "trackName":"Alexander-Nakarada-freePD-Putins-Lullaby2", "details":"" },
            { "trackName":"hamiltoncleverdon+decorusangelus2", "details":"" },
            { "trackName":"hamiltoncleverdon+diesirae2", "details":"" },
            { "trackName":"hamiltoncleverdon+lacrimosa2", "details":"" },
            { "trackName":"hamiltoncleverdon+onelast(good-subtle)2", "details":"" },
            { "trackName":"hamiltoncleverdon+shadowsoffaithadarkalleluia2", "details":"" },
            { "trackName":"hamiltoncleverdon+shadowsoffire2", "details":"" },
            { "trackName":"hamiltoncleverdon+shantih2", "details":"" },
            { "trackName":"hamiltoncleverdon+thewanderer2", "details":"" },
            { "trackName":"incompetech-Death-and-Axes2", "details":"" },
            { "trackName":"incompetech-Decline2", "details":"" },
            { "trackName":"incompetech-Division2", "details":"" },
            { "trackName":"incompetech-Faceoff2", "details":"" },
            { "trackName":"incompetech-Malicious2", "details":"" },
            { "trackName":"incompetech-We-Got-Trouble2", "details":"" },
            { "trackName":"John-Bartmann-freemusicarchive-African_Moon2", "details":"" },
            { "trackName":"John-Bartmann-freemusicarchive-Happy-Clappy2", "details":"" },
            { "trackName":"John-Bartmann-freemusicarchive-Home_At_Last2", "details":"" },
            { "trackName":"John-Bartmann-freemusicarchive-Serial_Killer2", "details":"" },
            { "trackName":"Kevin-MacLeod-freePD-Dancing-at-the-Inn2", "details":"" },
            { "trackName":"Kevin-MacLeod-freePD-Forest-Frolic-Loop2", "details":"" },
            { "trackName":"Kevin-MacLeod-freePD-Satin-Danger2", "details":"" },
            { "trackName":"Kevin-MacLeod-freepPD-Evil-Incoming2", "details":"" },
            { "trackName":"Loyalty-freak-music-freemusicarchive-a-really-dark-alley2", "details":"" },
            { "trackName":"Loyalty-Freak-Music-freemusicarchive-Dirty_shoes_blues2", "details":"" },
            { "trackName":"Loyalty-freak-music-freemusicarchive-Old_Witch_Place2", "details":"" },
            { "trackName":"musopen-cc0-Beethoven-5-1-NOT SURE 2", "details":"" },
            { "trackName":"musopen-cc0-Beethoven-9-event", "details":"" },
            { "trackName":"musopen-cc0-Beethoven-busy-(MoonlightSonataIII)2", "details":"" },
            { "trackName":"musopen-cc0-Beethoven-Fur-Elise2", "details":"" },
            { "trackName":"musopen-cc0-Beethoven-Moonlight Sonata2", "details":"" },
            { "trackName":"musopen-cc0-Beethoven-Piano Sonata- 2", "details":"" },
            { "trackName":"musopen-cc0-Humoresque-no-7-2", "details":"" },
            { "trackName":"musopen-cc0-Mahler-5-quiet-parts-2", "details":"" },
            { "trackName":"musopen-cc0-Mussorgsky-Catacombae2", "details":"" },
            { "trackName":"musopen-cc0-Mussorgsky-Gnomus2", "details":"" },
            { "trackName":"musopen-cc0-Mussorgsky-Pictures-at-an-Exhibition-IX-2", "details":"" },
            { "trackName":"musopen-cc0-Mussorgsky-(slow)-Castello", "details":"" },
            { "trackName":"musopen-cc0-Mussorgsky-Tuileries2", "details":"" },
            { "trackName":"musopen-cc0-Peer-Gynt-Aase-Death2", "details":"" },
            { "trackName":"musopen-cc0-Peer-Gynt-Anitra-Dance2", "details":"" },
            { "trackName":"musopen-cc0-Peer-Gynt-Morning2", "details":"" },
            { "trackName":"musopen-cc0-Rimsky-Korsakov-Samson2", "details":"" },
            { "trackName":"musopen-cc0-Rimsky-Korsakov-Scheherazade2", "details":"" },
            { "trackName":"musopen-cc0-Rimsky-Korsakov-Scheherazade-more2", "details":"" },
            { "trackName":"musopen-cc0-Tchaikovsky-1812-end-2", "details":"" },
            { "trackName":"musopen-cc0-Tchaikovsky-1812-rising-2", "details":"" },
            { "trackName":"musopen-cc0-Tchaikovsky-Nutcracker-2", "details":"" },
            { "trackName":"musopen-cc0-Tchaikovsky-Nutcracker-Arabian-2", "details":"" },
            { "trackName":"musopen-cc0-Tchaikovsky-Nutcracker-Flowers-2", "details":"" },
            { "trackName":"musopen-cc0-Tchaikovsky-romeo-action-2", "details":"" },
            { "trackName":"musopen-cc0-Tchaikovsky-SugarPlumFairy-2", "details":"" },
            { "trackName":"musopen-cc0-Tchaikovsky-swans-peaceful-2", "details":"" },
            { "trackName":"musopen-cc0-Tchaikovsky-swans-peaceful-famous-2", "details":"" },
            { "trackName":"musopen-cc0-Tchaikovsky-Swans-uneasy-2", "details":"" },
            { "trackName":"musopen-cc0-Verdi-Aida2", "details":"" },
            { "trackName":"musopen-cc0-Violin-Op-61-Larghetto2", "details":"" },
            { "trackName":"musopen-cc0-Vivaldi-ConcertoGrossoII-uncertain-Piano2", "details":"" },
            { "trackName":"musopen-cc0-Vivaldi-summer2", "details":"" },
            { "trackName":"musopen-cc0-Vivaldi-winter2", "details":"" },
            { "trackName":"musopen-sharealike-Clarinet-Concerto-Adagio-LONG-2", "details":"" },
            { "trackName":"musopen-sharealike-MAYBE-SAD-Harpsichord-Concerto2", "details":"" },
            { "trackName":"musopen-sharealike-Minute-Waltz2", "details":"" },
            { "trackName":"Phase-Shift-freePD-Forest-Night2", "details":"" },
            { "trackName":"Rafael-Krux-freePD-Action-Strike2", "details":"" },
            { "trackName":"Rafael-Krux-freePD-Alien-Invasion2", "details":"" },
            { "trackName":"Rafael-Krux-freePD-Behind Enemy Lines2", "details":"" },
            { "trackName":"Rafael-Krux-freePD-Brewing-Potions2", "details":"" },
            { "trackName":"Rafael-Krux-freePD-Cornfield-Chase2", "details":"" },
            { "trackName":"Rafael-Krux-freePD-Desert-Conflict2", "details":"" },
            { "trackName":"Rafael-Krux-freePD-empty-space2", "details":"" },
            { "trackName":"Rafael-Krux-freePD-Ice-and-Snow2", "details":"" },
            { "trackName":"Rafael-Krux-freePD-Lonely-Mountain2", "details":"" },
            { "trackName":"Rafael-Krux-freePD-Romantic Inspiration2", "details":"" },
            { "trackName":"Rafael-Krux-freePD-The-Drama2", "details":"" },
            { "trackName":"Rafael-Krux-freePD-Whistling Ukulele2", "details":"" },
            { "trackName":"Rafael-Krux-freepPD-Epic Boss Battle2", "details":"" },
            { "trackName":"Rafael-Krux-freepPD-Hidden Truth2", "details":"" }
         );
      }
      function addVideos() {
         db.videos.vidEnd = { "widthPx":800, "heightPx":450, "credit":"'Ball of Stars' by <a href='https://www.motionbolt.com/'>MotionBolt</a>" };
      }
      addMusic();
      addVideos();
   }
   function addAnimations() {// only PEOPLE (etc_) animate. They are DIVs, Other objects are IMGs (so use animated GIFs:less control, but much simpler).
      db.animations.stand = [0];// for entering:do not risk staying on first frame
      db.animations.walk = [11, 12, 13, 14, 15, 8, 9, 10];
      db.animations.sayShort = [1, 2, 3, 4, 5, 6, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];// extra "0"s so text stays on screen longer
      db.animations.sayLonger = [6, 5, 4, 0, 4, 5, 0, 4, 0, 4, 6, 5, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      db.animations.sayLongest = [4, 5, 6, 0, 4, 5, 6, 0, 5, 0, 4, 5, 0, 6, 0, 6, 5, 4, 6, 0, 4, 0, 5, 6, 0, 4, 5, 6, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      db.animations.grin = [1, 1];

      db.animations.climb = [7, 18, 19, 20, 20, 20]; // ends scene, so no need to end with position 0
      db.animations.reach = [0, 24, 24, 25, 25, 26, 26, 26, 26, 26, 25, 24, 0];
      db.animations.reachQuick = [0, 24, 25, 26, 26, 26, 25, 24, 0];
      db.animations.reachDouble = [0, 24, 25, 26, 25, 24, 25, 26, 25, 24, 0];
      db.animations.reachLeft = [0, -24, -24, -25, -25, -26, -26, -26, -26, -26, -25, -24, 0];
      db.animations.reachQuickLeft = [0, -24, -25, -26, -26, -26, -25, -24, 0];
      db.animations.reachDoubleLeft = [-0.1, -24, -25, -26, -25, -24, -25, -26, -25, -24, -0.1];
      db.animations.danceStep = [0, 16, 16, 0, 7, 10, 10, 7, 0, 18, 19, 18, 0, 7, 10, 10, 7, 0, 16, 16, 0];// 7=side,10=knee,16=bend, 18-19=reach
      db.animations.danceStepLeft = [-0.1, -7, -10, -10, -7, -16, -16, -0.1, -18, -19, -18, -0.1, -7, -16, -16, -10, -10, -7, -0.1];

      db.animations.dance = db.animations.reachQuick.concat(
                              db.animations.reachQuickLeft,
                              db.animations.reachDouble,
                              db.animations.danceStep,
                              db.animations.reachDouble,
                              db.animations.reachDoubleLeft,
                              db.animations.danceStepLeft,
                              db.animations.reachDoubleLeft,
                              db.animations.grin               );

   // lastFrame = number of frames -1
   db.animations.climbUpHouse = { "lastFrame":76, "frameWidth":48, "frameHeight":126, "cos":"url('i/special/climb/climbUpHouse-48px.png')", "forceScale":1 };
   db.animations.climbDownHouse = { "lastFrame":76, "frameWidth":48, "frameHeight":126, "cos":"url('i/special/climb/climbDownHouse-48px.png')", "forceScale":1 };
   db.animations.climbUpCave = { "lastFrame":178, "frameWidth":36, "frameHeight":336, "cos":"url('i/special/climb/climbUpCave-36px.png')", "forceScale":1 };
   db.animations.climbDownCave = { "lastFrame":178, "frameWidth":36, "frameHeight":336, "cos":"url('i/special/climb/climbDownCave-36px.png')", "forceScale":1 };

   // series of images
   db.animations.locustAttack = { path:"i/floorObj/monster/locust", "frames":["2.png", "3.png", "4.png", "5.png", "6.png"] };// path+frame = full image string
   db.animations.scorpionAttack = { path:"i/wallObj/monster/scorpion", "frames":["2.png", "3.png", "4.png", "5.png", "6.png", "7.png"] };
   db.animations.snakeAttack = { path:"i/floorObj/monster/snake", "frames":["2.png", "3.png", "4.png", "5.png", "6.png"] };
   db.animations.spiderAttack = { path:"i/floorObj/monster/spider", "frames":["2.png", "3.png", "4.png", "5.png", "6.png", "7.png"] };

   }
   function addCutScenes() {
      db.cutScenes.climbDownCave2 = function () {// default:2 layers (-1, then -2)
         say("saying ()foundHoleDown");
         goToScene("down1"); noWalkIn(); say("saying ()climbingDown"); climbDownCave(); needs("clickCutScene^climbUpCave2", 1);
         goToScene("down1"); say("saying ()reachedCaveBottom");
      }
      db.cutScenes.climbUpCave2 = function () {
         say("saying ()foundHoleUp");
         goToScene("up1"); noWalkIn(); say("saying ()climbingUp"); climbUpCave();
         goToScene("up1"); say("saying ()reachedCaveTop");
      }
      db.cutScenes.climbDownCave4 = function () {
         say("saying ()foundHoleDown");
         goToScene("down1"); noWalkIn(); say("saying ()climbingDown"); climbDownCave();
         goToScene("down2"); noWalkIn(); say("saying ()climbingDown"); climbDownCave(); needs("clickCutScene^climbUpCave4", 1);
         goToScene("down1"); say("saying ()reachedCaveBottom");
         //"needs" sits waiting for next room change:// 0=force it; 1= next SUITABLE room; 2=2+not already changed; 3=2,maybe(random)
      }
      db.cutScenes.climbUpCave4 = function () {
         say("saying ()foundHoleUp");
         goToScene("up1"); noWalkIn(); say("saying ()climbingUp"); climbUpCave();
         goToScene("up2"); noWalkIn(); say("saying ()climbingUp"); climbUpCave();
         goToScene("up1"); say("saying ()reachedCaveTop");
      }
      db.cutScenes.climbDownCave6 = function () {
         say("saying ()foundHoleDown");
         goToScene("down3"); noWalkIn(); say("saying ()climbingDown"); climbDownCave();
         goToScene("down2"); noWalkIn(); say("saying ()climbingDown"); climbDownCave(); needs("clickCutScene^climbUpCave6", 1);
         goToScene("down1"); say("saying ()reachedCaveBottom");
      }
      db.cutScenes.climbUpCave6 = function () {
         say("saying ()foundHoleUp");
         goToScene("up1"); noWalkIn(); say("saying ()climbingUp"); climbUpCave();
         goToScene("up2"); noWalkIn(); say("saying ()climbingUp"); climbUpCave();
         goToScene("up3"); say("saying ()reachedCaveTop");
      }
      db.cutScenes.climbDownCave100 = function () {
         say("saying ()foundHoleDown");
         goToScene("down5"); noWalkIn(); say("saying ()climbingDown"); climbDownCave();
         goToScene("down10"); noWalkIn(); say("saying ()climbingDown"); climbDownCave();
         goToScene("down10"); noWalkIn(); say("saying ()climbingDown"); climbDownCave();
         goToScene("down10"); noWalkIn(); say("saying ()climbingDown"); climbDownCave();
         goToScene("down10"); noWalkIn(); say("saying ()veryLongClimb"); climbDownCave();
         goToScene("down20"); noWalkIn(); say("saying ()veryLongClimb"); climbDownCave();
         goToScene("down30"); noWalkIn(); say("saying ()veryLongClimb"); climbDownCave();
         goToScene("down2"); noWalkIn(); say("saying ()veryLongClimb"); climbDownCave(); needs("clickCutScene^climbUpCave100", 1);
         goToScene("down3"); say("saying ()reachedCaveBottom");
      }
      db.cutScenes.climbUpCave100 = function () {
         say("saying ()foundHoleUp");
         goToScene("up3"); noWalkIn(); say("saying ()climbingUp"); climbUpCave();
         goToScene("up2"); noWalkIn(); say("saying ()climbingUp"); climbUpCave();
         goToScene("up30"); noWalkIn(); say("saying ()climbingUp"); climbUpCave();
         goToScene("up20"); noWalkIn(); say("saying ()climbingUp"); climbUpCave();
         goToScene("up10"); noWalkIn(); say("saying ()veryLongClimb"); climbUpCave();
         goToScene("up10"); noWalkIn(); say("saying ()veryLongClimb"); climbUpCave();
         goToScene("up10"); noWalkIn(); say("saying ()veryLongClimb"); climbUpCave();
         goToScene("up10"); noWalkIn(); say("saying ()veryLongClimb"); climbUpCave();
         goToScene("up5"); say("saying ()reachedCaveTop");
      }
      db.cutScenes.locustAttack = function (id) {
         if (active.queue.length > 5) {
            l("skipping locustAttack (in middle of bigger cutscene. Queue.length=" + active.queue.length + "'");
            return;
         }
         animateNonPerson(id, "locustAttack");
         wait(3); // let the final image sink in!
         goToScene("east"); say("saying ()escapedMonster");
      }
      db.cutScenes.scorpionAttack = function (id) {
         if (active.queue.length > 5) {
            l("skipping scorpionAttack (in middle of bigger cutscene. Queue.length=" + active.queue.length + ")");
            return;
         }
         animateNonPerson(id, "scorpionAttack");
         wait(3); // let the final image sink in!
         goToScene("east"); say("saying ()escapedMonster");
      }
      db.cutScenes.spiderAttack = function (id) {
         if (active.queue.length > 5) {
            l("skipping spiderAttack (in middle of bigger cutscene. Queue.length=" + active.queue.length + ")");
            return;
         }
         animateNonPerson(id, "spiderAttack");
         wait(3); // let the final image sink in!
         goToScene("east"); say("saying ()escapedMonster");
      }
      db.cutScenes.snakeAttack = function (id) {
         if (active.queue.length > 5) {
            l("skipping snakeAttack (in middle of bigger cutscene. Queue.length=" + active.queue.length + ")");
            return;
         }
         animateNonPerson(id, "snakeAttack");
         wait(3); // let the final image sink in!
         goToScene("east"); say("saying ()escapedMonster");
      }
   }
   addPeople();
   addLocations();
   addObjects();
   addNames();
   addSynonyms();
   addNotes();
   addMusicAndVideo();
   addAnimations();
   addCutScenes();
}// end addStuff

function getName(what) { // get island name etc.
   let a = { "seed":0, "i":0, "j":0, "role":"", "choices":[], "maleNames":[], "femaleNames":[], "prefix":[], "surnames":[] };
   a.seed = arguments[1]; a.seed = typeof (a.seed) !== 'undefined' ? a.seed :0; // e.g. islandNumber
   switch (what) {
      case "island":{ // for use in "island of X"
         if (db.islands[a.seed].length < 3) { // not yet [123,456,"the blessed"]
            // still here? Work out the name
            a.choices = db.names.saints.male.concat(db.names.saints.female, db.names.royalFemale, db.names.angels, db.names.bible.patriarchs, db.names.demons, db.names.explorers, db.names.heroes, db.names.gods.canaanite, db.names.gods.egyptian, db.names.gods.gnostic, db.names.gods.aeons, db.names.gods.greek, db.names.gods.hittite, db.names.gods.titans, db.names.goddesses.canaanite, db.names.goddesses.egyptian, db.names.goddesses.greek, db.names.goddesses.titans, db.names.goddesses.hittite, db.names.magic, db.names.myth.creatures, db.names.myth.lands, db.names.pharaohs);
            if (a.seed > a.choices.length) {
               l("getName:not enough island names (want seed=" + a.seed + "), so looping round");
               a.seed = a.choices.length % a.seed;
            }
            a.choices = m.seedShuffle(1, a.choices);// fixed seed, so get the same shuffle every time
            l("after shuffling islands:choice " + a.seed + " of " + a.choices.length + " =" + a.choices[a.seed]);
            db.islands[a.seed][2] = a.choices[a.seed];
         }
         return db.islands[a.seed][2]
      }
      case "person":{
         return ["Captain", "Persephone", "Escobar"]; // desired gender is based on name for convenience. (Where it is found in database)
      }
      case "everybody":{ // refreshes all people with random names // do NO hard wire, makes code harder to read
         function prepareLists() {
            a.prefix = m.seedShuffle(2, db.names.commonRank);
            a.maleNames = m.seedShuffle(1, db.names.boys);
            a.femaleNames = m.seedShuffle(1, db.names.girls);
            a.surnames = m.seedShuffle(1, db.names.surnamesStrong);
         }
         function chooseName(i) {
            // rank?
            a.role = db.people[i]["role"]; // could be "undefined"
            if ((a.role == "richFriend") || (a.role == "badBoss") || (a.role == "deadBad")) { // always "Captain", "Major", etc.
               a.j = a.i % a.prefix.length; // want position "a.i" out of "length".
               // "%" =modulus = division remainder = "If a.i > length, subtract length".
               db.people[a.i]["prefix"] = a.prefix[a.j];
            } else db.people[a.i]["prefix"] = "";
            // first name
            if (getGender(a.i) == "female") {
               a.j = a.i % a.femaleNames.length;
               db.people[a.i]["firstName"] = a.femaleNames[a.j];
            } else {
               a.j = a.i % a.maleNames.length;
               db.people[a.i]["firstName"] = a.maleNames[a.j];
            }
            // surname
            a.j = a.i % a.surnames.length;
            db.people[a.i]["surname"] = a.surnames[a.j];
            //l("XXX " +db.people[a.i].name+ " =" +db.people[a.i]["prefix"]+ " " +db.people[a.i]["firstName"]+ " " +db.people[a.i]["surname"] );
         }
         prepareLists();
         for (a.i = 0; a.i < db.people.length; a.i++)chooseName(a.i);
      }
   }
}

addStuff();

// LATER:PRELOAD ONLY AS NEEDED:when going underground, loading a new story, etc.
clock.preLoadAnimations(["locustAttack", "scorpionAttack", "snakeAttack", "spiderAttack"]);

loadJavascript("c/6-storyEvents_0.js");

