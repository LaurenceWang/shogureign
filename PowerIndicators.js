import { includes } from 'lodash';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import PowerPerson from './PowerPerson';
import { Images } from './images/index';

const PowerIndicators = ({ currentMood }) => {
  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.personsWrapper}>
          <PowerPerson
            isHappy={includes(currentMood.happy, 'happiness')}
            isSad={includes(currentMood.sad, 'happiness')}
            base={"happiness"}
          />
          <PowerPerson
            isHappy={includes(currentMood.happy, 'money')}
            isSad={includes(currentMood.sad, 'money')}
            base={"money"}
          />
          <PowerPerson
            isHappy={includes(currentMood.happy, 'popularity')}
            isSad={includes(currentMood.sad, 'popularity')}
            base={"popularity"}
          />
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#ccc',
    overflow: 'hidden',
  },
  personsWrapper: {
    width: '90%',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
});

export default PowerIndicators;
