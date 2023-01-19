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
        "question":"chanson",
        "leftText": "歌",
        "onLeft": "",
        "rightText": "楽",
        "onRight": "",
        "upText": "車",
        "onUp": "",
        "downText": "猫",
        "onDown": "",
        "left_custom": "",
        "right_custom": "",
        "up_custom": "",
        "down_custom": "",
        "left_next_card": "36f2fddae5f4434da9bc76f0763a28c2",
        "right_next_card": "36f2fddae5f4434da9bc76f0763a28c2",
        "up_next_card": "36f2fddae5f4434da9bc76f0763a28c2",
        "down_next_card": "36f2fddae5f4434da9bc76f0763a28c2",
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
