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


const Chapter = ({chapNum, endChap}) => {

	//const {getChapterbyId} = useGeneratedChapters();
	const {getChapterByIndex} = useGeneratedChapters();
	const {getCardById} = useGeneratedCards();
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
	//const [currentCardId, setCurrentCardId] = useState();
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
	
	//const [choice, setChoice] = useState();
	let choice;
	const[endChapitre, setEndChapitre] = useState(false);


	//console.log("chapNum : " + chapNum);
	useEffect(() => {
		initializeWorld();
	
	}, []);	


	useEffect(() => {
		//initializeWorld();
		console.log("current chap Num : " +chapNum)

		let units = getChapterByIndex(chapNum).unit;
	
		updatePlayableUnits();
		const cards = getUnitById(units[0]).card;
		setChapterCard([...cards]);
		setCurrentCard(getCardById(cards[0]));
		setCurrentCardIndex(1);
		setCurrentUnitId(getChapterByIndex(chapNum).unit[0]);
		//setCurrentCardId(cards[0]);
		//}
			
	}, [chapNum]);



	function initializeWorld(){
		Object.keys(worldSt).forEach((key) =>{ worldSt[key] = false;});
		//worldSt.chap1_intro = true;
	}


	useEffect(() => {

		if(chapterCard){

		if(currentCardIndex + 1 >= chapterCard.length && chapterUnit.length != 0){

			
			const ran = Math.floor(Math.random() * chapterUnit.length);		
			setCurrentUnitIndex(ran);
			setCurrentUnitId(chapterUnit[ran]);
			console.log("curID : " + currentUnitId);
			
		}
		}

	}, [chapterUnit]);


	
	useEffect(() => {
		//const ac = new AbortController(); //to avoid memory leak
		
		if(currentCardIndex && chapterUnit){
		
			setCurrentUnitId(chapterUnit[currentUnitIndex]);
		
			updateWorldState(chapterUnit[currentUnitIndex]);
			console.log(worldSt);

			/*const currentId = chapterUnit.indexOf(currentUnitId);
			if (currentId > -1) { // only splice array when item is found
		  	chapterUnit.splice(currentId, 1); // 2nd parameter means remove one item only
			}*/

			console.log(chapterUnit)
			
			updateChapterCard(currentUnitIndex);
			setCurrentCardIndex(0);
			
			
		}
		//return () => ac.abort(); 
	}, [currentUnitId]);


	useEffect(() => {
		updateCustomWorld();
		//let customs = currentCard.custom;
        //const worldcustom = {...worldSt, ...customs};
        //setworldSt(worldcustom);

	}, [currentCard]);


	useEffect(() => {
		if(currentUnitId){
			updatePlayableCards();
		}
	}, [worldSt]);

	useEffect(() => {
		if(endChapitre==true){
			
		endChap();
		console.log("----------------------------------------")
		/*let units = getChapterByIndex(chapNum+1).unit;
		let cards = getUnitById(units[0]).card;
		console.log(units)
		console.log(getCardById(cards[0]))*/
		console.log("chapNum :" + chapNum)
		console.log("----------------------------------------")
		
		//console.log("chapNum :" + chapNum)
		}
	}, [endChapitre]);
	
	


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
	


		let units = getChapterByIndex(chapNum).unit;
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

		//setChapterUnit(playableUnits);
		if(playableUnits.length!=0){

			setChapterUnit(playableUnits);
		}else{
			console.log("sunifu");
			setEndChapitre(true);
			//endChap();
		}
		
		console.log("chap unit in upt");
		console.log(chapterUnit)

		

    }

	function updatePlayableCards(){
		let playableCards = [];
        //console.log("getUnitById(currentUnitId) : "+ getChapterUnit(currentUnitId));
        const cards = getUnitById(currentUnitId).card;
		//console.log("card");
		//console.log(cards);

        cards.forEach(element => {
            const conditions = getCardById(element).condition;
			console.log(conditions);
            if(comparaison(conditions, worldSt)){
                //console.log("i");
                playableCards.push(element);
            }
            
        });

		console.log("Nombre de cartes jouables restantes :"+playableCards.length);
        //setUnitCards(playableCards);
		if(playableCards.length !=0){

			setChapterCard(playableCards);
		}

		if(playableCards.length ==0){

			//endChap();
			//setChapterCard( getUnitById("7c00e48218bc42aea11107d0f21f90c3").card)
			//setChapterCard( getUnitById(getChapterByIndex(chapNum+1).unit[0]).card)
			//setEndChapitre(true);
			//chapNum +=1;
			//endChap();
		}
	
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

	function updateCustomWorld(){
        let customs = currentCard.custom;
        const worldcustom = {...worldSt, ...customs};
        setworldSt(worldcustom);
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
		//setChoice("left");
		choice = "left";
		updateWorldStateCard(choice, currentCard.id);
      

		setTimeout(() => {
		  setCurrentMood({happy: [], sad: []});
		}, 50);
	  };
	
	  const onChooseRightAnswer = () => {
		setCurrentMood(currentCard.onRight);
		createNewCard();
		//setChoice("right");
		choice = "right";
		updateWorldStateCard(choice, currentCard.id);
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