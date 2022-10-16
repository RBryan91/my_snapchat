import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, TextInput,Button } from "react-native";
import React, { useState } from 'react';
import axios from 'axios';

const UselessTextInput = () => {    
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [text, onChangeText] = useState("Useless Text");
const navigation =useNavigation()
function connection()
{
    const configuration = {headers:{'Content-Type': "application/json", Accept: "application/json"}}
    axios.post('http://snapi.epitech.eu:8000/connection', { email,password}, configuration)
    .then(res => {
      alert(res.data.data["token"]);
      navigation.navigate("home")
     
  })
}

  return (
    <SafeAreaView>
      <TextInput
        name="email"
        value={email}
        style={styles.input}
        onChangeText={(email)=>setEmail(email)}
        placeholder="Nom d'utilisateur"
        
      />
      <TextInput
        secureTextEntry={true} 
        name="password"
        value={password}
        style={styles.input}
        onChangeText={(password)=>setPassword(password)}
        placeholder="Mot de passe" 
      />
      
      <Button
        title="Connection"
        onPress={() => connection()}
      />
  
      <Button
      title="S'inscrire"
      onPress={() => navigation.navigate('register')}
      
    />
        
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

  

export default UselessTextInput;


