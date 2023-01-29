import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useRevenueCat from "../hooks/useRevenueCat";
import Purchases from "react-native-purchases";

export type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Paywall"
>;

const Paywall = () => {
  const navigation = useNavigation<NavigationProp>();
  const { currentOffering } = useRevenueCat();

  // Monthly purchase
  const handleMonthlyPurchase = async () => {
    if (!currentOffering?.monthly) return;

    const purchaserInfo = await Purchases.purchasePackage(
      currentOffering.monthly
    );

    console.log(
      "Monthly Subscription Purchased ->",
      purchaserInfo.customerInfo.entitlements.active
    );

    if (purchaserInfo.customerInfo.entitlements.active.pro) {
      navigation.goBack();
    }
  };

  // Annual purchase
  const handleAnnualPurchase = async () => {
    if (!currentOffering?.annual) return;

    const purchaserInfo = await Purchases.purchasePackage(
      currentOffering.annual
    );

    console.log(
      "Annual Subscription Purchased ->",
      purchaserInfo.customerInfo.entitlements.active
    );

    if (purchaserInfo.customerInfo.entitlements.active.pro) {
      navigation.goBack();
    }
  };

  const restorePurchases = async () => {
    const purchaserInfo = await Purchases.restorePurchases();

    if (purchaserInfo.activeSubscriptions.length > 0) {
      Alert.alert("Success", "Your purchase has been restored");
    } else {
      Alert.alert("Error", "No purchases to restore");
    }

    if (purchaserInfo.entitlements.active.pro) {
      navigation.goBack();
    }
  };

  if (!currentOffering) {
    return (
      <View className="bg-[#1A2F44] flex-1 p-10">
        <ActivityIndicator size="large" color="#E5962D" />
      </View>
    );
  }

  return (
    <ScrollView className="bg-[#1A2F44] flex-1">
      <View className="m-10 space-y-2">
        <Text className="text-2xl text-center uppercase text-white font-bold">
          upgrade
        </Text>
        <Text className="text-center text-white">
          Upgrade to Pro to access all the Features
        </Text>
      </View>

      <TouchableOpacity
        onPress={navigation.goBack}
        className="absolute top-0 right-0 p-5"
      >
        <Ionicons name="md-close-circle-sharp" size={32} color="#E5962D" />
      </TouchableOpacity>

      {/* Logo */}
      <View className="items-center">
        <MaterialCommunityIcons
          name="trophy-award"
          size={150}
          color="#E5962D"
        />
      </View>

      {/* Content */}
      <View className="space-y-5 px-10 py-5">
        <View className="flex-row space-x-10 items-center">
          <Ionicons name="md-key" size={32} color="#E5962D" />
          <View className="flex-1">
            <Text className="text-white font-bold text-lg">
              Access to all Pro Features
            </Text>
            <Text className="text-white text-sm font-extralight">
              Upgrade to the premium version of the app and enjoy all the
              exclusive features available only to pro users.{""}
            </Text>
          </View>
        </View>

        <View className="flex-row space-x-10 items-center">
          <Ionicons name="md-person-add-outline" size={32} color="#E5962D" />
          <View className="flex-1">
            <Text className="text-white font-bold text-lg">
              Helpline 24/7 to Personal Trainers
            </Text>
            <Text className="text-white text-sm font-extralight">
              Get unlimited access to our fitness support team and get help
              anytime you need it - day or night.{""}
            </Text>
          </View>
        </View>

        <View className="flex-row space-x-10 items-center">
          <Ionicons name="md-star" size={32} color="#E5962D" />
          <View className="flex-1">
            <Text className="text-white font-bold text-lg">
              Unlock Limited Edition Content
            </Text>
            <Text className="text-white text-sm font-extralight">
              Unlock exclusive content that you can't get anywhere else, like
              special exclusive workouts and routines.
            </Text>
          </View>
        </View>
      </View>

      {/* Monthly Subscribe */}
      <TouchableOpacity
        onPress={handleMonthlyPurchase}
        className="items-center px-10 py-5 bg-[#E5962D] mx-10 rounded-full"
      >
        <Text className="text-white text-md text-center font-bold mb-1">
          FREE trail for 1 week...
        </Text>
        <Text className="text-white">
          {currentOffering.monthly?.product.priceString}/month after
        </Text>
      </TouchableOpacity>

      {/* Annual Subscribe */}
      {currentOffering.annual && (
        <TouchableOpacity
          onPress={handleAnnualPurchase}
          className="items-center px-10 py-5 border-2 border-[#E5962D] mx-10 rounded-full mt-2"
        >
          <Text className="text-white uppercase text-md text-center font-bold mb-1">
            Save{" "}
            {(
              (1 -
                currentOffering.annual?.product.price! /
                  (currentOffering.monthly?.product.price! * 12)) *
              100
            ).toPrecision(2)}{" "}
            % Annually
          </Text>
        </TouchableOpacity>
      )}

      {/* Restore Purchases */}
      <TouchableOpacity className="m-5" onPress={restorePurchases}>
        <Text className="text-center text-[#E5962D]">Restore Purchases</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Paywall;
