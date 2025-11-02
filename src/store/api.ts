import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Doctor } from '../components/appointments/DoctorCard';

// --- Mock Data ---

// Define VitalLog interface and mockVitalLogs first
interface VitalLog {
  id: string;
  date: string; // ISO string
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  pulse: number;
  weight: number;
  mood: string;
}

const mockVitalLogs: VitalLog[] = [
  { id: 'v1', date: '2023-10-01T00:00:00Z', bloodPressureSystolic: 120, bloodPressureDiastolic: 80, pulse: 72, weight: 75.0, mood: 'Good' },
  { id: 'v2', date: '2023-10-02T00:00:00Z', bloodPressureSystolic: 122, bloodPressureDiastolic: 81, pulse: 73, weight: 75.1, mood: 'Okay' },
  { id: 'v3', date: '2023-10-03T00:00:00Z', bloodPressureSystolic: 125, bloodPressureDiastolic: 83, pulse: 75, weight: 75.3, mood: 'Bad' },
  { id: 'v4', date: '2023-10-04T00:00:00Z', bloodPressureSystolic: 121, bloodPressureDiastolic: 79, pulse: 71, weight: 75.2, mood: 'Good' },
  { id: 'v5', date: '2023-10-05T00:00:00Z', bloodPressureSystolic: 123, bloodPressureDiastolic: 82, pulse: 74, weight: 75.4, mood: 'Great' },
  { id: 'v6', date: '2023-10-06T00:00:00Z', bloodPressureSystolic: 128, bloodPressureDiastolic: 85, pulse: 78, weight: 75.6, mood: 'Awful' },
  { id: 'v7', date: '2023-10-07T00:00:00Z', bloodPressureSystolic: 124, bloodPressureDiastolic: 80, pulse: 73, weight: 75.5, mood: 'Okay' },
  { id: 'v8', date: '2023-10-08T00:00:00Z', bloodPressureSystolic: 126, bloodPressureDiastolic: 84, pulse: 76, weight: 75.7, mood: 'Bad' },
  { id: 'v9', date: '2023-10-09T00:00:00Z', bloodPressureSystolic: 120, bloodPressureDiastolic: 78, pulse: 70, weight: 75.6, mood: 'Good' },
  { id: 'v10', date: '2023-10-10T00:00:00Z', bloodPressureSystolic: 122, bloodPressureDiastolic: 80, pulse: 72, weight: 75.8, mood: 'Great' },
];

// Define Patient interface and mockPatients after VitalLog and mockVitalLogs
interface Patient {
  id: string;
  name: string;
  email: string;
  age: number;
  region: string;
  riskFactors: string[];
  vitals?: VitalLog[];
  appointments?: Appointment[]; // Use Appointment interface
}

const mockPatients: Patient[] = [
  { id: 'p1', name: 'Anna Nilsen', email: 'anna.nilsen@example.com', age: 45, region: 'Oslo', riskFactors: ['None'], vitals: mockVitalLogs, appointments: [] },
  { id: 'p2', name: 'Bjorn Hansen', email: 'bjorn.hansen@example.com', age: 62, region: 'Bergen', riskFactors: ['High Blood Pressure'], vitals: [], appointments: [] },
  { id: 'p3', name: 'Cecilie Olsen', email: 'cecilie.olsen@example.com', age: 31, region: 'Trondheim', riskFactors: ['Asthma'], vitals: [], appointments: [] },
  { id: 'p4', name: 'David Jensen', email: 'david.jensen@example.com', age: 58, region: 'Stavanger', riskFactors: ['Diabetes'], vitals: [], appointments: [] },
];

let currentMockDoctors = [
  { id: '1', name: 'Ivar Finnes', specialty: 'Cardiology', location: 'Oslo University Hospital', imageUrl: 'https://via.placeholder.com/150/0000FF/808080?Text=Dr.Finnes' },
  { id: '2', name: 'Solveig Larsen', specialty: 'General Practice', location: 'Bergen Medical Center', imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?Text=Dr.Larsen' },
  { id: '3', name: 'Harald Johansen', specialty: 'Neurology', location: 'Trondheim Health Clinic', imageUrl: 'https://via.placeholder.com/150/00FF00/000000?Text=Dr.Johansen' }
];

interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  appointmentTime: string; // ISO string
  reason: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed';
}

const mockAppointments: Appointment[] = [
  { id: 'appt1', doctorId: '1', doctorName: 'Dr. Ivar Finnes', specialty: 'Cardiology', appointmentTime: '2023-11-20T10:00:00Z', reason: 'Routine check-up', status: 'Confirmed' },
  { id: 'appt2', doctorId: '2', doctorName: 'Dr. Solveig Larsen', specialty: 'General Practice', appointmentTime: '2023-11-10T14:30:00Z', reason: 'Follow-up', status: 'Completed' },
  { id: 'appt3', doctorId: '1', doctorName: 'Dr. Ivar Finnes', specialty: 'Cardiology', appointmentTime: '2023-12-05T09:00:00Z', reason: 'Consultation', status: 'Pending' },
];

interface Notification {
  id: string;
  type: 'appointment' | 'alert' | 'recommendation' | 'system';
  message: string;
  date: string; // ISO string
  read: boolean;
  link?: string;
}

const mockNotifications: Notification[] = [
  { id: 'notif1', type: 'appointment', message: 'Your appointment with Dr. Finnes is confirmed for Nov 20, 10:00 AM.', date: '2023-11-18T09:00:00Z', read: false, link: '/my-appointments' },
  { id: 'notif2', type: 'alert', message: 'Your blood pressure readings are consistently high. Consider logging more vitals.', date: '2023-11-17T14:30:00Z', read: false, link: '/log-vitals' },
  { id: 'notif3', type: 'recommendation', message: 'New recommendations available based on your latest AI assessment.', date: '2023-11-16T11:00:00Z', read: true, link: '/' },
  { id: 'notif4', type: 'system', message: 'Welcome to HelseFlow! Explore your new dashboard.', date: '2023-11-15T08:00:00Z', read: true, link: '/' },
];

// --- Type Definitions ---
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: { name: string; role: string };
}

interface BookAppointmentRequest {
  doctorId: string;
  appointmentTime: string;
  reason: string;
}

interface BookAppointmentResponse {
  id: string;
  doctorId: string;
  appointmentTime: string;
  reason: string;
  status: string;
}

interface GetDoctorsParams {
  search?: string;
  specialty?: string;
}

interface GetPatientsParams {
  search?: string;
  region?: string;
  ageMin?: number;
  ageMax?: number;
}

interface RiskDetail {
  type: string; // e.g., 'Hypertension', 'Diabetes', 'Obesity'
  level: 'Low' | 'Medium' | 'High';
  factors: string[]; // e.g., 'High Blood Pressure', 'Family History', 'Sedentary Lifestyle'
}

interface AiRiskAssessment {
  overallRiskLevel: 'Low' | 'Medium' | 'High';
  risks: RiskDetail[];
  recommendations: string[];
  lastAssessed: string; // ISO string
}

// --- API Slice Definition ---
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Doctors', 'Patients', 'Notifications'], // Add Notifications tag
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      queryFn: (credentials) => {
        return new Promise(resolve => {
          setTimeout(() => {
            if (credentials.email === 'patient@helseflow.com' && credentials.password === 'password') {
              resolve({ data: { token: 'mock-jwt-token', user: { name: 'Test Patient', role: 'patient' } } });
            } else if (credentials.email === 'admin@helseflow.com' && credentials.password === 'password') {
              resolve({ data: { token: 'mock-jwt-token-admin', user: { name: 'Admin User', role: 'admin' } } });
            } else {
              resolve({ error: { status: 401, data: 'Invalid credentials' } });
            }
          }, 1000);
        });
      },
    }),

    getDoctors: builder.query<Doctor[], GetDoctorsParams>({
      queryFn: (params) => {
        let filteredDoctors = currentMockDoctors;
        if (params.search) {
          filteredDoctors = filteredDoctors.filter(doc => 
            doc.name.toLowerCase().includes(params.search!.toLowerCase())
          );
        }
        if (params.specialty && params.specialty !== 'All Specialties') {
          filteredDoctors = filteredDoctors.filter(doc => doc.specialty === params.specialty);
        }
        return new Promise(resolve => setTimeout(() => resolve({ data: filteredDoctors }), 500));
      },
      providesTags: ['Doctors'], // Tag this query for caching
    }),

    getDoctorById: builder.query<Doctor, string>({
      queryFn: (id) => {
        const doctor = currentMockDoctors.find(d => d.id === id);
        return doctor ? { data: doctor } : { error: { status: 404, data: 'Doctor not found' } };
      }
    }),

    addDoctor: builder.mutation<Doctor, Omit<Doctor, 'id'>>({
      queryFn: (newDoctor) => {
        return new Promise(resolve => {
          setTimeout(() => {
            const id = (currentMockDoctors.length + 1).toString();
            const doctorWithId = { ...newDoctor, id };
            currentMockDoctors.push(doctorWithId);
            resolve({ data: doctorWithId });
          }, 500);
        });
      },
      invalidatesTags: ['Doctors'], // Invalidate 'Doctors' tag to refetch list
    }),

    updateDoctor: builder.mutation<Doctor, Partial<Doctor> & { id: string }>({
      queryFn: (updatedDoctor) => {
        return new Promise(resolve => {
          setTimeout(() => {
            const index = currentMockDoctors.findIndex(doc => doc.id === updatedDoctor.id);
            if (index !== -1) {
              currentMockDoctors[index] = { ...currentMockDoctors[index], ...updatedDoctor };
              resolve({ data: currentMockDoctors[index] });
            } else {
              resolve({ error: { status: 404, data: 'Doctor not found' } });
            }
          }, 500);
        });
      },
      invalidatesTags: ['Doctors'],
    }),

    deleteDoctor: builder.mutation<void, string>({
      queryFn: (id) => {
        return new Promise(resolve => {
          setTimeout(() => {
            const initialLength = currentMockDoctors.length;
            currentMockDoctors = currentMockDoctors.filter(doc => doc.id !== id);
            if (currentMockDoctors.length < initialLength) {
              resolve({ data: undefined });
            } else {
              resolve({ error: { status: 404, data: 'Doctor not found' } });
            }
          }, 500);
        });
      },
      invalidatesTags: ['Doctors'],
    }),

    bookAppointment: builder.mutation<BookAppointmentResponse, BookAppointmentRequest>({
      queryFn: (appointmentDetails) => {
        return new Promise(resolve => {
          setTimeout(() => {
            // Simulate successful booking
            const newAppointment: Appointment = {
              id: `appt-${Date.now()}`,
              doctorId: appointmentDetails.doctorId,
              doctorName: currentMockDoctors.find(d => d.id === appointmentDetails.doctorId)?.name || 'Unknown Doctor',
              specialty: currentMockDoctors.find(d => d.id === appointmentDetails.doctorId)?.specialty || 'Unknown',
              appointmentTime: appointmentDetails.appointmentTime,
              reason: appointmentDetails.reason,
              status: 'Confirmed',
            };
            mockAppointments.push(newAppointment); // Add to mock data
            resolve({
              data: {
                id: newAppointment.id,
                doctorId: newAppointment.doctorId,
                appointmentTime: newAppointment.appointmentTime,
                reason: newAppointment.reason,
                status: newAppointment.status,
              }
            });
          }, 1000);
        });
      },
      invalidatesTags: ['Notifications'], // Invalidate notifications to show new appointment
    }),

    getPatientVitals: builder.query<VitalLog[], void>({
      queryFn: () => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({ data: mockVitalLogs });
          }, 500);
        });
      },
    }),

    getPatientById: builder.query<Patient, string>({
      queryFn: (id) => {
        return new Promise(resolve => {
          setTimeout(() => {
            const patient = mockPatients.find(p => p.id === id);
            if (patient) {
              resolve({ data: patient });
            } else {
              resolve({ error: { status: 404, data: 'Patient not found' } });
            }
          }, 500);
        });
      },
    }),

    getPatients: builder.query<Patient[], GetPatientsParams>({
      queryFn: (params) => {
        let filteredPatients = mockPatients;
        if (params.search) {
          filteredPatients = filteredPatients.filter(patient => 
            patient.name.toLowerCase().includes(params.search!.toLowerCase()) ||
            patient.email.toLowerCase().includes(params.search!.toLowerCase())
          );
        }
        if (params.region && params.region !== 'All Regions') {
          filteredPatients = filteredPatients.filter(patient => patient.region === params.region);
        }
        if (params.ageMin) {
          filteredPatients = filteredPatients.filter(patient => patient.age >= params.ageMin!);
        }
        if (params.ageMax) {
          filteredPatients = filteredPatients.filter(patient => patient.age <= params.ageMax!);
        }
        return new Promise(resolve => setTimeout(() => resolve({ data: filteredPatients }), 500));
      },
    }),

    getLatestPatientVitals: builder.query<VitalLog | null, void>({
      queryFn: () => {
        return new Promise(resolve => {
          setTimeout(() => {
            // For the mock, just return the last vital log from mockVitalLogs
            const latestVital = mockVitalLogs.length > 0 ? mockVitalLogs[mockVitalLogs.length - 1] : null;
            resolve({ data: latestVital });
          }, 500);
        });
      },
    }),

    getMyAppointments: builder.query<Appointment[], void>({
      queryFn: () => {
        return new Promise(resolve => {
          setTimeout(() => {
            // In a real app, this would filter by the logged-in user's ID
            resolve({ data: mockAppointments });
          }, 500);
        });
      },
    }),

    getAiRiskAssessment: builder.query<AiRiskAssessment, void>({
      queryFn: () => {
        return new Promise(resolve => {
          setTimeout(() => {
            const riskLevels = ['Low', 'Medium', 'High'];
            const riskTypes = ['Hypertension', 'Diabetes', 'Obesity'];
            const factors = [
              'High Blood Pressure', 'Family History', 'Sedentary Lifestyle',
              'High Sugar Intake', 'Lack of Exercise', 'Stress', 'Smoking'
            ];

            const risks: RiskDetail[] = riskTypes.map(type => ({
              type,
              level: riskLevels[Math.floor(Math.random() * riskLevels.length)] as RiskDetail['level'],
              factors: factors.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1)
            }));

            const overallRisk = risks.some(r => r.level === 'High') ? 'High' : risks.some(r => r.level === 'Medium') ? 'Medium' : 'Low';

            const recommendations = [
              'Maintain a healthy diet and regular exercise.',
              'Consider reducing salt intake.',
              'Consult your doctor for a personalized health plan.',
              'Monitor your blood pressure regularly.',
              'Reduce sugar consumption.',
              'Increase physical activity.'
            ];
            const randomRecommendations = recommendations.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1);

            resolve({
              data: {
                overallRiskLevel: overallRisk,
                risks,
                recommendations: randomRecommendations,
                lastAssessed: new Date().toISOString(),
              }
            });
          }, 1500); // Simulate a longer AI processing time
        });
      },
    }),

    getNotifications: builder.query<Notification[], void>({
      queryFn: () => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({ data: mockNotifications });
          }, 700);
        });
      },
      providesTags: ['Notifications'],
    }),

    markNotificationAsRead: builder.mutation<void, string>({
      queryFn: (id) => {
        return new Promise(resolve => {
          setTimeout(() => {
            const notification = mockNotifications.find(n => n.id === id);
            if (notification) {
              notification.read = true;
              resolve({ data: undefined });
            } else {
              resolve({ error: { status: 404, data: 'Notification not found' } });
            }
          }, 300);
        });
      },
      invalidatesTags: ['Notifications'],
    }),
  }),
});

export const { 
  useLoginMutation, 
  useGetDoctorsQuery, 
  useGetDoctorByIdQuery, 
  useAddDoctorMutation, 
  useUpdateDoctorMutation, 
  useDeleteDoctorMutation, 
  useBookAppointmentMutation, 
  useGetPatientVitalsQuery, 
  useGetPatientByIdQuery, 
  useGetPatientsQuery, 
  useGetLatestPatientVitalsQuery, 
  useGetMyAppointmentsQuery, 
  useGetAiRiskAssessmentQuery, 
  useGetNotificationsQuery, 
  useMarkNotificationAsReadMutation 
} = api;
