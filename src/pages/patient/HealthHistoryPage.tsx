import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetPatientVitalsQuery } from '../../store/api';
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

const HealthHistoryPage = () => {
  const { t } = useTranslation();
  const { data: vitals, error, isLoading } = useGetPatientVitalsQuery();

  if (isLoading) {
    return <Loader message={t('healthHistoryPage.loadingVitals')} />;
  }

  if (error) {
    return <ErrorAlert message={t('healthHistoryPage.errorLoadingVitals')} />;
  }

  if (!vitals || vitals.length === 0) {
    return <p className="text-center text-gray-600">{t('healthHistoryPage.noVitalsFound')}</p>;
  }

  // Prepare data for Recharts
  const chartData = vitals.map((log) => ({
    date: new Date(log.date).toLocaleDateString(),
    systolic: log.bloodPressureSystolic,
    diastolic: log.bloodPressureDiastolic,
    pulse: log.pulse,
    weight: log.weight,
  }));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{t('healthHistoryPage.title')}</h1>
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{t('healthHistoryPage.bloodPressureTrends')}</h2>
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

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">{t('healthHistoryPage.pulseAndWeightTrends')}</h2>
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
      </div>
    </div>
  );
};

export default HealthHistoryPage;
