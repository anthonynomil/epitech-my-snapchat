import {Image, View} from "react-native";

const Picture = ({image}) => {
    return (
        <View style={{width: "100%", height: "100%"}}>
            <Image source={{uri: image}}
                   style={{width: "100%", height: "100%"}}/>
        </View>
    )
}

export default Picture;
