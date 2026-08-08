
import React from 'react';
import { Mail, Linkedin, Phone } from 'lucide-react';

const ContactInfo = () => {
  return (
    <section id="contact-info" className="bg-black text-white relative py-[15px] md:py-[25px]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-block mb-3 px-3 py-1 bg-[#cf4500] text-white rounded-full text-sm font-medium">
            Get In Touch
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Contact Us Today
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Have questions about our computer vision solutions? Reach out to our team and let's discuss how we can help automate your visual processes.
          </p>
        </div>

        {/* Contact Info Cards - Commented out for now */}
        {/*
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-gray-700">
            <div className="flex flex-col items-center text-center">
              <img 
                src="/user-imgs/wajih.jpg"
                alt="Wajih"
                className="w-32 h-32 rounded-full mb-4 object-cover filter grayscale"
              />
              <h3 className="text-xl font-bold text-gray-900">AIROTIX Team</h3>
              <p className="text-gray-600 mb-4">Computer Vision Specialists</p>
              <div className="flex flex-col space-y-3">
                <a href="mailto:airotix@gmail.com" className="flex items-center text-gray-700 hover:text-blue-600">
                  <Mail className="w-5 h-5 mr-2" />
                  airotix@gmail.com
                </a>
                <a 
                  href="https://www.linkedin.com/company/airotix/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-700 hover:text-blue-600"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  AIROTIX LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-gray-700">
            <div className="flex flex-col items-center text-center">
              <img 
                src="/user-imgs/umaircha.jpg"
                alt="Umair"
                className="w-32 h-32 rounded-full mb-4 object-cover filter grayscale"
              />
              <h3 className="text-xl font-bold text-gray-900">Contact Sales</h3>
              <p className="text-gray-600 mb-4">Business Development</p>
              <div className="flex flex-col space-y-3">
                <a href="mailto:airotix@gmail.com" className="flex items-center text-gray-700 hover:text-blue-600">
                  <Mail className="w-5 h-5 mr-2" />
                  airotix@gmail.com
                </a>
                <a href="tel:+923000087377" className="flex items-center text-gray-700 hover:text-blue-600">
                  <Phone className="w-5 h-5 mr-2" />
                  +923000087377
                </a>
              </div>
            </div>
          </div>
        </div>
        */}
      </div>
    </section>
  );
};

export default ContactInfo;
