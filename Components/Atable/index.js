import React from 'react';
import {View, Text, Image} from 'react-native';
import {Card} from 'react-native-paper';
import {normalizeSize} from '../../utility';
const Atable = ({item}) => {
  return (
    <Card style={{padding: 15, marginBottom: 10}}>
      <View style={{flexDirection: 'row', alignItems:'center'}}>
        <Image
          style={{width: normalizeSize(25), borderRadius:30,height: normalizeSize(25), marginEnd:10}}
          source={{
            uri: item.avatar
          }}
        />
        <Text style={{color:'grey'}}>{item.name}</Text>
      </View>
    </Card>
  );
};

export default Atable;
