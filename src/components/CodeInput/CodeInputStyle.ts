import { StyleSheet } from "react-native";
import { Demensions, Render } from "../../helpers";

export const styles = StyleSheet.create({
  codeFieldRoot: { flex: 0, justifyContent: "flex-start" },
  placeholder: {
    marginTop: Demensions.verticalScale(40),
    marginBottom: Demensions.verticalScale(15),
    color: Render.COLOR_INPUT,
  },
  cell: {
    marginRight: 25,
    width: 48,
    height: 48,
    lineHeight: 48,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#D7D7D7",
    textAlign: "center",
    borderRadius: 15,
    fontWeight: "500",
  },
  focusCell: {
    borderColor: "#FFC612",
    color: "#1F1D1D",
  },
});
