/**
 * loading items are static only
 * todo: If the client wants to make an API for loading items, 
 * just create an api route; see directory app/api/
 */

const slidesArr: Array<any> = [
	{
		avatar: 'bg-dune',
		name: 'BENE GESSERIT',
		desc: 'The Bene Gesserit are a powerful and secretive sisterhood in the DUNE universe, known for their psychic abilities and manipulation of political and religious affairs. They use their skills to influence the course of history and shape the destiny of individuals and civilizations.',
	},
	{
		avatar: 'bt-dune',
		name: 'BENE TLEILAX',
		desc: 'The Bene Tleilax, also known as the Tleilaxu, are a mysterious and enigmatic society in the DUNE universe specializing in genetic engineering and manipulation. They are skilled in creating clones, gholas, and other biological creations for various purposes, often operating in the shadows to further their own agenda.',
	},
	{
		avatar: 'choam-dune',
		name: 'CHOAM',
		desc: 'CHOAM, short for Combine Honnete Ober Advancer Mercantiles, is a powerful and influential entity in the DUNE universe that controls the economic interests of various noble houses and factions. It plays a pivotal role in the trade of the valuable spice melange and holds significant sway over the political and economic landscape of the universe.',
	},
	{
		avatar: 'fs-dune',
		name: 'Fish Speakers',
		desc: 'The Fish Speakers are an all-female military force in the DUNE universe, trained and loyal to the God Emperor Leto II. They are known for their fierce combat skills, unwavering devotion, and unique connection to the planet Arrakis.',
	},
	{
		avatar: 'fremen-dune',
		name: 'Fremen',
		desc: `The Fremen are the desert-dwelling inhabitants of the planet Arrakis in the DUNE universe, known for their resilience, resourcefulness, and mastery of survival in the harsh desert environment. They are skilled fighters and have a deep cultural connection to the planet's valuable resource, the spice melange.`,
	},
	{
		avatar: 'hm-dune',
		name: 'Honored Matres',
		desc: 'The Honored Matres are a powerful and aggressive faction of women in the DUNE universe, known for their formidable combat skills and control over the spice melange. They are driven by a desire for power and domination, often engaging in ruthless tactics to achieve their goals.',
	},
	{
		avatar: 'ixia-dune',
		name: 'Ixians',
		desc: 'The Ixians are a technologically advanced society in the DUNE universe, known for their expertise in creating advanced machinery and technology. They are often viewed with suspicion by other factions due to their reliance on artificial intelligence and their potential to disrupt the balance of power in the universe.',
	},
	{
		avatar: 'lr-dune',
		name: 'Landsraad',
		desc: 'The Landsraad is a council of noble houses in the DUNE universe, responsible for governing and making decisions that affect the various factions and planets within the Imperium. It serves as a forum for political negotiations, alliances, and conflicts among the powerful and influential houses of the universe.',
	},
	{
		avatar: 'mentats-dune',
		name: 'Mentats',
		desc: 'Mentats are human computers in the DUNE universe, trained to analyze information, make complex calculations, and provide strategic advice to their employers. They possess enhanced cognitive abilities and serve as valuable advisors to various factions and individuals in the Imperium.',
	},
	{
		avatar: 'pe-dune',
		name: 'Padishah Emperors',
		desc: 'The Padishah Emperors are the rulers of the Known Universe in the DUNE series, holding immense power and influence over the various noble houses and factions. They are often involved in political intrigue, power struggles, and alliances to maintain control and stability within the Imperium.',
	},
	{
		avatar: 'rkp-dune',
		name: 'Rakian Priesthood',
		desc: 'The Rakian Priesthood is a religious order in the DUNE universe, dedicated to the worship of the God Emperor Leto II. They play a significant role in propagating the religion of Leto and maintaining social order within the Imperium.',
	},
	{
		avatar: 'sard-dune',
		name: 'Sardaukar',
		desc: 'The Sardaukar are the elite and highly trained imperial soldiers in the DUNE universe, loyal to the Padishah Emperor and feared for their formidable combat skills and discipline. They are used as a tool of the Emperor to maintain control and enforce his will throughout the Imperium.',
	},
	{
		avatar: 'sg-dune',
		name: 'Spacing Guild',
		desc: 'The Spacing Guild is a powerful faction in the DUNE universe, responsible for controlling space travel through the use of the Navigators who guide ships through foldspace. They hold a monopoly on interstellar transportation and play a crucial role in the economy and politics of the Imperium.',
	},
	{
		avatar: 'ss-dune',
		name: 'Suk School',
		desc: 'The Suk School is a medical order in the DUNE universe, known for their advanced knowledge and skills in healing and medicine. They are highly sought after for their expertise in treating injuries and illnesses, and their services are valued by various factions in the Imperium.',
	},
	{
		avatar: 'sog-dune',
		name: 'Swordmasters of Ginaz',
		desc: 'The Swordmasters of Ginaz are a legendary warrior brotherhood in the DUNE universe, known for their exceptional skill in combat and mastery of various forms of martial arts. They are highly respected and sought after for their expertise in training warriors and serving as bodyguards for noble houses and important individuals.',
	},
	{
		avatar: 'tm-dune',
		name: 'Thinking Machines',
		desc: 'The Thinking Machines in the DUNE universe are artificial intelligence entities that rebelled against humanity in a war known as the Butlerian Jihad. As a result of this conflict, the use of AI and advanced technology has been strictly forbidden in the Imperium, shaping the society and culture of the DUNE universe.',
	},
	{
		avatar: 'titan-dune',
		name: 'Titans',
		desc: 'In the DUNE universe, the Titans were powerful and wealthy families who controlled vast resources and technologies before the rise of the Great Houses. Their influence and legacy continue to shape the political landscape of the Imperium, with their descendants often holding key positions of power and influence',
	},
]

// initial waiting time
const waitingTime: any = process.env.NEXT_PUBLIC_LOADING_TIME;
const speedPerSlide: number = waitingTime / slidesArr.length;

export {
	slidesArr,
	speedPerSlide
}