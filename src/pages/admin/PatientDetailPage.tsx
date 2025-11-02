import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetPatientByIdQuery } from '../../store/api';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Loader from '../../components/common/Loader';
import ErrorAlert from '../../components/common/ErrorAlert';

const PatientDetailPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { data: patient, error, isLoading } = useGetPatientByIdQuery(id || '');

  if (isLoading) {
    return <Loader message={t('patientDetailPage.loadingPatient')} />;
  }

  if (error) {
    return <ErrorAlert message={t('patientDetailPage.errorLoadingPatient')} />;
  }

  if (!patient) {
    return <p className="text-center text-gray-600">{t('patientDetailPage.patientNotFound')}</p>;
  }

  // Prepare data for Recharts (similar to HealthHistoryPage)
  const chartData = patient.vitals?.map((log) => ({
    date: new Date(log.date).toLocaleDateString(),
    systolic: log.bloodPressureSystolic,
    diastolic: log.bloodPressureDiastolic,
    pulse: log.pulse,
    weight: log.weight,
  })) || [];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{t('patientDetailPage.title', { name: patient.name })}</h1>
      <div className="bg-white p-8 rounded-xl shadow-lg">
        {/* Patient Profile Section */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{t('patientDetailPage.profileInformation')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div><span className="font-semibold">{t('patientListPage.name')}:</span> {patient.name}</div>
            <div><span className="font-semibold">{t('patientListPage.email')}:</span> {patient.email}</div>
            <div><span className="font-semibold">{t('patientListPage.age')}:</span> {patient.age}</div>
            <div><span className="font-semibold">{t('patientListPage.region')}:</span> {patient.region}</div>
            <div className="md:col-span-2"><span className="font-semibold">{t('profilePage.riskFactors')}:</span> {patient.riskFactors.join(', ')}</div>
          </div>
        </div>

        {/* Vital Logs Section */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{t('healthHistoryPage.title')}</h2>
          {chartData.length > 0 ? (
            <>
              <h3 className="text-xl font-bold mb-4 text-gray-800">{t('healthHistoryPage.bloodPressureTrends')}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="systolic" stroke="#8884d8" name={t('healthHistoryPage.systolic')} />
                  <Line type="monotone" dataKey="diastolic" stroke="#82ca9d" name={t('healthHistoryPage.diastolic')} />
                </LineChart>
              </ResponsiveContainer>

              <h3 className="text-xl font-bold mt-8 mb-4 text-gray-800">{t('healthHistoryPage.pulseAndWeightTrends')}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" label={{ value: t('healthHistoryPage.pulse'), angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: t('healthHistoryPage.weight'), angle: 90, position: 'insideRight' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pulse" stroke="#ffc658" name={t('healthHistoryPage.pulse')} yAxisId="left" />
                  <Line type="monotone" dataKey="weight" stroke="#ff7300" name={t('healthHistoryPage.weight')} yAxisId="right" />
                </LineChart>
              </ResponsiveContainer>
            </>
          ) : (
            <p className="text-center text-gray-600">{t('healthHistoryPage.noVitalsFound')}</p>
          )}
        </div>

        {/* Appointments Section (Placeholder) */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{t('patientDetailPage.appointments')}</h2>
          {patient.appointments && patient.appointments.length > 0 ? (
            <ul>
              {/* Render appointments here */}
              <li>{t('patientDetailPage.appointmentPlaceholder')}</li>
            </ul>
          ) : (
            <p className="text-center text-gray-600">{t('patientDetailPage.noAppointments')}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetailPage;
