# TEDAgame  (The Endless Do Anything Game)

1. Change the world
2. Make money
3. Have fun creating anything you can imagine!

![TEDAgame screenshot](http://www.tedagame.com/other/game-pic.jpg)

Early version: http://www.tedagame.com/_NEW/

## CONTENTS ##

[Project overview](https://github.com/tolworthy/TEDAgame/blob/master/README.md#project-overview)

[How TEDAgame began](https://github.com/tolworthy/TEDAgame/blob/master/README.md#how-tedagame-began)

[The road map](https://github.com/tolworthy/TEDAgame/blob/master/README.md#the-road-map)

[What we need](https://github.com/tolworthy/TEDAgame/blob/master/README.md#what-we-need)

[Can you draw?](https://github.com/tolworthy/TEDAgame/blob/master/README.md#can-you-draw)

[The biggest game in the world?](https://github.com/tolworthy/TEDAgame/blob/master/README.md#the-biggest-game-in-the-world)

[Change the world](https://github.com/tolworthy/TEDAgame/blob/master/README.md#change-the-world)

[Make money](https://github.com/tolworthy/TEDAgame/blob/master/README.md#make-money)

[Code overview](https://github.com/tolworthy/TEDAgame/blob/master/README.md#code-overview)

![TEDAgame map](http://www.tedagame.com/other/game-map.jpg)

## PROJECT OVERVIEW

TEDAgame is a world of stories that anyone can edit. So it gets bigger and better forever.

The player explores the world. People come up to you and ask for help. That leads to adventures. The code is in three parts: (1) the endless world, (2) a simple language so users can add stories, (3) plugins. The world code and story language are in the simplest possible vanilla Javascript. The plugins can be anything you want.

The endless world can be seen at http://TEDAgame.com/_NEW  (warning: early version: barely tested). It's been in development for 23 years (including four false starts), contains over 5,000 images, 50 characters, unlimited scenes above and below ground, and is designed to expand with your help.

Stories are built on two simple concepts: "trap" and "trade". A trap is anything the player (or your enemy) does not want. A trade is any action that gets what you want. By building every story on the same framework, the game will eventually be able to mix and match elements to create entirely new stories. So users submit stories, the game creates new variants, and users "vote" by choosing stories they like and abandoning ones they don't. And users can also improve the code, or pay others to. So the game will contain thousands of stories, and get better all the time. 

## HOW TEDAgame BEGAN

In 1992 I played a game that let you explore the whole world, other planets, and discover all the most interesting ideas: aliens, ancient history, telepathy, Elvis Presley, you name it. The only bad part was that the game ended. "No problem", I thought. "Adventure games are still new, this runs on a computer: computers compute things. Obviously the next game will automatically compute new locations and new stories. Isn't that what a computer is for?"  

I waited five years. But nobody took that obvious next step. Nobody used the computer for what it was surely designed for. Instead, games focused on graphics and networking - as if a computer was just a new kind of television or telephone. Why aren't we using the computer to compute new ideas? After five years I gave up waiting. I decided to learn how to program, and make my own "do anything game". For the next 18 years I tried different ideas. By 2015 I cracked the problem. Since then I've worked on the game in my spare time (along with other projects). Now that the first stage is complete, it's going on Github so others can join the fun.

## THE ROAD MAP

1. Endless world: **DONE.**

2. Common actions: **DONE.**
(Walk, talk, pickup, climb, game start, game end, etc.)  

3. Simple language for auto-generated stories. **WORKING ON IT.**
I am gradually working through [the pseudo-code](https://github.com/tolworthy/TEDAgame/blob/master/c/pseudo-code.js) that will create unlimited stories. This takes a long time, especiaoly in the early stages. For example, the first simple test story is "don't eat from the tree of knowledge". A super simple story: just click the tree! Easy to code, right? But it features a god character, so I had to stop to create dozens of possible god characters, to generate variant games. And dozens of kinds of trees. And dozens of possible god locations (Eden, Olympus, etc.) And each of these needs a specialised background, which can take up to half a day to draw. The time is worth it: each location will be used in multiple future stories. Next I will create the code to let the player travel to a given location, and this need a money system to work, which needs trading, and so on. All this takes time. And I do have a day job, and this is not my only project! This is why I need your help. Anything you can do, on any part of the game, makes a big difference. 

4. Improve everything!
* World: add more locations, add underwater, flying, space, time travel, other worlds, etc.
* Actions: add reactions to common situations and objects
* Language: make it ever simpler and more robust, so we can eventually describe a story in general terms, and rely on the code to pull in interesting tropes.

5. Release the beta version:
Show users how to create their own simple stories (with no auto-creation). Then show them how to go the extra step and make stories that have variables, so one story can create hundreds of variations. Then show them how to create their own code. And offer to do it for them - see "[make money](https://github.com/tolworthy/TEDAgame/blob/master/README.md#make-money)" below.

6. So the game gets better and better forever.

## WHAT WE NEED

I should probably keep working on the story code myself. But I would LOVE to have help with the stuff that slows me down. Can you...

1. Tidy the code?
Code must be as clear as possible for new users. I am not a great programmer, and I am sure large parts of this could become much shorter and easier to follow.

2. Add stuff you like?
You need to enjoy coding this! So add something you like!

3. Add reusable conversation chunks?
Think what a character might spontaneously say: greetings, observations about the world around them, hints do the user, etc. Anything to make the game feel more alive.

## CAN YOU DRAW?

Can you try to draw a famous location in the style of the game?

![TEDAgame scenes](http://www.tedagame.com/other/game-scenes.jpg)

The game map has 100 famous locations, but only 30 of them have fully drawn images: the rest are auto-generated. Can you draw a new background image in the same style? It doesn't have to be perfect - the style is deliberately rough. And I'll probably end up editing it a bit (don't worry, you'll get the credit). Click on any map location to see the current image. See the folder i/wall/special for examples. I drew all of those in The Gimp (free graphics software). You can use anything you like. Note that the game is nominally set in the year 1900, for copyright reasons. (As any famous story we add has to be pre-1900) It also includes ancient locations. If you draw anything newer than 1900 (e.g. skyscrapers or modern buildings) then we'll also need to create fifty or so small modern buildings so we can create a new "modern city" location style for the scenes nearby.  

Can't draw? That's OK! Can you add properties to in-game objects?
At present, objects in the "database" file are only classified by weight, to see if they can be picked up. But they also need to be classified in other ways that might be useful to a story: "can write on", "can burn", "is valuable", "can be folded", or anything else you can imagine. It's tedious work, but even five minutes helps.

Whether you can code or not, TEDAgame needs you!


## THE BIGGEST GAME IN THE WORLD?

Stories appeal to all people, all ages, all interests. That is, stories have a larger potential market than, say, shoot-em-ups. So however many people buy shooting games, the potential market for a general purpose story game is even larger.

Users can add whatever improvements they want, and that pulls in more users. So TEDAgame can grow exponentially.

Its success and its direction depends on you. If you can make the game super easy to edit and super easy to submit new stories, then the game can be everything anybody would ever want. Why would they go elsewhere?


## CHANGE THE WORLD

By helping with TEDAgame you get to decide the direction of what might become the world's biggest game. But it's not just a game: it's a platform for stories. If history is any guide, the most popular stories will be the classics: ancient legends, Victorian melodramas, and everything in between.

TEDAgame is also a great way to bring history to life: what are the lives of kings and pirates except stories? What are wars and romances except stories? Players can relive the most exciting times in history!

One more thing: TEDAgame is a more natural way to share information. If a topic interests you, and you cannot think of a way to turn it into an adventure story, just turn it into a conversation tree. So when players talk to in-game characters, they get deep conversations on interesting topics.

So you not only get to direct the world's biggest game, you get to increase culture and education around the world!


## MAKE MONEY

TEDAgame is based on users adding content. But lets face it: people are busy, and adding good content takes time and experience. This creates a market: some players specialise in adding content, and other players pay them. This is the business model: get a reputation as a good coder or good story writer. Maybe specialise in one kind of code or story. Then use Patreon so people who like that kind of story can pay a dollar a month to get those stories added.

That is my business model: I created the game, so I figure people are likely to trust me to add content. If a few hundred players give a couple of dollars a month each via Patreon,  that starts to look like a viable income. Personally, I like ancient stories and interesting ideas, so that's the kind of thing I am most likely to add. Maybe you like coding shoot-em-ups, so your followers will pay you to add that functionality? Maybe you're great at writing dialogue, and you create a character who says funny stuff? You could release a new story each month, a kind of soap opera in game form! Maybe you care passionately about some cause or hobby and others do too? TEDAgame is not a single story game: it's a platform for anything you want.

You could even use ads. Personally I don't like ads, but if you can write some code that only shows ads when people opt for your stuff, you can have them in TEDAgame and make your money that way. Just like Youtube: ad revenue, Patreon revenue, sell stuff, whatever. As long as people can clearly opt for the with-ads (and your content) and not-ads (so they only see stuff by ad haters like me). I'm easy going: code what you like. As the originator of TEDAgame I am mostly concerned with just building the platform. We can argue about the details AFTER we're all millionaires. :)

## CODE OVERVIEW

This is the TEDAgame code:

[c/ = code](https://github.com/tolworthy/TEDAgame/tree/master/c)

Javascript and CSS. (index.html is in the root folder). Eventually there will also be "code/" folder for un-minified versions and zipped up images, so users can download the whole game to tinker with offline. The more copies of this game exist, the longer it will last and the more we can benefit from others' code (thanks to the GPL license)

[c/0-variables_0.js](https://github.com/tolworthy/TEDAgame/blob/master/c/0-variables_0.js)

The main variables (and a few related functions). The most important are: active.sceneObjects (the images you see), active.queue (the events that will happen), 
active.changes.list (changes made by the story or the user), and m.fakeRandom() (pseudo-random numbers based on the location, for populating each scene)

[c/1-coreFunctions_0.js](https://github.com/tolworthy/TEDAgame/blob/master/c/1-coreFunctions_0.js)

Functions used behind the scenes. The most important functions are: changeDOM (where the browser actually changes what you see on screen), NEXT_GAME_FRAME (where we read the active.queue), 
and various references to walking (walking is more compicated than other animations)

[c/3-map_0.js](https://github.com/tolworthy/TEDAgame/blob/master/c/3-map_0.js)

The map you can click on (top right hand corner)

[c/4-commands_0.js](https://github.com/tolworthy/TEDAgame/blob/master/c/4-commands_0.js)

The commands you will normally use in a story: e.g. "enter", "dance", "climbUpCave", etc. Note the keyword "_READ_QUEUE_FRAME1"._ Each function is called twice: when the story says "doThis", it simply adds the word "doThis" to the queue. When the word "doThis" gets to the front of the queue, "doThis" is called again, but this time with the argument "_READ_QUEUE_FRAME1"._ Then stuff happens on screen.

[c/5-database_0.js](https://github.com/tolworthy/TEDAgame/blob/master/c/5-database_0.js)

This fills the arrays full of people, names, objects, etc. You might be tempted to replace this with a proper SQL database. But keeping it pure Javascript serves two purposes: (1) It makes the game easier for unskilled users to understand and edit, and (2) It keeps the number of people and objects to a minimum. This means each person or object gets multiple uses, so develops a personality. They start to matter. It also saves time on drawing, saves time on bandwidth, etc.

[c/6-story_0.js](https://github.com/tolworthy/TEDAgame/blob/master/c/6-storyEvents_0.js)

Story code: how it starts and ends, how to react to events, etc. Eventually this will be the heart of the game: how "trap and trade" elements can be combined to create new stories.

[c/7-stories_0.js](https://github.com/tolworthy/TEDAgame/blob/master/c/7-stories_0.js)

The stories themselves,  units of "trap and trade" written in almost-natural language. This is the current focus: developing the language by slowly building the first story. Eventually this will be by far the largest part of the game. Users will be encouraged to write their own stories in this language and submit them as text files. The rest of the code will build stories from these blocks. Note: for copyright reasons, any famous story needs to be from before 1900 wherever possible. In theory, work before 1923 is usually safe, but not always if it involves a famous character.

[c/8-talk_0.js](https://github.com/tolworthy/TEDAgame/blob/master/c/8-talk_0.js)

Conversation code: This will be like Wikipedia: users can add conversation trees on any topic they find of interest. This gives characters a deeper personality.
Also, common phrases: e.g. different ways to say hello, things to say while climbing, and so on.

[c/9-music_0.js](https://github.com/tolworthy/TEDAgame/blob/master/c/9-music_0.js)

Music: Eventually, the game will select suitable music by detecting keywords. Right now, pressing the musical note icon will merely play the first track, then the next one, etc. 

[c/pseudo-code.js](https://github.com/tolworthy/TEDAgame/blob/master/c/pseudo-code.js)

These are the ideas I'm working on right now: sample stories stripped down to their core elements so I can further simplify them into a universal "trap and trade" format. This will be the basis of the finished story language, the core of the game.
folders:

[c/i/ = icons, etc.](https://github.com/tolworthy/TEDAgame/tree/master/c/i)

Note the world map: this is based on the "Natural Earth" projection, with a few tweaks, most noticeably for Pacific islands (to make the map rectangular) and Antarctica (to make it more rounded). Game locations are based on these pixels: 1000 inside scenes (or 100 outside scenes) per pixel.  

[i/ = images](https://github.com/tolworthy/TEDAgame/tree/master/i)

I have drawn over 5,000 images so far, and will create more as needed. But that all takes time, so if anybody feels like adding some in the same style, that would be wonderful! I try to make them deliberately rough so that anybody can draw them. Right now images are uncompressed but wil of course be compressed (probably 4 bit quantised) before the game goes into beta.

**PLEASE RESIST THE TEMPTATION TO "IMPROVE" THE ART.** The style is deliberately rough, so that users, especially non-artists, can easily add their own. "Bad" art also allows users to exaggerate details that are important. All of this enables the "bad" art to feature in more stories. More stories makes an image more interesting: sure, it's just a background object in *this* story, but maybe examining it would open up a *new* story?

[i/person/](https://github.com/tolworthy/TEDAgame/tree/master/i/person)

The character sprites. Note that talking and stretching frames are 96 pixels wide. This is so that the game can scale in steps of 12 pixels. Without this, scaling means images can jump by a pixel, or show parts of another frame when reversed. If adding new frames please keep to 96 pixels if possible. Also note the gaps in the sprites. I also have versions that invldue runnign and sitting down. But both proved to not be worth the extra complexity in the code. Sitting for example means we have to push a "stand" animation *before* other code on the fly, and this created headaches. But if you can make it work then great!

s/ = stories (later)

Eventually the Javascript code will only include the first story (for faster downloading). All others will be stored here, and downloaded as needed.

m/ = music files (not uploaded these yet)

These are music files from Musopen and Kevin McLeod and other user friendly sources. I will not upload them until the copyright code works (on the bottom of the screen). This is because most of them require prominent attribution or they are not legal. The copyright code will also credit usrs who have submitted stories, art, code, etc.

     
#### CODING GUIDELINES

1. The "script kiddie" rule

For the game to work, it MUST be easy for ordinary users to edit. Think of some kid who's learned a bit of Javascript but not much else. Aim for his abilities. So, vanilla Javascript (except for plugins)

2. The "50 year" rule.

Imagine it's the years 2070. Computing devices are unrecognisable. Or maybe it's a dystopia with no reliable or safe Internet. Somebody finds an old version of TEDAgame on some backup disk. It needs to work offline with the minimum of fixing. So, vanilla Javascript (it was so common in 2020 that something should still play it in 2070). And easy to follow code with clear comments, so our user can work out which parts go wrong and fix or bypass them. If he then follows the same 50 year rule, the game will be good for a hundred years! And another hundred, and another...

3. The "plugins can't break it" rule.

I know you are a hot coder and you want to use the latest magic. And you can! But if your plugin relies on an external server, the game must still work without it. And if the code is hard for a script kiddie to follow, it must be easy identify in the code and bypass.

4. The Visual Studio rule

Most variable should be in the form "let a={"name1":value1, "name2":value2}, where "a" is the top level, "b" is the next level, and so on. (We skip "e" because it's a key word.) This is because Microsoft's Visual Studio Code lists every variable in its code outline. But with hundreds of variables the code outline becomes just a list of variables and I can't see the functions! So by hiding variables inside other variables the outline becomes useful again.

5. The family friendly rule

I want the widest possible distribution for this game. So if you plan a lot of blood and sex, you might want to create your own fork of the project.


## GO ON, EDIT SOMETHING!

TEDAgame is after the Holy Grail of gaming: a game that creates endless stories, of exactly the kind you want, and that endlessly improves. Help make it happen! Become rich and famous and change the world!

One last thing. My Internet connection is VERY slow (kilobits per second) and I have a day job (so far!). So when you edit the code it might take me a day or two to thank you. But you *will* have my eternal gratitude. Because I am not a great coder. That's why this took 23 years to get right, and why half of it is still whgat experts call "WTF code". So any help you can give in coding, even just a few minutes, is gratefully received. And **you will be immortalised in the credits list at the bottom of the screen.**

Thanks for reading.

- Chris Tolworthy (the guy who never got over the trauma when his favourite game had to end.)
