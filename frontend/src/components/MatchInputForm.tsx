import { useState } from 'react';

export type MatchInputFormProps = {
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
    currentScore: '156',
    wicketsLost: 3,
    target: 181,
    requiredRunRate: 12.5,
    striker: 'MS Dhoni',
    nonStriker: 'Ravindra Jadeja',
    bowlersRemaining: 'Bumrah: 2 overs\nChahal: 1 over',
    pitch: 'Flat',
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

  const inputCls = 'w-full input-field rounded-[8px] px-[14px] py-[10px] text-[14px] focus:border-[rgba(255,255,255,0.2)] focus:outline-none transition-colors';
  const labelCls = 'text-[10px] font-medium tracking-[1.5px] uppercase text-[#1a73e8] mb-[12px] block';

  return (
    <div className="w-full text-left">
      <h2 className="text-[20px] font-semibold text-white mb-6">Match Context</h2>
      
      <div className="flex gap-6 mb-8 border-b border-[var(--border-subtle)] pb-2">
        {['form', 'url', 'screenshot'].map((tab) => (
          <button
            key={tab}
            type="button"
            className={`pb-2 text-[15px] transition-colors relative ${
              activeTab === tab ? 'text-[#f5f5f5] font-semibold' : 'text-[#616161]'
            }`}
            onClick={() => setActiveTab(tab as any)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <span className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-[var(--green-primary)]" />
            )}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-[28px]">
        {activeTab === 'form' && (
          <>
            <div>
              <span className={labelCls}>MATCH SITUATION</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <select
                  className={inputCls}
                  value={formState.innings}
                  onChange={(e) => updateField('innings', e.target.value as InningsType)}
                >
                  <option value="1st">1st Innings</option>
                  <option value="2nd">2nd Innings</option>
                </select>
                <input
                  type="number"
                  min={1} max={20}
                  placeholder="Over"
                  className={inputCls}
                  value={formState.over}
                  onChange={(e) => updateField('over', Number(e.target.value))}
                  required
                />
                <input
                  type="number"
                  min={1} max={6}
                  placeholder="Ball"
                  className={inputCls}
                  value={formState.ball}
                  onChange={(e) => updateField('ball', Number(e.target.value))}
                  required
                />
              </div>
            </div>

            <div>
              <span className={labelCls}>SCORE</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Current Score (e.g. 156/3)"
                  className={inputCls}
                  value={formState.currentScore}
                  onChange={(e) => updateField('currentScore', e.target.value)}
                  required
                />
                <input
                  type="number"
                  min={0} max={10}
                  placeholder="Wickets Lost"
                  className={inputCls}
                  value={formState.wicketsLost}
                  onChange={(e) => updateField('wicketsLost', Number(e.target.value))}
                  required
                />
              </div>
              {formState.innings === '2nd' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="number"
                    min={1}
                    placeholder="Target"
                    className={inputCls}
                    value={formState.target}
                    onChange={(e) => updateField('target', Number(e.target.value))}
                    required
                  />
                  <input
                    type="number"
                    min={0} step="0.1"
                    placeholder="Required Run Rate"
                    className={inputCls}
                    value={formState.requiredRunRate}
                    onChange={(e) => updateField('requiredRunRate', Number(e.target.value))}
                    required
                  />
                </div>
              )}
            </div>

            <div>
              <span className={labelCls}>PLAYERS</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Striker"
                  className={inputCls}
                  value={formState.striker}
                  onChange={(e) => updateField('striker', e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Non-Striker"
                  className={inputCls}
                  value={formState.nonStriker}
                  onChange={(e) => updateField('nonStriker', e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <span className={labelCls}>BOWLING ATTACK</span>
              <textarea
                className={`${inputCls} h-[100px] resize-none`}
                value={formState.bowlersRemaining}
                onChange={(e) => updateField('bowlersRemaining', e.target.value)}
                placeholder="Bowlers Remaining (e.g. Bumrah: 2 overs)"
                required
              />
            </div>

            <div>
              <span className={labelCls}>CONDITIONS</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <select
                  className={inputCls}
                  value={formState.pitch}
                  onChange={(e) => updateField('pitch', e.target.value as PitchType)}
                >
                  <option value="Flat">Flat Pitch</option>
                  <option value="Turning">Turning Pitch</option>
                  <option value="Two-paced">Two-paced Pitch</option>
                </select>
                <select
                  className={inputCls}
                  value={formState.dewFactor}
                  onChange={(e) => updateField('dewFactor', e.target.value as DewFactor)}
                >
                  <option value="Low">Low Dew</option>
                  <option value="Medium">Medium Dew</option>
                  <option value="High">High Dew</option>
                </select>
                <input
                  type="text"
                  placeholder="Venue"
                  className={inputCls}
                  value={formState.venue}
                  onChange={(e) => updateField('venue', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center mt-2">
              <label className="toggle-switch mr-3">
                <input
                  type="checkbox"
                  checked={formState.impactPlayerAvailable}
                  onChange={(e) => updateField('impactPlayerAvailable', e.target.checked)}
                />
                <span className="switch" />
              </label>
              <div className="text-[14px] text-white">Impact Player Available</div>
            </div>
          </>
        )}

        {activeTab === 'url' && (
          <div>
            <span className={labelCls}>MATCH URL</span>
            <input
              type="url"
              className={inputCls}
              placeholder="https://www.cricbuzz.com/..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              required
            />
          </div>
        )}

        {activeTab === 'screenshot' && (
          <div>
            <span className={labelCls}>UPLOAD SCREENSHOT</span>
             <div className="border border-dashed border-[var(--border-subtle)] rounded-lg p-8 text-center text-[var(--text-muted)] mt-2">
                Drag and drop match screenshot here, or click to browse.
             </div>
          </div>
        )}

            <button
              type="submit"
              className="analyze-btn w-full mt-4"
            >
              Analyze Strategies
            </button>
      </form>
    </div>
  );
};

export default MatchInputForm;
