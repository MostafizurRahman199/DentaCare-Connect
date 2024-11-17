import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-12 px-4 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Teeth Wizard</h3>
            <p className="text-gray-600 leading-relaxed">
              A simple and easy-to-use platform for booking dental treatments with qualified professionals.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              <Link to="/appointments" className="text-gray-600 hover:text-blue-600 transition-colors">
                Book Appointment
              </Link>
              <Link to="/services" className="text-gray-600 hover:text-blue-600 transition-colors">
                Our Services
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                About Us
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Contact</h4>
            <div className="space-y-2 text-gray-600">
              <p>Email: contact@teethwizard.com</p>
              <p>Phone: (555) 123-4567</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} DentaCare-Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer