import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Chapter from './Chapter';
import StartButton from './StartButton';
import KanjiButton from './KanjiButton';
import KanjiMenu from './KanjiMenu';



export default function AnimatedStyleUpdateExample() {
  const [chapNum, setChapNum] = useState(0);
  const [data, setData] = useState(null);
  const [showStartButton, setShowStartButton] = useState(true);
  const [showKanjiButton, setShowKanjiButton] = useState(true);
  const [showKanjiMenu, setShowKanjiMenu] = useState(false);
  const [showChapter, setShowChapter] = useState(false);

  const onStartKanji = () => {
    setTimeout(() => {
      setShowStartButton(false);
      setShowKanjiButton(false);
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
      setShowChapter(true);
    }, 500);
  };

  const onMenuReturn = () => {
    setTimeout(() => {
      setShowStartButton(true);
      setShowKanjiButton(true);
      setShowKanjiMenu(false);
      setShowChapter(false);
      setChapNum(0);
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

  const clearSave = () => save({}).then(() => console.log("Clear successful"));

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
    const tmp = await load();
    setData(tmp);
  }, []);

  const increment = () => {
    console.log("incrementé");
    setChapNum(chapNum + 1);
  }

  return (
    <View>
      {showKanjiButton && <KanjiButton onPress={onStartKanji} />}
      {showKanjiMenu && <KanjiMenu data={data} />}
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
