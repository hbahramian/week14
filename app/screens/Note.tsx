import {
  View,
  Text,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Note = ({ navigation }: RouterProps) => {
  const [title, setTitle] = useState("");
  const [done, setDone] = useState("");

  useEffect(() => {}, []);

  const addNote = async () => {
    console.log("====================================");
    console.log("in addNote");
    console.log("====================================");
    const note = await addDoc(collection(FIREBASE_DB, "notes"), {
      title: title,
      done: done,
    });
    console.log(note);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Status"
          value={done}
          onChangeText={(text) => setDone(text)}
        />
        <Button
          title="Add note"
          disabled={title.trim() == ''}
          onPress={() => {
            addNote();
          }}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default Note;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
});
