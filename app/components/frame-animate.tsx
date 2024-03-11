"use client";
import { useEffect, useState } from "react";
export function FrameAnimate(props: any) {
	const [isLoaded, setIsLoaded] = useState(false)
	const triggerInvokedFromParent = () => {
		handleAnimateClick();
	};

	useEffect(() => {
		if (isLoaded) {
			triggerInvokedFromParent();
		}
		setIsLoaded(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.triggerAnimate]);

	const { onAnimate } = props;
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [alreadyZero, setAlreadyZero] = useState(false);

	const cards = ['A', 'B', 'C'];

	const handleAnimateClick = () => {
		if (!alreadyZero) {
			setAlreadyZero(true);
		}
		setCurrentCardIndex((prevIndex) =>
			(prevIndex + 1) % cards.length
		);
	};

	return (
		<div className="animate-box">
			<div className="card-container">
				{cards.map((card, index) => (
					<div
						key={index}
						// className={`card ${index === currentCardIndex ? 'large-card' : 'small'}`}
						className={`card ${currentCardIndex == 0 && currentCardIndex == index ? (alreadyZero ? 'large-card': 'default' ) : (index == currentCardIndex ? 'large-card' : 'small')}`}
					>

					</div>
				))}
			</div>
		</div>
	)
}