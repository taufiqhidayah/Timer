
import React, { useRef, useEffect, useState } from "react";
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation: { navigate } }) {
  const [num, setNum] = useState(100);
  const [pause, setPause] = useState(false);
  
  let intervalRef = useRef();
  
  const decreaseNum = () => setNum((prev) => prev - 1);

  useEffect(() => {
    setPause(false);
    intervalRef.current = setInterval(decreaseNum, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);
  
  const handleClick = () => {
    if (!pause) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(decreaseNum, 1000);
    }
    setPause((prev) => !prev);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{num}</Text>
      <Button
        onPress={() =>
          navigate('Profile', {names: num})
        }
        title="Go to Brent's profile"
      />
    </View>
  );
}

function ProfileScreen({ navigation, route }) {
  const [num, setNum] = useState(route.params.names);
  const [pause, setPause] = useState(false);
  
  let intervalRef = useRef();
  
  const decreaseNum = () => setNum((prev) => prev - 1);

  useEffect(() => {
    setPause(false);
    intervalRef.current = setInterval(decreaseNum, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);
  
  const handleClick = () => {
    if (!pause) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(decreaseNum, 1000);
    }
    setPause((prev) => !prev);
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile Screen</Text>
      <Text>Friends: </Text>
      <Text>{num}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
