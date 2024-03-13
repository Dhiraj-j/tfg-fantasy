import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FONTSIZE from '@theme/fontSize';
import COLORS from '@theme/color';
import {WIDTH} from '@theme/size';
import DateTimePicker, {Event} from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';

type DateProps = {
  date: string;
  onDelete: () => void;
  timeslots: {start: null | string; end: null | string}[];
  addTimeSlot: () => void;
  onDeleteSlot: (date: string, index: number) => void;
  submitTime: (date: string, index: number, start: string, end: string) => void;
};

const DateCard = (props: DateProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<'start' | 'end'>('start');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [time, setTime] = useState<{start: string; end: string}>({
    start: '',
    end: '',
  });

  const toggle = (mode: 'start' | 'end', index: number) => {
    setShowPicker(!showPicker);
    setPickerMode(mode);
    setSelectedIndex(index);
  };

  const onChange = (_: Event, selectedTime) => {
    const formatTime = dayjs(selectedTime).format('HH:mm');
    if (pickerMode === 'start') {
      setTime({...time, start: formatTime});
    } else {
      setTime({...time, end: formatTime});
    }
    props.submitTime(props.date, selectedIndex, time.start, time.end);
    setShowPicker(false);
  };

  return (
    <View style={styles.mainContainer}>
      {showPicker ? (
        <DateTimePicker
          mode="time"
          value={new Date()}
          is24Hour={true}
          display="clock"
          onChange={onChange}
        />
      ) : null}
      <View style={styles.container}>
        <View>
          <Text style={styles.date}>Date</Text>
          <Text style={styles.dateString}>{props.date}</Text>
        </View>
        <Pressable onPress={props.onDelete}>
          <Ionicons name="trash-outline" size={26} color={'red'} />
        </Pressable>
      </View>
      <View style={styles.row}>
        <Pressable onPress={props.addTimeSlot} style={styles.button}>
          <Text style={styles.buttonText}>Add Timeslot</Text>
        </Pressable>
        {props.timeslots.map((slot, index) => (
          <View style={styles.button}>
            <Text
              onPress={() => toggle('start', index)}
              style={styles.buttonText}>
              {slot.start ? slot.start : 'Start'} -
            </Text>
            <Text
              onPress={() => toggle('end', index)}
              style={styles.buttonText}>
              {slot.end ? slot.end : 'End'}
            </Text>
            <Pressable onPress={() => props.onDeleteSlot(props.date, index)}>
              <Ionicons name="close" size={15} color={'red'} />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};

export default DateCard;

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY + 'cc',
  },
  container: {
    width: '100%',
    height: 70,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F4F4F4',
  },
  date: {
    color: COLORS.TEXT2,
    fontSize: FONTSIZE.medium,
  },
  dateString: {
    color: COLORS.TEXT1,
    fontSize: FONTSIZE.medium,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 5,
    rowGap: 5,
    padding: 5,
  },
  button: {
    minWidth: WIDTH / 3.5,
    padding: 10,
    borderWidth: 0.2,
    borderRadius: 10,
    borderColor: COLORS.ERROR,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: COLORS.PRIMARY,
    textAlign: 'center',
  },
});
