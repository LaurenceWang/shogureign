import {View, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import Card from './Card';
import PlaceholderBackCards from './PlaceholderBackCards';
import Question from './Question';
import PowerIndicators from './PowerIndicators';
import PlaceholderBackStaticCard from './PlaceholderBackStaticCard';
import StartButton from './StartButton';
import useGeneratedCards from './useGeneratedCards';
import useGeneratedChapters from './useGeneratedChapters';
import useGeneratedUnits from './useGeneratedUnits';
import worldState from './worldState';

const Chapter = ({firstCard }) => {

	//const {getChapterbyId} = useGeneratedChapters();
	const {getChapterByIndex} = useGeneratedChapters();
	const {getChapterByFirstCardId} = useGeneratedChapters();
	const {getCardByIndex} = useGeneratedCards();
	const {getCardById} = useGeneratedCards();
	const {getChapterCardByIndex} = useGeneratedChapters();
	const {World} = worldState();

	const {getUnitById} = useGeneratedUnits();
	const {getUnitByIndex} = useGeneratedUnits();
	const {getUnitCardByIndex} = useGeneratedUnits();

	const {getChapterUnit} = useGeneratedChapters();
	const [chapterUnit, setChapterUnit] = useState([]);
	const [unitCards, setUnitCards] = useState([]);
	const [currentUnitIndex, setCurrentUnitIndex] = useState(0);

	//const [chapFirstCard, setChapFirstCard] = useState({});
	const [currentCard, setCurrentCard] = useState({});
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [currentMood, setCurrentMood] = useState({happy: [], sad: []});
	
	const [showStartButton, setShowStartButton] = useState(true);
	const [showAnimatedReverseCard, setShowAnimatedReverseCard] = useState(false);
	const [showReverseCard, setShowReverseCard] = useState(false);
	const [showCard, setShowCard] = useState(false);
	const [showQuestion, setShowQuestion] = useState(false);
	const [chapterCard, setChapterCard] = useState([]);

	useEffect(() => {
		const ac = new AbortController(); //to avoid memory leak

		/*if(firstCard){
		const cards = getChapterByFirstCardId(firstCard).card;
		setChapterCard([...cards]);
		setCurrentCard(getCardById(firstCard));
		setCurrentCardIndex(currentCardIndex);
		//setChapFirstCard(firstCard);
		}*/
		/*const units = getChapterByIndex(0).unit;
		setChapterUnit([...units]);
		const cards = getUnitById(units[0]).card;
		setChapterCard([...cards]);
		setCurrentCard(getCardById(cards[0]));
		setCurrentCardIndex(currentCardIndex + 1);*/

		//setCurrentCard(getCardById("505dc8c39ed34f48ad448e8146dcb60e"));
		return () => ac.abort(); 
	}, []);
	

	function updateChapterCard(index) {
		//chapterCard.slice(index);
		const cards = getUnitById(chapterUnit[index]).card;
		//setChapterCard([...chapterCard]);
		setChapterCard([...cards]);
    }

	function isEmpty(obj) {
		return Object.keys(obj).length === 0;
	}


	function comparaison(obj1,obj2){

			for(let i in obj2){
			  if(obj1.hasOwnProperty(i)){
				if(obj1[i]!==obj2[i]){
				  return false;
				}
			  }
			}
			return true;
	}

	function updatePlayableUnits(){
        let playableUnits = [];
		let j = 0;

		chapterUnit.forEach(element => {
			let conditions = getUnitById(element).condition;
			if(comparaison(conditions, World)){
				playableUnits[j] = element;
				j++;
			}
		})
		setChapterUnit(playableUnits);
    }

	function updateWorldState(){
		
	}

	const showNextCard = (timeout) => {
		setTimeout(() => {
		  setShowCard(true);
		  setTimeout(() => {
			setShowQuestion(true);
		  }, 10);
		}, timeout);
	  };

	  
	 const onStartChapter = () => {

		/*const cards = getChapterByFirstCardId(chapFirstCard).card;
		setChapterCard([...cards]);
		setCurrentCard(getCardById(firstCard));
		setCurrentCardIndex(currentCardIndex);*/
	

		//const data = ["test", "test2"];
		//setChapterCard([...data]);
		//setCurrentCardIndex(currentCardIndex + 1);
		const units = getChapterByIndex(0).unit;
		setChapterUnit([...units]);
		const cards = getUnitById(units[0]).card;
		setChapterCard([...cards]);
		setCurrentCard(getCardById(cards[0]));
		//if(currentCardIndex + 1 < chapterCard.length){
			setCurrentUnitIndex(currentUnitIndex + 1);
			setCurrentCardIndex(currentCardIndex + 1);
		//}
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
		  //setCurrentCard(getCardById(getChapterCardByIndex(0,currentCardIndex)));
		  //setCurrentCard(getCardById("36f2fddae5f4434da9bc76f0763a28c2"));
		  setCurrentCard(getCardById(chapterCard[currentCardIndex % chapterCard.length]));
		  setCurrentCardIndex(currentCardIndex + 1);

		  if(currentCardIndex + 2 > chapterCard.length && currentUnitIndex + 1 <= chapterUnit.length){
			setCurrentUnitIndex(currentUnitIndex + 1)
			updatePlayableUnits();
			updateChapterCard(currentUnitIndex);
			setCurrentCardIndex(0);
		  }
		  setShowCard(false);
		}, 100);
		showNextCard(150);
	  };


	return (
		
	<View style={styles.wrapper}>
      <View style={styles.topWrapper}>
        <PowerIndicators currentMood={currentMood} />
      </View>
      <View style={styles.questionWrapper}>
        <Question question={currentCard.question} showQuestion={showQuestion} />
      </View>
      <View style={styles.cardWrapper}>
        {showStartButton && <StartButton onPress={onStartChapter} />}
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
	  height: 140,
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

export default Chapter;
