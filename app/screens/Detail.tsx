import { View, Text, StyleSheet, Button } from "react-native"
import React from "react"
import { NavigationProp } from "@react-navigation/native";


interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Detail = ({ navigation }: RouterProps ) => {
    return (
        <View style={styles.container}> 
         <Text>Details ...</Text>
        </View>
    )
}

export default Detail;

const styles = StyleSheet.create({
    container: {
      marginHorizontal: 20,
      flex: 1,
      justifyContent: "center",
    }
  });