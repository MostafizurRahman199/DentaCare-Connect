import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFirebaseAuth } from '../../Auth/AuthProvider'; // Assuming you have this    
import { toast } from 'react-toastify'; // Install if not already present
import { saveAppointment } from '../../utils/LocalStorage';

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
    email: '',
    phone: '',
    appointmentDate: '',
    address: ''
  });

  useEffect(() => {
    if (user?.email) {
      setFormData(prev => ({
        ...prev,
        email: user.email
      }));
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const appointment = {
      id: Date.now(),
      ...formData,
      serviceId: service.id,
      serviceName: service.name,
      serviceImage: service.image,
      bookingDate: new Date().toISOString()
    };

    saveAppointment(appointment);

    setIsModalOpen(false);
    toast.success('Appointment booked successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 my-20">
      {service && (
        <div className="grid md:grid-cols-2 gap-12">
          <img src={service.image} alt={service.name} className="rounded-2xl w-full h-[500px] object-cover shadow-lg" />
          <div className="space-y-8">
            <h1 className="text-5xl font-bold text-gray-800">{service.name}</h1>
            <p className="text-gray-600 text-xl leading-relaxed">{service.description}</p>
            <div className="text-4xl font-bold text-emerald-600">{service.cost}</div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Book Appointment
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-3xl font-bold mb-6">Book Appointment</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
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
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg"
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