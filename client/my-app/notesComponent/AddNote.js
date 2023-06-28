import { useContext, useState } from 'react';
import axios from 'axios'
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import GLOBALCONTEXT from '../components/GlobalContext';

function AddNote({ navigation }) {
    const { addNewNote, state } = useContext(GLOBALCONTEXT)
    const [input, setInput] = useState({ header: '', comment: '' })

    const onAddNote = async () => {
        try {
        
            const response = await axios.put(`http://localhost:4000/users/${state.email}/notes`, input, {
                headers: {
                    Authorization: `Bearer ${state.token}`
                  }
            });
        console.log("respo ",response.data)
            if (response.data) {
                addNewNote(response.data.data);
                navigation.navigate('Note')
            } else {
                console.log('add note failed')
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
                value={input.header}
                onChangeText={text => setInput({ ...input, header: text })}
            />
            <TextInput
                placeholder='comment'
                style={styles.input}
                value={input.comment}
                onChangeText={text => setInput({ ...input, comment: text })}
            />
            <TouchableHighlight style={styles.button} onPress={onAddNote}>
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
export default AddNote;