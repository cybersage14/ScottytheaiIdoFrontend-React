import { SyntheticEvent, lazy, useEffect, useState } from "react";
import { Box, Container, LinearProgress, Stack, Tab, Typography, useTheme } from "@mui/material";
import { useAccount } from "wagmi"
import { grey } from "@mui/material/colors";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import SectionTitle from "../../../components/SectionTitle";
import api from "../../../utils/api";
import { COINLORE_ID_OF_ETHEREUM, COINLORE_ID_OF_USDT } from "../../../utils/constants";
import apiOfCoinLore from "../../../utils/apiOfCoinLore";

// --------------------------------------------------------------------------------------------------------

const REACT_APP_PRESALE_STAGE_NUMBER = process.env.REACT_APP_PRESALE_STAGE_NUMBER ? process.env.REACT_APP_PRESALE_STAGE_NUMBER : '1'
const TOKEN_CLAIM_APPROVED = process.env.REACT_APP_TOKEN_CLAIM_APPROVED ? process.env.REACT_APP_TOKEN_CLAIM_APPROVED : false;
const TOKEN_PRICE_IN_USDT = process.env.REACT_APP_TOKEN_PRICE_IN_USDT ? Number(process.env.REACT_APP_TOKEN_PRICE_IN_USDT) : 1

// --------------------------------------------------------------------------------------------------------

const TabEthereum = lazy(() => import('./TabEthereum'))
const TabUsdt = lazy(() => import('./TabUsdt'))
const ClaimToken = lazy(() => import('./ClaimToken'))

// --------------------------------------------------------------------------------------------------------

type TTabValue = 'ethereum' | 'usdt';

interface IClaimableTokenInfo {
  id: number;
  investor: string;
  claimableTokenAmount: number;
}

interface ITokenAmount {
  ethereum: number;
  usdt: number;
}

interface ITokenAmountInfo {
  claimedTokenAmount: number;
  totalTokenAmount: number;
}

// --------------------------------------------------------------------------------------------------------

export default function TokenSaleSection() {
  const { isConnected, address } = useAccount()
  const theme = useTheme()

  const [balance, setBalance] = useState<ITokenAmount>({
    ethereum: 0,
    usdt: 0
  });
  const [currenciesInUsd, setCurrenciesInUsd] = useState<ITokenAmount>({
    ethereum: 0,
    usdt: 0
  });
  const [claimableTokenInfo, setClaimableTokenInfo] = useState<IClaimableTokenInfo>({
    id: 0,
    investor: '',
    claimableTokenAmount: 0
  });
  const [tokenAmountInfo, setTokenAmountInfo] = useState<ITokenAmountInfo>({
    claimedTokenAmount: 0,
    totalTokenAmount: 0
  });
  const [balanceInUsd, setBalanceInUsd] = useState<number>(0);
  const [remainedTokenAmount, setRemainedTokenAmount] = useState<number>(0);
  const [currentTab, setCurrentTab] = useState<TTabValue>('ethereum');

  /* -------------- Handle open and close of dialogs --------------- */
  const handleCurrentTab = (e: SyntheticEvent, tabValue: string) => {
    if (tabValue === 'ethereum' || tabValue === 'usdt') {
      setCurrentTab(tabValue);
    }
  }
  /* --------------------------------------------------------------- */

  /* ------------------ Get balance of contract --------------- */

  //  Get currencies of BNB and BUSDT hourly
  const getCurrenciesInUsd = () => {
    apiOfCoinLore.get(`/ticker/?id=${COINLORE_ID_OF_ETHEREUM},${COINLORE_ID_OF_USDT}`)
      .then(response => {
        setCurrenciesInUsd({
          ethereum: response.data[0]['price_usd'],
          usdt: response.data[1]['price_usd']
        });
      })
      .catch(error => { });
  };

  useEffect(() => {
    if (!TOKEN_CLAIM_APPROVED) {
      getCurrenciesInUsd();
      const interval = setInterval(() => {
        getCurrenciesInUsd();
      }, 600000);
      return () => clearInterval(interval);
    }
  }, []);

  //  Balance in USD is updated whenever the balance of contract is changed or currencies in usd are changed
  useEffect(() => {
    const balanceOfUsdtInUsd = balance.usdt * currenciesInUsd.usdt;
    const balanceOfEthereumInUsd = balance.ethereum * currenciesInUsd.ethereum;
    setBalanceInUsd(balanceOfUsdtInUsd + balanceOfEthereumInUsd);
  }, [balance]);
  /* ------------------------------------------------------------ */

  /* ----------------- Get token amount infos and total raised balance ------------------- */
  const getTokenAmountInfo = () => {
    api.get('/token-amount/get-token-amount-info')
      .then(response => {
        setTokenAmountInfo({
          claimedTokenAmount: response.data.tokenAmountInfo.claimed_token_amount,
          totalTokenAmount: response.data.tokenAmountInfo.total_token_amount
        });
        setBalance(response.data.totalInvestment)
      })
      .catch(error => {
        console.log('error => ', error)
        // toast.error('getTokenAmountInfo occured an error.')
      });
  };

  useEffect(() => {
    if (!TOKEN_CLAIM_APPROVED) {
      getTokenAmountInfo();
      const interval = setInterval(() => {
        getTokenAmountInfo();
      }, 2000);
      return () => clearInterval(interval);
    }
  }, []);
  /* ------------------------------------------------------------------------------------- */

  useEffect(() => {
    if (!TOKEN_CLAIM_APPROVED) {
      const remainedTokenAmount = tokenAmountInfo.totalTokenAmount - tokenAmountInfo.claimedTokenAmount;
      setRemainedTokenAmount(remainedTokenAmount);
    }
  }, [tokenAmountInfo]);

  useEffect(() => {
    if (isConnected && TOKEN_CLAIM_APPROVED) {
      api.get(`/distribute/get-claimable-token-amount/${address}`)
        .then(response => {
          setClaimableTokenInfo({
            id: response.data.id,
            investor: address || '',
            claimableTokenAmount: response.data.claimable_token_amount
          });
        }).catch(error => { });
    }
  }, [isConnected]);

  return (
    <Box component="section" border={1} borderColor={theme.palette.primary.main} borderRadius={2} py={4}>
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <SectionTitle variant="h2">Presale Stage {REACT_APP_PRESALE_STAGE_NUMBER}</SectionTitle>

        <Stack alignItems="center" spacing={2} sx={{ color: grey[100], width: '100%' }}>
          <Stack>
            <Typography textAlign="center">1 SCOTTY = {TOKEN_PRICE_IN_USDT} USDT</Typography>
            {TOKEN_CLAIM_APPROVED ? (
              <Typography textAlign="center">USD Raised ${(balanceInUsd).toFixed(4)}</Typography>
            ) : currentTab === 'ethereum' ? (
              <Typography textAlign="center">Ethereum Raised {(balance.ethereum).toFixed(4)}</Typography>
            ) : (
              <Typography textAlign="center">USDT Raised {(balance.usdt).toFixed(2)}</Typography>
            )}
          </Stack>

          <LinearProgress
            value={tokenAmountInfo.claimedTokenAmount ? tokenAmountInfo.claimedTokenAmount / tokenAmountInfo.totalTokenAmount * 100 : 0}
            variant="determinate"
            sx={{ height: 32, borderRadius: 9999, width: '100%' }}
          />

          <Stack>
            <Typography textAlign="center">
              {(tokenAmountInfo.totalTokenAmount - tokenAmountInfo.claimedTokenAmount).toFixed(4)} Tokens Remaining
            </Typography>
          </Stack>
        </Stack>

        {TOKEN_CLAIM_APPROVED ? (
          <ClaimToken
            claimableTokenInfo={claimableTokenInfo}
            setClaimableTokenInfo={setClaimableTokenInfo}
          />
        ) : (
          <TabContext value={currentTab}>
            <TabList onChange={handleCurrentTab}>
              <Tab
                label={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Box
                      component="img"
                      src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=025"
                      alt="Ethereum"
                      width={24}
                    />
                    <Typography component="span">Ethereum</Typography>
                  </Stack>
                }
                value="ethereum"
              />
              <Tab
                label={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Box
                      component="img"
                      src="https://cryptologos.cc/logos/tether-usdt-logo.svg?v=024"
                      alt="Ethereum"
                      width={24}
                    />
                    <Typography component="span">USDT</Typography>
                  </Stack>
                }
                value="usdt"
              />
            </TabList>
            <TabPanel value="ethereum">
              <TabEthereum balance={balance.ethereum} remainedTokenAmount={remainedTokenAmount} />
            </TabPanel>
            <TabPanel value="usdt">
              <TabUsdt balance={balance.usdt} remainedTokenAmount={remainedTokenAmount} />
            </TabPanel>
          </TabContext>
        )}
      </Container>
    </Box>
  )
}