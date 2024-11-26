import React, { useState } from 'react';
import { Camera, Mail, Phone, Building, MapPin, Briefcase, Save } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  position: string;
  avatar: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    company: 'Tech Solutions Inc.',
    location: 'San Francisco, CA',
    position: 'Senior Proposal Manager',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    // TODO: Implement API call to save profile changes
  };

  const ProfileField = ({ 
    icon: Icon, 
    label, 
    value, 
    name 
  }: { 
    icon: React.ElementType; 
    label: string; 
    value: string;
    name: string;
  }) => (
    <div className="sm:col-span-1">
      <div className="flex items-center mt-2">
        <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        <dt className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">{label}</dt>
      </div>
      {isEditing ? (
        <input
          type="text"
          name={name}
          value={editedProfile[name as keyof UserProfile]}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
        />
      ) : (
        <dd className="mt-1 text-sm text-gray-900 dark:text-gray-200">{value}</dd>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Profile Information</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Personal details and application settings.</p>
          </div>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            ) : (
              'Edit Profile'
            )}
          </button>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center space-x-5">
              <div className="relative">
                <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="h-24 w-24 rounded-full"
                  />
                </div>
                {isEditing && (
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{profile.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{profile.position}</p>
              </div>
            </div>
          </div>

          <div className="px-4 py-5 sm:px-6">
            <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <ProfileField icon={Mail} label="Email" value={profile.email} name="email" />
              <ProfileField icon={Phone} label="Phone" value={profile.phone} name="phone" />
              <ProfileField icon={Building} label="Company" value={profile.company} name="company" />
              <ProfileField icon={MapPin} label="Location" value={profile.location} name="location" />
              <ProfileField icon={Briefcase} label="Position" value={profile.position} name="position" />
            </div>
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div className="mt-8 bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Recent Activity</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Your latest actions and updates.</p>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 py-5 sm:px-6">
            {/* Add recent activity items here */}
            <p className="text-sm text-gray-500 dark:text-gray-400">No recent activity to display.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
