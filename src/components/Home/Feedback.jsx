import React from 'react'

const Feedback = () => {
  const feedbackData = [
    {
      id: 1,
      image: 'https://i.pravatar.cc/150?img=1',
      feedback: "The teeth whitening treatment exceeded my expectations! Dr. Sarah was thorough in explaining the procedure and the results are amazing.",
      date: "2024-03-15",
      rating: 5
    },
    {
      id: 2,
      image: 'https://i.pravatar.cc/150?img=2',
      feedback: "I was nervous about my root canal, but the entire team made me feel comfortable. The procedure was much smoother than I expected.",
      date: "2024-03-10",
      rating: 5
    },
    {
      id: 3,
      image: 'https://i.pravatar.cc/150?img=3',
      feedback: "The online booking system is so convenient! I got my regular cleaning done with minimal wait time. Very professional service.",
      date: "2024-03-08",
      rating: 4
    },
    {
      id: 4,
      image: 'https://i.pravatar.cc/150?img=4',
      feedback: "My kids love coming here! The pediatric dentist is amazing with children, making their dental visits stress-free and fun.",
      date: "2024-03-01",
      rating: 5
    }
  ];

  return (
    <div className="feedback-section py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-2">
          <span className="text-blue-600 font-medium tracking-wider uppercase text-sm">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            What Our Patients Say
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {feedbackData.map((item) => (
            <div 
              key={item.id} 
              className="group bg-white rounded-2xl p-6 hover:bg-gradient-to-b hover:from-blue-50 hover:to-white
                        transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl shadow-lg
                        border border-gray-100"
            >
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full opacity-10 
                              group-hover:opacity-20 transition-opacity duration-300"></div>
                <img 
                  src={item.image} 
                  alt="Patient" 
                  className="w-20 h-20 rounded-full mx-auto ring-4 ring-white object-cover
                           group-hover:ring-blue-50 transition-all duration-300"
                />
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center space-x-1 bg-white px-4 py-1 rounded-full shadow-md">
                    {[...Array(5)].map((_, index) => (
                      <span 
                        key={index} 
                        className={`text-sm transition-colors duration-300 ${
                          index < item.rating 
                            ? 'text-yellow-400 group-hover:text-yellow-500' 
                            : 'text-gray-200'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <blockquote className="relative">
                <span className="absolute -top-4 left-0 text-6xl text-blue-200 opacity-40">"</span>
                <p className="text-gray-600 text-center text-base leading-relaxed mb-4 relative z-10">
                  {item.feedback}
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <span className="w-8 h-[1px] bg-gray-300"></span>
                  <p className="text-gray-400 font-medium">
                    {new Date(item.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                  <span className="w-8 h-[1px] bg-gray-300"></span>
                </div>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedback