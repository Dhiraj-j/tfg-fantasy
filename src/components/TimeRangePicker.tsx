import React, {useState} from 'react';
import {View, Button, Text} from 'react-native';
import DateTimePicker, {Event} from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';

interface TimeRangePickerProps {
  selectedDate: Date;
  onTimeRangeSelected: (timeSlots: {start: Date; end: Date}[]) => void;
}

const TimeRangePicker: React.FC<TimeRangePickerProps> = ({
  selectedDate,
  onTimeRangeSelected,
}) => {
  const [timeSlots, setTimeSlots] = useState<{start: Date; end: Date}[]>([]);
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<'start' | 'end'>('start');
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());

  const onTimeChange = (event: Event, selectedDate?: Date) => {
    if (selectedDate) {
      setSelectedDateTime(selectedDate);
      setShowPicker(false);
    }
  };

  const addTimeSlot = () => {
    const startTime =
      pickerMode === 'start'
        ? selectedDateTime
        : timeSlots.length > 0
        ? timeSlots[timeSlots.length - 1].start
        : selectedDateTime;
    const endTime = pickerMode === 'end' ? selectedDateTime : null;

    if (endTime && endTime <= startTime) {
      alert('End time must be after start time.');
      return;
    }

    const newTimeSlots = [...timeSlots, {start: startTime, end: endTime}];
    setTimeSlots(newTimeSlots);
    onTimeRangeSelected(newTimeSlots);
  };

  const showPickerModal = (mode: 'start' | 'end') => {
    setPickerMode(mode);
    setShowPicker(true);
  };

  return (
    <View>
      <Button
        onPress={() => showPickerModal('start')}
        title="Select Start Time"
      />
      <Button onPress={() => showPickerModal('end')} title="Select End Time" />
      <Button
        onPress={addTimeSlot}
        title="Add Time Slot"
        disabled={!selectedDateTime}
      />

      {showPicker && (
        <DateTimePicker
          value={selectedDateTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onTimeChange}
        />
      )}

      <View>
        {timeSlots.map((slot, index) => (
          <View key={index}>
            <Text>Start: {dayjs(slot.start).format('HH:mm')}</Text>
            <Text>
              End: {slot.end ? dayjs(slot.end).format('HH:mm') : 'N/A'}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default TimeRangePicker;
