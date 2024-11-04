// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   Modal,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import { colors, typography, globalStyles } from '../styles/globalStyles';
// import RBSheet from 'react-native-raw-bottom-sheet';
// import CustomCountryPicker from '../components/CountryPicker';
// import AuthInput from '../components/AuthInput';
// import Header from '../components/common/Header';
// import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import SwitchItem from '../components/common/SwitchItem';
// import MenuItem from '../components/common/MenuItem';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Toast from 'react-native-toast-message';
// import { userService } from '../api/services/userService';

// interface MenuItem {
//   title: string;
//   icon?: any;
//   onPress?: () => void;
//   height?: string;
//   width?: string;
//   route?: any;
// }

// const ProfileScreen: React.FC = () => {
//   const navigation = useNavigation() as any;
//   const bottomSheetRef = useRef<any>(null);
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [selectedCountry, setSelectedCountry] = useState({
//     name: 'United States',
//     callingCode: ['1'],
//     cca2: 'US',
//     flag: '',
//   });
//   const [email, setEmail] = useState('');
//   const [fullName, setFullName] = useState('');
//   const [avatarUrl, setAvatarUrl] = useState('');

//   const [isFaceIDEnabled, setIsFaceIDEnabled] = useState(false);
//   const [isTouchIDEnabled, setIsTouchIDEnabled] = useState(false);
//   const [isPinSecurityEnabled, setIsPinSecurityEnabled] = useState(false);
//   const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [token, setToken] = useState('');

//   const checkLoginStatus = useCallback(async () => {
//     try {
//       const userToken = await AsyncStorage.getItem('userToken');
//       setToken(userToken || '');
//       const loggedInStatus = await AsyncStorage.getItem('isLoggedIn');
//       const rememberMe = await AsyncStorage.getItem('rememberMe');
//       console.log('User Token:', userToken);
//       console.log('Is Logged In:', loggedInStatus);
//       console.log('Remember Me:', JSON.stringify(rememberMe));

//       const newLoggedInStatus = loggedInStatus === 'true' && !!userToken;
//       setIsLoggedIn(newLoggedInStatus);

//       if (newLoggedInStatus) {
//         fetchUserProfile();
//       }
//     } catch (error) {
//       console.error('Error checking login status:', error);
//       setIsLoggedIn(false);
//     }
//   }, []);

//   useEffect(() => {
//     checkLoginStatus();
//   }, [checkLoginStatus]);

//   useFocusEffect(
//     useCallback(() => {
//       checkLoginStatus();
//     }, [checkLoginStatus])
//   );

//   const fetchUserProfile = async () => {
//     try {
//       const response = await userService.getProfile();
//       console.log('Profile Response:', response.data);
//       if (response.data.success) {
//         const profileData = response.data.data;
//         setFullName(profileData.name || '');
//         setEmail(profileData.email || '');
//         setPhoneNumber(profileData.mobile || '');
//         setAvatarUrl(profileData.avatar || '');
//       } else {
//         Toast.show({
//           type: 'error',
//           text1: 'Error',
//           text2: 'Failed to fetch user profile',
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//       Toast.show({
//         type: 'error',
//         text1: 'Error',
//         text2: 'An error occurred while fetching your profile',
//       });
//     }
//   };

//   const logout = async (): Promise<void> => {
//     try {
//       const keys = ['userToken', 'isLoggedIn', 'userEmail'];
//       await AsyncStorage.multiRemove(keys);
//       console.log('Logout successful. User data cleared from AsyncStorage.');
//       setIsLoggedIn(false);
//       setToken('');
//     } catch (error) {
//       console.error('Error during logout:', error);
//       throw error;
//     }
//   };

//   const handleLogout = () => {
//     setIsLogoutModalVisible(true);
//   };

//   const confirmLogout = () => {
//     setIsLogoutModalVisible(false);
//     logout();
//   };

//   const toggleSwitch = (setter: React.Dispatch<React.SetStateAction<boolean>>) => () => {
//     setter((previousValue) => !previousValue);
//   };

//   const handleLoginRegister = () => {
//     navigation.navigate('Auth');
//   };

//   const updateUserProfile = async () => {
//     try {
//       const response = await userService.updateProfile({
//         name: fullName,
//         email: email,
//         mobile: Number(phoneNumber),
//       });

//       if (response.data.success) {
//         Toast.show({
//           type: 'success',
//           text1: 'Success',
//           text2: 'Profile updated successfully',
//         });
//         bottomSheetRef.current?.close();
//         fetchUserProfile(); 
//       } else {
//         Toast.show({
//           type: 'error',
//           text1: 'Error',
//           text2: 'Failed to update profile',
//         });
//       }
//     } catch (error) {
//       console.error('Error updating user profile:', error);
//       Toast.show({
//         type: 'error',
//         text1: 'Error',
//         text2: 'An error occurred while updating your profile',
//       });
//     }
//   };

//   const renderLoggedInContent = () => (
//     <View>
//       <View style={styles.profileInfo}>
//         <View style={styles.info}>
//           <Image
//             source={avatarUrl ? { uri: avatarUrl } : require('../assets/images/bottom/Avatar.png')}
//             style={styles.profilePic}
//           />
//           <View>
//             <Text style={styles.name}>{fullName}</Text>
//             <Text style={styles.phone}>{phoneNumber}</Text>
//             <Text style={styles.email}>{email}</Text>
//           </View>
//         </View>
//         <TouchableOpacity onPress={() => bottomSheetRef.current?.open()} style={styles.editButton}>
//           <Image
//             source={require('../assets/images/pencilWhite.png')}
//             style={styles.editIcon}
//           />
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//         <Image
//           source={require('../assets/images/logout.png')}
//           style={styles.logoutIcon}
//         />
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   const renderLoggedOutContent = () => (
//     <View style={styles.loginRegisterContainer}>
//       <TouchableOpacity style={styles.loginRegisterButton} onPress={handleLoginRegister}>
//         <View style={styles.logoutButtonRegister}>
//           <Image
//             source={require('../assets/images/logout.png')}
//             style={styles.logoutIcon}
//           />
//           <Text style={styles.logoutText}>Login / Register</Text>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView style={styles.container}>
//         <Header title='Profile' showMoreIcon />

//         {isLoggedIn ? renderLoggedInContent() : renderLoggedOutContent()}

//         <MenuItem
//           title="My Locations"
//           icon={require('../assets/images/locationInput.png')}
//           route="Location"
//         />
//         <MenuItem
//           title="My Promotions"
//           icon={require('../assets/images/moneyTicket.png')}
//           route="Promotions"
//         />
//         <MenuItem
//           title="Payment Methods"
//           icon={require('../assets/images/paymentMethod.png')}
//           route="PaymentMethods"
//         />
//         <MenuItem
//           title="Messages"
//           icon={require('../assets/images/chats.png')}
//           route="Messages"
//         />
//         <MenuItem
//           title="Invite Friends"
//           icon={require('../assets/images/userG.png')}
//           route="InviteFriends"
//         />
//         <MenuItem
//           title="Security"
//           icon={require('../assets/images/security.png')}
//           route="Security"
//         />
//         <MenuItem
//           title="Help Center"
//           icon={require('../assets/images/help.png')}
//           route="HelpCenter"
//         />

//         {/* <View style={styles.menuItem}>
//           <Text style={styles.menuItemText}>Language</Text>
//           <TouchableOpacity style={styles.languageSelector} onPress={() => navigation.navigate('LanguageSettings')}>
//             <Text style={styles.languageText}>English</Text>
//           </TouchableOpacity>
//         </View> */}

//         {/* <SwitchItem
//           title="Face ID"
//           value={isFaceIDEnabled}
//           onValueChange={toggleSwitch(setIsFaceIDEnabled)}
//         /> */}
//         {/* <SwitchItem
//           title="Touch ID"
//           value={isTouchIDEnabled}
//           onValueChange={toggleSwitch(setIsTouchIDEnabled)}
//         /> */}
//         {/* <SwitchItem
//           title="Pin Security"
//           value={isPinSecurityEnabled}
//           onValueChange={toggleSwitch(setIsPinSecurityEnabled)}
//         /> */}
        
//         <MenuItem
//           title="Term of Service"
//           route="TermsOfService"
//         />
//         <MenuItem
//           title="Privacy Policy"
//           route="PrivacyPolicy"
//         />
//         <MenuItem
//           title="About App"
//           route="AboutApp"
//         />
//       </ScrollView>
      
//       <RBSheet
//         ref={bottomSheetRef}
//         //@ts-ignore
//         closeOnDragDown={true}
//         closeOnPressMask={true}
//         height={400}
//         customStyles={{
//           wrapper: {
//             backgroundColor: "rgba(203, 202, 201, 0.5)",
//           },
//           container: {
//             borderTopLeftRadius: 20,
//             borderTopRightRadius: 20,
//           }
//         }}
//       >
//         <KeyboardAvoidingView 
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//           style={styles.bottomSheetContainer}
//         >
//           <ScrollView contentContainerStyle={styles.bottomSheetContent}>
//             <TouchableOpacity style={styles.indicator} onPress={() => bottomSheetRef.current?.close()}>
//               <View style={styles.indicatorBar} />
//             </TouchableOpacity>
//             <Text style={styles.bottomSheetText}>
//               Change User Information
//             </Text>
//             <CustomCountryPicker
//               phoneNumber={phoneNumber}
//               selectedCountry={selectedCountry}
//               onSelectCountry={setSelectedCountry}
//               onPhoneNumberChange={setPhoneNumber}
//             />
//             <AuthInput
//               value={email}
//               onChangeText={setEmail}
//               placeholder="Email"
//               icon="email"
//             />
//             <AuthInput 
//               value={fullName}
//               onChangeText={setFullName}
//               placeholder="Full Name"
//               icon="user"
//             />
//           </ScrollView>
//           <View style={styles.bottomSheetButtonContainer}>
//             <TouchableOpacity onPress={() => bottomSheetRef.current?.close()} style={styles.sheetButtonCancel}>
//               <Text style={styles.sheetButtonTextCancel}>Cancel</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={updateUserProfile} style={styles.sheetButton}>
//               <Text style={styles.sheetButtonText}>Save</Text>
//             </TouchableOpacity>
//           </View>
//         </KeyboardAvoidingView>
//       </RBSheet>
      
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={isLogoutModalVisible}
//         onRequestClose={() => setIsLogoutModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <TouchableOpacity
//               style={styles.modalCloseButton}
//               onPress={() => setIsLogoutModalVisible(false)}
//             >
//               <Image
//                 source={require('../assets/images/x.png')}
//                 style={styles.modalCloseIcon}
//               />
//             </TouchableOpacity>
//             <Text style={styles.modalTitle}>Logout</Text>
//             <Text style={styles.modalMessage}>Are you sure you want to log out?</Text>
//             <View style={styles.modalButtonContainer}>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.modalCancelButton]}
//                 onPress={() => setIsLogoutModalVisible(false)}
//               >
//                 <Text style={styles.modalButtonTextCancel}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.modalConfirmButton]}
//                 onPress={confirmLogout}
//               >
//                 <Text style={styles.modalButtonTextConfirm}>Yes</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };


// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: colors.white,
//   },
//   container: {
//     flex: 1,
//     marginBottom: 80,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 20,
//     marginTop: 20,
//   },
//   title: {
//     ...globalStyles.title,
//     flex: 1,
//     textAlign: 'center',
//     fontWeight: '600',
//     fontSize: 22,
//   },
//   moreIconContainer: {
//     padding: 4,
//     height: 30,
//     width: 30,
//     borderRadius: 15,
//     backgroundColor: colors.white,
//     elevation: 5,
//     shadowColor: colors.black,
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   moreIcon: {
//     width: 20,
//     height: 20,
//     resizeMode: 'contain',
//   },
//   sheetContainer:{
//     paddingHorizontal:20,
//   },
//   profileInfo: {
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   info: {
//     alignItems: 'center',
//     paddingVertical: 20,
//     flexDirection: 'row',
//     gap: 10,
//   },
//   profilePic: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginBottom: 10,
//   },
//   // bottomSheetText:{
//   //   fontSize:16,
//   //   textAlign:'center',
//   //   marginBottom:20,
//   //   color:colors.black,
//   // },
//   name: {
//     fontFamily: typography.bold,
//     fontSize: 20,
//     color: colors.primary,
//     marginBottom: 5,
//   },
//   phone: {
//     fontFamily: typography.regular,
//     fontSize: 14,
//     color: '#0D1217',
//     marginBottom: 2,
//   },
//   email: {
//     fontFamily: typography.regular,
//     fontSize: 14,
//     color: '#0D1217',
//   },
//   editButton: {
//     height: 42,
//     width: 42,
//     borderRadius: 50,
//     backgroundColor: colors.primary,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   editIcon: {
//     width: 20,
//     height: 20,
//   },
//   logoutButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FFEFED',
//     paddingVertical: 12,
//     marginHorizontal: 20,
//     borderRadius: 20,
//     marginBottom: 20,
//   },
//   logoutButtonRegister: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FFEFED',
//     padding: 12,
//     marginHorizontal: 20,
//     borderRadius: 20,
//     width: '100%',
//     // marginBottom: 20,
//   },
//   logoutIcon: {
//     width: 20,
//     height: 20,
//     marginRight: 10,
//     tintColor: colors.primary,
//   },
//   logoutText: {
//     fontFamily: typography.bold,
//     fontSize: 16,
//     color: colors.primary,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//   },
//   menuItemText: {
//     fontFamily: typography.regular,
//     fontSize: 16,
//     color: colors.black,
//   },
//   chevron: {
//     width: 10,
//     height: 18,
//     tintColor: colors.darkGray,
//   },
//   languageSelector: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   languageText: {
//     fontFamily: typography.regular,
//     fontSize: 16,
//     color: colors.darkGray,
//     marginRight: 5,
//   },
//   chevronDown: {
//     width: 12,
//     height: 12,
//     tintColor: colors.darkGray,
//   },
//   itemContainer:{
//     flexDirection:'row',
//     alignItems: 'center',
//     gap:10
//   },
//   // bottomSheetContent: {
//   //   padding: 20,
   
//   // },
//   // bottomSheetButton: {
//   //   flexDirection: 'row',
//   //   alignItems: 'center',
//   //   justifyContent: 'center',
//   //   gap: 20,
//   //   marginTop: 20,
//   //   marginBottom: 80,
//   // },
//   // bottomSheetHeader: {
//   //   flexDirection: 'row',
//   //   justifyContent: 'center',
//   //   alignItems: 'center',
//   //   marginBottom: 20,
//   // },
//   // indicator:{
//   //   flexDirection:'row',
//   //   justifyContent:'center',
//   //   marginBottom:10
//   // },
//   closeIcon: {
//     width: 62,
//     height: 4,
//   },
//   // sheetButton: {
//   //   backgroundColor: '#3e4532',
//   //   paddingHorizontal: 38,
//   //   paddingVertical: 12,
//   //   borderRadius: 50,
//   //   alignItems: 'center',
//   //   marginBottom: 20,
//   // },
//   // sheetButtonText: {
//   //   color: '#fff',
//   //   fontSize: 18,
//   //   fontWeight: 'bold',
//   // },
//   // sheetButtonCancel: {
//   //   backgroundColor: 'white',
//   //   paddingHorizontal: 38,
//   //   paddingVertical: 12,
//   //   borderRadius: 50,
//   //   alignItems: 'center',
//   //   marginBottom: 20,
//   // },
//   // sheetButtonTextCancel: {
//   //   color: colors.gray,
//   //   fontSize: 18,
//   //   fontWeight: 'bold',
//   // },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     backgroundColor: colors.white,
//     borderRadius: 10,
//     padding: 20,
//     width: '80%',
//     height:195,
//     alignItems: 'center',
//   },
//   modalCloseButton: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//   },
//   modalCloseIcon: {
//     width: 20,
//     height: 20,
//     tintColor: colors.gray,
//   },
//   modalTitle: {
//     fontFamily: typography.bold,
//     fontSize: 20,
//     color: colors.black,
//     marginBottom: 10,
//   },
//   modalMessage: {
//     fontFamily: typography.regular,
//     fontSize: 16,
//     color: colors.black,
//     marginBottom: 20,
//     marginTop: 10,
//     textAlign: 'center',
//   },
//   modalButtonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginTop:30
//   },
//   modalButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 50,
//     width: '45%',
//   },
//   modalCancelButton: {
//     backgroundColor: colors.lightGray,
//   },
//   modalConfirmButton: {
//     backgroundColor: colors.primary,
//   },
//   modalButtonTextCancel: {
//     fontFamily: typography.bold,
//     fontSize: 16,
//     color: colors.darkGray,
//     textAlign: 'center',
//   },
//   modalButtonTextConfirm: {
//     fontFamily: typography.bold,
//     fontSize: 16,
//     color: colors.white,
//     textAlign: 'center',
//   },
//   loginRegisterContainer: {
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//   },
//   loginRegisterButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#3e4532',
//     paddingVertical: 16,
//     paddingHorizontal:12,
//     borderRadius: 12,
//   },
//   loginRegisterIcon: {
//     width: 24,
//     height: 24,
//     marginRight: 8,
//     tintColor: colors.white,
//   },
//   loginRegisterText: {
//     fontFamily: typography.regular,
//     fontSize: 16,
//     color: colors.white,
//   },
//   bottomSheetContainer: {
//     flex: 1,
//   },
//   bottomSheetContent: {
//     padding: 20,
//     flexGrow: 1,
//   },
//   indicator: {
//     alignSelf: 'center',
//     marginBottom: 20,
//   },
//   indicatorBar: {
//     width: 60,
//     height: 4,
//     backgroundColor: colors.lightGray,
//     borderRadius: 2,
//   },
//   bottomSheetText: {
//     fontSize: 18,
//     textAlign: 'center',
//     marginBottom: 20,
//     color: colors.black,
//     fontFamily: typography.bold,
//   },
//   bottomSheetButtonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 40,
//     paddingBottom: 40,
//     // paddingTop: 10,
//     backgroundColor: colors.white,
//   },
//   sheetButton: {
//     backgroundColor: colors.primary,
//     paddingHorizontal: 30,
//     paddingVertical: 12,
//     borderRadius: 25,
//     flex: 1,
//     marginLeft: 10,
//   },
//   sheetButtonText: {
//     color: colors.white,
//     fontSize: 16,
//     fontFamily: typography.bold,
//     textAlign: 'center',
//   },
//   sheetButtonCancel: {
//     backgroundColor: colors.lightGray,
//     paddingHorizontal: 30,
//     paddingVertical: 12,
//     borderRadius: 25,
//     flex: 1,
//     marginRight: 10,
//   },
//   sheetButtonTextCancel: {
//     color: colors.darkGray,
//     fontSize: 16,
//     fontFamily: typography.bold,
//     textAlign: 'center',
//   },
// });

// export default ProfileScreen;




import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { userService } from '../api/services/userService';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [myAccountExpanded, setMyAccountExpanded] = useState(true);
  const [helpFAQsExpanded, setHelpFAQsExpanded] = useState(false);
    const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const  [phoneNumber, setPhoneNumber] = useState('');


    const fetchUserProfile = async () => {
    try {
      const response = await userService.getProfile();
      console.log('Profile Response:', response.data);
      if (response.data.success) {
        const profileData = response.data.data;
        setFullName(profileData.name || '');
        setEmail(profileData.email || '');
        setPhoneNumber(profileData.mobile || '');
        setAvatarUrl(profileData.avatar || '');
      } else {
        // Toast.show({
        //   type: 'error',
        //   text1: 'Error',
        //   text2: 'Failed to fetch user profile',
        // });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // Toast.show({
      //   type: 'error',
      //   text1: 'Error',
      //   text2: 'An error occurred while fetching your profile',
      // });
    }
  };

  useEffect(()=>{
fetchUserProfile()
  }, [])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      paddingTop: 42,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#E5E5EA',
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 16,
    },
    userInfo: {
      flex: 1,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000000',
      textTransform:'uppercase'
    },
    contact: {
      fontSize: 14,
      color: '#8E8E93',
    },
    section: {
      borderBottomWidth: 1,
      borderBottomColor: '#E5E5EA',
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000000',
    },
    sectionContent: {
      paddingLeft: 16,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingRight: 16,
    },
    itemText: {
      fontSize: 16,
      color: '#000000',
      flex: 1,
    },
    logoutButton: {
      marginTop: 16,
      marginHorizontal: 16,
      padding: 12,
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#FF3B30',
    },
    logoutText: {
      color: '#FF3B30',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  const navigation= useNavigation() as any;

    const logout = async (): Promise<void> => {
    try {
      const keys = ['userToken', 'isLoggedIn', 'userEmail'];
      await AsyncStorage.multiRemove(keys);
      console.log('Logout successful. User data cleared from AsyncStorage.');
      // setIsLoggedIn(false);
      // setToken('');
      navigation.navigate('Auth');
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
      
        <View style={styles.userInfo}>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.contact}>{phoneNumber} . {email}</Text>
        </View>
        <Image
          source={{ uri: 'https://via.placeholder.com/50' }}
          style={styles.avatar}
        />
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setMyAccountExpanded(!myAccountExpanded)}
        >
          <Text style={styles.sectionTitle}>My Account</Text>
          <Icon
            name={myAccountExpanded ? 'expand-less' : 'expand-more'}
            size={24}
            color="#000000"
          />
        </TouchableOpacity>
        {myAccountExpanded && (
          <View style={styles.sectionContent}>
            <TouchableOpacity  onPress={()=>navigation.navigate('SavedLocation')} style={styles.item}>
              <Icon name="location-on" size={24} color="#000000" style={{ marginRight: 16 }} />
              <Text style={styles.itemText}>Manage Address</Text>
              <Icon name="chevron-right" size={24} color="#8E8E93" />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('favourite')} style={styles.item}>
              <Icon name="favorite" size={24} color="#000000" style={{ marginRight: 16 }} />
              <Text style={styles.itemText}>My Favourites</Text>
              <Icon name="chevron-right" size={24} color="#8E8E93" />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('OrderScreen')}  style={styles.item}>
              <Icon name="shopping-bag" size={24} color="#000000" style={{ marginRight: 16 }} />
              <Text style={styles.itemText}>My Orders</Text>
              <Icon name="chevron-right" size={24} color="#8E8E93" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Icon name="account-balance-wallet" size={24} color="#000000" style={{ marginRight: 16 }} />
              <Text style={styles.itemText}>My Wallet</Text>
              <Icon name="chevron-right" size={24} color="#8E8E93" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Icon name="receipt" size={24} color="#000000" style={{ marginRight: 16 }} />
              <Text style={styles.itemText}>Tax/VAT Number</Text>
              <Icon name="chevron-right" size={24} color="#8E8E93" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Icon name="phone" size={24} color="#000000" style={{ marginRight: 16 }} />
              <Text style={styles.itemText}>Change Phone Number</Text>
              <Icon name="chevron-right" size={24} color="#8E8E93" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setHelpFAQsExpanded(!helpFAQsExpanded)}
        >
          <Text style={styles.sectionTitle}>Help & FAQs</Text>
          <Icon
            name={helpFAQsExpanded ? 'expand-less' : 'expand-more'}
            size={24}
            color="#000000"
          />
        </TouchableOpacity>
        {helpFAQsExpanded && (
          <View style={styles.sectionContent}>
            <TouchableOpacity style={styles.item}>
              <Icon name="privacy-tip" size={24} color="#000000" style={{ marginRight: 16 }} />
              <Text style={styles.itemText}>Privacy Policy</Text>
              <Icon name="chevron-right" size={24} color="#8E8E93" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Icon name="delete" size={24} color="#000000" style={{ marginRight: 16 }} />
              <Text style={styles.itemText}>Delete My Account</Text>
              <Icon name="chevron-right" size={24} color="#8E8E93" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Icon name="support-agent" size={24} color="#000000" style={{ marginRight: 16 }} />
              <Text style={styles.itemText}>Customer Support</Text>
              <Icon name="chevron-right" size={24} color="#8E8E93" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Icon name="assignment-return" size={24} color="#000000" style={{ marginRight: 16 }} />
              <Text style={styles.itemText}>Refund Cancellation Policy</Text>
              <Icon name="chevron-right" size={24} color="#8E8E93" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Icon name="shopping-cart" size={24} color="#000000" style={{ marginRight: 16 }} />
              <Text style={styles.itemText}>Product Service Purchase Flow</Text>
              <Icon name="chevron-right" size={24} color="#8E8E93" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Icon name="description" size={24} color="#000000" style={{ marginRight: 16 }} />
              <Text style={styles.itemText}>Terms & Conditions</Text>
              <Icon name="chevron-right" size={24} color="#8E8E93" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;