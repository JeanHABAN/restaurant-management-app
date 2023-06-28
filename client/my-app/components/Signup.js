import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableHighlight ,Alert} from 'react-native';
import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import GLOBALCONTEXT from './GlobalContext';

export default function SignUp() {

    const { isLogin } = useContext(GLOBALCONTEXT)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const handleSignUp = async () => {
        try {
            const newUser = {  
                email,
                password,
                fullName,
                phone,
                address,
            };

            const ret = await fetch('http://localhost:4000/users', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "content-Type": "application/json"
                },
                body: JSON.stringify(newUser)

            });
            const obj = await ret.json()
         
            if (obj.success) {

                setSuccessMessage(() => obj.message)
                console.log('Sign up successful');
            } else {
                setErrorMessage(() => obj.message)
                console.log('Sign up unseccessful');
            }
        } catch (error) {
            console.log(error)
        }

        setEmail('');
        setPassword('');
        setFullName('');
        setPhone('');
        setAddress('');



    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize:40}}>signup </Text>
            <TextInput
                style={styles.input}
                placeholder="full name"
                value={fullName}
                onChangeText={setFullName}
            />

            <TextInput
                style={styles.input}
                placeholder="email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="phone number"
                value={phone}
                onChangeText={setPhone}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TextInput
                style={styles.input}
                placeholder="address"
                value={address}
                onChangeText={setAddress}
            />
            <TouchableHighlight style={styles.buttonContainer} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableHighlight>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        width:'100%'
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
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