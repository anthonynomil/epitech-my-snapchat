import {ScrollView, Text, View} from "react-native";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../utils/context.utils";
import * as userRequests from "../../requests/user.requests";
import {Flex, ListItem} from "@react-native-material/core";
import * as FileSystem from "expo-file-system";
import {sendSnap} from "../../requests/snap.requests";

const SendSnap = ({route, navigation}) => {
    const {photo, snapTime} = route.params
    const [friends, setFriends] = useState([])
    const [users, setUsers] = useState([])
    const {user} = useContext(UserContext)

    const getUsers = async () => {
        try {
            const response = await userRequests.getUsers(user.token)
            if (!response.data || response.data.length === 0) {
                return
            }
            response.data.sort((a, b) => {
                if (a.username < b.username) {
                    return -1
                }
                if (a.username > b.username) {
                    return 1
                }
                return 0
            });
            setUsers(response.data)
        } catch (e) {
            console.log(e)
        }
    };

    const getFriends = async () => {
        try {
            const response = await userRequests.getUserFriends(user.token)
            if (!response.data || response.data.length === 0) {
                return
            }
            response.data.sort((a, b) => {
                if (a.username < b.username) {
                    return -1
                }
                if (a.username > b.username) {
                    return 1
                }
                return 0
            });
            setFriends(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getFriends()
        getUsers()
    }, [])

    const send = async (friend) => {
        try {
            const snap = {
                to: friend._id,
                image: `data:image/jpg;base64,${photo.base64}`,
                duration: parseInt(snapTime)
            }
            await sendSnap(snap, user.token)
            navigation.navigate("Home")
        } catch (e) {
            console.log(e)
        }
    }

    const convertImage = async (imgUri) => {
        let image = await FileSystem.readAsStringAsync(imgUri,
            {encoding: 'base64'});
        return `data:image/jpg;base64,${image}`
    }

    const renderFriends = () => {
        return (
            <Flex fill items={"center"} style={{marginTop: 50, width: "80%"}}>
                <Text>Friends</Text>
                {friends.length > 0 ? friends.map(friend => (
                    <ListItem
                        key={friend._id}
                        title={friend.username}
                        onPress={() => {
                            send(friend)
                        }}
                    />
                )) : <Text>No friends</Text>}
            </Flex>
        )
    }

    const renderUsers = () => {
        return (
            <View
                style={{marginTop: 50, width: "80%", height: "100%"}}>
                <Text>Users</Text>
                <ScrollView>
                    {users.length > 0 ? users.map(user => (
                            <ListItem
                                key={user._id}
                                title={user.username}
                                onPress={() => {
                                    send(user)
                                }}
                            />
                        ))
                        : <Text>No users</Text>
                    }
                </ScrollView>
            </View>
        )
    }

    return (
        <View style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            {friends ? renderFriends() : null}
            {users ? renderUsers() : null}
        </View>
    )
}

export default SendSnap
