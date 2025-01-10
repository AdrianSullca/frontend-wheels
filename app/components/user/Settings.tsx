import { useState } from 'react';
import GeneralSettingsForm from './GeneralSettingsForm';
import SecuritySettingsForm from './SecuritySettingsForm';

export default function Settings() {
  const [activeForm, setActiveForm] = useState('general');

  return (
    <div className="grid md:grid-cols-[1fr,3fr] gap-6 py-6">
      <div className="flex flex-col w-full gap-3">
        <button
          className={`text-center py-3 shadow-md text-black font-medium rounded-lg ${activeForm === 'general' ? 'bg-custom-gray text-white' : 'bg-white text-black'}`}
          onClick={() => setActiveForm('general')}
        >
          General
        </button>
        <button
          className={`bg-text-center py-3 shadow-md text-black font-medium rounded-lg ${activeForm === 'security' ? 'bg-custom-gray text-white' : 'bg-white text-black'}`}
          onClick={() => setActiveForm('security')}
        >
          Security
        </button>
      </div>
      {activeForm === 'general' ? <GeneralSettingsForm /> : <SecuritySettingsForm />}
    </div>
  );
}
