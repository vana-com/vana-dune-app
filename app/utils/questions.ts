/**
 * Questions and anwers are static only
 * todo: If the client wants to make an API for this question and answer list, 
 * just create an api route; see directory app/api/
 */
const questionsArr: Array<string> = [
	'How do you prefer to handle conflicts?', // default first question
	'What do you value most in society?',
	`What's your ideal environment?`,
];

const answersArr: Array<any> = [
	// default first answers
	[
		{ id: 1, title: 'A', name: 'Through alliances and diplomacy.', active: false },
		{ id: 2, title: 'B', name: 'With strength and direct confrontation.', active: false },
		{ id: 3, title: 'C', name: 'Using secrets and intelligence.', active: false },
		{ id: 4, title: 'D', name: 'With technology and innovation.', active: false },
	],
	[
		{ id: 1, title: 'A', name: 'Knowledge and education.', active: false },
		{ id: 2, title: 'B', name: 'Tradition and heritage.', active: false },
		{ id: 3, title: 'C', name: 'Power and control.', active: false },
		{ id: 4, title: 'D', name: 'Spirituality and philosophy.', active: false },
	],
	[
		{ id: 1, title: 'A', name: 'Harsh, survival-testing.', active: false },
		{ id: 2, title: 'B', name: 'Culturally and historically rich.', active: false },
		{ id: 3, title: 'C', name: 'Center of innovation.', active: false },
		{ id: 4, title: 'D', name: 'Quiet, contemplative.', active: false },
	],
];

export {
	questionsArr,
	answersArr
}