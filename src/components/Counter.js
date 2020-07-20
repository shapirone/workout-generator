import React, { useState, useEffect } from "react"

import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Box from "@material-ui/core/Box"

function getRecommendedNumber(high, low) {
  return Math.floor((Number(high) + Number(low)) / 2)
}

function Counter({ high, low }) {
  const [count, setCount] = useState(getRecommendedNumber(high, low))

  useEffect(() => {
    setCount(getRecommendedNumber(high, low))
  }, [high, low])

  const handleIncrement = () => {
    setCount(count + 1)
  }
  const handleDecrement = () => {
    setCount(count - 1)
  }

  // let recString = `${recNum}`
  // if (timed) recString += ` sec.`
  // if (sides) recString += ` ea.`

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box style={{ color: "gray" }}>{high}</Box>
      <ButtonGroup
        size="small"
        aria-label="small outlined button group"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button onClick={handleIncrement}>+</Button>
        <Button disabled style={{ color: "black" }}>
          {count}
        </Button>
        {count > 1 && <Button onClick={handleDecrement}>-</Button>}
      </ButtonGroup>
      <Box style={{ color: "gray" }}>{low}</Box>
    </Box>
  )
}

export default Counter
