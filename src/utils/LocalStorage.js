// Get all appointments
export const getAppointments = () => {
  const appointments = localStorage.getItem('appointments');
  return appointments ? JSON.parse(appointments) : [];
};

// Save appointment
export const saveAppointment = (appointment) => {
  const appointments = getAppointments();
  localStorage.setItem('appointments', JSON.stringify([...appointments, appointment]));
  // Dispatch storage event to notify other components
  window.dispatchEvent(new Event('storage'));
};

// Get user appointments
export const getUserAppointments = (userEmail) => {
  const appointments = getAppointments();
  return appointments.filter(appointment => 
    // Match if either the emails match or both are empty
    appointment.email === userEmail || (!appointment.email && !userEmail)
  );
};

// Cancel appointment
export const cancelAppointment = (appointmentId, userEmail) => {
  const appointments = getAppointments();
  const updatedAppointments = appointments.filter(
    appointment => !(appointment.id === appointmentId && appointment.email === userEmail)
  );
  localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  // Dispatch storage event to notify other components
  window.dispatchEvent(new Event('storage'));
  return updatedAppointments;
}; 