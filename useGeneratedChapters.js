export default function useGeneratedChapters() {
	const Chapters = [
		/*{
			"name": "Premier jour au japon",
			"id": "61c18699d09246ba82c75b1510188461",
			"condition": "",
			"date": "",
			"first_card": "505dc8c39ed34f48ad448e8146dcb60e",
			"story_card": [],
			"card": ["36f2fddae5f4434da9bc76f0763a28c2", "703186931b994813ac8e89a5c2197fd3", "3bc4abad722545aabcd9a01e30aaabcd", "1a1681d447ac4562a19d1b10d9ecf137", "d97ebf2a4a0f412dba7c2cfdbffff291", "2db19f997a904d848fd2fd36d77d5404",
				"0df94147ee8f4dfda5f631224e43e74d",
				"462b70a41b4847c6ad4e522af6b87733",
				"55dbbc6e0026488fbd97f24cf0bceb1a",
				"293b2a80a53247baa5256000639dc933",
				"232662b3cb2a4080ac0ba214ef68b675",

			],
			"character": "",
			"difficulté": "",
			"background": ""
		},*/

		{
			"Name": "Premier jour au japon",
			"id": "61c18699d09246ba82c75b1510188461",
			"Person": "",
			"Status": "",
			"condition": "",
			"date": "03",
			"unit": ["188b7fe299a045299d9ad38778b1c7a4", "86c6c8500ff246399c15db05cd986f7e", "023f6b2981ff4853826039b6e1845e62", "0d1c3ea4d79e4c17962f0ca4d8af2549", "5bb712a2a85b4adfa4b5a4fd9756e821","092e7b31cd7a46a79a6d79f40d743a78", "1e3a7a782b9f42f2a63f4a4be85cc08a", "94a786f5d9e1405ca02b094fee0a9ece", "a128e9e5a4814e258aaa6e9f358ed131", "e8da1ec1d29a40ebb1e8df654f1e21fd", "eb4f9491cb39453585760a4740a1c3a3", "389e55e44050475fb11e8d0aae694b13", "99c3d8e19fab41db9d08c158a84e9e7e" ],
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