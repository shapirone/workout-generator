import React, { useState, useEffect } from "react"

import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"

function getRecommendedNumber(high, low) {
  return Math.floor((Number(high) + Number(low)) / 2)
}

function Counter({ high, low, timed, sides }) {
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
      <Box style={{ color: "gray" }}>
        <Typography variant="caption">Low {low}</Typography>
      </Box>
      <ButtonGroup
        orientation="vertical"
        size="small"
        variant="contained"
        aria-label="small outlined button group"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {count > 1 && (
          <Button
            onClick={handleDecrement}
            color="primary"
            style={{ minWidth: "100%" }}
          >
            -
          </Button>
        )}
        <Button disabled style={{ color: "black" }}>
          <Typography variant="caption">
            {count} {timed && "sec."} {sides && "ea."}
          </Typography>
        </Button>
        <Button
          onClick={handleIncrement}
          color="primary"
          style={{ minWidth: "100%" }}
        >
          +
        </Button>
      </ButtonGroup>
      <Box style={{ color: "gray" }}>
        <Typography variant="caption">High {high}</Typography>
      </Box>
    </Box>
  )
}

export default Counter
