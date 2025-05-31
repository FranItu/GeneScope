import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Dna } from 'lucide-react';
import UploadClaim from '../UploadClaim';

const EnhancedUploadClaim: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <header style={{ 
        backgroundColor: 'white', 
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', 
        borderBottom: '1px solid #e5e7eb' 
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '4rem'
        }}>
          <button
            onClick={() => navigate('/')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#6b7280',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
          >
            <ArrowLeft size={20} />
            Back to Homepage
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              background: 'linear-gradient(to right, #2563eb, #4f46e5)',
              padding: '0.5rem',
              borderRadius: '0.5rem'
            }}>
              <Dna size={24} color="white" />
            </div>
            <h1 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              color: '#111827',
              margin: 0
            }}>
              PBR - Upload Genetic Claims
            </h1>
          </div>
          
          <div></div>
        </div>
      </header>

      <main style={{ padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <UploadClaim />
        </div>
      </main>
    </div>
  );
};

export default EnhancedUploadClaim;