import { useContext, useState } from 'react';
import axios from 'axios'
import { View, Text, StyleSheet, TextInput, TouchableHighlight, FlatList } from 'react-native';
import NoteCard from '../notesComponent/NoteCard';
import GLOBALCONTEXT from '../components/GlobalContext';

export const Notes = ({ navigation }) => {
    const {  rest } = useContext(GLOBALCONTEXT)
    const [takeNotes, setTakeNotes] = useState(rest.notes)

    

    const goAddForm = () => {
        navigation.navigate('addNote')
    }
    return (

        <View style={styles.container}>
            <Text style={styles.title}>DAILY NOTES</Text>
            <TouchableHighlight style={[styles.button, { height: 60, alignSelf: 'flex-end', marginRight: 40, marginTop: 20 }]} onPress={goAddForm}>
                <Text style={styles.buttonText}>Add Note</Text>
            </TouchableHighlight>
            <FlatList
                data={rest.notes}
                renderItem={({ item, index }) => {
                    const obj = { ...item }
                    obj.index = index;
                    return <NoteCard infos={obj} />
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        fontSize: 20,
        borderWidth: 1,
        borderRadius: 5,
        height: 30,
        marginHorizontal: 40,
        marginVertical: 10,
        padding: 10,


    },
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
    },

    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginVertical: 20,
        color: '#333',
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
})