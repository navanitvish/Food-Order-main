import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { colors } from '../styles/globalStyles';

interface Message {
  id: string;
  name: string;
  message: string;
  time: string;
  avatar: any;
}

interface MessageItemProps {
  item: Message;
}

interface MessageListProps {
  messages: Message[];
}

const MessageItem: React.FC<MessageItemProps> = ({ item }) => (
  <View style={styles.messageItem}>
    <Image source={item.avatar} style={styles.avatar} />
    <View style={styles.messageContent}>
      <View style={styles.nameTimeContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <Text style={styles.message}>{item.message}</Text>
    </View>
  </View>
);

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => <MessageItem item={item} />}
      keyExtractor={item => item.id}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageItem: {
    flexDirection: 'row',
    padding: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  messageContent: {
    flex: 1,
  },
  nameTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color:colors.black
  },
  time: {
    color: '#888',
    fontSize: 12,
  },
  message: {
    fontSize: 14,
    color: '#333',
  },
});

export default MessageList;