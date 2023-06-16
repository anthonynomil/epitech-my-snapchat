import {View} from "react-native";
import {Button, Text, TextInput} from "react-native-paper";
import {Controller, useForm} from "react-hook-form";
import {registerUser} from "../../../requests/user.requests";

const Register = ({navigation}) => {
    const {control, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            email: "",
            username: "",
            password: "",
        }
    });

    const onSubmit = async (data) => {
        try {
            const response = await registerUser(data);
            alert("Successfully registered!")
            navigation.navigate("Auth")
        } catch (e) {
            alert("Error registering user.")
        }
    }

    return (
        <View style={{width: "100%"}}>
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
            <Controller name="username" control={control} rules={{
                required: true,
            }} render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                    label={"Username"}
                    mode="outlined"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={{marginTop: 25}}
                />
            )}/>
            {errors.username && <Text style={{color: "red"}}>Username is
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
            <Button style={{marginTop: 25}} title={"Register"}
                    mode={"contained"}
                    onPress={handleSubmit(onSubmit)}>Register</Button>
        </View>
    )
}

export default Register;
