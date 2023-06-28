import { View, Text, StyleSheet } from "react-native";


export default function Header (){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>RESTAURANT APP MANAGEMENT</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f9f9f9',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
    },
  });