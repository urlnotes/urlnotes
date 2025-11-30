'use server';

import {db} from "@/lib/db/client";
import {user} from "@/lib/db/schema";

export const updateThumIoID = async (id: string|null) => {
    return db
        .update(user)
        .set({
            thumio_id: id,
        });
}