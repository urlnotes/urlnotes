'use client';

import {useQuery} from "@tanstack/react-query";
import {getUserCollections} from "@/features/collections/server/actions";

export const useUserCollections = () => useQuery({
    queryKey: ['collections'],
    queryFn: () => getUserCollections(),
    refetchOnWindowFocus: false,
});