import React from 'react';
import { ActivityIndicator, StyleSheet, View ,Text,FlatList,ListItem } from 'react-native';

export default class UsersScreen extends React.Component {
  static navigationOptions = {
    title: 'Users',
  };

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('http://ec2-34-245-47-221.eu-west-1.compute.amazonaws.com:3000/api/users')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.data.docs,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View>
        <FlatList
          data={this.state.dataSource}
          renderItem ={({item}) =>    <Text style={styles.item}>{item.name}</Text>
          }
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }

  // render() {
  //   return (
  //     <ScrollView style={styles.container}>
  //       {/* Go ahead and delete ExpoLinksView and replace it with your
  //          * content, we just wanted to provide you with some helpful links */}
  //       <ExpoLinksView />
  //     </ScrollView>
  //   );
  // }


}
const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
