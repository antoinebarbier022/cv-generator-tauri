import { Components, Theme } from '@mui/joy'

export const themeComponents: { components: Components<Theme> | undefined } = {
  components: {
    JoyContainer: {
      defaultProps: {
        maxWidth: 'xl'
      }
    },

    JoyIconButton: {
      styleOverrides: {
        root: {
          //borderRadius: "100%",
        }
      }
    },
    JoyLink: {
      styleOverrides: {
        root: {
          textDecorationColor: 'currentColor'
        }
      }
    },
    JoyModal: {
      styleOverrides: {
        backdrop: () => ({
          backdropFilter: 'none',
          backgroundColor: '#00000099'
        })
      }
    },
    JoyModalDialog: {
      styleOverrides: {
        root: () => ({
          background: 'white',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 40px rgba(0, 0, 0, 0.3)'
        })
      }
    },
    JoyInput: {
      defaultProps: {
        variant: 'outlined'
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'outlined' && {
            backgroundColor: 'white'
          }),
          boxShadow: 'none',
          borderWidth: 0.5,
          flex: 1
        })
      }
    },
    JoyFormLabel: {
      styleOverrides: {
        root: {
          marginBottom: 4,
          fontSize: '12px'
        }
      }
    },
    JoySelect: {
      defaultProps: {
        variant: 'outlined'
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'outlined' && {
            backgroundColor: 'white'
          }),
          boxShadow: 'none',
          borderWidth: 0.5
        })
      }
    },
    JoyChip: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          minWidth: '4ch',
          textAlign: 'center'
        }
      }
    },
    JoyCard: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.size === 'lg' && {
            padding: '1.5rem',
            borderRadius: '20px',
            border: 'none'
          })
        })
      }
    },
    JoyTextarea: {
      defaultProps: {
        variant: 'outlined'
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'outlined' && {
            backgroundColor: 'white'
          }),

          boxShadow: 'none',
          borderWidth: 0.5,
          flex: 1,
          minWidth: '300px',
          flexDirection: 'row',
          alignItems: 'start',
          gap: 1
        })
      }
    }
  }
}
