import axios from 'axios';
import {Platform, PixelRatio, Dimensions, ToastAndroid} from 'react-native';

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('window');

const scale = SCREEN_WIDTH / 320;

export const normalizeSize = (size, lgSize = 0, smSize = 0) => {
  if (SCREEN_WIDTH >= 600) size = (lgSize != 0 ? lgSize : size) - 2;
  else if (SCREEN_WIDTH <= 330) size = (smSize != 0 ? smSize : size) - 1;

  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};



export const showYupFormValidationError = errors => {
  console.log(errors);

  let errorMessage = '';
  for (const [key, value] of Object.entries(errors)) {
    errorMessage += '* ' + value.message + '\n';
  }
  errorMessage = errorMessage.replace(/\n+$/, '');
  if (errorMessage != '')
    ToastAndroid.showWithGravityAndOffset(
      errorMessage,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
};

const instance = axios.create({
  baseURL: 'https://630369f20de3cd918b34e39e.mockapi.io/',
});
export default {
  getData: (url) =>
    instance({
      method: 'GET',
      url: url,
    }),
  postData: (formData,action) =>
    instance({
      method: 'POST',
      url: action,
      data: formData,
      headers: { 'content-type':'application/json'} 
    }),
};
