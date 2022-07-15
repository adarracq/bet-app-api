// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import http from 'http';
import { Socket } from 'socket.io';

export const prodOptions = { path: '/triple/socket.io' };

export const devOptions = {
	cors: {
		origin: '*',
	},
};

const socket = require('socket.io');
let io: Socket;

export const connect = (server: http.Server, subPath = process.env.SUB_PATH) => {
	if (subPath) {
        io = socket(prodOptions);
	} else {
		io = socket(devOptions);
	}
};

export const emit = (topic: string, message: any) => {
	io.emit(topic, message);
};

export const on = (topic: string, _callback: () => {}) => {
	io.on(topic, () => {
		_callback();
	});
};

export const removeAllListeners = (topic: string) => {
	io.removeAllListeners(topic);
};
