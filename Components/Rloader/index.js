import React from 'react';
import { View } from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {AppTheme} from '../../config/Constants';
const Rloader = () => {
  return (
    <View style={{height: '100%', width: '100%', alignItems: 'center',justifyContent:'center'}}>
      <ActivityIndicator color={AppTheme}></ActivityIndicator>
    </View>
  );
};

export default Rloader;
