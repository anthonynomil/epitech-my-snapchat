import {useEffect, useRef, useState} from "react";
import {Dimensions, Image, SafeAreaView, StyleSheet, View} from "react-native";
import {Camera, CameraType} from "expo-camera";
import {FAB, SegmentedButtons, Text} from "react-native-paper";
import {Flex} from "@react-native-material/core";

const WINDOW_HEIGHT = Dimensions.get("window").height

const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * .08)

const Snap = ({navigation}) => {
    const [permission, setPermission] = useState(null)
    const [isPreview, setIsPreview] = useState(false)
    const [photo, setPhoto] = useState(null)
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off)
    const [cameraType, setCameraType] = useState(CameraType.back)
    const [isCameraReady, setIsCameraReady] = useState(false)
    const [snapTime, setSnapTime] = useState("5")
    const cameraRef = useRef(null)

    const onCameraReady = async () => {
        setIsCameraReady(true)
    }

    const takePicture = async () => {
        if (cameraRef.current && isCameraReady) {
            const data = await cameraRef.current.takePictureAsync({
                quality: 0.1,
                base64: true,
            })
            const source = data.uri
            if (data) {
                await cameraRef.current.pausePreview();
                setIsPreview(true);
                setPhoto(data);
            }
        }
    }

    const switchCamera = () => {
        if (isPreview) {
            return;
        }
        setCameraType((prevCameraType) =>
            prevCameraType === CameraType.back
                ? CameraType.front
                : CameraType.back
        )
    }

    const toggleFlashMode = () => {
        if (isPreview) {
            return;
        }
        setFlashMode((prevFlashMode) =>
            prevFlashMode === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off
        )
    }

    const cancelPreview = () => {
        setIsPreview(false)
        setPhoto(null)
        cameraRef.current.resumePreview()
    }

    const sendSnap = () => {
        navigation.navigate("SendSnap", {photo, snapTime})
    }

    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestCameraPermissionsAsync()
            setPermission(status === "granted")
        })()
    }, [])

    if (!permission) {
        return <Text>No access to camera</Text>
    }

    return (
        <SafeAreaView style={{flex: 1, width: "100%", height: "100%"}}>
            <Camera type={cameraType}
                    ref={cameraRef}
                    flashMode={flashMode}
                    onCameraReady={onCameraReady}
                    style={style.container}
            >
                <View style={style.container}>
                    {isPreview && photo ? (
                        <View style={style.container}>
                            <Image source={{uri: photo.uri}}
                                   style={{zIndex: -1}}/>
                            <Flex justify={"end"} fill items={"center"}>
                                <View style={style.buttonContainer2}>
                                    <View style={{
                                        width: "60%",
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <SegmentedButtons
                                            value={snapTime}
                                            onValueChange={setSnapTime}
                                            buttons={[
                                                {value: "5", label: '5'},
                                                {value: "10", label: '10'},
                                                {value: "15", label: '15'},
                                                {value: "20", label: '20'},
                                            ]}
                                            style={{marginBottom: 25}}
                                        />
                                    </View>
                                    <View style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        width: "100%",
                                        justifyContent: "space-around",
                                    }}>
                                        <View>
                                            <FAB size={"large"}
                                                 icon={"send"}
                                                 onPress={sendSnap}
                                            />
                                        </View>
                                        <View>
                                            <FAB size={"large"} icon={"cancel"}
                                                 onPress={cancelPreview}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </Flex>
                        </View>
                    ) : (
                        <Flex fill items={"center"} justify={"end"}>
                            <View style={style.buttonContainer}>
                                <View>
                                    <FAB size={"medium"} icon={"crop-rotate"}
                                         onPress={switchCamera}/>
                                </View>
                                <View>
                                    <FAB size={"large"}
                                         icon={"camera-enhance"}
                                         onPress={takePicture}/>
                                </View>
                                <View>
                                    <FAB size={"medium"} icon={flashMode
                                    === Camera.Constants.FlashMode.off
                                        ? "flash-off" : "flash"}
                                         onPress={toggleFlashMode}/>
                                </View>
                            </View>
                        </Flex>
                    )}
                </View>
            </Camera>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        marginBottom: "30%",
        width: "100%",
        justifyContent: "space-around",
        alignItems: "center"
    },
    buttonContainer2: {
        display: "flex",
        marginBottom: "30%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default Snap;
