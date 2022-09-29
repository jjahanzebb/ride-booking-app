import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tailwind from "twrnc";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-456",
    title: "Uber-XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

// if area is busy, pricing change
const SURGE_CHARGE_RATE = 2.4;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const setTravelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tailwind`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={tailwind`absolute top-1 left-5 pl-3 rounded-full z-1`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>

        <Text style={tailwind`text-center text-xl pb-5`}>
          Select a Ride -{" "}
          {Math.ceil(
            setTravelTimeInformation?.distance.text.split(" ")[0] * 1.60934
          ) + " km"}
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View style={[tailwind`bg-gray-300 mx-2`, { height: 0.65 }]}></View>
        )}
        nestedScrollEnabled
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tailwind`flex-row items-center justify-start px-10 ${
              id === selected?.id && "bg-gray-200"
            }`}
          >
            <Image
              style={{
                width: 90,
                height: 90,
                resizeMode: "contain",
              }}
              source={{ uri: image }}
            />

            <View style={tailwind`ml-3`}>
              <Text style={tailwind`text-xl font-semibold`}>{title}</Text>
              <Text>{setTravelTimeInformation?.duration.text} travel</Text>
            </View>

            <Text style={tailwind`text-lg ml-12`}>
              Rs.
              {" " +
                Math.ceil(
                  (setTravelTimeInformation?.duration.value *
                    SURGE_CHARGE_RATE *
                    multiplier) /
                    3
                )}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View
        style={tailwind`flex-row bg-white justify-evenly mt-auto px-2 border-t border-gray-100`}
      >
        <TouchableOpacity
          style={tailwind`w-full bg-black p-3 m-2 ${
            !selected && "bg-gray-300"
          }`}
        >
          <Text style={tailwind`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
