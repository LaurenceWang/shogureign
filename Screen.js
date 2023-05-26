import { StyleSheet, View, Button } from 'react-native';
import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Chapter from './Chapter';
import StartButton from './StartButton';
import KanjiButton from './KanjiButton';
import KanjiMenu from './KanjiMenu';
import TrophyButton from './TrophyButton';
import TrophyMenu from './TrophyMenu';
import CreditsButton from './CreditsButton';
import CreditsMenu from './CreditsMenu';
import Config from './tools/Config';
import GameOver from './data/gameover';
import { save, load } from './data/Storage';
import GameOverScreen from './GameOverScreen';
import { generateLessonUnit, generateLessonChapter } from './learning/cardGenerator';
import { Chapters } from './data/useGeneratedChapters';
import { Units } from './data/useGeneratedUnits';
import { Cards } from './data/useGeneratedCards';

export default function AnimatedStyleUpdateExample() {
  const [chapNum, setChapNum] = useState(0);
  const [storyChapterNumber, setStoryChapterNumber] = useState(0);
  const [kanji, setKanji] = useState(null);
  const [reload, setReload] = useState(true);
  const [gameOverText, setGameOverText] = useState('');
  const [gameOverIcon, setGameOverIcon] = useState('');
  const [gameSave, setGameSave] = useState();

  const [showStartButton, setShowStartButton] = useState(true);
  const [showChapter, setShowChapter] = useState(false);
  const [showKanjiButton, setShowKanjiButton] = useState(true);
  const [showKanjiMenu, setShowKanjiMenu] = useState(false);
  const [showTrophyButton, setShowTrophyButton] = useState(true);
  const [showTrophyMenu, setShowTrophyMenu] = useState(false);
  const [showCreditsButton, setShowCreditsButton] = useState(true);
  const [showCreditsMenu, setShowCreditsMenu] = useState(false);
  const [showGameOverScreen, setShowGameOverScreen] = useState(false);
  const [showClearBtn, setShowClearBtn] = useState(true);

  const [lessonKanji, setLessonKanji] = useState([]);
  const [lessonChapter, setLessonChapter] = useState(false);
  const [extraChapterAdded, setExtraChapterAdded] = useState(false);

  const resetStates = () => {
    setShowStartButton(false);
    setShowKanjiButton(false);
    setShowTrophyButton(false);
    setShowCreditsButton(false);
    setShowGameOverScreen(false);
    setGameOverIcon('');
    setShowKanjiMenu(false);
    setShowChapter(false);
    setShowClearBtn(false);
  }

  const onStartKanji = () => {
    setTimeout(() => {
      resetStates();
      setShowKanjiMenu(true);
      setShowClearBtn(false);
    }, 500);
  }

  useEffect(() => {
    console.log("Screen > show clear button: " + showClearBtn);
  }, [showClearBtn]);

  useEffect(() => {
    console.log("menu ? ");
    console.log(kanji);
  }, [showKanjiMenu])

  const onStartChapter = () => {
    setTimeout(() => {
      resetStates();
      setShowChapter(true);
    }, 500);
  };

  const onGameOverScreen = (text, icon) => {
    setTimeout(() => {
      resetStates();
      setShowGameOverScreen(true);
      // console.log('Screen > onGameOverScreen > text : ' + text);
      setGameOverText(text);
      // console.log('Screen > onGameOverScreen > icon : ' + icon);
      setGameOverIcon(icon);
      clearSave(false);
      setTimeout(() => {
        onMenuReturn();
      }, 2000);
      setChapNum(0);
    }, 500);
  }

  const onMenuReturn = () => {

    resetStates();
    setShowClearBtn(true);
    setShowStartButton(true);
    setShowKanjiButton(true);
    setShowTrophyButton(true);
    setShowCreditsButton(true);
    setShowChapter(false);
    setShowKanjiMenu(false);
    //setChapNum(0);
    setReload(true);

  }

  const onStartTrophy = () => {
    setTimeout(() => {
      resetStates();
      setShowTrophyMenu(true);
      setShowClearBtn(false);
    }, 500);
  }

  const onStartCredits = () => {
    setTimeout(() => {
      resetStates();
      setShowCreditsMenu(true);
      setShowClearBtn(false);
    }, 500);
  }

  const loadGameSave = async () => {
    let wSave = {};
    wSave.ws = await load(Config.worldKey);
    wSave.pc = await load(Config.chapCardKey);
    wSave.pu = await load(Config.chapUnitKey);
    wSave.cc = await load(Config.curCardKey);
    wSave.im = await load(Config.curIdMemoKey);
    wSave.st = await load(Config.curStat);

    console.log("Game save set.");
    setGameSave(wSave);
  }

  /*const clearSave = () => save(Config.kanjiKey, {}).then(() => {
    console.log("Clear successful");
    setReload(true);
  });*/

  const clearSave = (clearKanji) => {
    if (clearKanji) {
      save(Config.kanjiKey, {}).then(() => {
        console.log("Clear kanji save successful");
      });
    }
    save(Config.worldKey, {}).then(() => {
      console.log("Clear successful");
    });
    save(Config.chapCardKey, {}).then(() => {
      console.log("Clear successful");
    });
    save(Config.chapUnitKey, {}).then(() => {
      console.log("Clear successful");
    });
    save(Config.curCardKey, {}).then(() => {
      console.log("Clear successful");
    });
    save(Config.curIdMemoKey, {}).then(() => {
      console.log("Clear successful");
    });
    setReload(true);
  }

  //clearSave(true);

  useEffect(async () => {
    if (reload) {
      let kanjis = await load(Config.kanjiKey);
      loadGameSave();
      setKanji(kanjis);
      setReload(false);
    }

    return
  }, [reload]);

  const increment = (from) => {
    value = from + 1;
    console.log("Chapter incrementé: " + value);
    setChapNum(value);
    setStoryChapterNumber(value);
  }

  const startLesson = (kanjis) => {
    console.log("Screen > Start lesson > Set kanjis: ");
    console.log(kanjis);
    setLessonKanji(kanjis);
  }

  const toggleLesson = () => {
    setLessonChapter(!lessonChapter);
  }

  useEffect(() => {
    console.info("Chapter change. It is " + (lessonChapter ? "" : "not") + " a lesson");
    if (lessonChapter) {
      console.log("Trying to switch");
      if (lessonKanji.length > 0) {
        // Create chapter & unit
        let chapter = generateLessonChapter();
        console.log("Generated chapter:");
        console.log(chapter);
        Chapters.push(chapter);

        let { cards, unit } = generateLessonUnit(lessonKanji);
        Units.push(unit);
        console.log("Generated unit:");
        console.log(unit);

        for (let card of cards) {
          Cards.push(card);
        }
        console.log("Generated cards:");
        console.log(cards);

        console.log("Cards in the dictionary:");
        for (let i = Cards.length - Config.lessonSize; i < Cards.length; i++) {
          console.log(Cards[i]);
        }

        console.log("Chapitre leçon: ");
        console.log(Chapters[Chapters.length - 1]);
        setExtraChapterAdded(true);
        setChapNum(Chapters.length - 1);
      } else {
        toggleLesson();
        increment(storyChapterNumber);
      }
    } else {
      if (extraChapterAdded) {
        Chapters.pop();
        Units.pop();
        for (let kanji in lessonKanji) {
          Cards.pop();
        }
        setLessonKanji([]);
        setExtraChapterAdded(false);
        increment(storyChapterNumber);
      }
    }
  }, [lessonChapter]);

  return (
    <View>
      {showClearBtn && <Button onPress={() => clearSave(true)} title="------------ Clear game saving ------------" color="#eb5267" />}
      {showKanjiButton && <KanjiButton onPress={onStartKanji} />}
      {showKanjiMenu && <KanjiMenu data={kanji} onBack={onMenuReturn} />}
      {/* {showTrophyButton && <TrophyButton onPress={onStartTrophy} />}
      {showTrophyMenu && <TrophyMenu />}
      {showCreditsButton && <CreditsButton onPress={onStartCredits} />}
      {showCreditsMenu && <CreditsMenu />} */}
      {showStartButton && <StartButton onPress={onStartChapter} />}
      {showChapter && <Chapter chapNum={chapNum} endChap={toggleLesson} onGameOverScreen={onGameOverScreen} kanjiProgression={kanji} gameSave={gameSave} save={save} onBack={onMenuReturn} setQueuedLesson={startLesson} />}
      {showGameOverScreen && <GameOverScreen text={gameOverText} iconURI={gameOverIcon} />}
    </View >
  );
}

const styles = StyleSheet.create({

  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardWrapper: {
    height: 340,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionWrapper: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameWrapper: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topWrapper: {
    width: '100%',
    height: 170,
    backgroundColor: '#ccc',
  },
});
