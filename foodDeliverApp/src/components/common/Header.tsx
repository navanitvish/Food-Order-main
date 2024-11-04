import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackButton from './BackButton';
import { Text } from 'react-native';
import { colors, globalStyles } from '../../styles/globalStyles';

interface HeaderProps {
  title: string;
  showMoreIcon?: boolean;
  icon?: any;
}

const Header: React.FC<HeaderProps> = ({ title, icon, showMoreIcon = false }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <BackButton />
      <View style={styles.contentWrapper}>
        {icon && (
          <Image
            source={icon}
            style={styles.icon}
          />
        )}
      <Text style={styles.title}>{title}</Text>
      </View>
  
      {showMoreIcon && (
        <View style={styles.moreIconContainer}>
          <Image
            source={require('../../assets/images/blackMore.png')}
            style={styles.moreIcon}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: 20,
  },
  title: {
    // ...globalStyles.title,
    flex: 1,
    textAlign: 'center',
    // fontWeight: '600',
    fontSize: 22,
    marginRight: 30,
    color: colors.black,
  },
  contentWrapper: {
    // ...globalStyles.title,
    flex: 1,
    textAlign: 'center',
    // fontWeight: '600',
    fontSize: 22,
    flexDirection: 'row',
    // marginRight: 30,
    color: colors.black,
  },
  moreIconContainer: {
    padding: 4,
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: colors.white,
    elevation: 5,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  icon:{
    width: '40%',
    height: '40%',
    resizeMode: 'contain',
  }
});

export default Header;
