import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useDebounce } from "use-debounce";
import { grey } from "@mui/material/colors";
import { Icon } from '@iconify/react'
import { useAccount, usePrepareSendTransaction, useSendTransaction, useWaitForTransaction } from "wagmi";
import { parseEther } from 'viem';
import { toast } from "react-toastify";
import { REGEX_NUMBER_VALID, CONTRACT_ADDRESS } from "../../../utils/constants";
import useLoading from "../../../hooks/useLoading";
import api from "../../../utils/api";

// ---------------------------------------------------------------------------------------

const TOKEN_PRICE_IN_ETHEREUM = process.env.REACT_APP_TOKEN_PRICE_IN_ETHEREUM ? Number(process.env.REACT_APP_TOKEN_PRICE_IN_ETHEREUM) : 0.00052

// ---------------------------------------------------------------------------------------

interface IProps {
  open: boolean;
  handleClose: Function;
  remainedTokenAmount: number;
}

// ---------------------------------------------------------------------------------------

export default function DialogWithEthereum({ open, handleClose, remainedTokenAmount }: IProps) {
  const { openLoading, closeLoading } = useLoading()
  const { address } = useAccount();

  const [sellAmount, setSellAmount] = useState<string>('0');
  const [buyAmount, setBuyAmount] = useState<string>('0');
  const [debouncedSellAmount] = useDebounce<string>(sellAmount, 500);

  const claimStopped = useMemo<boolean>(() => {
    const _buyAmount = Number(buyAmount || '0');
    if (remainedTokenAmount >= _buyAmount) {
      return false;
    }
    return true;
  }, [buyAmount, remainedTokenAmount]);

  /* ----------------- Send Ethereum from the wallet to the contract ------------------ */
  const { config } = usePrepareSendTransaction({
    to: CONTRACT_ADDRESS,
    value: debouncedSellAmount ? parseEther(`${Number(debouncedSellAmount)}`) : undefined
  });

  const { data, sendTransaction } = useSendTransaction(config);

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      api.post('invest/invest', {
        investor: address,
        fundTypeId: 1,
        fundAmount: Number(debouncedSellAmount),
        tokenAmount: Number(buyAmount)
      }).then(response => {
        closeLoading();
        toast.success('Claimed.')
      }).catch(error => {
        closeLoading();
        toast.error('Error occured. not claimed.')
      });
    }
  });
  const handlePurchase = () => {
    sendTransaction?.();
  };
  /* --------------------------------------------------------------------------------- */

  //  Input sell amount
  const handleSellAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.match(REGEX_NUMBER_VALID)) {
      setSellAmount(value);
      setBuyAmount(String(Number(value) / TOKEN_PRICE_IN_ETHEREUM));
    }
  };

  //  Input buy amount
  const handleBuyAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.match(REGEX_NUMBER_VALID)) {
      setBuyAmount(value);
      setSellAmount(String(Number(value) * TOKEN_PRICE_IN_ETHEREUM));
    }
  };

  useEffect(() => {
    if (isLoading) {
      openLoading();
    }
  }, [isLoading]);

  return (
    <Dialog open={open} onClose={() => handleClose()}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography component="span" fontSize={24}>
          Buy with Ethereum
        </Typography>
        <IconButton onClick={() => handleClose()}>
          <Icon icon="ic:round-close" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} py={3}>
          <TextField
            label="Selling"
            id="sellAmount"
            name="sellAmount"
            placeholder="0"
            InputProps={{
              endAdornment: (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box
                    component="img"
                    src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=025"
                    alt="Ethereum"
                    width={32}
                    height="fit-content"
                  />
                  <Typography component="span" color={grey[100]}>ETHEREUM</Typography>
                </Stack>
              )
            }}
            value={sellAmount}
            onChange={handleSellAmount}
          />

          <TextField
            label="Buying"
            id="buyAmount"
            name="buyAmount"
            placeholder="0"
            InputProps={{
              endAdornment: (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box
                    component="img"
                    src="/logo192.png"
                    alt="Soctty"
                    width={32}
                    height="fit-content"
                  />
                  <Typography component="span" color={grey[100]}>SCOTTY</Typography>
                </Stack>
              )
            }}
            value={buyAmount}
            onChange={handleBuyAmount}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          sx={{ borderRadius: 9999 }}
          disabled={!sendTransaction || claimStopped}
          onClick={handlePurchase}
        >Purchase</Button>
      </DialogActions>
    </Dialog>
  )
}