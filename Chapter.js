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
	let {World} = worldState();
	const [worldSt, setworldSt] = useState(World);
	

	const {getUnitById} = useGeneratedUnits();
	const {getUnitByIndex} = useGeneratedUnits();
	const {getUnitCardByIndex} = useGeneratedUnits();

	const {getChapterUnit} = useGeneratedChapters();
	const [chapterUnit, setChapterUnit] = useState([]);
	const [unitCards, setUnitCards] = useState([]);
	const [currentUnitIndex, setCurrentUnitIndex] = useState(0);
	const [currentUnitId, setCurrentUnitId] = useState();
	//const [chapFirstCard, setChapFirstCard] = useState({});
	const [currentCard, setCurrentCard] = useState({});
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [nextCard, setNextCard] = useState("");
	const [currentMood, setCurrentMood] = useState({happy: [], sad: []});
	
	const [showStartButton, setShowStartButton] = useState(true);
	const [showAnimatedReverseCard, setShowAnimatedReverseCard] = useState(false);
	const [showReverseCard, setShowReverseCard] = useState(false);
	const [showCard, setShowCard] = useState(false);
	const [showQuestion, setShowQuestion] = useState(false);
	const [chapterCard, setChapterCard] = useState([]);
	const [random, setRandom] = useState(0);
	



	
	useEffect(() => {
		//const ac = new AbortController(); //to avoid memory leak
		initializeWorld();
		//setworldSt(World);
		/*const firstCond = {"chap1_intro" : true};
		const newWorld = {...worldSt, firstCond};
		setworldSt(newWorld);*/
		let units = getChapterByIndex(0).unit;
		setChapterUnit([...units]);
		const cards = getUnitById(units[0]).card;
		setChapterCard([...cards]);
		setCurrentCard(getCardById(cards[0]));
		setCurrentCardIndex(currentCardIndex + 1);
	
		//return () => ac.abort(); 
	}, []);

		//setCurrentCard(getCardById("505dc8c39ed34f48ad448e8146dcb60e"));

	function initializeWorld(){
		Object.keys(worldSt).forEach((key) =>{ worldSt[key] = false;});
		worldSt.chap1_intro = true;
	}


	useEffect(() => {
		//const ac = new AbortController(); //to avoid memory leak
		if(chapterCard && currentCardIndex && chapterUnit){

			
			//updatePlayableUnits();
		if(currentCardIndex + 1 >= chapterCard.length){

			console.log("fin de l'unit");
			const ran = Math.floor(Math.random() * chapterUnit.length);
			console.log("ran : " + ran);
			setCurrentUnitIndex(ran);
			
		}
		}
		//return () => ac.abort(); 
	}, [chapterUnit]);

	useEffect(() => {
		//const ac = new AbortController(); //to avoid memory leak
		if(chapterCard && currentCardIndex && chapterUnit){
			//updatePlayableUnits();
			updateWorldState(chapterUnit[currentUnitIndex]);
			updateChapterCard(currentUnitIndex);
			setCurrentCardIndex(0);
		
		}
		//return () => ac.abort(); 
	}, [currentUnitIndex]);

	function updateChapterCard(index) {
		console.log("current unit index update chapter card: " + currentUnitIndex);
		const cards = getUnitById(chapterUnit[index]).card;
		setChapterCard([...cards]);
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
		console.log("current unit index playable units : " + currentUnitIndex);
        let playableUnits = [];
		let j = 0;
		let units = getChapterByIndex(0).unit;
		units.forEach(element => {
			let conditions = getUnitById(element).condition;
			if(comparaison(conditions, worldSt)){
				playableUnits[j] = element;
				j++;
			}
		})

		setChapterUnit(playableUnits);

		let playableCards = [];
		
		unitCards.forEach(element => {
			const conditions = getCardById(element).condition;
			if(comparaison(conditions, currentWorld)){
				playableCards.push(element);
			}
			
		});

		setUnitCards(playableCards);
    }

	/*function updatePlayableCards(){
		
	}*/

	function updateWorldState(id){
		//let customs = getUnitById(currentUnitId).custom;
		//let customs = getUnitById(chapterUnit[currentUnitIndex]).custom;
		//let customs = getUnitById("1e3a7a782b9f42f2a63f4a4be85cc08a").custom;
		console.log("current unit index worldstate : " + currentUnitIndex);
		let customs = getUnitById(id).custom;
		const newWorld = {...worldSt, ...customs}
		setworldSt(newWorld);
		//World = {...World, ...customs};
	
	}

	function updateWorldStateCard(choice, id){
		if(choice === "right"){
			let rightCustoms = getCardById(id).right_custom;
			const newWorld = {...worldSt,...rightCustoms};
			setworldSt(newWorld);
		}
		else if(choice === "left"){
			let leftCustoms = getCardById(id).left_custom;
			const newWorld = {...worldSt,...leftCustoms};
			setworldSt(newWorld);
		}
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


		//initializeWorld();
		/*setworldSt(World);
		//setWorld(worldState());
		const units = getChapterByIndex(0).unit;
		setChapterUnit([...units]);
		const cards = getUnitById(units[0]).card;
		setChapterCard([...cards]);
		setCurrentCard(getCardById(cards[0]));
		//if(currentCardIndex + 1 < chapterCard.length){
		//setCurrentUnitIndex(currentUnitIndex + 1);
		//setCurrentUnitId(units[0]);
		//console.log(currentUnitId);
		setCurrentCardIndex(currentCardIndex + 1);*/
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
		updateWorldStateCard("left", currentCard.id);
		//setNextCard(currentCard.left_next_card);
		createNewCard();
		setTimeout(() => {
		  setCurrentMood({happy: [], sad: []});
		}, 50);
	  };
	
	  const onChooseRightAnswer = () => {
		setCurrentMood(currentCard.onRight);
		updateWorldStateCard("right", currentCard.id);
		//setNextCard(currentCard.right_next_card);
		console.log(currentCard.question);
		createNewCard();
		setTimeout(() => {
		  setCurrentMood({happy: [], sad: []});
		}, 50);
	  };


	  const createNewCard = () => {
		setShowQuestion(false);
		setTimeout(() => {

		//updatePlayableCards();
		
		// if(nextCard !== ""){
		// 	setCurrentCard(getCardById(nextCard));
		// 	setNextCard("");
		// }

		//updateWorldState(chapterUnit[currentUnitIndex]);
		setCurrentCard(getCardById(chapterCard[currentCardIndex % chapterCard.length]));
		setCurrentCardIndex(currentCardIndex + 1);

		updatePlayableUnits();	
		console.log(worldSt);

		//console.log("current unit index : " + currentUnitIndex);

		/*if(currentCardIndex + 1 >= chapterCard.length){
			console.log("fin de l'unit");
			const ran = Math.floor(Math.random() * chapterUnit.length);
			console.log("ran : " + ran);
			setCurrentUnitIndex(ran);	
		}*/

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