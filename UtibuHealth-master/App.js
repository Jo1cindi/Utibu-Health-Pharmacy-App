import * as React from "react";
import { NavigationContainer } from "./node_modules/@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./Screens/SplashScreen";
import CreateAccount from "./Screens/CreateAccount";
import Login from "./Screens/Login";
import ResetPassword from "./Screens/ResetPassword";
import AccountVerification from "./Screens/AccountVerification";
import Home from "./Screens/Home";
import Arvs from "./Screens/Arvs";
import Vaccines from "./Screens/Vaccines";
import Insulin from "./Screens/Insulin";
import Antibiotics from "./Screens/Antibiotics";
import Description from "./Screens/Description";
import Checkout from "./Screens/Checkout";


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name=" " component={SplashScreen} options={{headerShown: false}} />
        <Stack.Screen name="Splashscreen" component={SplashScreen} options={{headerShown: false}}/>
        <Stack.Screen name="CreateAccount" component={CreateAccount} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{headerShown: false}}/>
        <Stack.Screen name="AccountVerification" component={AccountVerification} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Arv" component={Arvs} options={{headerShown: false}}/>
        <Stack.Screen name="Vaccines" component={Vaccines} options={{headerShown: false}}/>
        <Stack.Screen name="Insulin" component={Insulin} options={{headerShown: false}}/>
        <Stack.Screen name="Antibiotics" component={Antibiotics} options={{headerShown: false}}/>
        <Stack.Screen name="Description" component={Description} options={{headerShown: false}}/>
        <Stack.Screen name="Checkout" component={Checkout} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
