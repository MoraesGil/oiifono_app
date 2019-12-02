import React, { useState } from "react";
import { Text, View, FlatList, ActivityIndicator} from "react-native";
import { useSelector } from "react-redux";
import { ListItem, Avatar, Tooltip } from "react-native-elements";

import styles from "./styles";
import StatusIcon from "components/StatusIcon.js";

export default function Schedule({ navigation }) {
  const _patients = useSelector(state => state.data.patients.items);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 4
  });

  function handlePatient(patient) { 
    navigation.navigate("patientDetail", { patient });
  }

  function statusBar(person) {
    return (
      <View style={[styles.row]}>
        {StatusIcon("gender", person.gender)}

        {person.disability && StatusIcon("desability", person.disability)}

        {person.birthday != false && StatusIcon("birthday")}
      </View>
    );
  }

  function personTemplate(person) {
    return (
      <View style={[styles.row]}>
        {statusBar(person)}
        <View>
          <Text> Idade: {person.age} </Text>
          <Text>{person.birthdate}</Text>
        </View>
      </View>
    );
  }

  function loadMore(){
    if (loading || pagination.current_page > pagination.last_page) return;
    console.log("call more");
    console.log(pagination.current_page);
    setLoading(true);
    setTimeout(() => {
      setPagination({
        ...pagination,
        ...{
          current_page: pagination.current_page+1
        }
      });
      setLoading(false);
    }, 1000);
  };

  function renderFooter(){
    console.log("call load more")
    if (!loading) return null;
    return (
      <View style={styles.loading}> 
        <ActivityIndicator />
      </View>
    );
  };

  function renderItem(item) {
    const patient = item.item;
    return (
      <ListItem
        chevron
        onPress={() => {
          handlePatient(patient);
        }}
        leftAvatar={{ source: { uri: patient.picture } }}
        title={patient.name}
        subtitle={personTemplate(patient)}
        bottomDivider
        onEndReached={this.loadMore}
        onEndReachedThreshold={0.1}
      />
    );
  }

  return (
    <View>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={Object.values(_patients)}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}
