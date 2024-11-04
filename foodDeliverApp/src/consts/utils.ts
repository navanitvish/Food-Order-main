// File: appData.ts

// Define interfaces
export interface ICountry {
  name: string;
  code: string;
  flag: string;
}

export interface IPromotionOption {
  id: string;
  title: string;
  icon: string;
}

// Country data
export const countries: ICountry[] = [
  {name: 'United Kingdom', code: '(+44)', flag: '🇬🇧'},
  {name: 'United States', code: '(+1)', flag: '🇺🇸'},
  {name: 'Canada', code: '(+1)', flag: '🇨🇦'},
  {name: 'Australia', code: '(+61)', flag: '🇦🇺'},
  {name: 'Germany', code: '(+49)', flag: '🇩🇪'},
];


export const promotionOptions: any[] = [
  {
    id: "1",
    title: "Share App",
    icon: require('../assets/images/promotions/share.png')
  },
  {
    id: "2",
    title: "Invite Friends",
    icon: require('../assets/images/promotions/groupUsers.png')
  },
  {
    id: "3",
    title: "Complete Purchases",
    icon: require('../assets/images/promotions/basket.png')
  },
  {
    id: "4",
    title: "Watch Ads",
    icon: require('../assets/images/promotions/reels.png')
  },
  {
    id: "5",
    title: "Participate in Events",
    icon: require('../assets/images/promotions/HandStars.png')
  },
  {
    id: "6",
    title: "Complete Profile",
    icon: require('../assets/images/promotions/UserCircle.png')
  },
  {
    id: "7",
    title: "Follow Social Media",
    icon: require('../assets/images/promotions/ShareCircle.png')
  },
  {
    id: "8",
    title: "Take Surveys",
    icon: require('../assets/images/promotions/DocumentAdd.png')
  },
  {
    id: "9",
    title: "Achieve Levels",
    icon: require('../assets/images/promotions/events.png')
  },
  {
    id: "10",
    title: "Daily Logins",
    icon: require('../assets/images/promotions/Smartphone.png')
  }
];