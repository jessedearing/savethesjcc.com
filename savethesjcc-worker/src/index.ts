import generateUUIDv7 from './uuidv7';

const SITE_URL = 'https://savethesjcc.com';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		if (request.method === 'POST' && url.pathname.startsWith('/opposition')) {
			const formResponse = await request.formData();
			if (
				isInvalidFormResponse(formResponse.get('name')) ||
				isInvalidFormResponse(formResponse.get('email')) ||
				isInvalidFormResponse(formResponse.get('district')) ||
				isInvalidFormResponse(formResponse.get('testimonial'))
			) {
				return Response.redirect(`${SITE_URL}/invalid`, 307);
			}
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
			return Response.redirect(`${SITE_URL}/thanks`, 303);
		}
		return Response.redirect(`${SITE_URL}/`, 307);
	},
} satisfies ExportedHandler<Env>;

function isInvalidFormResponse(value: (File | string) | null): boolean {
	if (value === null || typeof value !== 'string' || value === '') return true;
	return false;
}
