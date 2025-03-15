import generateUUIDv7 from './uuidv7';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		if (request.method === 'POST' && url.pathname.startsWith('/opposition')) {
			const formResponse = await request.formData();
			if (!formResponse.get('name') && !formResponse.get('email') && !formResponse.get('district') && !formResponse.get('testimonial')) {
				return new Response('Missing fields');
			}
			console.log('Form response', formResponse);
			const insert = env.DB.prepare(
				'INSERT INTO responses (id, fullname, email, district, testimonial, collected_date) values (?, ?, ?, ?, ?, ?)',
			);
			const id = generateUUIDv7();
			const res = await insert
				.bind(
					id,
					formResponse.get('name'),
					formResponse.get('email'),
					formResponse.get('district'),
					formResponse.get('testimonial'),
					new Date().getTime(),
				)
				.run();
			return Response.redirect('http://localhost:1313/thanks', 303);
		}
		return new Response('Save the St Johns Community Center');
	},
} satisfies ExportedHandler<Env>;
