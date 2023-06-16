import {ActivityIndicator, View} from "react-native";
import {useContext, useEffect, useState} from "react"
import {UserContext} from "../utils/context.utils";
import {Text} from "react-native-paper";
import {getDataJSON} from "../utils/storage.utils";
import {getSnapById, getUserSnap} from "../requests/snap.requests";
import {getUserById} from "../requests/user.requests";
import {ListItem} from "@react-native-material/core";

const Home = ({navigation}) => {
    const [snaps, setSnaps] = useState([])
    const userContext = useContext(UserContext)
    const getUser = async () => {
        const user = await getDataJSON("user")
        if (user) {
            userContext.setUser(user)
        }
    }

    const getSnaps = async () => {
        try {
            const response = await getUserSnap(userContext.user.token)
            const snaps = response.data;
            for (const snap of snaps) {
                const user = await getUserById(userContext.user.token,
                    snap.from)
                const image = await getSnapById(userContext.user.token,
                    snap._id)
                snap.user = user.data
                snap.image = image.data.image
                snap.duration = image.data.duration
            }
            setSnaps(snaps)
        } catch (e) {
            console.log(e.response.data)
        }
    }

    useEffect(() => {
        getUser().then(() => {
            if (userContext.user === null) {
                navigation.navigate("Auth")
            }
        })
        getSnaps()
    }, [])

    const renderSnaps = () => {
        return (
            <View style={{width: "100%"}}>
                {snaps.map((snap) => (
                    <ListItem key={snap._id} title={snap.user.username}
                              secondaryText={snap.date}
                              onPress={() => navigation.navigate("SnapWatcher",
                                  {snap: snap})}
                    />
                ))}
            </View>
        )
    }

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: "100%"
        }}>
            {userContext.user ? <Text>Welcome
                    Home {userContext.user.username}</Text> :
                <Text>Loading...</Text>}
            {snaps && snaps.length > 0 ? renderSnaps() : snaps ? <Text>No snap
                found</Text> : <ActivityIndicator animating={true}/>}
        </View>
    )
}

export default Home;
