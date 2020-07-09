import React, { useState, useEffect } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import { getEquipment, getBodyParts } from '../pages/exercises'

import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    fontSize: '10px',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  container: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(#ba000d, #ff7961 40%, #ff7961 60%, #ba000d)'
  }
}));


function Sidebar({ getExercises }) {
  const [equipment, setEquipment] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const classes = useStyles();
  // const theme = useTheme();

  useEffect(() => {
    setEquipment(getEquipment());
    setBodyParts(getBodyParts());
  }, [])

  const handleEquipmentChange = (event) => {
    setSelectedEquipment(event.target.value);
  };

  const handleBodyPartChange = (event) => {
    setSelectedBodyPart(event.target.value);
  };

  const handleDelete = (chipToDelete) => () => {
    setSelectedEquipment((chips) => {
      return chips.filter((chip) => {
        return (chip !== chipToDelete)
      })
    })
  };

  return (
    <Grid container direction={'column'} spacing={4} alignItems="center" justify="center" className={classes.container}>
      <Grid item container direction={'column'} justify="center" style={{ width: '70%' }}>
        <FormControl>
          <InputLabel id="equipment-label">Equipment</InputLabel>
          <Select
            labelId="equipment-label"
            id="equipment"
            multiple
            value={selectedEquipment}
            onChange={handleEquipmentChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) => 'Equipment'}
            MenuProps={MenuProps}
          >
            {equipment.map((name) => {
              return (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={selectedEquipment.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <div className={classes.chips}>
          {selectedEquipment.map((value) => (
            <li key={value} style={{ listStyle: 'none', marginBottom: '4px', }}>
              <Chip label={value} className={classes.chip} onDelete={handleDelete(value)} style={{ fontSize: "12px", height: '24px' }} />
            </li>
          ))}
        </div>
      </Grid>
      <Grid item container direction={'column'} justify="center" style={{ width: '70%' }}>
        <FormControl>
          <InputLabel id="equipment-label">Focus Area</InputLabel>
          <Select
            labelId="bodypart-label"
            id="bodypart"
            value={selectedBodyPart}
            onChange={handleBodyPartChange}
            input={<Input id="select-bodypart" />}
            renderValue={(selected) => selected || "Body Part"}
            MenuProps={MenuProps}
          >
            {bodyParts.map((name) => {
              return (
                <MenuItem key={name} value={name}>
                  <ListItemText primary={name} />
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={getExercises}>Generate</Button>
      </Grid>
    </Grid >
  )
}

export default Sidebar;