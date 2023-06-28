import { useContext, useState } from 'react';
import axios from 'axios'
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import GLOBALCONTEXT from '../components/GlobalContext';

export default function ProfileEdit ({navigation}){
    const { rest, state, editProfile } = useContext(GLOBALCONTEXT)
    const [input, setInput] = useState(rest)
   

    async function onEditProfile() {
      try {
        const { fullName, phone, password, address } = input;
        
        const response = await axios.patch(`http://localhost:4000/users/${state.email}`, {
          fullName,
          phone,
          password,
          address,
        }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.token}`,
          },
        });
          
        if (response.data.success) {
          const updatedProfileData = {
            fullName,
            phone,
            password,
            address,
          };
          editProfile(updatedProfileData);
          navigation.navigate('profiles');
        } else {
         
          console.log('Failed to update user information');
        }
      } catch (error) {
        console.log(error);
      }
    }
    

    return(
        <View style={styles.container}>
        <TextInput
            placeholder='full name'
            style={styles.input}
            value={input.fullName}
            onChangeText={text => setInput({ ...input, fullName: text })}
        />
        <TextInput
            placeholder='password'
            style={styles.input}
            value={input.password}
            onChangeText={text => setInput({ ...input, password: text})}
        />
        <TextInput
            placeholder='phone'
            style={styles.input}
            value={input.phone}
            onChangeText={text => setInput({ ...input, phone: text })}
        />
         
         <TextInput
            placeholder='address'
            style={styles.input}
            value={input.address}
            onChangeText={text => setInput({ ...input, address: text })}
        />

        <TouchableHighlight style={styles.buttonContainer} onPress={onEditProfile}>
            <Text style={styles.buttonText}>Update</Text>
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
    buttonContainer: {
        backgroundColor: 'blue',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    signUpText: {
        fontSize: 14,
        color: 'black',
    },
});