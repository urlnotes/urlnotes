'use client';

import {useQuery} from "@tanstack/react-query";
import {getLinkCollections} from "@/features/collections/server/actions";

export const useLinkCollections = (linkId: string) => useQuery({
    queryKey: ['link-collections', linkId],
    queryFn: () => getLinkCollections(linkId),
});