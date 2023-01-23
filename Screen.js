import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

import useGeneratedChapters from './useGeneratedChapters';
import Chapter from './Chapter';

export default function AnimatedStyleUpdateExample() {
  const [chapNum, setChapNum] = useState(0);
  const increment = () => {
    console.log("incrementé");
    setChapNum(chapNum + 1);
  }

  return (
    <Chapter chapNum={chapNum} endChap={increment} />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardWrapper: {
    height: 340,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionWrapper: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameWrapper: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topWrapper: {
    width: '100%',
    height: 170,
    backgroundColor: '#ccc',
  },
});
