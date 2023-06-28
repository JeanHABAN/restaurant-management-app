import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableHighlight, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GLOBALCONTEXT from './GlobalContext';
import SignUp from './Signup';
import axios from 'axios'

import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const [login, setLogin] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const [showSignUp, setShowSignUp] = useState(false);

   const navigation = useNavigation()
    const { isLogin } = useContext(GLOBALCONTEXT)
    
    
    
    const handleLogin = async () => {
        
        try {
          const response = await axios.post('http://localhost:4000/users/login', login, {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          });
       
          if (response) {
            const { token } = response.data;
             await isLogin(token, login.email);
        
          } else {
            setErrorMessage('Login failed');
          }
        } catch (error) {
          console.log(error);
        }
      };
      
    const handleSignUp = () => {
        setShowSignUp(true);

    };

    const handleBackToLogin = () => {
        setShowSignUp(false);
    };

    return (
        <View style={styles.container}>
            <Text>{errorMessage}</Text>
            {!showSignUp && (
                <View style={{ width: '100%' }}>
                    <TextInput
                        style={styles.input}
                        placeholder="email"
                        value={login.email}
                        onChangeText={(text) => setLogin({ ...login, email: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={login.password}
                        onChangeText={(text) => setLogin({ ...login, password: text })}
                        secureTextEntry
                    />
                    <TouchableHighlight style={styles.buttonContainer} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={handleSignUp} >
                        <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
                    </TouchableHighlight>
                </View>
            )}

            {showSignUp && (
                <SignUp />
            )}

            {showSignUp && (
                <TouchableHighlight onPress={handleBackToLogin} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Back to Login</Text>
                </TouchableHighlight>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
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
});