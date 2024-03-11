"use client";
// https://cookpete.github.io/react-player/
// https://github.com/cookpete/react-player?tab=readme-ov-file
import React from 'react'
import ReactPlayer from 'react-player'
export function Video(props: any) {
	const videoUrl: string = "/video/result.mp4";

	const style: any = {
		height: 'auto',
		width: '100%',
		borderRadius: '8px',
		margin: 'auto',
	};
	return (
		<div className="overflow-hidden rounded-[6px] min-h-[167px] flex items-center">
			<ReactPlayer
				width={'auto'}
				height={'auto'}
				url={videoUrl}
				playing={true}
				muted={true}
				loop={true}
				style={style} />
		</div>
	)
}