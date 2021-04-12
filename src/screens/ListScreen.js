import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../redux/reducer';

import Header from '../components/Header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(7, 36, 62, 1)',
  },
  listItemContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 10,
    paddingBottom: 5,
    paddingRight: 5,
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 0.25,
  },
  itemTitle: {
    fontSize: 22,
    fontWeight: '400',
  },
  button: {
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#ff333390',
    marginVertical: 5,
    padding: 5,
  },
  textInputStyle: {
    height: 50,
    borderWidth: 2,
    borderRadius: 8,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#31CE73',
    backgroundColor: '#FFFFFF',
  },
});

function ListView() {
  const listItems = useSelector((state) => state.itemList);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = listItems.filter(
        (item) => {
          const itemData = item.name
            ? item.name.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        },
      );
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(listItems);
      setSearch(text);
    }
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
      }}
    >
      {listItems.length !== 0 ? (
        <>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search Here"
          />
          <FlatList
            data={filteredDataSource}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.listItemContainer}>
                <Text style={styles.itemTitle} numberOfLines={1}>
                  {item.name}
                </Text>
                <TouchableOpacity
                  onPress={() => dispatch(removeItem(item.id))}
                  style={styles.button}
                >
                  <Ionicons name="ios-trash" color="#fff" size={20} />
                  <Text style={{ color: 'white', paddingHorizontal: 5, fontSize: 16 }}>REMOVE</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      ) : (
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <Text style={{ textAlign: 'center', fontSize: 30, marginVertical: 30 }}>You list is empty</Text>
          <Entypo name="emoji-sad" size={80} color="black" />
          <Text style={{ textAlign: 'center', fontSize: 22, marginVertical: 30 }}>Click on the QR icon to add sites to your list</Text>
        </View>
      )}
    </View>
  );
}

function ListScreen() {
  return (
    <>
      <Header titleText="URL List" />
      <View style={styles.container}>
        <ListView />
      </View>
    </>
  );
}

export default ListScreen;
