import React from "react";
import { Text, View } from "react-native";
import { styles } from "./CodeInputStyle";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

type CodeInputType = {
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  cellCount?: number;
};

export const CodeInput = React.memo((props: CodeInputType) => {
  const { placeholder, value, setValue, cellCount = 4 } = props;
  const ref = useBlurOnFulfill({ value, cellCount });

  const [onPressOut, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <View>
      <Text style={styles.placeholder}>{placeholder}</Text>
      <CodeField
        ref={ref}
        {...onPressOut}
        value={value}
        onChangeText={setValue}
        cellCount={cellCount}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
    </View>
  );
});
