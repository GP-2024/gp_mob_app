// Import necessary React Native components
import { View, TextInput, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAccessToken } from '../components/auth';
import SearchItemCard from '../components/SearchItemCard';
import { HOST } from "@env";

const SEARCH_API_URL = `${HOST}/trefle/search`;

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

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [plantsData, setPlantsData] = useState([]);
  const [timer, setTimer] = useState(null);

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
      try {
        const token = await getAccessToken();
        const response = await axios.get(SEARCH_API_URL, {
          params: { q: searchQuery },
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlantsData(response.data.data);
        console.log("Found ", response.data.data.length, " results!\n");
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
      console.log("=============\n\n");
    }else{
      console.log("not performing search because query length not greater than 1..");
      setPlantsData([]);
    }
  };

  const gridRenderItem = ({ item }) => (
    <SearchItemCard
      itemName={extractNameAndDescription(item)[0]}
      itemImageUrl={item.image_url ? item.image_url : 'https://i.postimg.cc/0jyTBx2y/default-Plant-Image.jpg'}
      itemDescription={extractNameAndDescription(item)[1]} />
  );

  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          placeholder="Search for a plant"
          onChangeText={(inputString) => setSearchQuery(inputString)}
          underlineColorAndroid="transparent"
        />
      </View>
      <FlatList
        data={plantsData}
        renderItem={gridRenderItem}
        keyExtractor={(item) => item.id}
        numColumns={1}
      />
    </SafeAreaView>
  );
};

// Define styles using StyleSheet
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 19,
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 19,
  },
  input: {
    paddingLeft: 10,
    fontSize: 20 * 0.8,
    backgroundColor: 'white',
    height: 40,
    borderRadius: 5,
    width: '88%',
  },
});

export default SearchScreen;
