// Import necessary React Native components
import { View, TextInput, FlatList, Pressable, StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import React, { useState, useEffect, useRef, useCallback, useContext, createContext } from 'react';
import axios from 'axios';
import { getAccessToken } from '../components/useAuth';
import BlogItemCard from '../components/BlogItemCard';
import NewBlogItemCard from '../components/NewBlogItemCard';
// import { HOST } from "@env";
const HOST = process.env.HOST;
import Icon from 'react-native-vector-icons/FontAwesome6';
import { MaterialIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";

import { appContext } from '../App'

import { useToast } from "react-native-toast-notifications";

const SEARCH_API_URL = `${HOST}/perenual/plants-details`;

import { ToastProvider } from 'react-native-toast-notifications'

import { useFocusEffect } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const widthFactor = 0.88;
const heightFactor = 0.09;



var blogs1 = [
  {
    "id": "bff11d30-a7e7-49ab-bd38-3bbc921c3836",
    "updatedAt": "2024-05-16T02:13:41.464Z",
    "createdAt": "2024-05-16T02:13:41.464Z",
    "deletedAt": null,
    "title": "Orchids: All About Them!",
    "content": "Hey plant lovers! Let's chat about orchids - those cool, exotic flowers that everyone's talking about. From how to care for them to their wild varieties, let's dive in and share our orchid obsessions!"
  },
  {
    "id": "c173318e-6c39-4a36-96fc-f3c2b2793351",
    "updatedAt": "2024-05-16T02:15:57.571Z",
    "createdAt": "2024-05-16T02:15:57.571Z",
    "deletedAt": null,
    "title": "Succulent Secrets: Share Yours!",
    "content": "Hey succulent fans! Got any tips or tricks for keeping those cute little plants thriving? Let's spill the succulent secrets and help each other out. Whether you're a newbie or a succulent pro, your insights are golden!"
  },
  {
    "id": "d10c695d-08da-41d5-9695-c4dbefba49f0",
    "updatedAt": "2024-05-16T02:16:01.191Z",
    "createdAt": "2024-05-16T02:16:01.191Z",
    "deletedAt": null,
    "title": "Bonsai Bonanza: Let's Talk!",
    "content": "Hey bonsai buddies! Who else is into those tiny trees that pack a big punch? Share your bonsai stories, tips for shaping them just right, or any bonsai blunders you've had. Let's bonsai bonanza!"
  },
  {
    "id": "be0e4c2a-00da-4f95-a4f3-78a63d0c3d90",
    "updatedAt": "2024-05-16T02:16:03.333Z",
    "createdAt": "2024-05-16T02:16:03.333Z",
    "deletedAt": null,
    "title": "Fabulous Ferns: Fern Talk!",
    "content": "Fern fanatics, unite! Whether you're a fan of those leafy green beauties indoors or you're all about creating a lush fern-filled garden, let's chat. Share your favorite fern varieties, care tips, or simply geek out about why ferns are fantastic!"
  },
  {
    "id": "e12e2d17-e239-45d2-8d05-36358987ab75",
    "updatedAt": "2024-05-16T02:16:32.748Z",
    "createdAt": "2024-05-16T02:16:32.748Z",
    "deletedAt": null,
    "title": "Lovely Lavender: Let's Discuss!",
    "content": "Hey lavender lovers! Who else adores the scent of lavender and all its magical uses? Whether you're growing it in your garden or using it for relaxation, let's share our lavender love. From growing tips to DIY lavender goodies, let's dive into all things lavender!"
  },
  {
    "id": "745e395f-e3de-4092-a20c-289a57d74c9d",
    "updatedAt": "2024-05-16T02:36:20.808Z",
    "createdAt": "2024-05-16T02:36:20.808Z",
    "deletedAt": null,
    "title": "Indoor Garden Ideas: Share Yours!",
    "content": "Hey plant pals! Got any cool indoor garden setups or tips for bringing the outdoors in? Whether you're a plant parent with a green thumb or you're just starting, let's swap indoor garden ideas and inspire each other to create lush, green spaces inside our homes!"
  }
]


// function sortBlogsByDate(blogs) {
//   blogs.sort((a, b) => {
//     if (a.createdAt > b.createdAt) {
//       return -1;
//     }
//     if (a.createdAt < b.createdAt) {
//       return 1;
//     }
//     return 0;
//   });
//   return blogs;
// }
function truncateString(str) {
  if (str.length > 150) {
    return str.substring(0, 150) + "...";
  } else {
    return str;
  }
}


function writingModeFocus(scrViewRef, toast) {
  scrViewRef.current?.scrollTo({
    y: 0,
    animated: true,
  });
  toast.show("Writing mode", {
    style: { bottom: 62, },
    animationType: "slide-in",
    swipeEnabled: false,
    duration: 9e20,
  });
}

const BlogsScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [blogsData, setBlogsData] = useState([]);
  const [timer, setTimer] = useState(null);



  const appCxt = useContext(appContext);
  const inWritingMode = appCxt.inWritingMode;
  const setInWritingMode = appCxt.setInWritingMode;
  const showWritingModeIndicator = appCxt.showWritingModeIndicator;
  const setShowWritingModeIndicator = appCxt.setShowWritingModeIndicator;

  const flatListRef = React.useRef();
  const scrViewRef = React.useRef();
  const toast = useToast();

  useEffect(() => {
    const interval = setInterval(() => {

      getAllBlogPosts(1).then(blogs => {
        // console.log(plants);
        setBlogsData(blogs);
      }).catch(error => {
        console.error('Error fetcing blogs:', error);
      });

    }, 60000);

    return () => clearInterval(interval);
  }, [])


  useFocusEffect(
    useCallback(() => {
      // This code runs when the screen is focused
      console.log('BlogsScreen focused');

      getAllBlogPosts(1).then(blogs => {
        // console.log(plants);
        setBlogsData(blogs);
      }).catch(error => {
        console.error('Error fetcing blogs:', error);
      });

      if (inWritingMode === true) {
        setShowWritingModeIndicator(true);
        writingModeFocus(scrViewRef, toast);
        // setPlantsData()
      } else {
        setShowWritingModeIndicator(false);
        toast.hideAll();
      }
      return () => {
        // This code runs when the screen is unfocused (leaving)
        // console.log('BlogsScreen left');
        setShowWritingModeIndicator(false);
        toast.hideAll();
        // Place your cleanup or action here
      };
    }, [])
  );


  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }
    const searchTimer = setTimeout(() => {
      performSearch();
    }, 3000);
    setTimer(searchTimer);
  }, [searchQuery]);

  const performSearch = async () => {
    if (searchQuery.length > 1) {
      console.log("\n\n=======SEARCH======\n");
      console.log("Performing search for:", searchQuery, " ...\n");
      console.log("url:\n", SEARCH_API_URL, "\n");
      try {
        const token = await getAccessToken();
        const response = await axios.get(SEARCH_API_URL, {
          params: { q: searchQuery },
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogsData(response.data.data);
        console.log("Found ", response.data.data.length, "results!\n");
        // console.log(response.data);
        // console.log(response.data.data[0]["default_image"].small_url);
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
      console.log("=============\n\n");
    } else {
      console.log("not performing search because query length not greater than 1..");

    }
  };

  const gridRenderItem = ({ item }) => (
    <BlogItemCard
      itemID={item.id}
      itemName={item.title}
      // itemImageUrl={extractPicURL(item)}
      // itemImageUrl={ 'https://i.postimg.cc/0jyTBx2y/default-Plant-Image.jpg'}
      // itemImageUrl={ item.Plant.default_image.small_url}
      // itemImageUrl={item.default_image.medium_url ? item.default_image.medium_url : 'https://i.postimg.cc/0jyTBx2y/default-Plant-Image.jpg'}
      itemDescription={item.content}
      itemDate={item.createdAt} />
  );

  const NewPostButton = () => {

    return (
      <Pressable
        onPress={() => {
          if (inWritingMode === false) {
            setInWritingMode(true);
            setShowWritingModeIndicator(true);
            writingModeFocus(scrViewRef, toast);

          } else {
            setInWritingMode(false);
            setShowWritingModeIndicator(false);
            toast.hideAll();
          }
          console.log("New Blog:", inWritingMode);
        }
        }
      >
        <View style={styles.newPostButtonStyle} >
          <Icon name={inWritingMode === true ? 'xmark' : 'plus'} size={20} color="white" />
        </View>
      </Pressable>
    );
  };



  return (

    <SafeAreaView style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder="Search blogs"
            onChangeText={(inputString) => setSearchQuery(inputString)}
            underlineColorAndroid="transparent"
          />
          <Icon style={styles.searchIcon} name="magnifying-glass" size={20} color="#666666" />
        </View>


        {inWritingMode == true ?
          <>
            <ScrollView
              ref={scrViewRef}
            >
              <NewBlogItemCard
              />
              <FlatList
                data={blogsData}
                renderItem={gridRenderItem}
                keyExtractor={(item) => item.id}
                numColumns={1}
                ref={flatListRef}
                scrollEnabled={!inWritingMode}
              />
            </ScrollView>
          </>
          :
          <>
            <FlatList
              data={blogsData}
              renderItem={gridRenderItem}
              keyExtractor={(item) => item.id}
              numColumns={1}
              ref={flatListRef}
              scrollEnabled={!inWritingMode}
            />
          </>
        }




        <NewPostButton />
      </View>
    </SafeAreaView>

  );
};

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
    return response.data;
  } catch (error) {
    console.error('Error creating new blog post:', error);
    throw error;
  }
};

const getAllBlogPosts = async (page) => {
  try {
    console.log("attempting to fetch blogs");
    const token = await getAccessToken();
    if (!token) {
      throw new Error('Access token not found');
    }

    const response = await axios.get(`${HOST}/blogs/all-posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: page,
      },
    });
    console.log("blogs fetched!");
    console.log(response.data);
    return response.data.posts;
    
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
};

function extractNameAndDescription(item) {
  let mainName = '';
  let description = '';


  // Determine main name
  if (item.common_name) {
    mainName = item.common_name;
  } else if (item.scientific_name) {
    mainName = item.scientific_name;
  } else {
    mainName = 'Unnamed';
  }

  // Capitalize every word in main name
  mainName = mainName.replace(/\b\w/g, (char) => char.toUpperCase());

  // Determine description
  if (!item.common_name && item.scientific_name) {
    description = item.slug ? `Slug: ${item.slug}` : 'Not available';
  } else if (item.synonyms && item.synonyms.length > 0) {
    description = `${item.synonyms[0]}`;
  } else if (item.slug) {
    description = `Slug: ${item.slug}`;
  } else {
    description = 'Not available';
  }

  // Uppercase first letter in description
  description = description.charAt(0).toUpperCase() + description.slice(1);

  return [mainName, description];
}

// Define styles using StyleSheet
const styles = StyleSheet.create({
  searchSection: {
    width: screenWidth * 0.88,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    // borderWidth: 1,
    // borderColor: 'cyan',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 19,
  },
  searchIcon: {
    padding: 10,
    // borderWidth: 1,
    // borderColor: 'red',
    // width:'10%'
  },
  input: {
    paddingLeft: 10,
    fontSize: 20 * 0.8,
    backgroundColor: 'white',
    height: 40,
    borderRadius: 5,
    // borderWidth: 1,
    // borderColor: 'green',
    width: '88%'
  },
  outerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingHorizontal: 18,
    paddingVertical: 19,

    // borderWidth: 1,
    // borderColor: 'black',
    margin: 3,
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
  buttonContainerStyle: {
    // flex: 200, heree
    // borderWidth: 1,
    // borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separatorContainerStyle: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'red',
    backgroundColor: 'black'
  },
  container: {
    flex: 1,
    // Add any other styles for your screen container here
  },
  indentificationButtonStyle: {
    width: 200,
    height: 200,
    borderRadius: 200 / 20,
    backgroundColor: "#2089DC",
    padding: 20
  },
  scanButtonContentStyle: {
    flexDirection: 'column',
    paddingHorizontal: 5,
  },
  scanButtonTextStyle: {
    color: 'white',
    fontSize: 39.81 * 0.8,
    fontWeight: 'bold',
  },
  newPostButtonStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 50,
    height: 50,
    backgroundColor: 'grey',
    borderRadius: 50,
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

});


export default BlogsScreen;
