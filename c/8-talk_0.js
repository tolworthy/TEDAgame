// TALK = common phrases, and tangents about the meaning of life
function talkToPerson(id){ // AFTER checking story clicks (clicking the person might progress the story)
        l("Talking to " +active.sceneObjects[id].db.name);
        strangers.timeToRandomTalk =20; // do not start talking to each other instantly

        if(story.title ==""){
            say("this is " +active.sceneObjects[id].db.name+ " talking about a new story", active.sceneObjects[id].db.name);
            yesCancel("ready for the first story?","triggerGetStory");
        }
        return;

        // react to current chat topic:
        // either a CLUE
                    // clues
        // or AnswersAnswers topic

}
function addStrangerChat() {
    db.strangerChat.push(
    "How you doing?",
    "I'm fine! And you?",
    "Doing great! I mean, I'm OK. It's good to see you!",
    "How is 'you know what'?",
    "It's fine. Well, can't complain.",
    "That doesn't matter right now. So really, you're doing well?",
    "Well not really, but what can you say? People don't want to hear about my problems.",
    "What's wrong? Is it your sister again? Etc., etc., etc.",
    "You know I've completely forgotten what I came here for.",
    "I know what that's like! Sometimes I forget where I am and what I've just said",
    "Me too. I just like talking to you."
    );
}
function addTalkLists() {// e.g. say("hello ()foo") -? []foo = array. $bar is variable, e.g."$badGuy" or "$moneyLeft"
    db.talkLists.climbDownSay = [1,// first variable = which to use
    "stuff I say when climbing down"];
}
addStrangerChat();
addTalkLists();

loadJavascript("c/9-music_0.js");
