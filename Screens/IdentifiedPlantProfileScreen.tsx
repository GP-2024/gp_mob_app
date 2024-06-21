// Import necessary React Native components
import {
  Image,
  Alert,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Button,
  Text,
  Pressable,
  Dimensions,
  Modal
} from 'react-native';
const { height, width } = Dimensions.get('window');
import React, { useState, useEffect, useCallback } from 'react';
import type { PropsWithChildren } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import defaultStyles from "../config/styles";
import useAuth, { getAccessToken } from '../components/useAuth';
import PlantCharacteristicsViewer from '../components/PlantCharacteristicsViewer';
import { WebView } from 'react-native-webview';
const HOST = process.env.HOST;


// Define the IdentifiedPlantProfileScreen component
const IdentifiedPlantProfileScreen = ({ plantID, commonName, SciName, longDescription, imageURL, wikiToPlant, modalSetter }) => {
  const { login, logout } = useAuth();
  const [showWebView, setShowWebView] = React.useState(false);
  // const [plantDetails, setPlantDetails] = useState({});

  const closeModal = () => {
    modalSetter(false);
  };

  return (
    <SafeAreaView style={styles.outerContainer} >

      <View style={styles.outerContainer}>

        <View style={styles.upperBlock}>
          <Image style={styles.imageStyle}
            source={{
              uri: imageURL
                ? imageURL
                : "https://i.postimg.cc/L5jFhgjy/Static-Plant-Image-Portable.jpg"
            }}
          />
        </View>

        <View style={styles.bottomBlock}>

        </View>

      </View>


      <View style={styles.floatingRectangle}>
        <View style={{
          flex: 89,
          // borderWidth: 1,
          // borderColor: 'red',

        }}>


          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            // borderWidth: 1,
            // borderColor: 'red',
            paddingHorizontal: 30,
            paddingVertical: 11,
          }}>
            <View style={styles.plantTitleContainer}>
              <Text style={styles.h3}>{commonName}</Text>
            </View>
          </View>


          <View style={{
            alignItems: 'flex-start',
            justifyContent: 'center',
            // borderWidth: 1,
            // borderColor: 'cyan',
            paddingHorizontal: 30,
            paddingVertical: 7,

          }}>


            <View style={{height:'10%'}}>
            <PlantCharacteristicsViewer characteristics={{ "Scientific Name": SciName }} fontSizeProp={15} />
            </View>
            <View style={[styles.plantTitleContainer, { marginTop: 7 }]}>
              <Icon name={'pen'} size={20} color="black" />
              <Text style={styles.h4}>Description</Text>
            </View>
            <ScrollView style={{
              // borderWidth: 1,
              // borderColor: 'red',
              height: "70%"
            }}>
              <Text style={{
                fontSize: 17, marginTop: 5,
                height: '100%'
              }}>{longDescription}</Text>
            </ScrollView>
          </View>

        </View>


        
        <View style={{
          flex: 11, alignItems: 'center',
          justifyContent: 'flex-start',
          paddingHorizontal: 30,
        }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowWebView(true)}
          >
            <Text style={styles.buttonText}>Look up This Plant Online</Text>
            <Icon name="up-right-from-square" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.floatingButton}
        onPress={() => { closeModal() }}>
        <Icon name="chevron-left" size={20} color="#fff" />
      </TouchableOpacity>
      {showWebView && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={showWebView}
          onRequestClose={() => setShowWebView(false)}
        >
          <WebView source={{ uri: wikiToPlant }} style={styles.webView} />
          <TouchableOpacity style={styles.closeButton} onPress={() => setShowWebView(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </Modal>
      )}
    </SafeAreaView>
  );
};

// Define styles using StyleSheet
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',

    // borderWidth: 1,
    // borderColor: 'red',
    // margin: 3,
  },
  topBanner: {
    flex: 3.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,

    // borderWidth: 1,
    // borderColor: 'red',
    // margin: 3,
  },
  plantTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
  },

  topTitleContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingBottom: 10

    // borderWidth: 1,
    // borderColor: 'red',
    // margin: 3,
  },
  floatingRectangle: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: height * 0.68,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: '100%'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
  },
  secondaryTitleContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingBottom: 5

    // borderWidth: 1,
    // borderColor: 'red',
    // margin: 3,
  },
  inputContainer: {
    flex: 1,
    alignItems: 'stretch',



    // borderWidth: 1,
    // borderColor: 'red',
    // margin: 3,
  },
  sideButtonContainer: {
    flex: 0.5,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',

    // borderWidth: 1,
    // borderColor: 'red',
    // margin: 3,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',

    // borderWidth: 1,
    // borderColor: 'red',
    // margin: 3,
  },
  horizContainer: {
    flex: 0.6,
    flexDirection: 'row',
    alignItems: 'stretch',

    // borderWidth: 1,
    // borderColor: 'red',
    // margin: 3,
  },
  centerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    // borderWidth: 1,
    // borderColor: 'red',
    // margin: 3,
  },
  agreementContainer: {
    flexDirection: 'row',
    paddingBottom: 10
  },
  upperBlock: {
    flex: 1.05,
    backgroundColor: defaultStyles.colors.primary,
    // borderWidth: 1,
    // borderColor: 'red',
    // margin: 3,
  },
  bottomBlock: {
    flex: 2,
    // borderTopLeftRadius: 15,
    // borderWidth: 1,
    // borderColor: 'red',
    // margin: 3,
  },
  floatingContainerStyle: {
    width: '85%',
    height: '95%',
    position: 'absolute',
    // borderWidth: 3,
    // borderColor: 'green',
    // margin: 10,
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  upperStrip: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  logoutButtonStyle: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 7,
    backgroundColor: 'transparent',
  },
  pfpContainerStyle: {
    // borderWidth: 3,
    // borderColor: 'green',
    alignItems: 'center',
    paddingBottom: 15,
  },
  imageStyle: {
    width: "100%", height: "100%",
    // borderWidth: 7,
    // borderColor: 'white',
  },
  nameContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  nameEditButtonStyle: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
  },
  bioContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 35
  },
  bioEditButtonStyle: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
  },
  labelStyle: {
    fontSize: 17
  },
  valueStyle: {
    fontSize: 17,
    fontWeight: 'normal'
  },
  labelValueStyle: {
    paddingBottom: 30
  },
  valueContainerStyle: {
    flexDirection: 'row',
  },
  h3: {
    fontSize: 33.18 * 0.8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  h4: {
    paddingLeft: 10,
    fontSize: 30 * 0.8,
    fontWeight: 'bold',
  },
  p: {
    fontSize: 20 * 0.8,
  },
  logoutButtonTextStyle: {
    color: 'white'
  },
  floatingButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    backgroundColor: 'black',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // for shadow on Android
    shadowColor: '#000', // for shadow on iOS
    shadowOffset: { width: 0, height: 2 }, // for shadow on iOS
    shadowOpacity: 0.8, // for shadow on iOS
    shadowRadius: 2, // for shadow on iOS
    opacity: 0.7,
  },
  webView: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#000',
    borderRadius: 30,
    padding: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },

});

// h1            47.78px     
// h2            39.81px     
// h3            33.18px     
// h4            27.65px     
// h5            23.04px     
// h6            19.2px     
// p            16px     
// small        13.33px     
// smaller        11.11px

// Export the component
export default IdentifiedPlantProfileScreen;
