import React, { useState } from 'react';

import { Button, Grid, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

import { DatePicker } from "@mui/x-date-pickers"

import PercentageBar from '../../components/PercentageBar/PercentageBar';

import { getForecastAPI } from '../../services/getForecast';

import './Home.css'

// Interface for the state variables we're tracking with the single page application
interface weatherInfo {
  latitude: string | undefined,
  longitude: string | undefined,
  date: Dayjs,
  time: string,
  textForecast: string | undefined,
  temperature: number | undefined,
  chanceOfRain: number | undefined
}

function Home() {
  // Set the state to be used in the app
  const [state, setState] = useState<weatherInfo>({
    latitude: "",
    longitude: "",
    date: dayjs(),
    time: 'day',
    textForecast: undefined,
    temperature: undefined,
    chanceOfRain: undefined
  })

  // Variables for the minDate and maxDate to be passed to the weatherDayPicker component
  // Set the first allowable date to be picked to today
  const minDate = dayjs();
  // Set the last allowable date to be picked to five days from now
  const maxDate = minDate.add(5, 'day');

  // Reusable function for text area changes for lat/lon
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setState(
      {
        ...state,
        [event.target.id]: event.target.value
      }
    )
  }

  // Function for day/night toggle
  const handleDayNight = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setState({
      ...state,
      time: newAlignment
    })
  }

  // function for submit
  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Varaible for the API we call onSubmit
    const fetchForecast = async () => {
      try {
        // Cast the state variables for lat/lon to number to be used in the API call
        const data = await getForecastAPI(Number(state?.latitude), Number(state?.longitude));
        // const data = await getForecastAPI(38.2527, -85.7585)
        // The weather data is returned as an array of objects to the front end
        const weatherDataArray = data.properties.periods;
        // A variable to ge the value of the date from the state variable which is tracking the selected date
        const selectedDate = state.date.date().valueOf();
        // A boolean variable to track whether we want the daytime value or the nighttime value
        const wantDaytime = state.time === "day" ? true : false;
        // Return the object from the weather data array for the correct calendar day and daytime
        const weatherObj = weatherDataArray.find((obj: any) => 
          dayjs(obj.startTime).date().valueOf() == selectedDate && ((obj.isDaytime === wantDaytime))
        )

        // Validation to only show the information for dates within 5 days of today
        const allowableDate = (selectedDate - dayjs().date().valueOf() >= 0 && selectedDate - dayjs().date().valueOf() <= 5);

        // If the object is undefined, nothing in the array matches the requested values so we shouldn't update the forecast
        if (weatherObj !== undefined && allowableDate) {
          // Add the information to show the forecast on the right hand side
          setState({
            ...state,
            textForecast: weatherObj.detailedForecast,
            temperature: weatherObj.temperature,
            chanceOfRain: weatherObj.probabilityOfPrecipitation.value
          })
        } else {
          alert("Error! This date is outside of the range of acceptable values!")
        }
        // Once we have the data, use this to populate the rest of the state variables to update the forecast on the right hand side
      } catch (err) {
        alert("Error! There is an error with the API call.")
        console.log(err);
      }
    }

    // Make sure there are values for the lat/lon to send to the API
    if (state.latitude !== "" && state.longitude != "") {
      fetchForecast();
    }
  }

  return (
    <>
      <div id="home">
        <Grid container spacing={2}>
          <Grid size={6}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <h1 className="heading">
                  What's the Weather?
                </h1>
              </Grid>
              <Grid size={12}>
                <p>Enter the inputs below to get your weather forecast!</p>
              </Grid>
              <Grid size={12}>
                <TextField 
                  label="Latitude" 
                  aria-label="latitude" 
                  id="latitude" 
                  type="number" 
                  value={state?.latitude}
                  onChange={handleChange}></TextField>
              </Grid>
              <Grid size={12}>
                <TextField 
                  label="Longitude"
                  aria-label="longitude"
                  id="longitude"
                  type="number"
                  value={state?.longitude}
                  onChange={handleChange}></TextField>
              </Grid>
              <Grid size={12}>
                <div id="date-picker">
                  <DatePicker label="Date"
                    defaultValue={minDate}
                    minDate={minDate}
                    maxDate={maxDate}
                    aria-label="Date picker"
                    onChange={(newValue: Dayjs) => {
                      // Set state
                      setState({
                        ...state,
                        date: newValue
                      })
                    }} />
                </div>     
              </Grid>
              <Grid size={12}>
                <ToggleButtonGroup
                  exclusive
                  defaultValue={"day"}
                  value={state?.time}
                  onChange={handleDayNight}
                  aria-label="Day Night Button Toggle"
                >
                  <ToggleButton value="day" aria-label="day">
                    Day
                  </ToggleButton>
                  <ToggleButton value="night" aria-label="night">
                    Night
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid size={12}>
                <Button onClick={handleSubmit}>Submit</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={6}>
            <Grid container spacing={2}>
              {state?.textForecast !== undefined && 
                <>
                  <Grid size={12}>
                    <h1>
                      Weather Forecast
                    </h1>
                  </Grid>
                  <Grid size={12}>
                    <p>{state?.textForecast}</p>
                  </Grid>
                </>
              }
              {state?.temperature !== undefined &&
                <Grid size={12}>
                  <p>Temperature: {state.temperature}°F</p>
                  <PercentageBar xStart={-50} xEnd={150} xValue={state?.temperature} format={"degreesF"}/>
                </Grid>
              }
              {state?.chanceOfRain !== undefined &&
                <Grid size={12}>
                  <p>Percent Chance of Rain: {state.chanceOfRain}%</p>
                  <PercentageBar xStart={0} xEnd={100} xValue={state?.chanceOfRain} format={"percentRain"}/>
                </Grid>
              }
            </Grid>
          </Grid>
        </Grid>
      </div>     
    </>
  )
}

export default Home
