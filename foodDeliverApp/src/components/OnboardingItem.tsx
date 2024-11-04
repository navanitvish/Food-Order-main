import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';

const { width } = Dimensions.get('window');

interface OnboardingItemProps {
  item: {
    title: string;
    description: string;
    image: any; 
  };
}

const OnboardingItem: React.FC<OnboardingItemProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      {/* <View style={styles.imageContainer}> */}
        <Image source={item.image} style={styles.image} />
      {/* </View> */}
      <View style={styles.textContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>

      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 335,
    height: 230,
    resizeMode: 'contain',
  },
  title: {
    ...globalStyles.title,
    fontSize: 22,
    marginBottom: 10,
    color:'#3e4532',
    fontWeight:'bold'
  },
  textContainer:{
    marginTop:120
  },
  description: {
    textAlign: 'center',
    color: colors.primary,
    fontSize:18,
  },
});

export default OnboardingItem;
