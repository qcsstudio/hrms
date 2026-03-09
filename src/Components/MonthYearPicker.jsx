import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MonthYearPicker = () => {
  const [date, setDate] = useState(null);

  return (
    <div>
      <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        placeholderText="Select Month & Year"
        className="border border-[#DEE2E6] h-[40px] w-[230px] rounded p-2"
      />
    </div>
  );
};

export default MonthYearPicker;