import {View, Text, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import Card from './Card';
import PlaceholderBackCards from './PlaceholderBackCards';
import Question from './Question';
import PowerIndicators from './PowerIndicators';
import PlaceholderBackStaticCard from './PlaceholderBackStaticCard';
import StartButton from './StartButton';
import useGeneratedCards from './useGeneratedCards';

import useGeneratedChapters from './useGeneratedChapters';
import Chapter from './Chapter';

export default function AnimatedStyleUpdateExample() {
  const {getChapterbyIndex} = useGeneratedChapters();
  const [currentChapter, setCurrentChapter] = useState({});
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  const [firstChapCard, setFirstChapCard] = useState();

  useEffect(() => {
    const ac = new AbortController(); //to avoid memory leak
    setFirstChapCard("505dc8c39ed34f48ad448e8146dcb60e");
    return () => ac.abort(); 
  }, []);


  //firstChap_card = "61c18699d09246ba82c75b1510188461";

 /* const {getCardByIndex} = useGeneratedCards();
  //const {getCardById} = useGeneratedCards();
  const [currentCard, setCurrentCard] = useState({});
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentMood, setCurrentMood] = useState({happy: [], sad: []});

  const [showStartButton, setShowStartButton] = useState(true);
  const [showAnimatedReverseCard, setShowAnimatedReverseCard] = useState(false);
  const [showReverseCard, setShowReverseCard] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);*/


  //setFirstChapCard("1a1681d447ac4562a19d1b10d9ecf137");


  // TODO refactor those settimeouts
  /*const showNextCard = (timeout) => {
    setTimeout(() => {
      setShowCard(true);
      setTimeout(() => {
        setShowQuestion(true);
      }, 10);
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

  const onChooseLeftAnswer = () => {
    setCurrentMood(currentCard.onLeft);
    createNewCard();
    setTimeout(() => {
      setCurrentMood({happy: [], sad: []});
    }, 50);
  };

  const onChooseRightAnswer = () => {
    setCurrentMood(currentCard.onRight);
    createNewCard();
    setTimeout(() => {
      setCurrentMood({happy: [], sad: []});
    }, 50);
  };

  const createNewCard = () => {
    setShowQuestion(false);
    setTimeout(() => {
      // let it fly away in peace for 300 ms
      setCurrentCard(getCardByIndex(currentCardIndex));
      setCurrentCardIndex(currentCardIndex + 1);
      setShowCard(false);
    }, 300);
    showNextCard(500);
  };*/

  return (
    //<Text>TESTEST</Text>
    <Chapter firstCard={firstChapCard} />
    /*<View style={styles.wrapper}>
      <View style={styles.topWrapper}>
        <PowerIndicators currentMood={currentMood} />
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
    </View>*/

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