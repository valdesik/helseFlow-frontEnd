import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetDoctorsQuery, useAddDoctorMutation, useUpdateDoctorMutation, useDeleteDoctorMutation } from '../../store/api';
import Loader from '../../components/common/Loader';
import ErrorAlert from '../../components/common/ErrorAlert';
import DoctorForm from '../../components/admin/DoctorForm';
import { Doctor } from '../../components/appointments/DoctorCard';

const DoctorManagementPage = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | undefined>(undefined);

  const { data: doctors, error, isLoading } = useGetDoctorsQuery({});
  const [addDoctor, { isLoading: isAdding }] = useAddDoctorMutation();
  const [updateDoctor, { isLoading: isUpdating }] = useUpdateDoctorMutation();
  const [deleteDoctor, { isLoading: isDeleting }] = useDeleteDoctorMutation();

  const handleAddDoctor = (newDoctor: Omit<Doctor, 'id'>) => {
    addDoctor(newDoctor);
    setIsModalOpen(false);
  };

  const handleEditDoctor = (updatedDoctor: Omit<Doctor, 'id'>) => {
    if (editingDoctor) {
      updateDoctor({ ...updatedDoctor, id: editingDoctor.id });
      setIsModalOpen(false);
      setEditingDoctor(undefined);
    }
  };

  const handleDeleteDoctor = (id: string) => {
    if (window.confirm(t('doctorManagementPage.confirmDelete')))
      deleteDoctor(id);
  };

  const openAddModal = () => {
    setEditingDoctor(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{t('doctorManagementPage.title')}</h1>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="mb-4 flex justify-between items-center">
          <input 
            type="text" 
            placeholder={t('doctorManagementPage.searchPlaceholder')} 
            className="flex-grow shadow-sm appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-1/3"
          />
          <button 
            onClick={openAddModal}
            className="ml-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            {t('doctorManagementPage.addNewDoctor')}
          </button>
        </div>

        {isLoading && <Loader message={t('doctorManagementPage.loadingDoctors')} />}
        {error && <ErrorAlert message={t('doctorManagementPage.failedToLoadDoctors')} />}
        {doctors && doctors.length === 0 && !isLoading && <p className="text-center text-gray-600">{t('doctorManagementPage.noDoctorsFound')}</p>}
        {doctors && doctors.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('doctorManagementPage.table.name')}</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('doctorManagementPage.table.specialty')}</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('doctorManagementPage.table.location')}</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">{t('doctorManagementPage.table.actions')}</span></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {doctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doctor.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doctor.specialty}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doctor.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => openEditModal(doctor)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        {t('doctorManagementPage.table.edit')}
                      </button>
                      <button 
                        onClick={() => handleDeleteDoctor(doctor.id)}
                        className="text-red-600 hover:text-red-900"
                        disabled={isDeleting}
                      >
                        {t('doctorManagementPage.table.delete')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Add/Edit Doctor */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
          <div className="relative p-8 bg-white w-full max-w-md mx-auto rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {editingDoctor ? t('doctorManagementPage.editDoctor') : t('doctorManagementPage.addDoctor')}
            </h2>
            <DoctorForm
              initialData={editingDoctor}
              onSubmit={editingDoctor ? handleEditDoctor : handleAddDoctor}
              onCancel={() => setIsModalOpen(false)}
              isSubmitting={isAdding || isUpdating}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorManagementPage;
