import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import theme from '../theme';
import * as React from "react";

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    background: {
        backgroundColor: theme.colors.navBar,
        opacity: 1
    },
    headerText: {
        color: theme.colors.white,
        marginBottom: 15,
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
        fontSize: theme.fontSizes.heading,
        fontWeight: theme.fontWeights.bold,
        fontFamily: theme.fonts.heading

    }
});

// const onPressFunction = () => {
//     console.log('I just got pressed ;p')
// }

const AppBar = () => {
    const appStyle = [
        styles.container,
        styles.background
    ]


    return (
        <>
            <View style={appStyle}>
                <ScrollView horizontal>
                    <Link to="/"><Text style={styles.headerText}>Repositories</Text></Link>
                    <Link to="/signin"><Text style={styles.headerText}>Sign In</Text></Link>
                </ScrollView>

            </View>
        </>
    )



}





export default AppBar;