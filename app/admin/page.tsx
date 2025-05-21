'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EmailSignup {
  id: string;
  email: string;
  timestamp: string;
}

interface SignupsData {
  signups: EmailSignup[];
  total: number;
  lastUpdated: string;
}

export default function AdminPage() {
  const [signupsData, setSignupsData] = useState<SignupsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSignups() {
      try {
        const response = await fetch('/api/email-signup');
        if (!response.ok) {
          throw new Error('Failed to fetch signups');
        }
        const data = await response.json();
        setSignupsData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchSignups();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Loading email signups...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!signupsData) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">No data available</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Email Signups Admin</h1>
        <p className="text-gray-600 mt-2">
          Total signups: {signupsData.total} | Last updated: {new Date(signupsData.lastUpdated).toLocaleString()}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Email Signups</CardTitle>
        </CardHeader>
        <CardContent>
          {signupsData.signups.length === 0 ? (
            <p className="text-gray-500">No email signups yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-semibold">Email</th>
                    <th className="text-left p-2 font-semibold">Signup Date</th>
                    <th className="text-left p-2 font-semibold">ID</th>
                  </tr>
                </thead>
                <tbody>
                  {signupsData.signups.map((signup) => (
                    <tr key={signup.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">{signup.email}</td>
                      <td className="p-2">{new Date(signup.timestamp).toLocaleString()}</td>
                      <td className="p-2 text-gray-500 text-sm">{signup.id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}