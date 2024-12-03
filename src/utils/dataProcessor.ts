type CropData = {
  Country: string;
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": number;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number;
  "Area Under Cultivation (UOM:Ha(Hectares))": number;
};

type ProcessedMaxMinData = {
  year: number;
  maxCrop: string;
  minCrop: string;
};

type ProcessedAvgData = {
  crop: string;
  avgYield: number;
  avgArea: number;
};

const extractYear = (yearStr: string): number => {
  const match = yearStr.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : 0;
};

export const processMaxMinData = (data: CropData[]): ProcessedMaxMinData[] => {
  const yearGroups = new Map<number, CropData[]>();
  
  // Group data by year
  data.forEach(item => {
    const year = extractYear(item.Year);
    if (!yearGroups.has(year)) {
      yearGroups.set(year, []);
    }
    yearGroups.get(year)?.push(item);
  });

  return Array.from(yearGroups.entries()).map(([year, yearData]) => {
    let maxProd = -Infinity;
    let minProd = Infinity;
    let maxCrop = '';
    let minCrop = '';

    yearData.forEach(item => {
      const prod = item["Crop Production (UOM:t(Tonnes))"];
      if (prod > maxProd) {
        maxProd = prod;
        maxCrop = item["Crop Name"];
      }
      if (prod < minProd) {
        minProd = prod;
        minCrop = item["Crop Name"];
      }
    });

    return { year, maxCrop, minCrop };
  });
};

export const processAvgCropData = (data: CropData[]): ProcessedAvgData[] => {
  const cropGroups = new Map<string, { totalYield: number; totalArea: number; count: number }>();

  data.forEach(item => {
    const crop = item["Crop Name"];
    if (!cropGroups.has(crop)) {
      cropGroups.set(crop, { totalYield: 0, totalArea: 0, count: 0 });
    }
    
    const group = cropGroups.get(crop)!;
    group.totalYield += item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"];
    group.totalArea += item["Area Under Cultivation (UOM:Ha(Hectares))"];
    group.count += 1;
  });

  return Array.from(cropGroups.entries()).map(([crop, stats]) => ({
    crop,
    avgYield: Number((stats.totalYield / stats.count).toFixed(3)),
    avgArea: Number((stats.totalArea / stats.count).toFixed(3))
  }));
};