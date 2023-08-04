import { useState, SyntheticEvent, useMemo, useEffect, useRef } from 'react'
import { Box, Paper, Stack, Tab, Typography, useTheme } from "@mui/material"
import { grey } from "@mui/material/colors"
import { toast } from 'react-toastify'
import SectionTitle from "../../../../components/SectionTitle"
import TimePiece from "./TimePiece"
import ProgressBar from "../../../../components/ProgressBar"
import { COINLORE_ID_OF_ETHEREUM, INTERVAL_TIME, INTERVAL_TIME_FOR_COINLORE, VISIBLE_DECIMALS } from '../../../../utils/constants'
import TabEthereum from './TabEthereum'
import TabUsdt from './TabUsdt'
import api from '../../../../utils/api'
import { IInvestedToken, ISaleStage } from '../../../../utils/interfaces'
import { Tabs } from '../../../../components/styledComponents'
import apiOfCoinLore from '../../../../utils/apiOfCoinLore'
import ClaimScotty from './ClaimScotty'

//  ----------------------------------------------------------------------------------------------------------

let reloadTimeForInvestedTokens = 0;

//  ----------------------------------------------------------------------------------------------------------

export default function TokenSalePanel() {
  const theme = useTheme()

  const [currentTab, setCurrentTab] = useState<number>(1)
  const [currentSaleStage, setCurrentSaleStage] = useState<ISaleStage | null>()
  const [investedTokens, setInvestedTokens] = useState<Array<IInvestedToken>>([])
  const [tokenRaised, setTokenRaised] = useState<number>(0)
  const [ethPriceInUsd, setEthPriceInUsd] = useState<number>(0)
  const [claimScottyEnabled, setClaimScottyEnabled] = useState<boolean>(false)
  const [timeOffset, setTimeOffset] = useState<number>(0)
  const [days, setDays] = useState<number>(0)
  const [hours, setHours] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(0)
  const [seconds, setSeconds] = useState<number>(0)

  /**
   * It's needed to create ref of currentTab since it's used in setInterval.
   */
  const currentTabRef = useRef(currentTab)

  //  ------------------------------------------------------------------------------------------------

  const handleCurrentTab = (e: SyntheticEvent, newTabValue: string) => {
    setCurrentTab(Number(newTabValue))
  }

  const getInvestedTokens = () => {
    api.get('/ido/get-invested-tokens')
      .then(res => {
        setInvestedTokens(res.data)
      })
      .catch(error => {
        const errorObject = JSON.parse(JSON.stringify(error))
        console.log('>>>>>>>>>>>> errorObject of getInvestedTokens => ', errorObject)
      })
  }

  const getInvestedTokenRaised = () => {
    api.get(`/ido/get-invested-token-raised/${currentTabRef.current}`)
      .then(res => {
        setTokenRaised(res.data.raisedAmount)
      })
      .catch(error => {
        const errorObject = JSON.parse(JSON.stringify(error))
        console.log('>>>>>>>>>>>> errorObject of getInvestedTokens => ', errorObject)
      })
  }

  const getEthPriceInUsd = () => {
    apiOfCoinLore.get(`/ticker/?id=${COINLORE_ID_OF_ETHEREUM}`)
      .then(res => {
        setEthPriceInUsd(res.data[0].price_usd)
      })
      .catch(error => {
        const errorObject = JSON.parse(JSON.stringify(error))
        console.log('>>>>>>>>>>>> errorObject of getEthPriceInUsd => ', errorObject)
      });
  };

  const getSaleData = () => {
    api.get(`/ido/get-sale-data/${currentTabRef.current}`)
      .then(res => {
        const { raisedAmount, enabledSaleStage, claimScottyStatusData } = res.data
        setTokenRaised(raisedAmount)

        if (enabledSaleStage) {
          setCurrentSaleStage({
            ...enabledSaleStage,
            enabled: enabledSaleStage.enabled === 'true' ? true : false,
            scotty_price_in_usd: Number(enabledSaleStage.scotty_price_in_usd),
            hard_cap: Number(enabledSaleStage.hard_cap),
            claimed_scotty_amount: Number(enabledSaleStage.claimed_scotty_amount),
            start_at: Number(enabledSaleStage.start_at),
            end_at: Number(enabledSaleStage.end_at)
          })
        } else {
          setCurrentSaleStage(null)
        }

        setClaimScottyEnabled(claimScottyStatusData.claim_scotty_enabled === 'true' ? true : false)
      })
      .catch(error => {
        const errorObject = JSON.parse(JSON.stringify(error))
        console.log('>>>>>>>>>>>> errorObject of getSaleData => ', errorObject)
      })
  }

  const disableCurrentSaleStage = () => {
    api.put(`/ido/disable-sale-stage/${currentSaleStage?.id}`)
      .then(() => {
        toast.info('Current sale has been finished.')
      })
      .catch(error => {
        const errorObject = JSON.parse(JSON.stringify(error))
        console.log('>>>>>>>>>>>> errorObject of getSaleData => ', errorObject)
      })
  }

  //  ------------------------------------------------------------------------------------------------

  const saleProgressInPercentage = useMemo<number>(() => {
    if (currentSaleStage) {
      const { claimed_scotty_amount, hard_cap } = currentSaleStage
      return claimed_scotty_amount / hard_cap * 100
    }
    return 0
  }, [currentSaleStage])

  //  Scotty price in ETH or USDT
  const scottyPriceInToken = useMemo<number>(() => {
    if (currentSaleStage) {
      if (currentTab === 1) {
        return currentSaleStage.scotty_price_in_usd / ethPriceInUsd
      } else if (currentTab === 2) {
        console.log('>>>>>>>> currentSaleStage => ', currentSaleStage)
        return currentSaleStage.scotty_price_in_usd
      }
    }
    return 0
  }, [currentTab, currentSaleStage, ethPriceInUsd])

  const remainedTokenAmount = useMemo<number>(() => {
    if (currentSaleStage) {
      const { hard_cap, claimed_scotty_amount } = currentSaleStage

      return hard_cap - claimed_scotty_amount
    }
    return 0
  }, [currentSaleStage])



  //  ------------------------------------------------------------------------------------------------

  /**
   * The ref of currentTab is changed whenever currentTab is changed.
   */
  useEffect(() => {
    currentTabRef.current = currentTab
    getInvestedTokenRaised()
  }, [currentTab])

  useEffect(() => {
    if (reloadTimeForInvestedTokens === 0) {
      getInvestedTokens()
      reloadTimeForInvestedTokens += 1
    }
  }, [])

  /**
   * In setInterval, the ref of currentTab is used insetad of currentTab itself.
   */
  useEffect(() => {
    getSaleData()
    const intervalId = setInterval(() => {
      getSaleData()
    }, INTERVAL_TIME)
    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    getEthPriceInUsd();
    const intervalId = setInterval(() => {
      getEthPriceInUsd();
    }, INTERVAL_TIME_FOR_COINLORE);
    return () => clearInterval(intervalId);
  }, [])

  useEffect(() => {
    if (currentSaleStage) {
      const currentDateTimeInMs = new Date().getTime()
      console.log('>>>>>>>>>> currentDateTimeInMs => ', currentDateTimeInMs)
      console.log('>>>>>>>>>> currentSaleStage.end_at => ', currentSaleStage.end_at)
      console.log('>>>>>>>>>> offset => ', currentSaleStage.end_at - currentDateTimeInMs)
      setTimeOffset(currentSaleStage.end_at - currentDateTimeInMs);
    }
  }, [currentSaleStage])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeOffset(timeOffset => timeOffset - 1000)
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    console.log('>>>>>>>>>>>>>>> timeOffset => ', timeOffset)
    if (timeOffset > 0) {
      const oneSecond = 1000;
      const oneMinute = 60 * oneSecond;
      const oneHour = 60 * oneMinute;
      const oneDay = 24 * oneHour;

      setDays(Math.floor(timeOffset / oneDay))
      setHours(Math.floor((timeOffset % oneDay) / oneHour))
      setMinutes(Math.floor((timeOffset % oneDay % oneHour) / oneMinute))
      setSeconds(Math.floor((timeOffset % oneDay % oneHour % oneMinute) / oneSecond))
    } else if (timeOffset < 0) {
      if (currentSaleStage) {
        disableCurrentSaleStage()
      }
    }
  }, [timeOffset, currentSaleStage])

  //  ------------------------------------------------------------------------------------------------

  return (
    <Paper sx={{ bgcolor: theme.palette.primary.main, py: 6, px: 4, borderRadius: 4 }}>
      {currentSaleStage && investedTokens.length > 0 ? (
        <Stack alignItems="center" spacing={3}>
          <Stack alignItems="center" spacing={3} width="100%">
            {/* Title */}
            <SectionTitle sx={{ color: grey[900], fontWeight: 700 }}>
              {currentSaleStage.name}
            </SectionTitle>

            {/* Time */}
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
              <TimePiece timeValue={days} timeUnit="Days" />
              <Typography component="span" color={grey[100]} fontSize={28}>:</Typography>
              <TimePiece timeValue={hours} timeUnit="Hours" />
              <Typography component="span" color={grey[100]} fontSize={28}>:</Typography>
              <TimePiece timeValue={minutes} timeUnit="Minutes" />
              <Typography component="span" color={grey[100]} fontSize={28}>:</Typography>
              <TimePiece timeValue={seconds} timeUnit="Seconds" />
            </Stack>

            {/* Price */}
            <Stack>
              <Typography color={grey[100]} fontWeight={600} fontSize={{ xs: 16, md: 24 }} textAlign="center">
                1 SCOTTY =&nbsp;
                <Typography color={grey[900]} component="span" fontSize={{ xs: 16, md: 24 }}>
                  {scottyPriceInToken.toFixed(VISIBLE_DECIMALS)} {investedTokens[currentTab - 1].token_symbol}
                </Typography>
              </Typography>
              <Typography color={grey[100]} fontWeight={600} fontSize={{ xs: 16, md: 24 }} textAlign="center">
                <Typography color={grey[900]} component="span" fontSize={{ xs: 16, md: 24 }}>
                  {tokenRaised}
                </Typography> {investedTokens[currentTab - 1].token_symbol} Raised
              </Typography>
            </Stack>
          </Stack>

          <ProgressBar value={saleProgressInPercentage} />

          <Stack alignItems="center" spacing={4}>
            <Typography color={grey[900]} fontWeight={600} fontSize={{ xs: 16, md: 24 }}>
              {currentSaleStage.hard_cap - currentSaleStage.claimed_scotty_amount}&nbsp;
              <Typography color={grey[100]} component="span" fontSize={{ xs: 16, md: 24 }}>Tokens Remaining</Typography>
            </Typography>

            {claimScottyEnabled ? (
              <ClaimScotty />
            ) : (
              <Stack alignItems="center" spacing={2}>
                <Tabs onChange={handleCurrentTab} value={currentTab}>
                  {investedTokens?.map(token => (
                    <Tab
                      key={token.id}
                      label={
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Box
                            component="img"
                            src={token.img_src}
                            alt={token.token_symbol}
                            width={24}
                          />
                          <Typography
                            component="span"
                            color={currentTab === token.id ? grey[900] : grey[100]}
                            fontSize={{ xs: 16, md: 24 }}
                          >{token.token_name}</Typography>
                        </Stack>
                      }
                      value={token.id}
                    />
                  ))}
                </Tabs>

                {currentTab === 1 ? (
                  <TabEthereum
                    remainedTokenAmount={remainedTokenAmount}
                    scottyPriceInToken={scottyPriceInToken}
                    investedTokenId={currentTab}
                    currentSaleStage={currentSaleStage}
                  />
                ) : (
                  <TabUsdt
                    remainedTokenAmount={remainedTokenAmount}
                    scottyPriceInToken={scottyPriceInToken}
                    investedTokenId={currentTab}
                    currentSaleStage={currentSaleStage}
                  />
                )}
              </Stack>
            )}
          </Stack>
        </Stack>
      ) : (
        <Stack alignItems="center" justifyContent="center" minHeight={600} spacing={4}>
          <SectionTitle sx={{ color: grey[900] }}>No Sale Stage</SectionTitle>
          {claimScottyEnabled && (
            <ClaimScotty />
          )}
        </Stack>
      )}
    </Paper>
  )
}