const Config = {
  lessonSize: 3,
  // number of kanjis reviewed at a time each lesson
  // default: 3

  testSize: 5,
  // number of kanjis tested at a time
  // default: 5

  examSize: 5,
  // number of kanjis tested in the story at a time
  // default: 5

  lessonType: "default",
  // default: newest kanji first
  // oldest: oldest kanji first

  maxKanjiWeight: 5,
  // default: 5
  // It normally doesn't need to change,
  // but could be changed for a better probability method.

  wrongAnswerPenalty: 3,
  // Weight added on wrong answer on a test.
  // default: 3

  minLessonInterval: 7,
  // number of cards required to be played before having a lesson
  // default : 7

  currentKanjiLevel: 1,
  // current level of the learned kanjis
  // default : 1

  kanjiKey: '@kanji_progression'
  // key for the AsyncStorage for the kanji stats
}

export default Config;
