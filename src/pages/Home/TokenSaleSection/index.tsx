import { lazy, useEffect, useState } from "react";
import { Box, Button, Container, LinearProgress, Stack, Typography } from "@mui/material";
import { useWeb3Modal } from "@web3modal/react"
import { useAccount, useDisconnect, useSwitchNetwork, useNetwork, useBalance, useContractRead } from "wagmi"
import { toast } from 'react-toastify'
import { formatUnits } from "viem";
import SectionTitle from "../../../components/SectionTitle";
import api from "../../../utils/api";
import { COINLORE_ID_OF_ETHEREUM, COINLORE_ID_OF_USDT, USDT_CONTRACT_ABI, USDT_CONTRACT_ADDRESS, CONTRACT_ADDRESS } from "../../../utils/constants";
import apiOfCoinLore from "../../../utils/apiOfCoinLore";
import { grey } from "@mui/material/colors";

// --------------------------------------------------------------------------------------------------------

const DialogWithEthereum = lazy(() => import('./DialogWithEthereum'))
const DialogWithUsdt = lazy(() => import('./DialogWithUsdt'))
const DialogClaimToken = lazy(() => import('./DialogClaimToken'))

// --------------------------------------------------------------------------------------------------------

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

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID ? Number(process.env.REACT_APP_CHAIN_ID) : 1;
const TOKEN_CLAIM_APPROVED = process.env.REACT_APP_TOKEN_CLAIM_APPROVED ? Boolean(Number(process.env.REACT_APP_TOKEN_CLAIM_APPROVED)) : false;
const TOKEN_PRICE_IN_USDT = process.env.REACT_APP_TOKEN_PRICE_IN_USDT ? Number(process.env.REACT_APP_TOKEN_PRICE_IN_USDT) : 1
const TOKEN_PRICE_IN_ETHEREUM = process.env.REACT_APP_TOKEN_PRICE_IN_ETHEREUM ? Number(process.env.REACT_APP_TOKEN_PRICE_IN_ETHEREUM) : 0.00052

// --------------------------------------------------------------------------------------------------------

export default function TokenSaleSection() {
  const { open } = useWeb3Modal()
  const { isConnected, address } = useAccount()
  const { disconnect } = useDisconnect()
  const { switchNetwork } = useSwitchNetwork()
  const { chain } = useNetwork()

  const [dialogEthereumOpened, setDialogEthereumOpened] = useState<boolean>(false);
  const [dialogUsdtOpened, setDialogUsdtOpened] = useState<boolean>(false);
  const [dialogTokenClaimOpened, setDialogTokenClaimOpened] = useState<boolean>(false);
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
  const [tokenClaimStopped, setTokenClaimStopped] = useState(false);

  /* -------------- Handle open and close of dialogs --------------- */
  const handleDialogEthereumOpened = () => {
    setDialogEthereumOpened(!dialogEthereumOpened);
  };

  const handleDialogUsdtOpened = () => {
    setDialogUsdtOpened(!dialogUsdtOpened);
  };

  const handleDialogTokenClaimOpened = () => {
    setDialogTokenClaimOpened(!dialogTokenClaimOpened);
  };
  /* --------------------------------------------------------------- */

  /* ------------------ Get balance of contract --------------- */
  // if (!TOKEN_CLAIM_APPROVED) {
  //  Get balance of usdt
  useContractRead({
    watch: true,
    address: USDT_CONTRACT_ADDRESS,
    abi: USDT_CONTRACT_ABI,
    functionName: 'balances',
    args: [CONTRACT_ADDRESS],
    onSettled: (data, error) => {

      if (error) {
        return;
      }

      if (typeof data === 'bigint') {
        setBalance({
          ...balance,
          usdt: Number(formatUnits(data, 6))
        });
      }
    }
  });

  //  Get balance of Ethereum
  useBalance({
    watch: true,
    address: CONTRACT_ADDRESS,
    onSettled: (data, error) => {
      console.log('>>>>>>>> balance of ethereum => ', data)
      if (error) {
        return;
      }
      if (data) {
        setBalance({
          ...balance,
          ethereum: Number(data.formatted)
        });
      }
    }
  });
  // }

  //  Get currencies of BNB and BUSDT hourly
  const getCurrenciesInUsd = () => {
    apiOfCoinLore.get(`/ticker/?id=${COINLORE_ID_OF_ETHEREUM},${COINLORE_ID_OF_USDT}`)
      .then(response => {
        setCurrenciesInUsd({
          ethereum: response.data[1]['price_usd'],
          usdt: response.data[0]['price_usd']
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
    if (!TOKEN_CLAIM_APPROVED) {
      const balanceOfUsdtInUsd = balance.usdt * currenciesInUsd.usdt;
      const balanceOfEthereumInUsd = balance.ethereum * currenciesInUsd.ethereum;
      setBalanceInUsd(balanceOfUsdtInUsd + balanceOfEthereumInUsd);
    }
  }, [balance]);
  /* ------------------------------------------------------------ */

  /* ----------------- Get token amount infos ------------------- */
  const getTokenAmountInfo = () => {
    api.get('/token-amount/get-token-amount-info')
      .then(response => {
        console.log('>>>>>>>>>> resData of getTokenAmountInfo => ', response.data)
        if (response.data) {
          setTokenAmountInfo({
            claimedTokenAmount: response.data.claimed_token_amount,
            totalTokenAmount: response.data.total_token_amount
          });
        }
      })
      .catch(error => {
        toast.error('getTokenAmountInfo occured an error.')
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
  /* ------------------------------------------------------------ */

  useEffect(() => {
    if (!TOKEN_CLAIM_APPROVED) {
      const remainedTokenAmount = tokenAmountInfo.totalTokenAmount - tokenAmountInfo.claimedTokenAmount;
      if (remainedTokenAmount <= 0) {
        //  Update it to true in the real production
        setTokenClaimStopped(true);
      } else {
        setTokenClaimStopped(false);
      }
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
    <Box component="section">
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <SectionTitle variant="h2">Presale Stage 1</SectionTitle>

        {!TOKEN_CLAIM_APPROVED && (
          <Stack alignItems="center" spacing={2} sx={{ color: grey[100], width: '100%' }}>
            <Stack>
              <Typography>1 SCOTTY = {TOKEN_PRICE_IN_USDT} USDT</Typography>
              <Typography>USDT Raised ${balanceInUsd.toFixed(4)}</Typography>
            </Stack>

            <LinearProgress
              value={tokenAmountInfo.claimedTokenAmount ? tokenAmountInfo.claimedTokenAmount / tokenAmountInfo.totalTokenAmount * 100 : 0}
              variant="determinate"
              sx={{ height: 32, borderRadius: 9999, width: '60%' }}
            />

            <Stack>
              <Typography>
                {tokenAmountInfo.totalTokenAmount - tokenAmountInfo.claimedTokenAmount} Tokens Remaining Until<br />
                1 GWIZ = {TOKEN_PRICE_IN_USDT} BUSDT
              </Typography>
            </Stack>
          </Stack>
        )}

        <Stack direction="row" justifyContent="center" spacing={2} alignItems="center">
          {isConnected ? (
            <>
              {chain?.id === CHAIN_ID ? TOKEN_CLAIM_APPROVED ? (
                <Button
                  variant="contained"
                  sx={{ borderRadius: 9999 }}
                  disabled={claimableTokenInfo.claimableTokenAmount <= 0}
                  onClick={() => handleDialogTokenClaimOpened()}
                >Claim $SCOTTY</Button>
              ) : (
                <>
                  <Button variant="contained" sx={{ borderRadius: 9999 }} disabled={tokenClaimStopped} onClick={handleDialogEthereumOpened}>
                    Buy with Ethereum
                  </Button>
                  <Button variant="contained" sx={{ borderRadius: 9999 }} disabled={tokenClaimStopped} onClick={handleDialogUsdtOpened}>
                    Buy with USDT
                  </Button>
                </>
              ) : (
                <Button variant="contained" sx={{ borderRadius: 9999 }} onClick={() => switchNetwork?.(CHAIN_ID)}>
                  Switch to Ethereum
                </Button>
              )}
              <Button variant="outlined" sx={{ borderRadius: 9999 }} onClick={() => disconnect()}>
                Disconnect
              </Button>
            </>
          ) : (
            <Button variant="contained" sx={{ borderRadius: 9999 }} onClick={() => open()}>
              Connect Wallet
            </Button>
          )}
        </Stack>
      </Container>
      <DialogWithEthereum
        open={dialogEthereumOpened}
        handleClose={handleDialogEthereumOpened}
        remainedTokenAmount={remainedTokenAmount}
      />
      <DialogWithUsdt
        open={dialogUsdtOpened}
        handleClose={handleDialogUsdtOpened}
        remainedTokenAmount={remainedTokenAmount}
      />
      <DialogClaimToken
        open={dialogTokenClaimOpened}
        handleClose={handleDialogTokenClaimOpened}
        claimableTokenInfo={claimableTokenInfo}
        setClaimableTokenInfo={setClaimableTokenInfo}
      />
    </Box>
  )
}