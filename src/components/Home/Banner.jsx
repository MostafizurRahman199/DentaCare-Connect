import React from 'react'

const Banner = () => {
  return (
    <div className="relative min-h-[80vh] flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 py-12 sm:py-16 max-w-7xl mx-auto my-12">
      {/* Left content - enhanced with gradient background and improved typography */}
      <div className="flex-1 space-y-6 md:space-y-8 z-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
          Transform Your Smile <span className="text-blue-600">With Expert Care</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl">
          Experience world-class dental care with our team of professionals. Your journey to a perfect smile begins with just one click.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
            Book Appointment
          </button>
          <button 
            onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transform hover:scale-105 transition-all duration-300"
          >
            View Services
          </button>
        </div>
      </div>

      {/* Right content - modernized image presentation */}
      <div className="flex-1 mt-12 md:mt-0 relative">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-100 rounded-full filter blur-3xl opacity-70"></div>
        <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-purple-100 rounded-full filter blur-3xl opacity-70"></div>
        <img 
          src="https://www.phcx.org/site/wp-content/uploads/2018/02/The-Importance-of-Dental-Care-to-Overall-Wellness.jpg"
          alt="Dental Care Excellence"
          className="relative w-full max-w-lg mx-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500"
        />
      </div>
    </div>
  )
}

export default Banner