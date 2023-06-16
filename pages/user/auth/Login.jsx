import {Button, Text, TextInput} from "react-native-paper";
import {Controller, useForm} from "react-hook-form";
import {View} from "react-native";
import {loginUser} from "../../../requests/user.requests";
import {useContext} from "react";
import {UserContext} from "../../../utils/context.utils";
import {storeDataJSON} from "../../../utils/storage.utils";

const Login = ({navigation}) => {
    const userContext = useContext(UserContext);

    //TODO Remove default values
    const {control, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = async (data) => {
        try {
            const response = await loginUser(data);
            alert("Successfully logged in!");
            await storeDataJSON("user", response.data);
            userContext.setUser(response.data);
            navigation.push("Navigation");
        } catch (e) {
            alert("Invalid credentials!");
        }

    };

    return (
        <View center style={{width: "100%"}}>
            <Controller name="email" control={control} rules={{
                required: true,
            }} render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                    label={"Email"}
                    mode="outlined"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                />
            )}/>
            {errors.email && <Text style={{color: "red"}}>Email is
                required.</Text>}
            <Controller name="password" control={control} rules={{
                required: true,
            }} render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                    secureTextEntry={true}
                    label={"Password"}
                    mode="outlined"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={{marginTop: 25}}
                />
            )}/>
            {errors.password && <Text style={{color: "red"}}>Password is
                required.</Text>}
            <Button mode={"contained"} style={{marginTop: 25}}
                    title={"Login"}
                    onPress={handleSubmit(onSubmit)}>Login</Button>
        </View>
    );
};

export default Login;
