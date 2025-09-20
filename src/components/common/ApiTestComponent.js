import React, { useState } from 'react';
import { authService, apiClient } from '../services';

const ApiTestComponent = () => {
  const [testResults, setTestResults] = useState('');
  const [loading, setLoading] = useState(false);

  const testApiConnection = async () => {
    setLoading(true);
    setTestResults('Testing API connection...\n');
    
    try {
      // Test basic API connection
      const response = await apiClient.get('/health');
      setTestResults(prev => prev + `✅ API Health Check: ${response.status} ${response.statusText}\n`);
    } catch (error) {
      setTestResults(prev => prev + `❌ API Health Check Failed: ${error.message}\n`);
    }

    try {
      // Test authentication endpoints
      const loginResult = await authService.loginUser({
        email: 'test@example.com',
        password: 'test123'
      });
      
      if (loginResult.success) {
        setTestResults(prev => prev + `✅ Login Test: ${loginResult.message}\n`);
      } else {
        setTestResults(prev => prev + `⚠️ Login Test: ${loginResult.message}\n`);
      }
    } catch (error) {
      setTestResults(prev => prev + `❌ Login Test Failed: ${error.message}\n`);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">API Integration Test</h2>
      
      <button
        onClick={testApiConnection}
        disabled={loading}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test API Connection'}
      </button>

      {testResults && (
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-semibold mb-2">Test Results:</h3>
          <pre className="text-sm whitespace-pre-wrap">{testResults}</pre>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded">
        <h3 className="font-semibold mb-2">API Configuration:</h3>
        <p><strong>Base URL:</strong> {process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}</p>
        <p><strong>Environment:</strong> {process.env.NODE_ENV}</p>
        <p><strong>Timeout:</strong> {process.env.REACT_APP_DEFAULT_TIMEOUT || '30000'}ms</p>
      </div>
    </div>
  );
};

export default ApiTestComponent;