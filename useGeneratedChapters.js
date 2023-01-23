export default function useGeneratedChapters() {
	const Chapters = [
		{
			"Name": "Premier jour au japon",
			"id": "61c18699d09246ba82c75b1510188461",
			"Person": "",
			"Status": "",
			"condition": "",
			"date": "03",
			"unit": ["188b7fe299a045299d9ad38778b1c7a4",
			"86c6c8500ff246399c15db05cd986f7e",
			 "023f6b2981ff4853826039b6e1845e62", "0d1c3ea4d79e4c17962f0ca4d8af2549", "5bb712a2a85b4adfa4b5a4fd9756e821","092e7b31cd7a46a79a6d79f40d743a78", "1e3a7a782b9f42f2a63f4a4be85cc08a",
			 "99c3d8e19fab41db9d08c158a84e9e7e",
			 "a128e9e5a4814e258aaa6e9f358ed131", "e8da1ec1d29a40ebb1e8df654f1e21fd", "eb4f9491cb39453585760a4740a1c3a3", "389e55e44050475fb11e8d0aae694b13", "94a786f5d9e1405ca02b094fee0a9ece", ],
			"difficulté": "",
			"background": ""
		},
		{
			"Name": "Premier repas japonais",
			"id": "5f61ce0ca9074c249d3b3b244c67252c",
			"Person": "",
			"Status": "",
			"condition": "",
			"date": "04",
			"unit": ["68bad6fc747141d1beb35ee057858f67", "28662fe73d694abbbc153e72ba25596d", "7d6c2f8046bb475a8f7a119e924a8452", "54b40bf6f6204fc0a0d84f66b3795381", "810d9da937e2464ab5b7145a73050996"],
			"difficulté": "",
			"background": ""
		},
	];



	const getChapterByIndex = (index) => {
		return Chapters[index % Chapters.length];
	};

	const getChapterCardByIndex = (chapIndex, cardIndex) => {
		return Chapters[chapIndex].card[cardIndex % (Chapters[chapIndex].card).length];
	}


	const getChapterUnit = (chapIndex, UnitIndex) => {
		return Chapters[chapIndex].unit[UnitIndex % (Chapters[chapIndex].card).length];
	}

	const getChapterById = (id) => {
		return Chapters.filter(function (Chapter) {
			return (Chapter.id == id);
		})[0];
	};


	const getChapterByFirstCardId = (id) => {
		return Chapters.filter(function (Chapter) {
			return (Chapter.first_card == id);
		})[0];
	};

	return {
		Chapters,
		getChapterByIndex,
		getChapterCardByIndex,
		getChapterUnit,
		getChapterById,
		getChapterByFirstCardId,
	};
}