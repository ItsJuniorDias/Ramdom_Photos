import React, {useEffect, useState} from 'react';
import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
const ACCESS_KEY = 'bE3s5LSJGhS9ahxeVe0OmekzZEXQi7y67Gp_trRR-PA'; // Replace with your Unsplash API access key

import {
  Container,
  Header,
  Title,
  ContentItem,
  GlasstText,
  GlasstTextDescription,
  Thumbnail,
  ContentText,
} from './styles';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3aEd53abb28ba',
    title: 'Mumu',
    description: 'São josé do rio preto',
    background:
      'https://plus.unsplash.com/premium_photo-1676068605717-e76e2ad41b2e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cm9zYXN8ZW58MHx8MHx8fDA%3D',
    thumbnail:
      'https://images.unsplash.com/photo-1538524888491-89ff48977aaf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9zYXN8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Aurora',
    description: 'Bálsamo',
    background:
      'https://images.unsplash.com/photo-1667851873839-d7c9f20b8b3f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cm9zYXN8ZW58MHx8MHx8fDA%3D',
    thumbnail:
      'https://images.unsplash.com/photo-1538523396059-8145b69118c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHJvc2FzfGVufDB8fDB8fHww',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Passarinho',
    description: 'São josé do rio preto',
    background:
      'https://plus.unsplash.com/premium_photo-1669997826684-785d9039f547?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cm9zYXN8ZW58MHx8MHx8fDA%3D',
    thumbnail:
      'https://images.unsplash.com/photo-1507527690292-7888f1022d36?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9zYXN8ZW58MHx8MHx8fDA%3D',
  },
];

const Item = ({title, titleDescription, background, thumbnail}) => (
  <ContentItem onPress={() => console.log('CLICOU')} activeOpacity={0.7}>
    <ImageBackground
      source={{uri: background}}
      resizeMode="cover"
      style={styles.image}
      imageStyle={styles.imageBorder}>
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
    </ImageBackground>
  </ContentItem>
);

export const HomeScreen = () => {
  const [data, setData] = useState({});

  const unsplashApi = {
    getRandomPhotos: async (count = 100) => {
      try {
        const response = await axios.get(
          'https://api.unsplash.com/photos/random',
          {
            params: {count},
            headers: {
              Authorization: `Client-ID ${ACCESS_KEY}`,
            },
          },
        );

        return response.data;
      } catch (error) {
        console.error('Error fetching photos from Unsplash:', error);
        throw error;
      }
    },
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const randomPhotos = await unsplashApi.getRandomPhotos();

        setData(randomPhotos);
      } catch (error) {
        console.error('Failed to fetch photos:', error);
      }
    };

    fetchPhotos();
  }, []);

  console.log(data, 'RESPONSE DATA');

  return (
    <Container>
      <Header>
        <Title>Home</Title>
      </Header>

      <FlatList
        data={data}
        renderItem={({item}) => (
          <Item
            title={item.user.first_name}
            background={item.links.download}
            thumbnail={item.user.profile_image.large}
            titleDescription={item.alt_description}
          />
        )}
        keyExtractor={item => item.id}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 360,
    justifyContent: 'flex-start',
    borderRadius: 16,
    borderBottomLeftRadius: 16,
  },
  imageBorder: {
    borderRadius: 20,
    borderWidth: 5,
    borderColor: '#f0f4f7',
  },
  darkGlassContainer: {
    width: 232,
    height: 56,
    borderRadius: 32,
    overflow: 'hidden',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 18,
    marginTop: 16,
    paddingLeft: 8,
    marginLeft: 16,
    paddingRight: 32,

    flexDirection: 'row',
  },
});
