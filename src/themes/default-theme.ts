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
        warning: {
          "50": "#FFF1EB",
          "100": "#FFE3D6",
          "200": "#FFC7AE",
          "300": "#FEAC85",
          "400": "#FE905D",
          "500": "#FE7332",
          "600": "#F44E01",
          "700": "#B73A01",
          "800": "#7A2701",
          "900": "#3D1300",
        },
        neutral: {
          "50": "#F0F0F0",
          "100": "#E3E3E3",
          "200": "#C4C4C4",
          "300": "#A8A8A8",
          "400": "#8C8C8C",
          "500": "#6F6F6F",
          "600": "#595959",
          "700": "#424242",
          "800": "#2B2B2B",
          "900": "#171717",
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
    JoyIconButton: {
      styleOverrides: {
        root: {
          borderRadius: "100%",
        },
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
        backdrop: ({ theme }) => ({
          backdropFilter: "none",
          backgroundColor: `rgba(${theme.palette.neutral.darkChannel} / 0.7)`,
        }),
      },
    },
    JoyCard: {
      styleOverrides: {},
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
          minWidth: "300px",
          flexDirection: "row",
          alignItems: "start",
          gap: 1,
        },
      },
    },
  },
});
