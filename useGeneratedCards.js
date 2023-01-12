export default function useGeneratedCards() {
  const Cards = [
    {
      "id": "3bc4abad722545aabcd9a01e30aaabcd",
      "Molecule": "Premier jour au japon",
      "card_type": "",
      "character": "",
      "condition": "",
      "question": "Wealthy looking young man asks you to throw a party in your kingdom.",
      "leftText": "oh no hoho",
      "onLeft": { happy: [], sad: ['joker'] },
      "rightText": "lets gooooo",
      "onRight": { happy: ['joker'], sad: [] },
      "left_custom": "",
      "right_custom": "",
      "left_next_card": "",
      "right_next_card": "",
      "ordre": "",
      "difficulté": "",
      "Kanji": "",
      "background": "#ccc",
      "image": "https://cdn-icons-png.flaticon.com/512/4276/4276749.png",
      "itemId": ""
    },

    {
      "id": "1a1681d447ac4562a19d1b10d9ecf137",
      "Molecule": "Premier jour au japon",
      "card_type": "",
      "character": "",
      "condition": "",
      "question": "Hunter from the near village requests some help. It seems like his hometown is in danger!!",
      "leftText": "Let him fight alone",
      "onLeft": { happy: [], sad: ['woman'] },
      "rightText": "Send the troops",
      "onRight": { happy: ['knight'], sad: [] },
      "left_custom": "",
      "right_custom": "",
      "left_next_card": "",
      "right_next_card": "",
      "ordre": "",
      "difficulté": "",
      "Kanji": "",
      "background": "#e9f5f9",
      "image": "https://cdn-icons-png.flaticon.com/512/6594/6594737.png",
      "itemId": ""
    },

    {
      "id": "d97ebf2a4a0f412dba7c2cfdbffff291",
      "Molecule": "Premier jour au japon",
      "card_type": "",
      "character": "",
      "condition": "",
      "question": "Your dauger wants a new pet.",
      "leftText": "Get her a cat",
      "onLeft": { happy: ['woman'], sad: [] },
      "rightText": "Get her a lion",
      "onRight": { happy: ['joker'], sad: ['woman'] },
      "left_custom": "",
      "right_custom": "",
      "left_next_card": "",
      "right_next_card": "",
      "ordre": "",
      "difficulté": "",
      "Kanji": "",
      "background": "#ccc",
      "image": "https://cdn-icons-png.flaticon.com/512/8592/8592791.png",
      "itemId": ""
    },

    {
      "id": "2db19f997a904d848fd2fd36d77d5404",
      "Molecule": "Premier jour au japon",
      "card_type": "",
      "character": "",
      "condition": "",
      "question": "Knights are bored because there is no war so they start to rob nearby villages",
      "leftText": "Get her a cat",
      "onLeft": { happy: ['woman'], sad: ['knight'] },
      "rightText": "Get her a lion",
      "onRight": { happy: ['joker', 'knight'], sad: ['woman'] },
      "left_custom": "",
      "right_custom": "",
      "left_next_card": "",
      "right_next_card": "",
      "ordre": "",
      "difficulté": "",
      "Kanji": "",
      "background": "#ccc",
      "image": "https://cdn-icons-png.flaticon.com/512/8794/8794740.png",
      "itemId": ""
    },

    {
      "id": "505dc8c39ed34f48ad448e8146dcb60e",
      "Molecule": "Premier jour au japon",
      "card_type": "",
      "character": "",
      "condition": "",
      "question": "He is probably a spy. Kill him",
      "leftText": "oh no hoho",
      "onLeft": { happy: [], sad: ['woman'] },
      "rightText": "Put him in the army",
      "onRight": { happy: ['knight'], sad: ['joker'] },
      "left_custom": "",
      "right_custom": "",
      "left_next_card": "",
      "right_next_card": "",
      "ordre": "",
      "difficulté": "",
      "Kanji": "",
      "background": "#ccc",
      "image": "https://cdn-icons-png.flaticon.com/512/9183/9183995.png",
      "itemId": ""
    },

    {
      "id": "e201fdaad5734c359a1910ac32886e56",
      "Molecule": "Premier jour au japon",
      "card_type": "",
      "character": "",
      "condition": "",
      "question": "just a test hehe",
      "leftText": "oh no hoho",
      "onLeft": { happy: [], sad: ['woman'] },
      "rightText": "lets gooooo",
      "onRight": { happy: ['knight'], sad: ['joker'] },
      "left_custom": "",
      "right_custom": "",
      "left_next_card": "",
      "right_next_card": "",
      "ordre": "",
      "difficulté": "",
      "Kanji": "",
      "background": "#ccc",
      "image": "https://cdn-icons-png.flaticon.com/512/7215/7215423.png",
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
