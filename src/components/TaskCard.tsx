import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  task: string;
  onDelete: () => void;
};

const TaskCard = ({task, onDelete, ...props}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.taskText}>{task}</Text>
      <Text onPress={onDelete} style={styles.delete}>
        Delete
      </Text>
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    backgroundColor: 'lightblue',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  delete: {
    color: 'red',
    padding: 10,
  },
  taskText: {
    color: '#000',
  },
});
