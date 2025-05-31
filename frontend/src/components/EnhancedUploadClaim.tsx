import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Dna } from 'lucide-react';
import UploadClaim from '../UploadClaim';

const EnhancedUploadClaim: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-4 relative">
            {/* Back Button - Left Side */}
            <button
              onClick={() => navigate('/')}
              className="absolute left-0 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Homepage
            </button>
            
            {/* Centered Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Dna className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  PBR
                </h1>
                <p className="text-sm text-gray-600">Polymerase Blockchain Reaction</p>
              </div>
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Dna className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Content Wrapper with Beautiful Styling */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Upload Your Genetic Claims
              </h2>
              <p className="text-blue-100">
                Submit structured genetic claims with comprehensive metadata and ontological precision
              </p>
            </div>
            
            {/* Upload Component Container */}
            <div className="p-8">
              <UploadClaim />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EnhancedUploadClaim;