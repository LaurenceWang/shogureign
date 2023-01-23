import {StyleSheet, View, StatusBar, Text, FlatList, SafeAreaView, Pressable, ScrollView} from 'react-native';
import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const kanjis_rencontrés = [
  {
    name: '子',
    title: 'blabla ko',
  },
  {
    id: '母',
    title: 'blabla haha',
  },
  {
    id: '父',
    title: 'blabla chichi',
  },
  {
    id: '足',
    title: 'blabla hashiru',
  },
  {
    id: '車',
    title: 'blabla kuruma',
  },
  {
    id: '電',
    title: 'blabla denki',
  },  
  {
    id: 'aaaa',
    title: 'blabla denkki',
  },
  {
    id: 'ooo',
    title: 'blabla den',
  },
];

const Item = ({title}) => (
  <View style = {styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
  );


const KanjiMenu = () => {
  return (
  <SafeAreaView style={styles.container}>
    <FlatList
    data = {kanjis_rencontrés}
    renderItem = {({item}) => <Item title = {item.id} />}
    keyExtractor = {item => item.title}
    />
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight-150 || 0,
    marginBottom:-150,
    width: 300,

  },

  item: {
    backgroundColor: '#ffff66',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default KanjiMenu;