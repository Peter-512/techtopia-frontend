import { AMQPChannel, AMQPClient } from '@cloudamqp/amqp-client';

const ATTRACTION_CHANGED_QUEUE = 'attraction-changed-queue';

export async function start() {
	// const url = 'ws://localhost:5672';
	// const amqp = new AMQPWebSocketClient(url, '/', 'myuser', 'mypassword');
	const url = 'http://myuser:mypassword@localhost:5672';
	const amqp = new AMQPClient(url);
	try {
		const conn = await amqp.connect();
		const ch = await conn.channel();
		// attachPublish(ch);
		const q = await ch.queue(ATTRACTION_CHANGED_QUEUE);
		// await q.bind('amq.fanout');
		const consumer = await q.subscribe({ noAck: false }, async (msg) => {
			const event = JSON.parse(msg.bodyToString() ?? '');
			const eventBody = JSON.parse(event.eventBody ?? '');
			console.log(eventBody);
			// await consumer.cancel();
		});
	} catch (err) {
		console.error('Error', err, 'reconnecting in 1s');
		// disablePublish();
		setTimeout(start, 1000);
	}
}

function attachPublish(ch: AMQPChannel) {
	document.forms[0].onsubmit = async (e) => {
		e.preventDefault();
		try {
			await ch.basicPublish('amq.fanout', 'ticket.bought', '', { contentType: 'text/plain' });
		} catch (err) {
			console.error('Error', err, 'reconnecting in 1s');
			disablePublish();
			setTimeout(start, 1000);
		}
	};
}

function disablePublish() {
	document.forms[0].onsubmit = (e) => {
		console.error(e);
		alert('Disconnected, waiting to be reconnected');
	};
}
