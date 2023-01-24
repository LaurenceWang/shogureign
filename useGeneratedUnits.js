export default function useGeneratedUnits() {
	const Units = [
		{
			"Name": "Introduction",
			"id": "188b7fe299a045299d9ad38778b1c7a4",
			"card": ["505dc8c39ed34f48ad448e8146dcb60e", "36f2fddae5f4434da9bc76f0763a28c2", "703186931b994813ac8e89a5c2197fd3",],
			"Person": "",
			"Status": "",
			"condition":{"chap1_intro" : false},
			"custom" : {"chap1_intro" : true},
			"background": ""
		  },
		  {
			"Name": "Transport_choice",
			"id": "86c6c8500ff246399c15db05cd986f7e",
			"card": ["3bc4abad722545aabcd9a01e30aaabcd",],
			"Person": "",
			"Status": "",
			"condition": {"chap1_choice_subway" : false, "chap1_choice_taxi" : false, "chap1_street" : false, "arrive_home_completed" : false},
			"custom" : {},
			"background": ""
		  },
		  {
			"Name": "Taxi",
			"id": "0d1c3ea4d79e4c17962f0ca4d8af2549",
			"card": ["1a1681d447ac4562a19d1b10d9ecf137",],
			"Person": "",
			"Status": "",
			"condition": {"chap1_choice_subway" : false, "chap1_street" : false, "arrive_home_completed" : false},
			"custom" : {"chap1_choice_taxi" : true},
			"background": ""
		  },
		  {
			"Name": "Subway",
			"id": "5bb712a2a85b4adfa4b5a4fd9756e821",
			"card": ["d97ebf2a4a0f412dba7c2cfdbffff291", "e5497ec82cf0475883608a25790bd700", "2f60c8d820644133a999f7921edac2ab", "aed04a6720c44c28a9142724c8a9ed71","cf43a3e6c91148d79fa48e118c31278b"],
			"Person": "",
			"Status": "",
			"condition": {"chap1_choice_taxi" : false, "chap1_street" : false, "arrive_home_completed" : false },
			"custom" : {"chap1_choice_subway" : true},
			"background": ""
		  },
		  {
			"Name": "Street",
			"id": "023f6b2981ff4853826039b6e1845e62",
			"card": ["2db19f997a904d848fd2fd36d77d5404", "2c04e0b89dbe44ad84e4ee81cb62b237", "10a6303a500a41a3a9d3544bd07fc630", "839723f8edab4821bc7d8a21e0831c91",
			"4a2cd298fc3544bfbccbaf7cb5d33e6f", "0cc73f005b3c4f1194792ba2f533ec28", "349391e704cd4128851e326c7e1a5ab6", "8f0b2674993e47e884ebd8318775a809","542d6cf3ad3a4d8883da60b4fc7ba1ad", "ab94ff1654f6419a8e4eca3d3abb8bb5","0d0abc6b8f4a4d04b175a494d1a8bac9","bc2f87b9b56b4b06a21b021cd7816cc9", "dca682768c1d4e4083f7cfb55cbb6bd4", "8b8beb3c472641e982e7ef798bd30625", "da085f7dd63a46219d1943098e87819a", "6c2c6c2cbd9b43f58f49f7073b91cdc4", "8910581c2df84e79b0a06574c2e25f28", "04bd164197c04d4a8a8fb3c51a31f861", "6bafa0fdf65d41b78111396371a0ea51", "ef28954bfd084a53b5a598c7219fcd1d", "376b7b466de746638c382abe25510325" ],
			"Person": "",
			"Status": "",
			"condition": {"chap1_street" : false, "chap1_choice_subway" : false, "chap1_choice_taxi" : false},
			"custom" : {"chap1_street" : true,},
			"background": ""
		  },
		  {
			"Name": "Kombini",
			"id": "092e7b31cd7a46a79a6d79f40d743a78",
			"card": ["1f1d21e34eac4f9a8e25db5362de6f9b", "4566f4a78972445d9318c68add9acba0", "f664657568924ab495e562ea87fdf5ca", "d4a4e23916714f73a0a51764ce587069","8da83b727a694ed6b4ba44a7cff1746a","bc1fa208a5934b8e8086d14c98af21e8","36a1fb3f88c94ad094fa150bcafed68f","e2098d78628a49ad8c9a5d9cb04c8c87"],
			"Person": "",
			"Status": "",
			"condition":{ "arrive_home_completed" : true, "at_Home" : false, "kombini" : false, "chap1_street" : false} ,
			"custom" : {"kombini" : true},
			"background": ""
		  },
		  {
			"Name": "Arrive_home",
			"id": "1e3a7a782b9f42f2a63f4a4be85cc08a",
			"card": ["0df94147ee8f4dfda5f631224e43e74d", "b6373bee690941d0ab7892fc00b53560"],
			"Person": "",
			"Status": "",
			"condition": {"arrive_home_completed" : false,},
			"custom" : {"arrive_home_completed" : true, "chap1_street" : true, "chap1_choice_subway" : false, "chap1_choice_taxi" : false},
			"background": ""
		  },
		  {
			"Name": "Activity",
			"id": "99c3d8e19fab41db9d08c158a84e9e7e",
			"card": ["9d1174e62e5d44f7a95c460745307e23"],
			"Person": "",
			"Status": "",
			"condition": {"arrive_home_completed" : true, "activity" : false},
			"custom" : {"activity" : true},
			"background": ""
		  },
		  {
			"Name": "Home",
			"id": "94a786f5d9e1405ca02b094fee0a9ece",
			"card": ["99888040bcc54e269ca6d0099d80979d", "60c54c879e95444f80c23e8b3cfa308a", "d8dbeef009e0470eb741d890ea5606cc","b05eee3993f144c48fdae6db1d6192ae", "a930e5a0ae3f4326a8d38538a7cd949f" ],
			"Person": "",
			"Status": "",
			"condition": {"arrive_home_completed" : true, "at_Home" : true},
			"custom" : {},
			"background": ""
		  },
		  {
			"Name": "Crush_dad",
			"id": "a128e9e5a4814e258aaa6e9f358ed131",
			"card": ["462b70a41b4847c6ad4e522af6b87733"],
			"Person": "",
			"Status": "",
			"condition": {"arrive_home_completed" : true, "crush_dad" : false},
			"custom" : {},
			"background": ""
		  },
		  {
			"Name": "NeighbourH",
			"id": "e8da1ec1d29a40ebb1e8df654f1e21fd",
			"card": ["55dbbc6e0026488fbd97f24cf0bceb1a",],
			"Person": "",
			"Status": "",
			"condition": {"arrive_home_completed" : true, "neighbourH" : false},
			"custom" : {},
			"background": ""
		  },
		  {
			"Name": "NeighbourF",
			"id": "eb4f9491cb39453585760a4740a1c3a3",
			"card": ["293b2a80a53247baa5256000639dc933",],
			"Person": "",
			"Status": "",
			"condition": {"arrive_home_completed" : true, "neighbourF" : false},
			"custom" : {},
			"background": ""
		  },
		  {
			"Name": "NeighbourE",
			"id": "389e55e44050475fb11e8d0aae694b13",
			"card": ["232662b3cb2a4080ac0ba214ef68b675",],
			"Person": "",
			"Status": "",
			"condition": {"arrive_home_completed" : true, "neighbourE" : false},
			"custom" : {},
			"background": ""
		  },

		  {
			"Name": "Introduction_chap2",
			"id": "68bad6fc747141d1beb35ee057858f67",
			"card": ["66262f990e88413f9ed6c66ab83d5300", "76b5bfc9afb64c5babf9350ad8c81bb7",],
			"Person": "",
			"Status": "",
			"condition": {},
			"custom" : {},
			"background": ""
		  },

		  {
			"Name": "Hungry",
			"id": "28662fe73d694abbbc153e72ba25596d",
			"card": ["b763de33a9f0457ea2db2a20a0e1e57a",],
			"Person": "",
			"Status": "",
			"condition": {},
			"custom" : {},
			"background": ""
		  },

		  {
			"Name": "Library",
			"id": "7d6c2f8046bb475a8f7a119e924a8452",
			"card": ["a0da9bacb9c147ad946b90001d355e8f",],
			"Person": "",
			"Status": "",
			"condition": {},
			"custom" : {},
			"background": ""
		  },

		  {
			"Name": "Grocery_store",
			"id": "54b40bf6f6204fc0a0d84f66b3795381",
			"card": ["479dfbcc62c443d8a1d5501f09edcca8",],
			"Person": "",
			"Status": "",
			"condition": {},
			"custom" : {},
			"background": ""
		  },

		  {
			"Name": "Cook",
			"id": "810d9da937e2464ab5b7145a73050996",
			"card": ["6a113b437caf4e6f932c2cbfb4ca79a2",],
			"Person": "",
			"Status": "",
			"condition": {},
			"custom" : {},
			"background": ""
		  },


		  {
			"Name": "Crush",
			"id": "7c00e48218bc42aea11107d0f21f90c3",
			"card": ["685ef582acb344faaa4fe4b680acd0f8",],
			"Person": "",
			"Status": "",
			"condition": {},
			"custom" : {},
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
   