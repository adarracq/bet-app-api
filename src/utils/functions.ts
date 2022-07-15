/* eslint-disable indent */
export const validateEmail = (email: string) => {
	const regex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(email);
};

export const getFormattedDate = (date: Date, type = 'full') => {
	if (date != null) {
		const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
		const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
		const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
		const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
		const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
		let res = '';

		switch (type) {
			case 'hours':
				res = `${hour}:${minute}`;
				break;
			case 'days':
				res = date.toLocaleString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
				break;
			case 'months':
				res = date.toLocaleString('fr-FR', { month: 'short', year: 'numeric' });
				break;
			case 'daysFull':
				res = `${day}/${month} - ${hour}:${minute}`;
				break;
			case 'years':
				res = `${day}/${month}/${date.getFullYear()}`;
				break;
			case 'full':
				res = `${day}/${month}/${date.getFullYear()} - ${hour}:${minute}:${seconds}`;
				break;
			default:
				break;
		}
		return res;
	}
	return null;
};

export const millisecondsToFormatDuration = (durationInMilliseconds: number) => {
	let res = '';
	let tmp = durationInMilliseconds;

	tmp = Math.floor(tmp / 1000);
	const diffSec = tmp % 60;
	res = `${tmp % 60}s`;

	tmp = Math.floor((tmp - diffSec) / 60);
	const diffMin = tmp % 60;
	if (diffMin > 0) {
		res = `${diffMin}m${res}`;
	}

	tmp = Math.floor((tmp - diffMin) / 60);
	const diffH = tmp % 24;
	if (diffH > 0) {
		res = `${diffH}h${res}`;
	}

	tmp = Math.floor((tmp - diffH) / 24);
	if (tmp > 0) {
		res = `${tmp}j${res}`;
	}
	return res;
};
