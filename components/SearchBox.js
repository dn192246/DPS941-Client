import { TextInput, StyleSheet } from "react-native";

export default function SearchBox({ onChangeText, searchTerm }) {

    return (
        <TextInput
            placeholder='Buscar...'
            onChangeText={onChangeText}
            value={searchTerm}
            style={styles.searchBox}
        />
    );
}

const styles = StyleSheet.create({
    searchBox: {
        width: "90%",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 5,
        height: 50,
        paddingHorizontal: 15,
        backgroundColor: "white",
    },
});
