// PSEUDO CODE FOR STORIES
			// new story code needs something like this

// "change" format: sceneX,Y,Z,id,change,detail1,detail2
			// e.g. 123,456,789,"floor","useImage","i/special/lava-floor.gif"
			// or 	987,654,321,"tableObj1","hasWriting","Kilroy was here""

var stories ={	// wants E. Suggested sub-stories A,B, C, etc.
	"storyName":{
		"trigger":{},// event that triggers a clue "I need to do X"
		"A":{},// A + B = C. User can find another way if he can.
		"B":{},// includes CANONICAL name, and list for variations. // Manually add to those lists as you think of them.
		"C":{},// if true, ends the story. test an event condition
		"subStory1":{"trigger":{},"A":{},"B":{},"C":{}},// normally triggered by some element in previous subStories
		"subStory1":{"trigger":{},"A":{},"B":{},"C":{}},
	}
}
// test 1: want[fruit] -> get fruit, win!
// test 2: more details from Adam and Eve
// test 3: A+B=C to get the fruit
// test 4: fruit leads to Great Flood
// etc.



function clickThing(){// pick up, etc.
	function pickUp(){
		function isStuckDown(){// out of reach, nailed down, etc.
			// lastClicked must be suitable tool:  wirecutters, piece of paper to reach cashcard, etc.
		}
		function pickUpOutside(){ // small drop in who.social.moral  // Natural resources matter!
		}
	}
	function combineWithLastClicked(){// ONLY remember inventory, table or floor objects. Otherwise always says "door", "floor", etc.
		// nose glasses, membership card, etc.     >   in club // change "wear nose glasses" to "tint" or "get electronic device" etc.
		// offTV + Plug        >   offTV=standbyTV
		// standbyTV + remote  >   standbyTV=onTV
		// crayon + paper      >   paper=map
		// butterKnife +floorboard > butterKnife#damaged  // #qualifiers can be added to any object. Say "damaged" not "bent" so don't need different image
		// fish bowl + tape 	>	fishBowl becomes helmet.
		// helmet + oxygenTank >	skill[ownAir]	// cannot SHOW, so use hidden tubes instead and say "in pockets so nobody sees"
		// music + tapeRecorder > 	skill[canplayMusic#track] // e.g. music#track is key to door
		// magicText + porridgeOff > porridgeON	+ floor=porridge + doors shut + doorKey = porridgeOff; // porridgeOff = porridePot in off position
		// magicText + porridgeOn  > porridgeOFF + floor=normal // doos stil shut, but check keys if it ony takes porridgeOff then you can walk through
	}
	function hasInfo(){ // e.g. TV has show, paper has writing, etc.
		// give clue OR provide skill (teaches you something useful)
		function changeDebt(){ // if ledger or computer/ // e.g. Zak Phone company computer. Game stores debt in a PERSON, not a book or machine.
				// if in house, and you owe a debt // oweFavour[you, negative]
				// if same club as person in house, can change it. Cancels the debt. // otherwise you know they would spot the change right away
		}
	}
	function isTicket(){// yesCancel - go to that place, lose ticket?
	}
	function steal(){ // if inside AND house owner NOT present.
		// yesCancel	- bad affect on morality
		// Owner has high morals? E.g. Les Miserables bishop: lectures you but lets you keep it.
		// else: small random chance that owner appears. Lose the item (and remove from "picked up" records so it reappears)
					// becomes your enemy. If in same club, hurts membership.
	}

}
function clickPerson(who2){  // e.g. YOU click on THEM. Or can randomly automate interactions.
	let a={"i":0, "who1":""} // who1 and who2, so you can try THEM interacting with YOU
	function friendliness(){ // how likely to say yes, or offer a good price
		// calculate based on club[], morality, notes.drunk, owned, etc.
	}
	function getPrice(){
		// how many people have this? E.g. famine: little food, so high price
		// default price based on object
	}
	function animal(){// if skill[talkToAnimals]
		// if can talk trade works well If not, trade is more random. Ants MIGHT still help you, but less likely to.
	}
	function animalSkill(){// lastClicked is something they are good at?
		// of "wants" is something they are good at?
	}
	function beAdvocate(){// person hates lastClicked person?
		// lastClicked was animal / child / weak ?
		// this person is immoral? (preys on weak)
			// OR this person dislikes lasClicked? // oweFavour is negative ?
		// buy their sympathy // give something in return
			// you gain moral points,
			// you become liked by the weak - e.g. ants may help you later
	}
	function sell(){ // ONLY FOR CASH. // not enough space in inventory for lots of trades. Convert to cash unless that is impossible (e.g. animals)
		// how: click YOUR object then person. // lastClicked ONLY rememberS inventory, table, floor, and certain wall objects (e.g. not windows).
		function payDebt(){ // converts oweFavour[you, negative] to cash.
		}
		function payToEscapeTrap(){
		}
		function getThemDrunk(){// thyey have low morals? Sell driunk cheap: they will drink it. notes:drunk#sinceTime. Amount goes down with time

		}
		// shopKeeper? gives fair price, always buys.
		// person? see friendliness() + wants[]. Might randonly still say no.
	}
	function buy(){ // click HIS object then person
		function joinTheirClub(){	// e.g. War of Kings. Choose sides. Join up.
		}
		function theyJoinYourClub(){ // e.g. war of Kings. Get other side to join you.
		}
		// see "sell" for calculations
		// can also buy skill[]
		// can also buy with zero price: e.g. animals: ants have skill[findGrains]. puzzle has wants[findGrains]
	}
	function trade(){ // ONLY IF CASH DOES NOT WORK
		function tradeToEscapeTrap(){
		}
		function gainFavour(){ // Rapunzel: wife wants Rampion, You "sell" her rampion for "oweFavour"
		}
		function loanChild(){ // can sell own[child]  // = they must follow other person (work for)
			// "my only escape is having my child work for her"
			// they evil? cutscene(takeChildToTrap) // e.g. wants[child]: pays a lot: only gets child to follow for a day. Could be divorced parent.
		}
		function animalHelp(){
			// e.g. animals: ants have skill[findGrains]. puzzle has wants[findGrains]
		}
	}
	function checkIfDying(){ // not enough essentials?
		function gotNothingLeft(){
			for(a.i=0; a.i<who1.got.stuff.length; a.i++) if(who1.got.stuff[a.i] >0)return 0;
			return 1;// not found a single item above zero?
		}if(gotNothingLeft()){
			if(who1.social.moral >0.98) cutScene("godsBlessYou");// e.g. stars fall as coins
			else cutScene("die")// fade out; meaningful music
		}
	}
	// no trade. Can you trap them? // NO FIGHTING - complicates code and I don't like it. Reduce EVERY story to trade+trap
	function entice(){	// ready to trap them? // e.g. bare room is designated "oven" (Hansel and Gretel)
		function theyDeserveIt(){
			if(who2.social.moral >0)return 0; // not evil enough. <0 =actively trying to harm
			// not in bad club. If in OTHER club, then YOUR club will thank you for trapping them. e.g. Zak: trap outside Earth. (if trap closed, and yo have key, YOU can get them out)
		}function trapIsPossible(){
			// if((only 1 door)&&(haveKey)&&(themEvil)) // in a trappable situation?
		}function persuade(){
			// if you own[them]: they must follow
			// else they own[you]: "Please show me"; "I don't know how"; "what do so when I am in there?"
			// else "I have the X you want", it is in room Y
						// do they follow? Do YOU have what THEY want ? Compare you.inventory and them.want[]
						// else: just ask.
								// Do they follow? Depends on "club", "oweFavour", amount of money, random, etc.
								// if they do NOT follow, say "I wish there was some way to trap them"
		}function trapWorks(){ // e.g. persuade witch to enter oven; build device that makes alien life intolerable
			// cut scene
				// if them not already inside, they enter the room/house; if you are inside, you exit;
				// cut to them: they say "now with X I can do Y!""
				// cut to you: you lock door; monologue;
				// cut to them: they say "oh no, I was tricked!"
				// cut to you: either "game won" moinologue, animation, music, etc. Or "now I need to" based on current story
		}
		cutScene("entice","who","object");
	}
	function theyEnticeYou(){ // auto. They pretend to have a trade. But YOU choose whether you go there.
		// bad guy will REPEATEDLY try this in different ways until he is stopped.
		if(who2.social.moral >0.5)return 0; // must have SOME evil to do it
		// check YOUR wants and YOUR money, etc.
		// they lie: "I have a X in room Y" (the trap)
	}
	function chat(){
		// inside? person = owner of house? Wil be many houses (50 people, but 1000s of houses). => Landlord: talk ground rent!!
	}
}


function startStory(){
	function randomisePeople(){}// so trades work. Change a little each time they enter.
	function setTrapKeys(){   	// for one-door rooms, or whole houses // Use trades to lure them in.
				// key could be TUNNEL: find the tunnel, enter or escape the room!
				// key could be HAIR: special lock used by Rapunzel witch
				// FIENDISH TRAP: either cutscenes or describe:
						// object you need: throwObjectInSea // need fish to help
										//	hideObjectFarAway // need birds to help
										//  grindObjectUp     // need insects to help
										//  fiendishBeeTrap   // e.g. relies on imperceptable difference between flowers, or syrup or honey based trick
				// ZAK
						// goal: lock out aliens
						//		> device	// reduces all alien money etc. to zero // => they would die. So they exit ANY scene where it is, i.e. exit ANY scene on Earth
						// 			> A + B = C	// implies machine, disguise, ankh, etc.  e.g. machine +bread = crumbs, +birdFeeder = bird, +skill =flyTo, +clue = get crystal!
						//				> clues // historian who wants[buildMachine]
						//				> + locations	// Mount Rainier in Seattle // where the first UFOs were seen
						//				> + local traps: thing you want ids ina  room, but you need a key (Zak markings, Sphinx room lever, etc.)

				// Murders in Rue Morgue
						// person wants[orangUtan] // so he talks about it, looks for it
						// person (starts story): says X is dead, and WHERE
						// needs clues to ANIMAL: people say very savage, very strong, cannot hear language.
						// needs comment on entering murder room: Look at ANYTHING in room: no valuables taken
						// needs items in murder room: orange fur, banana peel // or whatever suggests that animal
						// 							sailor's knot,  // or whatever suggests that location
						// needs random newspaper (says ANIMAL in LOCATION)
						// needs villain (suspect) with animal cage in LOCATION (e.g. coastline)
	}
	function setPuzzleParts(){} // A+B =C, C+D = the device!
	// one part may be "wants", e.g. "wants[findGrains]" - only ants can findGrains, so must talk to animals, then befriend ants
											// ants: get object in lots of grains
                                            // bees: distinguish types of syrup
                                            // birds: get items from high or distant
											// fish/frog/ducks: get items from underwater
				// e.g.	Abraham famine: set name.stuff.food VERY LOW for EVERYBODY except Egyptians.
									// intro clue: we are starving! Later clues: who has food? Triggers talk of slavery, etc.
	function setTimedEvent(){} // e.g. Noah's flood. want[boat, animal1, animal2]. Say "need boat"
			// time by number of scene changes AND/OR clock timer
			// timer triggers cutScene: e.g. raging storm animation, then move into Persan gulf. Reach land = end of game. Score based on number of animals.
}
function changeScene(){
	function changeStrangerWants(){// randomly adjust stranger's wants. This gives person something to say + gives user more chance of trades. Clue: "I now love X even more"
	}
	function costOfTravel(){// if user present, every scene change has a tiny COST. Higher cost if JUMPING. // jump cost: (difX + difY) * 1.5
			// Why higher costs: reward MEMORY - e.g. Hansel and Gretel remember how to get home.
	}
	function followed(){ // own[person]? That person follows. If drunk and X time passes. say "sobered up, no longer follows"
	}
	function triggerTrap(){ // walking into this room might trigger a trap
		// lockable room?
				// enemy has key? // depends on what they have, their hatred, + random
				// else you have key? // if enemy enters, trigger cutScene
						// if DEADLY enemy, you cannot be in same room: You lock SELF in to keep him out (e.g. wolf and seven kids)
						// Timer: after certain time, random chance that he makes his own key. // e.g. wolf looks like mother goat.
				// else owner has key? // if you took their stuff without paying, they lock you in
	}
	function badEnemyAtLarge(){
		// if DEADLY bad guy around (so you would lock self in if you could)
		// he randomly appears. Timer: you can QUICKLY change scenes
	}
	function sayClue(){ // e.g. Rue Morgue murder scene: "no valuables taken, why?""
	}
}


function endStory(){} // reset values to defults: e.g. wants[], own[], traps etc.

/* __________________________________________________________________________________________________________________
WHATABOUT?	- code I am not gong to write, but you can if you want:

horses?
			Lots of stories have horses. So feel free to add images and code for riding horses if you wish. But me? I'm a big of an animal righs guy, so in my stories I avoid treating animals as slaves. I'm just weird that way. Instead, in my stories you can make friends with animaks and they then follow you.

skills?
			Lots of stories have occupations - e.g. a person a barber, so they can cut your hair. Again, if you can find a way to make that code meaningful (how do you cut the hair on a fixed sprite?) then go ahead! But me, I'm not intersted in cosmetic stufff (grow your hair long, I don't mind). Similarly, no need for blacksmiths (see horses, above. and my preference for large wild areas so horses don't need shoes. And no need fo fighting skills, and I prefer to dialogue to fighting. but if you can find a way to add these things, that's great!

magic?
			Lots of stories have magic. But me, again it's  apreference, I like the laws of nature. So to me, magic is just a metaphr for more complex stuff.

annoying people?
			My favourite game included puzzles where yyou annoy people: keep ringing a doorbell, explode an egg in a microwave, burn hay, etc. But I don't like anoying people - I replace these with trades.

hidden behind?
			My favourite game included objects hidden behind other objects: behind a cushion, inside a drawer, ina toolkit, etc. Buit in this game there is no need: We have unlimited rooms and trades instead. So yoiu get the same experience of hunting. if I also hid stuff I think that would drive users crazy - who want to turn over ten thousand objects just in case?

luck?
 		Lots of stories involve luck. (e.g. Grimm's fairy story "Dr Knowall"). but luck does not make an interesting game: a game should be about decisions, not "oh look, I randomly won without doing anything". Luck is here in the form of a SMALL random element in stuff, or maybe some dialog tree about the crazyness fo life.

*/

