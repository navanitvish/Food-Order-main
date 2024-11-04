import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SpinnerLoader from './SppinerLoader';

interface OptimizedFastImageProps {
  uri: string;
  style?: any;
}

const OptimizedImage: React.FC<OptimizedFastImageProps> = ({ uri, style }) => {
  const [cachedUri, setCachedUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCachedImage = async () => {
      try {
        const cached = await AsyncStorage.getItem(uri);
        if (cached) {
          setCachedUri(cached);
          setIsLoading(false);
        } else {
          // If not in cache, load and cache the image
          const response = await fetch(uri);
          const blob = await response.blob();
          const reader = new FileReader();
          reader.onload = async () => {
            const base64data = reader.result as string;
            await AsyncStorage.setItem(uri, base64data);
            setCachedUri(base64data);
            setIsLoading(false);
          };
          reader.readAsDataURL(blob);
        }
      } catch (error) {
        console.error('Error caching image:', error);
        setIsLoading(false);
      }
    };

    getCachedImage();
  }, [uri]);

  const imageStyle = {
    width: '40%',
    height: '40%',
    marginBottom: 4,
    ...style,
  };

  if (isLoading) {
    return (
     <SpinnerLoader size='xs'/>
    );
  }

  return (
    <FastImage
      source={{ 
        uri: cachedUri || uri,
        priority: FastImage.priority.normal,
      }}
      style={imageStyle}
      resizeMode={FastImage.resizeMode.contain}
    />
  );
};

const styles = StyleSheet.create({
  placeholderImage: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
});

export default OptimizedImage;