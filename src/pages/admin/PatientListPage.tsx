import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useGetPatientsQuery } from '../../store/api';
import Loader from '../../components/common/Loader';
import ErrorAlert from '../../components/common/ErrorAlert';

const PatientListPage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions');
  const [ageMin, setAgeMin] = useState<string>('');
  const [ageMax, setAgeMax] = useState<string>('');

  const { data: patients, error, isLoading } = useGetPatientsQuery({
    search: searchTerm,
    region: selectedRegion === 'All Regions' ? undefined : selectedRegion,
    ageMin: ageMin ? parseInt(ageMin) : undefined,
    ageMax: ageMax ? parseInt(ageMax) : undefined,
  });

  const availableRegions = ['All Regions', 'Oslo', 'Bergen', 'Trondheim', 'Stavanger'];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{t('patientListPage.title')}</h1>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="mb-4 flex flex-col md:flex-row gap-4 items-center">
          <input 
            type="text" 
            placeholder={t('patientListPage.searchPlaceholder')} 
            className="flex-grow shadow-sm appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className="shadow-sm border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            {availableRegions.map(region => (
              <option key={region} value={region}>{t(`patientListPage.${region.replace(/\s/g, '')}`)}</option>
            ))}
          </select>
          <input 
            type="number" 
            placeholder={t('patientListPage.minAge')} 
            className="shadow-sm appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"
            value={ageMin}
            onChange={(e) => setAgeMin(e.target.value)}
          />
          <input 
            type="number" 
            placeholder={t('patientListPage.maxAge')} 
            className="shadow-sm appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"
            value={ageMax}
            onChange={(e) => setAgeMax(e.target.value)}
          />
          <button className="ml-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
            {t('patientListPage.addNewPatient')}
          </button>
        </div>

        {/* Patient List */}
        {isLoading && <Loader message={t('patientListPage.loadingPatients')} />}
        {error && <ErrorAlert message={t('patientListPage.failedToLoadPatients')} />}
        {patients && patients.length === 0 && !isLoading && <p className="text-center text-gray-600">{t('patientListPage.noPatientsFound')}</p>}
        {patients && patients.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('patientListPage.name')}</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('patientListPage.email')}</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('patientListPage.age')}</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('patientListPage.region')}</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">{t('patientListPage.actions')}</span></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {patients.map((patient) => (
                  <tr key={patient.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{patient.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.age}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.region}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/admin/patients/${patient.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">{t('patientListPage.view')}</Link>
                      <a href="#" className="text-red-600 hover:text-red-900">{t('patientListPage.delete')}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientListPage;
