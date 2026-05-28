type CounterfactualBoxProps = {
	scenario: string;
	shift: number;
};

const CounterfactualBox = ({ scenario, shift }: CounterfactualBoxProps) => {
	const positive = shift >= 0;
	return (
		<div className="rounded-xl border border-accent/70 bg-[#1b1208] p-4">
			<p className="text-xs tracking-wide text-accent font-semibold">WHAT IF</p>
			<p className="text-sm text-textMain mt-2 font-mono leading-relaxed">{scenario}</p>
			<div className="mt-3 text-sm font-semibold text-accent flex items-center gap-2">
				<span>WIN PROBABILITY SHIFT</span>
				<span>{positive ? '↑' : '↓'}</span>
				<span>{positive ? '+' : ''}{shift.toFixed(1)}%</span>
			</div>
		</div>
	);
};

export default CounterfactualBox;
