import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, typography } from '../../styles/globalStyles';

interface MenuItemProps {
  title: string;
  icon?: ImageSourcePropType;
  onPress?: () => void;
  route?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, icon, onPress, route }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (route) {
      navigation.navigate(route as never);
    } else if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity style={styles.menuItem} onPress={handlePress}>
      <View style={styles.itemContainer}>
        {icon && (
          <Image
            source={icon}
            style={styles.moreIcon}
          />
        )}
        <Text style={styles.menuItemText}>{title}</Text>
      </View>
      <Image
        source={require('../../assets/images/rightArrow.png')}
        style={styles.chevron}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  moreIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  menuItemText: {
    fontFamily: typography.regular,
    fontSize: 16,
    color: colors.black,
    width: '90%',
  },
  chevron: {
    width: 10,
    height: 18,
    tintColor: colors.darkGray,
  },
});

export default MenuItem;