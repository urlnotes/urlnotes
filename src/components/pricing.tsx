import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'

export default function Pricing() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mx-auto max-w-2xl space-y-6 text-center">
                    <h1 className="text-center text-4xl font-semibold lg:text-5xl">Pricing</h1>
                    <p>
                        We offers flexible pricing that is prefect fit for all your needs.
                    </p>
                </div>

                <div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-3">
                    <Card className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="font-medium">Free</CardTitle>
                            <span className="my-3 block text-2xl font-semibold">$0 / mo</span>
                            <CardDescription className="text-sm">Per account</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <hr className="border-dashed" />

                            <ul className="list-outside space-y-3 text-sm">
                                {[
                                    'Basic link adding',
                                    'Basic collection adding',
                                ].map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-2">
                                        <Check className="size-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>

                        <CardFooter className="mt-auto">
                            <Button
                                asChild
                                variant="outline"
                                className="w-full">
                                <Link href="/app">Get Started</Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="relative">
                        <span className="bg-linear-to-br absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full from-emerald-400 to-green-300 px-3 py-1 text-xs font-medium text-amber-950 ring-1 ring-inset ring-white/20 ring-offset-1 ring-offset-gray-950/5">Popular</span>

                        <div className="flex flex-col gap-4">
                            <CardHeader>
                                <CardTitle className="font-medium">Free personal</CardTitle>
                                <span className="my-3 block text-2xl font-semibold">$0 / mo</span>
                                <CardDescription className="text-sm">Per account</CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <hr className="border-dashed" />
                                <ul className="list-outside space-y-3 text-sm">
                                    {[
                                        'Everything in free',
                                        'Multiple links',
                                        'Multiple collections',
                                        'Infinite collections per link',
                                        'Link open graph image preview',
                                        'Custom link title'
                                    ].map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-2">
                                            <Check className="size-3" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>

                            <CardFooter>
                                <Button
                                    asChild
                                    className="w-full">
                                    <Link href="/app">Get Started</Link>
                                </Button>
                            </CardFooter>
                        </div>
                    </Card>

                    <Card className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="font-medium">Free Pro</CardTitle>
                            <span className="my-3 block text-2xl font-semibold">$0 / mo</span>
                            <CardDescription className="text-sm">Per account</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <hr className="border-dashed" />

                            <ul className="list-outside space-y-3 text-sm">
                                {[
                                    'All in free personal',
                                    'Link sharing (soon)',
                                    'Collection sharing (soon)'
                                ].map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-2">
                                        <Check className="size-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>

                        <CardFooter className="mt-auto">
                            <Button
                                asChild
                                variant="outline"
                                className="w-full">
                                <Link href="/app">Get Started</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                <div className="mt-8 mx-auto max-w-2xl space-y-6 text-center">
                    <p>
                        Yes. It's free, and always be.
                    </p>
                </div>
            </div>
        </section>
    )
}
