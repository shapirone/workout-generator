import React, { useState, useEffect } from "react"

import Counter from "./Counter"

import Box from "@material-ui/core/Box"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

function ExerciseCard({ exercise }) {
  const {
    exercise: exerciseName,
    details,
    category,
    referenceVideo,
    high,
    low,
    sides,
    timed,
  } = exercise

  return (
    <Card style={{ flex: "1 0 30%", margin: "0.5rem" }}>
      <Grid item min>
        <Grid spacing={4} direction="row">
          <CardMedia
            component="iframe"
            height="200"
            src={referenceVideo}
            style={{ backgroundColor: "black" }}
          />
          <CardContent gutterbottom>
            <Box display="flex">
              <Box flexBasis={"80%"}>
                <Grid item>
                  <Typography variant="h6">{exerciseName}</Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {category}
                  </Typography>
                </Grid>
                {details && (
                  <Grid item>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{ paddingTop: "1rem" }}
                    >
                      {details}
                    </Typography>
                  </Grid>
                )}
              </Box>
              <Counter high={high} low={low} sides={sides} timed={timed} />
              {/* <Box display="flex" flexDirection="column">
                <Box>{low}</Box>
                <Box>{recString}</Box>
                <Box>{high}</Box>
              </Box> */}
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default ExerciseCard
