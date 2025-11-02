import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetLatestPatientVitalsQuery, useGetAiRiskAssessmentQuery } from '../../store/api';
import Loader from '../../components/common/Loader';
import ErrorAlert from '../../components/common/ErrorAlert';

const PatientDashboard = () => {
  const { t } = useTranslation();
  const { data: latestVitals, error: vitalsError, isLoading: vitalsLoading } = useGetLatestPatientVitalsQuery();
  const { data: aiAssessment, error: aiError, isLoading: aiLoading } = useGetAiRiskAssessmentQuery();

  if (vitalsLoading || aiLoading) {
    return <Loader message={t('patientDashboard.loadingDashboard')} />;
  }

  if (vitalsError || aiError) {
    return <ErrorAlert message={t('patientDashboard.errorLoadingDashboard')} />;
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{t('patientDashboard.title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* AI Risk Assessment Card */}
        <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
          <h2 className="text-xl font-bold mb-2">{t('patientDashboard.riskAssessment')}</h2>
          {aiAssessment ? (
            <>
              <p className="text-gray-700 text-lg mb-2">
                {t('patientDashboard.overallRiskLevel')}: 
                <span className={`font-bold ${getRiskColor(aiAssessment.overallRiskLevel)}`}>
                  {aiAssessment.overallRiskLevel}
                </span>
              </p>
              <p className="text-gray-500 text-sm mb-4">{t('patientDashboard.riskAssessmentDate')} {new Date(aiAssessment.lastAssessed).toLocaleDateString()}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiAssessment.risks.map((risk, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-lg mb-1">{t(`patientDashboard.riskType.${risk.type.toLowerCase()}`)}</h3>
                    <p className="text-gray-700 mb-2">
                      {t('patientDashboard.riskLevel')}: 
                      <span className={`font-bold ${getRiskColor(risk.level)}`}>{risk.level}</span>
                    </p>
                    {risk.factors.length > 0 && (
                      <div className="text-sm text-gray-600">
                        <span className="font-semibold">{t('patientDashboard.contributingFactors')}:</span>
                        <ul className="list-disc list-inside ml-4">
                          {risk.factors.map((factor, fIndex) => (
                            <li key={fIndex}>{factor}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-600">{t('patientDashboard.noRiskAssessment')}</p>
          )}
        </div>

        {/* Latest Vitals Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">{t('patientDashboard.latestVitals')}</h2>
          {latestVitals ? (
            <>
              <p className="text-gray-700">{t('logVitalsPage.bloodPressureSystolic')}: {latestVitals.bloodPressureSystolic} mmHg</p>
              <p className="text-gray-700">{t('logVitalsPage.bloodPressureDiastolic')}: {latestVitals.bloodPressureDiastolic} mmHg</p>
              <p className="text-gray-700">{t('logVitalsPage.pulse')}: {latestVitals.pulse} bpm</p>
              <p className="text-gray-700">{t('logVitalsPage.weight')}: {latestVitals.weight} kg</p>
              <p className="text-gray-700">{t('logVitalsPage.howAreYouFeeling')}: {latestVitals.mood}</p>
              <p className="text-gray-500 text-sm mt-2">{t('patientDashboard.lastUpdated')} {new Date(latestVitals.date).toLocaleDateString()}</p>
            </>
          ) : (
            <p className="text-gray-600">{t('patientDashboard.noVitalsRecorded')}</p>
          )}
        </div>

        {/* Recommendation Card */}
        <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-3">
          <h2 className="text-xl font-bold mb-2">{t('patientDashboard.healthRecommendation')}</h2>
          {aiAssessment && aiAssessment.recommendations.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700">
              {aiAssessment.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">{t('patientDashboard.noRecommendations')}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
