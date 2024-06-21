import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Dimensions, Modal, Image, TouchableOpacity, Button, Alert, ImageBackground, ScrollView, Pressable, LogBox, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import Icon from "react-native-vector-icons/FontAwesome6";
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
const HOST = process.env.HOST;

const screenWidth = Dimensions.get("window").width;

const pfpSideLength = screenWidth / 4.3;

LogBox.ignoreLogs(['TextInputComponent: Support for defaultProps will be removed']);

const CompleteProfileScreen = ({ loginFunction,
  loginResponse,
  modalSetter }
) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [dateStampOfBirth, setDate] = useState(dayjs());
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [dateHasBeenSet, setDateHasBeenSet] = useState(false);

  const [loading, setLoading] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const closeModal = () => {
    modalSetter(false);
  };

  const onChange = (selectedDate) => {
    const currentDate = selectedDate['date'];
    setShow(false);
    setDate(currentDate);
    setDateHasBeenSet(true);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.3,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!profilePicture || !firstName || !lastName || !gender || !dateStampOfBirth || !country) {
      setError('All fields, and a profile picture are required.');
      return;
    }

    setLoading(true);

    const timeout = setTimeout(() => {
      if (loading) {
        setLoading(false);
        Alert.alert('', 'Operation timed out. Please try again.');
      }
    }, 60000);

    setTimeoutId(timeout);

    const token = loginResponse.data.tokens.access_token;

    try {

      const formData = new FormData();
      formData.append('file', {
        uri: profilePicture,
        name: 'profile.jpg',
        type: 'image/jpeg',
      });

      console.log("pfp uri: ");
      console.log(profilePicture);
      const imageResponse = await axios.post(`${HOST}/auth/local/signup/dp`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });


      if (imageResponse.data.message === 'Profile picture successfully uploaded') {
        let dateOfBirth = dateStampOfBirth.format();
        const profileData = {
          firstName,
          lastName,
          gender,
          dateOfBirth,
          country,
        };

        const profileResponse = await axios.put(`${HOST}/auth/local/updateProfile`, profileData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (profileResponse.data.message === 'Profile data successfully updated') {
          clearTimeout(timeoutId);
          setLoading(false);
          console.log('Profile Updated!');
          Alert.alert('', `Your have completed your profile! Logging you in.`);
          loginFunction(loginResponse.data.tokens.access_token,
            loginResponse.data.tokens.refresh_token);
        } else {
          clearTimeout(timeoutId);
          setLoading(false);
          Alert.alert('', `Failed to update profile data: ${profileResponse.data.message}`);
          console.log('Failed to update profile data:', profileResponse.data);
        }
      } else {
        console.log('Failed to upload profile picture:', imageResponse.data);
        clearTimeout(timeoutId);
        setLoading(false);
        Alert.alert('', `Failed to upload profile picture: ${imageResponse.data.message}`);
      }
    } catch (error) {
      console.log('Error:', error);
      clearTimeout(timeoutId);
      setLoading(false);
      Alert.alert('', `Error: ${error.message}`);
    }
  };

  return (

    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground source={require('../assets/wavyBackground.png')} style={styles.background}>
        <View style={styles.topView}></View>

        <View style={styles.bottomView}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }} ></View>
            <View style={{ flex: 1, flexDirection: 'column', marginBottom: 0 }}>
              <Text style={styles.heading}>Complete Your Profile</Text>
            </View>
          </View>
          <Text style={styles.normalText}>You are just one step closer!</Text>
          <View style={styles.imageContainer}>
            <Image source={{ uri: profilePicture || 'https://i.postimg.cc/05VCCrw1/pfp-Vector.png' }} style={styles.profileImage} />
            <TouchableOpacity style={styles.editButton} onPress={handleImagePick}>
              <Icon padding={1} name="pen-to-square" size={15} color="white" solid />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            placeholderTextColor={'#6EB883'}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            placeholderTextColor={'#6EB883'}
          />
          <View
            style={styles.input}
          >
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}

              data={[
                { label: 'Male', value: 'MALE' },
                { label: 'Female', value: 'FEMALE' },
              ]}
              // search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={'Gender'}
              searchPlaceholder="Select item"
              value={gender}
              onChange={item => {
                setGender(item.value);
              }}
            />
          </View>
          <View
            style={styles.input}
          >
            <Pressable
              onPress={() => {
                console.log('dateTime!');
                showDatepicker();
              }}
            >
              <Text
                style={[styles.dateOfBirthPlaceholderStyle,
                { color: dateHasBeenSet ? 'green' : '#6EB883' }]}>
                {dateHasBeenSet ? dateStampOfBirth.format('LL') : "Date of birth"}
              </Text>
            </Pressable>
          </View>
          <View
            style={styles.input}
          >
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}

              data={countryDictList}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={'Country'}
              searchPlaceholder="Select country"
              value={country}
              onChange={item => {
                setCountry(item.value);
              }}
              // dropdownPosition={'top'}
              mode='modal'
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={{ marginTop: 20, alignItems: 'center' }}>
            <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      {show && (
        <Pressable style={styles.overlay}
          onPress={() => {
            console.log("Close date picker!");
            setShow(false);
          }}
        >
          <Pressable style={
            {
              width: "70%",
              backgroundColor: 'white',
              padding: 10,
              paddingBottom: 15,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
            }}
            onPress={() => {
              console.log("Do not close date picker!");
            }}
          >
            <DateTimePicker
              mode="single"
              date={dateStampOfBirth}
              onChange={(params) => {
                onChange(params);
              }}
              todayContainerStyle={{ borderWidth: 0 }}
              todayTextStyle={{ color: "black" }}
              calendarTextStyle={{ color: 'black' }}
              displayFullDays={true}
              selectedItemColor={"green"}
              headerTextStyle={{ fontWeight: 'bold', fontSize: 20 }}
              headerButtonsPosition={'right'}
              headerButtonColor={'black'}
              headerButtonSize={20}

            />
          </Pressable>
        </Pressable>
      )}
      {loading && (
        <View style={styles.loadingContainer}>
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="green" />
          </View>
        </View>
      )}
      <TouchableOpacity style={styles.floatingButton}
        onPress={() => { closeModal() }}>
        <Icon name="chevron-left" size={20} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'contain',
  },
  container: {
    width: '100%',
    minHeight: '100%',
    justifyContent: 'center',

  },
  topView: {
    width: '100%',
    height: '20%'
  },
  dropdown: {
    height: 25,
    // borderColor: 'gray',
    // borderWidth: 0.5,
    // borderRadius: 8,
    // paddingHorizontal: 8,
    // color:'#6EB883'

  },
  bottomView: {
    width: '100%',
    height: '80%',
    padding: 40,
    backgroundColor: 'transparent',
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,

    // borderWidth: 1,
    // borderColor: 'red',
  },
  picker: {
    color: '#6EB883',
    fontSize: 17,
  },
  normalText: {
    fontSize: 16,
    textAlign: 'right',
    marginBottom: 30,
    color: 'green'
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 10,
    color: 'green'
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: pfpSideLength,
    height: pfpSideLength,
    borderRadius: 50,
    // borderColor: 'white',
    // borderWidth: 2,
  },
  editButton: {
    position: 'absolute',
    bottom: 6,
    right: screenWidth / 2 - (pfpSideLength * 0.9),
    backgroundColor: 'green',
    borderRadius: 15,
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
  input: {
    borderBottomWidth: 2.5,
    borderBottomColor: '#98DCB0',
    marginBottom: 20,
    fontSize: 17,
    paddingBottom: 2,
    color: "green",
  },
  pickerItem: {
    fontSize: 17,
  },
  confirmButton: {
    backgroundColor: 'green',
    padding: 10,
    paddingVertical: 12,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth * 0.4,

  },
  confirmButtonText: {
    color: 'white',
    fontSize: 17,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  inputSearchStyle: {
    // height: 40,
    fontSize: 17,
    // color: '#6EB883'
  },
  placeholderStyle: {
    fontSize: 17,
    color: '#6EB883'
  },
  dateOfBirthPlaceholderStyle: {
    fontSize: 17,
  },
  selectedTextStyle: {
    fontSize: 17,
    color: "green",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  loadingBox: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default CompleteProfileScreen;


const countryDictList = [{ label: 'Afghanistan', value: 'Afghanistan' }, { label: 'Albania', value: 'Albania' }, { label: 'Algeria', value: 'Algeria' }, { label: 'American Samoa', value: 'American Samoa' }, { label: 'Andorra', value: 'Andorra' }, { label: 'Angola', value: 'Angola' }, { label: 'Anguilla', value: 'Anguilla' }, { label: 'Antarctica', value: 'Antarctica' }, { label: 'Antigua and Barbuda', value: 'Antigua and Barbuda' }, { label: 'Argentina', value: 'Argentina' }, { label: 'Armenia', value: 'Armenia' }, { label: 'Aruba', value: 'Aruba' }, { label: 'Australia', value: 'Australia' }, { label: 'Austria', value: 'Austria' }, { label: 'Azerbaijan', value: 'Azerbaijan' }, { label: 'Bahamas (the)', value: 'Bahamas (the)' }, { label: 'Bahrain', value: 'Bahrain' }, { label: 'Bangladesh', value: 'Bangladesh' }, { label: 'Barbados', value: 'Barbados' }, { label: 'Belarus', value: 'Belarus' }, { label: 'Belgium', value: 'Belgium' }, { label: 'Belize', value: 'Belize' }, { label: 'Benin', value: 'Benin' }, { label: 'Bermuda', value: 'Bermuda' }, { label: 'Bhutan', value: 'Bhutan' }, { label: 'Bolivia (Plurinational State of)', value: 'Bolivia (Plurinational State of)' }, { label: 'Bonaire, Sint Eustatius and Saba', value: 'Bonaire, Sint Eustatius and Saba' }, { label: 'Bosnia and Herzegovina', value: 'Bosnia and Herzegovina' }, { label: 'Botswana', value: 'Botswana' }, { label: 'Bouvet Island', value: 'Bouvet Island' }, { label: 'Brazil', value: 'Brazil' }, { label: 'British Indian Ocean Territory (the)', value: 'British Indian Ocean Territory (the)' }, { label: 'Brunei Darussalam', value: 'Brunei Darussalam' }, { label: 'Bulgaria', value: 'Bulgaria' }, { label: 'Burkina Faso', value: 'Burkina Faso' }, { label: 'Burundi', value: 'Burundi' }, { label: 'Cabo Verde', value: 'Cabo Verde' }, { label: 'Cambodia', value: 'Cambodia' }, { label: 'Cameroon', value: 'Cameroon' }, { label: 'Canada', value: 'Canada' }, { label: 'Cayman Islands (the)', value: 'Cayman Islands (the)' }, { label: 'Central African Republic (the)', value: 'Central African Republic (the)' }, { label: 'Chad', value: 'Chad' }, { label: 'Chile', value: 'Chile' }, { label: 'China', value: 'China' }, { label: 'Christmas Island', value: 'Christmas Island' }, { label: 'Cocos (Keeling) Islands (the)', value: 'Cocos (Keeling) Islands (the)' }, { label: 'Colombia', value: 'Colombia' }, { label: 'Comoros (the)', value: 'Comoros (the)' }, { label: 'Congo (the Democratic Republic of the)', value: 'Congo (the Democratic Republic of the)' }, { label: 'Congo (the)', value: 'Congo (the)' }, { label: 'Cook Islands (the)', value: 'Cook Islands (the)' }, { label: 'Costa Rica', value: 'Costa Rica' }, { label: 'Croatia', value: 'Croatia' }, { label: 'Cuba', value: 'Cuba' }, { label: 'Curaçao', value: 'Curaçao' }, { label: 'Cyprus', value: 'Cyprus' }, { label: 'Czechia', value: 'Czechia' }, { label: "Côte d'Ivoire", value: "Côte d'Ivoire" }, { label: 'Denmark', value: 'Denmark' }, { label: 'Djibouti', value: 'Djibouti' }, { label: 'Dominica', value: 'Dominica' }, { label: 'Dominican Republic (the)', value: 'Dominican Republic (the)' }, { label: 'Ecuador', value: 'Ecuador' }, { label: 'Egypt', value: 'Egypt' }, { label: 'El Salvador', value: 'El Salvador' }, { label: 'Equatorial Guinea', value: 'Equatorial Guinea' }, { label: 'Eritrea', value: 'Eritrea' }, { label: 'Estonia', value: 'Estonia' }, { label: 'Eswatini', value: 'Eswatini' }, { label: 'Ethiopia', value: 'Ethiopia' }, { label: 'Falkland Islands (the) [Malvinas]', value: 'Falkland Islands (the) [Malvinas]' }, { label: 'Faroe Islands (the)', value: 'Faroe Islands (the)' }, { label: 'Fiji', value: 'Fiji' }, { label: 'Finland', value: 'Finland' }, { label: 'France', value: 'France' }, { label: 'French Guiana', value: 'French Guiana' }, { label: 'French Polynesia', value: 'French Polynesia' }, { label: 'French Southern Territories (the)', value: 'French Southern Territories (the)' }, { label: 'Gabon', value: 'Gabon' }, { label: 'Gambia (the)', value: 'Gambia (the)' }, { label: 'Georgia', value: 'Georgia' }, { label: 'Germany', value: 'Germany' }, { label: 'Ghana', value: 'Ghana' }, { label: 'Gibraltar', value: 'Gibraltar' }, { label: 'Greece', value: 'Greece' }, { label: 'Greenland', value: 'Greenland' }, { label: 'Grenada', value: 'Grenada' }, { label: 'Guadeloupe', value: 'Guadeloupe' }, { label: 'Guam', value: 'Guam' }, { label: 'Guatemala', value: 'Guatemala' }, { label: 'Guernsey', value: 'Guernsey' }, { label: 'Guinea', value: 'Guinea' }, { label: 'Guinea-Bissau', value: 'Guinea-Bissau' }, { label: 'Guyana', value: 'Guyana' }, { label: 'Haiti', value: 'Haiti' }, { label: 'Heard Island and McDonald Islands', value: 'Heard Island and McDonald Islands' }, { label: 'Holy See (the)', value: 'Holy See (the)' }, { label: 'Honduras', value: 'Honduras' }, { label: 'Hong Kong', value: 'Hong Kong' }, { label: 'Hungary', value: 'Hungary' }, { label: 'Iceland', value: 'Iceland' }, { label: 'India', value: 'India' }, { label: 'Indonesia', value: 'Indonesia' }, { label: 'Iran (Islamic Republic of)', value: 'Iran (Islamic Republic of)' }, { label: 'Iraq', value: 'Iraq' }, { label: 'Ireland', value: 'Ireland' }, { label: 'Isle of Man', value: 'Isle of Man' }, { label: 'Israel', value: 'Israel' }, { label: 'Italy', value: 'Italy' }, { label: 'Jamaica', value: 'Jamaica' }, { label: 'Japan', value: 'Japan' }, { label: 'Jersey', value: 'Jersey' }, { label: 'Jordan', value: 'Jordan' }, { label: 'Kazakhstan', value: 'Kazakhstan' }, { label: 'Kenya', value: 'Kenya' }, { label: 'Kiribati', value: 'Kiribati' }, { label: "Korea (the Democratic People's Republic of)", value: "Korea (the Democratic People's Republic of)" }, { label: 'Korea (the Republic of)', value: 'Korea (the Republic of)' }, { label: 'Kuwait', value: 'Kuwait' }, { label: 'Kyrgyzstan', value: 'Kyrgyzstan' }, { label: "Lao People's Democratic Republic (the)", value: "Lao People's Democratic Republic (the)" }, { label: 'Latvia', value: 'Latvia' }, { label: 'Lebanon', value: 'Lebanon' }, { label: 'Lesotho', value: 'Lesotho' }, { label: 'Liberia', value: 'Liberia' }, { label: 'Libya', value: 'Libya' }, { label: 'Liechtenstein', value: 'Liechtenstein' }, { label: 'Lithuania', value: 'Lithuania' }, { label: 'Luxembourg', value: 'Luxembourg' }, { label: 'Macao', value: 'Macao' }, { label: 'Madagascar', value: 'Madagascar' }, { label: 'Malawi', value: 'Malawi' }, { label: 'Malaysia', value: 'Malaysia' }, { label: 'Maldives', value: 'Maldives' }, { label: 'Mali', value: 'Mali' }, { label: 'Malta', value: 'Malta' }, { label: 'Marshall Islands (the)', value: 'Marshall Islands (the)' }, { label: 'Martinique', value: 'Martinique' }, { label: 'Mauritania', value: 'Mauritania' }, { label: 'Mauritius', value: 'Mauritius' }, { label: 'Mayotte', value: 'Mayotte' }, { label: 'Mexico', value: 'Mexico' }, { label: 'Micronesia (Federated States of)', value: 'Micronesia (Federated States of)' }, { label: 'Moldova (the Republic of)', value: 'Moldova (the Republic of)' }, { label: 'Monaco', value: 'Monaco' }, { label: 'Mongolia', value: 'Mongolia' }, { label: 'Montenegro', value: 'Montenegro' }, { label: 'Montserrat', value: 'Montserrat' }, { label: 'Morocco', value: 'Morocco' }, { label: 'Mozambique', value: 'Mozambique' }, { label: 'Myanmar', value: 'Myanmar' }, { label: 'Namibia', value: 'Namibia' }, { label: 'Nauru', value: 'Nauru' }, { label: 'Nepal', value: 'Nepal' }, { label: 'Netherlands (the)', value: 'Netherlands (the)' }, { label: 'New Caledonia', value: 'New Caledonia' }, { label: 'New Zealand', value: 'New Zealand' }, { label: 'Nicaragua', value: 'Nicaragua' }, { label: 'Niger (the)', value: 'Niger (the)' }, { label: 'Nigeria', value: 'Nigeria' }, { label: 'Niue', value: 'Niue' }, { label: 'Norfolk Island', value: 'Norfolk Island' }, { label: 'Northern Mariana Islands (the)', value: 'Northern Mariana Islands (the)' }, { label: 'Norway', value: 'Norway' }, { label: 'Oman', value: 'Oman' }, { label: 'Pakistan', value: 'Pakistan' }, { label: 'Palau', value: 'Palau' }, { label: 'Palestine, State of', value: 'Palestine, State of' }, { label: 'Panama', value: 'Panama' }, { label: 'Papua New Guinea', value: 'Papua New Guinea' }, { label: 'Paraguay', value: 'Paraguay' }, { label: 'Peru', value: 'Peru' }, { label: 'Philippines (the)', value: 'Philippines (the)' }, { label: 'Pitcairn', value: 'Pitcairn' }, { label: 'Poland', value: 'Poland' }, { label: 'Portugal', value: 'Portugal' }, { label: 'Puerto Rico', value: 'Puerto Rico' }, { label: 'Qatar', value: 'Qatar' }, { label: 'Republic of North Macedonia', value: 'Republic of North Macedonia' }, { label: 'Romania', value: 'Romania' }, { label: 'Russian Federation (the)', value: 'Russian Federation (the)' }, { label: 'Rwanda', value: 'Rwanda' }, { label: 'Réunion', value: 'Réunion' }, { label: 'Saint Barthélemy', value: 'Saint Barthélemy' }, { label: 'Saint Helena, Ascension and Tristan da Cunha', value: 'Saint Helena, Ascension and Tristan da Cunha' }, { label: 'Saint Kitts and Nevis', value: 'Saint Kitts and Nevis' }, { label: 'Saint Lucia', value: 'Saint Lucia' }, { label: 'Saint Martin (French part)', value: 'Saint Martin (French part)' }, { label: 'Saint Pierre and Miquelon', value: 'Saint Pierre and Miquelon' }, { label: 'Saint Vincent and the Grenadines', value: 'Saint Vincent and the Grenadines' }, { label: 'Samoa', value: 'Samoa' }, { label: 'San Marino', value: 'San Marino' }, { label: 'Sao Tome and Principe', value: 'Sao Tome and Principe' }, { label: 'Saudi Arabia', value: 'Saudi Arabia' }, { label: 'Senegal', value: 'Senegal' }, { label: 'Serbia', value: 'Serbia' }, { label: 'Seychelles', value: 'Seychelles' }, { label: 'Sierra Leone', value: 'Sierra Leone' }, { label: 'Singapore', value: 'Singapore' }, { label: 'Sint Maarten (Dutch part)', value: 'Sint Maarten (Dutch part)' }, { label: 'Slovakia', value: 'Slovakia' }, { label: 'Slovenia', value: 'Slovenia' }, { label: 'Solomon Islands', value: 'Solomon Islands' }, { label: 'Somalia', value: 'Somalia' }, { label: 'South Africa', value: 'South Africa' }, { label: 'South Georgia and the South Sandwich Islands', value: 'South Georgia and the South Sandwich Islands' }, { label: 'South Sudan', value: 'South Sudan' }, { label: 'Spain', value: 'Spain' }, { label: 'Sri Lanka', value: 'Sri Lanka' }, { label: 'Sudan (the)', value: 'Sudan (the)' }, { label: 'Suriname', value: 'Suriname' }, { label: 'Svalbard and Jan Mayen', value: 'Svalbard and Jan Mayen' }, { label: 'Sweden', value: 'Sweden' }, { label: 'Switzerland', value: 'Switzerland' }, { label: 'Syrian Arab Republic', value: 'Syrian Arab Republic' }, { label: 'Taiwan', value: 'Taiwan' }, { label: 'Tajikistan', value: 'Tajikistan' }, { label: 'Tanzania, United Republic of', value: 'Tanzania, United Republic of' }, { label: 'Thailand', value: 'Thailand' }, { label: 'Timor-Leste', value: 'Timor-Leste' }, { label: 'Togo', value: 'Togo' }, { label: 'Tokelau', value: 'Tokelau' }, { label: 'Tonga', value: 'Tonga' }, { label: 'Trinidad and Tobago', value: 'Trinidad and Tobago' }, { label: 'Tunisia', value: 'Tunisia' }, { label: 'Turkey', value: 'Turkey' }, { label: 'Turkmenistan', value: 'Turkmenistan' }, { label: 'Turks and Caicos Islands (the)', value: 'Turks and Caicos Islands (the)' }, { label: 'Tuvalu', value: 'Tuvalu' }, { label: 'Uganda', value: 'Uganda' }, { label: 'Ukraine', value: 'Ukraine' }, { label: 'United Arab Emirates (the)', value: 'United Arab Emirates (the)' }, { label: 'United Kingdom of Great Britain and Northern Ireland (the)', value: 'United Kingdom of Great Britain and Northern Ireland (the)' }, { label: 'United States Minor Outlying Islands (the)', value: 'United States Minor Outlying Islands (the)' }, { label: 'United States of America (the)', value: 'United States of America (the)' }, { label: 'Uruguay', value: 'Uruguay' }, { label: 'Uzbekistan', value: 'Uzbekistan' }, { label: 'Vanuatu', value: 'Vanuatu' }, { label: 'Venezuela (Bolivarian Republic of)', value: 'Venezuela (Bolivarian Republic of)' }, { label: 'Viet Nam', value: 'Viet Nam' }, { label: 'Virgin Islands (British)', value: 'Virgin Islands (British)' }, { label: 'Virgin Islands (U.S.)', value: 'Virgin Islands (U.S.)' }, { label: 'Wallis and Futuna', value: 'Wallis and Futuna' }, { label: 'Western Sahara', value: 'Western Sahara' }, { label: 'Yemen', value: 'Yemen' }, { label: 'Zambia', value: 'Zambia' }, { label: 'Zimbabwe', value: 'Zimbabwe' }, { label: 'Åland Islands', value: 'Åland Islands' }];
