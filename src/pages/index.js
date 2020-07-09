import React, { useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Sidebar from '../components/Sidebar'

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import getWorkout from './workout'

const IndexPage = () => {
  const [exercises, setExercises] = useState([]);

  const getExercises = () => {
    setExercises(getWorkout)
  }

  return (
    <Layout>
      <SEO title="Home" />
      <Grid container style={{ height: '100vh' }}>
        <Grid item style={{ height: '100vh', flex: '1 0 20%' }}>
          <Sidebar getExercises={getExercises} />
        </Grid>
        <Grid item style={{ height: '100vh', flex: '1 0 80%' }}>
          <Container>
            <Box>
              <Grid container spacing={4} direction="column">
                {exercises.map((round, idx) => {
                  return (
                    <Box key={round}>
                      <Typography variant="h5">Round {idx + 1}</Typography>
                      <Grid container>
                        {round.map(activity => {
                          const { exercise, details, category } = activity
                          return (
                            <Card style={{ flex: '1 0 30%', margin: '0.5rem' }}>
                              <Grid item min>
                                <Grid spacing={4} direction="row">
                                  <CardContent gutterbottom>
                                    <Grid item>
                                      <Typography variant="h6">{exercise}</Typography>
                                    </Grid>
                                    <Grid item>
                                      <Typography variant="body2" color="textSecondary" component="p">{category}</Typography>
                                    </Grid>
                                    {details && (
                                      <Grid item>
                                        <Typography variant="body2" color="textSecondary" component="p" style={{ paddingTop: '1rem' }}>{details}</Typography>
                                      </Grid>)}
                                  </CardContent>
                                </Grid>
                              </Grid>
                            </Card>
                          )
                        })
                        }
                      </Grid>
                    </Box>
                  )
                })}
              </Grid>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </Layout >
  )
}

export default IndexPage

