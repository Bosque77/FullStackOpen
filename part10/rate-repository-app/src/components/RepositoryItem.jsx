import { View, Text, StyleSheet, Image } from 'react-native';
import theme from '../theme';


const styles = StyleSheet.create({
    block: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10
    },
    spacing: {
        backgroundColor: '#A9A9A9',
        padding: 5
    },
    logo: {
        height: 50,
        width: 50,
        marginLeft: 10,
        marginRight: 10,
    },
    fullNameText: {
        marginTop: 5,
        marginBottom: 10,
        fontWeight: '600'
    },
    descriptionText: {
        color: '#757575'
    },
    languageText: {
        color: '#FFFFFF',
        backgroundColor: '#0277bd',
        padding: 5,
    },
    languageViewBlock: {
        marginTop: 10, marginBottom: 5, flex: 0, flexDirection: 'row', borderRadius: 10
    },
    bottomBlockText: {
        fontWeight: theme.fontWeights.bold
    }
});



const RepositoryItem = ({ item }) => {

    const view_style = [
        styles.block
    ]

    const fork_count = (item.forksCount / 1000).toFixed(1)
    const stars = (item.stargazersCount / 1000).toFixed(1)

    return (
        <>
            <View key={item.id} style={view_style}>
                <View>
                    <Image style={styles.logo} source={{ uri: item.ownerAvatarUrl }} />
                </View>
                <View >

                    <Text style={styles.fullNameText}>{item.fullName}</Text>
                    <Text style={styles.descriptionText}>{item.description}</Text>
                    <View style={styles.languageViewBlock}>
                        <Text style={styles.languageText}>{item.language} </Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10, marginBottom: 10 }}>
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.bottomBlockText}>{stars} k</Text>
                    <Text>Stars</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.bottomBlockText}>{fork_count} k</Text>
                    <Text>Forks</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.bottomBlockText}>{item.reviewCount}</Text>
                    <Text>Reviews</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.bottomBlockText}>{item.ratingAverage}</Text>
                    <Text>Rating</Text>
                </View>
            </View>

            <View style={styles.spacing}></View>

        </>
    )

}


export default RepositoryItem