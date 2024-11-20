import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Octicons";

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
} from "./styles";

export const FavoriteScreen = () => {
  const navigation = useNavigation();

  const ItemOne = (uriOne, uriTwo) => (
    <View>
      <ImageSmall
        source={{
          uri: `${uriOne}`,
        }}
      />

      <ImageSmall
        source={{
          uri: `${uriTwo}`,
        }}
      />
    </View>
  );

  const ItemTwo = (uri: string) => (
    <View>
      <ImageLarge
        source={{
          uri: `${uri}`,
        }}
      />
    </View>
  );

  return (
    <Container>
      <Header>
        <Touchable activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={32} color="#2d2d35" />
        </Touchable>

        <Title>Favorite</Title>

        <FakeView />
      </Header>

      <ScrollView>
        <Row>
          {ItemOne(
            "https://plus.unsplash.com/premium_photo-1712935549387-ccef1d923d51?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cm9zYXMlMjBhcGl8ZW58MHx8MHx8fDA%3D",
            "https://plus.unsplash.com/premium_photo-1676070096491-6cfc8e775840?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cm9zYXMlMjBhcGl8ZW58MHx8MHx8fDA%3D"
          )}

          {ItemTwo(
            "https://images.unsplash.com/photo-1731575115709-d4325615e868?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D"
          )}
        </Row>

        <Row>
          {ItemOne(
            "https://images.unsplash.com/photo-1579591040171-21b4f3058005?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHJvc2FzfGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1658303751525-ba73838b3357?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHJvc2FzfGVufDB8fDB8fHww"
          )}

          {ItemTwo(
            "https://images.unsplash.com/photo-1538523396059-8145b69118c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJvc2FzJTIwYXBpfGVufDB8fDB8fHww"
          )}
        </Row>
      </ScrollView>
    </Container>
  );
};
