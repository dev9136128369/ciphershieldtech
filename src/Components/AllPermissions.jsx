import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllPermissions = ({ currentUser }) => {
  const [testLogins, setTestLogins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTestLogins = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/auth/test-logins');
        setTestLogins(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch test logins');
        setLoading(false);
        console.error('Fetch error:', err);
      }
    };

    fetchTestLogins();
  }, []);

  const handleDelete = async (id, userRole) => {
    if (!currentUser || currentUser.role !== 'admin') {
      setError('Only admin can delete users');
      return;
    }

    if (userRole === 'admin') {
      setError('Cannot delete admin users');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    // try {
    //   await axios.delete(`http://localhost:8000/api/auth/test-logins/${id}`, {
    //     data: { adminEmail: currentUser.email }
    //   });
    //   setTestLogins(testLogins.filter(login => login._id !== id));
    // } catch (err) {
    //   setError(err.response?.data?.message || 'Failed to delete user');
    //   console.error('Delete error:', err);
    // }
  };

  if (loading) {
    return <div>Loading test logins...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Test Login Permissions</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {testLogins.length === 0 ? (
        <p>No test logins found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Password</th>
                <th className="py-2 px-4 border-b">Role</th>
                {currentUser?.role === 'admin' && (
                  <th className="py-2 px-4 border-b">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {testLogins.map((login) => (
                <tr key={login._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{login.email}</td>
                  <td className="py-2 px-4 border-b">{login.password}</td>
                  <td className="py-2 px-4 border-b">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      login.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {login.role}
                    </span>
                  </td>
                  {currentUser?.role === 'admin' && login.role !== 'admin' && (
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleDelete(login._id, login.role)}
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllPermissions;









