export default function useGeneratedChapters() {
	const Chapters = [
		{
			"name" : "Premier jour au japon",
			"id": "61c18699d09246ba82c75b1510188461",
			"condition": "",
			"date": "",
			"first_card": "505dc8c39ed34f48ad448e8146dcb60e",
			"story_card": [],
			"card": ["36f2fddae5f4434da9bc76f0763a28c2", "703186931b994813ac8e89a5c2197fd3", "3bc4abad722545aabcd9a01e30aaabcd", "1a1681d447ac4562a19d1b10d9ecf137","d97ebf2a4a0f412dba7c2cfdbffff291", "2db19f997a904d848fd2fd36d77d5404",
			"0df94147ee8f4dfda5f631224e43e74d",
			"462b70a41b4847c6ad4e522af6b87733",
			"55dbbc6e0026488fbd97f24cf0bceb1a",
			"293b2a80a53247baa5256000639dc933",
			"232662b3cb2a4080ac0ba214ef68b675",

			"1f1d21e34eac4f9a8e25db5362de6f9b",
			"4566f4a78972445d9318c68add9acba0",
			"f664657568924ab495e562ea87fdf5ca",
			"36a1fb3f88c94ad094fa150bcafed68f",
			"e2098d78628a49ad8c9a5d9cb04c8c87",

			],
			"character": "",
			"difficulté": "",
			"background": ""
		},
		{
			"Name": "Kombini",
			"id": "015693e9687b4547b634a20dd8802776",
			"Person": "",
			"Status": "",
			"condition": "",
			"date": "",
			"first_card": "f664657568924ab495e562ea87fdf5ca",
			"story_card": "",
			"card": ["1f1d21e34eac4f9a8e25db5362de6f9b", "4566f4a78972445d9318c68add9acba0", "f664657568924ab495e562ea87fdf5ca", "d4a4e23916714f73a0a51764ce587069","8da83b727a694ed6b4ba44a7cff1746a","bc1fa208a5934b8e8086d14c98af21e8","36a1fb3f88c94ad094fa150bcafed68f","e2098d78628a49ad8c9a5d9cb04c8c87"],
			"character": "",
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


	const getChapterById = (id) => {
		return Chapters.filter(function(Chapter) {return (Chapter.id == id);})[0];
	};

	
	const getChapterByFirstCardId = (id) => {
		return Chapters.filter(function(Chapter) {return (Chapter.first_card == id);})[0];
	};

	return {
	  Chapters,
	  getChapterByIndex,
	  getChapterCardByIndex,
	  getChapterById,
	  getChapterByFirstCardId,
	};
  }
  