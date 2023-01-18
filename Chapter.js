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
	const [worldSt, setworldSt] = useState();
	let {World} = worldState();

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
		
		setworldSt(World);
		/*const firstCond = {"chap1_intro" : true};
		const newWorld = {...worldSt, firstCond};
		setworldSt(newWorld);*/
		let units = getChapterByIndex(0).unit;
		//setChapterUnit([...units]);
		updatePlayableUnits();
		const cards = getUnitById(units[0]).card;
		setChapterCard([...cards]);
		setCurrentCard(getCardById(cards[0]));
		setCurrentCardIndex(currentCardIndex + 1);
	
		//return () => ac.abort(); 
	}, []);



	useEffect(() => {
		//const ac = new AbortController(); //to avoid memory leak
		if(chapterCard && currentCardIndex && chapterUnit){

			
			//updatePlayableUnits();
		if(currentCardIndex + 1 >= chapterCard.length){

			//console.log("fin de l'unit");
			const ran = Math.floor(Math.random() * chapterUnit.length);
			console.log("ran : " + ran);
			setCurrentUnitIndex(ran);
			setCurrentUnitId(chapterUnit[currentUnitIndex]);
			console.log("current unit index end unit: " + chapterUnit[currentUnitIndex]);
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

	useEffect(() => {
		//const ac = new AbortController(); //to avoid memory leak
		if(chapterCard && currentCardIndex && chapterUnit){
			//updatePlayableUnits();

		let curId = chapterUnit[currentUnitIndex];
		const currentId = chapterUnit.indexOf(curId);
		if (currentId > -1) { // only splice array when item is found
		  chapterUnit.splice(currentId, 1); // 2nd parameter means remove one item only
		}
		}

		console.log("chapter unit after use effect splice")
		console.log(chapterUnit);
		//return () => ac.abort(); 
	}, [chapterCard]);
	

	/*useEffect(() => {
		//const ac = new AbortController(); //to avoid memory leak
		if(currentCardIndex && chapterUnit){
			console.log(chapterUnit[currentUnitIndex])
			const currentId = chapterUnit.indexOf(chapterUnit[currentUnitIndex]);
			if (currentId > -1) { // only splice array when item is found
		  	chapterUnit.splice(currentId, 1); // 2nd parameter means remove one item only
			}
			console.log("with splice :")
			console.log(chapterUnit);
		}

	}, [chapterUnit]);*/
	


	function updateChapterCard(index) {
		//console.log("current unit index update chapter card: " + currentUnitIndex);
		console.log("chapter unit in chapter card")
		console.log(chapterUnit);
		console.log("current unit id in chapter card: " + chapterUnit[index]);

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

        let playableUnits = [];
		let j = 0;
		let units = getChapterByIndex(0).unit;
		/*const currentId = units.indexOf(chapterUnit[currentUnitIndex]);
		if (currentId > -1) { // only splice array when item is found
		  units.splice(currentId, 1); // 2nd parameter means remove one item only
		}*/
		units.forEach(element => {
			let conditions = getUnitById(element).condition;
			if(comparaison(conditions, worldSt)){
				playableUnits[j] = element;
				j++;
			}
		})

		setChapterUnit(playableUnits);

    }
	


	function updateWorldState(id){
		//let customs = getUnitById(currentUnitId).custom;
		//let customs = getUnitById(chapterUnit[currentUnitIndex]).custom;
		//let customs = getUnitById("1e3a7a782b9f42f2a63f4a4be85cc08a").custom;
		//console.log("current unit index worldstate : " + currentUnitIndex);
		let customs = getUnitById(id).custom;
		const newWorld = {...worldSt, ...customs}
		setworldSt(newWorld);
		//World = {...World, ...customs};
	
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
		
		console.log("create new card :")

		setCurrentCard(getCardById(chapterCard[currentCardIndex % chapterCard.length]));
		setCurrentCardIndex(currentCardIndex + 1);

		updatePlayableUnits();
		console.log(worldSt);

		console.log("old chapter Unit : ")
		console.log(chapterUnit);
		//console.log("currentUnitIndex create new : " + currentUnitIndex);

		console.log("unitid in create new : " + chapterUnit[currentUnitIndex]);

		console.log("currentUnitId : " + currentUnitId);
		let curId = chapterUnit[currentUnitIndex];
		const currentId = chapterUnit.indexOf(curId);
		if (currentId > -1) { // only splice array when item is found
		  chapterUnit.splice(currentId, 1); // 2nd parameter means remove one item only
		}

		console.log("new playable unit")
		console.log(chapterUnit);

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