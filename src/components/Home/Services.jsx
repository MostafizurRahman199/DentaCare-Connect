import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('/services.json')
      .then(res => res.json())
      .then(data => setServices(data.services))
      .catch(error => console.error('Error fetching services:', error));
  }, []);

  return (
    <section id="services" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 leading-tight">
            Our Services
          </h2>
          <p className="text-center text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Discover our range of professional dental services designed to keep your smile healthy and beautiful.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
          {services.slice(0, 4).map((service) => (
            <div 
              key={service.id} 
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out"
            >
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-56 md:h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-gray-800">{service.name}</h3>
                <p className="text-gray-600">
                  {service.description.slice(0, 100)}...
                </p>
                <div className="flex justify-between items-center pt-4">
                  <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                    {service.cost}
                  </span>
                  <Link 
                    to={`/services/${service.id}`}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full font-semibold hover:from-blue-700 hover:to-blue-500 transform hover:scale-105 transition-all duration-300"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <NavLink 
            to="/treatments"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full font-semibold hover:from-blue-700 hover:to-blue-500 transform hover:scale-105 transition-all duration-300"
          >
            See More Services
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Services;