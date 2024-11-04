import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  SafeAreaView,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { colors, typography, globalStyles } from '../styles/globalStyles';

import { Order } from '../types';
import { foodService } from '../api/services/foodService';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

function timeAgo(date:any) {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };

  for (let [key, value] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / value);
    if (interval >= 1) {
      return `${interval} ${key}${interval > 1 ? 's' : ''} ago`;
    }
  }

  return "just now";
}

const OrdersScreen: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  console.log("rorders", orders)
  const navigation = useNavigation() as any;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await foodService.getOrdersByStatus();
      
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        // Sort the orders by createdAt in descending order
        const sortedOrders = response.data.data.sort((a:any, b:any) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        
        setOrders(sortedOrders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const renderOrderItem = ({ item }: { item: any }) => (
    <View style={styles.orderCard}>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          {item.orderStatus === 'complete' ? 'Delivered' : 
           item.orderStatus === 'cancel' ? 'Cancelled' : 
           'Payment Failed'}
        </Text>
      </View>

      <Text style={styles.orderDate}>{timeAgo(item?.createdAt)}</Text>
      <Text style={styles.restaurantName}>
        {typeof item.restaurant === 'string' ? item.restaurant : item.restaurant.name}
      </Text>
      
      {item.items && item.items.map((orderItem: any, index: number) => (
        <View key={index} style={styles.orderItem}>
          <Text style={styles.itemQuantity}>x{orderItem.quantity}</Text>
          <Text style={styles.itemName}>
            {orderItem.menuItemId && typeof orderItem.menuItemId === 'object'
              ? orderItem.menuItemId.name
              : orderItem.menuItemId}
          </Text>
          <Text style={styles.itemPrice}>₹{orderItem.price}</Text>
        </View>
      ))}

      <View style={styles.orderFooter}>
        <View style={styles.couponContainer}>
          <Text style={styles.couponLabel}>Coupon:</Text>
          <Text style={styles.couponValue}>{item.coupon?.couponcode ? item.coupon?.couponcode : 'N/A'}</Text>
        </View>
        <View style={styles.chargesContainer}>
          <Text style={styles.chargesLabel}>Delivery Charges:</Text>
          <Text style={styles.chargesValue}>₹{(item.totalAmount * 0.1).toFixed(2)}</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>₹{item.totalAmount}</Text>
        </View>
      </View>

      <View style={styles.paymentInfo}>
        <View style={{ flex:1, flexDirection:'row', justifyContent:'space-between'}}>
    
        <Text style={styles.paymentMode}>Payment Mode: </Text>
        <Text style={styles.paymentMode}>{item.payment || 'N/A'}</Text>

        </View>
        <Text numberOfLines={1} style={styles.address}>{item.address}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Icon name="arrow-back" size={24} color={colors.black} />
            <Text style={{fontSize:18, color:colors.black}}>MY ORDERS</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.rightheader}>
          <TouchableOpacity>
            <Icon name="home" size={24} color={colors.black} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.orderList}
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
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  rightheader: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.bgGray,
  },
  orderList: {
    padding: 16,
  },
  orderCard: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  statusContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: colors.lightGray,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    ...globalStyles.text,
    fontSize: 12,
    color: colors.darkGray,
  },
  orderDate: {
    ...globalStyles.text,
    fontSize: 14,
    color: colors.darkGray,
    marginBottom: 8,
  },
  restaurantName: {
    ...globalStyles.subheading,
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemQuantity: {
    ...globalStyles.text,
    width: 30,
    color: colors.black,
  },
  itemName: {
    ...globalStyles.text,
    flex: 1,
    color: colors.black,
    textTransform: 'capitalize',
  },
  itemPrice: {
    ...globalStyles.text,
    textAlign: 'right',
    color: colors.black,
  },
  orderFooter: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    paddingTop: 16,
  },
  couponContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  couponLabel: {
    ...globalStyles.text,
    color: colors.black,
  },
  couponValue: {
    ...globalStyles.text,
    color: colors.black,
  },
  chargesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  chargesLabel: {
    ...globalStyles.text,
    color: colors.darkGray,
  },
  chargesValue: {
    ...globalStyles.text,
    color: colors.black,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  totalLabel: {
    ...globalStyles.subheading,
    color: colors.black,
  },
  totalValue: {
    ...globalStyles.subheading,
    color: colors.black,
  },
  paymentInfo: {
    marginTop: 16,
  },
  paymentMode: {
    ...globalStyles.text,
    marginBottom: 4,
    color: colors.black,
  },
  address: {
    ...globalStyles.text,
    color: colors.gray,
    fontSize: 12,
  },
});

export default OrdersScreen;