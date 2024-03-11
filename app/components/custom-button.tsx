"use client";

import ReactiveButton from 'reactive-button';
import Image from 'next/image'
import { useEffect, useState } from 'react';

export function CustomButton(props: any) {
	const { 
		background,
		onClicked, 
		isActive, 
		title, 
		height, 
		width, 
		boxShadow, 
		paddingBottom, 
		hasArrow, 
		arrowPos,
		isDisabled
	} = props;

	const [disabled, setDisabled] = useState(false)
	const btnClick = () => {
		onClicked();
	}


	const IndleText = (prop: any) => {
		return (
			<div className="flex items-center justify-around sm:justify-center">
				{
					arrowPos == 'left' ?
						<Image className="sm:mr-[1rem]" src={`/resources/arrow-left.svg`} alt="Emblem" width="26" height="26" />
						:
						''
				}
				{prop.title}
				{
					arrowPos == 'right' ?
						<Image className="sm:ml-[1rem]" src={`/resources/arrow-right.svg`} alt="Emblem" width="26" height="26" />
						:
						''
				}
			</div>
		)
	}

	const defaultStyle = {
		background: background ? background : 'rgba(255, 255, 255, 1)',
		color: '#2A2A2A',
		fontSize: '18px !important',
		fontWeight: '600 !important',
		boxShadow: `inset 0 ${boxShadow ? boxShadow : '-10px'} 0 rgba(61, 61, 61, 0.11)`,
		paddingBottom: '15px'
	};

	const activeStyle = {
		background: 'rgba(168, 218, 220, 1)',
		color: '#2A2A2A',
		fontSize: '18px !important',
		fontWeight: '600 !important',
		boxShadow: `inset 0 ${boxShadow ? boxShadow : '-10px'} 0 rgba(106, 180, 183, 1)`,
		paddingBottom: '15px',
		opacity: disabled ? '1' : '1'
	};

	useEffect(() => {
		if (isDisabled) {
			setDisabled(true)
		}
	}, [isDisabled])

	return (
		<>
			<ReactiveButton
				className={`primary-1 font-mona-sans-semibold text-primary-1 text-[18px] font-semibold`}
				size="large"
				animation={!disabled}
				disabled={disabled}
				rounded={true}
				block={true}
				height={height ? height : `60px`}
				width={width ? width : null}
				idleText={title ? (hasArrow ? <IndleText title={title} /> : title) : ''}
				onClick={() => {
					btnClick()
				}}
				style={isActive ? activeStyle : defaultStyle}
			/>
		</>
	)
}