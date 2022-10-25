import React, {useState} from 'react';
import {useController} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {AppTheme} from '../../config/Constants';
import {normalizeSize} from '../../utility';
const Ainput = ({
  autoFocus = false,
  value = '',
  onChangeText = val => {},
  multiline = false,
  onBlur = () => {},
  placeholder = '',
  numberOfLines = 1,
  secureTextEntry = false,
  border = '#76A8C8',
  marginTop = {},
  marginBottom = {},
  style = {},
  keyboardType = 'default',
  view = false,
  search = false,
  type = 'default',
  roundness = 10,
  outlineColor = AppTheme,
  editable = true,
  mode = 'outlined',
  label = '',
  control,
  leftIconName='magnify',
  leftIconColor=AppTheme,
  name,
  onChange,
}) => {
  const [lcSecureTextEntry, setLcSecureTextEntry] = useState(secureTextEntry);
  const {field} = useController({
    control,
    defaultValue: '',
    name,
  });
  const passwordEyeChange = () => {
    if (lcSecureTextEntry == false) {
      setLcSecureTextEntry(true);
    } else {
      setLcSecureTextEntry(false);
    }
  };
  return (
    <TextInput
      onChange={onChange}
      style={[
        inputText,
        {
          color: AppTheme,
          backgroundColor: 'white',
          borderColor: 'black',
        },
        style,
      ]}
      mode={mode}
      editable={editable}
      label={label}
      value={field.value}
      autoFocus={autoFocus}
      placeholder={placeholder}
      keyboardType={keyboardType}
      onChangeText={field.onChange}
      secureTextEntry={lcSecureTextEntry}
      outlineColor={AppTheme}
      multiline={multiline}
      numberOfLines={numberOfLines}
      activeOutlineColor={AppTheme}
      theme={{
        roundness: roundness,
        colors: {},
      }}
      right={
        view ? (
          <TextInput.Icon
            size={normalizeSize(20)}
            style={{marginEnd:normalizeSize(0,30), marginTop:15}}
            name={lcSecureTextEntry ? 'eye-off' : 'eye'}
            onPress={() => passwordEyeChange()}
            color={AppTheme}
          />
        ) : <></>
      }
      left={
        search ? (
          <TextInput.Icon
            name={leftIconName}
            onPress={() => passwordEyeChange()}
            color={leftIconColor}
            size={normalizeSize(20)}
            style={{marginTop: 15, marginRight:normalizeSize(1,20)}}
          />
        ) : null
      }
    />
  );
};
const inputText = StyleSheet.create({
  paddingLeft: normalizeSize(5,20),
  fontSize: normalizeSize(16),
  height: normalizeSize(35),
});
export {Ainput};