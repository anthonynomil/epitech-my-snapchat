import {View} from "react-native";
import {Flex, Surface} from "@react-native-material/core";
import {SegmentedButtons} from "react-native-paper";
import {useContext, useEffect, useState} from "react";
import Login from "./Login";
import Register from "./Register";
import {UserContext} from "../../../utils/context.utils";

const Auth = ({navigation}) => {
    const [authComponent, setAuthComponent] = useState('login')
    const userContext = useContext(UserContext)

    useEffect(() => {
        if (userContext.user) {
            navigation.navigate("Navigation")
        }
    }, [])

    return (
        <View style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
        }}>
            <Surface style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "75%",
                padding: 25,
                borderRadius: 25,
            }}>
                <Flex inline center>
                    <SegmentedButtons
                        value={authComponent}
                        onValueChange={setAuthComponent}
                        buttons={[
                            {label: 'Login', value: 'login'},
                            {label: 'Register', value: 'register'},
                        ]}
                    />
                </Flex>
                <Flex style={{width: "100%", marginTop: 50}}>
                    {authComponent === 'login' ? <Login
                        navigation={navigation}/> : <Register
                        navigation={navigation}/>}
                </Flex>
            </Surface>
        </View>
    )
}
export default Auth;
