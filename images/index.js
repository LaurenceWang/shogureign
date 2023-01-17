const Images = {
  jaugeEffects: {
    down: require('./jauge-effects/down-arrow.png'),
    up: require('./jauge-effects/up-arrow.png'),
  },
  jauges: {
    happiness: {
      empty: require('./jauges/happiness_empty.png'),
      full: require('./jauges/happiness.png')
    },
    money: {
      empty: require('./jauges/money_empty.png'),
      full: require('./jauges/money.png')
    },
    popularity: {
      empty: require('./jauges/popularity_empty.png'),
      full: require('./jauges/popularity.png')
    },
    hygiene: {
      empty: "",
      full: require('./jauges/hygiene.png')
    }
  }
};

export default Images;
