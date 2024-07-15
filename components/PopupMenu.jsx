import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  Button,
  Menu,
  Divider,
  Provider as PaperProvider,
} from "react-native-paper";
import React, { useState } from "react";
import { icons } from "../constants";

const PopupMenu = () => {
  const [visible, setVisible] = useState(false);
  const [contextualMenuCoord, setContextualMenuCoor] = useState({ x: 0, y: 0 });
  const _toggleMenu = () => () => setVisible(true);
  const _getVisible = () => !!visible;

  const _handleLongPress = (event) => {
    const { nativeEvent } = event;
    setContextualMenuCoor({
      x: nativeEvent.pageX,
      y: nativeEvent.pageY,
    });
    setVisible({ menu3: true });
  };

  return (
    <PaperProvider>
      <Menu
        visible={_getVisible()}
        onDismiss={_toggleMenu()}
        anchor={
          <Button mode="outlined" onPress={_toggleMenu()}>
            Menu with icons
          </Button>
        }
      >
        <Menu.Item leadingIcon="undo" onPress={() => {}} title="Undo" />
        <Menu.Item leadingIcon="redo" onPress={() => {}} title="Redo" />

        <Divider />

        <Menu.Item
          leadingIcon="content-cut"
          onPress={() => {}}
          title="Cut"
          disabled
        />
        <Menu.Item
          leadingIcon="content-copy"
          onPress={() => {}}
          title="Copy"
          disabled
        />
        <Menu.Item
          leadingIcon="content-paste"
          onPress={() => {}}
          title="Paste"
        />
      </Menu>
    </PaperProvider>
  );
};
export default PopupMenu;
