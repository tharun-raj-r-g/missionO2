import { useFonts } from "expo-font";
import { Text as RNText } from "react-native";

const Text = ({ style, ...rest }) => {
  const [fontsLoaded] = useFonts({
    MontserratB: require("../fonts/Montserrat-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <RNText style={[{ fontFamily: "MontserratB" }, style]} {...rest} />;
};

export default Text;
