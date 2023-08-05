import { ThemeProvider, createTheme } from '@mui/material'
import { WagmiConfig, createConfig, mainnet } from 'wagmi'
import { EthereumClient, w3mConnectors } from '@web3modal/ethereum'
import { createPublicClient, http } from 'viem'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Web3Modal } from '@web3modal/react'
import Routes from './Routes'
import { LoadingProvider } from './contexts/LoadingContext'
import Loading from './components/Loading'
import { InitLoadingProvider } from './contexts/InitLoadingContext'

//  -----------------------------------------------------------------------------------

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

//  -----------------------------------------------------------------------------------

const projectId = import.meta.env.VITE_PROJECT_ID || ''
const chains = [mainnet]
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http()
  })
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

//  -----------------------------------------------------------------------------------

function App() {
  return (
    <ThemeProvider theme={theme}>
      <InitLoadingProvider>
        <LoadingProvider>
          <WagmiConfig config={wagmiConfig}>
            <BrowserRouter>
              <Routes />
              <Loading />
              <ToastContainer className="z-important" />
            </BrowserRouter>
          </WagmiConfig>
        </LoadingProvider>
      </InitLoadingProvider>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </ThemeProvider>
  )
}

export default App
