import React from 'react';
import { useTranslation } from 'react-i18next';

interface Guideline {
  id: string;
  title: string;
  category: string;
  summary: string;
  link: string;
}

const mockGuidelines: Guideline[] = [
  {
    id: 'g1',
    title: 'National guidelines for diabetes management',
    category: 'Endocrinology',
    summary: 'Comprehensive recommendations for the diagnosis, treatment, and follow-up of diabetes.',
    link: 'https://www.helsedirektoratet.no/retningslinjer/diabetes'
  },
  {
    id: 'g2',
    title: 'Guidelines for hypertension treatment',
    category: 'Cardiology',
    summary: 'Recommendations for blood pressure control and lifestyle interventions.',
    link: 'https://www.helsedirektoratet.no/retningslinjer/hypertensjon'
  },
  {
    id: 'g3',
    title: 'Childhood vaccination program',
    category: 'Pediatrics',
    summary: 'Overview of the national vaccination schedule for children.',
    link: 'https://www.fhi.no/sv/vaksine/barnevaksinasjonsprogrammet/'
  },
];

const GuidelinesPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{t('guidelinesPage.title')}</h1>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="mb-4 flex justify-between items-center">
          <input 
            type="text" 
            placeholder={t('guidelinesPage.searchPlaceholder')} 
            className="flex-grow shadow-sm appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-1/3"
          />
          <select className="ml-4 shadow-sm border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>{t('guidelinesPage.allCategories')}</option>
            <option>Endocrinology</option>
            <option>Cardiology</option>
            <option>Pediatrics</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockGuidelines.map((guideline) => (
            <div key={guideline.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{guideline.title}</h3>
              <p className="text-sm text-indigo-600 mb-2">{guideline.category}</p>
              <p className="text-gray-700 text-sm mb-3">{guideline.summary}</p>
              <a 
                href={guideline.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                {t('guidelinesPage.readMore')}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuidelinesPage;
