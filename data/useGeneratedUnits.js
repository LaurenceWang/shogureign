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
			"card": ["d97ebf2a4a0f412dba7c2cfdbffff291", "e5497ec82cf0475883608a25790bd700", "2f60c8d820644133a999f7921edac2ab", "aed04a6720c44c28a9142724c8a9ed71","1da19ab5e63f40f79f63159eed9396a4","cf43a3e6c91148d79fa48e118c31278b", ],
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
			"4a2cd298fc3544bfbccbaf7cb5d33e6f", "0cc73f005b3c4f1194792ba2f533ec28", "349391e704cd4128851e326c7e1a5ab6", "8f0b2674993e47e884ebd8318775a809","542d6cf3ad3a4d8883da60b4fc7ba1ad", "ab94ff1654f6419a8e4eca3d3abb8bb5","0d0abc6b8f4a4d04b175a494d1a8bac9","bc2f87b9b56b4b06a21b021cd7816cc9", "dca682768c1d4e4083f7cfb55cbb6bd4", "8b8beb3c472641e982e7ef798bd30625", "da085f7dd63a46219d1943098e87819a", "6c2c6c2cbd9b43f58f49f7073b91cdc4", "8910581c2df84e79b0a06574c2e25f28",
			"7f9b4bbcfae44448accc3ffa8491f6ae",
			"cb0ca5c2e3f5498d8fa136e41feb0cd1", "04bd164197c04d4a8a8fb3c51a31f861", "6bafa0fdf65d41b78111396371a0ea51", "ef28954bfd084a53b5a598c7219fcd1d", "376b7b466de746638c382abe25510325" ],
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
			"card": ["99888040bcc54e269ca6d0099d80979d", "60c54c879e95444f80c23e8b3cfa308a", "d8dbeef009e0470eb741d890ea5606cc","b05eee3993f144c48fdae6db1d6192ae", "a930e5a0ae3f4326a8d38538a7cd949f", "2bac1a9572f048958dd2439a6a99a1ad", "c723bdbc22f34dce83032fde30864ca8", "c717f2e69eaf4084b18c137879a5b388" ],
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
			"condition": {"chap2_intro":false},
			"custom" : {"chap2_intro" :true},
			"background": ""
		  },

		  {
			"Name": "Hungry",
			"id": "28662fe73d694abbbc153e72ba25596d",
			"card": ["b763de33a9f0457ea2db2a20a0e1e57a","9df0a189575a4c9c8b7233036e8e90cc"],
			"Person": "",
			"Status": "",
			"condition": {"hungry":true},
			"custom" : {"hungry":false},
			"background": ""
		  },

		  {
			"Name": "Library",
			"id": "7d6c2f8046bb475a8f7a119e924a8452",
			"card": ["a0da9bacb9c147ad946b90001d355e8f",],
			"Person": "",
			"Status": "",
			"condition": {"library": true},
			"custom" : {"library": false},
			"background": ""
		  },

		  {
			"Name": "Grocery_store",
			"id": "54b40bf6f6204fc0a0d84f66b3795381",
			"card": ["479dfbcc62c443d8a1d5501f09edcca8","b4197339405e4d8abb5108231a0f2970","a5af2a0c6950475fbab98038dc2174ca","054abd47fdfa44e595ddb19f6629c3cf"],
			"Person": "",
			"Status": "",
			"condition": {"grocery":true},
			"custom" : {},
			"background": ""
		  },

		  {
			"Name": "Cook",
			"id": "810d9da937e2464ab5b7145a73050996",
			"card": ["6a113b437caf4e6f932c2cbfb4ca79a2","3f45c532bd6b4b42aaba448de4622380","7b75706741bd4c4c870bcc054c8144d8", "c6c217b1a8234df8935968191643463b", "dbfd37ef8d6c4093bc1cd494136e331b", "9b2377b9a26d45c6a907426ce6ef3e0e", "e6192d4857124e8288ba4a39ede033c1","6357f62be25d42d8b396047ada4fd65a","57de92128fac4aa283fa087b3483d702","5f39bf8a266e47349801f00ac76e65f2","f0a342bda52c49608eb5014ba73a866a","168ce3fa29374396a8ad4fcbbe893b2e", "c230055dc3634c05b2dbf4380993cd56"],
			"Person": "",
			"Status": "",
			"condition": {"cook":true},
			"custom" : {},
			"background": ""
		  },

		  {
			"Name": "end_chap2",
			"id": "65ab3f62f9e348baafc9aacade75f447",
			"card": ["4c6d457e8d0a4ed18dd53206fc14352d","381839ae509c4d3aa1367a5f2ed9f56e",],
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


		{
			"Name": "Introduction_chap3",
			"id": "c84330446f9040d8b0661785992984c6",
			"card": ["0a7cfc9935bb4ab0a7aae8f3c2b946d1",],
			"Person": "",
			"Status": "",
			"condition": {"chap3_intro":false},
			"custom" : {"chap3_intro" :true},
			"background": ""
		},

		{
			"Name": "School",
			"id": "855e243f63ae4f5f8578cdb7c842d618",
			"card": ["1dd0102cd9b848858925f3e9899379ce", "685ef582acb344faaa4fe4b680acd0f8","e201fdaad5734c359a1910ac32886e56","1ac1fa6a2bdf4748b35d056e3bbe7a24","088b2294323c4352bb97ec2d21a743fc", "8a546bbe5ce94e67a67cfe3c94d36abf", "7b7bdb75779d4a439d16b86160b432a0", "4dfcbeeae33b4c6fb62360cd9c7e491b", "fe9293df5867473cb60560e3886d6dac", "3ec5a10e661b4c198e533f04f30f942b", "353fa0bebc01454b8ff1d0a7825885aa", ],
			"Person": "",
			"Status": "",
			"condition": {"in_school" : false},
			"custom" : {"in_school" : true},
			"background": ""
		},

		{
			"Name": "Classroom",
			"id": "15ded9ccd4704073a5bb31f4533e64bd",
			"card": ["8b391439bae34fd786ed4712e60cfc7a",],
			"Person": "",
			"Status": "",
			"condition": {"in_class":true},
			"custom" : {},
			"background": ""
		},

		{
			"Name": "End_school",
			"id": "fdee85ecc6ac45b68c443898b7f287a8",
			"card": ["27d42ec53e2f4086a9fecb5d3c8519e1",],
			"Person": "",
			"Status": "",
			"condition": {"end_school":true},
			"custom" : {},
			"background": ""
		},

		{
			"Name": "First_lesson",
			"id": "dba4c5a89b364642a87f9b483154cd3c",
			"card": ["8b391439bae34fd786ed4712e60cfc7a",],
			"Person": "",
			"Status": "",
			"condition": {"first_lesson":true},
			"custom" : {"first_lesson" : false},
			"background": ""
		},


		{
			"Name": "Introduction_chap4",
			"id": "e41df29e2d854cfa8e527a9baaf145d0",
			"card": ["1fcb713a45364548832d4dca01a30011",],
			"Person": "",
			"Status": "",
			"condition": {"chap4_intro":false},
			"custom" : {"chap4_intro" :true},
			"background": ""
		  },

		{
			"Name": "inscription_club",
			"id": "e66a60df142f4b69b7fb6af846f3c7f1",
			"card": ["7de3a4265c90460db7e3b5eb2652de31","e22678755351489ca42872e4be81085d","ecf387925cbe4863871fe80d9a320a5d", "574a193376704ad4ba329c20cf50f9eb", "cff48315e817497f9e6a383e9b0ecace","b2365fcebf20406281495567b1ab1535"],
			"Person": "",
			"Status": "",
			"condition": {"inscription_club" : false},
			"custom" : {"inscription_club" : true},
			"background": ""
		},

		{
			"Name": "First_friend",
			"id": "6eb3c303ad3f4751bb3b3da6884bfea4",
			"card": ["a632b16867384d45ab0f0fc3c45861d7",  "68fd1abeb5cf49b8ab29145fb76b53da", "b2632f1abb374ab1990e0a77bb99b5e2"],
			"Person": "",
			"Status": "",
			"condition": {"first_friend":true,},
			"custom" : {"first_friend":false},
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
   