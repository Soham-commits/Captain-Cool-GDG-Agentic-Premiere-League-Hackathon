import { useEffect, useMemo, useState } from 'react';

type ConfidenceGaugeProps = {
	value: number;
};

const ConfidenceGauge = ({ value }: ConfidenceGaugeProps) => {
	const [animatedValue, setAnimatedValue] = useState(0);

	useEffect(() => {
		const timer = window.setTimeout(() => setAnimatedValue(value), 120);
		return () => window.clearTimeout(timer);
	}, [value]);

	const clamped = useMemo(() => Math.max(0, Math.min(100, animatedValue)), [animatedValue]);
	const degree = Math.round((clamped / 100) * 360);

	return (
		<div className="rounded-xl border border-white/10 bg-[#0a141f] p-4">
			<p className="text-xs tracking-wide text-textMuted mb-3">CONFIDENCE</p>
			<div className="flex items-center justify-center">
				<div
					className="h-32 w-32 rounded-full grid place-items-center transition-all duration-700"
					style={{
						background: `conic-gradient(#00e676 ${degree}deg, #1f2b36 ${degree}deg)`,
					}}
				>
					<div className="h-24 w-24 rounded-full bg-background border border-white/10 grid place-items-center">
						<span className="text-2xl font-bold text-primary">{Math.round(clamped)}%</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfidenceGauge;
