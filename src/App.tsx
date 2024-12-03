import React from "react";
import MaxMinTable from "./components/MaxMinTable";
import AvgCropTable from "./components/AvgCropTable";

const App = () => {
  return (
    <div>
      <h1>Indian Agriculture Data Analysis</h1>
      <h2>Maximum and Minimum Production</h2>
      <MaxMinTable />
      <h2>Average Yield and Cultivation Area</h2>
      <AvgCropTable />
    </div>
  );
};

export default App;
