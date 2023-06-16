import {Flex, Surface} from "@react-native-material/core";
import {UserContext} from "../../utils/context.utils";
import {Button, Text, TextInput} from "react-native-paper";
import {useContext} from "react";
import {Controller, useForm} from "react-hook-form";
import {Alert, View} from "react-native";
import {removeData} from "../../utils/storage.utils";
import {deleteUser} from "../../requests/user.requests";

const Profile = ({navigation}) => {
    const userContext = useContext(UserContext)

    const {control, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            username: userContext.user.username,
            email: userContext.user.email,
            newPassword: "",
        }
    });

    const logout = async () => {
        userContext.setUser(null)
        await removeData("user")
        navigation.navigate("Auth")
    }

    const onSubmit = async (data) => {
        try {
            for (let elem of data) {
                if (data[elem] === "" || userContext[elem] === data[elem]) {
                    delete data[elem]
                }
            }
            console.log(data)
        } catch (e) {
            alert(e.response.data.data)
        }
    }

    const deleteAccount = async () => {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account?",
            [{
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
            },
                {
                    text: "Delete",
                    onPress: async () => {
                        await deleteUser(userContext.user.token)
                        await removeData("user")
                        userContext.setUser(null)
                        navigation.navigate("Auth")
                    },
                    style: "destructive",
                }]
        )
    }

    return (
        <Flex center style={{height: "90%"}}>
            <Surface style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "75%",
                padding: 25,
                borderRadius: 25
            }}>
                <Text>Profile</Text>
                <View style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Controller name="username" rules={{required: true}}
                                control={control}
                                render={({
                                    field: {
                                        onChange,
                                        onBlur,
                                        value
                                    }
                                }) => (
                                    <TextInput
                                        label={"Username"}
                                        mode="outlined"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        style={{marginTop: 25, width: "100%"}}
                                    />
                                )}/>
                    {errors.username && <Text style={{color: "red"}}>Username is
                        required.</Text>}
                    <Controller name="email" rules={{required: true}}
                                control={control}
                                render={({
                                    field: {
                                        onChange,
                                        onBlur,
                                        value
                                    }
                                }) => (
                                    <TextInput
                                        label={"Email"}
                                        mode="outlined"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        style={{marginTop: 25, width: "100%"}}
                                    />
                                )}/>
                    {errors.email && <Text style={{color: "red"}}>Email is
                        required.</Text>}
                    <Controller style={{marginTop: 25}}
                                name="newPassword" control={control}
                                render={({
                                    field: {
                                        onChange,
                                        onBlur,
                                        value
                                    }
                                }) => (
                                    <TextInput
                                        secureTextEntry={true}
                                        label={"New Password"}
                                        mode="outlined"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        style={{marginTop: 25, width: "100%"}}
                                    />
                                )}/>
                    {errors.newPassword && <Text style={{color: "red"}}>Password
                        is required.</Text>}
                    <Button mode="contained"
                            style={{marginTop: 50, width: "100%"}}
                            onPress={handleSubmit(onSubmit)}>Update</Button>
                    <Button mode="outlined"
                            style={{
                                marginTop: 25,
                                width: "100%",
                            }}
                            onPress={logout}>Logout</Button>
                    <Button mode="contained"
                            style={{
                                marginTop: 25,
                                backgroundColor: "#b70000",
                                width: "100%",
                            }}
                            onPress={deleteAccount}
                    >Delete
                        Account</Button>
                </View>
            </Surface>
        </Flex>
    )
}

export default Profile;
