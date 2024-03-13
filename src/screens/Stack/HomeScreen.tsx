import {FlatList, StyleSheet, View, Text, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import COLORS from '@theme/color';
import {addMatch} from '@store/matchSlice';

const HomeScreen = ({navigation}) => {
  const matchs = useAppSelector(state => state.reducer);

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={matchs.matchs}
        renderItem={({item}) => (
          <Pressable
            onPress={() => navigation.navigate('MatchCreate', item)}
            style={styles.card}>
            <Text style={styles.text}>{item.title}</Text>
            <View style={styles.row}>
              <Text style={styles.text}>{item.teamA}</Text>
              <Text style={styles.text}>{item.teamB}</Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={{color: COLORS.PRIMARY}}>No Match</Text>
        }
      />
      <Pressable
        onPress={() => navigation.navigate('MatchCreate')}
        style={styles.fab}>
        <Text style={{color: COLORS.BACKGROUND, fontSize: 20}}>Add +</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.BACKGROUND,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    alignItems: 'center',
  },
  text: {
    color: COLORS.PRIMARY,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.PRIMARY,
    padding: 10,
    borderRadius: 50,
  },
});
