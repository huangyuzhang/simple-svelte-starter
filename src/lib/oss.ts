import { PUBLIC_OSS_URL } from '$env/static/public';

/**
 * Generate OSS file URL
 * @param folder - folder
 * @param file - file
 * @param extension - optional
 * @returns file URL
 */
export function ossContent(folder: string | undefined, file: string, extension?: string) {
	if (extension) {
		return `${PUBLIC_OSS_URL}${folder ? `/${folder}` : ''}/${file}.${extension}`;
	}
	return `${PUBLIC_OSS_URL}${folder ? `/${folder}` : ''}/${file}`;
}
