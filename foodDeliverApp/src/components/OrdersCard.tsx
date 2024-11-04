import { StyleSheet, TouchableOpacity, Image, Text, View } from "react-native";
import { Order } from "../types";
import { colors, typography } from "../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";

export const OrdersCard: React.FC<{ order: Order }> = ({ order }) => {

  // console.log("orderrsssss", order)
  const navigation = useNavigation() as any;

  // console.log("all images", order)

  const handlePress = () => {
    navigation.navigate("OrderSummary", { order });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.orderItem}>
      <Image source={{uri:order.imageUrl}} style={styles.orderImage} />
      <View style={styles.orderDetails}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.orderId}>
          Order ID: {order.orderId}
        </Text>
        <Text style={styles.orderPrice}>Rs  {order.price.toFixed(2)}</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Image
              key={star}
              source={require("../assets/images/star.png")}
              style={[
                styles.starIcon,
                star > order.rating && styles.starIconInactive,
              ]}
            />
          ))}
        </View>
      </View>
      <View style={styles.orderStatusContainer}>
        
        <Text style={[styles.orderStatus, styles[`orderStatus${order.status}`]]}>
          {order.status}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderImage: {
    width: 105,
    height: 75,
    borderRadius: 8,
  },
  orderDetails: {
    flex: 1,
    marginLeft: 10,
  },
  orderId: {
    fontFamily: typography.robotoRegular,
    fontSize: 12,
    color: colors.darkGray,
  },
  orderPrice: {
    fontFamily: typography.bold,
    fontSize: 16,
    color: colors.primary,
    marginVertical: 4,
  },
  ratingContainer: {
    flexDirection: "row",
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 2,
  },
  starIconInactive: {
    opacity: 0.3,
  },
  orderStatusContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
  },
  orderStatus: {
    fontFamily: typography.robotoRegular,
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    fontWeight: "500",
    overflow: "hidden",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#E9EAEB",
    textTransform:'capitalize'
  },
  orderStatusactive: {
    color: colors.primary,
  },
  orderStatuscomplete: {
    color: "green",
  },
  orderStatuscancel: {
    color: "gray",
  },
});
