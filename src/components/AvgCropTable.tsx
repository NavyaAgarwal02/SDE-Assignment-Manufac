import { Table } from "@mantine/core";
import { processAvgCropData } from "../utils/dataProcessor";
import cropData from "../data/cropData.json";

const AvgCropTable = () => {
  const tableData = processAvgCropData(cropData as any[]);

  return (
    <Table striped>
      <thead>
        <tr>
          <th>Crop</th>
          <th>Average Yield (Kg/Ha)</th>
          <th>Average Cultivation Area (Ha)</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row) => (
          <tr key={row.crop}>
            <td>{row.crop}</td>
            <td>{row.avgYield}</td>
            <td>{row.avgArea}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AvgCropTable;
