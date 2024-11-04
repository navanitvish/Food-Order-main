import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ScrollView,
} from 'react-native';
import { colors, globalStyles, typography } from '../../styles/globalStyles';
import Header from '../../components/common/Header';
import SearchBar from '../../components/Searchbar';
import MessageList from '../../components/MessageItem';


const messages = [
    { id: '1', name: 'David Wayne', message: 'Thanks a bunch! Have a great day! 😊', time: '10:25', avatar: require('../../assets/images/bottom/Avatar.png') },
    { id: '2', name: 'Edward Davidson', message: 'Great, thanks so much! 🍕', time: '22:20 09/05/2024', avatar: require('../../assets/images/bottom/Avatar.png') },
    { id: '3', name: 'Angela Kelly', message: 'Appreciate it! See you soon! 📌', time: '10:45 08/05/2024', avatar: require('../../assets/images/bottom/Avatar.png') },
    { id: '4', name: 'Jean Dare', message: 'Hooray! 🎉', time: '20:10 05/05/2024', avatar: require('../../assets/images/bottom/Avatar.png') },
    { id: '5', name: 'Dennis Borer', message: 'Your order has been successfully delivered', time: '17:02 05/05/2024', avatar: require('../../assets/images/bottom/Avatar.png') },
    { id: '6', name: 'Cayla Rath', message: 'See you soon!', time: '11:20 05/05/2024', avatar: require('../../assets/images/bottom/Avatar.png') },
    { id: '7', name: 'Erin Turcotte', message: "I'm ready to drop off your delivery. 👍", time: '19:35 02/05/2024', avatar: require('../../assets/images/bottom/Avatar.png') },
    { id: '8', name: 'Rodolfo Walter', message: 'Appreciate it! Hope you enjoy it!', time: '07:55 01/05/2024', avatar: require('../../assets/images/bottom/Avatar.png') },
  ];

const MessagesScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header title='Messages' showMoreIcon/>

        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          onFilterPress={() => {/* Implement filter functionality */}}
        />
         <View style={{ flex: 1 }}>
      <MessageList messages={messages} />
    </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  title: {
    ...globalStyles.title,
    flex: 1,
    textAlign: 'center',
    marginRight: 34,
  },
  favoriteList: {
    padding: 10,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontFamily: typography.regular,
    fontSize: 18,
    color: colors.darkGray,
  },
  offersList: {
    paddingHorizontal: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default MessagesScreen;