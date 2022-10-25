import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, LogBox} from 'react-native';
import StackNavigation from './Navigation/StackNavigation';
import Login from './Screens/AuthScreens/Login';

const App = () => {
  LogBox.ignoreAllLogs();

  return (<StackNavigation></StackNavigation>)
};

const styles = StyleSheet.create({});

export default App;
