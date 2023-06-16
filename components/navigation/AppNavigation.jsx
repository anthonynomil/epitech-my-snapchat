import Navbar from "./Navbar";
import Home from "../../pages/Home";
import Friends from "../../pages/user/Friends";
import Profile from "../../pages/user/Profile";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {useContext} from "react";
import {UserContext} from "../../utils/context.utils";
import Snap from "../../pages/snap/Snap";
import AddFriend from "../../pages/AddFriend";

const AppNavigation = ({navigation}) => {
    const StackBottom = createBottomTabNavigator()
    const {user} = useContext(UserContext)

    if (!user) {
        navigation.navigate("Auth")
        return null;
    }

    return (
        <StackBottom.Navigator
            tabBar={(props) => <Navbar {...props}/>}
            screenOptions={{headerTitleAlign: "center"}}>
            <StackBottom.Screen name={"Home"} component={Home}
                                options={{unmountOnBlur: true}
                                }
            />
            <StackBottom.Screen name={"Profile"} component={Profile}/>
            <StackBottom.Screen name={"Camera"} component={Snap}
                                options={{
                                    headerShown: false,
                                    unmountOnBlur: true
                                }}/>
            <StackBottom.Screen name={"Friends"} component={Friends}/>
            <StackBottom.Screen name={"Add friend"} component={AddFriend}/>
        </StackBottom.Navigator>
    )
}

export default AppNavigation;
