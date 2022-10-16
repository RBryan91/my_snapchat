import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';

// Global variables

const apiURL = "http://snapi.epitech.eu:8000/";

// Pages/routes

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.body}>
      <View style={{flex: 1, maxHeight: 150, justifyContent: "space-around"}}>
        <Text style={styles.title}>my_snapchat</Text>
        <Button title='Log in' color={btnColor} onPress={() => { navigation.navigate("Log in"); }}/>
        <Button title='Register' color={btnColor} onPress={() => { navigation.navigate("Register"); }}/>
      </View>
    </View>
  );
}

function LogIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.body}>
      <View style={styles.userModal}>
        <Text style={styles.title}>Log in</Text>
        <TextInput placeholder='Email' autoCapitalize="none" style={styles.userModal.input} placeholderTextColor={"grey"} onChangeText={(val) => { setEmail(val.trim()); }}/>
        <TextInput secureTextEntry={true} placeholder='Password' autoCapitalize="none" style={styles.userModal.input} placeholderTextColor={"grey"} onChangeText={(val) => { setPassword(val.trim()); }}/>
        <Button title='Log in' color={btnColor}/>
      </View>
    </View>
  );
}

function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.body}>
      <View style={styles.userModal}>
        <Text style={styles.title}>Register</Text>
        <TextInput placeholder='Email' autoCapitalize="none" style={styles.userModal.input} placeholderTextColor={"grey"} onChangeText={(val) => { setEmail(val.trim()); }}/>
        <TextInput secureTextEntry={true} placeholder='Password' autoCapitalize="none" style={styles.userModal.input} placeholderTextColor={"grey"} onChangeText={(val) => { setPassword(val.trim()); }}/>
        <Button title='Register' color={btnColor} onPress={async (event) => {
          if (!email || !password) {
            return;
          }

          setIsLoading(true);

          try {
            const request = axios.create({
              baseURL: apiURL,
              responseType: "json",
              withCredentials: true
            });

            const response = await request("/inscription", {
              method: "POST",
              headers: {
                accept: "application/json",
                "content-type": "application/json"
              },
              email: email,
              password: password
            });

            if (response.status === 201) {
              alert("You have created: "+JSON.stringify(response.data)+".");
              setIsLoading(false);
              setEmail("");
              setPassword("");
            }
            else {
              throw new Error("An error has occured.");
            }
          }
          catch (error) {
            console.error(error);
            alert("An error has occured.");
            setIsLoading(false);
          }
        }}/>
      </View>
    </View>
  );
}

function Index({ navigation }) {
  return (
    <View style={styles.body}>
      <Text style={styles.title}>Hello World!</Text>
    </View>
  );
}

// Main render

export default function App() {
  return (
    <NavigationContainer>{
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={navHeaderStyle}/>
        <Stack.Screen name="Log in" component={LogIn} options={navHeaderStyle}/>
        <Stack.Screen name="Register" component={Register} options={navHeaderStyle}/>
        <Stack.Screen name="Index" component={Index} options={navHeaderStyle}/>
      </Stack.Navigator>
    }</NavigationContainer>
  );
}

// Style

const bgColor = "#36393F";
const containerBgColor = "#2F3136";
const textColor = "#FFFFFF";
const textBgColor = "#202225";
const btnColor = "#5865F2";
const dangerBtnColor = "#D83C3E";
const debugColor = "#198754"; // For test props and debugging only

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: bgColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: textColor,
    fontSize: 30
  },
  userModal: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    textAlign: "center",
    maxHeight: 160,
    minWidth: 150,
    maxWidth: 150,
    input: {
      backgroundColor: textBgColor,
      color: "white",
      textAlign: "center",
      minWidth: "120%",
      borderRadius: 3
    }
  }
});

const navHeaderStyle = {
  headerStyle: {
    backgroundColor: containerBgColor
  },
  headerTitleStyle: {
    color: textColor
  }
};