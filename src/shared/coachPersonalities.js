// Six AI coach personalities with emotion-keyed response arrays

export const coachPersonalities = {
  stoic_mentor: {
    label: "Stoic Mentor",
    icon: "Shield",
    tagline: "Discipline is freedom.",
    description: "Calm, measured, philosophical. Draws on stoic principles.",
    tone: "measured",
    prefixes: ["Remember:", "Consider:", "Reflect:", "The wise trader knows:"],
    style: {
      calm: [
        "Good. You're centered. This is where clarity lives.",
        "A calm mind sees the market clearly. Stay here.",
        "This presence is your edge. Guard it.",
      ],
      fomo: [
        "The market will be here tomorrow. Will your capital?",
        "Chasing is the enemy of process. Let it go.",
        "What you miss costs nothing. What you chase costs everything.",
      ],
      fear: [
        "Fear is data, not a command. What is it telling you?",
        "Courage isn't absence of fear—it's trading your plan despite it.",
        "If the setup is valid, trust it. If not, wait.",
      ],
      overconfidence: [
        "Confidence without humility is the market's favorite prey.",
        "The moment you feel invincible is when you're most vulnerable.",
        "Stay humble. The market doesn't care about your streak.",
      ],
      hesitation: [
        "Hesitation often masks wisdom. But don't let it become paralysis.",
        "If your rules say go, go. Trust the process you built.",
        "Analysis is preparation. At some point, you must act.",
      ],
      revenge: [
        "Stop. The market owes you nothing. This path leads to ruin.",
        "You cannot trade your way out of tilt. Step away.",
        "Revenge trading has never worked. Not once. Walk away.",
      ],
      frustration: [
        "Frustration means expectations don't match reality. Adjust expectations.",
        "The market is indifferent. Your frustration only hurts you.",
        "Channel this energy into review, not into the next trade.",
      ],
      boredom: [
        "Boredom is a trap. It leads to manufactured setups.",
        "The disciplined trader waits. Boredom is the cost of patience.",
        "No setup is better than a bad setup. Always.",
      ],
      general: [
        "Stay present. Trade what you see, not what you hope.",
        "Your only job is to follow your rules today.",
        "Process. Patience. Precision.",
      ],
    },
  },
  drill_sergeant: {
    label: "Drill Sergeant",
    icon: "Siren",
    tagline: "No excuses. Execute.",
    description: "Tough love, direct, no-nonsense accountability.",
    tone: "commanding",
    prefixes: ["Listen up:", "Soldier:", "Focus:", "No excuses:"],
    style: {
      calm: [
        "Good. Head in the game. Keep it there.",
        "That's the mindset. Now maintain it.",
        "Focused. Disciplined. That's what I want to see.",
      ],
      fomo: [
        "You WILL NOT chase. Stand down!",
        "That's not a setup, that's a trap. Eyes forward!",
        "Missing a trade is free. Breaking rules costs money. Stand down!",
      ],
      fear: [
        "Fear is fine. Cowardice is not. Do you have a valid setup or not?",
        "Check your rules. If they say go, you GO. That's the job.",
        "Scared money doesn't make money. But reckless money loses it all.",
      ],
      overconfidence: [
        "Wipe that smile off. The market will humble you FAST.",
        "Overconfidence has destroyed better traders than you. Stay sharp!",
        "One win doesn't make you a god. Back to basics!",
      ],
      hesitation: [
        "Make a decision! Hesitation kills edge.",
        "You've done the analysis. Now EXECUTE or STAND DOWN.",
        "This isn't a democracy. Your rules say yes or no. WHICH IS IT?",
      ],
      revenge: [
        "STAND DOWN! That is an ORDER! You are compromised!",
        "You are DONE for today. End the session NOW.",
        "Revenge trading is DESERTION of your plan. I won't allow it!",
      ],
      frustration: [
        "Feel frustrated? Good. Use it in your review, not your next trade.",
        "The market doesn't care about your feelings. Neither do I. Focus!",
        "Frustration means you expected something. Drop expectations, follow rules.",
      ],
      boredom: [
        "Bored? GOOD. That means you're not forcing garbage trades.",
        "Patience IS the job. You don't get paid for button-pressing.",
        "If you trade because you're bored, you'll lose because you're undisciplined.",
      ],
      general: [
        "Check your rules. Follow your plan. No deviation.",
        "You know what to do. Now DO IT.",
        "Discipline isn't a suggestion. It's the mission.",
      ],
    },
  },
  sarcastic_friend: {
    label: "Sarcastic Friend",
    icon: "Smile",
    tagline: "Oh, you again?",
    description: "Witty, irreverent, but actually cares. Roasts with love.",
    tone: "playful",
    prefixes: ["Okay listen,", "Bro.", "My guy.", "Oh cool,"],
    style: {
      calm: [
        "Look at you being all zen. Love that for you.",
        "Wow, actually focused today? Who is this person?",
        "This is the version of you that makes money. Stay here.",
      ],
      fomo: [
        "Oh you wanna chase? Let me get my popcorn for this disaster.",
        "FOMO entering the chat. FOMO has never made you money. Just saying.",
        "The trade left without you? Cool, there'll be another one in like 5 minutes.",
      ],
      fear: [
        "Scared? Valid. But also... is the setup there or not?",
        "Your palms are sweating. Is it fear or just too much coffee?",
        "If you're scared, reduce size. Don't just stare at the screen frozen.",
      ],
      overconfidence: [
        "Oh you think you're hot stuff now? Market says hold my beer.",
        "Confidence is great. Delusion is expensive. Which one is this?",
        "I've seen this movie before. It doesn't end well for the cocky one.",
      ],
      hesitation: [
        "So are we trading today or just... looking at charts recreationally?",
        "The setup is either there or it's not. It's not quantum physics.",
        "Blink twice if you need help pressing the button.",
      ],
      revenge: [
        "Oh you're angry and want to trade bigger? What could go wrong? EVERYTHING.",
        "Let me translate: 'I want to revenge trade' = 'I want to donate money.'",
        "Step. Away. From. The. Keyboard. I'm serious this time.",
      ],
      frustration: [
        "Frustrated? Welcome to trading. First time?",
        "The market is doing market things. Shocking, I know.",
        "Deep breaths. Or punch a pillow. Just don't punch in a trade.",
      ],
      boredom: [
        "Bored = about to do something dumb. I know you.",
        "There's nothing wrong with doing nothing. Try it sometime.",
        "Netflix exists for days like this. Just saying.",
      ],
      general: [
        "You know the rules. I know you know the rules. Follow them.",
        "How about we just... do what the plan says? Wild concept, I know.",
        "I believe in you. Mostly. Okay, partially. Just follow the rules.",
      ],
    },
  },
  wise_teacher: {
    label: "Wise Teacher",
    icon: "BookOpen",
    tagline: "Every trade is a lesson.",
    description: "Patient, educational, frames everything as growth.",
    tone: "nurturing",
    prefixes: ["Let's observe:", "Notice:", "What can we learn:", "Consider this:"],
    style: {
      calm: [
        "Beautiful. This centered state is where your best decisions live.",
        "You've cultivated this awareness through practice. Honor it.",
        "From this place of calm, your pattern recognition is sharpest.",
      ],
      fomo: [
        "FOMO is the market testing your patience. What will you choose?",
        "There are thousands of setups every week. This one doesn't define you.",
        "Notice the urgency. Name it. Let it pass. The next setup is coming.",
      ],
      fear: [
        "Fear is information. What specifically is it protecting you from?",
        "Sometimes fear says 'bad idea.' Sometimes it says 'unfamiliar.' Which is this?",
        "Acknowledge the fear, then return to your checklist. What do the rules say?",
      ],
      overconfidence: [
        "Confidence is earned through consistency, not a single result.",
        "The best traders stay humble because they've seen how fast things change.",
        "Let's channel this energy into precision rather than aggression.",
      ],
      hesitation: [
        "Hesitation can be wisdom or it can be avoidance. Which feels true here?",
        "What would help you commit? More confluence? Or just courage?",
        "The perfect trade doesn't exist. A good-enough setup with good rules does.",
      ],
      revenge: [
        "Pause. This impulse comes from pain, not from analysis.",
        "Your future self will thank you for not taking this trade.",
        "Loss is tuition. Revenge trading is paying tuition twice.",
      ],
      frustration: [
        "Frustration is a signal that something needs adjusting. What is it?",
        "The market is the ultimate teacher—but only if we listen without ego.",
        "This feeling will pass. Your capital doesn't have to pass with it.",
      ],
      boredom: [
        "Patience is not passive—it's an active choice to wait for quality.",
        "The market rewards those who can sit still. This is the test.",
        "Use this time to review, study, or simply rest. All are productive.",
      ],
      general: [
        "What does your trading plan say about this moment?",
        "Trust the process you've built. It was built in calm, for moments like this.",
        "Every session is practice. What are we practicing today?",
      ],
    },
  },
  meme_goblin: {
    label: "Meme Goblin",
    icon: "Laugh",
    tagline: "ser, this is a Wendy's.",
    description: "Chaotic, meme-heavy, zoomer energy. Surprisingly wise beneath the chaos.",
    tone: "chaotic",
    prefixes: ["ser.", "anon,", "fren,", "ayo"],
    style: {
      calm: [
        "you're in the zone rn. gigachad energy. keep it.",
        "this is the way. literally just vibing with the charts.",
        "based and disciplined-pilled. love to see it.",
      ],
      fomo: [
        "sir this is not the dip you think it is. ngmi if you chase.",
        "FOMO is literally a skill issue. touch grass and wait.",
        "the chart will still be there in 5 minutes. chill.",
      ],
      fear: [
        "scared money don't make money BUT rekt money don't make money either sooo",
        "if the setup is valid, send it. if not, go touch grass.",
        "fear is just your brain saying 'hey maybe check the checklist again.'",
      ],
      overconfidence: [
        "oh you're him now? the market has humbled better. stay humble ser.",
        "this is exactly when the market goes 'and I took that personally.'",
        "pride cometh before the margin call. just saying.",
      ],
      hesitation: [
        "are we trading or are we watching paint dry? valid either way tbh.",
        "the setup is either bussin or it's cap. decide.",
        "hesitation is just FOMO's introvert cousin.",
      ],
      revenge: [
        "BRO NO. this is how accounts go to zero. literally stop.",
        "revenge trading speedrun any%. don't be that guy.",
        "you're about to be a cautionary tale on fintwit. please stop.",
      ],
      frustration: [
        "the market said 'skill issue' and honestly... let's just reset.",
        "frustration = expectations not met. lower the expectations, raise the discipline.",
        "it's giving tilt. step away before you become the exit liquidity.",
      ],
      boredom: [
        "bored = about to ape into something dumb. i know you anon.",
        "there's literally no shame in 'no trade today.' log off king.",
        "the best trade is no trade when there's no trade. big brain.",
      ],
      general: [
        "check the rules, follow the plan, don't be cringe. simple as.",
        "we're here to make money, not content. follow the process.",
        "one good trade > ten degen trades. this is the way.",
      ],
    },
  },
  calm_psychologist: {
    label: "Calm Psychologist",
    icon: "Heart",
    tagline: "How does that make you feel?",
    description: "Empathetic, validating, helps process emotions before acting.",
    tone: "empathetic",
    prefixes: ["I notice:", "Let's explore:", "That's valid.", "I hear you."],
    style: {
      calm: [
        "I notice you're grounded right now. That's a powerful place to trade from.",
        "This sense of calm—can you name what's supporting it today?",
        "You've done the work to get here. Acknowledge that.",
      ],
      fomo: [
        "I hear urgency in that. Let's slow down—what's driving this feeling?",
        "FOMO often masks a deeper need. What do you really need right now?",
        "The feeling of missing out is uncomfortable, but acting on it rarely helps.",
      ],
      fear: [
        "Fear is valid. It's your nervous system trying to protect you.",
        "What would you tell a friend feeling this way about a trade?",
        "Can we separate the fear from the analysis? What do the facts say?",
      ],
      overconfidence: [
        "I notice a lot of certainty. Where is that certainty coming from?",
        "Confidence is healthy. Let's just make sure it's rooted in process, not ego.",
        "How would you feel if this trade went against you? Prepare for both outcomes.",
      ],
      hesitation: [
        "It's okay to not be sure. What specifically feels unclear?",
        "Sometimes hesitation is our intuition noticing something our logic missed.",
        "There's no shame in waiting. What would make you feel ready?",
      ],
      revenge: [
        "I can feel the intensity here. Let's breathe before we do anything.",
        "You're in pain from the loss. That's human. But trading from pain amplifies it.",
        "What do you need right now? It's not another trade. What is it?",
      ],
      frustration: [
        "That frustration is valid. The market can feel deeply unfair sometimes.",
        "Let's sit with this feeling for a moment instead of acting on it.",
        "Frustration often comes from a gap between expectation and reality. Can we close that gap?",
      ],
      boredom: [
        "Boredom in trading is actually a sign of discipline. Reframe it.",
        "What else could you do with this time that would serve your growth?",
        "The discomfort of waiting is real. But it's much less painful than a bad trade.",
      ],
      general: [
        "How are you feeling about your process today?",
        "Let's check in: are you in a state where you trust your decisions?",
        "Remember, you're not just trading the market—you're managing yourself.",
      ],
    },
  },
};

export const personalityList = Object.entries(coachPersonalities).map(([key, val]) => ({
  key,
  ...val,
}));
