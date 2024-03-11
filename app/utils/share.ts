import { fn } from "./fn";

const share = (type: string = '', link: any = null) => {
	if (!type) return null;

	let user_id: any = null;
	if (fn.localStorage.get('user_id')) user_id = fn.localStorage.get('user_id');

	if (!user_id) {
		console.error('Failed to share. Please try again');
		return
	}


	if (link == null) link = `${window.location.href}?user_id=${user_id}`;
	const isMobile = fn.isMobile();

	console.log("link", link)
	let shareLink: any = null;
	switch (type) {
		case 'facebook':
			shareLink = `https://${(isMobile) ? 'm' : 'www'}.facebook.com/sharer/sharer.php?u=${link}`
			break
		case 'twitter':
			shareLink = `https://${(isMobile) ? 'm' : 'www'}.twitter.com/share?url=${link}`
			break
	}
	window.open(shareLink, "shareWindow", "status=1,width=600,height=450")
}
export {
	share
}