import {Image, SafeAreaView, View} from "react-native";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../utils/context.utils";
import {seeSnap} from "../../requests/snap.requests";
import {Badge} from "react-native-paper";

const SnapWatcher = ({route, navigation}) => {
    const {snap} = route.params
    const {user} = useContext(UserContext)
    const [timeLeft, setTimeLeft] = useState(snap.duration)
    const [seen, setSeen] = useState(false)

    useEffect(() => {
        const sendSeenSnap = async () => {
            try {
                await seeSnap(user.token, snap._id)
                setSeen(true)
            } catch (e) {
                console.log(e.response.data.data)
                navigation.pop()
            }
        }
        sendSeenSnap()
        console.log(timeLeft)
        let interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev === 0) {
                    clearInterval(interval)
                    navigation.navigate("Home")
                }
                return prev - 1
            })
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    const renderSnap = () => {
        return (
            <SafeAreaView sx={{width: "100%", height: "100%"}}>
                <Image source={{uri: snap.image}} style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "contain",
                    zIndex: -1
                }}/>
                <Badge style={{
                    marginLeft: 100,
                    marginBottom: 200,
                    position: "absolute",
                }}>{timeLeft}</Badge>
            </SafeAreaView>
        )
    }

    return (
        <View>
            {seen ? renderSnap() : <View/>}
        </View>
    )
}

export default SnapWatcher;
