import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

import Card from './Card';
import PlaceholderBackCards from './PlaceholderBackCards';
import Question from './Question';
import PowerIndicators from './PowerIndicators';
import PlaceholderBackStaticCard from './PlaceholderBackStaticCard';
import StartButton from './StartButton';
import useGeneratedCards from './useGeneratedCards';

import useGeneratedChapters from './useGeneratedChapters';
import Chapter from './Chapter';

export default function AnimatedStyleUpdateExample() {
  const { getChapterbyIndex } = useGeneratedChapters();
  const [currentChapter, setCurrentChapter] = useState({});
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  const [firstChapCard, setFirstChapCard] = useState();

  useEffect(() => {
    setFirstChapCard("505dc8c39ed34f48ad448e8146dcb60e");
  }, []);

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
