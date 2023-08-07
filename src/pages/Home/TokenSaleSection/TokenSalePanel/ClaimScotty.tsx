import { ChangeEvent, useEffect, useState, useMemo } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useAccount, useDisconnect, useNetwork, useSwitchNetwork } from "wagmi";
import { toast } from "react-toastify";
import { grey } from "@mui/material/colors";
import { Icon } from "@iconify/react";
import { useWeb3Modal } from "@web3modal/react";
import { TextField } from "../../../../components/styledComponents";
import { CHAIN_ID, REGEX_NUMBER_VALID } from "../../../../utils/constants";
import api from "../../../../utils/api";
import useLoading from "../../../../hooks/useLoading";

// --------------------------------------------------------------------------------------------------------- 

export default function ClaimScotty() {
  const { isConnected, address } = useAccount();
  const { openLoadingAct, closeLoadingAct } = useLoading()
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const [amount, setAmount] = useState<string>('0');
  const [claimableScottyAmount, setClaimableScottyAmount] = useState<number>(0)

  const handleAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.match(REGEX_NUMBER_VALID)) {
      setAmount(value);
    }
  };

  const claimScotty = () => {
    openLoadingAct()
    api.post('/ido/claim-scotty', {
      investorWalletAddress: address,
      scottyAmount: Number(amount)
    })
      .then(res => {
        setClaimableScottyAmount(Number(res.data.claimable_scotty_amount))
        toast.success('Claimed.')
        closeLoadingAct()
      })
      .catch(error => {
        const errorObject = JSON.parse(JSON.stringify(error))
        console.log('>>>>>>>>>>>> errorObject of getSaleData => ', errorObject)
        toast.error('Claim failed.')
        closeLoadingAct()
      })
  }

  const getClaimableScottyAmount = () => {
    api.get(`/ido/get-claimable-scotty-amount-of-investor/${address}`)
      .then(res => {
        if (res.data.claimable_scotty_amount) {
          setClaimableScottyAmount(Number(res.data.claimable_scotty_amount))
        }
      })
      .catch(error => {
        const errorObject = JSON.parse(JSON.stringify(error))
        console.log('>>>>>>>>>>>> errorObject of getSaleData => ', errorObject)
      })
  }

  const amountInNumberType = useMemo<string>(() => {
    if (amount[0] === '0') {
      if (amount[1] !== '.')
        return `${Number(amount)}`
    }
    return amount
  }, [amount])

  useEffect(() => {
    if (address) {
      getClaimableScottyAmount()
    }
  }, [address])

  return (
    <Stack alignItems="center" spacing={2}>
      <TextField
        label="Amount"
        id="amount"
        name="amount"
        placeholder="0"
        InputProps={{
          endAdornment: (
            <Stack direction="row" alignItems="center" spacing={2}>
              <Stack spacing={1} direction="row" alignItems="center">
                <Box
                  component="img"
                  src="/logo.svg"
                  alt="Scotty"
                  width={32}
                />
                <Typography component="span" color={grey[100]}>SCOTTY</Typography>
              </Stack>
              <Button
                variant="contained"
                disabled={claimableScottyAmount === Number(amount) || claimableScottyAmount === 0}
                sx={{ borderRadius: 9999 }}
                onClick={() => setAmount(`${claimableScottyAmount}`)}
              >Max</Button>
            </Stack>
          )
        }}
        value={amountInNumberType}
        onChange={handleAmount}
      />

      <Stack display="grid" spacing={1} alignItems="center">
        {isConnected ? chain?.id === CHAIN_ID ? (
          <>
            <Button
              variant="contained"
              sx={{ borderRadius: 9999, bgcolor: grey[900] }}
              disabled={claimableScottyAmount - Number(amount) < 0 || Number(amount) === 0}
              onClick={claimScotty}
            >Claim Now</Button>
            <Button
              variant="outlined"
              sx={{ borderRadius: 9999, bgcolor: grey[900] }}
              onClick={() => disconnect()}
              endIcon={<Icon icon="heroicons-outline:logout" />}
            >
              {address?.slice(0, 7)}...{address?.slice(-5)}
            </Button>
          </>
        ) : (
          <Button variant="contained" sx={{ borderRadius: 9999, bgcolor: grey[900] }} onClick={() => switchNetwork?.(CHAIN_ID)}>
            Switch to Ethereum
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ borderRadius: 9999, bgcolor: grey[900] }}
            onClick={() => open()}
          >Connect Wallet</Button>
        )}
      </Stack>
    </Stack>
  )
}