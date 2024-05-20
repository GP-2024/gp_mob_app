// Import necessary React Native components
import { View, Image, Dimensions, Alert, Button, Pressable, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Button, Text, Input, CheckBox, LinearGradient } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome6';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import defaultStyles from "../config/styles";
// import LoginScreen from './LoginScreen';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';

import { addPlantToCollection,  } from './auth';
import { getAccessToken } from './useAuth';
const HOST = process.env.HOST;

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const widthFactor = 0.88;
const heightFactor = 0.2;

export const createNewBlogPost = async (title, content) => {
  try {
    const token = await getAccessToken();
    if (!token) {
      throw new Error('Access token not found');
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };

    const data = {
      title: title,
      content: content,
    };

    const response = await axios.post(`${HOST}/blogs/new-post`, data, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating new blog post:', error);
    throw error;
  }
};

// Define the NewBlogItemCard component
const NewBlogItemCard = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogBody, setBlogBody] = useState("");
  function logCurrentTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = Math.round(currentDate.getSeconds()); // Round seconds

    console.log(`Current time: ${hours}:${minutes}:${seconds}`);
  }

  function truncateString(str) {
    if (str.length > 150) {
      return str.substring(0, 150) + "...";
    } else {
      return str;
    }
  }
  return (

    // <Pressable
    //   onPress={() => {
    //     // console.log("Blog:", itemID, "expanded.", expanded);
    //     // setExpanded(!expanded);
    //   }}
    // >

    <View style={styles.card}>

      <View style={styles.cardContent}>

        <View style={styles.cardContentContainer}>
          <TextInput
            style={styles.h4}
            placeholder="Enter blog title"
            onChangeText={(inputString) => setBlogTitle(inputString)}
            underlineColorAndroid="transparent"
          />
          <TextInput
            editable
            multiline
            style={styles.valueStyle}
            placeholder="Write your post!"
            onChangeText={(inputString) => setBlogBody(inputString)}
            underlineColorAndroid="transparent"
          />
          <View style={styles.postButtonContainer}>
            <Pressable
              onPress={() => {
                console.log("Post..");
                if (!blogTitle.trim()) {
                  Alert.alert('', 'Blog title cannot be empty'); return;
                }

                if (!blogBody.trim()) {
                  Alert.alert('', 'Blog body cannot be empty'); return;
                }

                // If both title and body are not empty, create the blog post
                try {
                  createNewBlogPost(blogTitle, blogBody);
                  console.log('Blog post created successfully:');
                } catch (error) {
                  console.error('Error creating blog post:', error);
                }
              }}
            >
              <View style={styles.redSquare} >
                <Text style={(styles.valueStyle, { color: 'white' })} >Post</Text>
              </View>
            </Pressable>
          </View>

        </View>

        <View style={styles.addButtonOuterContainer}>


        </View>




      </View>

    </View>

    // </Pressable>
  );
};

// h1            47.78px     
// h2            39.81px     
// h3            33.18px     
// h4            27.65px     
// h5            23.04px     
// h6            19.2px     
// p            16px     
// small        13.33px     
// smaller        11.11px

// Define styles using StyleSheet
const styles = StyleSheet.create({
  card: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    borderRadius: 200 / 10,
    width: screenWidth * widthFactor,
    // height: screenHeight * heightFactor,
    alignItems: 'flex-start',
    // borderWidth: 2,
    // borderColor: '#505050',
    overflow: 'hidden',
    backgroundColor: '#C9C9C9',
    marginBottom: 30,
    marginRight: 30,
    padding: 12,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  cardContentContainer: {

    width: '100%',
    // borderWidth: 1,
    // borderColor: 'cyan',
  },
  addButtonContainer: {
    backgroundColor: '#4E785A',
    alignSelf: 'center',
    // borderWidth: 1,
    // borderColor: 'black',
    borderRadius: 20,
    padding: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,

  },
  addButtonOuterContainer: {
    width: '20%',
    // height:'100%',
    alignSelf: 'center',
    // borderWidth: 1,
    // borderColor: 'pink',
    // alignContent:'center',
    // alignItems:'center',
    // verticalAlign:'middle',
    paddingBottom: 5,
    paddingTop: 5,
  },
  cardImageStyle: {
    // flex: 0.5,
    width: '20%', height: '100%',
    borderTopLeftRadius: 200 / 10,
    borderBottomLeftRadius: 200 / 10,
  },
  cardContent: {
    // flex: 0.5,
    flexDirection: 'row',
    width: '95%', height: '100%',
    paddingHorizontal: 10,
    paddingBottom: 5,
    paddingTop: 5,


    // borderWidth: 1,
    // borderColor: 'red',

    borderBottomRightRadius: 200 / 10,
    borderBottomLeftRadius: 200 / 10,
    // alignSelf:'flex-start'
  },
  // outerContainer: {
  //   flex: 1,
  //   flexDirection: 'column',
  //   alignItems: 'stretch',
  //   paddingTop: 40,
  //   paddingBottom: 70,
  //   paddingLeft: 30,
  //   paddingRight: 30,

  //   // borderWidth: 1,
  //   // borderColor: 'red',
  //   // margin: 3,
  // },
  topBanner: {
    flex: 3.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,

    // borderWidth: 1,
    // borderColor: 'red',
    // margin: 3,
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
  secondaryTitleContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingBottom: 10

    // borderWidth: 1,
    // borderColor: 'red',
    // margin: 3,
  },
  inputContainer: {
    flex: 1,
    alignItems: 'stretch',
    paddingBottom: 10,



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
    marginBottom: 5,
    marginTop: 10,

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
    paddingBottom: 0,
    // borderWidth: 1,
    // borderColor: 'red',
    margin: 3,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  h3: {
    fontSize: 33.18 * 0.8,
    fontWeight: 'bold',
  },
  h4: {
    fontSize: 27.65 * 0.8,
    fontWeight: 'bold',
    paddingBottom: 7,
  },
  h5: {
    fontSize: 23.04 * 0.8,
    fontWeight: 'bold',
  },
  h6: {
    fontSize: 19.2 * 0.8,
    fontWeight: 'bold',
    paddingBottom: 3.5,
  },
  p: {
    fontSize: 17.5 * 0.8,
  },
  valueStyle: {
    fontSize: 17,
    fontWeight: 'normal',
  },
  input: {
    paddingLeft: 10,
    fontSize: 20 * 0.8,
    backgroundColor: 'white',
    height: 40,
    borderRadius: 5,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  TOSButtonText: {
    textDecorationLine: 'underline',
    color: '#2089DC',
    fontWeight: 'bold',
    // borderWidth: 1,
    // borderColor: 'red',
    // margin: 3,
  },
  TOSButton: {
    marginLeft: 4,
    // borderWidth: 1,
    // borderColor: 'red',
    // margin: 3,
  },
  redSquare: {
    width: 90,
    height: 40,
    backgroundColor: 'grey',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  postButtonContainer: {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }

});

// Export the component
export default NewBlogItemCard;