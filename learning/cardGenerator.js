import KanjiCards from '../data/Kanjitab.js';
// import { save, load } from './Storage';
import Config from '../tools/Config.js';

const getLearnedKanjis = async () => {
  let kanjis = await load(Config.kanjiKey);
  return kanjis.filter(k => k.lesson != Config.maxKanjiWeight);
}

const getRandomLearnedKanji = async () => {
  let learnedKanjis = await getLearnedKanjis();
  return learnedKanjis[Math.random() * learnedKanjis.length];
}

const maxValue = (newValue) => Math.min(newValue, Config.maxKanjiWeight);
const minValue = (newValue) => Math.max(newValue, 0);

const getKanjiWeightNewValue = (currentValue, answer) => {
  return (answer) ? minValue(currentValue - 1) : maxValue(currentValue + Config.wrongAnswerPenalty);
}

/** 
 * Doubles the weight on wrong answer.
 * Lowers the weight on a right answer. 
 * @param kanji String - Updated kanji
 * @param answer bool - The result (right / wrong) given by the player
 */
const updateKanjiTestWeight = async (kanji, answer) => {
  allKanjis = await load(Config.kanjiKey);
  allKanjis[kanji].test = getKanjiWeightNewValue(allKanjis[kanji].test, answer);

  save(Config.kanjiKey, allKanjis)
    .then(() => console.log("Saved test result."))
    .catch((err) => console.err(err));
}

let id = 1000000;

const generateId = () => {
  return id++;
}

/**
 * Converts an id to its hexadecimal representation.
 * @param {Number} id 
 * @returns {String} a hexadecimal string
 */
const hex = (id) => {
  return id.toString(16);
}

const generateLessonTemplate = (index, description) => {
  return {
    "Name": "Lesson",
    "id": hex(generateId()), // Generate new id ?
    "Unit": Config.lessonUnitId, // Id for lessons
    "Person": "Lesson",
    "Status": "OK",
    "card_type": "lesson_card_" + index,
    "character": "tortuelecon",
    "condition": {},
    "question": description,
    "leftText": "Précédent",
    "onLeft": "",
    "rightText": "Suivant",
    "onRight": "",
    "custom": {},
    "left_custom": {},
    "right_custom": {},
    "left_next_card": "",
    "right_next_card": "",
    "difficulté": "",
    "Kanji": "",
    "background": "#D6D6D6",
    "image": "https://cdn-icons-png.flaticon.com/512/10197/10197245.png",
    "itemId": ""
  }
};

const generateDescription = (kanji, prononciation, translation) => {
  return "Kanji : " + kanji + '\n'
    + 'Prononciation : ' + prononciation + '\n'
    + 'Signification : ' + translation;
}

const generateLessonCards = (kanjis) => {
  console.log("Generating cards for: " + kanjis);
  let kanjiLessonCards = [];

  let kanjiDict = KanjiCards()["KanjiCards"];

  for (let kanji of kanjis) {
    let kanjiDictionaryData = kanjiDict[kanji];
    console.log("Kanji: " + kanji);
    console.log(kanjiDict[kanji]);
    kanjiLessonCards.push(generateLessonTemplate(0,
      generateDescription(kanji, kanjiDict[kanji]["Lecture"], kanjiDict[kanji]["Trad"])));

    if (kanjiDictionaryData["Mnemotechnique"].length > 0) {
      kanjiLessonCards.push(
        generateLessonTemplate(1, kanjiDict[kanji]["Mnemotechnique"]));
    }

    if (kanjiDictionaryData["Combinaison"].length > 0) {
      kanjiLessonCards.push(
        generateLessonTemplate(2, "Combinaisons : \n" + kanjiDict[kanji]["Combinaison"] + ": " + kanjiDict[kanji]["Traduction"]));
    }
  };

  linkLessonCards(kanjiLessonCards);

  console.log("Generated cards:");
  console.log(kanjiLessonCards);
  return kanjiLessonCards;
}

/**
 * Links card data, with the `left_next_card` and `right_next_card` fields.
 * 
 * @param {String} previousId id as hexadecimal string
 * @param {Card} current current card in the list
 * @param {String} nextId id as hexadecimal string
 */
const linkCards = (previousId, current, nextId) => {
  if (previousId) {
    current["left_next_card"] = previousId;
  }

  if (nextId) {
    current["right_next_card"] = nextId;
  }
}

const linkEdgeLessonCards = (previousId, current, nextId) => {
  if (!previousId) {
    current["leftText"] = "Suivant";
  }
}

/**
 * Changes the generated lesson card and links them to be usable in the game.
 * @param {Array<Card>} kanjiLessonCards 
 */
const linkLessonCards = (kanjiLessonCards) => {
  linkCards(kanjiLessonCards[1]["id"], kanjiLessonCards[0], kanjiLessonCards[1]["id"]);
  kanjiLessonCards[0]["leftText"] = "Suivant";
  for (let i = 1; i < kanjiLessonCards.length - 1; i++) {
    linkCards(kanjiLessonCards[i - 1]["id"], kanjiLessonCards[i], kanjiLessonCards[i + 1]["id"]);
  }
  linkCards(kanjiLessonCards[kanjiLessonCards.length - 2]["id"], kanjiLessonCards[kanjiLessonCards.length - 1], "");
  kanjiLessonCards[kanjiLessonCards.length - 1]["rightText"] = "J'ai fini !";
}

const generateTest = (kanji) => {
  let kanjiDictionaryData = KanjiCards[kanji];
  let onRight = (Math.random() - 0.5) > 0;
  let wrongKanji = getRandomLearnedKanji();

  while (wrongKanji === kanji) {
    wrongKanji = getRandomLearnedKanji();
  }

  // TODO Set an info on the card to update the kanji test weight.
  return {
    "Name": "Evaluation",
    "id": hex(generateId()), // Generate new id ?
    "Unit": Config.testUnitId, // Id for tests
    "Person": "Test",
    "Status": "OK",
    "card_type": "evaluation_card",
    "character": "Test",
    "condition": {},
    "question": "Quelle est la signification de " + kanji + " ?",
    "leftText": onRight ? KanjiCards[wrongKanji]["Trad"] : kanjiDictionaryData["Trad"],
    "onLeft": onRight ? "+" : "-",
    "rightText": onRight ? kanji["Trad"] : KanjiCards[wrongKanji]["Trad"],
    "onRight": onRight ? "-" : "+",
    "custom": {},
    "left_custom": {},
    "right_custom": {},
    "left_next_card": "",
    "right_next_card": "",
    "difficulté": "",
    "Kanji": "",
    "background": "#D6D6D6",
    "image": "https://cdn-icons-png.flaticon.com/512/3609/3609741.png",
    "itemId": ""
  };
}

const generateTests = (kanjis, nextChapterId) => {
  let tests = [];

  for (let i = 0; i < Config.testSize; i++) {
    tests[i] = generateTest();
  }

  return tests;
}

const generateLessonChapter = () => {
  return {
    "Name": "Leçon",
    "id": Config.lessonChapterId,
    "Person": "",
    "Status": "",
    "condition": "",
    "date": "",
    "unit": [Config.lessonUnitId],
    "difficulté": "",
    "background": ""
  };
}

const generateLessonUnit = (kanjis) => {
  console.log("For kanjis: " + kanjis);
  let cards = generateLessonCards(kanjis);
  console.log("Generated:");
  console.log(cards.map(card => card["id"]));
  let unit = {
    "Name": "Leçon dynamique",
    "id": Config.lessonUnitId,
    "card": cards.map(card => card["id"]),
    "Person": "",
    "Status": "",
    "condition": { "lesson": false },
    "custom": { "lesson": true },
    "background": ""
  };
  return { unit: unit, cards: cards };
}

export { generateTest, generateLessonChapter, generateLessonUnit };
