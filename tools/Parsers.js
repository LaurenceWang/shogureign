const kanjiParser = (text) => {
  const japaneseCharacters = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/g;
  return text.match(japaneseCharacters);
}

const cardParser = (text) => {
  const moods = { happy: [], sad: [] };
  const variations = { popularity: 0, money: 0, hygiene: 0, happiness: 0 };
  const feedback = { good: 0, bad: 0 };

  // If empty effect
  if (!text)
    return {
      moods: moods,
      variations: variations,
      feedback: feedback
    };

  // Parsing the card text
  let trimmedText = text.replace(/\s/g, "");
  const regexpWords = /[\+\-]\d+[ABHP][YN]?/g;
  let data = trimmedText.match(regexpWords);
  if (data === null) {
    return {
      moods: moods,
      variations: variations,
      feedback: feedback
    };
  }
  data = data.map((effectText) => effectParser(effectText));
  console.debug("Data: ");
  console.debug(data);

  for (let i = 0; i < data.length; i++) {
    // Sorting moods for animations
    console.debug("Effect: ");
    console.debug(data[i]);
    if (data[i]["mood"])
      moods.happy.push(data[i]["stat"]);
    else
      moods.sad.push(data[i]["stat"]);

    // Effect: previous value +/- new value
    variations[data[i]["stat"]] = (data[i]["mood"] ? 1 : -1) * data[i]["value"];

    // Update feedback count
    if (data[i]["fb"] === "good")
      feedback.good++;
      
    else if (data[i]["fb"] === "bad")
      feedback.bad++;
      console.debug(feedback);
  }

  return {
    moods: moods,
    variations: variations,
    feedback: feedback
  };
};

const statParser = (code) => {
  switch (code) {
    case "A": return "money";
    case "B": return "happiness";
    case "H": return "hygiene";
    case "P": return "popularity";
    default: console.error(`Stat does not exist yet: ${code}`);
  }
}

const fbParser = (code) => {
  switch (code) {
    case "Y": return "good"; 
    case "N": return "bad"; 
    default: console.error(`Feedback does not exist yet: ${code}`);
  }
}

const moodParser = (code) => {
  switch (code) {
    case "+": return true;
    case "-": return false;
    default: console.error(`Mood does not exist yet: ${code}`);
  }
}

const effectParser = (text) => {
  // Recognizes "+3P -5A (...)"
  const regexpMood = /[\+\-]/;
  const regexpValue = /\d+/;
  const regexpStat = /[ABHP]/;
  const regexpFb = /[YN]/;

  const mood = moodParser(text.match(regexpMood)[0]);
  const value = text.match(regexpValue)[0];
  const stat = statParser(text.match(regexpStat)[0]);
  const fb = text.match(regexpFb) ? fbParser(text.match(regexpFb)[0]) : '';

  // console.log(`Mood: ${mood}; Value: ${value}; Stat: ${stat}`);
  return { mood: mood, value: value, stat: stat,  fb: fb};
}

export default { cardParser, kanjiParser };