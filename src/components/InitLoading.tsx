import { useEffect, useState, useRef } from 'react'
import { Box, Stack, Container, Typography, Button, useTheme } from '@mui/material'
import { grey } from '@mui/material/colors'
import { Icon } from '@iconify/react'
import InitLoadProgressBar from './InitLoadProgressBar'
import useInitLoading from '../hooks/useInitLoading'

export default function InitLoading() {
  const theme = useTheme()
  const { closeLoadingAct } = useInitLoading()

  const [progressValue, setProgressValue] = useState<number>(0)
  const progressValueRef = useRef(progressValue)

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (progressValueRef.current < 100) {
        console.log('>>>>>>>>>>>>>>>>>> progressValueRef.current => ', progressValueRef.current)
        setProgressValue(progressValue => progressValue + 1)
      } else {
        closeLoadingAct()
      }
    }, 40)
    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    progressValueRef.current = progressValue
  }, [progressValue])

  return (
    <Box position="relative" minHeight="100vh">
      <Box
        component="video"
        autoPlay
        muted
        loop
        playsInline
        src="/assets/videos/scotty_bg.mp4"
        position="absolute"
        right={0}
        bottom={0}
        minWidth="100%"
        maxWidth="100%"
        minHeight="100%"
        sx={{ objectFit: 'cover' }}
      />
      <Box
        sx={{ background: 'rgba(0, 0, 0, 0.7)' }}
        position="relative"
        zIndex={10}
        height="100vh"
      >
        <Container sx={{ height: '100%' }}>
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={8}
            height="100%"
          >
            <Box component="img" src="/assets/images/hero-logo.png" />
            <Stack spacing={2} width="100%">
              <Typography textAlign="center" textTransform="capitalize" color={grey[200]}>
                Initalizing the Systems...
              </Typography>
              <InitLoadProgressBar value={progressValue} />
            </Stack>

            <Stack direction="row" justifyContent="center" spacing={1}>
              <Button sx={{ bgcolor: grey[900], fontSize: 24, p: 2, borderRadius: 2, color: theme.palette.primary.main }}>
                <Icon icon="mdi:twitter" />
              </Button>
              <Button sx={{ bgcolor: grey[900], fontSize: 24, p: 2, borderRadius: 2, color: theme.palette.primary.main }}>
                <Icon icon="ic:baseline-discord" />
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}