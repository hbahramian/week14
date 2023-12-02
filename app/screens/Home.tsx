import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Entypo } from "@expo/vector-icons";

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
    const noteReference = doc(FIREBASE_DB, `notes/${item.id}`)
    const toggleDone = async () => {updateDoc(noteReference, {done: 'done'})}
    const deleteItem = async () => {deleteDoc(noteReference)}



    return (
      <View style={styles.noteContainer}>
        <TouchableOpacity onPress={toggleDone} style={styles.note}>
          {item.done == "done" && (
            <Ionicons name="md-checkmark-circle" size={32} color="green" />
          )}
          {item.done != "done" && (
            <Entypo name="progress-two" size={24} color="black" />
          )}
          <Text style={styles.noteText}>{item.title}</Text>
        </TouchableOpacity>
        <Ionicons name="trash-outline" size={24} color="black" onPress={deleteItem}/>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{ paddingTop: 50 }}
        data={notes.sort((a,b) => a.done.localeCompare(b.done))}
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
  noteContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 4,
    backgroundColor: "azure",
  },
  note: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  noteText: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
