import React, { useState, useEffect } from 'react';
import {
  Text, View, StyleSheet, Modal, TouchableHighlight, Image, SafeAreaView, StatusBar,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addItem } from '../redux/reducer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  scanContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButton: {
    backgroundColor: 'rgba(7, 36, 62, 1)',
    padding: 15,
    alignItems: 'center',
  },
  scanText: {
    color: '#31CE73',
    fontSize: 15,
  },
  barContainer: {
    marginBottom: 100,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 5,
  },
  imageStyle: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  qrStyle: {
    borderColor: '#31CE73',
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderRadius: 10,
    paddingVertical: 80,
    paddingHorizontal: 100,
  },
  qrTopText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  qrBottomContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  qrBottomText: {
    color: '#fff',
    fontSize: 15,
  },
});
export default function ReadQR({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const [modalVisible, setModalVisible] = useState(true);
  const [uri, setUri] = useState('https://nicasource.com');

  const listItems = useSelector((state) => state.itemList);

  const dispatch = useDispatch();

  const onSaveNote = (value) => {
    dispatch(addItem(value));
    navigation.navigate('List');
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setModalVisible(true);
    setUri({ uri: data });
    onSaveNote(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.mainContainer}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setScanned(false);
        }}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <View style={{ flex: 1 }}>
            <WebView
              style={styles.container}
              source={{ uri: uri.uri }}
            />
            <TouchableHighlight
              style={styles.scanButton}
              onPress={() => {
                setModalVisible(!modalVisible);
                setScanned(false);
              }}
              underlayColor="slategray"
            >
              {listItems.length !== 0 ? (
                <Text style={styles.scanText}>SAFE URL</Text>
              ) : (
                <Text style={styles.scanText}>SCAN</Text>
              )}
            </TouchableHighlight>
          </View>
        </SafeAreaView>
      </Modal>

      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.scanContainer}
      >
        <View style={styles.barContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.imageStyle}
              source={{ uri: 'http://domain.biz/img/logo_dark.png' }}
            />
            <Text style={styles.qrTopText}>
              QR Code Reader
            </Text>
          </View>
          <View style={styles.qrStyle} />

          <View style={styles.qrBottomContainer}>
            <Text style={styles.qrBottomText}>
              QR Scan...
            </Text>
          </View>
        </View>
      </BarCodeScanner>
    </View>
  );
}

ReadQR.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
