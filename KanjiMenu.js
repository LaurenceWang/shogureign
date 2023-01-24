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

const kanjis_rencontrés =
  {
    "子": {"exam": 5, "lesson": 0, "test": 5}, 
    "母": {"exam": 5, "lesson": 0, "test": 5}, 
    "父": {"exam": 5, "lesson": 0, "test": 5}, 
    "足": {"exam": 5, "lesson": 0, "test": 5}, 
    "車": {"exam": 5, "lesson": 0, "test": 5}, 
    "電": {"exam": 5, "lesson": 0, "test": 5},
    "村": {"exam": 5, "lesson": 0, "test": 5}
  }

const Item = ({title}) => (
  <View style = {styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
  );


const KanjiMenu = () => {
  return (
  <SafeAreaView style={styles.container}>
    <FlatList
    data={Object.keys(kanjis_rencontrés)}
    renderItem={({item}) => <Item title={item} />}
    keyExtractor={item => item}
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