import React, { useState, useEffect } from "react"

import { makeStyles } from "@material-ui/core/styles"

import { getBodyParts } from "../pages/exercises"

import Button from "@material-ui/core/Button"
import Chip from "@material-ui/core/Chip"
import Grid from "@material-ui/core/Grid"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import ListItemText from "@material-ui/core/ListItemText"
import FormControl from "@material-ui/core/FormControl"
import Typography from "@material-ui/core/Typography"
import Select from "@material-ui/core/Select"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
    fontSize: "10px",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  container: {
    background: "linear-gradient(#ba000d, #ff7961 40%, #ff7961 60%, #ba000d)",
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: "20%",
  },
}))

function Sidebar({
  getExercises,
  setFocus,
  equipment,
  userEquipment,
  setUserEquipment,
}) {
  const [bodyParts, setBodyParts] = useState([])
  const [selectedBodyPart, setSelectedBodyPart] = useState("Whole Body")
  const classes = useStyles()
  // const theme = useTheme();

  useEffect(() => {
    setUserEquipment(equipment)
    setBodyParts(getBodyParts())
  }, [equipment])

  const handleBodyPartChange = event => {
    setSelectedBodyPart(event.target.value)
  }

  const handleEquipment = clickedChip => event => {
    userEquipment.includes(clickedChip)
      ? setUserEquipment(
          userEquipment.filter(equipment => equipment !== clickedChip)
        )
      : setUserEquipment([...userEquipment, event.target.innerHTML])
  }

  return (
    <Grid
      container
      direction={"column"}
      alignItems="center"
      justify="center"
      className={classes.container}
    >
      <Grid
        item
        container
        direction={"column"}
        justify="center"
        style={{ width: "70%" }}
      >
        <Typography>Equipment Available</Typography>
        <div className={classes.chips}>
          {equipment.map(value => {
            const isEquipmentSelected = userEquipment.includes(value)
            return (
              <li key={value} style={{ listStyle: "none", margin: "4px" }}>
                <Chip
                  variant={isEquipmentSelected ? "default" : "outlined"}
                  color="primary"
                  size="small"
                  label={value}
                  className={classes.chip}
                  onClick={
                    value !== "Bodyweight" ? handleEquipment(value) : null
                  }
                  onDelete={
                    isEquipmentSelected && value !== "Bodyweight"
                      ? handleEquipment(value)
                      : null
                  }
                />
              </li>
            )
          })}
        </div>
      </Grid>
      <Grid
        item
        container
        direction={"column"}
        justify="center"
        style={{ width: "70%", marginTop: "20px" }}
      >
        <FormControl>
          <InputLabel id="equipment-label">Focus Area</InputLabel>
          <Select
            labelId="bodypart-label"
            id="bodypart"
            value={selectedBodyPart}
            onChange={handleBodyPartChange}
            input={<Input id="select-bodypart" />}
            renderValue={selected => selected || "Body Part"}
            MenuProps={MenuProps}
          >
            {bodyParts.map(name => {
              return (
                <MenuItem key={name} value={name}>
                  <ListItemText primary={name} />
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item style={{ marginTop: "20px" }}>
        <Button variant="contained" color="primary" onClick={getExercises}>
          Generate
        </Button>
      </Grid>
    </Grid>
  )
}

export default Sidebar
