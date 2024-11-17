import React, { useEffect, useState } from 'react';
import { useFirebaseAuth } from '../../Auth/AuthProvider';
import { getUserAppointments, cancelAppointment } from '../../utils/LocalStorage';
import { toast } from 'react-toastify';

const MyAppointments = () => {
  const { user } = useFirebaseAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const loadAppointments = () => {
      const userAppointments = getUserAppointments(user?.email || '');
      setAppointments(userAppointments);
    };

    loadAppointments();
    window.addEventListener('storage', loadAppointments);
    
    return () => {
      window.removeEventListener('storage', loadAppointments);
    };
  }, [user]);

  const handleCancelAppointment = (appointmentId) => {
    if (user?.email) {
      cancelAppointment(appointmentId, user.email);
      const updatedAppointments = getUserAppointments(user.email);
      setAppointments(updatedAppointments);
      toast.success('Appointment cancelled successfully!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 my-20">
      <h1 className="text-3xl font-bold mb-8">My Appointments</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="border rounded-xl p-4 shadow-sm">
            <img
              src={appointment.serviceImage}
              alt={appointment.serviceName}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{appointment.serviceName}</h2>
            <p className="text-gray-600 mb-2">
              Date: {new Date(appointment.appointmentDate).toLocaleDateString()}
            </p>
            <button
              onClick={() => handleCancelAppointment(appointment.id)}
              className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Cancel Appointment
            </button>
          </div>
        ))}
        {appointments.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">
            You have no appointments scheduled.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyAppointments; 