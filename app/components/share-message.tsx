"use client";

import { useState, useEffect } from 'react';
import { CustomButton } from "./components";
import { useRouter } from 'next/navigation';
export function ShareMessage() {
	const [open, setOpen] = useState(false);
	const router = useRouter()

	const [isNavColorChange, setNavColor] = useState(false);
	const changeNavbarColor = () => {
		if (window.scrollY >= 80) {
			setNavColor(true);
		} else {
			setNavColor(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", changeNavbarColor);

		return () => {
			window.removeEventListener("scroll", changeNavbarColor);
		}
	}, [])


	const onClickFindOut = () => {
		router.push("/")
	}

	return (
		<>
			<div className={`${isNavColorChange ? 'bg-[#E5C9C3]' : 'bg-[transparent]'}  transition-all duration-500 sticky top-0 z-[50] p-[16px] pt-[10px]`}>
				<div className=" sm:px-[4rem] md:px-[6rem] lg:px-[8rem] xl:px-[10rem] 2xl:w-[1200px] 2xl:mx-auto">
					<div className="font-mona-sans-bold font-bold text-[18px] text-primary-6">Which Dune character are you?</div>

					<div className="font-brookly font-normal text-[12px] text-primary-6">
						<p>Embark on a journey through the sands of Arrakis and discover which iconic character from Dune, resonates with you the most.</p>
					</div>

					<div className="w-[212px] mx-auto mt-[12px]">
						<CustomButton
							height={`48px`}
							boxShadow={`-7px`}
							title={`Find Out Yours Here`}
							isActive={true}
							arrowPos={`right`}
							onClicked={onClickFindOut}
						></CustomButton>
					</div>
				</div>
			</div>
		</>
	)
}
