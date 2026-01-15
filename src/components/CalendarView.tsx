import React, { useState } from 'react';

interface CalendarViewProps {
  value?: Date;
  onChange?: (date: Date) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ value, onChange }) => {
  const [currentDate, setCurrentDate] = useState(value || new Date());
  const [selectedDate, setSelectedDate] = useState(value);
  const [hoveredDate, setHoveredDate] = useState<number | null>(null);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
    onChange?.(newDate);
  };

  const handleMonthChange = (month: number) => {
    const newDate = new Date(currentDate.getFullYear(), month, 1);
    setCurrentDate(newDate);
  };

  const handleYearChange = (year: number) => {
    const newDate = new Date(year, currentDate.getMonth(), 1);
    setCurrentDate(newDate);
  };

  const days = Array.from({ length: getDaysInMonth(currentDate) }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: getFirstDayOfMonth(currentDate) });

  return (
    <div
      style={{
        padding: '1rem',
        background: 'var(--surface)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)',
        minWidth: '280px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
          gap: '0.5rem',
        }}
      >
        <button
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.2rem',
            padding: '0.5rem',
          }}
        >
          ◀
        </button>

        <div style={{ display: 'flex', gap: '0.5rem', flex: 1 }}>
          <select
            value={currentDate.getMonth()}
            onChange={(e) => handleMonthChange(parseInt(e.target.value))}
            style={{
              flex: 1,
              padding: '0.5rem',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              background: 'var(--surface)',
              color: 'var(--text)',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, idx) => (
              <option key={month} value={idx}>
                {month}
              </option>
            ))}
          </select>

          <select
            value={currentDate.getFullYear()}
            onChange={(e) => handleYearChange(parseInt(e.target.value))}
            style={{
              padding: '0.5rem',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              background: 'var(--surface)',
              color: 'var(--text)',
              cursor: 'pointer',
              fontSize: '0.9rem',
              minWidth: '70px',
            }}
          >
            {Array.from({ length: 21 }, (_, i) => currentDate.getFullYear() - 10 + i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.2rem',
            padding: '0.5rem',
          }}
        >
          ▶
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.25rem' }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            style={{
              textAlign: 'center',
              fontWeight: 600,
              fontSize: '0.75rem',
              color: 'var(--muted)',
              padding: '0.25rem',
            }}
          >
            {day}
          </div>
        ))}
        {emptyDays.map((_, idx) => (
          <div key={`empty-${idx}`} />
        ))}
        {days.map((day) => (
          <button
            key={day}
            onClick={() => handleDateClick(day)}
            onMouseEnter={() => setHoveredDate(day)}
            onMouseLeave={() => setHoveredDate(null)}
            style={{
              padding: '0.25rem',
              aspectRatio: '1',
              background:
                selectedDate?.getDate() === day && selectedDate?.getMonth() === currentDate.getMonth()
                  ? 'var(--accent)'
                  : hoveredDate === day
                    ? 'rgba(249, 115, 22, 0.1)'
                    : 'transparent',
              color:
                selectedDate?.getDate() === day && selectedDate?.getMonth() === currentDate.getMonth()
                  ? '#fff'
                  : 'var(--text)',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.85rem',
              transition: 'all 0.2s',
            }}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};
