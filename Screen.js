import { View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import PlaceholderBackCards from './PlaceholderBackCards';
import Question from './Question';
import PowerIndicators from './PowerIndicators';
import PlaceholderBackStaticCard from './PlaceholderBackStaticCard';
import StartButton from './StartButton';
import useGeneratedCards from './useGeneratedCards';
import Config from './gameconfig';

export default function AnimatedStyleUpdateExample() {
  const { getCardByIndex } = useGeneratedCards();
  const [currentCard, setCurrentCard] = useState({});
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentMood, setCurrentMood] = useState({ happy: [], sad: [] });
  const baseStats = 50;
  const [currentStats, setCurrentStats] = useState(
    { popularity: baseStats, money: baseStats, hygiene: baseStats, happiness: baseStats }
  );
  const [pendingKanjis, setPendingKanjis] = useState([]);

  const [showStartButton, setShowStartButton] = useState(true);
  const [showAnimatedReverseCard, setShowAnimatedReverseCard] = useState(false);
  const [showReverseCard, setShowReverseCard] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);

  // TODO refactor those settimeouts
  const showNextCard = (timeout) => {
    setTimeout(() => {
      setShowCard(true);
      setTimeout(() => {
        setShowQuestion(true);
      }, 100);
    }, timeout);
  };

  const onStartGame = () => {
    setCurrentCard(getCardByIndex(currentCardIndex));
    setCurrentCardIndex(currentCardIndex + 1);

    setTimeout(() => {
      setShowStartButton(false);
      setShowAnimatedReverseCard(true);
    }, 500);
    setTimeout(() => {
      setShowReverseCard(true);
      setTimeout(() => {
        setShowAnimatedReverseCard(false);
      }, 100);
    }, 2000);
    showNextCard(2500);
  };

  const kanjiParser = (text) => {
    const japaneseCharacters = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/g;
    return text.match(japaneseCharacters);
  }

  const updatePendingKanjis = (kanjis) => {
    if (kanjis) {
      console.debug("updatePendingKanjis > Current kanjis: ");
      console.debug(pendingKanjis);
      console.debug("updatePendingKanjis > New kanjis: ");
      console.debug(kanjis);

      // Updating the kanji list
      // But we have the choice between dealing with the list as a heap or a stack
      newKanjiList = pendingKanjis;
      newKanjiList.push(...kanjis);
      newUniqueKanjiList = [...new Set(newKanjiList)];
      console.debug("updatePendingKanjis > new kanji list (before setState): ");
      console.debug(newUniqueKanjiList);
      setPendingKanjis(newUniqueKanjiList);
    }
  }

  useEffect(() => {
    getKanjisForLesson();
  }, [pendingKanjis]);

  const getKanjisForLesson = () => {
    if (pendingKanjis.length > Config.lessonSize) {
      kanjiForLesson = [];
      if (Config.lessonType === "oldest") {
        kanjiForLesson = pendingKanjis.slice(0, Config.lessonSize);
        console.log(`getKanjiForLesson > Let's take the first three encountered kanjis : ${kanjiForLesson}`);
      } else {
        kanjiForLesson = pendingKanjis.slice(- Config.lessonSize);
        console.log(`getKanjiForLesson > Let's take the three most recently encountered kanjis : ${kanjiForLesson}`);
      }
    }
  }

  const cardParser = (text) => {
    const moods = { happy: [], sad: [] }
    const variations = { popularity: 0, money: 0, hygiene: 0, happiness: 0 }

    // Empty effect
    if (!text)
      return {
        moods: moods,
        variations: variations
      };

    // Parsing the card text
    let trimmedText = text.replace(/\s/g, "")
    const regexpWords = /[\+\-]\d+[ABHP]/g;
    const data = trimmedText.match(regexpWords).map((effectText) => effectParser(effectText));
    console.debug("Data: ");
    console.debug(data);

    for (let i = 0; i < data.length; i++) {
      // Sorting moods for animations
      console.debug("Effect: ");
      console.debug(data[i]);
      if (data[i]["mood"])
        moods.happy.push(data[i]["stat"])
      else
        moods.sad.push(data[i]["stat"])

      // Effect : previous value +/- new value
      variations[data[i]["stat"]] = (data[i]["mood"] ? 1 : -1) * data[i]["value"];
    }

    return {
      moods: moods,
      variations: variations
    };
  }

  const statParser = (code) => {
    switch (code) {
      case "A": return "money";
      case "B": return "happiness";
      case "H": return "hygiene";
      case "P": return "popularity";
      default: console.log(`Stat does not exist yet: ${code}`);
    }
  }

  const moodParser = (code) => {
    switch (code) {
      case "+": return true;
      case "-": return false;
      default: console.log(`Mood does not exist yet: ${code}`);
    }
  }

  const effectParser = (text) => {
    // Recognizes "+3P -5A (...)"
    const regexpMood = /[\+\-]/;
    const regexpValue = /\d+/;
    const regexpStat = /[ABHP]/;

    const mood = moodParser(text.match(regexpMood)[0]);
    const value = text.match(regexpValue)[0];
    const stat = statParser(text.match(regexpStat)[0]);

    // console.log(`Mood: ${mood}; Value: ${value}; Stat: ${stat}`);
    return { mood: mood, value: value, stat: stat }
  }

  useEffect(() => {
    stats = gameOverStats();
    if (stats.length > 0) {
      console.log(`Game over > you are not in your dream country anymore because of ${(currentStats[stats[0]] >= 100) ? "too much" : "no more"
        } ${stats}`);
    }
  }, [currentStats]);

  const gameOverStats = () => {
    console.debug("Game over > Current stats: ");
    console.debug(currentStats);
    return Object.keys(currentStats).filter(k => currentStats[k] >= 100 || currentStats[k] <= 0);
  }

  // Common method in onChooseLeftAnswer & onChooseRightAnswer
  const updateStats = (moods, variations) => {
    // Is there some change in stats?
    if (moods != {}) {
      console.debug("updateStats > Moods :");
      console.debug(moods);
      setCurrentMood(moods);
      setCurrentStats(
        {
          popularity: currentStats.popularity + variations.popularity,
          money: currentStats.money + variations.money,
          hygiene: currentStats.hygiene + variations.hygiene,
          happiness: currentStats.happiness + variations.happiness
        }
      );
    }

    updatePendingKanjis(kanjiParser(currentCard["Kanji"]));

    createNewCard();
    setTimeout(() => {
      setCurrentMood({ happy: [], sad: [] });
    }, 200);
  }

  const onChooseLeftAnswer = () => {
    console.debug("Current card: ");
    console.debug(currentCard);
    const { moods, variations } = cardParser(currentCard.onLeft);
    updateStats(moods, variations);
  };

  const onChooseRightAnswer = () => {
    console.debug("Current card: ");
    console.debug(currentCard);
    const { moods, variations } = cardParser(currentCard.onRight);
    updateStats(moods, variations);
  };

  const createNewCard = () => {
    setShowQuestion(false);
    setTimeout(() => {
      // let it fly away in peace for 300 ms
      setCurrentCard(getCardByIndex(currentCardIndex));
      setCurrentCardIndex(currentCardIndex + 1);
      setShowCard(false);
    }, 300);
    showNextCard(700);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.topWrapper}>
        <PowerIndicators currentMood={currentMood} currentStats={currentStats} />
      </View>
      <View style={styles.questionWrapper}>
        <Question question={currentCard.question} showQuestion={showQuestion} />
      </View>
      <View style={styles.cardWrapper}>
        {showStartButton && <StartButton onPress={onStartGame} />}
        {showAnimatedReverseCard && <PlaceholderBackCards />}
        {showReverseCard && <PlaceholderBackStaticCard />}
        {showCard && (
          <Card
            onChooseLeftAnswer={onChooseLeftAnswer}
            onChooseRightAnswer={onChooseRightAnswer}
            leftText={currentCard.leftText}
            rightText={currentCard.rightText}
            image={currentCard.image}
            backgroundColor={currentCard.background}
          />
        )}
      </View>
      <View style={styles.nameWrapper} />
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
    height: 200,
    backgroundColor: '#ccc',
  },
});
