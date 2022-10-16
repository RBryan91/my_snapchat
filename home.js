import { StatusBar } from 'expo-status-bar';
import { Camera, CameraType } from 'expo-camera';
import React, { useState, useRef, useEffect} from 'react';
import {View, Button, StyleSheet, Text, TouchableOpacity,Image,SafeAreaView, KeyboardAvoidingView } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

const Index = () => 
{
    
    const [image, setImage] = useState(null);
    const [camera, setCamera] = useState(true);
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    let cameraRef = useRef();
    const [photo, setPhoto] = useState();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  
    function toggleCameraType() {
      setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }
    function retour(){
      setCamera(true)
    }
    useEffect(() => {
      (async () => {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
        setHasCameraPermission(cameraPermission.status === "granted");
        setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
      })();
    }, []);
  
    if (hasCameraPermission === undefined) {
      return <Text>Requesting permissions...</Text>
    } else if (!hasCameraPermission) {
      return <Text>Permission for camera not granted. Please change this in settings.</Text>
    }
    let takePic = async () => {
      let options = {
        quality: 1,
        base64: true,
        exif: false
      };
  
      const newPhoto = await cameraRef.current.takePictureAsync(options);
      setPhoto(newPhoto);
      console.log(newPhoto)
    };
    if (photo) {
      let sharePic = () => {
        shareAsync(photo.uri).then(() => {
          setPhoto(undefined);
        });
      };
  
      let savePhoto = () => {
        MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
          setPhoto(undefined);
        });
      };
  
      return (
        <SafeAreaView style={styles.container}>
          <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
          <Button title="Partager" onPress={sharePic} />
          {hasMediaLibraryPermission ? <Button title="Enregistrer" onPress={savePhoto} /> : undefined}
          <Button title="Envoyer" onPress={"pio"} />
          <Button title="Retour" onPress={() => setPhoto(undefined)} />
        </SafeAreaView>
      );
    }
    
    async function  galery(){
      let result = await ImagePicker.launchImageLibraryAsync() 
      if(!result.cancelled){
      setImage(result.uri)
      setCamera(false)
      } 
    }
    
    return(
    <View style={styles.container}>
      {(camera ? 
      <Camera style={styles.camera} type={type} ref={cameraRef}>
            <Text onPress={toggleCameraType} style={styles.text}>Flip Screen</Text>
            <Text onPress={galery} style={styles.text}>Galery</Text>
            <Text onPress={takePic} style={{paddingTop:640,paddingLeft:150, color:"white"}}>Take Picture</Text>
      </Camera>
      :
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:"black"}}>
       <Text onPress={retour} style={styles.textcam}>Retour</Text>
       <Image source={{ uri: image }} style={{ width:200, height:200 }}/>
       <Text onPress={retour} style={styles.textcam}>Envoyé</Text>
      </View> 
      )}
    </View>
    )
}
const styles = StyleSheet.create({  container: {
    flex:1,
    justifyContent: 'center',
    },
    camera: 
    {
      flex:1,
        height:'100%',
    },
    textcam:{color:"white"},

    text:
    {
        paddingLeft:50,
        paddingTop:50,
        color:'white',
        alignItems:'center',
    },
    preview: {
      alignSelf: 'stretch',
      flex: 1,
    }
 }); 

export default Index;



//import { StatusBar } from 'expo-status-bar';
//import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
//import { useEffect, useRef, useState } from 'react';
//import { Camera } from 'expo-camera';
//import { shareAsync } from 'expo-sharing';
//import * as MediaLibrary from 'expo-media-library';
//
//export default function App() {
//  let cameraRef = useRef();
//  const [hasCameraPermission, setHasCameraPermission] = useState();
//  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
//  const [photo, setPhoto] = useState();
//
//  useEffect(() => {
//    (async () => {
//      const cameraPermission = await Camera.requestCameraPermissionsAsync();
//      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
//      setHasCameraPermission(cameraPermission.status === "granted");
//      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
//    })();
//  }, []);
//
//  if (hasCameraPermission === undefined) {
//    return <Text>Requesting permissions...</Text>
//  } else if (!hasCameraPermission) {
//    return <Text>Permission for camera not granted. Please change this in settings.</Text>
//  }
//
//  let takePic = async () => {
//    let options = {
//      quality: 1,
//      base64: true,
//      exif: false
//    };
//
//    let newPhoto = await cameraRef.current.takePictureAsync(options);
//    setPhoto(newPhoto);
//  };
//
//  if (photo) {
//    let sharePic = () => {
//      shareAsync(photo.uri).then(() => {
//        setPhoto(undefined);
//      });
//    };
//
//    let savePhoto = () => {
//      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
//        setPhoto(undefined);
//      });
//    };
//
//    return (
//      <SafeAreaView style={styles.container}>
//        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
//        <Button title="Share" onPress={sharePic} />
//        {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
//        <Button title="Discard" onPress={() => setPhoto(undefined)} />
//      </SafeAreaView>
//    );
//  }
//
//  return (
//    <Camera style={styles.container} ref={cameraRef}>
//      <View style={styles.buttonContainer}>
//        <Button title="Take Pic" onPress={takePic} />
//      </View>
//      <StatusBar style="auto" />
//    </Camera>
//  );
//}
//
//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    alignItems: 'center',
//    justifyContent: 'center',
//  },
//  buttonContainer: {
//    backgroundColor: '#fff',
//    alignSelf: 'flex-end'
//  },
//  preview: {
//    alignSelf: 'stretch',
//    flex: 1
//  }
//});