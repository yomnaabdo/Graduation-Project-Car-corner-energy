// OpeningDateForm.js
import React, { useState } from 'react';

function OpeningDateForm() {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [specificDayKnown, setSpecificDayKnown] = useState(false);

  return (
    <form>
      <label>
        Month:
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          {/* Options for months */}
        </select>
      </label>
      <label>
        Day:
        {specificDayKnown ? (
          <input
            type="number"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        ) : (
          <select value={day} onChange={(e) => setDay(e.target.value)}>
            {/* Options for days */}
          </select>
        )}
      </label>
      <label>
        Year:
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          {/* Options for years */}
        </select>
      </label>
      <label>
        <input
          type="checkbox"
          checked={specificDayKnown}
          onChange={() => setSpecificDayKnown(!specificDayKnown)}
        />
        Add the specific day
      </label>
    </form>
  );
}

export default OpeningDateForm;
