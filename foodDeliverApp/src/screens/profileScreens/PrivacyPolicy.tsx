import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView ,Text} from 'react-native';
import { colors, globalStyles } from '../../styles/globalStyles';
import Header from '../../components/common/Header';


const loremIpsumText = [
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
  ];
  

const PrivacyPolicyScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
        <Header title='Privacy Policy'/>
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
        {loremIpsumText.map((paragraph, index) => (
        <View key={index} style={styles.paragraphContainer}>
          <Text style={styles.text}>{paragraph}</Text>
        </View>
      ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.white,
    },
    container: {
      flex: 1,
    },
    contentContainer: {
      padding: 20,
    },
    paragraphContainer: {
        marginBottom: 16,
        color:colors.black
      },
      text: {
        fontSize: 16,
        lineHeight: 24,
        color:colors.black
      },
  });

  export default PrivacyPolicyScreen;