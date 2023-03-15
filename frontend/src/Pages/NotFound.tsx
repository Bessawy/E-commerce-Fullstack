import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const Notfound = () => {
  return (
    <Box mt={20} ml={10}>
    <Typography variant='h2' color="error">
        Page not found (404)
    </Typography>
    </Box>
  )
}

export default Notfound