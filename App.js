import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import login from './login';
import register from './register';
import home from './home';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
        name="register"
        component={register}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="home"
        component={home}
        options={{ headerShown: false }}

        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;