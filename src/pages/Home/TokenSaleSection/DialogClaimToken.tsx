import { Icon } from "@iconify/react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { ChangeEvent, useState } from "react";
import { toast } from 'react-toastify';
import { useAccount } from "wagmi";
import { REGEX_NUMBER_VALID } from "../../../utils/constants";
import useLoading from "../../../hooks/useLoading";
import api from "../../../utils/api";

// ---------------------------------------------------------------------------------------------------------

interface IClaimableTokenInfo {
  id: number;
  investor: string;
  claimableTokenAmount: number;
}

interface IProps {
  open: boolean;
  handleClose: Function;
  claimableTokenInfo: IClaimableTokenInfo;
  setClaimableTokenInfo: Function;
}

// ---------------------------------------------------------------------------------------------------------

export default function DialogClaimToken({ open, handleClose, claimableTokenInfo, setClaimableTokenInfo }: IProps) {
  const { address } = useAccount();
  const { openLoading, closeLoading } = useLoading()

  const [amount, setAmount] = useState<string>('0');

  const handleAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.match(REGEX_NUMBER_VALID)) {
      setAmount(value);
    }
  };

  const handleClaim = () => {
    openLoading();
    api.put(`/distribute/distribute-token/${claimableTokenInfo.id}`, {
      investor: address,
      amount: Number(amount)
    }).then(response => {
      closeLoading();
      setClaimableTokenInfo({
        ...claimableTokenInfo,
        claimableTokenAmount: response.data
      });
      return toast.success('SCOTTY has been sent to your wallet.')
    }).catch(error => {
      closeLoading();

      if (error?.response?.status === 404) {
        return toast.error("You didn't invest for SCOTTY.")
      }
      return toast.error("Error occured. not sent.")
    });
  };

  return (
    <Dialog open={open} onClose={() => handleClose()}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography component="span" fontSize={24}>
          Claim Scotty
        </Typography>
        <IconButton onClick={() => handleClose()}>
          <Icon icon="ic:round-close" />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stack py={2} spacing={2}>
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
                    disabled={claimableTokenInfo.claimableTokenAmount === Number(amount)}
                    sx={{ borderRadius: 9999 }}
                    onClick={() => setAmount(`${claimableTokenInfo.claimableTokenAmount}`)}
                  >Max</Button>
                </Stack>
              )
            }}
            value={amount}
            onChange={handleAmount}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          sx={{ borderRadius: 9999 }}
          disabled={claimableTokenInfo.claimableTokenAmount - Number(amount) < 0 || Number(amount) === 0}
          onClick={handleClaim}
        >Claim</Button>
      </DialogActions>
    </Dialog>
  )
}