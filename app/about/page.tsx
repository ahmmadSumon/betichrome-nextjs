import React from 'react';

const ShopInfo = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-lg mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Our Shop!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Address:</h3>
              <p className="text-gray-600">123 Main St, City, Country</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Contact:</h3>
              <p className="text-gray-600">Phone: +1234567890</p>
              <p className="text-gray-600">Email: example@example.com</p>
            </div>
            <div className="col-span-2">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">About Us:</h3>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla rutrum dolor sit amet lacus ullamcorper, at bibendum arcu sodales.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopInfo;
