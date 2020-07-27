var trackNumber =-1;

function	playMusic(){
	let a={"":"", "":0, "":0};
	var track = arguments[0]; track =typeof(track) !=='undefined'? track : "";
	var audio = document.getElementById('audio');
	if(track ==""){
		if(audio.paused ==0){ // not simply paused? Then go on to the next track
			trackNumber++;
			if(trackNumber >=db.music.length)trackNumber =0;
		}
		if(trackNumber <0)trackNumber =0;// just in case
		track =db.music[trackNumber].trackName;
	}
	track ="m\\" +track+ ".mp3";  // later: also do ogg
		console.log("playing " +track);
	var source = document.getElementById('mp3Source');
  	source.src = track;
	audio.load(); //call this to just preload the audio without playing
	audio.loop =true;
	audio.play(); //call this to play the song right away
}

function stopMusic(){
	var a = document.getElementById('audio');
	a.pause();
}
//________________________________________________________
/*











	                    	G O















*/
//__________________________ GO _________________________

startGame();



//________________________________________________________
/*











	                    	T E S T















*/
//__________________________ GO _________________________



//______________ TEST ________________________
//
function startClock(){
    clearTimeout(clock.nextTimer);
    clock.nextTimer =setTimeout(NEXT_GAME_FRAME,clock.delay);// STARTS THE GAME
    O("clock message").innerHTML ="STOP CLOCK";
    clock.gamePaused =0;
}
function stopClock(){
    O("clock message").innerHTML ="START CLOCK";
    clock.gamePaused =1;
    stopMusic();
}

function TEST(what){
    function toggleAutoScene(){
        if(nav.autoScene ==1){
            nav.autoScene =0;
            O("autoScene").innerHTML =" autoscene OFF";
        }else{
            nav.autoScene =1;
            O("autoScene").innerHTML =" autoscene ON";
        }
        fillScene();
    }
    function changePerson(add){
        // get person number
        for(var i=0; i < db.people.length; i++){
            if(active.person ==db.people[i].name){// found current person
                i = i + add;
                if(i >=db.people.length)i =i -db.people.length; // loop at end
                else if(i <0)i = i + db.people.length;// loop at start
                active.person =db.people[i].name;
                l("changed to person " +i+ ", " +active.person); showChanges();
                fillScene();
                l("XXX changed to person, and filled scene:"); showChanges();
                return;
            }
        }


    }
    if(nav.sceneTypes.includes(what)){
        nav.autoScene =0;
        O("autoScene").innerHTML =" autoscene OFF";
        nav.sceneType = what;
        if(what==" cave ")nav.sceneZ = -2;
        fillScene();
        return;
    }
    else switch(what){
        case("toggleClock") : {if(clock.gamePaused)startClock(); else stopClock(); return;}
        case("autoScene") : { toggleAutoScene(); return;   }
        case("orientNorth") : { nav.facing = "north"; fillScene(); return;   }
        case("orientEast") : { nav.facing = "east"; fillScene(); return;   }
        case("orientSouth") : { nav.facing = "south"; fillScene(); return;   }
        case("orientWest") : { nav.facing = "west"; fillScene(); return;   }
        case("north1") : { active.queue =[]; nav.sceneY -=1; fillScene(); return;   }
        case("north10") : { active.queue =[]; nav.sceneY -=10; fillScene(); return;   }
        case("north100") : { active.queue =[]; nav.sceneY -=100; fillScene(); return;   }
        case("north1000") : { active.queue =[]; nav.sceneY -=1000; fillScene(); return;   }
        case("east1") : { active.queue =[]; nav.sceneX +=1; fillScene(); return;   }
        case("east10") : { active.queue =[]; nav.sceneX +=10; fillScene(); return;   }
        case("east100") : { active.queue =[]; nav.sceneX +=100; fillScene(); return;   }
        case("east1000") : { active.queue =[]; nav.sceneX +=1000; fillScene(); return;   }
        case("south1") : { active.queue =[]; nav.sceneY +=1; fillScene(); return;   }
        case("south10") : { active.queue =[]; nav.sceneY +=10; fillScene(); return;   }
        case("south100") : { active.queue =[]; nav.sceneY +=100; fillScene(); return;   }
        case("south1000") : { active.queue =[]; nav.sceneY +=1000; fillScene(); return;   }
        case("west1") : { active.queue =[]; nav.sceneX -=1; fillScene(); return;   }
        case("west10") : { active.queue =[]; nav.sceneX -=10; fillScene(); return;   }
        case("west100") : { active.queue =[]; nav.sceneX -=100; fillScene(); return;   }
        case("west1000") : { active.queue =[]; nav.sceneX -=1000; fillScene(); return;   }
        case("climbUpHouse") : { climbUpHouse("house3"); return;}// deliberately wrong, to test "getAliases" code
        case("climbDownHouse") : { climbDownHouse(); return;}
        case("climbCave") : { alert("climbing cave code not yet done"); return;}
        case("zMinus2"):{nav.sceneZ =nav.sceneZ -2; fillScene(); return;  };
        case("zPlus2"):{nav.sceneZ =nav.sceneZ +2; fillScene(); return;  };
        case("zMinus20"):{nav.sceneZ =nav.sceneZ -20; fillScene(); return;  };
        case("zPlus20"):{nav.sceneZ =nav.sceneZ +20; fillScene(); return;  };
        case("reach"):{say("I am going to reach");reach();say("there, I did it"); return;  };
        case("dance"):{dance(); return;  };
        case("video"):{ video(); return;  };
        case("gameEnd"):{endGame();  return;  };
        case("sit"):{sit(); return;  };
        case("nextPerson"):{changePerson(1); return;  };
        case("previousPerson"):{changePerson(-1); return;  };
        case("next10person"):{changePerson(10); return;  };
        case("previous10person"):{changePerson(-10); return;  };
        case("offerStory"):{offerStory(); return; }
        case("testParsing"):{parseString("the [fall,destruction] and rise, of [$man,paradise] [forever,eternity]");

            return; }
        case("testNeeds"):{ needs("industrial drill",0);
                        goToScene("east");
                        wait(10);
                        goToScene("west");
                        //enter("polar bear");
                            //wait(4);
                            //enter("older woman");
                            //say("hello, I am a polar bear#@and I am mother bear#And I am polar bear again. I will now sit down.","polar bear","mother bear");
                        //sitOn("bed","polar bear");
                            //wait(4);
                            //enter("mother bear");
                        // say("I am sitting, talking to mother bear.#@yes, I know#Hopefully I did not turn","polar bear","mother bear");
                            //walk(10,"","polar bear");
                            //say("Now I am talking to mother bear again.#@Yes, and did I turn?","polar bear","mother bear");
                            //leave("mother bear");
                        return;  };
    }// still here?
    l("ERROR: 'TEST' doesn't know how to convert string '" +what+ "' into functions" );

}
function help(){
    l("XXX clicked help");
}
function TEDAgame(){
    l("XXX clicked TEDAgame");
}

/*!  TEDAgame is licensed under GNU GPL 3 or later <https://www.gnu.org/licenses/>. */
// MINIFYING:  /*!  = do not minify this bit

/*  TEDAgame is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    For a copy of the GNU General Public License, see <https://www.gnu.org/licenses/>.
*/
