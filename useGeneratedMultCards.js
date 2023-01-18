export default function useMultGeneratedCards() {
    const Cards = [
  
      {
        "Name": "Introduction",
        "id": "505dc8c39ed34f48ad448e8146dcb60e",
        "Unit": "Introduction",
        "Person": "e",
        "Status": "To Be checked",
        "card_type": "dialogue_card",
        "character": "persoexplication",
        "condition": "Uniquement première partie",
        "question": "Hé bien! Te voilà à Tokyo pour une année de cours à l’étranger. Je suis [trucname] et je veillerais à ce que ce ton séjour ici se passe parfaitement !",
        "leftText": "Oh !",
        "onLeft": "",
        "rightText": "Euh ?",
        "onRight": "",
        "left_custom": "",
        "right_custom": "",
        "left_next_card": "36f2fddae5f4434da9bc76f0763a28c2",
        "right_next_card": "36f2fddae5f4434da9bc76f0763a28c2",
        "difficulté": "",
        "Kanji": "",
        "background": "#ccc",
        "image": "https://cdn-icons-png.flaticon.com/512/9183/9183995.png",
        "itemId": ""
      },
    ];


const getCardByIndex = (index) => {
  return Cards[index % Cards.length];
};

const getCardById = (id) => {
  return Cards.filter(function(Card) {return (Card.id == id);})[0];
};

return {
  Cards,
  getCardByIndex,
  getCardById,
};
}
