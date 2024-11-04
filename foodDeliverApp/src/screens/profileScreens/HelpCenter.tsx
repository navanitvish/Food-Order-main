import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { colors, globalStyles, typography } from '../../styles/globalStyles';
import Header from '../../components/common/Header';
import SearchBar from '../../components/Searchbar';
import MenuItem from '../../components/common/MenuItem';
import RBSheet from 'react-native-raw-bottom-sheet';


interface HelpItem {
  title: string;
  content: string;
}

const helpItems: HelpItem[] = [
  {
    title: 'How do I create a new account?',
    content: `To create a new account, please follow these simple steps:

1. Open the app and navigate to the login screen.
2. Below the login form, you'll see an option to "Register". Tap on that.
3. You will be prompted to enter your Phone Number, Email and Full Name for your account. Please make sure to use a valid Phone Number.
4. After entering your Phone Number, Email and Full Name, tap on the "Register" button.
5. A code will be sent to your phone number provided for verification. Please check your inbox and enter the code in the Verification screen to verify your account.
6. Once your account is verified, the app will automatically log you in.
7. You can enter some other personal information or skip it.
8. You can set the required security level for your account or ignore it.
9. You are now done creating your account.

If you encounter any issues during the sign-up process, feel free to reach out to our support team for assistance.`
  },
  {
    title: 'I forgot my password. How do I reset it?',
    content: 'To reset your password...' 
  },
  {
    title: 'Im having trouble logging into my account. How can I resolve this?',
    content: 'To reset your password...' 
  },
  {
    title: 'Im experiencing issues with payment. How can I resolve them?',
    content: 'To reset your password...' 
  },
  {
    title: 'I want to cancel an order Ive placed. How can I do this?',
    content: 'To reset your password...' 
  },
  {
    title: 'Where can I find detailed information about a specific product?',
    content: 'To reset your password...' 
  },
  {
    title: 'How do I use a specific feature within your app?',
    content: 'To reset your password...' 
  },
];


const HelpCenterScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<HelpItem | null>(null);
  const bottomSheetRef = useRef<any>(null);
  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };


  const handleMenuItemPress = (item: HelpItem) => {
    setSelectedItem(item);
    bottomSheetRef.current?.open();
  };

  const renderBottomSheetContent = () => (
    <View style={styles.bottomSheetContent}>
      
         <TouchableOpacity style={styles.indicator} onPress={()=>bottomSheetRef.current?.close()}>
            <Image source={require('../../assets/images/Indicator.png')} style={styles.closeIcon} />
          </TouchableOpacity>
          <Text style={styles.helpHeading}>Help</Text>
      <Text style={styles.bottomSheetTitle}>{selectedItem?.title}</Text>
      <ScrollView>
        <Text style={styles.bottomSheetText}>{selectedItem?.content}</Text>
      </ScrollView>
    </View>
  );


  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <Header title='Help Center'/>
      <SearchBar
        value={searchQuery}
        onChangeText={handleSearch}
        onFilterPress={() => {/* Implement filter functionality */}}
      />
      <ScrollView>
        {helpItems.map((item, index) => (
          <MenuItem 
            key={index}
            title={item.title}
            onPress={() => handleMenuItemPress(item)}
          />
        ))}
      </ScrollView>
      <RBSheet
        ref={bottomSheetRef}
        //@ts-ignore
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.5)"
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height:'90%'
          }
        }}
      >
        {renderBottomSheetContent()}
      </RBSheet>
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
  bottomSheetContent: {
    padding: 20,
  },
  bottomSheetTitle: {
    fontFamily: typography.bold,
    fontSize: 18,
    marginBottom: 10,
    color: colors.black,
  },
  bottomSheetText: {
    fontFamily: typography.regular,
    fontSize: 16,
    lineHeight: 24,
    color: colors.black,
  },
  indicator:{
    flexDirection:'row',
    justifyContent:'center',
    marginBottom:20
  },
  closeIcon: {
    width: 62,
    height: 4,
  },
  helpHeading:{
    fontSize:18,
    fontWeight:'600',
    textAlign:'center',
    marginBottom:20
  }
});

export default HelpCenterScreen;