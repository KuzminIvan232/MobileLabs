import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LogLevel, OneSignal } from 'react-native-onesignal';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

const ONESIGNAL_APP_ID = "142cde3c-b6a3-4815-b15a-5ecbe870426d";
const REST_API_KEY = "fuc2wlrqfelvf4ksdqdmpdab5";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize(ONESIGNAL_APP_ID);
    OneSignal.Notifications.requestPermission(true);

    OneSignal.Notifications.addEventListener('foregroundWillDisplay', (event) => {
      event.preventDefault();
      event.getNotification().display();
    });
  }, []);

  const scheduleNotification = async (taskDate, taskTitle) => {
    const url = 'https://api.onesignal.com/notifications?c=push';

    const body = {
      app_id: ONESIGNAL_APP_ID,
      contents: { en: `Нагадування: ${taskTitle}` },
      headings: { en: "To-Do Reminder" },
      included_segments: ["All"],
      send_after: taskDate.toISOString()
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Basic ${REST_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const result = await response.json();
      console.log('Notification scheduled:', result);

      if (result.id) return result.id;
      return null;
    } catch (error) {
      console.error('Error scheduling:', error);
      Alert.alert('Помилка', 'Не вдалося створити нагадування');
      return null;
    }
  };

  const cancelNotification = async (notificationId) => {
    if (!notificationId) return;
    const url = `https://api.onesignal.com/notifications/${notificationId}?app_id=${ONESIGNAL_APP_ID}`;

    try {
      await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Basic ${REST_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Notification cancelled:', notificationId);
    } catch (error) {
      console.error('Error cancelling:', error);
    }
  };

  const addTask = async () => {
    if (!title) {
      Alert.alert('Помилка', 'Введіть назву завдання');
      return;
    }

    const notificationId = await scheduleNotification(date, title);

    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      date: date.toLocaleString(),
      notificationId
    };

    setTasks([...tasks, newTask]);
    setTitle('');
    setDescription('');
    setDate(new Date());
  };

  const deleteTask = async (id, notificationId) => {
    await cancelNotification(notificationId);
    setTasks(tasks.filter(task => task.id !== id));
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📝 To-Do Reminder</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Назва"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Опис"
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity style={styles.dateBtn} onPress={() => setShowPicker(true)}>
          <Text>Обрати час: {date.toLocaleString()}</Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="datetime"
            display="default"
            onChange={onDateChange}
            minimumDate={new Date()}
          />
        )}

        <TouchableOpacity style={styles.addBtn} onPress={addTask}>
          <Text style={styles.btnText}>ДОДАТИ НАГАДУВАННЯ</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <View style={{flex: 1}}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskDesc}>{item.description}</Text>
              <Text style={styles.taskDate}>{item.date}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => deleteTask(item.id, item.notificationId)}
            >
              <Text style={styles.deleteText}>🗑</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  form: { backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 20, elevation: 3 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 5, marginBottom: 10 },
  dateBtn: { padding: 10, backgroundColor: '#eee', borderRadius: 5, marginBottom: 10 },
  addBtn: { backgroundColor: '#2196F3', padding: 15, borderRadius: 5, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold' },
  taskCard: { flexDirection: 'row', backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 10, elevation: 2, alignItems: 'center' },
  taskTitle: { fontSize: 18, fontWeight: 'bold' },
  taskDesc: { color: '#666' },
  taskDate: { fontSize: 12, color: '#999', marginTop: 5 },
  deleteBtn: { backgroundColor: '#ff4444', padding: 10, borderRadius: 5, marginLeft: 10 },
  deleteText: { color: 'white' }
});