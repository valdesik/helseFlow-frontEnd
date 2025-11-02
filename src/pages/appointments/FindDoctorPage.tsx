import React, { useState } from 'react';
import DoctorCard from '../../components/appointments/DoctorCard';
import { useGetDoctorsQuery } from '../../store/api';
import { useTranslation } from 'react-i18next';
import Loader from '../../components/common/Loader';
import ErrorAlert from '../../components/common/ErrorAlert';

const FindDoctorPage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All Specialties');

  const { data: doctors, error, isLoading } = useGetDoctorsQuery({
    search: searchTerm,
    specialty: selectedSpecialty === 'All Specialties' ? undefined : selectedSpecialty,
  });

  const availableSpecialties = ['All Specialties', 'Cardiology', 'General Practice', 'Neurology'];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{t('findDoctorPage.title')}</h1>
      
      {/* Search and Filter Section */}
      <div className="mb-8 p-4 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder={t('findDoctorPage.searchPlaceholder')} 
            className="flex-grow shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className="shadow-sm border rounded-lg w-full md:w-auto py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            {availableSpecialties.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Doctor List */}
      {isLoading && <Loader message={t('findDoctorPage.loadingDoctors')} />}
      {error && <ErrorAlert message={t('findDoctorPage.failedToLoadDoctors')} />}
      {doctors && doctors.length === 0 && !isLoading && <p className="text-center text-gray-600">{t('findDoctorPage.noDoctorsFound')}</p>}
      {doctors && doctors.length > 0 && (
        <div className="grid grid-cols-1 gap-8">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FindDoctorPage;
