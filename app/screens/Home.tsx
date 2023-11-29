import { View, Text, StyleSheet, Button } from "react-native"
import React, { useEffect } from "react"
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Home = ({ navigation }: RouterProps ) => {

    useEffect(() => {
       
    }, []);

    const addNote = async () => {
        console.log('====================================');
        console.log('in addNote');
        console.log('====================================');
        const note = addDoc(collection(FIREBASE_DB, 'notes'), {
            title: 'test 1',
            done: false
        });
        console.log(note);
        
        
    }

    return (
        <View style={styles.container}> 
         <Button title="Add note" onPress={() => {
                addNote()
            }} />
         <Button title="Open Details" onPress={() => {
               navigation.navigate('Details')
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