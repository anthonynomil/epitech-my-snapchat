import {Text} from "react-native-paper";
import {Flex} from "@react-native-material/core";

const AddFriend = () => {
    return (
        <Flex fill items={"center"}>
            <Text variant={"headlineLarge"}
                  style={{marginTop: 25, color: "#663399"}}>Add Friends
                :</Text>
        </Flex>
    )
}

export default AddFriend
