import { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, FlatList } from 'react-native';
import GLOBALCONTEXT from '../components/GlobalContext';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../components/Login';



export const Profile = ({ navigation, info}) => {
    
    
    const { rest, setState} = useContext(GLOBALCONTEXT)

    const [logout, setLogout] = useState(false)

    const handleEdit = () => {

        navigation.navigate('profileEdit',info)
    };

    //logout function /////
    const handleLogout = async () => {

        await AsyncStorage.removeItem('react-native')
        setState({token:null, email:""})
        // navigation.navigate('login')
    };

    if (logout) {
        return <Login />;
    }
 
    return (
        <View style={styles.personalCard}>
            <View>
                <Text style={styles.personalCardTitle}>Personal Information</Text>
            </View>
            <Text style={styles.personalCardName}>{rest.fullName}</Text>
            <Text style={styles.personalCardEmail}>{rest.email}</Text>
            {/* <Text style={styles.personalCardPassword}>{owner.password}</Text> */}
            <Text style={styles.personalCardPhone}>{rest.phone}</Text>
            <Text style={styles.personalCardAddress}>{rest.address}</Text>
            
            <View>
                <FlatList
                    data={rest}
                    renderItem={({ item, index }) => {
                        const obj = { ...item, index };
                        return <Profile info={obj} />;
                    }}
                    keyExtractor={(item) => item.email}
                />
                <TouchableHighlight style={styles.editButton} onPress={handleEdit}>
                    <Text style={styles.editButtonText}>Edit</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableHighlight>
                {logout && <Login />}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    personalCard: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#dddddd',
    },

    personalCardName: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },


    personalCardTitle: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    personalCardButton: {
        backgroundColor: '#007bff',
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    personalCardButtonText: {
        color: '#ffffff',
        fontSize: 16,
        textAlign: 'center',
    },
    personalCardEmail: {
        fontSize: 27,
        marginBottom: 8,
    },
    personalCardPassword: {
        fontSize: 14,
        marginBottom: 8,
    },
    personalCardPhone: {
        fontSize: 27,
        marginBottom: 8,
    },
    personalCardAddress: {
        fontSize: 27,
        marginBottom: 16,
    },
    editButton: {
        backgroundColor: '#007bff',
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginTop: 16,
    },
    editButtonText: {
        color: '#ffffff',
        fontSize: 16,
        textAlign: 'center',
    },
    logoutButton: {
        backgroundColor: '#dc3545',
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginTop: 8,
    },
    logoutButtonText: {
        color: '#ffffff',
        fontSize: 16,
        textAlign: 'center',
    },
});

