"use client";
// https://cookpete.github.io/react-player/
// https://github.com/cookpete/react-player?tab=readme-ov-file
import React from 'react'
// import ReactPlayer from 'react-player'
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
			{/* used this one to solve the autoplay on ios chrome */}
			<video autoPlay muted playsInline loop width="auto" height="auto">
				<source src={videoUrl} type="video/mp4" />
			</video>

			{/* <ReactPlayer
				playsinline={true}
				width={'auto'}
				height={'auto'}
				loop={true}
				muted={true}
				url={videoUrl}
				volume={1}
				playing={false}
				style={style} /> */}
		</div>
	)
}