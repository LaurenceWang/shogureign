import { StyleSheet, View } from 'react-native';
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
import Config from './gameconfig';
import GameOver from './data/gameover';
import GameOverScreen from './GameOverScreen';

export default function AnimatedStyleUpdateExample() {
  const [chapNum, setChapNum] = useState(0);
  const [kanji, setKanji] = useState(null);
  const [reload, setReload] = useState(true);
  const [gameOverText, setGameOverText] = useState('');
  const [gameOverIcon, setGameOverIcon] = useState('');

  const [showStartButton, setShowStartButton] = useState(true);
  const [showChapter, setShowChapter] = useState(false);
  const [showKanjiButton, setShowKanjiButton] = useState(true);
  const [showKanjiMenu, setShowKanjiMenu] = useState(false);
  const [showTrophyButton, setShowTrophyButton] = useState(true);
  const [showTrophyMenu, setShowTrophyMenu] = useState(false);
  const [showCreditsButton, setShowCreditsButton] = useState(true);
  const [showCreditsMenu, setShowCreditsMenu] = useState(false);
  const [showGameOverScreen, setShowGameOverScreen] = useState(false);

  const resetStates = () => {
    setShowStartButton(false);
    setShowKanjiButton(false);
    setShowTrophyButton(false);
    setShowCreditsButton(false);
    setShowGameOverScreen(false);
    setGameOverIcon('');
    setShowKanjiMenu(false);
    setShowChapter(false);
  }

  const onStartKanji = () => {
    setTimeout(() => {
      resetStates();
      setShowKanjiMenu(true);
    }, 500);
  }

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
      onMenuReturn();
    }, 500);
  }

  const onMenuReturn = () => {
    setTimeout(() => {
      resetStates();
      setShowStartButton(true);
      setShowKanjiButton(true);
      setShowTrophyButton(true);
      setShowCreditsButton(true);
      setChapNum(0);
      setReload(true);
    }, 2000);
  }

  const onStartTrophy = () => {
    setTimeout(() => {
      resetStates();
      setShowTrophyMenu(true);
    }, 500);
  }

  const onStartCredits = () => {
    setTimeout(() => {
      resetStates();
      setShowCreditsMenu(true);
    }, 500);
  }

  const save = async (key, data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error(`Couldn't save data. Error: ${data}`);
      // saving error
    }
  }

  const clearSave = () => save(Config.kanjiKey, {}).then(() => {
    console.log("Clear successful");
    setReload(true);
  });

  const load = async (key) => {
    try {
      let keys = await AsyncStorage.getAllKeys();
      console.info(keys);
      if (!(keys.includes(key))) {
        console.info("Initializing kanjis...");
        clearSave();
        console.info("Initialization success.");
      }

      const jsonValue = await AsyncStorage.getItem(key);
      console.debug("Load > Value: ");
      console.debug(jsonValue);
      console.debug(typeof (jsonValue))

      return (jsonValue !== null) ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error(`Couldn't load data. Error: ${data}`);
      // error reading value
    }
  }

  // clearSave();

  useEffect(async () => {
    if (reload) {
      const tmp = await load(Config.kanjiKey);
      setKanji(tmp);
      setReload(false);
    }
  }, [reload]);

  const increment = () => {
    console.log("incrementé");
    setChapNum(chapNum + 1);
  }

  return (
    <View>
      {showKanjiButton && <KanjiButton onPress={onStartKanji} />}
      {showKanjiMenu && <KanjiMenu data={kanji} />}
      {showTrophyButton && <TrophyButton onPress={onStartTrophy} />}
      {showTrophyMenu && <TrophyMenu />}
      {showCreditsButton && <CreditsButton onPress={onStartCredits} />}
      {showCreditsMenu && <CreditsMenu />}
      {showStartButton && <StartButton onPress={onStartChapter} />}
      {showChapter && <Chapter chapNum={chapNum} endChap={increment} onGameOverScreen={onGameOverScreen} kanjiProgression={kanji} save={save} />}
      {showGameOverScreen && <GameOverScreen text={gameOverText} iconURI={gameOverIcon} />}
    </View>
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
