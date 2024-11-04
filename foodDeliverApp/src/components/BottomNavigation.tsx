import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../styles/globalStyles';
import { useSelector } from 'react-redux';
import { CartState } from '../redux/slices/cartSlice';


const tabs = [
  { name: 'NEAR ME', icon: 'map-marker' },
  { name: 'EXPLORE', icon: 'magnify' },
  { name: 'CART', icon: 'basket' },
  { name: 'ACCOUNT', icon: 'account' },
];

const CartBadge: React.FC<{ count: number }> = ({ count }) => {
  if (count === 0) return null;
  
  return (
    <View style={styles.badgeContainer}>
      <Text style={styles.badgeText}>
        {count > 99 ? '99+' : count}
      </Text>
    </View>
  );
};

const BottomNavigation: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const cartItems = useSelector((state: { cart: CartState }) => state.cart.items);
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const tab = tabs.find(t => t.name === route.name);

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tabButton}
          >
            <View style={styles.iconContainer}>
              <Icon
                name={tab?.icon || 'circle'}
                size={24}
                color={isFocused ? colors.black : colors.gray}
              />
              {route.name === 'CART' && <CartBadge count={cartItemsCount} />}
            </View>
            <Text style={[styles.tabText, { color: isFocused ? colors.black : colors.gray}]}>
              {label.toString()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingBottom: 5,
    paddingTop: 5,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
  },
  iconContainer: {
    position: 'relative',
  },
  badgeContainer: {
    position: 'absolute',
    top: -8,
    right: -12,
    backgroundColor: colors.primary || '#ff0000',
    borderRadius: 12,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default BottomNavigation;