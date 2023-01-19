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
	const [currentMood, setCurrentMood] = useState({happy: [], sad: []});
	
	const [showStartButton, setShowStartButton] = useState(true);
	const [showAnimatedReverseCard, setShowAnimatedReverseCard] = useState(false);
	const [showReverseCard, setShowReverseCard] = useState(false);
	const [showCard, setShowCard] = useState(false);
	const [showQuestion, setShowQuestion] = useState(false);
	const [chapterCard, setChapterCard] = useState([]);
	const [random, setRandom] = useState(0);

	
	useEffect(() => {
		
		initializeWorld();
		let units = getChapterByIndex(0).unit;
	
		updatePlayableUnits();
		const cards = getUnitById(units[0]).card;
		setChapterCard([...cards]);
		setCurrentCard(getCardById(cards[0]));
		setCurrentCardIndex(currentCardIndex + 1);
		setCurrentUnitId("188b7fe299a045299d9ad38778b1c7a4");
	
	}, []);



	function initializeWorld(){
		Object.keys(worldSt).forEach((key) =>{ worldSt[key] = false;});
		//worldSt.chap1_intro = true;
	}


	useEffect(() => {
		//const ac = new AbortController(); //to avoid memory leak
		console.log("passé");
		/*console.log("---------------------------------------")
		console.log(chapterCard)
		console.log("---------------------------------------")
		console.log(currentCardIndex)*/

		if(chapterCard){

		console.log("je suis passé dans l'use effect qui marche pas")

		if(currentCardIndex + 1 >= chapterCard.length && chapterUnit.length != 0){

			
			const ran = Math.floor(Math.random() * chapterUnit.length);		
			setCurrentUnitIndex(ran);
			setCurrentUnitId(chapterUnit[ran]);
			console.log("je suis passé à l'autre unit");
			
		}
		}
		//return () => ac.abort(); 
	}, [chapterUnit]);


	
	useEffect(() => {
		//const ac = new AbortController(); //to avoid memory leak
		console.log("current unit index use effect : " + currentUnitIndex);
		console.log("chapter unit dans useEffect");
		console.log(chapterUnit);
		console.log("current card index :" + currentCardIndex)
		
		if(currentCardIndex && chapterUnit){
		
			setCurrentUnitId(chapterUnit[currentUnitIndex]);
		
			updateWorldState(chapterUnit[currentUnitIndex]);
			console.log(worldSt);

			
			updateChapterCard(currentUnitIndex);
			setCurrentCardIndex(0);

			
			console.log("before");
			console.log(chapterUnit);
			
		}
		//return () => ac.abort(); 
	}, [currentUnitId]);



	function updateChapterCard(index) {
		//console.log("current unit index update chapter card: " + currentUnitIndex);
		//onsole.log("chapter unit in chapter card")
		//console.log(chapterUnit);
		//console.log("current unit id in chapter card: " + chapterUnit[index]);
		
		console.log("currentUnit in updChapCard : " +  getUnitById(chapterUnit[currentUnitIndex]).Name)

		//console.log("currentUnitID updtcard : " + currentUnitId)
		const cards = getUnitById(chapterUnit[index]).card;
		setChapterCard([...cards]);

		//console.log("chap card:");
		//console.log(chapterCard);
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

		console.log("current unit index in uptplayUnit: " + currentUnitIndex)

		console.log("currentUnitID : " + currentUnitId)
        let playableUnits = [];
		let j = 0;
		let units = getChapterByIndex(0).unit;
		const currentId = units.indexOf(currentUnitId);
		if (currentId > -1) { // only splice array when item is found
		  units.splice(currentId, 1); // 2nd parameter means remove one item only
		}
		units.forEach(element => {
			let conditions = getUnitById(element).condition;
			if(comparaison(conditions, worldSt)){
				playableUnits[j] = element;
				j++;
			}
		})

		setChapterUnit(playableUnits);
		console.log("chap unit in upt");
		console.log(chapterUnit)


    }

	function updatePlayableCards(){
		let playableCards = [];
        console.log("getUnitById(currentUnitId) : "+ getChapterUnit(currentUnitId));
        const cards = getUnitById(currentUnitId).card;

        cards.forEach(element => {
            const conditions = getCardById(element).condition;
            if(comparaison(conditions, worldSt)){
                console.log("i");
                playableCards.push(element);
            }
            
        });

        setUnitCards(playableCards);
        console.log("Nombre de cartes jouables restantes :"+playableCards.length);
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
		console.log("---------------------------------------")
		console.log("create new card :")
		//console.log("chapter unit swipe")
		//console.log(chapterUnit);

		//console.log("in create");
		//console.log(chapterUnit);
		
		setCurrentCard(getCardById(chapterCard[currentCardIndex % chapterCard.length]));
		

		updatePlayableUnits();
		setCurrentCardIndex(currentCardIndex + 1);
	
		
		
		//console.log(worldSt);
		



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