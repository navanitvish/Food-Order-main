import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from 'react-native';
import { colors, globalStyles } from '../styles/globalStyles';
import BackButton from '../components/common/BackButton';
import { promotionOptions } from '../consts/utils';
import Header from '../components/common/Header';


const GetMorePromotionScreen: React.FC = () => {
  const renderItem: ListRenderItem<any> = ({ item }) => (
    <View style={styles.paymentContainer}>
      <View style={styles.selectContainer}>
        <Image
          source={item.icon}
          style={styles.paymentIcon}
        />
        <View style={styles.paymentMethodContainer}>
          <Text style={styles.paymentText}>{item.title}</Text>
        </View>
        <TouchableOpacity>
          <Image
            source={require('../assets/images/rightGray.png')}
            style={styles.chevronIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* <View style={styles.header}>
          <BackButton />
          <Text style={styles.title}>Get More Promotions</Text>
        </View> */}
        <Header title='Get More Promotions'/>
        <FlatList
          data={promotionOptions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
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
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    ...globalStyles.title,
    flex: 1,
    textAlign: 'center',
    marginRight: 34,
  },
  chevronIcon: {
    width: 11,
    height: 23,
  },
  paymentContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#E9EAEB',
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  paymentText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
    color: colors.black,
  },
  paymentMethodContainer: {
    flex: 1,
    marginLeft: 10,
  },
});

export default GetMorePromotionScreen;