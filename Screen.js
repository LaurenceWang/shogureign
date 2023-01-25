import { StyleSheet, View, Button, Text } from 'react-native';
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

export default function AnimatedStyleUpdateExample() {
  const [chapNum, setChapNum] = useState(0);
  const [kanji, setKanji] = useState(null);
  const [reload, setReload] = useState(true);
  const [gameSave, setGameSave] = useState();

  const [showStartButton, setShowStartButton] = useState(true);
  const [showChapter, setShowChapter] = useState(false);
  const [showKanjiButton, setShowKanjiButton] = useState(true);
  const [showKanjiMenu, setShowKanjiMenu] = useState(false);
  const [showTrophyButton, setShowTrophyButton] = useState(true);
  const [showTrophyMenu, setShowTrophyMenu] = useState(false);
  const [showCreditsButton, setShowCreditsButton] = useState(true);
  const [showCreditsMenu, setShowCreditsMenu] = useState(false);
  const [showClearBtn, setShowClearBtn] = useState(true);

  const onStartKanji = () => {
    setTimeout(() => {
      setShowStartButton(false);
      setShowKanjiButton(false);
      setShowTrophyButton(false);
      setShowCreditsButton(false);
      setShowKanjiMenu(true);
      setShowClearBtn(false);
    }, 500);
  }

  useEffect(() => {
    console.log("menu ? ");
    console.log(kanji);
  }, [showKanjiMenu])

  const onStartChapter = () => {
    setTimeout(() => {
      setShowStartButton(false);
      setShowKanjiButton(false);
      setShowTrophyButton(false);
      setShowCreditsButton(false);
      setShowClearBtn(false);
      setShowChapter(true);
    }, 500);
  };

  const onMenuReturn = () => {
    setTimeout(() => {
      setShowClearBtn(true);
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
      setShowClearBtn(false);
    }, 500);
  }

  const onStartCredits = () => {
    setTimeout(() => {
      setShowStartButton(false);
      setShowKanjiButton(false);
      setShowCreditsButton(false);
      setShowTrophyButton(false);
      setShowCreditsMenu(true);
      setShowClearBtn(false);
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

  const loadGameSave = (ws, pc, pu, cc, im) =>{
    let wSave = {};
    wSave.ws = ws;
    wSave.pc = pc;
    wSave.pu = pu,
    wSave.cc = cc;
    wSave.im = im;

    setGameSave(wSave);
  }

  /*const clearSave = () => save(Config.kanjiKey, {}).then(() => {
    console.log("Clear successful");
    setReload(true);
  });*/

  const clearSave = () => {
   
    /*save(Config.kanjiKey, {}).then(() => {
      console.log("Clear successful");
    });*/
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

  /*clearSave();*/


  const load = async (key) => {
    try {
      keys = await AsyncStorage.getAllKeys();
      console.log("keys :");
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
      const ws = await load(Config.worldKey);
      const pc = await load(Config.chapCardKey);
      const pu = await load(Config.chapUnitKey);
      const cc = await load(Config.curCardKey);
      const im = await load(Config.curIdMemoKey); 
      /*console.log("ws : ")
      console.log(ws);
      console.log("pc : ")
      console.log(pc);
      console.log("pu : ")
      console.log(pu);
      console.log("cc : ")
      console.log(cc);
      console.log("im : ")
      console.log(im);*/
      loadGameSave(ws, pc, pu, cc, im);
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
      <View style={styles.btn}>{showClearBtn && <Button onPress={clearSave} title="Clear game saving" style={styles.btn} color="#333333" />}</View>
      {showStartButton && <StartButton onPress={onStartChapter} />}
      {showChapter && <Chapter chapNum={chapNum} endChap={increment} onMenuReturn={onMenuReturn} kanjiProgression={kanji} gameSave={gameSave} save={save} />}

    </View>
  );
}

const styles = StyleSheet.create({
  btn:{
    
    width : '100%',
    height : 40,
   
   
  },

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
