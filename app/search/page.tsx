'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SearchResults() {
  const searchParams = useSearchParams();
  
  const location = searchParams.get('location');
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const adults = searchParams.get('adults');
  const children = searchParams.get('children');
  const rooms = searchParams.get('rooms');

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Search Results</h1>
      
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Search Parameters:</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="font-medium">Location:</span> {location}
          </div>
          <div>
            <span className="font-medium">Check-in:</span> {from ? new Date(from).toLocaleDateString() : 'N/A'}
          </div>
          <div>
            <span className="font-medium">Check-out:</span> {to ? new Date(to).toLocaleDateString() : 'N/A'}
          </div>
          <div>
            <span className="font-medium">Adults:</span> {adults}
          </div>
          <div>
            <span className="font-medium">Children:</span> {children}
          </div>
          <div>
            <span className="font-medium">Rooms:</span> {rooms}
          </div>
        </div>
      </div>

      <div className="text-center py-12">
        <p className="text-gray-600">
          This is where search results would be displayed. 
          You can integrate with a real booking API here.
        </p>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
}