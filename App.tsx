import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import TaskCard from '@components/TaskCard';

type Props = {};

const App = (props: Props) => {
  const [list, setList] = useState([]);
  const [task, setTask] = useState<string>('');

  const handleDelete = (id: number) => {
    setList();
  };

  const handleAdd = useCallback(() => {
    if (task === '') {
      Alert.alert('Alert', 'Please enter valid task');
      return;
    }
    const data = {
      id: Math.random(),
      title: task,
      isComplete: false,
    };
    setList(prev => [...prev, data]);
    setTask('');
  }, [task]);

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        renderItem={({item}) => (
          <TaskCard task={item.title} onDelete={() => handleDelete(item.id)} />
        )}
        ListEmptyComponent={() => <Text style={{color: '#000'}}>No task</Text>}
      />

      <View style={styles.row}>
        <TextInput
          value={task}
          placeholder="Enter task"
          onChangeText={text => setTask(text)}
          placeholderTextColor={'#dada'}
          style={styles.input}
        />
        <Pressable onPress={handleAdd} style={styles.button}>
          <Text style={{color: 'blue'}}>Add</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    color: '#000',
  },
  row: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '20%',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
