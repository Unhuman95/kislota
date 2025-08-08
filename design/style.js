import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    view: {
        flex: 1,
        minHeight: 1,
        backgroundColor: '#200B38',
        flexDirection: "column",
        justifyContent: 'space-around',
    },
    container: {
        flex: 1,
        backgroundColor: "#00A8BA",
        margin: 8,
        padding: 8,
        flexDirection: 'column',
        borderRadius: 25,
    },
    schedule: {
        flex: 1,
        backgroundColor: '#BDEBF0',
        margin: 5,
        padding: 5,
        borderRadius: 25,
    },
    list:{
        fontSize: 16,
        margin: 5,
    },
    column: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        //backgroundColor:'red',
        margin:1,
    },
    left_up: {
        fontSize: 22,
        textAlign: 'left',
        color: '#FFFFFF'
    },
    right_up: {
        fontSize: 20,
        textAlign: 'right',
        textAlign: 'center',
    },
    left_bottom: {
        fontSize: 16,
        textAlign: 'left',
    },
    right_bottom: {
        fontSize: 16,
        textAlign: 'left',
    },
    text: {
        flex: 1,
        flexWrap: 'wrap',
    },
    contact: {
        flex: 1,
        flexDirection: "column",
        margin: 5,
    },
    name: {
        fontSize: 18,
        color: '#FFFFFF',
        margin: 5
    },
    last_message: {
        fontSize: 16,
        maxWidth: 300,
    },
    last: {
        flex: 1,
        flexDirection: 'row',
        opacity: 0.5,
        justifyContent: 'space-between',
        maxHeight: 25,
        margin: 5,
    },
    func: {
        fontSize: 20,
        color: '#FFFFFF',
    },
    element:{
        margin: 10,
    },
    end: {
        textAlign: "center",
        fontSize: 20,
        color: "#14DBDB",
        margin:10,
    },
    transition: {
        paddingBottom: 50,
    },
    info: {
        fontSize: 20,
        padding: 5,
        textAlign: 'center',
        color: '#FFFFFF',
    },
    action: {
        backgroundColor: '#542969',
        flexDirection: 'column',
        margin: 20,
        justifyContent: 'center',
        padding: 20,
        borderRadius: 25,
    },
    button_action: {
        color: '#00A8BA'
    },
    place: {
        backgroundColor: '#542969',
        flex: 1,
        margin: 10,
        marginHorizontal: 20,
        borderRadius: 25,
        padding: 10,
    },
    link: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        //backgroundColor: '#f0f0f0',
    },
    input: {
        width: '100%',
        color: "#FFFFFF",
        fontSize: 18,
        //backgroundColor: '#ffffff',
        //flex: 1,
        textAlignVertical: 'top',
        borderWidth: 0.1,
    },
    send:{
        flexDirection: 'row',
        padding: 8,
        //backgroundColor: '#f2f2f2',
        alignItems: 'center',
    },
    massege: {
        padding: 10,
        borderRadius: 25,
        margin: 5,
        backgroundColor: "#00A8BA",
        maxWidth: '70%',
    },
    own_message: {
        alignSelf: 'flex-end', 
    },
    smo_message: {
        alignSelf: 'flex-start',
    },
    content:{
        fontSize: 16,
        color: '#FFFFFF',
        //margin: 5
    }
});

export default styles