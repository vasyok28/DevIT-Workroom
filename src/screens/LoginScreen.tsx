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
import { useForm } from "react-hook-form";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { yupResolver } from "@hookform/resolvers/yup";
import { Demensions, Render } from "../helpers";
import { RootStackParamList } from "../routes/Navigation";
import { authSchema } from "../validations/auth.validate";
import { Database, LoginRequestType } from "../services/database";

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const onPressRegistration = useCallback(() => {
    navigation.replace("Registration");
  }, [navigation]);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(authSchema),
  });

  const onPressSubmit = (res: LoginRequestType) => {
    Database.login({ ...res })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ScreenContainer>
      <AuthContainer title="Log In To Workroom">
        <View style={styles.forms}>
          <TextInput
            control={control}
            name={"email"}
            placeholder="Your Email"
          />
          <TextInputSecret
            control={control}
            name={"password"}
            placeholder="Password"
          />
          <PressableFade onPress={() => {}}>
            <Text style={styles.forgot}>Forgot password ?</Text>
          </PressableFade>
        </View>
        <View style={styles.action}>
          <Button title="Log In" onPress={handleSubmit(onPressSubmit)} />
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
};

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
