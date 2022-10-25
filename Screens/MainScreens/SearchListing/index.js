import {debounce} from 'lodash';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {View, Text, FlatList} from 'react-native';
import {Card} from 'react-native-paper';
import {Ainput} from '../../../Components/Ainput';
import Atable from '../../../Components/Atable';
import {request} from '../../../service/common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppTheme} from '../../../config/Constants';
import {normalizeSize} from '../../../utility';
import Rloader from '../../../Components/Rloader';

const SearchListing = () => {
  const [la_userStats, setUserStats] = useState([]);
  const [la_userFilterList, setFilterUserList] = useState([]);
  const [la_userList, setList] = useState([]);
  const [lb_loader, setLoader] = useState(true);

  useEffect(() => {
    getUserStats();
    getUserList();
  }, []);

  const {
    control,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const getUserStats = async () => {
    try {
      const response = await request('get', '/transactionstats');
      setUserStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserList = async () => {
    setLoader(true);
    try {
      const response = await request('get', '/users');
      console.log(response.data);
      setList(response.data);
      setFilterUserList(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  };

  const searchFilterFunction = text => {
    console.log(text.search);
    if (text.search) {
      const newData = la_userList.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.search.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterUserList(newData);
    } else {
      setFilterUserList(la_userList);
    }
  };

  return (
    <>
      {lb_loader ? (
        <Rloader></Rloader>
      ) : (
        <FlatList
          style={{padding: 15}}
          data={la_userFilterList}
          ListHeaderComponent={
            <View>
              {la_userStats.length != 0 && (
                <Card>
                  {la_userStats.map((item, inx) => (
                    <View
                      key={inx}
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        paddingVertical: 5,
                        width: '100%',
                        elevation: 3,
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <AntDesign
                          color={AppTheme}
                          size={normalizeSize(12)}
                          style={{marginEnd: 5}}
                          name={'user'}></AntDesign>
                        <Text style={{color: 'grey'}}>{item.label}</Text>
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: 'grey'}}>{item.Rate}</Text>
                        <Ionicons
                          style={{marginStart: 10}}
                          color={AppTheme}
                          name="ios-stats-chart-outline"></Ionicons>
                      </View>
                    </View>
                  ))}
                </Card>
              )}
              <Ainput
                placeholder="Search"
                style={{marginVertical: 10}}
                label="Search"
                onChange={debounce(handleSubmit(searchFilterFunction), 500)}
                name="search"
                search={true}
                control={control}></Ainput>
            </View>
          }
          keyExtractor={(item, inx) => inx.toString()}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.01}
          renderItem={({item, index}) => <Atable item={item}></Atable>}
        />
      )}
    </>
  );
};

export default SearchListing;
