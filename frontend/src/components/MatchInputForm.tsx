import { useState } from 'react';

type MatchInputFormProps = {
  onSubmit: (data: any) => void;
  isLoading: boolean;
};

const MatchInputForm = ({ onSubmit, isLoading }: MatchInputFormProps) => {
  const [activeTab, setActiveTab] = useState<'form' | 'url' | 'screenshot'>('form');
  const [matchDetails, setMatchDetails] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ type: activeTab, payload: matchDetails });
  };

  return (
    <div className="bg-card p-6 rounded-xl border border-gray-800">
      <h2 className="text-2xl font-bold mb-6">Match Context</h2>
      
      <div className="flex gap-2 mb-6 bg-gray-900 p-1 rounded-lg">
        {['form', 'url', 'screenshot'].map((tab) => (
          <button
            key={tab}
            type="button"
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab(tab as any)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {activeTab === 'form' && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Match Situation</label>
            <textarea
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white h-32 focus:ring-2 focus:ring-primary outline-none"
              placeholder="e.g., CSK needs 45 runs from 18 balls. Dhoni is batting with Jadeja. Bumrah has 2 overs left..."
              value={matchDetails}
              onChange={(e) => setMatchDetails(e.target.value)}
              required
            ></textarea>
          </div>
        )}

        {activeTab === 'url' && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Cricbuzz Match URL</label>
            <input
              type="url"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary outline-none"
              placeholder="https://www.cricbuzz.com/live-cricket-scores/..."
              value={matchDetails}
              onChange={(e) => setMatchDetails(e.target.value)}
              required
            />
          </div>
        )}

        {activeTab === 'screenshot' && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Upload Match Screenshot</label>
            <input
              type="file"
              accept="image/*"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white"
            />
            <p className="text-xs text-gray-500 mt-2">Will be processed by Gemini Vision</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-green-500 text-black font-bold py-3 rounded-lg transition-colors mt-6 disabled:opacity-50"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Strategies'}
        </button>
      </form>
    </div>
  );
};

export default MatchInputForm;
