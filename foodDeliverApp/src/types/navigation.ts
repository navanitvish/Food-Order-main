import { Order } from ".";

export type RootStackParamList = {
    Splash: undefined;
    Onboarding: undefined;
    CreateAccount: undefined;
    Login: undefined;
    Auth: undefined;
    Home: undefined;
    Profile: undefined;
    Orders: undefined;
    UserProfile: undefined;
    Notifications: undefined;
    Favourites: undefined;
    MainApp: undefined;
    setProfile: undefined;
    Location: undefined;
    MyBasket: undefined;
    Promotions: undefined;
    GetMorePromotions: undefined;
    PaymentMethods: undefined;
    CategoryScreen: { categoryId: string; categoryName: string };
    FoodDetailsScreen: { foodId: string; foodName: string };
    OrderSummary:{order:Order}
    ReviewScreen:undefined;
    Messages:undefined;
    InviteFriends:undefined;
    Security:undefined;
    HelpCenter:undefined;
    TermsOfService:undefined;
    PrivacyPolicy:undefined;
    AboutApp:undefined;
    CancelOrder:undefined;
    AllCategories:undefined;
    AddNewLocation:undefined;
    MainTabs:undefined;
  };
  export interface ICountry {
    name: any;
    code: string;
    flag: string;
  }