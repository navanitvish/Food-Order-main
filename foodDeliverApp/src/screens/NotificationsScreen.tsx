import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import { colors, typography, globalStyles } from '../styles/globalStyles';

// Assuming these components exist in your project structure
import BackButton from '../components/common/BackButton';
import SearchBar from '../components/Searchbar';
import Header from '../components/common/Header';

interface INotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  icon: any; // This will be the require() for the image
  type: 'discount' | 'order' | 'cancel';
}

const NotificationItem: React.FC<{ item: INotificationItem }> = ({ item }) => (
    <View>

  <View style={styles.notificationItem}>
    <View style={[styles.iconContainer, styles[`${item.type}Icon`]]}>
      <Image source={item.icon} style={styles.icon} />
    </View>
    <View style={styles.notificationContent}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationDescription}>{item.description}</Text>
    </View>
    </View>
    <Text style={styles.notificationTime}>{item.timestamp}</Text>
  </View>
);

const NotificationScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<INotificationItem[]>([
    {
      id: '1',
      title: 'Get 20% Discount Code',
      description: 'Get discount codes from sharing with friends.',
      timestamp: '12:20 10/05/2024',
      icon: require('../assets/images/ticket.png'),
      type: 'discount',
    },
    {
      id: '2',
      title: 'Get 10% Discount Code',
      description: 'Holiday discount code.',
      timestamp: '11:10 10/05/2024',
      icon: require('../assets/images/ticket.png'),
      type: 'discount',
    },
    {
      id: '3',
      title: 'Order Received',
      description: 'Order #SP_0023900 has been delivered successfully.',
      timestamp: '10:15 10/05/2024',
      icon: require('../assets/images/checkGreen.png'),
      type: 'order',
    },
    // Add more notification items here...
  ]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const filteredNotifications = notifications.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

 
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* <View style={styles.header}>
          <BackButton />
          <Text style={styles.title}>Notification</Text>
          <View style={styles.backIconContainer}>

          <Image source={require('../assets/images/blackMore.png')} style={styles.moreIcon} />
          </View>
        </View> */}
        <Header title='Notification' showMoreIcon/>

        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          onFilterPress={() => {/* Implement filter functionality */}}
        />

        {filteredNotifications.length === 0 ? (
          <View style={styles.notFoundContainer}>
            <Text style={styles.notFoundText}>No notifications found</Text>
          </View>
        ) : (
          <FlatList
            data={filteredNotifications}
            renderItem={({ item }) => <NotificationItem item={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.notificationList}
            ListHeaderComponent={() => <Text style={styles.sectionHeader}>Today</Text>}
          />
        )}
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
    justifyContent: 'space-between',
    padding: 20,
    marginTop: 20,
  },
  title: {
    ...globalStyles.title,
    flex: 1,
    textAlign: 'center',
    fontWeight:'600',
    fontSize:22
  },
  moreIcon: {
    width: 22,
    height: 6,
  },
  notificationList: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    fontFamily: typography.bold,
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    color:colors.black,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 15,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  discountIcon: {
    backgroundColor: colors.lightYellow,
  },
  orderIcon: {
    backgroundColor: colors.lightGreen,
  },
  cancelIcon: {
    backgroundColor: colors.lightRed,
  },
  icon: {
    width: 24,
    height: 24,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontFamily: typography.bold,
    fontSize: 16,
    marginBottom: 4,
    color:colors.black,
  },
  notificationDescription: {
    fontFamily: typography.regular,
    fontSize: 14,
    color: colors.gray,
  },
  notificationTime: {
    fontFamily: typography.regular,
    fontSize: 12,
    color: '#4C555F',
    alignSelf: 'flex-end', 
    textAlign: 'right', 
    marginTop: -16,

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
  backIconContainer: {
    padding: 4,
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000', //
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default NotificationScreen;