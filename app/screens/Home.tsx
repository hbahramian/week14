import { View, Text, StyleSheet, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Home = ({ navigation }: RouterProps) => {
  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    console.log('in useEffect in Home');
    
    const notesTable = collection(FIREBASE_DB, "notes");
    const subscriber = onSnapshot(notesTable, {
      next: (snapshot) => {
        console.log("updated!");

        const documents: any[] = [];
        snapshot.docs.forEach((note) => {
          documents.push({
            id: note.id,
            ...note.data(),
          });
        });
        setNotes(documents);
      },
    });
    //return () => subscriber();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        {notes.map((note) => (
          <Text key={note.id}>{note.title}</Text>
        ))}
      </View>
      <Button
        title="Add Note"
        onPress={() => {
          navigation.navigate("note");
        }}
      />
      <Button
        title="Logout"
        onPress={() => {
          FIREBASE_AUTH.signOut();
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
});
