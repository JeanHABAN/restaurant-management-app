import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GLOBALCONTEXT from './GlobalContext';
import { useContext } from 'react';
import axios from 'axios';

export const Item = ({ foods }) => {

  const { deleteItem, state } = useContext(GLOBALCONTEXT)
  const {_id, name, price, date, image, origin } = foods;



  const navigation = useNavigation();

  ////naviagte to food details after click view button
  const ItemDetails = () => {
    navigation.navigate('itemDetails', foods)
  }

  ////navigate to edit form after toggle edit button
  const editItem = () => {
    navigation.navigate('editItem',  {
      _id: _id,
      name: name,
      price: price,
      image: image,
      origin: origin,
      date:date
    });
  }

 
  const onDelete = async () => {
    try {
      if (state.email && foods._id) {
        console.log('Deleting food item:', foods._id);
        const res = await axios.delete(`http://localhost:4000/users/${state.email}/foods/${foods._id}`,{
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.token}`,
          },
        });
        console.log('Delete response:', res.data);
  
        if (res.data.success) {
          await deleteItem(foods._id);
          console.log('Food item deleted successfully');
        } else {
          console.log('Deleting failed:', res.data.message);
        }
      } else {
        console.log('Missing email or food ID');
      }
    } catch (error) {
      console.log('Error deleting food item:', error);
    }
  };
  
  const formattedDate = new Date(date).toLocaleDateString();
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.title}>Name: {name}</Text>
        <Image source={{ uri: image }} style={styles.image} />
        <Text>Price: ${price}</Text>
        <Text>Date: {formattedDate}</Text>

        <Text>Origin: {origin}</Text>
        <View style={[styles.buttonContainer, styles.buttonContainerTop]}>
          <TouchableHighlight onPress={ItemDetails} style={styles.button}>
            <Text style={styles.buttonText}>View</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={editItem} style={styles.button}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={onDelete} style={styles.button}>
            <Text style={[styles.buttonText, {backgroundColor: 'red', borderRadius:3}]}>delete</Text>
          </TouchableHighlight>

        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    top: 0
  },
  buttonContainerTop: {
    alignSelf: 'flex-start',
  },
  button: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 30,
    backgroundColor: 'blue',
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
},

  image: {
    width: 150,
    height: 100,
    margin: 10
  },

  info: {
    marginHorizontal: 40,
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
   

  },
  title: {
    fontWeight: 'bold',
    fontSize: 20

  }
});