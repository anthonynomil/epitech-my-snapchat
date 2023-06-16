import {Flex} from "@react-native-material/core";
import {View} from "react-native";
import {Text} from "react-native-paper";
import {useContext, useState} from "react";
import {getUserFriends} from "../../requests/user.requests";
import {UserContext} from "../../utils/context.utils";
import UserCard from "../../components/user/UserCard";

const Friends = () => {
    const {user} = useContext(UserContext)
    const [friends, setFriends] = useState([])

    const getFriends = async () => {
        try {
            const response = await getUserFriends(user.token)
            if (response.length > 0) {
                setFriends(response)
            }
        } catch (e) {
            alert("Error getting friends")
            console.log(e)
        }
    }

    return (
        <Flex fill style={{height: "100%"}}>
            <View style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 25
            }}>
                {friends.length > 0 ?
                    friends.map((friend) => (
                        <UserCard user={friend}/>)) :
                    <Text variant={"displaySmall"} style={{color: "#663399"}}>You
                        have no friends.</Text>
                }
            </View>
        </Flex>
    )

}

export default Friends;
