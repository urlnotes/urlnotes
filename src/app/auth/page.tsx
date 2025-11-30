import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import SignInButton from "@/components/sign-in-button";
import {Logo} from "@/components/logo";
import Link from "next/link";

export default async function AuthPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (session) {
        redirect('/app');
    }

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='w-full max-w-md space-y-4'>
                <Link href='/' className='block text-center'>
                    <Logo />
                </Link>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Sign in
                        </CardTitle>
                        <CardDescription>
                            You need to sign in to your account to continue.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SignInButton />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}