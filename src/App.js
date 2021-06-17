import logo from './logo.svg';
import './App.css';
import Button from "@material-ui/core/Button";
import { SliderPicker } from "react-color";
import React from "react";
import {Grid, Slider} from "@material-ui/core";
import MaterialColorPicker from "./via.js/MaterialColorPicker";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button variant="contained" color="primary">
          Connect
        </Button>
        <Slider value={0} min={0} max={255} valueLabelDisplay={"auto"}/>

        <InputLabel id="label">Effect</InputLabel>
        <Select labelId="label" id="select" value="0">
          <MenuItem value="0">Off</MenuItem>
          <MenuItem value="1">Static</MenuItem>
          <MenuItem value="2">Breathing 1</MenuItem>
          <MenuItem value="3">Breathing 2</MenuItem>
          <MenuItem value="4">Breathing 3</MenuItem>
          <MenuItem value="5">Breathing 4</MenuItem>
          <MenuItem value="6">Rainbow Mood 1</MenuItem>
          <MenuItem value="7">Rainbow Mood 2</MenuItem>
          <MenuItem value="8">Rainbow Mood 3</MenuItem>
          <MenuItem value="9">Rainbow Swirl 1</MenuItem>
          <MenuItem value="10">Rainbow Swirl 2</MenuItem>
          <MenuItem value="11">Rainbow Swirl 3</MenuItem>
          <MenuItem value="12">Rainbow Swirl 4</MenuItem>
          <MenuItem value="13">Rainbow Swirl 5</MenuItem>
          <MenuItem value="14">Rainbow Swirl 6</MenuItem>
          <MenuItem value="15">Snake 1</MenuItem>
          <MenuItem value="16">Snake 2</MenuItem>
          <MenuItem value="17">Snake 3</MenuItem>
          <MenuItem value="18">Snake 4</MenuItem>
          <MenuItem value="19">Snake 5</MenuItem>
          <MenuItem value="20">Snake 6</MenuItem>
          <MenuItem value="21">Knight 1</MenuItem>
          <MenuItem value="22">Knight 2</MenuItem>
          <MenuItem value="23">Knight 3</MenuItem>
          <MenuItem value="24">Christmas</MenuItem>
          <MenuItem value="25">Gradiant 1</MenuItem>
          <MenuItem value="26">Gradiant 2</MenuItem>
          <MenuItem value="27">Gradiant 3</MenuItem>
          <MenuItem value="28">Gradiant 4</MenuItem>
          <MenuItem value="29">Gradiant 5</MenuItem>
          <MenuItem value="30">Gradiant 6</MenuItem>
          <MenuItem value="31">Gradiant 7</MenuItem>
          <MenuItem value="32">Gradiant 8</MenuItem>
          <MenuItem value="33">Gradiant 9</MenuItem>
          <MenuItem value="34">Gradiant 10</MenuItem>
          <MenuItem value="35">RGB Test</MenuItem>
          <MenuItem value="36">Alternating</MenuItem>
          <MenuItem value="37">Twinkle 1</MenuItem>
          <MenuItem value="38">Twinkle 2</MenuItem>
          <MenuItem value="39">Twinkle 3</MenuItem>
          <MenuItem value="40">Twinkle 4</MenuItem>
          <MenuItem value="41">Twinkle 5</MenuItem>
          <MenuItem value="42">Twinkle 6</MenuItem>
        </Select>




      </header>
    </div>
  );
}

export default App;
