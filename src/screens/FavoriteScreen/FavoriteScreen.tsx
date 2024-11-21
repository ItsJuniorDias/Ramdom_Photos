import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
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
    firestore()
      .collection("photos")
      .get()
      .then((item) => {
        const formatItem = item._docs.map((item) => ({
          ...item,
          id: item._ref._documentPath._parts[1],
        }));

        setData(formatItem);

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
  }, []);

  // console.log(data, "DATA");

  const ItemOne = (uriOne, uriTwo) => (
    <View>
      <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
        <ImageSmall
          source={{
            uri: `${uriOne}`,
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
        <ImageSmall
          source={{
            uri: `${uriTwo}`,
          }}
        />
      </TouchableOpacity>
    </View>
  );

  const ItemTwo = (uri: string) => (
    <View>
      <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
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
              {ItemOne(data[0]._data.background, data[1]._data.background)}

              {ItemTwo(data[2]._data.background)}
            </Row>

            <Row>
              {ItemOne(data[3]._data.background, data[4]._data.background)}

              {ItemTwo(data[5]._data.background)}
            </Row>

            <Row>
              {ItemOne(data[6]._data.background, data[7]._data.background)}

              {ItemTwo(data[8]._data.background)}
            </Row>
            <Row>
              {ItemOne(data[9]._data.background, data[10]._data.background)}

              {ItemTwo(data[11]._data.background)}
            </Row>
          </>
        )}
      </ScrollView>
    </Container>
  );
};
