import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import BackButton from '../../components/common/BackButton';
import Header from '../../components/common/Header';

const AboutAppScreen = ({ navigation }:any) => {
  return (
    <SafeAreaView style={styles.container}>
    
      <Header title='About App'/>
      <View style={styles.content}>
        <Image
          source={require('../../assets/images/BigLogo.png')} // Replace with actual path
          style={styles.logo}
        />
        <Text style={styles.appName}>SPEEDY CHOW</Text>
        <Text style={styles.version}>Version 2.1.0</Text>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Other Apps</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>www.speedychow.com</Text>
        <Text style={styles.footerText}>Copyright © 2024 David (Vuong Huu Thien).</Text>
        <Text style={styles.footerText}>All rights reserved.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    fontSize: 24,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 233,
    height: 178,
    marginBottom: 20,
    resizeMode:'contain'
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3e4532',
    marginBottom: 8,
  },
  version: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#3e4532',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    padding: 16,
  },
  footerText: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
  },
});

export default AboutAppScreen;