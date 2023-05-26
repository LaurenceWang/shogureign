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
			"023f6b2981ff4853826039b6e1845e62", "5bb712a2a85b4adfa4b5a4fd9756e821", "092e7b31cd7a46a79a6d79f40d743a78", "1e3a7a782b9f42f2a63f4a4be85cc08a",
			"99c3d8e19fab41db9d08c158a84e9e7e",
			"a128e9e5a4814e258aaa6e9f358ed131", "e8da1ec1d29a40ebb1e8df654f1e21fd", "eb4f9491cb39453585760a4740a1c3a3", "389e55e44050475fb11e8d0aae694b13", "94a786f5d9e1405ca02b094fee0a9ece",],
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
		"unit": ["68bad6fc747141d1beb35ee057858f67", "28662fe73d694abbbc153e72ba25596d", "7d6c2f8046bb475a8f7a119e924a8452", "54b40bf6f6204fc0a0d84f66b3795381", "810d9da937e2464ab5b7145a73050996", "65ab3f62f9e348baafc9aacade75f447"],
		"difficulté": "",
		"background": ""
	},

	{
		"Name": "Premier jour au lycée",
		"id": "49131507fdce4d46a429008f5b97ab76",
		"Person": "",
		"Status": "",
		"condition": "",
		"date": "04",
		"unit": ["c84330446f9040d8b0661785992984c6", "855e243f63ae4f5f8578cdb7c842d618", "15ded9ccd4704073a5bb31f4533e64bd", "dba4c5a89b364642a87f9b483154cd3c", "fdee85ecc6ac45b68c443898b7f287a8"],
		"difficulté": "",
		"background": ""
	},


	{
		"Name": "Se faire un ami",
		"id": "d798b978b2eb492d93d525a34962f766",
		"Person": "",
		"Status": "",
		"condition": "",
		"date": "04",
		"unit": ["e41df29e2d854cfa8e527a9baaf145d0", "855e243f63ae4f5f8578cdb7c842d618", "e66a60df142f4b69b7fb6af846f3c7f1", "6eb3c303ad3f4751bb3b3da6884bfea4"],
		"difficulté": "",
		"background": ""
	},

	{
		"Name": "Perdre son portefeuille",
		"id": "16ee0914d59f479690e0fa46b790be3b",
		"Person": "",
		"Status": "",
		"condition": "",
		"date": "04",
		"unit": ["166896163b494c14b01908f38c933418", "9edd889e7d6e4a74bbc14a7fe9cca540", "af1196e1fbfd477a8d06f20901387351", "07d1b181ba57465b9dc84160aa4a6155", "8c18be6ca6d74215af5f62690eb78a34"],
		"difficulté": "",
		"background": ""
	},
	{
		"Name": "Allez chez son brosûr",
		"id": "61a9e4f957564abdb80549a56eb55570",
		"Person": "",
		"Status": "",
		"condition": "",
		"date": "04",
		"unit": ["131aec7d466444539b385dc635661996", "188aef38c1534dc2b7e8981112096fa5", "40792c0ce8bc4f2ebbba674caea668f8"],
		"difficulté": "",
		"background": ""
	},
];


console.log("Created chapters");

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

export {
	Chapters,
	getChapterByIndex,
	getChapterCardByIndex,
	getChapterUnit,
	getChapterById,
	getChapterByFirstCardId,
};
