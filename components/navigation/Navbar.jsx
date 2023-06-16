import {StyleSheet} from "react-native";
import {Appbar, FAB} from "react-native-paper";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const Navbar = ({state, descriptors, navigation}) => {
    const {bottom} = useSafeAreaInsets();

    const routes = {
        Friends: {
            icon: "account-multiple",
        },
        Camera: {
            icon: "camera",
        },
        "Add friend": {
            icon: "account-plus",
        },
        Home: {
            icon: "home",
        },
        Profile: {
            icon: "account-circle",
        }
    }

    return (
        <Appbar
            style={[
                styles.bottom,
            ]}>
            {state.routes.map((route, index) => {
                if (route.name === "Camera") {
                    return (
                        <FAB
                            mode={"flat"}
                            size={"large"}
                            key={route.key}
                            icon={routes[route.name].icon}
                            onPress={() => navigation.navigate(route.name)}/>
                    )
                }
                return (
                    <Appbar.Action
                        key={route.key}
                        icon={routes[route.name].icon}
                        onPress={() => navigation.navigate(route.name)}
                    />
                )
            })}
        </Appbar>
    );
};

const styles = StyleSheet.create({
    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});

export default Navbar;
