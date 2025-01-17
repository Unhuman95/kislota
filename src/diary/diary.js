import React, { useEffect } from 'react';
import {Dimensions, TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";

import Task from './task';
import { selectTask } from '../DB/data_base';
import { RoleContext } from '../context';
import { hasPermission } from '../login/login';

const ViewTypes = {
  FULL: 0,
};
class RecycleTestComponent extends React.Component {
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
                    dim.height = 120;
                    break;
                default:
                    dim.width = 0;
                    dim.height = 0;
            }
          }
      );
      this._rowRenderer = this._rowRenderer.bind(this);
  }
  static contextType = RoleContext

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', this.fetchTasks);
    this.fetchTasks();
  }

  fetchTasks = async () => {
    try {
      const tasks = await selectTask();
      this.setState(prevState => ({
        dataProvider: prevState.dataProvider.cloneWithRows(tasks),
      }));
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  _rowRenderer(type, data) {
      const { date, task } = data;
      switch (type) {
          case ViewTypes.FULL:
              return (
                <View style = {[styles.list]}>
                    <Task 
                        date = {date} 
                        task = {task}
                        navigation = {this.props.navigation}/>
                </View>
              );
          default:
              return null;
      }
  }

  render() {
    const { role } = this.context;
    const { dataProvider } = this.state;
      return (
        <View style = {{flex: 1}}>
            {role === 'tutor' && ( 
                <TouchableOpacity onPress={() => this.props.navigation.navigate('add_task')} style={styles.add}>
                    <Text style={styles.text}>Добавить задание</Text>
                </TouchableOpacity>
            )}
            <View style = {[styles.view]}>
              {dataProvider.getSize() > 0 ? (
                <RecyclerListView 
                    layoutProvider={this._layoutProvider} 
                    dataProvider={dataProvider} 
                    rowRenderer={this._rowRenderer}/>):(
                      <Text>No tasks available</Text>
                    )}   
                
            </View>
        </View>);
  }
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    view: {
        minHeight: 1,
        minHeight: 1,
    },
    filter: {
        fontSize: 18,
        margin: 8,
        textAlign: 'right',
    },
    add: {
        alignItems: "center",
        margin: 5,
    },
    text: {
        fontSize: 18,
        color: "#008800",
    }

})

export default RecycleTestComponent