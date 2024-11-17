import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFirebaseAuth } from '../../Auth/AuthProvider'; // Assuming you have this    
import { toast } from 'react-toastify'; // Install if not already present

const ServiceDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const { user } = useFirebaseAuth(); // Assuming you have this context

  // This should match your services data structure from Services.jsx

  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('/services.json')
      .then(res => res.json())
      .then(data => setServices(data.services))
      .catch(error => console.error('Error fetching services:', error));
  }, []);

  const service = services.find(s => s.id === parseInt(id));

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    appointmentDate: '',
    address: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const appointment = {
      ...formData,
      serviceId: service.id,
      serviceName: service.name,
      bookingDate: new Date().toISOString()
    };

    // Get existing appointments or initialize empty array
    const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    localStorage.setItem('appointments', JSON.stringify([...existingAppointments, appointment]));

    setIsModalOpen(false);
    toast.success('Appointment booked successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 my-20">
      {service && (
        <div className="grid md:grid-cols-2 gap-8">
          <img src={service.image} alt={service.name} className="rounded-xl w-full h-[400px] object-cover" />
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">{service.name}</h1>
            <p className="text-gray-600 text-lg">{service.description}</p>
            <div className="text-3xl font-bold text-blue-600">{service.cost}</div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              Book Appointment
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="First Name"
                required
                className="w-full p-2 border rounded"
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
              <input
                type="text"
                placeholder="Last Name"
                required
                className="w-full p-2 border rounded"
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                readOnly
                className="w-full p-2 border rounded bg-gray-100"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                className="w-full p-2 border rounded"
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
              <input
                type="date"
                required
                className="w-full p-2 border rounded"
                onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})}
              />
              <textarea
                placeholder="Address"
                required
                className="w-full p-2 border rounded"
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Make Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails; 