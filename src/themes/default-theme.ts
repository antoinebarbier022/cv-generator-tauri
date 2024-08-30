import { extendTheme } from "@mui/joy/styles";

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
          50: "#F2F2F2",
          100: "#E8E8E8",
          200: "#CFCFCF",
          300: "#B8B8B8",
          400: "#9E9E9E",
          500: "#878787",
          600: "#6F6F6F",
          700: "#545454",
          800: "#383838",
          900: "#1C1C1C",
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
        backdrop: () => ({
          backdropFilter: "none",
          backgroundColor: "#00000099",
        }),
      },
    },
    JoyModalDialog: {
      styleOverrides: {
        root: () => ({
          boxShadow:
            "0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 40px rgba(0, 0, 0, 0.3)",
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
    JoyCard: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.size === "lg" && {
            padding: "1.5rem",
            borderRadius: "20px",
            border: "none",
          }),
        }),
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
