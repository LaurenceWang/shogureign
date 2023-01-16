import useGeneratedUnits from "./useGeneratedUnits";


export default function worldState() {
	// const World = 

	// 	{
	// 		"chap1_choice_street": false,
	// 		"chap1_choice_subway": false,
	// 		"chap1_choice_taxi": false,
	// 		"chap1_street": false,
	// 		"arrive_home_completed": false,
	// 		"chap1_home": false,
	// 	}
		
	// ;

	const {Units} = useGeneratedUnits();

	let World;
	Units.forEach(element => {
		World = {...World, ...element.condition}
	});

	return {
		World
	};
}