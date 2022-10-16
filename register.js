import { SafeAreaView, StyleSheet, TextInput,Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import axios from 'axios';


const UselessTextInput = () => {
  const [text, onChangeText] = React.useState("");
  const navigation=useNavigation()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function inscription()
  {
      const configuration = {headers:{'Content-Type': "application/json", Accept: "application/json"}}
      axios.post('http://snapi.epitech.eu:8000/inscription', { email,password}, configuration)
      .then(res => {
        
        alert("Succes");
       navigation.navigate("login")
    })
    
   
    //console.warn("oui");
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
        title="Envoyé"
        onPress={() =>  inscription()}
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

