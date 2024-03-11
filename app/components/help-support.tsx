"use client";
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { common } from "./../utils/common";

export function HelpSupport(props: any) {
	const [open, setOpen] = useState<boolean>(false);

	const openHelpSupport = () => {
		// console.log("openHelpSupport");
		setOpen(true)
	}

	return (
		<>
			<div className="help-support fixed bottom-[40px] right-[16px] z-[50] h-[48px] cursor-pointer overflow-hidden font-mona-sans-semibold font-semibold text-[16px] text-primary-2 sm:right-[4rem] md:right-[6rem] lg:right-[8rem] xl:right-[16rem]">
				{
					open ?
						<div
							style={{
								width: open ? '202px' : '0px'
							}}
							className="btn-help-support open-help-support bg-btn-1 h-full flex justify-center items-center p-[16px] rounded-[24px] w-[0px]">
							<Link className="block mr-[8px] break-keep truncate" href={common.helpSupport} rel="noopener noreferrer" target="_blank">Help & Support</Link>
							<Image src={`/resources/cancel.png`} alt="help-support-icon" width="32" height="32" onClick={() => { setOpen(false) }} />
						</div>
						:
						<div className="btn-help-support default-help-support bg-btn-1 flex justify-center items-center rounded-[50%] h-full  w-[48px]"
							onClick={() => { openHelpSupport(); }}>
							<Image src={`/resources/help-support.png`} alt="help-support-icon" width="32" height="32" />
						</div>
				}
			</div>
		</>
	)
}