import { Table } from "@mantine/core";
import { processMaxMinData } from "../utils/dataProcessor";
import cropData from "../data/cropData.json";

const MaxMinTable = () => {
    const tableData = processMaxMinData(cropData as any[]);

    return (
        <Table striped>
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Crop with Maximum Production</th>
                    <th>Crop with Minimum Production</th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((row) => (
                    <tr key={row.year}>
                        <td>{row.year}</td>
                        <td>{row.maxCrop}</td>
                        <td>{row.minCrop}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default MaxMinTable;
