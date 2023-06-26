import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField, Typography } from "@mui/material"
import { Icon } from '@iconify/react'
import { grey } from "@mui/material/colors";
import { useDebounce } from "use-debounce";
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { parseUnits } from 'viem';
import { toast } from "react-toastify";
import useLoading from "../../../hooks/useLoading";
import { REGEX_NUMBER_VALID, USDT_CONTRACT_ABI, USDT_CONTRACT_ADDRESS, CONTRACT_ADDRESS } from "../../../utils/constants";
import api from "../../../utils/api";

// ---------------------------------------------------------------------------------------

const TOKEN_PRICE_IN_USDT = process.env.REACT_APP_TOKEN_PRICE_IN_USDT ? Number(process.env.REACT_APP_TOKEN_PRICE_IN_USDT) : 1
const CHAIN_ID = process.env.REACT_APP_CHAIN_ID ? Number(process.env.REACT_APP_CHAIN_ID) : 1;

// ---------------------------------------------------------------------------------------

interface IProps {
  open: boolean;
  handleClose: Function;
  remainedTokenAmount: number;
}

// ---------------------------------------------------------------------------------------

export default function DialogWithUsdt({ open, handleClose, remainedTokenAmount }: IProps) {
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

  /* ------------------ Send USDT from the wallet to the contract --------------- */
  const { config, error: errorOfUsePrepareContractWrite } = usePrepareContractWrite({
    address: USDT_CONTRACT_ADDRESS,
    abi: USDT_CONTRACT_ABI,
    // functionName: 'transfer',
    functionName: 'transferFrom',
    // args: [CONTRACT_ADDRESS, parseUnits(`${Number(debouncedSellAmount)}`, 6)],
    // args: [CONTRACT_ADDRESS, Number(debouncedSellAmount) * 10 ** 6],
    args: [address, CONTRACT_ADDRESS, parseUnits(`${Number(debouncedSellAmount)}`, 6)],
    chainId: CHAIN_ID,
  });

  console.log('>>>>>>> errorOfUsePrepareContractWrite => ', errorOfUsePrepareContractWrite)

  const { data, write } = useContractWrite(config);

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: (transactionReceipt) => {
      api.post('invest/invest', {
        investor: address,
        fundTypeId: 2,
        fundAmount: Number(debouncedSellAmount),
        tokenAmount: Number(buyAmount)
      }).then(response => {
        closeLoading();
        toast.success('Claimed.')
      }).catch(error => {
        closeLoading();
        toast.error('Error occured. not claimed.')
      });
    },
    onError: () => {
      closeLoading();
    }
  });

  const handlePurchase = () => {
    write?.();
  };
  /* ------------------------------------------------------------------------------ */

  //  Input sell amount
  const handleSellAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.match(REGEX_NUMBER_VALID)) {
      setSellAmount(value);
      setBuyAmount(String(Number(value) / TOKEN_PRICE_IN_USDT));
    }
  };

  //  Input buy amount
  const handleBuyAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.match(REGEX_NUMBER_VALID)) {
      setBuyAmount(value);
      setSellAmount(String(Number(value) * TOKEN_PRICE_IN_USDT));
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
          Buy with USDT
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
                    src="https://cryptologos.cc/logos/tether-usdt-logo.svg?v=024"
                    alt="USDT"
                    width={32}
                    height="fit-content"
                  />
                  <Typography component="span" color={grey[100]}>USDT</Typography>
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
          disabled={!write || claimStopped}
          onClick={handlePurchase}
        >Purchase</Button>
      </DialogActions>
    </Dialog>
  )
}