import {includes} from 'lodash';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import PowerPerson from './PowerPerson';

const PowerIndicators = ({currentMood}) => {
  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.personsWrapper}>
          <PowerPerson
            isHappy={includes(currentMood.happy, 'knight')}
            isSad={includes(currentMood.sad, 'knight')}
            image={'https://cdn-icons-png.flaticon.com/512/2701/2701847.png'}
          />
          <PowerPerson
            isHappy={includes(currentMood.happy, 'joker')}
            isSad={includes(currentMood.sad, 'joker')}
            image={'https://cdn-icons-png.flaticon.com/512/5584/5584325.png'}
          />
          <PowerPerson
            isHappy={includes(currentMood.happy, 'woman')}
            isSad={includes(currentMood.sad, 'woman')}
            image={'https://cdn-icons-png.flaticon.com/512/3275/3275703.png'}
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