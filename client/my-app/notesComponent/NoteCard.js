import { useContext, useState } from 'react';
import axios from 'axios'
import {View, Text, StyleSheet, TextInput, TouchableHighlight, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GLOBALCONTEXT from '../components/GlobalContext';

function NoteCard({infos}) {
  
    const {_id, header , date, comment} = infos;
    const navigation = useNavigation()

    const showMore = () => {
        navigation.navigate('noteDetails', infos)
    }

    const formattedDate = new Date(date).toLocaleDateString();
     return (
        <SafeAreaView style={styles.info}> 
            <Text style={styles.header}>{header}</Text>
            <Text style={styles.date}>{formattedDate}</Text>
          
           

            <TouchableHighlight onPress={showMore} style={styles.button}>
                <Text style={styles.buttonText}>show more</Text>
            </TouchableHighlight>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent:'center'
  },

  date: {
    fontSize: 20,
    color: '#888',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignSelf: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
},


  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 40,
    marginVertical: 10,
    padding: 100,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    width: 500
   

  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
export default NoteCard