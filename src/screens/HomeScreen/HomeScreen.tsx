import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/Octicons";
import firestore from "@react-native-firebase/firestore";

const ACCESS_KEY = "bE3s5LSJGhS9ahxeVe0OmekzZEXQi7y67Gp_trRR-PA";

import {
  Container,
  Header,
  Title,
  ContentItem,
  GlasstText,
  GlasstTextDescription,
  Thumbnail,
  ContentText,
  ContentLiked,
  TouchableLiked,
  ContainerLiked,
} from "./styles";
import { useNavigation } from "@react-navigation/native";

interface ItemProps {
  id: string;
  title: string;
  titleDescription: string;
  background: string;
  thumbnail: string;
  isFavorite: boolean;
}

export const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [photos, setPhotos] = useState([]);

  const navigation = useNavigation();

  const fetchPhotos = () => {
    firestore()
      .collection("photos")
      .get()
      .then((item) => {
        setPhotos(item._docs);
      });
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const unsplashApi = {
    getRandomPhotos: async (count = 100, query = "flowers") => {
      try {
        const response = await axios.get(
          "https://api.unsplash.com/photos/random",
          {
            params: { count, query },
            headers: {
              Authorization: `Client-ID ${ACCESS_KEY}`,
            },
          }
        );

        return response.data;
      } catch (error) {
        console.error("Error fetching photos from Unsplash:", error);
        throw error;
      }
    },
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const randomPhotos = await unsplashApi.getRandomPhotos();

        const formatAddFavorite = randomPhotos.map((item) => ({
          ...item,
          favorite: false,
        }));

        setData(formatAddFavorite);
      } catch (error) {
        console.error("Failed to fetch photos:", error);
      }
    };

    fetchPhotos();
  }, []);

  const addDocument = ({ id, background }) => {
    firestore()
      .collection("photos")
      .add({
        id,
        background,
      })
      .then(() => {
        console.log("Photos added!");
      });
  };

  const favoritePhotos = ({ id, onFavoriteToggle, background }) => {
    if (photos.length <= 11) {
      fetchPhotos();

      onFavoriteToggle(id);

      addDocument({
        id,
        background,
      });
    } else {
      Alert.alert(
        "Limite excedido",
        "Limite excedido de fotos adicionado aos favoritos ",
        [
          {
            text: "Cancelar",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    }
  };

  const Item = ({
    id,
    title,
    titleDescription,
    background,
    thumbnail,
    isFavorite,
  }: ItemProps) => {
    const onFavoriteToggle = (id) => {
      setData((prevData) =>
        prevData.map((item) => {
          if (item.id === id) {
            item.favorite = !item.favorite;
          }
          return item;
        })
      );
    };

    return (
      <ContentItem
        activeOpacity={0.7}
        onPress={() => navigation.navigate("Favorite")}
      >
        <ImageBackground
          source={{ uri: background }}
          resizeMode="cover"
          style={styles.image}
          imageStyle={styles.imageBorder}
        >
          <View style={styles.darkGlassContainer}>
            <Thumbnail
              source={{
                uri: `${thumbnail}`,
              }}
            />

            <ContentText>
              <GlasstText numberOfLines={1}>{title}</GlasstText>
              <GlasstTextDescription numberOfLines={1}>
                {titleDescription}
              </GlasstTextDescription>
            </ContentText>
          </View>

          <ContainerLiked>
            <ContentLiked>
              {!isFavorite ? (
                <>
                  <TouchableLiked
                    onPress={() =>
                      favoritePhotos({
                        id,
                        onFavoriteToggle,
                        background,
                      })
                    }
                  >
                    <Icon name="heart" size={30} color="#fe034f" />
                  </TouchableLiked>
                </>
              ) : (
                <>
                  <TouchableLiked onPress={() => onFavoriteToggle(id)}>
                    <Icon name="heart-fill" size={30} color="#fe034f" />
                  </TouchableLiked>
                </>
              )}
            </ContentLiked>
          </ContainerLiked>
        </ImageBackground>
      </ContentItem>
    );
  };

  return (
    <Container>
      <Header>
        <Title>Home</Title>
      </Header>

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            title={item.user.first_name}
            background={item.links.download}
            thumbnail={item.user.profile_image.large}
            titleDescription={item.alt_description}
            isFavorite={item.favorite}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 360,
    justifyContent: "flex-start",
    borderRadius: 16,
    borderBottomLeftRadius: 16,
  },
  imageBorder: {
    borderRadius: 20,
    borderWidth: 5,
    borderColor: "#f0f4f7",
  },
  darkGlassContainer: {
    width: 232,
    height: 56,
    borderRadius: 32,
    overflow: "hidden",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 18,
    marginTop: 16,
    paddingLeft: 8,
    marginLeft: 16,
    paddingRight: 32,
    flexDirection: "row",
  },
});
