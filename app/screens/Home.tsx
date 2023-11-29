import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

interface Note {
  title: string;
  done: string;
  id: string;
}

const Home = ({ navigation }: RouterProps) => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    console.log("in useEffect in Home");

    const notesTable = collection(FIREBASE_DB, "notes");
    const subscriber = onSnapshot(notesTable, {
      next: (snapshot) => {
        console.log("updated!");

        const documents: Note[] = [];
        snapshot.docs.forEach((note) => {
          documents.push({
            id: note.id,
            ...note.data(),
          } as Note);
        });
        setNotes(documents);
      },
    });
    //return () => subscriber();
  }, []);

  const renderNote = ({ item }: any) => {
    return <Text>{item.title}</Text>;
  };

  return (
    <View style={styles.container}>
      <FlatList style={{paddingTop: 50}}
        data={notes}
        renderItem={renderNote}
        keyExtractor={(note: Note) => note.id}
      />
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
