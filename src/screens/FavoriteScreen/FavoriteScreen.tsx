import React, { useEffect, useState } from "react";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Octicons";
import firestore from "@react-native-firebase/firestore";

import { useNavigation } from "@react-navigation/native";

import {
  Container,
  Header,
  Touchable,
  Title,
  FakeView,
  ImageSmall,
  ImageLarge,
  Row,
  SkeletonLarge,
  SkeletonSmall,
  Column,
} from "./styles";

export const FavoriteScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("photos")
      .onSnapshot((querySnapshot) => {
        const formatItem = querySnapshot._docs.map((item) => ({
          ...item,
          id: item._ref._documentPath._parts[1],
        }));

        setData(formatItem);

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });

    return () => unsubscribe();
  }, []);

  console.log(data, "DATA");

  const deletePhotos = (id: string) => {
    console.log(id, "ID");

    Alert.alert("Excluir fotos", "Tem certeza que deseja excluir a foto ?", [
      {
        text: "Cancelar",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          firestore()
            .collection("photos")
            .doc(`${id}`)
            .delete()
            .then(() => {
              console.log("Photos deleted!");
            });
        },
      },
    ]);
  };

  const ItemOne = (uriOne, uriTwo, props) => (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => deletePhotos(props.id)}
      >
        <ImageSmall
          source={{
            uri: `${uriOne}`,
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => deletePhotos(props.idOne)}
      >
        <ImageSmall
          source={{
            uri: `${uriTwo}`,
          }}
        />
      </TouchableOpacity>
    </View>
  );

  const ItemTwo = (uri: string, id: string) => (
    <View>
      <TouchableOpacity activeOpacity={0.7} onPress={() => deletePhotos(id)}>
        <ImageLarge
          source={{
            uri: `${uri}`,
          }}
        />
      </TouchableOpacity>
    </View>
  );

  const skeletonOne = () => {
    <View>
      <SkeletonSmall />
      <SkeletonSmall />
    </View>;
  };

  const skeletonTwo = () => {
    <View></View>;
  };

  return (
    <Container>
      <Header>
        <Touchable activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={32} color="#2d2d35" />
        </Touchable>

        <Title>Favorite</Title>

        <FakeView />
      </Header>

      {loading && (
        <ScrollView>
          <Row>
            <Column>
              <SkeletonSmall />
              <SkeletonSmall />
            </Column>

            <SkeletonLarge />
          </Row>

          <Row>
            <Column>
              <SkeletonSmall />
              <SkeletonSmall />
            </Column>

            <SkeletonLarge />
          </Row>
        </ScrollView>
      )}

      <ScrollView>
        {!loading && (
          <>
            <Row>
              {ItemOne(data[0]?._data?.background, data[1]?._data?.background, {
                id: data[0]?.id,
                idOne: data[1]?.id,
              })}

              {ItemTwo(data[2]?._data?.background, data[2]?.id)}
            </Row>

            <Row>
              {ItemOne(data[3]?._data?.background, data[4]?._data?.background, {
                id: data[3]?.id,
                idOne: data[4]?.id,
              })}

              {ItemTwo(data[5]?._data?.background, data[5]?.id)}
            </Row>

            <Row>
              {ItemOne(data[6]?._data?.background, data[7]?._data?.background, {
                id: data[6]?.id,
                idOne: data[7]?.id,
              })}

              {ItemTwo(data[8]?._data?.background, data[8]?.id)}
            </Row>

            <Row>
              {ItemOne(
                data[9]?._data?.background,
                data[10]?._data?.background,
                {
                  id: data[9]?.id,
                  idOne: data[10]?.id,
                }
              )}

              {ItemTwo(data[11]?._data?.background, data[11]?.id)}
            </Row>
          </>
        )}
      </ScrollView>
    </Container>
  );
};
