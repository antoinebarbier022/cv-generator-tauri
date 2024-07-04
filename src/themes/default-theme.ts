import { PaletteRange, extendTheme } from "@mui/joy/styles";

declare module "@mui/joy/styles" {
  interface ColorPalettePropOverrides {
    secondary: true;
  }
  interface Palette {
    secondary: PaletteRange;
  }
}

declare module "@mui/joy/Typography" {
  interface TypographyPropsVariantOverrides {
    question: true;
  }
}

export default extendTheme({
  fontFamily: {
    display: "Ubuntu, Arial, Sans-serif",
    body: "Ubuntu, Arial, Sans-serif",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          "50": "#F1E6FE",
          "100": "#E0C8FE",
          "200": "#C292FC",
          "300": "#A35BFB",
          "400": "#8424F9",
          "500": "#6906E0",
          "600": "#5305B3",
          "700": "#3E0486",
          "800": "#2A0259",
          "900": "#15012D",
        },
      },
    },
  },
  components: {
    JoyContainer: {
      defaultProps: {
        maxWidth: "xl",
      },
    },

    JoyLink: {
      styleOverrides: {
        root: {
          textDecorationColor: "currentColor",
        },
      },
    },
    JoyModal: {
      styleOverrides: {
        backdrop: () => ({
          backdropFilter: "blur(8px)",
        }),
      },
    },

    JoyInput: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          boxShadow: "none",
          borderWidth: 0.5,
          flex: 1,
        },
      },
    },
    JoyFormLabel: {
      styleOverrides: {
        root: {
          marginBottom: 4,
          fontSize: "12px",
        },
      },
    },
    JoySelect: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          boxShadow: "none",
          borderWidth: 0.5,
        },
      },
    },
    JoyChip: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          minWidth: "4ch",
          textAlign: "center",
        },
      },
    },

    JoyTextarea: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          boxShadow: "none",
          borderWidth: 0.5,
          flex: 1,
          minWidth: "400px",
          flexDirection: "row",
          alignItems: "baseline",
          gap: 1,
        },
      },
    },
  },
});
