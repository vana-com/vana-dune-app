"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import styles from "./question.module.css"
import ProgressBar from "@ramonak/react-progress-bar";

import {
	Nav,
	FrameAnimate,
	CustomButton,
	HelpSupport,
	Modal
} from "./../components/components";
import { common } from "../utils/common";
import { questionsArr, answersArr } from "../utils/questions";
import { useCookies } from 'next-client-cookies';

import { Flipper, Flipped } from 'react-flip-toolkit'
// npm i --save-dev @types/lodash.shuffle
import shuffle from 'lodash.shuffle'
import { fn } from '../utils/fn';
export default function QuestionsPage() {

	const router = useRouter();
	const cookies = useCookies();

	// declaration for variables
	const [data, setData] = useState([0, 1, 2, 3])

	const [triggerAnimate, setTriggerAnimate] = useState(false);

	const [fadeClass, setFadeClass] = useState(false);
	const [currentQuestionPage, setQuestionPage] = useState<number>(1); //default == 1, test 10
	const [isLastPage, setIsLastPage] = useState(false);
	const [showModalCoin, setShowModalCoin] = useState(false);

	const [questions, setQuestions] = useState<any>(questionsArr);
	const [answers, setAnswers] = useState<any>(answersArr);

	const [items, setItems] = useState<any>(answersArr[0]);

	const [isQuestionSelected, setIsQuestionSelected] = useState<boolean>(true)

	const alphabetsArr: Array<string> = ["A", "B", "C", "D"]

	// declartion for functions
	const textFade = () => {
		setFadeClass(true)
		setTimeout(() => {
			setFadeClass(false)
		}, 350);
	}

	const resetActiveItems = () => {
		if (items.length == 0) return;
		let newAnswersItem: Array<any> = answers[currentQuestionPage - 1]
		setItems(newAnswersItem);
	};

	const handleClickAnswer = (itemId: any, obj: any) => {
		setIsQuestionSelected(true)
		setItems(items.map((item: any, i: number) => {
			if (i === itemId) {
				return { ...item, active: !item.active }; // Toggle the active state
			} else {
				return { ...item, active: false }; // Keep other items unchanged
			}
		}));
	};

	const onClickPrevious = () => {
		setIsQuestionSelected(true)
		if (currentQuestionPage == 1) {
			return
		}
		let newNumber = currentQuestionPage - 1;
		setQuestionPage(newNumber);

		textFade();
		setTriggerAnimate(triggerAnimate => !triggerAnimate);
		setData(shuffle(data))

		setIsLastPage(false);
	}

	const onClickNext = () => {
		if (currentQuestionPage == questions.length) {
			return;
		}

		const hasActive = items.some((item: any) => item.active);
		if (!hasActive) {
			setIsQuestionSelected(false)
			return
		}

		setIsQuestionSelected(true)
		let newNumber = currentQuestionPage + 1;
		setQuestionPage(newNumber);

		textFade();
		setTriggerAnimate(triggerAnimate => !triggerAnimate);
		setData(shuffle(data))
	}

	const onClickDiscover = () => {
		setIsQuestionSelected(true)
		if (fn.localStorage.get('user_balance')) {
			let user_balance = Number(fn.localStorage.get('user_balance'));
			if (user_balance < 8) {
				showCoins();
				return
			}
		}
		cookies.set('is-clicked-discover', '1');
		router.push("/loading");
	}

	const showCoins = () => {
		setShowModalCoin(true);
	}

	const closeModalCoin = () => {
		setShowModalCoin(false);
	}

	const onClickCoinOk = () => {
		window.open(common.helpSupport, "_blank")
		setTimeout(() => {
			setShowModalCoin(false);
		}, 100);
	}

	const RadioButton = (prop: any) => {
		return (
			<>
				{prop.active ?
					<div className="mr-[12px] flex items-center justify-center rounded-[50%] border-solid border-[1px] border-[#fff] min-h-[26px] min-w-[26px] font-brooklyn font-normal text-[14px]">
						<div className="bg-white h-[18px] w-[18px] rounded-[50%]"></div>
					</div>
					:
					<div className="mr-[12px] flex items-center justify-center rounded-[50%] border-solid border-[1px] border-[#363636] min-h-[26px] min-w-[26px] font-brooklyn font-normal text-[14px]">
						{prop.title}
					</div>
				}
			</>
		)
	}

	// declaration for useEffects
	useEffect(() => {

		if (currentQuestionPage == questions.length) {
			setIsLastPage(true);
		}

		resetActiveItems()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentQuestionPage, questions])
	return (
		<>
			<div className="bg-default min-h-[100vh]">
				<Nav></Nav>

				<div className="content-page h-[calc(100%-62px)] p-[15px] sm:px-[4rem] md:px-[6rem] lg:px-[8rem] xl:px-[10rem]">
					<div>

						{/* <ShuffleApp></ShuffleApp> */}

						<div className="mb-[16px]">
							<div className="mb-[11px] leading-[14px] primary-1 font-mona-sans-semibold text-primary-1 text-[14px] font-semibold">Questions <span className="ml-[5px] text-[24px]">{currentQuestionPage}</span> / {questions.length}</div>
							<div className="rounded-[6px] overflow-hidden">
								<ProgressBar
									completed={currentQuestionPage * (100 / questions.length)}
									bgColor="#EC6A6A"
									borderRadius="0"
									baseBgColor="#fff"
									labelColor="#EC6A6A"
									transitionDuration={`0.5s`}
									height={'11px'}
								/>
							</div>
						</div>

						{/* question list box */}
						{/* add min height */}
						<div className={`min-h-[469px]  rounded-[12px] p-[12px] relative mb-[4rem]`}>
							<div className="relative z-20">
								<div>
									<div className={`${fadeClass ? 'question-shuffle opacity-[0.6] blur-[0.05px]' : ''} relative text-primary-1 text-[16px] font-brooklyn font-bold mb-[12px]`}>
										<p>{questions[currentQuestionPage - 1]}</p>
										<p className={`${fadeClass ? 'next-question' : 'hidden'} absolute top-[0px]`}>{questions[currentQuestionPage + 1] ? questions[currentQuestionPage] : ''}</p>

									</div>
									<div className="mb-[24px] min-h-[calc(469px-(24px+130px))]">

										<Flipper flipKey={data.join('')}>
											<ul className="list">
												{data.map((item: any, index: number) => (
													<Flipped key={item} flipId={item}>
														<li
															className={`font-brooklyn font-normal text-[12px] text-primary flex items-center p-[12px] border-solid border-[1px] border-[#373737] cursor-pointer ${styles.q_button_item} ${items[item].active ? styles.active : ''} ${items[item].active ? styles.pulse : ''} ${!isQuestionSelected ? 'no-selected' : ''}`}
															onClick={() => handleClickAnswer(item, items[item])}
														>
															<RadioButton active={items[item].active} title={alphabetsArr[index]} />
															<div>
																{items[item].name}
															</div>
														</li>
													</Flipped>
												))}
											</ul>
										</Flipper>
										{
											!isQuestionSelected ?

												<div className="relative bottom-0 flex justify-center items-center font-brooklyn font-normal text-[14px] text-[red] mt-[10px]">
													<span>Required answer, please select one.</span>
												</div>
												:

												null
										}

									</div>
								</div>
								{
									isLastPage ?
										<div className="flex items-center justify-center">
											<CustomButton
												width={`216px`}
												height={`55px`}
												boxShadow={`-7px`}
												title={`Discover Now`}
												isActive={true}
												hasArrow={true}
												arrowPos={`right`}
												onClicked={onClickDiscover}
											></CustomButton>
										</div>
										:

										<div
											className={`${currentQuestionPage == 1 ? 'flex items-center justify-center' : ''}`}>
											{
												currentQuestionPage == 1 ?
													<CustomButton
														width={`216px`}
														height={`55px`}
														boxShadow={`-7px`}
														title={`Next`}
														isActive={true}
														hasArrow={true}
														arrowPos={`right`}
														onClicked={onClickNext}
													></CustomButton>
													:

													<div className="block 4xs:flex 4xs:items-center">
														<div className="4xs:flex-1 4xs:mr-[23px]">
															<CustomButton
																className="mr-2"
																height={`54px`}
																boxShadow={`-7px`}
																title={`Previous`}
																hasArrow={true}
																arrowPos={`left`}
																onClicked={onClickPrevious}
															></CustomButton>
														</div>

														<div className="mt-[10px] 4xs:mt-[0] 4xs:w-[130px] xs:w-[35%] sm:w-[40%] md:w-[45%]">
															<CustomButton
																height={`55px`}
																boxShadow={`-7px`}
																title={`Next`}
																isActive={true}
																hasArrow={true}
																arrowPos={`right`}
																onClicked={onClickNext}
															></CustomButton>
														</div>
													</div>
											}

										</div>
								}


							</div>

							<FrameAnimate triggerAnimate={triggerAnimate} />
						</div>
					</div>

					<Modal
						minH={''}
						showModal={showModalCoin}
						closeModal={closeModalCoin}>
						<div className="modal-header text-center mb-[28px]">
							<div className="font-brooklyn font-extrabold text-[20px] mb-[12px]">Uh-Oh, Not Enough Credit</div>
						</div>

						<div className="modal-body mb-[24px] font-brooklyn font-normal text-[16px] px-[5px]">
							<p>{`You don’t have enough credit to generate your character. Please contact VANA support.`}</p>
						</div>

						<div className="modal-footer">
							<CustomButton
								height={`48px`}
								boxShadow={`-7px`}
								title={`Contact VANA Support`}
								isActive={true}
								onClicked={onClickCoinOk}
							></CustomButton>
						</div>
					</Modal>

				</div>
			</div>




			<HelpSupport></HelpSupport>
		</>
	)
}