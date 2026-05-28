type AgentCardProps = {
	title: string;
	model: string;
	summary: string;
	accentColor: string;
	isDissent?: boolean;
};

const AgentCard = ({ title, model, summary, accentColor, isDissent = false }: AgentCardProps) => {
	return (
		<article
			className={`rounded-xl border p-4 ${isDissent ? 'bg-[#1a0a0a] border-danger/40' : 'bg-card border-white/10'}`}
			style={{ borderLeft: `4px solid ${accentColor}` }}
		>
			<div className="flex items-start justify-between gap-3">
				<h3 className={`font-semibold ${isDissent ? 'text-danger' : 'text-textMain'}`}>{title}</h3>
				<span className="px-2 py-1 text-[11px] rounded-full text-white" style={{ backgroundColor: '#424242' }}>{model}</span>
			</div>
			<div className="mt-3 max-h-[200px] overflow-y-auto pr-1">
				<p className={`text-sm leading-relaxed font-mono whitespace-pre-wrap ${isDissent ? 'text-[#c18a8a]' : 'text-textMuted'}`}>{summary}</p>
			</div>
		</article>
	);
};

export default AgentCard;
