import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation"
import prismadb from '@/lib/prismadb'

export default async function DashboardLayout({
    children,
    params
}: {
        children: React.ReactNode;
        params: { storedId: string }
        
    }) {
    
    //
    // Error will be removed if you remove the lines from 18 to 38
    //
    
    const { userId } = auth();
   
    if(!userId) {
        redirect('/sign-in');
    }

    //find store by id and userId

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storedId,
            userId
        }
    });

    //if store does not exist, redirect to root

    if (!store) {
        redirect('/');
    }



    return (
        <>
            <div>
                this will be a navbar
            </div>
            {children}
        </>
    );
};