'use client';

import {createContext, ReactNode, useContext, useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {CreateCollectionForm} from "@/features/collections/forms/create-collection-form";
import {useQueryClient} from "@tanstack/react-query";

type ContextValues = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

const Context = createContext<ContextValues>({
    open: false,
    setOpen: () => {},
});

export const useCreateCollectionDialog = () => useContext(Context);

export function CreateCollectionDialogProvider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const client = useQueryClient();

    return (
        <Context.Provider value={{open, setOpen}}>
            {children}

            <Dialog modal={true} open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            New collection
                        </DialogTitle>
                    </DialogHeader>
                    <CreateCollectionForm
                        onCreate={async () => {
                            await client.invalidateQueries({
                                queryKey: ['collections'],
                            });
                            setOpen(false);
                        }}
                    />
                </DialogContent>
            </Dialog>
        </Context.Provider>
    );
}