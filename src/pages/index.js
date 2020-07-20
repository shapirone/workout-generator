import React, { useState } from "react"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import Counter from "../components/Counter"
import ExerciseCard from "../components/ExerciseCard"
import Sidebar from "../components/Sidebar"

import Box from "@material-ui/core/Box"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

import getWorkout from "../utils/workout"
import { getEquipment } from "../utils/exercises"

const IndexPage = () => {
  const equipment = getEquipment()
  const [workout, setWorkout] = useState([])
  const [focus, setFocus] = useState("")
  const [userEquipment, setUserEquipment] = useState(equipment)

  const getExercises = () => {
    setWorkout(getWorkout(focus, userEquipment))
  }

  return (
    <Layout>
      <SEO title="Home" />
      <Grid container style={{ height: "100vh" }}>
        <Grid
          item
          component="section"
          style={{ height: "100vh", flex: "1 0 20%" }}
        >
          <Sidebar
            getExercises={getExercises}
            setFocus={setFocus}
            equipment={equipment}
            userEquipment={userEquipment}
            setUserEquipment={setUserEquipment}
          />
        </Grid>
        <Grid
          item
          component="section"
          style={{ height: "100vh", flex: "1 0 80%" }}
        >
          <Container>
            <Box>
              <Grid
                container
                spacing={4}
                direction="column"
                style={{ padding: "30px 10px" }}
              >
                {workout.map((round, idx) => {
                  return (
                    <Box key={round}>
                      <Typography variant="h5">Round {idx + 1}</Typography>
                      <Grid container>
                        {round.map(activity => {
                          return <ExerciseCard exercise={activity} />
                        })}
                      </Grid>
                    </Box>
                  )
                })}
              </Grid>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default IndexPage
