import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, FlatList, ScrollView, TouchableHighlight } from 'react-native';
import Header from '../components/Header';
import { Item } from '../components/Item';
import GLOBALCONTEXT from '../components/GlobalContext';


const ListFoods = ({ navigation }) => {
    const { rest } = useContext(GLOBALCONTEXT)
    const [items, setItems] = useState([])
    const [search, setSearch] = useState('')
    // console.log("tes ",rest)

    useEffect(() => {
        setItems(rest.foods);
    }, [rest.foods]);
   
    // const handleSearch = (itemName) => {
    //     const filteredItems = items.filter((item) => {
    //         return (
    //             item.name.toLowerCase().includes(itemName.toLowerCase())
    //         )
    //     })
    //     setItems(filteredItems)
    //     setSearch(itemName)
       
    // }
    const handleSearch = (itemName) => {
        setSearch(itemName);
    };

    useEffect(() => {
        if (search === '') {
            setItems(rest.foods);
        } else {
            const filteredItems = items.filter((item) => {
                return item.name.toLowerCase().includes(search.toLowerCase());
            });
            setItems(filteredItems);
        }
    }, [search]);

  

    const goAddItem = () => {
        navigation.navigate('addNewItem')
    }
    // console.log('log items', items)
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    <Header />
                    <Text style={{ fontSize: 50, margin: 30, textAlign: 'center' }}>food list</Text>

                    <TouchableHighlight style={[styles.button, { height: 40, alignSelf: 'flex-end', marginRight: 40 }]} onPress={goAddItem}>
                        <Text style={styles.buttonText} >Add Food</Text>
                    </TouchableHighlight>

                    <TextInput style={styles.input}
                        placeholder='Search by name of item '
                        onChangeText={handleSearch}
                        value={search}
                    />

                </View>

                <FlatList
                    data={items}
                    renderItem={({ item, index }) => {
                        const obj = { ...item };
                        obj.index = index;
                        return <Item foods={obj} />;
                    }}
                    keyExtractor={(item, index) => item._id || index.toString()}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

export default ListFoods;

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
    },

    title: {
        fontSize: 30,
        margin: 30,
        textAlign: 'center'
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