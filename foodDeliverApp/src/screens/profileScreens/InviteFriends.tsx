import React from 'react';
import { View, Image, StyleSheet, Dimensions, ImageSourcePropType } from 'react-native';
import Header from '../../components/common/Header';

const windowWidth = Dimensions.get('window').width;

interface SocialMediaItem {
  id: number;
  name: string;
  image: ImageSourcePropType;
}

const socialMediaData: SocialMediaItem[] = [
  { id: 1, name: 'Twitter', image: require('../../assets/images/social/Twitter.png') },
  { id: 2, name: 'Facebook', image: require('../../assets/images/social/Facebook.png') },
  { id: 3, name: 'Messenger', image: require('../../assets/images/social/Messenger.png') },
  { id: 4, name: 'Discord', image: require('../../assets/images/social/Discord.png') },
  { id: 5, name: 'Skype', image: require('../../assets/images/social/Skype.png') },
  { id: 6, name: 'Telegram', image: require('../../assets/images/social/Telegram.png') },
  { id: 7, name: 'WeChat', image: require('../../assets/images/social/Weechat.png') },
  { id: 8, name: 'WhatsApp', image: require('../../assets/images/social/Whatsapp.png') },
];

const InviteFriends: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header title="Invite Friends" showMoreIcon />
      <View style={styles.gridBox}>

      <View style={styles.gridContainer}>
        {socialMediaData.map((item, index) => (
          <View key={item.id} style={styles.iconWrapper}>
            <Image
              source={item.image}
              style={styles.icon}
              resizeMode="contain"
            />
          </View>
        ))}
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  gridBox:{
    flex: 1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems: 'center',
  },

  gridContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between', // Evenly distribute icons in each row
    paddingHorizontal: 40,
    // marginTop: 20,
  },
  iconWrapper: {
    width: (windowWidth - 80) / 4, // 4 icons per row with 20 padding on each side and space between
    height: (windowWidth - 80) / 4, // Keep height equal to width for square icons

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  icon: {
    width: 60,
    height: 60,
  },
});

export default InviteFriends;
