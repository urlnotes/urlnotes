'use client';

import {createContext, ReactNode, useContext, useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {CreateLinkForm} from "@/features/links/forms/create-link-form";
import {useRouter} from "next/navigation";

type ContextValues = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

const Context = createContext<ContextValues>({
    open: false,
    setOpen: () => {},
});

export const useLinkCreateDialog = () => useContext(Context);

export function LinkCreateDialogProvider({children}: {children: ReactNode}) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    return (
        <Context.Provider value={{open, setOpen}}>
            {children}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>New link</DialogTitle>
                    </DialogHeader>
                    <CreateLinkForm
                        onSave={() => {
                            setOpen(false);
                            router.push('/app/links');
                        }}
                    />
                </DialogContent>
            </Dialog>
        </Context.Provider>
    );
}