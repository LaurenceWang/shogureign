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

  kanjiPending: '@pending_kanji',

  kanjiKey: '@kanji_progression',
  // key for the AsyncStorage for the kanji stats

  worldKey: '@world_state',
  // key for the AsyncStorage for world state

  chapCardKey: '@chap_card',
  // key for the AsyncStorage for chapter cards

  chapUnitKey: '@chap_unit',
  // key for the AsyncStorage for chapter units

  curCardKey: '@cur_card',
  // key for the AsyncStorage for current card

  curIdMemoKey: '@id_memo',
  // key for the AsyncStorage for id memory

  curStat: '@id_stat',
  // key for the AsyncStorage for stats

  lessonUnitId: 'FFFFFFE0',
  testUnitId: 'FFFFFFE1',
  lessonChapterId: "FFFFFFE"



}

export default Config;
