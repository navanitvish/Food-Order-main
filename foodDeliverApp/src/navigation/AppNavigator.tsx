// import React from 'react';
// import { View } from 'react-native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../types/navigation';
// import SplashScreen from '../screens/SplashScreen';
// import AuthScreen from '../screens/common/AuthScreen';
// import HomePage from '../screens/HomeScreen';
// import ProfilePage from '../screens/ProfileScreen';
// import OrdersScreen from '../screens/OrdersScreen';
// import FavouritesScreen from '../screens/FavouritesScreen';
// import NotificationsScreen from '../screens/NotificationsScreen';
// import UsersProfileScreen from '../screens/UserProfileScreen';
// import BottomNavigation, { BottomTabName } from '../components/BottomNavigation';
// import OnboardingScreen from '../screens/Onbaording';
// import LocationScreen from '../screens/LocationScreen';
// import MyBasketScreen from '../screens/MyBasket';
// import PromotionsScreen from '../screens/Promotions';
// import GetMorePromotionScreen from '../screens/GetMorePromotion';
// import PaymentMethods from '../screens/PaymentMethod';
// import CategoryScreen from '../screens/common/CategoryScreen';
// import FoodDetailsScreen from '../screens/common/FoodDetails';
// import ReviewPage from '../screens/ReviewScreen';
// import MessagesScreen from '../screens/profileScreens/Messages';
// import InviteFriends from '../screens/profileScreens/InviteFriends';
// import SecurityScreen from '../screens/profileScreens/Security';
// import HelpCenterScreen from '../screens/profileScreens/HelpCenter';
// import TermsOfServiceScreen from '../screens/profileScreens/TermsOfService';
// import PrivacyPolicyScreen from '../screens/profileScreens/PrivacyPolicy';
// import AboutAppScreen from '../screens/profileScreens/AboutApp';
// import { OrdersSummaryScreen } from '../screens/OrdersSummary';
// import CancelOrderScreen from '../screens/CancelorderScreen';
// import { RootState } from '../redux/store';
// import { useDispatch, useSelector } from 'react-redux';
// import { setActiveTab } from '../redux/slices/activeTabSlice';
// import AllCategoriesScreen from '../screens/AllCategoriesScreen';
// import AddNewLocationScreen from '../screens/AddNewLocation';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


// const Stack = createNativeStackNavigator<RootStackParamList>();
// const Tab = createBottomTabNavigator();

// const MainTabs = () => (
//   <Tab.Navigator tabBar={props => <BottomNavigation {...props} />}>
//     <Tab.Screen name="NearMe" component={HomePage} options={{ headerShown: false }} />
//     <Tab.Screen name="Explore" component={LocationScreen} options={{ headerShown: false }} />
//     <Tab.Screen name="Cart" component={MyBasketScreen} options={{ headerShown: false }} />
//     <Tab.Screen name="Account" component={UsersProfileScreen} options={{ headerShown: false }} />
//   </Tab.Navigator>
// );

// const AppNavigator = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="Splash" component={SplashScreen} />
//     <Stack.Screen name="Onboarding" component={OnboardingScreen} />
//     <Stack.Screen name="Auth" component={AuthScreen} />
//     <Stack.Screen name="Location" component={LocationScreen} />
//     {/* <Stack.Screen name="Profile" component={LocationScreen} /> */}
//     <Stack.Screen name="setProfile" component={ProfilePage} />
//     <Stack.Screen name="MyBasket" component={MyBasketScreen} />
//     <Stack.Screen name="MainTabs" component={MainTabs} />
//     <Stack.Screen name="Promotions" component={PromotionsScreen} />
//     <Stack.Screen name="PaymentMethods" component={PaymentMethods} />
//    <Stack.Screen name="GetMorePromotions" component={GetMorePromotionScreen} />
//    <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
//    <Stack.Screen name="FoodDetailsScreen" component={FoodDetailsScreen} />
//    <Stack.Screen name="ReviewScreen" component={ReviewPage} />
//    <Stack.Screen name="Messages" component={MessagesScreen} />
//    <Stack.Screen name="InviteFriends" component={InviteFriends} />
//    <Stack.Screen name="Security" component={SecurityScreen} />
//    <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
//    <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} />
//    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
//    <Stack.Screen name="AboutApp" component={AboutAppScreen} />
//    <Stack.Screen name="OrderSummary" component={OrdersSummaryScreen} />
//    <Stack.Screen name="CancelOrder" component={CancelOrderScreen} />
//    <Stack.Screen name="AllCategories" component={AllCategoriesScreen} />
//    <Stack.Screen name="AddNewLocation" component={AddNewLocationScreen} />
//   </Stack.Navigator>
// );

// export default AppNavigator;


// AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Order } from '../types';
import BottomNavigation from '../components/BottomNavigation';
import HomePage from '../screens/HomeScreen';
import MyLocationsScreen from '../screens/LocationScreen';
import MyBasketScreen from '../screens/MyBasket';
import ProfileScreen from '../screens/UserProfileScreen';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/Onbaording';
import AuthScreen from '../screens/common/AuthScreen';
import CategoryScreen from '../screens/common/CategoryScreen';
import FoodDetailsScreen from '../screens/common/FoodDetails';
import { OrdersSummaryScreen } from '../screens/OrdersSummary';
import PromotionsScreen from '../screens/Promotions';
import RestaurantListScreen from '../screens/RestrauntListScreen';
import FavoritesScreen from '../screens/FavouritesScreen';
import OrdersScreen from '../screens/OrdersScreen';
import SearchScreen from '../screens/common/SearchScreen';
import AddNewLocationScreen from '../screens/AddNewLocation';
import LocationDetails from '../screens/LocationDetails';
import OffersScreen from '../screens/OffersScreen';
import SavedLocationDeatils from '../screens/SavedLocationScreen';



export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: undefined;
  MainTabs: undefined;
  CreateAccount: undefined;
  Login: undefined;
  setProfile: undefined;
  Promotions: undefined;
  GetMorePromotions: undefined;
  PaymentMethods: undefined;
  CategoryScreen: { categoryId: string; categoryName: string };
  FoodDetailsScreen: { foodId: string; foodName: string };
  OrderSummary: { order: Order};
  ReviewScreen: undefined;
  Messages: undefined;
  InviteFriends: undefined;
  Security: undefined;
  HelpCenter: undefined;
  TermsOfService: undefined;
  PrivacyPolicy: undefined;
  AboutApp: undefined;
  CancelOrder: undefined;
  AllCategories: undefined;
  AddNewLocation: undefined;
  RestaurantListScreen: undefined;
  favourite: undefined;
  MyBasketScreen: undefined;
  OrderScreen: undefined;
  Location: undefined;
  LocationDetails:undefined;
  Offers: undefined;
  SavedLocation:undefined;
};


const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<any>();

// Bottom tabs navigator
const BottomTabs = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigation {...props} />}>
      <Tab.Screen name="NEAR ME" component={HomePage} options={{ headerShown: false }} />
      <Tab.Screen name="EXPLORE" component={SearchScreen} options={{ headerShown: false }} />
      <Tab.Screen name="CART" component={MyBasketScreen} options={{ headerShown: false }} />
      <Tab.Screen name="ACCOUNT" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="MainTabs" component={BottomTabs} />
      <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
      <Stack.Screen name="FoodDetailsScreen" component={FoodDetailsScreen} />
      <Stack.Screen name="Promotions" component={PromotionsScreen} />
      <Stack.Screen name="RestaurantListScreen" component={RestaurantListScreen} />
      <Stack.Screen name="favourite" component={FavoritesScreen} />
      <Stack.Screen name="MyBasketScreen" component={MyBasketScreen} />
      <Stack.Screen name="OrderScreen" component={OrdersScreen} />
      <Stack.Screen name="Location" component={AddNewLocationScreen} />
      <Stack.Screen name="LocationDetails" component={LocationDetails} />
      <Stack.Screen name="Offers" component={OffersScreen} />
      <Stack.Screen name="SavedLocation" component={SavedLocationDeatils} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

