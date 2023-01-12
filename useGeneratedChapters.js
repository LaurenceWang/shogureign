export default function useGeneratedChapters() {
	const Chapters = [
		{
			"id": "61c18699d09246ba82c75b1510188461",
			"condition": "",
			"date": "",
			"first_card": "1a1681d447ac4562a19d1b10d9ecf137",
			"story_card": [],
			"card": ["3bc4abad722545aabcd9a01e30aaabcd", "e201fdaad5734c359a1910ac32886e56", "d97ebf2a4a0f412dba7c2cfdbffff291"],
			"character": "",
			"difficulté": "",
			"background": ""
		}
  
	];
  
	
  
	const getChapterByIndex = (index) => {
	  return Chapters[index % Chapters.length];
	};

	const getChapterCardByIndex = (chapIndex, cardIndex) => {
		return Chapters[chapIndex].card[cardIndex % (Chapters[chapIndex].card).length];
	}

	return {
	  Chapters,
	  getChapterByIndex,
	  getChapterCardByIndex,
	};
  }
  