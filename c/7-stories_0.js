// see: story,keys;  story.difficulty
db.stories.push( // remember to update story.cast []
    // [bla,bla] =  [canonical, choicesList]        $name=remember this as variable for future use in story
    [   { // 0= intro stuff
            "name":         ["the [fall,destruction] of","[man,paradise]"], // two parts for dramatic title image
            "latestVersion":0,// => 1=>1st choices, 2=>2nd choices, etc. Loop. Synonym groups have different lengths, so results vary.
            "starter":      "anyone", // they just bring news
            "startOffer":   "I need your [advice,advice]: I want to eat the eat the [fruit,treeSubstance] from my [tree, treeType] tree. But [$God, bigGodName] says not to! Will you help?",
            "startReply":   "You want me to [stand up to,challenge] [$God]?",
                // Different word choices? If needed, used length of string to change the pseudorandom choice
            "yesCancelQuestion":"Are you [ready,prepared] to [stand up to,challenge] [$God]?",
            "startDialogue": "[$God, bigGodName] says do not eat the [fruit,treeSubstance] from that [tree, treeType] tree."
                // Keep It Simple: no hierarchy. E.g. NOT apple tree > apple > juice > sweet -> sugar > chemical etc. gaaah!
        },
        ["clue","clickA","who#property#newValue","response",0]
            // e.g. ["I need to eat fruit", "fruit", "God#likes#you#-100", "now God hates me!", tries=0] // or "cutscene#castOut"
            // multi-part tasks: [ "groupClue", [[task1],[task2],[task3]], "groupResponse"] // e.g. Zak crystals for the device

    ]
);

loadJavascript("c/8-talk_0.js");
