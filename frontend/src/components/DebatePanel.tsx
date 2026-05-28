import AgentCard from './AgentCard';
import ConfidenceGauge from './ConfidenceGauge';
import CounterfactualBox from './CounterfactualBox';
import DissentCard from './DissentCard';
import LoadingAgent from './LoadingAgent';

export type AgentResult = {
	id: 'stats' | 'strategist' | 'devil' | 'strategist2' | 'commentator';
	name: string;
	model: 'gemini-2.5-pro' | 'gemini-2.5-flash';
	accentColor: string;
	output: string;
};

export type DebateResults = {
	agents: AgentResult[];
	finalCall: string;
	confidence: number;
	counterfactual: {
		scenario: string;
		shift: number;
	};
	dissentCore: string;
};

type DebatePanelProps = {
	isLoading: boolean;
	activeStep: number;
	results: DebateResults | null;
};

const loadingSteps = [
	{ name: '📊 Stats Analyst', message: 'Gathering intel...', accentColor: '#1565c0' },
	{ name: '🧠 Strategist', message: 'Forming the call...', accentColor: '#00e676' },
	{ name: '⚔️ Devil\'s Advocate', message: 'Finding the flaw...', accentColor: '#ef5350' },
	{ name: '🔄 Strategist Round 2', message: 'Reconsidering...', accentColor: '#ff8f00' },
	{ name: '🎙️ Commentator', message: 'Delivering the verdict...', accentColor: '#7b1fa2' },
];

const DebatePanel = ({ isLoading, activeStep, results }: DebatePanelProps) => {
	if (isLoading) {
		const visibleSteps = loadingSteps.filter((_, index) => index < activeStep);
		const topGridSteps = visibleSteps.slice(0, 4);
		const commentatorStep = visibleSteps[4];

		return (
			<div className="space-y-4">
				<div className="grid md:grid-cols-2 gap-4">
					{topGridSteps.map((step, index) => {
						const stepNumber = index + 1;
						const isCompleted = activeStep > stepNumber;
						const isActive = activeStep === stepNumber;
						return (
							<LoadingAgent
								key={step.name}
								name={step.name}
								statusText={step.message}
								accentColor={step.accentColor}
								isCompleted={isCompleted}
								isActive={isActive}
							/>
						);
					})}
				</div>
				{commentatorStep && (
					<LoadingAgent
						key={commentatorStep.name}
						name={commentatorStep.name}
						statusText={commentatorStep.message}
						accentColor={commentatorStep.accentColor}
						isCompleted={false}
						isActive={activeStep === 5}
					/>
				)}
			</div>
		);
	}

	if (!results) {
		return (
			<div className="h-full min-h-[500px] grid place-items-center rounded-xl border border-white/10 bg-card p-6">
				<p className="text-center text-textMuted max-w-md">
					Provide match context and hit analyze to watch the multi-agent debate reveal and final call.
				</p>
			</div>
		);
	}

	const commentator = results.agents.find((agent) => agent.id === 'commentator');
	const standardAgents = results.agents.filter((agent) => agent.id !== 'commentator');

	return (
		<div className="space-y-4">
			<div className="grid md:grid-cols-2 gap-4">
				{standardAgents.map((agent) => (
					<AgentCard
						key={agent.id}
						title={agent.name}
						model={agent.model}
						summary={agent.output}
						accentColor={agent.accentColor}
						isDissent={agent.id === 'devil'}
					/>
				))}
			</div>

			{commentator && (
				<article
					className="rounded-2xl border border-white/10 bg-card p-5 md:p-6"
					style={{ borderLeft: '6px solid #7b1fa2' }}
				>
					<div className="flex flex-wrap items-center justify-between gap-3 mb-4">
						<h3 className="text-xl md:text-2xl font-semibold">🎙️ Commentator</h3>
						<span className="px-3 py-1 rounded-full text-xs text-white" style={{ backgroundColor: '#424242' }}>{commentator.model}</span>
					</div>

					<p className="text-2xl md:text-3xl font-extrabold text-primary leading-tight mb-6">{results.finalCall}</p>

					<div className="grid md:grid-cols-2 gap-4 mb-4">
						<ConfidenceGauge value={results.confidence} />
						<CounterfactualBox
							scenario={results.counterfactual.scenario}
							shift={results.counterfactual.shift}
						/>
					</div>

					<DissentCard argument={results.dissentCore} />
				</article>
			)}
		</div>
	);
};

export default DebatePanel;
