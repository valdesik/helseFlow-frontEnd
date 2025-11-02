import React from 'react';
import { useTranslation } from 'react-i18next';

interface AppointmentCalendarProps {
  onSelectSlot: (slot: string) => void;
  selectedSlot: string | null;
}

const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({ onSelectSlot, selectedSlot }) => {
  const { t } = useTranslation();

  // Mock available slots for a doctor
  const mockAvailableSlots = [
    { date: '2023-11-15', time: '09:00', datetime: '2023-11-15T09:00:00Z' },
    { date: '2023-11-15', time: '10:00', datetime: '2023-11-15T10:00:00Z' },
    { date: '2023-11-16', time: '11:00', datetime: '2023-11-16T11:00:00Z' },
    { date: '2023-11-16', time: '14:00', datetime: '2023-11-16T14:00:00Z' },
  ];

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h4 className="font-semibold text-lg mb-4">{t('appointmentCalendar.availableSlots')}</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {mockAvailableSlots.map((slot) => (
          <button
            key={slot.datetime}
            onClick={() => onSelectSlot(slot.datetime)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
              ${selectedSlot === slot.datetime
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-blue-100 hover:text-blue-700'
              }`}
          >
            <span className="block text-xs text-gray-500">{slot.date}</span>
            <span className="block">{slot.time}</span>
          </button>
        ))}
      </div>
      {!mockAvailableSlots.length && (
        <p className="text-center text-gray-500 mt-4">{t('appointmentCalendar.noSlotsAvailable')}</p>
      )}
    </div>
  );
};

export default AppointmentCalendar;
