import React from 'react';
import {ActivityIndicator, StyleSheet, View, Text} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import { AppTheme } from '../../config/Constants';
import {normalizeSize} from '../../utility';

const Abutton = ({
  children,
  style = {},
  onPress,
  loader = false,
  fontSize = 16,
  fontWeight = '500',
  icon = false,
  textColor = 'white',
  materialIcon,
}) => {
  return (
    <TouchableRipple
      style={[styles.buttonStyle, styles.default, style]}
      onPress={onPress}>
      {loader ? (
        <ActivityIndicator color="#fff"></ActivityIndicator>
      ) : (
        <View style={styles.iconBackground}>
          {icon && materialIcon}
          <Text
            style={[
              {
                color: textColor,
              },
            ]}
            fontSize={fontSize}
            fontWeight={fontWeight}>
            {children}
          </Text>
        </View>
      )}
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  default: {
    marginTop: normalizeSize(20),
    width: '100%',
  },
  iconBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonStyle: {
    borderRadius: 10,
    backgroundColor: AppTheme,
    color: 'white',
    height: normalizeSize(38,32),
    justifyContent: 'center',
    fontSize: normalizeSize(16),
  }
});
export {Abutton};
