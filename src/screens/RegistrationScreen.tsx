import React, { useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ScreenContainer,
  AuthContainer,
  TextInput,
  TextInputSecret,
  PressableFade,
  Button,
  CodeInput,
  PhoneInput,
} from "../components";
import { Demensions, Render } from "../helpers";
import { registrationSchema } from "../validations/registration.validate";
import { RootStackParamList } from "../routes/Navigation";
import { Database } from "../services/database";

type RegistrationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Registration"
>;

type RegSubmitType = {
  phone: string;
  code: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const RegistrationScreen = ({ navigation }: RegistrationScreenProps) => {
  const onPressRegistration = useCallback(() => {
    navigation.replace("Login");
  }, []);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      phone: "",
      code: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(registrationSchema),
  });

  const onPressSubmit = (res: RegSubmitType) => {
    const { confirmPassword, code, ...params } = res;

    Database.registration({ ...params })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ScreenContainer>
      <AuthContainer title={"Sing Up To Workroom"}>
        <View style={styles.forms}>
          <PhoneInput
            control={control}
            name={"phone"}
            placeholder="Phone Number"
          />
          <CodeInput control={control} name={"code"} placeholder="Code" />
          <TextInput control={control} name={"name"} placeholder="Your Name" />
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
          <TextInputSecret
            control={control}
            name={"confirmPassword"}
            placeholder="Confirm Password"
          />
          <View style={styles.action}>
            <Button title="Next" onPress={handleSubmit(onPressSubmit)} />
            <View style={styles.pressable}>
              <Text style={styles.pressableInfo}>Have Account? </Text>
              <PressableFade onPress={onPressRegistration}>
                <Text style={styles.pressableLink}>Log In</Text>
              </PressableFade>
            </View>
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
