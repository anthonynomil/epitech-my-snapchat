import {NavigationContainer} from "@react-navigation/native";
import {useState} from "react";
import {PaperProvider} from "react-native-paper";
import {UserContext} from "./utils/context.utils";
import Auth from "./pages/user/auth/Auth";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AppNavigation from "./components/navigation/AppNavigation";
import SendSnap from "./pages/snap/SendSnap";
import SnapWatcher from "./pages/snap/SnapWatcher";

const App = () => {
    const Stack = createNativeStackNavigator()
    const [user, setUser] = useState(null)

    return (
        <PaperProvider>
            <UserContext.Provider value={{user, setUser}}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{
                        headerTitleAlign: "center"
                    }}>
                        <Stack.Screen name={"Auth"} component={Auth}/>
                        <Stack.Screen name={"Navigation"}
                                      options={{headerShown: false}}
                                      component={AppNavigation}/>
                        <Stack.Screen name={"SendSnap"} component={SendSnap}/>
                        <Stack.Screen name={"SnapWatcher"}
                                      option={{headerShown: false}}
                                      component={SnapWatcher}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </UserContext.Provider>
        </PaperProvider>
    );
}

export default App;
