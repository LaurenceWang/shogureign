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



export default function AnimatedStyleUpdateExample() {
  const [chapNum, setChapNum] = useState(0);
  const [data, setData] = useState(null);
  const [reload, setReload] = useState(true);

  const [showStartButton, setShowStartButton] = useState(true);
  const [showChapter, setShowChapter] = useState(false);
  const [showKanjiButton, setShowKanjiButton] = useState(true);
  const [showKanjiMenu, setShowKanjiMenu] = useState(false);
  const [showTrophyButton, setShowTrophyButton] = useState(true);
  const [showTrophyMenu, setShowTrophyMenu] = useState(false);
  const [showCreditsButton, setShowCreditsButton] = useState(true);
  const [showCreditsMenu, setShowCreditsMenu] = useState(false);

  const onStartKanji = () => {
    setTimeout(() => {
      setShowStartButton(false);
      setShowKanjiButton(false);
      setShowTrophyButton(false);
      setShowCreditsButton(false);
      setShowKanjiMenu(true);
    }, 500);
  }

  useEffect(() => {
    console.log("menu ? ");
    console.log(data);
  }, [showKanjiMenu])

  const onStartChapter = () => {
    setTimeout(() => {
      setShowStartButton(false);
      setShowKanjiButton(false);
      setShowTrophyButton(false);
      setShowCreditsButton(false);
      setShowChapter(true);
    }, 500);
  };

  const onMenuReturn = () => {
    setTimeout(() => {
      setShowStartButton(true);
      setShowKanjiButton(true);
      setShowTrophyButton(true);
      setShowCreditsButton(true);
      setShowKanjiMenu(false);
      setShowChapter(false);
      setChapNum(0);
      setReload(true);
    }, 500);
  }

  const onStartTrophy = () => {
    setTimeout(() => {
      setShowStartButton(false);
      setShowKanjiButton(false);
      setShowCreditsButton(false);
      setShowTrophyButton(false);
      setShowTrophyMenu(true);
    }, 500);
  }

  const onStartCredits = () => {
    setTimeout(() => {
      setShowStartButton(false);
      setShowKanjiButton(false);
      setShowCreditsButton(false);
      setShowTrophyButton(false);
      setShowCreditsMenu(true);
    }, 500);
  }

  const save = async (data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('@kanji_progression', jsonValue);
    } catch (e) {
      console.error(`Couldn't save data. Error: ${data}`);
      // saving error
    }
  }

  const clearSave = () => save({}).then(() => {
    console.log("Clear successful");
    setReload(true);
  });

  const load = async () => {
    try {
      keys = await AsyncStorage.getAllKeys();
      console.info(keys);
      if (!(keys.includes("@kanji_progression"))) {
        console.info("Initializing kanjis...");
        clearSave();
        console.info("Initialization success.");
      }

      const jsonValue = await AsyncStorage.getItem('@kanji_progression');
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
      const tmp = await load();
      setData(tmp);
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
      {showKanjiMenu && <KanjiMenu data={data} />}
      {showTrophyButton && <TrophyButton onPress={onStartTrophy} />}
      {showTrophyMenu && <TrophyMenu />}
      {showCreditsButton && <CreditsButton onPress={onStartCredits} />}
      {showCreditsMenu && <CreditsMenu />}
      {showStartButton && <StartButton onPress={onStartChapter} />}
      {showChapter && <Chapter chapNum={chapNum} endChap={increment} onMenuReturn={onMenuReturn} kanjiProgression={data} save={save} />}

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
