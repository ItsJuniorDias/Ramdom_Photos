import React, { useEffect, useState } from "react";
import { FlatList, ImageBackground, StyleSheet, View } from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/Octicons";

const ACCESS_KEY = "bE3s5LSJGhS9ahxeVe0OmekzZEXQi7y67Gp_trRR-PA"; // Replace with your Unsplash API access key

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
import { SafeAreaFrameContext } from "react-native-safe-area-context";

export const HomeScreen = () => {
  const [data, setData] = useState([]);
  // const [isLiked, setIsLiked] = useState(true);

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

  const Item = ({
    id,
    title,
    titleDescription,
    background,
    thumbnail,
    isFavorite,
  }) => {
    const onFavoriteToggle = (id) => {
      setData((prevData) => {
        return prevData.map((item) =>
          item.id === id ? { ...item, favorite: !item.favorite } : item
        );
      });
    };

    return (
      <ContentItem>
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
                  <TouchableLiked onPress={() => onFavoriteToggle(id)}>
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

  console.log(data, "RESPONSE DATA");

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
