import { AppState, Text, View, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import Card from './Card';
import MultipleCard from './MultipleCard';
import PlaceholderBackCards from './PlaceholderBackCards';
import Question from './Question';
import PowerIndicators from './PowerIndicators';
import PlaceholderBackStaticCard from './PlaceholderBackStaticCard';
import useGeneratedCards from './useGeneratedCards';
import useGeneratedChapters from './useGeneratedChapters';
import useGeneratedUnits from './useGeneratedUnits';
import worldState from './worldState';

import GameOver from './data/gameover';

import Config from './gameconfig';
import MultCards from './useGeneratedMultCards';
import Parsers from './Parsers';
import { set } from 'react-native-reanimated';

const Chapter = ({ chapNum, endChap, onMenuReturn, kanjiProgression, save }) => {
	//const {getChapterbyId} = useGeneratedChapters();
	const { getChapterByIndex } = useGeneratedChapters();
	const { getCardById } = useGeneratedCards();
	let { World } = worldState();
	const [worldSt, setworldSt] = useState(World);

	const { getUnitById } = useGeneratedUnits();

	const [chapterUnit, setChapterUnit] = useState([]);
	const [unitCards, setUnitCards] = useState([]);
	const [currentUnitIndex, setCurrentUnitIndex] = useState(0);
	const [currentUnitId, setCurrentUnitId] = useState();
	//const [currentCardId, setCurrentCardId] = useState();
	//const [chapFirstCard, setChapFirstCard] = useState({});

	const [showAnimatedReverseCard, setShowAnimatedReverseCard] = useState(false);
	const [showReverseCard, setShowReverseCard] = useState(false);
	const [showCard, setShowCard] = useState(false);
	const [showMultCard, setShowMultCard] = useState(false);
	const [showQuestion, setShowQuestion] = useState(false);
	const [chapterCard, setChapterCard] = useState([]);

	const [currentCard, setCurrentCard] = useState({});
	const [currentMultCard, setCurrentMultCard] = useState({});
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [currentMood, setCurrentMood] = useState({ happy: [], sad: [] });
	const baseStats = 50;
	const [currentStats, setCurrentStats] = useState(
		{ popularity: baseStats, money: baseStats, hygiene: baseStats, happiness: baseStats }
	);
	const [pendingKanjis, setPendingKanjis] = useState([]);
	const [cardsSinceLastLesson, setCardsSinceLastLesson] = useState(0);
	const [traces, setTraces] = useState([]);
	const [testUnit, setTestUnit] = useState(0);
	const [idMemory, setIdMemory] = useState([]);
	let next_id = "";

	/** Kanji weight info
	 * Weight of the kanji, used for the probability
	 * for them to appear in the lesson and the tests.
	 * For each kanji :
	 * {
	 *  lesson: <number>,
	 *  test: <number>,
	 *  exam: <number>
	 * }
	 * 
	 * <number>: varies between 0 and 5 (arbitrarily).
	 * 0 : doesn't appear
	 * ...
	 * 5 : high chance of appearing
	 * 
	 * 0 happens when the kanji is well-known (burned in Wanikani terms).
	 * No need to review them, maybe test it when it's been a long physical time (months / year).
	 * 
	 * It goes up when : a wrong answer has been given.
	 * 
	 * It goes down when : a correct answer has been given.
	 * For the lesson specifically, it also does when the kanji has been reviewed.
	 */
	const [kanjiWeight, setKanjiWeight] = useState(kanjiProgression);


	//const [choice, setChoice] = useState();
	let choice;
	const [endChapitre, setEndChapitre] = useState(false);

	//console.log("chapNum : " + chapNum);
	useEffect(() => {
		initializeWorld();

		setTimeout(() => {
			setShowAnimatedReverseCard(true);
		}, 500);
		setTimeout(() => {
			setShowReverseCard(true);
			setTimeout(() => {
				setShowAnimatedReverseCard(false);
			}, 100);
		}, 2000);
		showNextCard(2500);
	}, []);

	useEffect(() => {
		// console.log("Kanji progression test: ");
		setKanjiWeight(kanjiProgression);
	}, [kanjiProgression]);

	useEffect(() => {
		//initializeWorld();
		// console.log("current chap Num : " + chapNum)

		let units = getChapterByIndex(chapNum).unit;

		updatePlayableUnits();
		const cards = getUnitById(units[0]).card;
		setChapterCard([...cards]);
		setCurrentUnitId(getChapterByIndex(chapNum).unit[0]);


		setShowQuestion(false);
		setTimeout(() => {

			setCurrentMultCard(MultCards[0]);
			setCurrentCard(getCardById(cards[0]));
			setShowMultCard(true);
			setShowCard(false);
		}, 100);

		showNextCard(150);

		//setCurrentCardIndex(1);
		/*if(chapNum != 0){
			createNewCard(cards, getChapterByIndex(chapNum).unit[0], "");
		}*/

		//createNewCard(cards, getChapterByIndex(chapNum).unit[0], "");
		//updateTrace(cards[0], "left");


		//setCurrentCardId(cards[0]);
		//}

	}, [chapNum]);


	useEffect(() => {



		if (traces.length != 0) {
			console.log("currentCard Id" + currentCard.id);
			console.log("current Unit Id : " + getUnitById(currentUnitId).Name);

			updateCustomWorld()
			console.log("traces :")
			console.log(traces);
			oldId = [currentCard.id];
			newOldId = [...idMemory, ...oldId];
			console.log(newOldId);

			let newWS = updateWorldState(worldSt, traces[traces.length - 1].direction, currentUnitId);
			let newPU = updatePlayableUnits(currentUnitId, newWS);
			console.log("newPU")
			console.log(newPU);

			let newPC = updatePlayableCards(currentUnitId, newWS, newOldId);
			let ranNewPU = shufflePU(newPU);
			console.log("ranNewPU")
			console.log(ranNewPU);
			let newUnitId = currentUnitId;

			if (traces[traces.length - 1].direction == "left") {
				next_id = currentCard.left_next_card;
				console.log("next id left dans useEffect " + next_id);
			} else {
				next_id = currentCard.right_next_card;
				console.log("next id right dans useEffect " + next_id);
			}

			if (!isPlayableCard(newPC) && next_id == "") {
				let hasFoundPC = false
				let WS = newWS;
				let PC = newPC;
				for (let i = 0; i < ranNewPU.length; i++) {
					console.log("testing unit : " + getUnitById(ranNewPU[i]).Name);
					WS = updateWorldState(newWS, traces[traces.length - 1].direction, ranNewPU[i]);
					PC = updatePlayableCards(ranNewPU[i], WS, oldId);
					if (isPlayableCard(PC)) {
						console.log("playable unit id : " + getUnitById(ranNewPU[i]).Name);
						hasFoundPC = true;
						newUnitId = ranNewPU[i];
						//newOldId = [];
						break;
					}
				}

				if (hasFoundPC == false) {
					endChap();
					//setEndChapitre(true);
				}
				else {
					console.log(newUnitId)
					setworldSt(WS);
					setIdMemory(newOldId);
					setChapterCard(PC);
					//setCurrentUnitId(newUnitId);

					createNewCard(PC, newUnitId, next_id);
				}


			} else {

				setworldSt(newWS);
				setIdMemory(newOldId);
				setChapterCard(newPC);
				setChapterUnit(newPU);
				createNewCard(newPC, newUnitId, next_id);
			}


		}

	}, [traces]);

	function pickNewUnit() {
		const ran = Math.floor(Math.random() * chapterUnit.length);
		setCurrentUnitIndex(ran);
		setCurrentUnitId(chapterUnit[ran]);
		//setCurrentCard(getUnitById(ran).card[0]);
		setTestUnit(testUnit + 1);

	}

	function pickRandomCard(unitCard) {
		const ran = Math.floor(Math.random() * chapterCard.length);
		//setCurrentCard(getCardById(unitCard[ran]));
	}

	function isPlayableCard(cards) {
		if (cards.length != 0) {
			return true;
		}
		return false;
	}


	function shufflePU(PU) {
		let array = PU;
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}

		return array;
	}


	/*useEffect(() => {
		if (chapterCard) {
			if (currentCardIndex + 1 >= chapterCard.length && chapterUnit.length != 0) {
				const ran = Math.floor(Math.random() * chapterUnit.length);
				setCurrentUnitIndex(ran);
				setCurrentUnitId(chapterUnit[ran]);
				console.log("curID : " + currentUnitId);
			}
		}
	}, [chapterUnit]);

	useEffect(() => {
		//const ac = new AbortController(); //to avoid memory leak

		if (currentCardIndex && chapterUnit) {
			setCurrentUnitId(chapterUnit[currentUnitIndex]);

			updateWorldState(chapterUnit[currentUnitIndex]);
			// console.log(worldSt);

			console.log(chapterUnit)

			updateChapterCard(currentUnitIndex);
			setCurrentCardIndex(0);


		}
		//return () => ac.abort(); 
	}, [currentUnitId]);


	useEffect(() => {

		console.log("je suis passé dans l'update custom card");
		updateCustomWorld();
		// console.log(worldSt);
		//let customs = currentCard.custom;
		//const worldcustom = {...worldSt, ...customs};
		//setworldSt(worldcustom);

	}, [currentCard]);


	useEffect(() => {
		if (currentUnitId) {
			updatePlayableCards();
		}
	}, [worldSt]);*/

	useEffect(() => {
		if (endChapitre == true) {
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

	function initializeWorld() {
		Object.keys(worldSt).forEach((key) => { worldSt[key] = false; });
		//worldSt.chap1_intro = true;
	}


	function updateChapterCard(index) {
		//console.log("current unit index update chapter card: " + currentUnitIndex);
		//onsole.log("chapter unit in chapter card")
		//console.log(chapterUnit);
		//console.log("current unit id in chapter card: " + chapterUnit[index]);

		console.log("currentUnit in updChapCard : " + getUnitById(chapterUnit[currentUnitIndex]).Name)

		//console.log("currentUnitID updtcard : " + currentUnitId)
		const cards = getUnitById(chapterUnit[index]).card;
		setChapterCard([...cards]);

		//console.log("chap card:");
		//console.log(chapterCard);
	}

	function comparaison(obj1, obj2) {

		for (let i in obj2) {
			if (obj1.hasOwnProperty(i)) {
				if (obj1[i] !== obj2[i]) {
					return false;
				}
			}
		}
		return true;
	}

	/*function updatePlayableUnits() {

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
			if (comparaison(conditions, worldSt)) {
				playableUnits[j] = element;
				j++;
			}
		})

		//setChapterUnit(playableUnits);
		if (playableUnits.length != 0) {

			setChapterUnit(playableUnits);
		} else {
			console.log("sunifu");
			setEndChapitre(true);
			//endChap();
		}

		console.log("chap unit in upt");
		console.log(chapterUnit);
	}*/


	function updatePlayableUnits(unitId, newWorld) {

		let playableUnits = [];
		let j = 0;

		let units = getChapterByIndex(chapNum).unit;
		/*const currentId = units.indexOf(unitId);
		if (currentId > -1) { // only splice array when item is found
			units.splice(currentId, 1); // 2nd parameter means remove one item only
		}*/

		units.forEach(element => {
			let conditions = getUnitById(element).condition;
			if (comparaison(conditions, newWorld)) {
				playableUnits[j] = element;
				j++;
			}
		})
		return playableUnits;
	}


	function updatePlayableCards(unitId, newWorld, oldId) {
		let playableCards = [];
		let cards = getUnitById(unitId).card;
		console.log("oldId tab")
		console.log(oldId);

		cards = cards.filter((x) => !oldId.includes(x));

		/*const currentId = cards.indexOf(oldId);
		if (currentId > -1) { // only splice array when item is found
			cards.splice(currentId, 1); // 2nd parameter means remove one item only
		}*/

		cards.forEach(element => {
			const conditions = getCardById(element).condition;
			if (comparaison(conditions, newWorld)) {
				playableCards.push(element);
			}
		});


		console.log("Nombre de cartes jouables restantes :" + playableCards.length);

		return playableCards;

	}


	/*function updatePlayableCards() {
		let playableCards = [];
		let randomPlayableCards = [];
		//console.log("getUnitById(currentUnitId) : "+ getChapterUnit(currentUnitId));
		const cards = getUnitById(currentUnitId).card;
		//console.log("card");
		//console.log(cards);

		cards.forEach(element => {
			const conditions = getCardById(element).condition;
			//console.log(conditions);
			if (comparaison(conditions, worldSt)) {
				//console.log("i");
				playableCards.push(element);
			}
		});

		/*const nb_tirages= Math.floor(Math.random() * playableCards.length);
		
		for(let i=0; i<nb_tirages; i++){
			const random = Math.floor(Math.random() * playableCards.length);
			randomPlayableCards.push(playableCards[random]);
			playableCards.splice(random, 1);
		console.log("random playable cards :")
		console.log(randomPlayableCards);
		}*/


	/*console.log("Nombre de cartes jouables restantes :" + playableCards.length);

	if (playableCards.length != 0) {
		setChapterCard(playableCards);
	};
	

	/*console.log("Nombre de cartes jouables restantes :" + randomPlayableCards.length);
	if (randomPlayableCards.length != 0) {
		setChapterCard(randomPlayableCards);
	}

}*/

	/*function updateWorldState(id) {
		//let customs = getUnitById(currentUnitId).custom;
		//let customs = getUnitById(chapterUnit[currentUnitIndex]).custom;
		//let customs = getUnitById("1e3a7a782b9f42f2a63f4a4be85cc08a").custom;
		//console.log("current unit index worldstate : " + currentUnitIndex);
		let customs = getUnitById(id).custom;
		const newWorld = { ...worldSt, ...customs }
		setworldSt(newWorld);
		//World = {...World, ...customs};
	}*/

	function updateWorldState(world, choice, UnitId) {

		let customsUnit = getUnitById(UnitId).custom;
		//console.log("customUnit")
		//console.log(customsUnit)
		let customsCard = currentCard.custom;
		//console.log("customCard")
		//console.log(customsCard)

		let newWorld = {};

		if (choice === "right") {
			let rightCustoms = getCardById(currentCard.id).right_custom;
			//console.log("rightCustoms")
			//console.log(rightCustoms)

			newWorld = { ...world, ...rightCustoms, ...customsUnit, ...customsCard };

		}
		else if (choice === "left") {
			let leftCustoms = getCardById(currentCard.id).left_custom;
			//console.log("leftCustoms")
			//console.log(leftCustoms)
			newWorld = { ...world, ...leftCustoms, ...customsUnit, ...customsCard };

		}
		return newWorld;
	}

	function updateWorldStateCard(choice, id) {

		let customs = currentCard.custom;
		const worldcustom = { ...worldSt, ...customs };


		if (choice === "right") {
			let rightCustoms = getCardById(id).right_custom;
			const newWorld = { ...worldSt, ...rightCustoms, ...worldcustom };
			setworldSt(newWorld);
		}
		else if (choice === "left") {
			let leftCustoms = getCardById(id).left_custom;
			const newWorld = { ...worldSt, ...leftCustoms, ...worldcustom };
			setworldSt(newWorld);
		}
	}

	function updateCustomWorld() {
		let customs = currentCard.custom;
		const worldcustom = { ...worldSt, ...customs };
		setworldSt(worldcustom);
	}

	const showNextCard = (timeout) => {
		setTimeout(() => {
			setShowCard(false);
			setCurrentMultCard(MultCards[0]);
			setTimeout(() => {
				setShowQuestion(true);
			}, 10);
		}, timeout);
	};

	const updatePendingKanjis = (newKanjis) => {
		if (newKanjis) {
			/*console.debug("updatePendingKanjis > Current kanjis: ");
			console.debug(pendingKanjis);
			console.debug("updatePendingKanjis > New kanjis: ");
			console.debug(newKanjis);*/

			// Updating the kanji list
			let newKanjiList = pendingKanjis;
			newKanjiList.push(...newKanjis);
			let newUniqueKanjiList = [...new Set(newKanjiList)];
			//console.debug("updatePendingKanjis > new kanji list (before setState): ");
			//console.debug(newUniqueKanjiList);
			setPendingKanjis(newUniqueKanjiList);
		}
	}

	useEffect(() => {
		console.log("useEffect kanji weight: " + kanjiWeight);
		console.debug("Saving kanjis...");

		if (kanjiWeight) {
			save(Config.kanjiKey, kanjiWeight)
				.then(() => console.log("Successfully saved."))
				.catch(err => console.err(err));
		}
	}, [kanjiWeight]);

	useEffect(() => {
		console.log("useEffect (pending kanji) > cards since last lesson: " + cardsSinceLastLesson);
		kanjiLesson = getKanjisForLesson();
		console.debug("After get kanjis for lesson: new kanji weight > ");
		console.debug(kanjiWeight);
	}, [pendingKanjis, cardsSinceLastLesson]);

	const getKanjisForTest = () => {
		// We need to have the lesson on a kanji K first, to be tested on K.
		testableKanjis = Object.keys(kanjiWeight).filter(k => kanjiWeight[k].lesson == 0);
		console.log(Object.keys(kanjiWeight));
		testedKanjis = []

		const findRandomKanji = (randomNumber) => {
			let count = 0;
			for (let i = 0; i < testableKanjis; i++) {
				count += kanjiWeight[testableKanjis[i]].test;
				if (count > randomNumber)
					return testableKanjis.splice(i, 1);
			}
			return testableKanjis.splice(-1, 1);
		}

		for (let i = 0; i < Config.testSize; i++) {
			let totalWeight = testableKanjis.reduce((a, k) => a + kanjiWeight[k].test, 0);
			let kanji = findRandomKanji(Math.floor(Math.random() * totalWeight));

			testedKanjis.append(kanji);
		}

		return testedKanjis;
	}

	const onCorrectAnswer = (k) => {
		kanjiWeight[k].test -= 1;
		setKanjiWeight(kanjiWeight);
	}

	const onWrongAnswer = (k) => {
		// Set the lesson and tests as "unlearned"
		kanjiWeight[k].test = Config.maxKanjiWeight;
		kanjiWeight[k].lesson = Config.maxKanjiWeight;
		setKanjiWeight(kanjiWeight);
	}

	const getKanjisForLesson = () => {
		// Create all new kanji weight
		let kanjiWeightTmp = { ...kanjiWeight };
		let alreadyEncounteredKanjis = Object.keys(pendingKanjis);
		let newKanjis = pendingKanjis.filter(k => !(k in alreadyEncounteredKanjis));

		// Default kanji weight
		newKanjis.forEach(k => kanjiWeightTmp[k] = {
			lesson: 5,
			test: 5,
			exam: 5
		});

		console.log("getKanjisForLesson > Kanji weight");
		console.log(kanjiWeight);


		// Kanjis available for the lesson
		availableKanjis = pendingKanjis.filter(k => kanjiWeightTmp[k].lesson > 0);

		// TODO: If you add new unencountered kanji, change this && to ||.
		if (availableKanjis.length >= Config.lessonSize && cardsSinceLastLesson >= Config.minLessonInterval) {
			let kanjiForLesson = [];

			// We have the choice between dealing with the list as a heap or a stack
			if (Config.lessonType === "oldest") {
				kanjiForLesson = availableKanjis.slice(0, Config.lessonSize);
				console.log(`getKanjiForLesson > Let's take the first three encountered kanjis : ${kanjiForLesson}`);
			} else {
				kanjiForLesson = availableKanjis.slice(-Config.lessonSize);
				console.log(`getKanjiForLesson > Let's take the three most recently encountered kanjis : ${kanjiForLesson}`);
			}

			// Remove the selected kanjis for the selection
			kanjiForLesson.forEach(k => {
				kanjiWeightTmp[k].lesson = 0;

				// EDIT: remove but at the moment of the lesson.
				// Remove the element from the "encountered kanji list"
				i = availableKanjis.indexOf(k);
				availableKanjis.splice(i, 1);
			});

			setKanjiWeight(kanjiWeightTmp);
			setPendingKanjis(availableKanjis);
			// Creates a loop but the loop eventually ends.

			setCardsSinceLastLesson(0);
			return kanjiForLesson;
		}
		return [];
	}

	useEffect(() => {
		// get all stats that cause a game over
		stats = gameOverStats();
		if (stats.length > 0) {
			console.log(`Game over > you are not in your dream country anymore because of ${(currentStats[stats[0]] >= 100) ? "too much" : "no more"} ${stats}`);
			save(Config.kanjiKey, kanjiWeight)
				.then(() => console.log("Saved successfully on game over."))
				.catch(err => console.error(err));
			setTimeout(() => {
				console.log(GameOver[stats[0]][(currentStats[stats[0]] >= 100) ? "max" : "min"]["text"]);
				onMenuReturn();
			}, 500);
		}
	}, [currentStats]);

	const gameOverStats = () => {
		//console.debug("Game over > Current stats: ");
		//console.debug(currentStats);
		return Object.keys(currentStats).filter(k => currentStats[k] >= 100 || currentStats[k] <= 0);
	}

	const updateStats = (moods, variations) => {
		// Is there some change in stats?
		if (moods != {}) {
			//console.debug("updateStats > Moods :");
			//console.debug(moods);
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

		updatePendingKanjis(Parsers.kanjiParser(currentCard["Kanji"]));

		//console.log("updateStats > cards since last lesson before turn count: " + cardsSinceLastLesson);
		setCardsSinceLastLesson(cardsSinceLastLesson + 1);

		//createNewCard();

		setTimeout(() => {
			setCurrentMood({ happy: [], sad: [] });
		}, 50);
	}

	function updateTrace(currentId, chosenDirection) {
		const data = [{ id: currentId, direction: chosenDirection }];
		let currentTraces = [...traces, ...data];

		setTraces(currentTraces);
	}

	const onChooseLeftAnswer = () => {
		//console.debug("Current card: ");
		//console.debug(currentCard);
		//updateTrace(currentCard.id, "left");
		//updateWorldStateCard("left", currentCard.id);
		//nextCardId = currentCard.left_next_card;
		updateStats(moods, variations);
	};

	const onChooseRightAnswer = () => {
		//console.debug("Current card: ");
		//console.debug(currentCard);
		//updateTrace(currentCard.id, "right");

		//updateWorldStateCard("right", currentCard.id);
		//nextCardId = currentCard.right_next_card;
		//updateStats(moods, variations);
	};

	
	const onChooseWestAnswer = (kanji) => {
		//updateTrace(currentCard.id, "west");
		// updateStats(moods, variations);
	};

	const onChooseEastAnswer = (kanji) => {
		
		//updateTrace(currentCard.id, "east");
		// updateStats(moods, variations);
	};

	
	const onChooseNorthAnswer = (kanji) => {
		updateTrace(currentCard.id, "north");
	};

	const onChooseSouthAnswer = (kanji) => {
		const { moods, variations } = Parsers.cardParser(currentCard.onRight);
		updateTrace(currentCard.id, "south");
		updateStats(moods, variations);
	};


	const createNewCard = (newPC, newUnitId, next_id) => {
		setShowQuestion(false);
		setTimeout(() => {
			console.log("---------------------------------------")
			console.log("create new card :")
			//console.log("chapter unit swipe")
			//console.log(chapterUnit);

			//console.log("in create");
			//console.log(chapterUnit);
			/*const ran = Math.floor(Math.random() * chapterCard.length);
			console.log(getCardById(chapterCard[ran]));
			setCurrentCard(getCardById(chapterCard[ran]));*/
			console.log("testest");
			console.log(newPC)

			console.log(newUnitId)
			const ran = Math.floor(Math.random() * newPC.length);
			console.log(newPC[ran])

			console.log(worldSt);

			console.log("next_id : " + next_id);
			if (newPC.includes(next_id)) {
				console.log("hehe")
			}

			if (next_id != "") {
				setCurrentUnitId(getCardById(next_id).Unit);
				console.log("unit du next card : " + getCardById(next_id).Unit)
				setCurrentCard(getCardById(next_id));
			} else {
				setCurrentUnitId(newUnitId);
				setCurrentCard(getCardById(newPC[ran]));
			}

			//setCurrentCardIndex(currentCardIndex + 1);
			//console.log(pickRandomCard(newUnitId))
			//setCurrentCard(newPC[pickRandomCard(newUnitId)]);

			/*setCurrentCard(getCardById(chapterCard[currentCardIndex % chapterCard.length]));
			
			
			updatePlayableUnits();
			
			setCurrentCardIndex(currentCardIndex + 1);*/


			/*if(nextCardId !== ""){
				setCurrentCard(getCardById(nextCardId));
				nextCardId = "";
				console.log("je suis passé par le if");
				updatePlayableUnits();
				setCurrentCardIndex(currentCardIndex + 1);
			}
			else{
				setCurrentCard(getCardById(chapterCard[currentCardIndex % chapterCard.length]));
	
				updatePlayableUnits();
				setCurrentCardIndex(currentCardIndex + 1);
				console.log("je suis passé dans le else ");
			}*/


			setShowCard(false);
		}, 100);

		showNextCard(150);
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
				{showAnimatedReverseCard && <PlaceholderBackCards />}
				{showReverseCard && <PlaceholderBackStaticCard />}
				{showMultCard && <MultipleCard
						onChooseWestAnswer={onChooseWestAnswer}
						onChooseEastAnswer={onChooseEastAnswer}
						onChooseNorthAnswer={onChooseNorthAnswer}
						onChooseSouthAnswer={onChooseSouthAnswer}
						westText={currentMultCard["westText"]}
						eastText={currentMultCard["eastText"]}
						northText={currentMultCard["northText"]}
						southText={currentMultCard["southText"]}
					/>}
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
