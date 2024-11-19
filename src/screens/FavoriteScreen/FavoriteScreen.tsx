import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Octicons";
import { Container, Header, Touchable, Title, FakeView } from "./styles";
import { useNavigation } from "@react-navigation/native";

export const FavoriteScreen = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Header>
        <Touchable activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={32} color="#2d2d35" />
        </Touchable>

        <Title>Favorite</Title>

        <FakeView />
      </Header>
    </Container>
  );
};
