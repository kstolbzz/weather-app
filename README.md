# Weather Application
This solution was scaffolded in Vite. In order to run this weather app locally, please clone the repo onto your machine and then run `npm install` followed by `npm run dev`.

Once you have the local application running, you must enter a value for latitude, a value for longitude, a date between today and five days from now, and a selection on whether you want the forecast for the daytime or nightime. Once all of these values have been entered and you click submit, the weather forecast will populate on the right hand side of your browser.

## Future Considerations
Below in no particular order is a list of changes and improvements I would make to the application if given more than 3 hours to work on a solution

- Implement a Redux setup with RTK Query: While I have worked with enterprise level applications which utilize Redux, I have never set up a new application which utilizes this technology. Given this, along with the time constraint of the assignment, I decided to proceed with a single state variable in the one page this application contains. While this works for the proof of concept shown here, if this application were to scale to include more features, best practice dictates that state management should be handled with Redux. On top of this, RTK Query would be helpful for eliminating the currently hand written data fetching logic.

- A config file: Currently this proof of concept is not deployed and is only running locally, so the `API_BASE_URL` variable is just defined in the `getForecast.tsx` file. Best practices would dictate that this should be split out into a config file that could be changed for each environment if this proof of concept became a deployed application.

- Componentization of the inputs: While the percentage bar is a reusable component, given more time I would also turn the text fields, date picker, and radio buttons into reusable components as well. This would allow them to be used again in other places in the application if the proof of concept became something to build off of.

- Error handling: The current application has the bare minimum of error handling. The additional error handling I would like to add includes but is not limited to:
  - A minimum and maximum allowable value for the latitude input. If the entered value is outside of the acceptable range, the field should enter an error state and a descriptive error message should appear.
  - A minimum and maximum allowable value for the longitude input. If the entered value is outside of the acceptable range, the field should enter an error state and a descriptive error message should appear.
  - While the datepicker currently enters an error state if a date outside of the allowable bounds is selected, a descriptive error message should appear.
  - Disable the submit button until all fields have acceptable values populated into them.

- A clear button for the inputs: If the user wants to clear the data on the page, instead of having to refresh, a clear button next to submit which would reset the application to its beginning state would be ideal. This would also re-hide the right side of the application until new data is added.

- A loading state: Once the submit button has been clicked, a spinner or an equivalent loading state would be a visual cue to the end user that the application is working which would prevent them from spamming the submit button if the API is returning slowly.

- Iconography: I love in existing weather apps where there is an icon displaying the weather such as a sun, a sun partially covered by clouds, a snowflake, etc. This is a nice to have I would enjoy seeing in my own weather application.

- Percent bar updates: While the current Percentage Bar does technically meet all of the requirements outlined, it leaves room for additional features. The additional features I would like to add include:
  - The value being displayed in a more cohesive way inside of the data visualization, whether that be as a hover state of the bar or as a value displayed in the bar itself
  - Ticks on the bottom for easier understanding of what value the bar is filled to
  - A more standardized sizing so the two bars for the two implementations are not differing lengths
  - Color customization for the fill color

- Overall application atyle: While the application isn't horrible to look at, there is definitely room for improvement on the overall style to make it more user friendly.

- Accessability: While all of the fields do contain an aria-label, this is the bare minimum effort for 508 compliance. With more time, a full 508 compliance test should be completed to ensure usability for all different types of end users.