import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

export const Header = styled.View`
  width: 100%;
  height: 92px;
  background-color: red;
  padding-left: 24px;
  padding-right: 24px;
  margin-top: 40px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const Touchable = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: blue;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: "Nunito-Bold";
  color: #2d2d35;
  font-size: 22px;
`;

export const FakeView = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: blue;
`;
