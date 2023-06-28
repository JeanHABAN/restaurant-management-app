import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Notes } from './screens/Notes';
import { Profile } from './screens/Profile';
import Login from './components/Login';
import ListFoods from './screens/ListFoods';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GLOBALCONTEXT from './components/GlobalContext';
import { ItemDetails } from './components/ItemDetails';
import { AddNewFood } from './components/AddnewFood';
import EditItem from './components/EditItem';
import NoteDetails from './notesComponent/NoteDetails';
import AddNote from './notesComponent/AddNote';
import axios from 'axios'

import ProfileEdit from './profileComponent/ProfileEdit';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function ItemsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='itemsList' component={ListFoods} options={{ headerShown: false }} />
      <Stack.Screen name='itemDetails' component={ItemDetails} />
      <Stack.Screen name='addNewItem' component={AddNewFood} options={{ headerTitle: "Add New Item" }} />
      <Stack.Screen name='editItem' component={EditItem} />
    </Stack.Navigator>
  )
}

function NotesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Note' component={Notes} options={{ headerShown: false }} />
      <Stack.Screen name='addNote' component={AddNote} options={{ headerShown: false }} />
      <Stack.Screen name='noteDetails' component={NoteDetails} />
    </Stack.Navigator>
  )
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='profiles' component={Profile} />
      <Stack.Screen name='profileEdit' component={ProfileEdit} />
    </Stack.Navigator>
  )
}


function LoginStack() {
  return (
    <Stack.Navigator>
    
       <Stack.Screen name='login' component={Login} /> 

    </Stack.Navigator>
  )
}
export default function App() {

  const [state, setState] = useState({ token: null, email: '' })

  const [rest, setRest] = useState({ foods: [], notes: [] })

const [isLoadingStorage, setIsLoadingStorage] = useState(true)

  //////////fetch token with login email to localstorage ///////
  useEffect(() => {
    (async function fetchData() {
      try {
        const data = await AsyncStorage.getItem('react-native');
        if (data) {
          const { email, token } = JSON.parse(data);
          setState((prev) => ({ ...prev, email, token }));
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoadingStorage(false)
    })();
  }, []);


  ////////fetch personal information ///
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (state.email) {
          const res = await axios.get(`http://localhost:4000/users/${state.email}`,{
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${state.token}`,
            },
          });
          if (res.data.success) {
            setRest(res.data.data);
          } else {
            console.log('User not found');
          }
        }
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [state.email]);


  /////login //////
  const isLogin = async (token, email) => {
    try {
      await AsyncStorage.setItem('react-native', JSON.stringify({ email, token }));

      setState((prev) => ({ ...prev, email, token }));/////noted

    } catch (error) {
      console.log(error)
    }
  }


  //delete food
  const deleteItem = (id) => {
    const updatedFoods = rest.foods.filter(item => item._id !== id);
    setRest(prevState => ({
      ...prevState,
      foods: updatedFoods
    }));
  };


  /////// add new item /////////
  const addItem = (newData) => {
    const copyData = rest.foods ? [...rest.foods] : [];
    copyData.push(newData);
    setRest({...rest,foods : copyData});
  };


  ////////////edit item /////////
  const editItemFun = (newData) => {

    setRest((prevData) => {
      const updatedData = prevData.foods.map((item) => {

        if (item._id === newData._id) {
          return newData;
        }
        return item;
      });
      return {...rest,foods : updatedData}
    });
  }

  ///////update user profile/////

  const editProfile = (newData) => {
    setRest((prevOwner) => ({
      ...prevOwner,
      ...newData
    }));
  }


  ////////add a note /////

  const addNewNote = (newNote) => {

    const copyData = rest.notes ? [...rest.notes] : [];
    copyData.push(newNote);
    
    setRest({...rest,notes : copyData});
  }



  return (
    <GLOBALCONTEXT.Provider value={{ state, isLogin, deleteItem, addItem, editItemFun, addNewNote, editProfile, rest, setState }}>



      <NavigationContainer>

     { isLoadingStorage?"laoding" : state.token===null?<Login/> :<Tab.Navigator initialRouteName='itemsList'>
          <Tab.Screen
            name='foods list'
            component={ItemsStack}
            options={{ tabBarIcon: ({ color }) => <MaterialCommunityIcons size={50} name="home" color={color} />, headerShown: false }}
          />
          <Tab.Screen
            name='Notes'
            component={NotesStack}
            options={{ tabBarIcon: ({ color }) => <MaterialCommunityIcons size={50} name="book-edit" color={color} />, headerShown: false }}
          />
          <Tab.Screen
            name='Profile'
            component={ProfileStack}
            options={{ tabBarIcon: ({ color }) => <MaterialCommunityIcons size={50} name="account-box-outline" color={color} />, headerShown: false }}
          />
        </Tab.Navigator>}

      </NavigationContainer>

    </GLOBALCONTEXT.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
});
