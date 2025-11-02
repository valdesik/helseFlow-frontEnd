import React from 'react';
import { useTranslation } from 'react-i18next';

const LogVitalsPage = () => {
  const { t } = useTranslation();

  // Helper function to get emoji for mood
  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case t('logVitalsPage.moodAwful'): return '😩';
      case t('logVitalsPage.moodBad'): return '😟';
      case t('logVitalsPage.moodOkay'): return '😐';
      case t('logVitalsPage.moodGood'): return '🙂';
      case t('logVitalsPage.moodGreat'): return '😄';
      default: return ''
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{t('logVitalsPage.title')}</h1>
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Blood Pressure (Systolic) */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="systolic">
                {t('logVitalsPage.bloodPressureSystolic')}
              </label>
              <input
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="systolic"
                type="number"
                placeholder="e.g., 120"
              />
            </div>

            {/* Blood Pressure (Diastolic) */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="diastolic">
                {t('logVitalsPage.bloodPressureDiastolic')}
              </label>
              <input
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="diastolic"
                type="number"
                placeholder="e.g., 80"
              />
            </div>

            {/* Pulse / Heart Rate */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pulse">
                {t('logVitalsPage.pulse')}
              </label>
              <input
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="pulse"
                type="number"
                placeholder="e.g., 70"
              />
            </div>

            {/* Weight */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
                {t('logVitalsPage.weight')}
              </label>
              <input
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="weight"
                type="number"
                step="0.1"
                placeholder="e.g., 75.5"
              />
            </div>
          </div>

          {/* Mood Tracking */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">{t('logVitalsPage.howAreYouFeeling')}</label>
            <div className="flex justify-around p-2 bg-gray-100 rounded-lg">
              {[t('logVitalsPage.moodAwful'), t('logVitalsPage.moodBad'), t('logVitalsPage.moodOkay'), t('logVitalsPage.moodGood'), t('logVitalsPage.moodGreat')].map(mood => (
                <div key={mood} className="text-center">
                  <input type="radio" name="mood" id={mood} className="sr-only" />
                  <label htmlFor={mood} className="cursor-pointer flex flex-col items-center">
                    <span className="text-3xl">{getMoodEmoji(mood)}</span>
                    <span className="text-xs font-medium text-gray-600">{mood}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105"
              type="button"
            >
              {t('logVitalsPage.saveLog')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogVitalsPage;
