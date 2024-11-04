import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions, StyleSheet } from 'react-native';
import { Grayscale } from 'react-native-color-matrix-image-filters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, textStyles } from '../styles/globalStyles';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.55;

interface Category {
  _id: string;
  name: string;
  image: string;
  type: string;
}

interface MenuItem {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  category: Category;
  specialOffer: boolean;
  specialOfferPrice?: number;
}

interface CartItem extends MenuItem {
  quantity: number;
}

interface ItemRecommendedSliderProps {
  items: MenuItem[];
  isOpenRestraunt: boolean;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  cart: {
    items: CartItem[];
    subtotal: number;
  };
}

const ItemRecommendedSlider: React.FC<ItemRecommendedSliderProps> = ({
  items,
  isOpenRestraunt,
  addToCart,
  removeFromCart,
  cart,
}) => {
  const renderItem = ({ item }: { item: MenuItem }) => {
    const itemInCart = cart.items.find(cartItem => cartItem._id === item._id);
    const itemCount = itemInCart ? itemInCart.quantity : 0;

    return (
  <View style={styles.whiteCardContainer}>
        <View style={styles.itemContainer}>
        {isOpenRestraunt ? (
          <Image 
            source={{ uri: item.image }}
            style={styles.itemImage}
            resizeMode="cover"
          />
        ) : (
          <Grayscale>
            <Image 
              source={{ uri: item.image }}
              style={[styles.itemImage, styles.grayedImage]}
              resizeMode="cover"
            />
          </Grayscale>
        )}

        <View style={styles.recommendedBadgeContainer}>
          <Icon
            name="fiber-manual-record"
            size={8}
            color={isOpenRestraunt ? 'red' : colors.gray}
          />
          <Text style={[
            styles.recommendedText,
            !isOpenRestraunt && styles.grayedText
          ]}>
            Recommended
          </Text>
        </View>

        <Text style={[
          styles.itemName,
          !isOpenRestraunt && styles.grayedText
        ]}>
          {item.name}
        </Text>

        <Text style={[
          styles.itemPrice,
          !isOpenRestraunt && styles.grayedText
        ]}>
          ₹{item.price}
        </Text>

     <View style={styles.outerContainer}>
     {isOpenRestraunt && (
          itemCount > 0 ? (
            <View style={styles.itemCountContainer}>
              <TouchableOpacity
                onPress={() => removeFromCart(item._id)}
                style={styles.countButton}>
                <Icon name="remove" size={20} color={colors.lightGreen} />
              </TouchableOpacity>
              <Text style={styles.itemCountText}>{itemCount}</Text>
              <TouchableOpacity
                onPress={() => addToCart(item)}
                style={styles.countButton}>
                <Icon name="add" size={20} color={colors.lightGreen} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addToCart(item)}>
              <Text style={[textStyles.medium, { color: colors.lightGreen }]}>
                ADD
              </Text>
            </TouchableOpacity>
          )
        )}
     </View>
      </View>
  </View>
    );
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={[
        styles.headerText,
        !isOpenRestraunt && styles.grayedText
      ]}>
        RECOMMENDED
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        snapToInterval={ITEM_WIDTH + 16}
        decelerationRate="fast"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: colors.bgGray,
    gap: 8,
  },
  whiteCardContainer: {
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 20,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android shadow
    elevation: 3,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fdfcfe',
    marginBottom: 16,
    marginTop: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    textTransform: 'uppercase',
  },
  itemContainer: {
    width: ITEM_WIDTH,
    // marginRight: 16,
    // marginBottom: 16,
    padding: 4,
  },
  itemImage: {
    width: '100%',
    height: 150,
    resizeMode:'contain',
    borderRadius: 8,
    marginBottom: 8,
  },
  grayedImage: {
    opacity: 0.5,
  },
  recommendedBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  recommendedText: {
    marginLeft: 4,
    fontSize: 12,
    color: colors.black,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.black,
        textTransform:'capitalize',
    marginVertical: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
  grayedText: {
    color: colors.gray,
    textTransform:'capitalize'
  },
  listContainer: {
    paddingLeft: 16,
    gap:22
  },
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',  // Add this
    marginBottom: 8,
  },


  itemCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.lightGreen,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 8,
    width: 100,
  },
  countButton: {
    padding: 4,
  },
  itemCountText: {
    ...textStyles.medium,
    color: colors.lightGreen,
  },
  addButton: {
    borderWidth: 1,
    borderColor: colors.lightGreen,
    borderRadius: 4,
    paddingVertical: 6,
    alignItems: 'center',
    marginTop: 8,
    width: 100,
  },
});

export default ItemRecommendedSlider;