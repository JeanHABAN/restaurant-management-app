import { useContext, useState, useEffect } from 'react';
import axios from 'axios'
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import GLOBALCONTEXT from './GlobalContext';

export default function EditItem({ navigation, route }) {

    const { _id, name, price, image, origin, date } = route.params
    const { editItemFun, state } = useContext(GLOBALCONTEXT)
    const [input, setInput] = useState({ _id, name, price, image, origin })


    const onEditItem = async (id) => {
        try {

            const res = await axios.patch(`http://localhost:4000/users/${state.email}/foods/${id}`, input, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${state.token}`,
                },
            })


            if (res.status === 200) {

                editItemFun({ ...input, date })
                navigation.navigate('itemsList')
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
            <TouchableHighlight style={styles.buttonContainer} onPress={() => onEditItem(_id)}>
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