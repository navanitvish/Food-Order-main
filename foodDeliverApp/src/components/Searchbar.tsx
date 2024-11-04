import React from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors, typography } from '../styles/globalStyles';

interface ISearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress?: () => void;
}

const SearchBar: React.FC<ISearchBarProps> = ({ value, onChangeText, onFilterPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchInputContainer}>
        <Image source={require('../assets/images/Magnifer.png')} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={colors.gray}
          value={value}
          onChangeText={onChangeText}
        />

        <TouchableOpacity style={styles.iconButton} onPress={onFilterPress}>
          <Image source={require('../assets/images/filter.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9EAEB',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: typography.robotoRegular,
    fontSize: 16,
    color: colors.black,
    backgroundColor: '#E9EAEB',
  },
  iconButton: {
    padding: 8,
  },
  icon: {
    width: 21,
    height: 18,
  },
});

export default SearchBar;