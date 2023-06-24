import { Suspense } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { mainnet, configureChains, createConfig, WagmiConfig } from 'wagmi';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import Routes from './Routes';
import Loading from './components/Loading';
import { ToastContainer } from 'react-toastify';
import { LoadingProvider } from './contexts/LoadingContext';

// -------------------------------------------------------------------------------------

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 1024,
      lg: 1280,
      xl: 1420
    }
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#FD7C1E'
    }
  },
  typography: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 18
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          color: 'white'
        }
      }
    }
  }
})

// -------------------------------------------------------------------------------------

const projectId = process.env.REACT_APP_CONNECT_PROJECT_ID || ''
const chains = [mainnet];
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

// -------------------------------------------------------------------------------------

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<Loading />}>
        <LoadingProvider>
          <WagmiConfig config={wagmiConfig}>
            <BrowserRouter>
              <Routes />
              <Loading />
              <ToastContainer className="z-important" />
            </BrowserRouter>
          </WagmiConfig>
        </LoadingProvider>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
