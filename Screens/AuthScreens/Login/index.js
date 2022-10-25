import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {ToastAndroid, View, Text} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Abutton} from '../../../Components/Abutton';
import {SCREEN_HEIGHT, showYupFormValidationError} from '../../../utility';
import {Ainput} from '../../../Components/Ainput';
import {useNavigation} from '@react-navigation/native';
import {Card} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Login = () => {
  const navigation = useNavigation();
  const lb_loginSchema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({resolver: yupResolver(lb_loginSchema)});

  const onSubmit = formValue => {
    ToastAndroid.showWithGravityAndOffset(
      'Success',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    console.log('formValue', formValue);
    navigation.navigate('Search Listing');
  };

  useEffect(() => {
    showYupFormValidationError(errors);
  }, [errors]);

  return (
    <KeyboardAwareScrollView>
      <View
        style={{padding: 15, height: SCREEN_HEIGHT, justifyContent: 'center'}}>
        <Card style={{padding: 15}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              alignSelf: 'center',
              marginBottom: 20,
            }}>
            Login
          </Text>
          <Ainput
            placeholder="Email Address"
            type="email-address"
            label="Email"
            style={{marginBottom: 10}}
            name="email"
            control={control}></Ainput>
          <Ainput
            placeholder="Password"
            label="Password"
            control={control}
            style={{marginBottom: 30}}
            name="password"
            view={true}
            secureTextEntry={true}></Ainput>
          <Abutton onPress={handleSubmit(onSubmit)}>Login</Abutton>
        </Card>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;
