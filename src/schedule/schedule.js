import * as React from 'react';
import { Dimensions, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";

import Discipline from './discipline';
import { selectLesson } from '../DB/data_base';
import { RoleContext } from '../context';

const ViewTypes = {
    FULL: 0,
};

class ScheduleList extends React.Component {
  constructor(props) {

        super(props);
        
        let { width } = Dimensions.get("window");

        this.state = {
            dataProvider: new DataProvider((r1, r2) => r1 !== r2),
        };

        this._layoutProvider = new LayoutProvider(
            index => {
            return ViewTypes.FULL;
            },
            (type, dim) => {
                switch (type) {
                    case ViewTypes.FULL:
                        dim.width = width;
                        dim.height = 160;
                        break;
                    default:
                        dim.width = 0;
                        dim.height = 0;
                }
            }
        );

        this._rowRenderer = this._rowRenderer.bind(this);
    }
    static contextType = RoleContext;

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus', this.fetchTasks);
        this.fetchTasks();
    }

    fetchTasks = async () => {
        try {
          const lessons = await selectLesson();
          this.setState(prevState => ({
            dataProvider: prevState.dataProvider.cloneWithRows(lessons),
          }));
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
        console.log(lessons);
    };

  _rowRenderer(type, data) {
      const { title, count, teacher,  kid, lesson} = data;
      switch (type) {
          case ViewTypes.FULL:
              return (
                    <Discipline 
                        title = {title} 
                        count = {count} 
                        teacher = {teacher} 
                        kid = {kid} 
                        lesson = {lesson}
                        navigation = {this.props.navigation}/>
              );
          default:
              return null;
      }
  }

  render() {
    const { dataProvider } = this.state;
      return (
            <View style = {[styles.view]}>
                {dataProvider.getSize() > 0 ? (
                    <RecyclerListView 
                        style={{flex: 1,}}
                        layoutProvider={this._layoutProvider} 
                        dataProvider={dataProvider} 
                        rowRenderer={this._rowRenderer}
                        windowSize={5}
                        scrollEnabled = {true}/>
                    ):(
                            <Text>No tasks available</Text>
                        )}
            </View>);
  }
}

const styles = StyleSheet.create({
    
    view: {
        flex: 1,
        minHeight: 1,
    },
})

export default ScheduleList