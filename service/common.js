import axios from 'axios';
// import AsyncStorage from '@react-native-community/async-storage';

export const request = async (method, url, data = {}) => {
  let base_url = 'https://630369f20de3cd918b34e39e.mockapi.io';

  console.log('config.baseUrl', base_url + url);
  let headerObj = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (method == 'upload') {
    headerObj['Content-Type'] = 'multipart/form-data';
  }
//   const token = await AsyncStorage.getItem('token');

//   if (token) {
//     headerObj['authorization'] = 'Bearer ' + token;
//   }

  let instance = axios.create({
    baseURL: base_url,
    timeout: 8000,
    headers: headerObj,
    validateStatus: function (status) {
      if (status == 401) {
        // logout();
      }
      return status == 200;
    },
  });
  let base;
  console.log(instance);
  if (method === 'post') {
    base = instance.post(url, data);
  } else if (method === 'put') {
    base = instance.put(url, data);
  } else if (method === 'patch') {
    base = instance.patch(url, data);
  } else if (method === 'delete') {
    base = instance.delete(url);
  } else base = instance.get(url, {params: data});

  return base;
};
