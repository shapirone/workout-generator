import React, { useState } from "react"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import Sidebar from "../components/Sidebar"

import Box from "@material-ui/core/Box"
import Container from "@material-ui/core/Container"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

import getWorkout from "./workout"
import { getEquipment } from "./exercises"

const IndexPage = () => {
  const equipment = getEquipment()
  const [exercises, setExercises] = useState([])
  const [focus, setFocus] = useState("")
  const [userEquipment, setUserEquipment] = useState(equipment)

  const getExercises = () => {
    setExercises(getWorkout(focus, userEquipment))
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
                {exercises.map((round, idx) => {
                  return (
                    <Box key={round}>
                      <Typography variant="h5">Round {idx + 1}</Typography>
                      <Grid container>
                        {round.map(activity => {
                          const { exercise, details, category } = activity
                          return (
                            <Card style={{ flex: "1 0 30%", margin: "0.5rem" }}>
                              <Grid item min>
                                <Grid spacing={4} direction="row">
                                  <CardContent gutterbottom>
                                    <Grid item>
                                      <Typography variant="h6">
                                        {exercise}
                                      </Typography>
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
                                  </CardContent>
                                </Grid>
                              </Grid>
                            </Card>
                          )
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
