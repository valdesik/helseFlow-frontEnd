import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetMyAppointmentsQuery } from '../../store/api';
import Loader from '../../components/common/Loader';
import ErrorAlert from '../../components/common/ErrorAlert';

const MyAppointmentsPage = () => {
  const { t } = useTranslation();
  const { data: appointments, error, isLoading } = useGetMyAppointmentsQuery();

  if (isLoading) {
    return <Loader message={t('myAppointmentsPage.loadingAppointments')} />;
  }

  if (error) {
    return <ErrorAlert message={t('myAppointmentsPage.errorLoadingAppointments')} />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{t('myAppointmentsPage.title')}</h1>
      <div className="bg-white p-8 rounded-xl shadow-lg">
        {appointments && appointments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('myAppointmentsPage.doctor')}</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('myAppointmentsPage.specialty')}</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('myAppointmentsPage.time')}</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('myAppointmentsPage.reason')}</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('myAppointmentsPage.status')}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{appointment.doctorName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.specialty}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(appointment.appointmentTime).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.reason}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                          appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'}`}>
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-600">{t('myAppointmentsPage.noAppointmentsFound')}</p>
        )}
      </div>
    </div>
  );
};

export default MyAppointmentsPage;
