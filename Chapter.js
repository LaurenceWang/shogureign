import { View, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
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

import Config from './gameconfig';


const Chapter = ({ chapNum, endChap }) => {

	//const {getChapterbyId} = useGeneratedChapters();
	const { getChapterByIndex } = useGeneratedChapters();
	const { getCardById } = useGeneratedCards();
	let { World } = worldState();
	const [worldSt, setworldSt] = useState(World);

	const { getUnitById } = useGeneratedUnits();
	const { getUnitByIndex } = useGeneratedUnits();
	const { getUnitCardByIndex } = useGeneratedUnits();

	const { getChapterUnit } = useGeneratedChapters();
	const [chapterUnit, setChapterUnit] = useState([]);
	const [unitCards, setUnitCards] = useState([]);
	const [currentUnitIndex, setCurrentUnitIndex] = useState(0);
	const [currentUnitId, setCurrentUnitId] = useState();
	//const [currentCardId, setCurrentCardId] = useState();
	//const [chapFirstCard, setChapFirstCard] = useState({});

	const [showStartButton, setShowStartButton] = useState(true);
	const [showAnimatedReverseCard, setShowAnimatedReverseCard] = useState(false);
	const [showReverseCard, setShowReverseCard] = useState(false);
	const [showCard, setShowCard] = useState(false);
	const [showQuestion, setShowQuestion] = useState(false);
	const [chapterCard, setChapterCard] = useState([]);

	const [currentCard, setCurrentCard] = useState({});
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [currentMood, setCurrentMood] = useState({ happy: [], sad: [] });
	const baseStats = 50;
	const [currentStats, setCurrentStats] = useState(
		{ popularity: baseStats, money: baseStats, hygiene: baseStats, happiness: baseStats }
	);
	const [pendingKanjis, setPendingKanjis] = useState([]);
	const [cardsSinceLastLesson, setCardsSinceLastLesson] = useState(0);

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
	const [kanjiWeight, setKanjiWeight] = useState({});


	//const [choice, setChoice] = useState();
	let choice;
	const [endChapitre, setEndChapitre] = useState(false);

	//console.log("chapNum : " + chapNum);
	useEffect(() => {
		initializeWorld();

	}, []);


	useEffect(() => {
		//initializeWorld();
		console.log("current chap Num : " + chapNum)

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



	function initializeWorld() {
		Object.keys(worldSt).forEach((key) => { worldSt[key] = false; });
		//worldSt.chap1_intro = true;
	}


	useEffect(() => {
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

		console.log("je suis passé dans l'update custom card");
		updateCustomWorld();
		console.log(worldSt);
		//let customs = currentCard.custom;
		//const worldcustom = {...worldSt, ...customs};
		//setworldSt(worldcustom);

	}, [currentCard]);


	useEffect(() => {
		if (currentUnitId) {
			updatePlayableCards();
		}
	}, [worldSt]);

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

	function updatePlayableUnits() {

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
	}

	function updatePlayableCards() {
		let playableCards = [];
		//console.log("getUnitById(currentUnitId) : "+ getChapterUnit(currentUnitId));
		const cards = getUnitById(currentUnitId).card;
		//console.log("card");
		//console.log(cards);

		cards.forEach(element => {
			const conditions = getCardById(element).condition;
			console.log(conditions);
			if (comparaison(conditions, worldSt)) {
				//console.log("i");
				playableCards.push(element);
			}
		});

		console.log("Nombre de cartes jouables restantes :" + playableCards.length);
		//setUnitCards(playableCards);
		if (playableCards.length != 0) {
			setChapterCard(playableCards);
		}
	}

	function updateWorldState(id) {
		//let customs = getUnitById(currentUnitId).custom;
		//let customs = getUnitById(chapterUnit[currentUnitIndex]).custom;
		//let customs = getUnitById("1e3a7a782b9f42f2a63f4a4be85cc08a").custom;
		//console.log("current unit index worldstate : " + currentUnitIndex);
		let customs = getUnitById(id).custom;
		const newWorld = { ...worldSt, ...customs }
		setworldSt(newWorld);
		//World = {...World, ...customs};
	}

	function updateWorldStateCard(choice, id) {
		if (choice === "right") {
			let rightCustoms = getCardById(id).right_custom;
			const newWorld = { ...worldSt, ...rightCustoms };
			setworldSt(newWorld);
		}
		else if (choice === "left") {
			let leftCustoms = getCardById(id).left_custom;
			const newWorld = { ...worldSt, ...leftCustoms };
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

	const kanjiParser = (text) => {
		const japaneseCharacters = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/g;
		return text.match(japaneseCharacters);
	}

	const updatePendingKanjis = (newKanjis) => {
		if (newKanjis) {
			console.debug("updatePendingKanjis > Current kanjis: ");
			console.debug(pendingKanjis);
			console.debug("updatePendingKanjis > New kanjis: ");
			console.debug(newKanjis);

			// Updating the kanji list
			let newKanjiList = pendingKanjis;
			newKanjiList.push(...newKanjis);
			newUniqueKanjiList = [...new Set(newKanjiList)];
			console.debug("updatePendingKanjis > new kanji list (before setState): ");
			console.debug(newUniqueKanjiList);
			setPendingKanjis(newUniqueKanjiList);
		}
	}

	useEffect(() => {
		console.log("useEffect (pending kanji) > cards since last lesson: " + cardsSinceLastLesson);
		kanjiLesson = getKanjisForLesson();
		console.debug("After get kanjis for lesson: new kanji weight > ");
		console.debug(kanjiWeight);

	}, [pendingKanjis, cardsSinceLastLesson]);

	const getKanjisForTest = () => {
		// We need to have the lesson on a kanji K first, to be tested on K.
		testableKanjis = Object.keys(kanjiWeight).filter(k => kanjiWeight[k].lesson == 0);
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
		let kanjiWeightTmp = kanjiWeight;
		alreadyEncounteredKanjis = Object.keys(pendingKanjis);
		newKanjis = pendingKanjis.filter(k => !(k in alreadyEncounteredKanjis));

		// Default kanji weight
		newKanjis.forEach(k => kanjiWeightTmp[k] = {
			lesson: 5,
			test: 5,
			exam: 5
		});

		// Kanjis available for the lesson
		availableKanjis = pendingKanjis.filter(k => kanjiWeight[k].lesson > 0);

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

			setPendingKanjis(availableKanjis);
			// Creates a loop but the loop eventually ends.

			setKanjiWeight(kanjiWeightTmp);
			setCardsSinceLastLesson(0);
			return kanjiForLesson;
		}
		return [];
	}

	const cardParser = (text) => {
		const moods = { happy: [], sad: [] }
		const variations = { popularity: 0, money: 0, hygiene: 0, happiness: 0 }

		// If empty effect
		if (!text)
			return {
				moods: moods,
				variations: variations
			};

		// Parsing the card text
		let trimmedText = text.replace(/\s/g, "")
		const regexpWords = /[\+\-]\d+[ABHP]/g;
		let data = trimmedText.match(regexpWords);
		if (data === null) {
			return {
				moods: moods,
				variations: variations
			}
		}
		data = data.map((effectText) => effectParser(effectText));
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
			console.log(`Game over > you are not in your dream country anymore because of ${(currentStats[stats[0]] >= 100) ? "too much" : "no more"} ${stats}`);
		}
	}, [currentStats]);

	const gameOverStats = () => {
		console.debug("Game over > Current stats: ");
		console.debug(currentStats);
		return Object.keys(currentStats).filter(k => currentStats[k] >= 100 || currentStats[k] <= 0);
	}

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

		console.log("updateStats > cards since last lesson before turn count: " + cardsSinceLastLesson);
		setCardsSinceLastLesson(cardsSinceLastLesson + 1);

		createNewCard();

		setTimeout(() => {
			setCurrentMood({ happy: [], sad: [] });
		}, 50);
	}

	const onChooseLeftAnswer = () => {
		console.debug("Current card: ");
		console.debug(currentCard);
		const { moods, variations } = cardParser(currentCard.onLeft);
		updateStats(moods, variations);

		updateWorldStateCard("left", currentCard.id);
	};

	const onChooseRightAnswer = () => {
		console.debug("Current card: ");
		console.debug(currentCard);
		const { moods, variations } = cardParser(currentCard.onRight);
		updateStats(moods, variations);

		updateWorldStateCard("right", currentCard.id);
	};

	const createNewCard = () => {
		setShowQuestion(false);
		setTimeout(() => {
			console.log("---------------------------------------")
			console.log("create new card :")
			//console.log("chapter unit swipe")
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
				<PowerIndicators currentMood={currentMood} currentStats={currentStats} />
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
