// navigation/StackNavigator.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";

import ProductDetails from "../app/product/[id]";
import CheckoutScreen from "../app/order/checkout";
import OrderSuccessScreen from "../app/order/success";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />

      {/* Product */}
      <Stack.Screen name="ProductDetails" component={ProductDetails} />

      {/* Order */}
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
    </Stack.Navigator>
  );
}
