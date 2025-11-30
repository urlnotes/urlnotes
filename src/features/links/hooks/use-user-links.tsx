'use client';

import {useQuery} from "@tanstack/react-query";
import {getHosts, getLinks} from "@/features/links/server/actions";

export function useUserLinks(
    filters: {
        host: string | null,
        search: string,
        collectionId?: string;
    }) {
    return useQuery({
        queryKey: ['links', filters],
        queryFn: () => getLinks(filters),
        placeholderData: prev => prev,
    });
}

export function useUserHosts(collectionId?: string) {
    return useQuery({
        queryKey: ['hosts', collectionId ?? null],
        queryFn: async () => (await getHosts({collectionId})).map(i => i.host),
    });
}
