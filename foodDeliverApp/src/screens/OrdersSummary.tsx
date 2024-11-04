import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  TextInput
} from "react-native";
import { CartItem, Order } from "../types";
import { colors, typography } from "../styles/globalStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "../components/common/Header";
import { CartItemComponent } from "../components/common/CartItemComponent";
import { foodService } from '../api/services/foodService';


export const OrdersSummaryScreen: React.FC<any> = () => {
  const route = useRoute() as any;
  const order = route.params?.order as Order;
  const navigation= useNavigation() as any;
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [subtotal] = useState<number>(31.50);
  const [deliveryFee] = useState<number>(0);
  const [discount] = useState<number>(6.30);
  const [rating, setRating] = useState(order.rating);
  const [details, setDetails] = useState<any>()
  console.log("dtails", details)
  const [totalPrice] = useState<number>(25.20); // subtotal - discount
  // New state for review data



  const fetchOrderById = async () => {
    try {
      const response = await foodService.getOrderById(order?.id)
      console.log("order id is", order?.id)
      console.log("******************",response?.data?.data, "responsedfxhbgfhjghvjkh*****************")
      if(response?.data){
 
        const detailsData={
          address:response?.data?.data?.address,
          coupon:response?.data?.data?.coupon,
          totalAmount:response?.data?.data?.totalAmount,
          userId:response?.data?.data?.userId?._id
        }
        setDetails(detailsData)

        const formattedData= response?.data?.data?.items?.map((d:any)=> ({
          id: d?.menuItemId?._id,
          name: d?.menuItemId?.name,
          image: d?.menuItemId?.image,
          originalPrice: d.totalprice,
          discountedPrice: 4.5,
          quantity: d.quantity,
          addOns: d?.menuItemId?.additionalOption,
          address:order.address,
          coupon:order.coupon,
      
        }))

        console.log("formatted prices", formattedData)
        if(formattedData){
          setCartData(formattedData)
        }

      
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(()=>{
    fetchOrderById()

  },[order?.id])

 

  const renderTotalStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <Image
            source={
              i <= rating
                ? require('../assets/images/star.png')
                : require('../assets/images/EmptyStar.png')
            }
            style={styles.starIcon}
          />
        </TouchableOpacity>,
      );
    }
    return stars;
  };
  const renderButton = () => {
    switch (order.status) {
      case 'active':
        return (
          <>
            <TouchableOpacity style={styles.cancelButton}  onPress={() => navigation.navigate('CancelOrder')}>
              <Text style={styles.cancelButtonText}>Cancel Order</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.trackButton} >
              <Text style={styles.buttonText}>Track Order</Text>
            </TouchableOpacity>
          </>
        );
      case 'complete':
        return (
          <TouchableOpacity style={styles.reorderButton} >
            <View style={{flexDirection:'row', gap:8, justifyContent:'center', alignItems:'center'}}>
            <Image
                source={require('../assets/images/basketFill.png')}
                style={{height: 20, width: 20, resizeMode:'contain'}}
              />
            <Text style={styles.buttonText}>Reorder</Text>
            </View>
          </TouchableOpacity>
        );
      case 'cancel':
        return (
          <TouchableOpacity style={styles.reorderButton} >
            <Text style={styles.buttonText}>Reorder</Text>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };


  return (
    <SafeAreaView style={styles.safeArea}>
        <Header title="Order Details" showMoreIcon/>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.container}>
          <View style={styles.itemNameContainer}>
            <Text style={styles.orderSummary}>Order Summary</Text>
            <View style={styles.orderStatusContainer}>
              <Text style={[styles.orderStatus, styles[`orderStatus${order.status}`]]}>
                {order.status}
              </Text>
            </View>
          </View>

          {cartData.map(item => (
            <CartItemComponent 
              key={item.id} 
              item={item} 
              editable={false}
              orderStatus={order.status}
              quantity={item.quantity}  
              userId={details?.userId}         
            />
          ))}

          <View style={styles.paymentContainer}>
            <View style={styles.selectContainer}>
              <Image
                source={require('../assets/images/locationRed.png')}
                style={styles.paymentIcon}
              />
              <View style={styles.paymentMethodContainer}>
                <Text style={styles.paymentText}>Deliver to</Text>
              </View>
            </View>
            {details?.address ? (
          <Text style={styles.selectedText}>{details?.address}</Text>
        ) : (
          <Text style={styles.select}>Select Your Location</Text>
          
        )}
          </View>

          <TouchableOpacity style={styles.paymentContainer}>
            <View style={styles.selectContainer}>
              <Image
                source={require('../assets/images/wallet.png')}
                style={styles.paymentIcon}
              />
              <View style={styles.paymentMethodContainer}>
                <Text style={styles.paymentText}>Payment method</Text>
              </View>
            </View>
            <Text style={styles.select}>Select Payment Method</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.paymentContainer}>
            <View style={styles.selectContainer}>
              <Image
                source={require('../assets/images/ticketSale.png')}
                style={styles.paymentIcon}
              />
              <View style={styles.paymentMethodContainer}>
                <Text style={styles.paymentText}>Promotions</Text>
              </View>
            </View>
            <Text style={styles.select}>Select Your Discounts</Text>
          </TouchableOpacity>

          <View style={styles.orderSummaryContainer}>
            <View style={styles.summaryRow}>
              {/* <Text style={styles.summaryText}>Subtotal</Text>
              <Text style={styles.summaryValue}>Rs  {subtotal.toFixed(2)}</Text> */}
            </View>
            <View style={styles.summaryRow}>
              {/* <Text style={styles.summaryText}>Delivery Fee</Text>
              <Text style={styles.freeText}>FREE</Text> */}
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Discount</Text>
              {/* <Text style={styles.discountText}>- Rs  {discount.toFixed(2)}</Text> */}
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalValue}>Rs  {details?.totalAmount}</Text>
            </View>
          </View>
       {/* {
        order?.status==='complete' &&(
          <View>
          <View style={styles.ratingContainer}>
             {renderTotalStars()}
           </View>
           <View style={styles.reviewContainer}>
           <TextInput
             style={styles.reviewInput}
             placeholder="Type your review ..."
             
             // onChangeText={setReview}
             multiline
           />
         <TouchableOpacity style={styles.submitReviewButton}>
           <Text style={styles.submitReviewButtonText}>Submit</Text>
         </TouchableOpacity>
         </View>
 
          </View>
        )
       } */}
        </View>
        </ScrollView>
      <View style={styles.bottomNavigationContainer}>
        <View style={styles.bottomNavigation}>
        <View style={styles.buttonContainer}>
          {renderButton()}
        </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContainer: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 80, 
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  itemNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 15,
  },
  orderSummary: {
    fontSize: 18,
    color: colors.black,
    // marginBottom: 15,
  },
  orderStatusContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
  },
  orderStatus: {
    fontFamily: typography.robotoRegular,
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    fontWeight: '500',
    overflow: 'hidden',
    textAlign: 'center',
  },
  orderStatusactive: {
    color: colors.primary,
    borderWidth: 1,        
    borderColor: '#E9EAEB', 
  },
  orderStatuscomplete: {
    color: 'green',
    borderWidth: 1,        
    borderColor: '#E9EAEB', 
  },
  orderStatuscancel: {
    color: 'gray',
    borderWidth: 1,        
    borderColor: '#E9EAEB', 
  },
  paymentContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#E9EAEB',
  },
  selectContainer: {
    flexDirection: 'row',
  },
  paymentIcon: {
    width: 17,
    height: 14,
  },
  paymentMethodContainer: {
    flex: 1,
    marginLeft: 10,
  },
  paymentText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
  select: {
    color: '#BABDC1',
    fontSize: 16,
    fontWeight: '600',
  },
  orderSummaryContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    color: '#333',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  freeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  discountText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 10,
    marginTop: 5,
  },
  totalText: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.black,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  selectedText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
  // select: {
  //   color: '#BABDC1',
  //   fontSize: 16,
  //   fontWeight: '600',
  // },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  starIcon: {
    width: 50,
    height: 50,
    marginHorizontal: 2,
  },
  bottomNavigationContainer: {
    position: 'absolute',
    bottom: 18,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 20,
    height: 77,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: colors.white,
    paddingVertical: 15,
    paddingHorizontal: 25,
    // borderRadius: 30,
    // borderWidth: 1,
    borderColor: colors.gray,
  },
  trackButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 30,
  },
  reorderButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 30,
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '600',
    textAlign: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: colors.gray,
    fontWeight: '600',
  },
  reviewContainer: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  reviewInput: {
    backgroundColor: '#1F2A370D',
    borderRadius: 8,
    padding: 10,
    minHeight: 153, // Adjust the value as needed
    textAlignVertical: 'top',
    color: colors.black,
  },
  submitReviewButtonConatiner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  submitReviewButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  submitReviewButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },

});