import {
  StyleSheet, 
  View, 
  StatusBar, 
  Text, 
  FlatList, 
  SafeAreaView, 
  Pressable, 
  TouchableOpacity,
  ScrollView
} from 'react-native';
import React, {
  useState
} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import useKanjiCards from './Kanjitab';

  const {KanjiCards} = useKanjiCards();

const NotEmptyText = ({style, text}) => {
  return (text !== '' && <Text style={style}>{text}</Text>);
}

const Item = ({item, onPress, backgroundColor, textColor, text}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
  <Text style={[styles.title, {color: textColor}]}>{item}</Text>
  {(text !== '' && Object.keys(KanjiCards).includes(item)) && 
  <><NotEmptyText style={[styles.text]} text={KanjiCards[item]["Lecture"]} /> 
  <NotEmptyText style={[styles.text]} text={KanjiCards[item]["Trad"]}/>
  <NotEmptyText style={[styles.text]} text={KanjiCards[item]["Mnemotechnique"]}/>
  <NotEmptyText style={[styles.text]} text={KanjiCards[item]["Combinaison"]}/>
  <NotEmptyText style={[styles.text]} text={KanjiCards[item]["Littéral"]}/>
  <NotEmptyText style={[styles.text]} text={KanjiCards[item]["Traduction"]}/></>}
</TouchableOpacity>
);

const KanjiMenu = ({data}) => {
  const [selectedId, setSelectedId] = useState();
  const renderItem = ({item}) => {
    const backgroundColor = item === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item === selectedId ? 'white' : 'black';
    const hello = item === selectedId ? 'hello' : '';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item)}
        backgroundColor={backgroundColor}
        textColor={color}
        text={hello}
      />
    );
  };
  return (
  <SafeAreaView style={styles.container}>
    {data && <FlatList
    data={Object.keys(data)}
    renderItem={renderItem}
    extraData={selectedId}
    />}
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:100,
    marginBottom:-800,
    width: 350,

  },

  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});

export default KanjiMenu;