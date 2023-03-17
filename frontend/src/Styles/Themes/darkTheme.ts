import { createTheme } from "@mui/material/styles";


declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    pages: true;
  }
}

export const darkTheme = createTheme({

    palette: {
      mode: "dark",  
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: "#6b6b6b #2b2b2b",
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              backgroundColor: "#2b2b2b",
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              borderRadius: 8,
              backgroundColor: "#6b6b6b",
              minHeight: 24,
              border: "3px solid #2b2b2b",
            },
            "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
              backgroundColor: "#959595",
            },
            "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
              backgroundColor: "#959595",
            },
            "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#959595",
            },
            "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
              backgroundColor: "#2b2b2b",
            },
          },
        },
      },
      MuiButton: {
        variants: [
          {
            props: { variant: 'pages' },
            style: {
              width: 30,
              margin: 4,
              height: 30,
              padding: 0,
              marging: 0,
              borderRadius: 15,
              border: `2px solid 	#FF5F1F`,
              minWidth: 10,
              minHeight: 10,
            },
          },
        ],
      },
    },
 
  });

