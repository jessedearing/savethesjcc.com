export default function generateUUIDv7(timestamp: Date = new Date()): string {
	const serializedTimestamp = timestamp.valueOf().toString(16).padStart(12, '0');
	const baseUUID = crypto.randomUUID();
	return `${serializedTimestamp.slice(0, 8)}-${serializedTimestamp.slice(8, 12)}-7${baseUUID.slice(15)}`;
}
