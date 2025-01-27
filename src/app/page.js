"use client";

import {
  defaultTheme,
  Provider,
  Button,
  Grid,
  View,
} from "@adobe/react-spectrum";
import Moon from "@spectrum-icons/workflow/Moon";
import Light from "@spectrum-icons/workflow/Light";
import Converter from "./converter";
import { useState } from "react";

const SCHEME = {
  LIGHT: "light",
  DARK: "dark",
};

/**
 * Page - Container for app's overall layout and color scheme
 */
export default function Page() {
  const [colorScheme, setColorScheme] = useState(SCHEME.LIGHT);

  const onToggleColorScheme = () => {
    if (colorScheme === SCHEME.LIGHT) {
      setColorScheme(SCHEME.DARK);
    } else {
      setColorScheme(SCHEME.LIGHT);
    }
  };

  return (
    <Provider theme={defaultTheme} colorScheme={colorScheme}>
      <Grid
        areas={["header", "content"]}
        justifyItems="center"
        columns={["1fr"]}
        rows={["auto", "auto"]}
        gap="size-100"
        height="100vh"
      >
        <View gridArea="header">
          <Button
            data-testid={"color-theme-button"}
            onPress={onToggleColorScheme}
            variant="primary"
            marginY={16}
          >
            {colorScheme === "light" ? <Moon /> : <Light />}
          </Button>
        </View>
        <View gridArea="content">
          <Converter />
        </View>
      </Grid>
    </Provider>
  );
}
