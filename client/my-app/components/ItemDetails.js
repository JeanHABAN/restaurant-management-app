import {View, Text, StyleSheet, Image} from 'react-native';

export const ItemDetails = ({route}) =>{
    const { name, price, date, image, origin } = route.params;
    const formattedDate = new Date(date).toLocaleDateString()
    return(
        <View style={styles.info}>
            <Text style={styles.text} >{name}</Text>
            <Image source={{ uri: image }} style={styles.image} />
            <Text>price : ${price}</Text>
            <Text>date : {formattedDate}</Text>
            <Text>origin : {origin}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    info: {
        marginHorizontal: 40,
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
      },
      text: {
        fontSize: 40,
        fontWeight:'bold',
        backgroundColor:'grey'
      },
      image: {
        width: 200,
        height: 200,
        marginVertical: 10,
      },
})