import React from 'react';
import { useTranslation } from 'react-i18next';

const AdminDashboard = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{t('adminDashboard.title')}</h1>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-2">{t('adminDashboard.regionalHealthStatistics')}</h2>
        {/* Placeholder for Mapbox visualization */}
        <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">{t('adminDashboard.mapVisualization')}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
