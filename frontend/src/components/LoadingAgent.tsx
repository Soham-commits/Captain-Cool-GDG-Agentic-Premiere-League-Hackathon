type LoadingAgentProps = {
	name: string;
	statusText: string;
	accentColor: string;
	isActive: boolean;
	isCompleted: boolean;
};

const LoadingAgent = ({ name, statusText, accentColor, isActive, isCompleted }: LoadingAgentProps) => {
	return (
		<div
			className={`rounded-xl border border-white/10 bg-card p-4 transition-all ${
				isActive ? 'scale-[1.01] shadow-lg shadow-black/30' : ''
			}`}
			style={{ borderLeft: `4px solid ${accentColor}` }}
		>
			<div className="flex items-center justify-between gap-3">
				<p className="font-semibold text-textMain">{name}</p>
				{isCompleted ? (
					<span className="rounded-full bg-primary/20 text-primary px-2 py-0.5 text-xs font-semibold">Completed</span>
				) : (
					<span className="rounded-full bg-white/5 text-textMuted px-2 py-0.5 text-xs">Running</span>
				)}
			</div>
			<div className="mt-3 flex items-center gap-2 text-sm text-textMuted font-mono">
				{isCompleted ? (
					<span className="text-primary font-bold">✓</span>
				) : (
					<span className="h-3 w-3 rounded-full bg-primary animate-pulse" />
				)}
				<span>{statusText}</span>
			</div>
		</div>
	);
};

export default LoadingAgent;
