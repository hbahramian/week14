import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./app/screens/Login";
import Home from "./app/screens/Home";
import React, { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import Detail from "./app/screens/Detail";

const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

function HomeLayout() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="home" component={Home} options={{headerShown: false}} />
      <HomeStack.Screen name="Details" component={Detail} options={{headerShown: true}} />
    </HomeStack.Navigator>
  );
}



export default function App() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user)
      console.log("====================================");
      console.log("user", user);
      console.log("====================================");
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ?
        (<Stack.Screen
          name="home"
          component={HomeLayout}
          options={{ headerShown: false }}
        />)
        :
        (<Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />)
        }
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
