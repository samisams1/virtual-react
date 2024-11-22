import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'; // Import icons

const Footer = () => {
  return (
    <div className="border-t-4 border-gray-900 mt-16 md:mt-0 min-h-[100px] md:ml-[17.5rem] py-8 bg-gray-800 text-white">
      <section className="px-4 md:px-8 text-center">
        <p>Powered by Nile Source | All rights reserved © {new Date().getFullYear()}</p>
        <div className="flex justify-center mt-4 space-x-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <FaGithub size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <FaLinkedin size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <FaTwitter size={24} />
          </a>
        </div>
      </section>
    </div>
  );
}

export default Footer;