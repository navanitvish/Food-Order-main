import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';
import { colors, globalStyles } from '../styles/globalStyles';
import BackButton from '../components/common/BackButton';
import { useNavigation } from '@react-navigation/native';
import CustomCountryPicker from '../components/CountryPicker';
import { Dropdown } from 'react-native-element-dropdown';
import { userService } from '../api/services/userService';
import Toast from 'react-native-toast-message';

type ProfileData = {
  phoneNumber: string;
  email: string;
  name: string;
  dateOfBirth: Date | null;
  gender: string;
  location: string;
  profileImage: string | null;
};

type InputFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  icon?: React.ReactNode;
  error?: string;
};

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChangeText,
  placeholder,
  icon,
  error,
}) => (
  <View>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.gray}
      />
      {icon && <View style={styles.iconContainer}>{icon}</View>}
    </View>
    {error ? <Text style={styles.errorText}>{error}</Text> : null}
  </View>
);

const data = [
  { label: 'Male', value: '1' },
  { label: 'Female', value: '2' },
  { label: 'Other', value: '3' },
];

const ProfilePage: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    phoneNumber: '',
    email: '',
    name: '',
    dateOfBirth: null,
    gender: '',
    location: '',
    profileImage: null,
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({
    name: 'United States',
    callingCode: ['1'],
    cca2: 'US',
    flag: '',
  });
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [errors, setErrors] = useState({
    phoneNumber: '',
    email: '',
    name: '',
    dateOfBirth: '',
    gender: '',
    location: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    field: keyof ProfileData,
    value: string | Date | null,
  ) => {
    setProfileData(prevData => ({ ...prevData, [field]: value }));
    if (isSubmitted) {
      setErrors(prev => ({ ...prev, [field]: validateField(field, value) }));
    }
  };
  const navigation = useNavigation() as any;

  const handleImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets[0].uri) {
        setProfileData(prevData => ({
          ...prevData,
          profileImage: (response.assets && response.assets[0]?.uri) || null,
        }));
      }
    });
  };

  const validateField = (field: string, value: string | Date | null) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return `${field} is required`;
    }
    return '';
  };

  const validateForm = () => {
    const newErrors = {
      phoneNumber: validateField('Phone Number', phoneNumber),
      email: validateField('Email', profileData.email),
      name: validateField('Name', profileData.name),
      dateOfBirth: validateField('Date of Birth', profileData.dateOfBirth),
      gender: validateField('Gender', profileData.gender),
      location: validateField('Location', profileData.location),
    };
    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  const handleUpdateProfile = async () => {
    setIsSubmitted(true);
    if (validateForm()) {
      try {
        const updateData = {
          name: profileData.name,
          mobile: Number(phoneNumber), // Convert to number as per the specified format
          email: profileData.email,
          avatar: profileData.profileImage || '',
          dob: profileData.dateOfBirth ? profileData.dateOfBirth.toISOString().split('T')[0] : '',
          gender: profileData.gender,
          address: profileData.location
        };
  
        console.log('Update Data:', updateData);
  
        const response = await userService.updateProfile(updateData);
        if (response.data.success) {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Profile updated successfully',
          });
          setTimeout(() => {
            navigation.navigate('MainApp');
          }, 1000);
          // navigation.navigate('MainApp');
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: response.data.message || 'Failed to update profile',
          });
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'An error occurred while updating your profile',
        });
      }
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await userService.getProfile();
      console.log('Profile Response:', response.data);
      if (response.data.success) {
        const profileData = response.data.data;
        setProfileData(prevData => ({
          ...prevData,
          name: profileData.name || '',
          email: profileData.email || '',
        }));
        setPhoneNumber(profileData.mobile);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to fetch user profile',
        });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred while fetching your profile',
      });
    }
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.profileContainer}>
          <View style={styles.backButtonContainer}>
            <BackButton />
          </View>
          <Text style={styles.title}>Your Profile</Text>
        </View>

        <View style={styles.profileImageContainer}>
          <View style={styles.imageWrapper}>
            <TouchableOpacity onPress={handleImagePicker}>
              {profileData.profileImage ? (
                <Image
                  source={{ uri: profileData.profileImage }}
                  style={styles.profileImage}
                />
              ) : (
                <Image
                  source={require('../assets/images/ProfileAvatar.png')}
                  style={styles.profileImage}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleImagePicker}>
              <Image
                source={require('../assets/images/pencil.png')}
                style={styles.pencilIconImage}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formContainer}>
          <CustomCountryPicker
            phoneNumber={phoneNumber}
            selectedCountry={selectedCountry}
            onSelectCountry={setSelectedCountry}
            onPhoneNumberChange={(value) => {
              setPhoneNumber(value);
              if (isSubmitted) {
                setErrors(prev => ({ ...prev, phoneNumber: validateField('Phone Number', value) }));
              }
            }}
          />
          {isSubmitted && errors.phoneNumber ? (
            <Text style={styles.errorText}>{errors.phoneNumber}</Text>
          ) : null}

          <InputField
            value={profileData.email}
            onChangeText={value => handleInputChange('email', value)}
            placeholder="Email"
            error={isSubmitted ? errors.email : ''}
          />

          <InputField
            value={profileData.name}
            onChangeText={value => handleInputChange('name', value)}
            placeholder="Name"
            error={isSubmitted ? errors.name : ''}
          />

          <TouchableOpacity onPress={() => setDatePickerOpen(true)}>
            <InputField
              value={
                profileData.dateOfBirth
                  ? profileData.dateOfBirth.toLocaleDateString()
                  : ''
              }
              onChangeText={() => { }}
              placeholder="Date of Birth"
              icon={
                <Image
                  source={require('../assets/images/calendar.png')}
                  style={styles.iconImage}
                />
              }
              error={isSubmitted ? errors.dateOfBirth : ''}
            />
          </TouchableOpacity>

          <DatePicker
            modal
            open={datePickerOpen}
            date={profileData.dateOfBirth || new Date()}
            onConfirm={date => {
              setDatePickerOpen(false);
              handleInputChange('dateOfBirth', date);
            }}
            onCancel={() => {
              setDatePickerOpen(false);
            }}
          />

          <View style={styles.pickerContainer}>
            <Dropdown
              style={styles.dropdown}
              data={data}
              labelField="label"
              valueField="value"
              placeholder="Gender"
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              value={profileData.gender}
              onChange={item => handleInputChange('gender', item.label)}
            />
          </View>
          {isSubmitted && errors.gender ? (
            <Text style={styles.errorText}>{errors.gender}</Text>
          ) : null}

          <InputField
            value={profileData.location}
            onChangeText={value => handleInputChange('location', value)}
            placeholder="Your Location"
            icon={
              <Image
                source={require('../assets/images/locationInput.png')}
                style={styles.locationImage}
              />
            }
            error={isSubmitted ? errors.location : ''}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleUpdateProfile}
            style={[globalStyles.button, styles.continueButton]}>
            <Text style={globalStyles.buttonText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MainApp')}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 50,
  },
  profileContainer: {
    marginTop: Platform.OS === 'ios' ? 60 : 40,
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  backButtonContainer: {
    position: 'absolute',
    left: 0,
    top: Platform.OS === 'ios' ? -10 : 0,
  },
  title: {
    ...globalStyles.title,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageWrapper: {
    position: 'relative',
    width: 120,
    height: 120,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    backgroundColor: colors.inputBg,
  },
  pencilIconImage: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
  editButton: {
    position: 'absolute',
    right: -10,
    bottom: -10,
    backgroundColor: colors.primary,
    borderRadius: 20,
    width: 36,
    height: 36,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    borderRadius: 8,
    marginBottom: 10,
    height: 50,
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
  },
  iconContainer: {
    padding: 10,
  },
  iconImage: {
    width: 24,
    height: 24,
  },
  locationImage: {
    width: 17,
    height: 21,
  },
  pickerContainer: {
    backgroundColor: colors.inputBg,
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  buttonContainer: {
    marginTop: 20,
  },
  continueButton: {
    marginBottom: 10,
  },
  skipText: {
    ...globalStyles.subtitle,
    color: colors.darkGray,
    textAlign: 'center',
  },
  dropdown: {
    padding: 15,
  },
  placeholderStyle: {
    color: colors.gray,
  },
  selectedTextStyle: {
    color: colors.black,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -5,
    marginBottom: 10,
  },
});

export default ProfilePage;