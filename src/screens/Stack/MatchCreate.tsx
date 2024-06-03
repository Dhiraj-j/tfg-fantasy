import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomSheet from '@components/BottomSheet';
import {Calendar} from 'react-native-calendars';
import DateCard from '@components/DateCard';
import COLORS from '@theme/color';
import FONTSIZE from '@theme/fontSize';
import {HEIGHT, WIDTH} from '@theme/size';
import DateTimePicker from '@react-native-community/datetimepicker';
import Match from '@store/type';
import {useRoute} from '@react-navigation/native';
import {useAppDispatch} from '@store/hooks';
import {addMatch, editMatch} from '@store/matchSlice';
import {nanoid} from '@reduxjs/toolkit';

const initialForm: Match = {
  id: '',
  title: '',
  teamA: '',
  teamB: '',
  schedules: [],
};

const MatchCreate = ({navigation}) => {
  const [form, setForm] = useState(initialForm);
  const [showPicker, setShowPicker] = useState(false);
  const [modal, setModal] = useState<boolean>(false);
  const toggleModal = () => setModal(!modal);
  const route = useRoute();
  const dispatch = useAppDispatch();
  console.log(route.params, 'route.params');
  useEffect(() => {
    if (route.params?.id) {
      setForm(route.params);
    }
  }, []);

  const handleSubmit = () => {
    if (!form.title || !form.schedules[0] || !form.teamA || !form.teamB) {
      Alert.alert('Please fill all the fields');
      return;
    }
    if (form.id) {
      dispatch(editMatch(form));
    } else {
      dispatch(addMatch({...form, id: nanoid()}));
    }
    navigation.goBack();
  };

  const [minDate, setMinDate] = useState<string>(
    new Date().toISOString().split('T')[0],
  );
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [markedDates, setMarkedDates] = useState<{
    [date: string]: {selected: boolean; marked: boolean; dotColor: string};
  }>({});

  // Function to handle date selection
  const handleDateSelect = (day: DateObject) => {
    const dateStr = day.dateString;

    // Toggle date selection
    const updatedSelectedDates = selectedDates.includes(dateStr)
      ? selectedDates.filter(date => date !== dateStr)
      : [...selectedDates, dateStr];

    // Update marked dates for circle highlighting
    const updatedMarkedDates = updatedSelectedDates.reduce(
      (acc, date) => ({
        ...acc,
        [date]: {selected: true, marked: true, dotColor: 'blue'}, // Customize dot color as needed
      }),
      {},
    );
    console.log(updatedSelectedDates, 'updatedSelectedDates');
    setForm({
      ...form,
      schedules: [
        ...updatedSelectedDates.map(date => ({
          date,
          slots: [],
        })),
      ],
    });

    setSelectedDates(updatedSelectedDates);
    setMarkedDates(updatedMarkedDates);
  };

  //Delete dates
  const removeDate = (dateToRemove: string) => {
    const updatedSelectedDates = selectedDates.filter(
      date => date !== dateToRemove,
    );

    // Update marked dates for circle highlighting
    const updatedMarkedDates = updatedSelectedDates.reduce(
      (acc, date) => ({
        ...acc,
        [date]: {selected: true, marked: true, dotColor: 'blue'},
      }),
      {},
    );

    setSelectedDates(updatedSelectedDates);
    setForm({
      ...form,
      schedules: form.schedules.filter(item => item.date !== dateToRemove),
    });
    setMarkedDates(updatedMarkedDates);
  };

  const handleAddSlots = (date: string) => {
    const checkExist = form.schedules.findIndex(item => item.date === date);
    if (checkExist !== -1) {
      const isEmptySlotExist = form.schedules[checkExist].slots.some(
        item => item.start === null || item.end === null,
      );
      if (isEmptySlotExist) {
        Alert.alert('Alert', 'Please fill all the slots');
        return;
      }
      setForm({
        ...form,
        schedules: [
          ...form.schedules.slice(0, checkExist),
          {
            ...form.schedules[checkExist],
            slots: [
              ...form.schedules[checkExist].slots,
              {start: null, end: null},
            ],
          },
          ...form.schedules.slice(checkExist + 1),
        ],
      });
    }
  };

  const hanldeRemoveSlots = (date: string, index: number) => {
    console.log(index, date);
    const checkExist = form.schedules.findIndex(item => item.date === date);
    if (checkExist !== -1) {
      setForm({
        ...form,
        schedules: [
          ...form.schedules.slice(0, checkExist),
          {
            ...form.schedules[checkExist],
            slots: [
              ...form.schedules[checkExist].slots.slice(0, index),
              ...form.schedules[checkExist].slots.slice(index + 1),
            ],
          },
          ...form.schedules.slice(checkExist + 1),
        ],
      });
    }
  };

  const handleSubmitTime = (
    date: string,
    index: number,
    start: string,
    end: string,
  ) => {
    const checkExist = form.schedules.findIndex(item => item.date === date);
    if (checkExist !== -1) {
      setForm({
        ...form,
        schedules: [
          ...form.schedules.slice(0, checkExist),
          {
            ...form.schedules[checkExist],
            slots: [
              ...form.schedules[checkExist].slots.slice(0, index),
              {start, end},
              ...form.schedules[checkExist].slots.slice(index + 1),
            ],
          },
          ...form.schedules.slice(checkExist + 1),
        ],
      });
    }
  };

  return (
    <View style={styles.container}>
      <BottomSheet visible={modal} toggleModal={toggleModal}>
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <Calendar
            minDate={minDate}
            markedDates={markedDates}
            onDayPress={day => handleDateSelect(day)}
          />
          <View style={styles.row}>
            <Pressable
              onPress={toggleModal}
              style={[
                styles.button,
                {
                  backgroundColor: 'transparent',
                  borderWidth: 2,
                  borderColor: COLORS.TEXT2 + '33',
                },
              ]}>
              <Text style={[styles.buttonText, {color: COLORS.TEXT1}]}>
                Cancel
              </Text>
            </Pressable>
            <Pressable onPress={toggleModal} style={styles.button}>
              <Text style={[styles.buttonText, {color: COLORS.BACKGROUND}]}>
                Done
              </Text>
            </Pressable>
          </View>
        </View>
      </BottomSheet>

      {/* Main Screen  */}

      <View style={styles.formContainer}>
        {showPicker ? (
          <DateTimePicker
            mode="time"
            value={new Date()}
            is24Hour={true}
            display="clock"
            onChange={d => console.log(d)}
          />
        ) : null}
        <View style={styles.inputContainer}>
          <TextInput
            value={form.title}
            onChangeText={text => setForm({...form, title: text})}
            placeholder="Title"
            placeholderTextColor={COLORS.TEXT1}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            value={form.teamA}
            onChangeText={text => setForm({...form, teamA: text})}
            placeholder="Team A"
            placeholderTextColor={COLORS.TEXT1}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            value={form.teamB}
            onChangeText={text => setForm({...form, teamB: text})}
            placeholder="Team B"
            placeholderTextColor={COLORS.TEXT1}
            style={styles.input}
          />
        </View>

        <Text style={styles.fieldTitle}>Create match schedules</Text>
        <Pressable
          onPress={toggleModal}
          style={[styles.inputContainer, {borderColor: COLORS.PRIMARY + 'cc'}]}>
          <Ionicons name="calendar-outline" size={20} color={COLORS.TEXT1} />
          <Text style={styles.input}>Select date(s)</Text>
        </Pressable>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          {form.schedules.length > 0 ? (
            <ScrollView style={{marginTop: 20}}>
              {form.schedules.map((item, index) => (
                <View key={index} style={{marginTop: 5}}>
                  <DateCard
                    addTimeSlot={() => handleAddSlots(item.date)}
                    date={item.date}
                    timeslots={item.slots}
                    onDeleteSlot={hanldeRemoveSlots}
                    onDelete={() => removeDate(item.date)}
                    submitTime={handleSubmitTime}
                  />
                </View>
              ))}
            </ScrollView>
          ) : (
            <View>
              <Image
                source={require('../../assets/images/noDate.png')}
                style={styles.image}
              />
              <Text style={styles.noImageText}>
                please create slots to continue
              </Text>
            </View>
          )}
          <View style={styles.row}>
            <Pressable
              style={[
                styles.button,
                {
                  backgroundColor: 'transparent',
                  borderWidth: 2,
                  borderColor: COLORS.TEXT2 + '33',
                },
              ]}>
              <Text style={[styles.buttonText, {color: COLORS.TEXT1}]}>
                Cancel
              </Text>
            </Pressable>
            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text style={[styles.buttonText, {color: COLORS.BACKGROUND}]}>
                Save
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MatchCreate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },

  fieldTitle: {
    fontSize: FONTSIZE.large,
    color: COLORS.TEXT1,
    marginTop: 15,
  },
  pickerContainer: {
    width: '100%',
    height: HEIGHT * 0.25,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  picker: {
    width: '40%',
    height: '80%',
    borderRadius: 10,
    padding: 10,
  },
  pickerButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: COLORS.BACKGROUND + 'dd',
  },
  formContainer: {
    paddingHorizontal: 15,
    flex: 1,
  },
  inputContainer: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.BACKGROUND,
    borderWidth: 1,
    borderColor: COLORS.TEXT2 + 'cc',
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginVertical: 8,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: COLORS.TEXT1,
    fontSize: 16,
  },
  image: {
    width: WIDTH / 1.8,
    height: WIDTH / 1.8,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: WIDTH * 0.2,
  },
  noImageText: {
    color: COLORS.TEXT1,
    fontSize: FONTSIZE.medium,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '48%',
    height: 50,
    borderRadius: 10,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: FONTSIZE.medium,
  },
});
