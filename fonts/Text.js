import { useFonts } from "expo-font";
import { Text as RNText } from "react-native";

const Text = ({ style, ...rest }) => {
  const [fontsLoaded] = useFonts({
    Montserrat: require("../fonts/Montserrat-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <RNText style={[{ fontFamily: "Montserrat" }, style]} {...rest} />;
};

export default Text;
