import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import LogoutButton from "@/components/logout-button";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome, {session.user?.name || session.user?.email}!</h1>
            <p className="text-gray-600">You're now logged in to Miami Captains.</p>
          </div>
          <LogoutButton />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-3">Dashboard</h2>
            <p className="text-gray-600 mb-4">View your account overview and recent activity.</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Coming Soon
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-3">Profile</h2>
            <p className="text-gray-600 mb-4">Manage your personal information and preferences.</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Coming Soon
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-3">Settings</h2>
            <p className="text-gray-600 mb-4">Configure your account settings and notifications.</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Coming Soon
            </button>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">🚀 More features coming soon!</h3>
          <p className="text-gray-700">
            We're working hard to bring you the best Miami Captains experience. 
            Stay tuned for exciting new features and updates.
          </p>
        </div>
      </div>
    </div>
  );
}