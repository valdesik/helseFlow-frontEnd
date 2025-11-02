import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Doctor } from '../appointments/DoctorCard';

interface DoctorFormProps {
  initialData?: Doctor; // Optional: for editing existing doctor
  onSubmit: (doctor: Omit<Doctor, 'id'>) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const DoctorForm: React.FC<DoctorFormProps> = ({ initialData, onSubmit, onCancel, isSubmitting }) => {
  const { t } = useTranslation();
  const [name, setName] = useState(initialData?.name || '');
  const [specialty, setSpecialty] = useState(initialData?.specialty || 'General Practice');
  const [location, setLocation] = useState(initialData?.location || '');
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || 'https://via.placeholder.com/150');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setSpecialty(initialData.specialty);
      setLocation(initialData.location);
      setImageUrl(initialData.imageUrl);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, specialty, location, imageUrl });
  };

  const availableSpecialties = ['General Practice', 'Cardiology', 'Neurology', 'Pediatrics', 'Dermatology'];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('doctorManagementPage.form.name')}</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">{t('doctorManagementPage.form.specialty')}</label>
        <select
          id="specialty"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          {availableSpecialties.map(spec => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">{t('doctorManagementPage.form.location')}</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">{t('doctorManagementPage.form.imageUrl')}</label>
        <input
          type="text"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={isSubmitting}
        >
          {t('common.cancel')}
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? t('common.saving') : t('common.save')}
        </button>
      </div>
    </form>
  );
};

export default DoctorForm;
