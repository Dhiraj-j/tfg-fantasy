import {FlatList, StyleSheet, View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import COLORS from '@theme/color';
import {addMatch} from '@store/matchSlice';

type Props = {};

const HomeScreen = (props: Props) => {
  const matchs = useAppSelector(state => state.reducer);
  const dispatch = useAppDispatch();
  console.log(matchs);
  useEffect(() => {
    dispatch(addMatch({id: 4}));
  }, []);
  return (
    <View>
      <FlatList
        data={matchs.matchs}
        renderItem={({item}) => <Text>{item.title}</Text>}
        ListEmptyComponent={
          <Text style={{color: COLORS.PRIMARY}}>No Match</Text>
        }
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
