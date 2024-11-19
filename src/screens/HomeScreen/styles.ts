import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f0f4f7;
`;

export const Header = styled.View`
  width: 100%;
  height: 120px;
  background-color: #ffffff;
  border-bottom-right-radius: 32px;
  border-bottom-left-radius: 32px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: "Nunito-Bold";
  color: #2d2d35;
  font-size: 22px;
  margin-top: 32px;
`;

export const TitleThumbnail = styled.Text`
  font-family: "Nunito-Regular";
  color: #f7f7f7;
  font-size: 18px;
`;

export const ContentItem = styled.TouchableOpacity`
  padding: 16px;
`;

export const ContentThumbnail = styled.View`
  width: 128px;
  height: 48px;
  margin-left: 16px;
  background-color: blue;
  border-radius: 32px;
`;

export const DarkGlassContainer = styled.View``;

export const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ContentText = styled.View`
  width: 80%;
`;

export const GlasstText = styled.Text`
  color: white;
  font-size: 18px;
  font-family: "Nunito-Regular";
`;

export const GlasstTextDescription = styled.Text`
  color: white;
  font-size: 16px;
  font-family: "Nunito-Regular";
`;

export const Thumbnail = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
`;

export const ContentLiked = styled.View`
  width: 88px;
  height: 64px;
  background-color: #ffffff;
  border-top-right-radius: 32px;
  border-top-left-radius: 32px;
  border-bottom-right-radius: 32px;
  border-bottom-left-radius: 32px;
`;

export const TouchableLiked = styled.TouchableOpacity`
  width: 88px;
  height: 64px;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 32px;
  border-top-left-radius: 32px;
  border-bottom-right-radius: 32px;
  border-bottom-left-radius: 32px;
`;

export const ContainerLiked = styled.View`
  width: 100%;
  height: 256px;
  padding-left: 43px;
  padding-right: 16px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
`;
