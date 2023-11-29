import { View, Text, StyleSheet, Button } from "react-native"
import React from "react"
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Home = ({ navigation }: RouterProps ) => {
    return (
        <View style={styles.container}> 
         <Button title="Open Details" onPress={() => {
               navigation.navigate('details')
            }} />
            <Button title="Logout" onPress={() => {
                FIREBASE_AUTH.signOut()
            }} />
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
      marginHorizontal: 20,
      flex: 1,
      justifyContent: "center",
    }
  });