import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useAccount, useDisconnect, useNetwork, useSwitchNetwork } from "wagmi";
import { toast } from "react-toastify";
import { grey } from "@mui/material/colors";
import { Icon } from "@iconify/react";
import { useWeb3Modal } from "@web3modal/react";
import useLoading from "../../../hooks/useLoading";
import { ChangeEvent, useState } from "react";
import { CHAIN_ID, REGEX_NUMBER_VALID } from "../../../utils/constants";
import api from "../../../utils/api";

// ---------------------------------------------------------------------------------------------------------

interface IClaimableTokenInfo {
  id: number;
  investor: string;
  claimableTokenAmount: number;
}

interface IProps {
  claimableTokenInfo: IClaimableTokenInfo;
  setClaimableTokenInfo: (claimTokenInfo: IClaimableTokenInfo) => void;
}

// --------------------------------------------------------------------------------------------------------- 

export default function ClaimToken({ claimableTokenInfo, setClaimableTokenInfo }: IProps) {
  const { isConnected, address } = useAccount();
  const { openLoadingAct, closeLoadingAct } = useLoading()
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const [amount, setAmount] = useState<string>('0');

  const handleAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.match(REGEX_NUMBER_VALID)) {
      setAmount(value);
    }
  };

  const handleClaim = () => {
    openLoadingAct();
    api.put(`/distribute/distribute-token/${claimableTokenInfo.id}`, {
      investor: address,
      amount: Number(amount)
    }).then(response => {
      closeLoadingAct();
      setClaimableTokenInfo({
        ...claimableTokenInfo,
        claimableTokenAmount: response.data
      });
      return toast.success('SCOTTY has been sent to your wallet.')
    }).catch(error => {
      closeLoadingAct();

      if (error?.response?.status === 404) {
        return toast.error("You didn't invest for SCOTTY.")
      }
      return toast.error("Error occured. not sent.")
    });
  };

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
                  src="/logo192.png"
                  alt="Scotty"
                  width={32}
                />
                <Typography component="span" color={grey[100]}>SCOTTY</Typography>
              </Stack>
              <Button
                variant="contained"
                disabled={claimableTokenInfo.claimableTokenAmount === Number(amount) || !claimableTokenInfo.claimableTokenAmount}
                sx={{ borderRadius: 9999 }}
                onClick={() => setAmount(`${claimableTokenInfo.claimableTokenAmount}`)}
              >Max</Button>
            </Stack>
          )
        }}
        value={amount}
        onChange={handleAmount}
      />

      <Stack display="grid" spacing={1} alignItems="center">
        {isConnected ? chain?.id === CHAIN_ID ? (
          <>
            <Button
              variant="contained"
              sx={{ borderRadius: 9999 }}
              disabled={claimableTokenInfo.claimableTokenAmount - Number(amount) < 0 || Number(amount) === 0}
              onClick={handleClaim}
            >Claim Now</Button>
            <Button
              variant="outlined"
              sx={{ borderRadius: 9999 }}
              onClick={() => disconnect()}
              endIcon={<Icon icon="heroicons-outline:logout" />}
            >
              {address?.slice(0, 7)}...{address?.slice(-5)}
            </Button>
          </>
        ) : (
          <Button variant="contained" sx={{ borderRadius: 9999 }} onClick={() => switchNetwork?.(CHAIN_ID)}>
            Switch to Ethereum
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ borderRadius: 9999 }}
            onClick={() => open()}
          >Claim Now</Button>
        )}
      </Stack>
    </Stack>
  )
}