import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetDoctorByIdQuery, useBookAppointmentMutation } from '../../store/api';
import AppointmentCalendar from '../../components/appointments/AppointmentCalendar';
import Loader from '../../components/common/Loader';
import ErrorAlert from '../../components/common/ErrorAlert';

const DoctorProfilePage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { data: doctor, error, isLoading } = useGetDoctorByIdQuery(id || '');
  const [bookAppointment, { isLoading: isBooking, error: bookingError }] = useBookAppointmentMutation();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBookAppointment = async () => {
    if (!selectedSlot || !doctor?.id) return;

    try {
      await bookAppointment({ doctorId: doctor.id, appointmentTime: selectedSlot, reason: "General check-up" }).unwrap();
      setBookingSuccess(true);
      setSelectedSlot(null); // Clear selection after booking
      // Optionally, navigate to a 'My Appointments' page
    } catch (err) {
      console.error("Failed to book appointment:", err);
      setBookingSuccess(false);
    }
  };

  if (isLoading) {
    return <Loader message={t('doctorProfilePage.loadingProfile')} />;
  }

  if (error) {
    return <ErrorAlert message={t('doctorProfilePage.errorLoadingProfile')} />;
  }

  if (!doctor) {
    return <p className="text-center text-gray-600">{t('doctorProfilePage.doctorNotFound')}</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{t('doctorProfilePage.title', { name: doctor.name })}</h1>
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <img 
            src={doctor.imageUrl} 
            alt={`Dr. ${doctor.name}`}
            className="w-48 h-48 object-cover rounded-full shadow-md"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900">Dr. {doctor.name}</h2>
            <p className="text-indigo-600 text-lg mb-2">{doctor.specialty}</p>
            <p className="text-gray-600 mb-4">{doctor.location}</p>
            <p className="text-gray-700 leading-relaxed">
              {t('doctorProfilePage.bioPlaceholder', { name: doctor.name, specialty: doctor.specialty })}
            </p>
          </div>
        </div>

        <div className="mt-10 border-t pt-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">{t('doctorProfilePage.bookAppointment')}</h3>
          
          <AppointmentCalendar 
            onSelectSlot={setSelectedSlot} 
            selectedSlot={selectedSlot} 
          />

          {bookingError && <ErrorAlert message={t('doctorProfilePage.bookingError')} />}
          {bookingSuccess && <p className="text-green-500 mt-4">{t('doctorProfilePage.bookingSuccess')}</p>}

          <button 
            onClick={handleBookAppointment}
            disabled={!selectedSlot || isBooking}
            className={`mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105
              ${(!selectedSlot || isBooking) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isBooking ? t('doctorProfilePage.bookingInProgress') : t('doctorProfilePage.confirmBooking')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePage;
