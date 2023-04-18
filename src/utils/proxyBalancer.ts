import { PROXY_SERVER } from '~/constants';

const servers: string[] = JSON.parse(
    String(process.env.NEXT_PUBLIC_UPSTREAM_PROXY_SERVERS),
);

let current = -1;

export default function round_robin_server(): string {
    //safety for old config
    if (!servers || servers.length === 0) return PROXY_SERVER as string;

    current === servers.length - 1 ? (current = 0) : current++;
    return servers[current];
}
