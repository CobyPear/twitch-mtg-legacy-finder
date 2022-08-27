import { env } from '$env/dynamic/private';
import { API } from '$lib/utils/API';

export const client = new API(env.CLIENT_ID, env.CLIENT_SECRET);

