import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tailwind from "twrnc";
import Map from "../components/Map";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigateCard from "../components/NavigateCard";
import RideOptionsCard from "../components/RideOptionsCard";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";

const MapScreen = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeScreen")}
        style={tailwind` flex-row z-1 absolute top-12 left-8 bg-gray-100 rounded-full shadow-lg p-3`}
      >
        <Icon name="chevron-left" style={tailwind`-ml-1`} />
        <Icon name="home" />
        {/* <Text style={tailwind`ml-2`}>Home Screen</Text> */}
      </TouchableOpacity>

      <View style={tailwind`h-1/2`}>
        <Map />
      </View>

      <View style={tailwind`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="RideOptionsCard"
            component={RideOptionsCard}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
