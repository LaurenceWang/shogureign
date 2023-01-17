import useGeneratedUnits from "./useGeneratedUnits";
import useGeneratedCards from "./useGeneratedCards";


export default function worldState() {
	// const World = 

	// 	{
	// 		//"chap1_choice_street": false,
	// 		"chap1_choice_subway": false,
	// 		"chap1_choice_taxi": false,
	// 		"chap1_street": false,
	// 		"arrive_home_completed": false,
	// 		//"chap1_home": false,
	// 	}
		
	// ;

	const {Units} = useGeneratedUnits();
	const {Cards} = useGeneratedCards();
	let World;
	Units.forEach(element => {
		World = {...World, ...element.condition, ...element.custom};
	});
	Cards.forEach(val =>{
		World = {...World, ...val.condition,...val.left_custom, ...val.right_custom};		
	});  


	return {
		World
	};
}