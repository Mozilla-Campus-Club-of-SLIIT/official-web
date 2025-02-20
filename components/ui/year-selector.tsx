import React from "react";

interface YearSelectorProps {
  years: string[];
  selectedYear: string;
  onChange: (year: string) => void;
}

const YearSelector: React.FC<YearSelectorProps> = ({
  years,
  selectedYear,
  onChange,
}) => {
  return (
    <div className="mb-8 flex justify-center">
      <select
        className="p-3 border-orange-500 bg-white shadow-sm focus:outline-none cursor-pointer"
        value={selectedYear}
        onChange={(e) => onChange(e.target.value)}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearSelector;
