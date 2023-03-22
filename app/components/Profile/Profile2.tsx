import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';

export default function Profile2({ navigation }) {
    const { colors }: any = useTheme();
    const { dark }: any = useTheme();

    return (
        <ScrollView style={styles.container}>
            <Text>Profile 2 !!!!!!!!!!!!!</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10
    },
    currentRating: {
        width: "100%",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10
    },
    center: {
        alignSelf: "center"
    },
    buttonCategory: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        elevation: 3,
    },
    careerStatsBlock: {
        flexDirection: "column",
        padding: 10,
        borderRadius: 5
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.25
    }
});
  