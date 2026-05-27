import { useState } from 'react';
import MatchInputForm from '../components/MatchInputForm';

const Analyze = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = (data: any) => {
    setIsLoading(true);
    // TODO: Connect to backend
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
      {/* Left Panel: Match Input */}
      <div>
        <MatchInputForm onSubmit={handleAnalyze} isLoading={isLoading} />
      </div>
      
      {/* Right Panel: Output and Debate (Placeholder for now) */}
      <div className="bg-card border border-gray-800 rounded-xl p-6 flex items-center justify-center min-h-[500px]">
        {isLoading ? (
          <p className="text-primary animate-pulse">Running agents...</p>
        ) : (
          <p className="text-gray-500 text-center">Provide match context and hit analyze to see the AI debate unfold.</p>
        )}
      </div>
    </div>
  );
};

export default Analyze;
