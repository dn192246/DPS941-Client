import { View, Text } from "react-native";


export default function Task({id, title, shared_with_id, completed}){
return(
    <View>
        <Text>{title}</Text>
    </View>
)
}