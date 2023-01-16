export default function useGeneratedUnits() {
	const Units = [
		{
			"Name": "Introduction",
			"id": "188b7fe299a045299d9ad38778b1c7a4",
			"card": ["505dc8c39ed34f48ad448e8146dcb60e", "36f2fddae5f4434da9bc76f0763a28c2", "703186931b994813ac8e89a5c2197fd3",],
			"Person": "",
			"Status": "",
			"condition": "",
			"custom" : "",
			"background": ""
		  },
		  {
			"Name": "Transport_choice",
			"id": "86c6c8500ff246399c15db05cd986f7e",
			"card": ["3bc4abad722545aabcd9a01e30aaabcd",],
			"Person": "",
			"Status": "",
			"condition": "",
			"custom" : "",
			"background": ""
		  },
		  {
			"Name": "Taxi",
			"id": "0d1c3ea4d79e4c17962f0ca4d8af2549",
			"card": ["1a1681d447ac4562a19d1b10d9ecf137",],
			"Person": "",
			"Status": "",
			"condition": "",
			"custom" : {"chap1_choice_taxi" : true},
			"background": ""
		  },
		  {
			"Name": "Subway",
			"id": "5bb712a2a85b4adfa4b5a4fd9756e821",
			"card": ["d97ebf2a4a0f412dba7c2cfdbffff291", "e5497ec82cf0475883608a25790bd700", "2f60c8d820644133a999f7921edac2ab", "aed04a6720c44c28a9142724c8a9ed71",],
			"Person": "",
			"Status": "",
			"condition": "",
			"custom" : {"chap1_choice_subway" : true},
			"background": ""
		  },
		  {
			"Name": "Street",
			"id": "023f6b2981ff4853826039b6e1845e62",
			"card": ["2db19f997a904d848fd2fd36d77d5404", "2c04e0b89dbe44ad84e4ee81cb62b237", "10a6303a500a41a3a9d3544bd07fc630", "839723f8edab4821bc7d8a21e0831c91"],
			"Person": "",
			"Status": "",
			"condition": "",
			"custom" : {"chap1_choice_street" : true},
			"background": ""
		  },
		  {
			"Name": "Kombini",
			"id": "092e7b31cd7a46a79a6d79f40d743a78",
			"card": ["1f1d21e34eac4f9a8e25db5362de6f9b", "4566f4a78972445d9318c68add9acba0", "f664657568924ab495e562ea87fdf5ca", "d4a4e23916714f73a0a51764ce587069","8da83b727a694ed6b4ba44a7cff1746a","bc1fa208a5934b8e8086d14c98af21e8","36a1fb3f88c94ad094fa150bcafed68f","e2098d78628a49ad8c9a5d9cb04c8c87"],
			"Person": "",
			"Status": "",
			"condition": "",
			"custom" : "",
			"background": ""
		  },
		  {
			"Name": "Arrive_home",
			"id": "1e3a7a782b9f42f2a63f4a4be85cc08a",
			"card": ["0df94147ee8f4dfda5f631224e43e74d"],
			"Person": "",
			"Status": "",
			"condition": "",
			"custom" : {"arrive_home_completed" : true},
			"background": ""
		  },
		  {
			"Name": "Activity",
			"id": "99c3d8e19fab41db9d08c158a84e9e7e",
			"card": ["9d1174e62e5d44f7a95c460745307e23"],
			"Person": "",
			"Status": "",
			"condition": "",
			"custom" : "",
			"background": ""
		  },
		  {
			"Name": "Home",
			"id": "94a786f5d9e1405ca02b094fee0a9ece",
			"card": ["99888040bcc54e269ca6d0099d80979d"],
			"Person": "",
			"Status": "",
			"condition": "",
			"custom" : "",
			"background": ""
		  },
		  {
			"Name": "Crush_dad",
			"id": "a128e9e5a4814e258aaa6e9f358ed131",
			"card": ["462b70a41b4847c6ad4e522af6b87733"],
			"Person": "",
			"Status": "",
			"condition": "",
			"custom" : "",
			"background": ""
		  },
		  {
			"Name": "NeighbourH",
			"id": "e8da1ec1d29a40ebb1e8df654f1e21fd",
			"card": ["55dbbc6e0026488fbd97f24cf0bceb1a",],
			"Person": "",
			"Status": "",
			"condition": "",
			"custom" : "",
			"background": ""
		  },
		  {
			"Name": "NeighbourF",
			"id": "eb4f9491cb39453585760a4740a1c3a3",
			"card": ["293b2a80a53247baa5256000639dc933",],
			"Person": "",
			"Status": "",
			"condition": "",
			"custom" : "",
			"background": ""
		  },
		  {
			"Name": "NeighbourE",
			"id": "389e55e44050475fb11e8d0aae694b13",
			"card": ["232662b3cb2a4080ac0ba214ef68b675",],
			"Person": "",
			"Status": "",
			"condition": "",
			"custom" : "",
			"background": ""
		  },
		
	];
  
	
  
	const getUnitByIndex = (index) => {
	  return Units[index % Units.length];
	};

	const getUnitCardByIndex = (unitIndex, cardIndex) => {
		return Units[unitIndex].card[cardIndex % (Units[unitIndex].card).length];
	}

	const getUnitById = (id) => {
		return Units.filter(function(Unit) {return (Unit.id == id);})[0];
	};
;

	return {
	  Units,
	  getUnitByIndex,
	  getUnitCardByIndex,
	  getUnitById,
	};
  }
   