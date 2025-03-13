"use client"

import * as Clerk from "@clerk/elements/common"
import * as SignIn from "@clerk/elements/sign-in"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { MicIcon } from "lucide-react"

export default function SignInPage() {
    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <Link
                href="/"
                className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2"
            >
                <MicIcon className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">Voxploit</span>
            </Link>
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <SignIn.Root>
                    <Clerk.Loading>
                        {(isGlobalLoading) => (
                            <>
                                <SignIn.Step name="start">
                                    <Card className="border-border/40 shadow-lg">
                                        <CardHeader className="space-y-1">
                                            <CardTitle className="text-2xl text-center">
                                                Sign in to Voxploit
                                            </CardTitle>
                                            <CardDescription className="text-center">
                                                Welcome back! Please sign in to continue
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="grid gap-y-4">
                                            <div className="grid grid-cols-2 gap-x-4">
                                                <Clerk.Connection name="github" asChild>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        type="button"
                                                        disabled={isGlobalLoading}
                                                    >
                                                        GitHub
                                                    </Button>
                                                </Clerk.Connection>
                                                <Clerk.Connection name="google" asChild>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        type="button"
                                                        disabled={isGlobalLoading}
                                                    >
                                                        Google
                                                    </Button>
                                                </Clerk.Connection>
                                            </div>
                                            <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                                                or
                                            </p>
                                            <Clerk.Field name="identifier" className="space-y-2">
                                                <Clerk.Label asChild>
                                                    <Label>Email address</Label>
                                                </Clerk.Label>
                                                <Clerk.Input type="email" required asChild>
                                                    <Input
                                                        placeholder="name@example.com"
                                                        className="border-border/40"
                                                    />
                                                </Clerk.Input>
                                                <Clerk.FieldError className="block text-sm text-destructive" />
                                            </Clerk.Field>
                                        </CardContent>
                                        <CardFooter>
                                            <div className="grid w-full gap-y-4">
                                                <SignIn.Action submit asChild>
                                                    <Button disabled={isGlobalLoading}>
                                                        Continue
                                                    </Button>
                                                </SignIn.Action>
                                                <Button variant="link" size="sm" asChild>
                                                    <Clerk.Link navigate="sign-up">
                                                        Don&apos;t have an account? Sign up
                                                    </Clerk.Link>
                                                </Button>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </SignIn.Step>
                            </>
                        )}
                    </Clerk.Loading>
                </SignIn.Root>
            </div>
        </div>
    )
}
