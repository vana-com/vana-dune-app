import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Sands Of Arrakis | Export Image",
	description: "Sands Of Arrakis - Export Image",
};

type Props = {
	children: React.ReactNode,
}

export default function ExportImageLayout({ children }: Props) {
	return (
		<>
			<div className="overflow-hidden">
				{children}
			</div>
		</>
	)
}