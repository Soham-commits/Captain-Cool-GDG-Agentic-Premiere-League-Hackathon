type DissentCardProps = {
	argument: string;
};

const DissentCard = ({ argument }: DissentCardProps) => {
	return (
		<div className="rounded-xl border border-danger/70 bg-[#190b0b] p-4">
			<p className="text-xs tracking-wide text-danger font-semibold">THE OTHER SIDE</p>
			<p className="mt-2 text-sm font-mono text-[#d59a9a] leading-relaxed">{argument}</p>
		</div>
	);
};

export default DissentCard;
