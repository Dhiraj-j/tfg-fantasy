import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '@screens/Auth/LoginScreen';
import SignupScreen from '@screens/Auth/SignupScreen';
import OtpScreen from '@screens/Auth/OtpScreen';
import HomeScreen from '@screens/Stack/HomeScreen';
import MatchCreate from '@screens/Stack/MatchCreate';

const {Screen, Navigator} = createStackNavigator();

const MainStack = () => {
  return (
    <Navigator screenOptions={{headerShown: true}}>
      <Screen name="Home" component={HomeScreen} />
      <Screen name="MatchCreate" component={MatchCreate} />
    </Navigator>
  );
};

const AuthStack = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="Login" component={LoginScreen} />
      <Screen name="Signup" component={SignupScreen} />
      <Screen name="Otp" component={OtpScreen} />
    </Navigator>
  );
};

const RootNavigation = () => {
  const user = true;
  return user ? <MainStack /> : <AuthStack />;
};

export default RootNavigation;
