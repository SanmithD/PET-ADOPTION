import { Box } from '@mui/material'
import React from 'react'
import Impact from './Impact'
import Main from './Main'
import Reason from './Reason'

function Home() {
  return (
    <div>
        <Main/>
        <Box sx={{ marginTop: 70 }} >  
        <Impact/>
        </Box>
        <Reason/>
    </div>
  )
}

export default Home