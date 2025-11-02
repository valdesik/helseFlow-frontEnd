import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  imageUrl: string;
}

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:w-48" src={doctor.imageUrl} alt={`Dr. ${doctor.name}`} />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{doctor.specialty}</div>
          <h2 className="block mt-1 text-lg leading-tight font-medium text-black">Dr. {doctor.name}</h2>
          <p className="mt-2 text-gray-500">{doctor.location}</p>
          <Link 
            to={`/doctor/${doctor.id}`}
            className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            {t('findDoctorPage.viewProfileAndBook')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
