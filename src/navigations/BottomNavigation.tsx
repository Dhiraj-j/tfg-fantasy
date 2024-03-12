import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StackNavigation from './StackNavigation';
import HomeScreen from '@screens/Stack/HomeScreen';

const {Screen, Navigator} = createBottomTabNavigator();
const BottomNavigation = () => {
  return (
    <Navigator>
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Stack" component={StackNavigation} />
    </Navigator>
  );
};

export default BottomNavigation;
