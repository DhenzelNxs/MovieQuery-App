import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "../App/Pages/Login";

const Stack = createNativeStackNavigator();

export default function AuthRoutes() {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
                animationDuration: 300,
            }}
            id={undefined}
        >
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    )
}