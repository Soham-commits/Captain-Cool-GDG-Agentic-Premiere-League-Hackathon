import { useState } from 'react';

type MatchInputFormProps = {
  onSubmit: (data: MatchFormSubmitData) => void;
  isLoading: boolean;
};

type InningsType = '1st' | '2nd';
type PitchType = 'Flat' | 'Turning' | 'Two-paced';
type DewFactor = 'Low' | 'Medium' | 'High';

type StructuredMatchForm = {
  innings: InningsType;
  over: number;
  ball: number;
  currentScore: string;
  wicketsLost: number;
  target: number;
  requiredRunRate: number;
  striker: string;
  nonStriker: string;
  bowlersRemaining: string;
  pitch: PitchType;
  venue: string;
  dewFactor: DewFactor;
  impactPlayerAvailable: boolean;
};

export type MatchFormSubmitData =
  | { type: 'form'; payload: StructuredMatchForm }
  | { type: 'url' | 'screenshot'; payload: string };

const MatchInputForm = ({ onSubmit, isLoading }: MatchInputFormProps) => {
  const [activeTab, setActiveTab] = useState<'form' | 'url' | 'screenshot'>('form');
  const [textInput, setTextInput] = useState('');
  const [formState, setFormState] = useState<StructuredMatchForm>({
    innings: '2nd',
    over: 18,
    ball: 1,
    currentScore: '156/3',
    wicketsLost: 3,
    target: 191,
    requiredRunRate: 17.5,
    striker: 'MS Dhoni 34* off 28',
    nonStriker: 'Ravindra Jadeja 22* off 12',
    bowlersRemaining: 'Bumrah: 2 overs\nChahal: 1 over',
    pitch: 'Two-paced',
    venue: 'Wankhede Stadium',
    dewFactor: 'High',
    impactPlayerAvailable: true,
  });

  const updateField = <K extends keyof StructuredMatchForm>(field: K, value: StructuredMatchForm[K]) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'form') {
      onSubmit({ type: 'form', payload: formState });
      return;
    }

    onSubmit({ type: activeTab, payload: textInput });
  };

  const inputCls = 'w-full bg-[#091017] border border-white/10 rounded-lg p-3 text-textMain focus:ring-2 focus:ring-primary outline-none';

  return (
    <div className="bg-card p-6 rounded-xl border border-white/10">
      <h2 className="text-2xl font-bold mb-6">Match Context</h2>
      
      <div className="flex gap-2 mb-6 bg-[#091017] p-1 rounded-lg border border-white/10">
        {['form', 'url', 'screenshot'].map((tab) => (
          <button
            key={tab}
            type="button"
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab ? 'bg-[#1b2a39] text-textMain' : 'text-textMuted hover:text-textMain'
            }`}
            onClick={() => setActiveTab(tab as any)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {activeTab === 'form' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-primary mb-3">MATCH SITUATION</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="text-sm text-textMuted">
                  Innings
                  <select
                    className={`${inputCls} mt-1`}
                    value={formState.innings}
                    onChange={(e) => updateField('innings', e.target.value as InningsType)}
                  >
                    <option value="1st">1st</option>
                    <option value="2nd">2nd</option>
                  </select>
                </label>
                <label className="text-sm text-textMuted">
                  Over
                  <input
                    type="number"
                    min={1}
                    max={20}
                    className={`${inputCls} mt-1`}
                    value={formState.over}
                    onChange={(e) => updateField('over', Number(e.target.value))}
                    required
                  />
                </label>
                <label className="text-sm text-textMuted">
                  Ball
                  <input
                    type="number"
                    min={1}
                    max={6}
                    className={`${inputCls} mt-1`}
                    value={formState.ball}
                    onChange={(e) => updateField('ball', Number(e.target.value))}
                    required
                  />
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold tracking-wide text-primary mb-3">SCORE</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="text-sm text-textMuted">
                  Current Score
                  <input
                    type="text"
                    className={`${inputCls} mt-1`}
                    value={formState.currentScore}
                    onChange={(e) => updateField('currentScore', e.target.value)}
                    placeholder="156/3"
                    required
                  />
                </label>
                <label className="text-sm text-textMuted">
                  Wickets Lost
                  <input
                    type="number"
                    min={0}
                    max={10}
                    className={`${inputCls} mt-1`}
                    value={formState.wicketsLost}
                    onChange={(e) => updateField('wicketsLost', Number(e.target.value))}
                    required
                  />
                </label>
                {formState.innings === '2nd' && (
                  <>
                    <label className="text-sm text-textMuted">
                      Target
                      <input
                        type="number"
                        min={1}
                        className={`${inputCls} mt-1`}
                        value={formState.target}
                        onChange={(e) => updateField('target', Number(e.target.value))}
                        required
                      />
                    </label>
                    <label className="text-sm text-textMuted">
                      Required Run Rate
                      <input
                        type="number"
                        min={0}
                        step="0.1"
                        className={`${inputCls} mt-1`}
                        value={formState.requiredRunRate}
                        onChange={(e) => updateField('requiredRunRate', Number(e.target.value))}
                        required
                      />
                    </label>
                  </>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold tracking-wide text-primary mb-3">PLAYERS</h3>
              <div className="grid grid-cols-1 gap-3">
                <label className="text-sm text-textMuted">
                  Striker
                  <input
                    type="text"
                    className={`${inputCls} mt-1`}
                    value={formState.striker}
                    onChange={(e) => updateField('striker', e.target.value)}
                    required
                  />
                </label>
                <label className="text-sm text-textMuted">
                  Non-Striker
                  <input
                    type="text"
                    className={`${inputCls} mt-1`}
                    value={formState.nonStriker}
                    onChange={(e) => updateField('nonStriker', e.target.value)}
                    required
                  />
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold tracking-wide text-primary mb-3">BOWLING ATTACK</h3>
              <label className="text-sm text-textMuted">
                Bowlers Remaining
                <textarea
                  className={`${inputCls} mt-1 h-24`}
                  value={formState.bowlersRemaining}
                  onChange={(e) => updateField('bowlersRemaining', e.target.value)}
                  placeholder="Bumrah: 2 overs\nChahal: 1 over"
                  required
                />
              </label>
            </div>

            <div>
              <h3 className="text-sm font-semibold tracking-wide text-primary mb-3">CONDITIONS</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="text-sm text-textMuted">
                  Pitch
                  <select
                    className={`${inputCls} mt-1`}
                    value={formState.pitch}
                    onChange={(e) => updateField('pitch', e.target.value as PitchType)}
                  >
                    <option value="Flat">Flat</option>
                    <option value="Turning">Turning</option>
                    <option value="Two-paced">Two-paced</option>
                  </select>
                </label>
                <label className="text-sm text-textMuted sm:col-span-2">
                  Venue
                  <input
                    type="text"
                    className={`${inputCls} mt-1`}
                    value={formState.venue}
                    onChange={(e) => updateField('venue', e.target.value)}
                    required
                  />
                </label>
              </div>
              <label className="text-sm text-textMuted block mt-3">
                Dew Factor
                <select
                  className={`${inputCls} mt-1`}
                  value={formState.dewFactor}
                  onChange={(e) => updateField('dewFactor', e.target.value as DewFactor)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </label>
            </div>

            <div>
              <h3 className="text-sm font-semibold tracking-wide text-primary mb-3">TACTICAL</h3>
              <div className="flex items-center justify-between rounded-lg border border-white/10 bg-[#091017] p-3">
                <span className="text-sm text-textMuted">Impact Player Available</span>
                <button
                  type="button"
                  onClick={() => updateField('impactPlayerAvailable', !formState.impactPlayerAvailable)}
                  className={`h-7 w-14 rounded-full p-1 transition-colors ${formState.impactPlayerAvailable ? 'bg-primary/40' : 'bg-white/10'}`}
                >
                  <span
                    className={`block h-5 w-5 rounded-full transition-transform ${formState.impactPlayerAvailable ? 'translate-x-7 bg-primary' : 'translate-x-0 bg-textMuted'}`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'url' && (
          <div>
            <label className="block text-sm font-medium text-textMuted mb-2">Cricbuzz Match URL</label>
            <input
              type="url"
              className={inputCls}
              placeholder="https://www.cricbuzz.com/live-cricket-scores/..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              required
            />
          </div>
        )}

        {activeTab === 'screenshot' && (
          <div>
            <label className="block text-sm font-medium text-textMuted mb-2">Upload Match Screenshot</label>
            <input
              type="file"
              accept="image/*"
              className="w-full bg-[#091017] border border-white/10 rounded-lg p-3 text-textMain"
            />
            <p className="text-xs text-textMuted mt-2">Will be processed by Gemini Vision</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary/85 text-black font-bold py-3 rounded-lg transition-colors mt-6 disabled:opacity-50"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Strategies'}
        </button>
      </form>
    </div>
  );
};

export default MatchInputForm;
