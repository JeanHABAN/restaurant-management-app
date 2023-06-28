import { useContext, useState } from 'react';
import axios from 'axios'
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native';

function NoteDetails({ route }) {
    const { _id, header, date, comment } = route.params;

    const formattedDate = new Date(date).toLocaleDateString();
    return (
        <View style={styles.card}>
            <Text style={styles.header}>{header}</Text>
            <Text style={styles.date}>{formattedDate}</Text>
            <Text style={styles.comment}>{comment}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
 
    card: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    
    },
    header: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    date: {
      fontSize: 20,
      color: '#888',
      marginBottom: 8,
    },
    comment: {
      fontSize: 16,
    },
  });
export default NoteDetails;