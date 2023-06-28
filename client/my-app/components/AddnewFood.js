import { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import GLOBALCONTEXT from './GlobalContext';


export const AddNewFood = ({ navigation }) => {

  const { addItem, state} = useContext(GLOBALCONTEXT)
  const [input, setInput] = useState({ name: '', price: '', image: '', origin: '' })

  

  const onAddItem = async () => {
    try {
      if (state.email) {

        const res = await axios.put(`http://localhost:4000/users/${state.email}/foods`, input, {
          headers: {
            Authorization: `Bearer ${state.token}`
          }
        })
     
        if (res) {   
          
          addItem(res.data.data)
      
          navigation.navigate('itemsList')
        } else {
          console.log('Failed to add item');
        }
      }

    } catch (error) {
      console.log(error)
    }
  }



  return (
    <View style={styles.container}>
      <TextInput
        placeholder='name of item'
        style={styles.input}
        value={input.name}
        onChangeText={text => setInput({ ...input, name: text })}
      />
      <TextInput
        placeholder='price'
        style={styles.input}
        value={input.price}
        onChangeText={val => setInput({ ...input, price: val })}
      />
      <TextInput
        placeholder='image'
        style={styles.input}
        value={input.image}
        onChangeText={imageLink => setInput({ ...input, image: imageLink })}
      />
      <TextInput
        placeholder='origin'
        style={styles.input}
        value={input.origin}
        onChangeText={text => setInput({ ...input, origin: text })}
      />
      <TouchableHighlight style={styles.button} onPress={onAddItem}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: '100%'
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5
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

});