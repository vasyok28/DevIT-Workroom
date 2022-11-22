import React, { useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  AuthContainer,
  ScreenContainer,
  TextInput,
  TextInputSecret,
  Button,
  PressableFade,
} from "../components";
import { Demensions, Render } from "../helpers";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

export const LoginScreen = React.memo(
  ({ navigation }: NativeStackHeaderProps) => {
    const onPressRegistration = useCallback(() => {
      navigation.replace("Registration");
    }, [navigation]);

    return (
      <ScreenContainer>
        <AuthContainer title="Log In To Workroom">
          <View style={styles.forms}>
            <TextInput placeholder="Your Email" />
            <TextInputSecret placeholder="Password" />
            <PressableFade onPress={() => {}}>
              <Text style={styles.forgot}>Forgot password ?</Text>
            </PressableFade>
          </View>
          <View style={styles.action}>
            <Button title="Log In" />
            <View style={styles.pressable}>
              <Text style={styles.pressableInfo}>New User? </Text>
              <PressableFade onPress={onPressRegistration}>
                <Text style={styles.pressableLink}>Create Account</Text>
              </PressableFade>
            </View>
          </View>
        </AuthContainer>
      </ScreenContainer>
    );
  }
);

const styles = StyleSheet.create({
  forgot: {
    textAlign: "right",
    marginTop: Demensions.moderateScale(20),
    color: Render.COLOR_INPUT,
    fontSize: Demensions.PRIMARY_FONT_SIZE,
  },
  forms: {},
  action: {
    marginTop: Demensions.moderateScale(50),
  },
  pressable: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Demensions.moderateScale(35),
  },
  pressableInfo: {
    color: Render.COLOR_INPUT,
  },
  pressableLink: {
    color: Render.COLOR_ACCENT,
  },
});
