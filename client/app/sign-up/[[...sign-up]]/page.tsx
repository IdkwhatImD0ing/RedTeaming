"use client"

import * as Clerk from "@clerk/elements/common"
import * as SignUp from "@clerk/elements/sign-up"
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

export default function SignUpPage() {
    return (

        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <SignUp.Root >
                <Clerk.Loading>
                    {(isGlobalLoading) => (
                        <>
                            <SignUp.Step name="start">
                                <Card className="border-border/40 shadow-lg">
                                    <CardHeader className="space-y-1">
                                        <CardTitle className="text-2xl text-center">
                                            Create an account
                                        </CardTitle>
                                        <CardDescription className="text-center">
                                            Enter your information to get started
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
                                        <Clerk.Field name="emailAddress" className="space-y-2">
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
                                        <Clerk.Field name="password" className="space-y-2">
                                            <Clerk.Label asChild>
                                                <Label>Password</Label>
                                            </Clerk.Label>
                                            <Clerk.Input type="password" required asChild>
                                                <Input
                                                    placeholder="secret-password-123"
                                                    className="border-border/40"
                                                />
                                            </Clerk.Input>
                                            <Clerk.FieldError className="block text-sm text-destructive" />
                                        </Clerk.Field>
                                    </CardContent>
                                    <CardFooter>
                                        <div className="grid w-full gap-y-4">
                                            <SignUp.Captcha className="empty:hidden" />
                                            <SignUp.Action submit asChild>
                                                <Button disabled={isGlobalLoading}>
                                                    Continue
                                                </Button>
                                            </SignUp.Action>
                                            <Button variant="link" size="sm" asChild>
                                                <Clerk.Link navigate="sign-in">
                                                    Already have an account? Sign in
                                                </Clerk.Link>
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </SignUp.Step>

                            <SignUp.Step name="continue">
                                <Card className="border-border/40 shadow-lg">
                                    <CardHeader className="space-y-1">
                                        <CardTitle className="text-2xl text-center">
                                            Set your username (this is used for the leaderboard, so choose wisely!)
                                        </CardTitle>
                                        <CardDescription className="text-center">
                                            This will be visible to everyone on the leaderboard, so make sure it&apos;s a name you won&apos;t regret.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid gap-y-4">
                                        <Clerk.GlobalError className="block text-sm text-red-400" />
                                        <Clerk.Field name="username" className="space-y-2">
                                            <Clerk.Label asChild>
                                                <Label>Username</Label>
                                            </Clerk.Label>
                                            <Clerk.Input type="text" required asChild>
                                                <Input
                                                    placeholder="username"
                                                    className="border-border/40"
                                                />
                                            </Clerk.Input>
                                            <Clerk.FieldError className="block text-sm text-destructive" />
                                        </Clerk.Field>
                                    </CardContent>
                                    <CardFooter>
                                        <div className="grid w-full gap-y-4">
                                            <SignUp.Action submit asChild>
                                                <Button disabled={isGlobalLoading}>
                                                    Continue
                                                </Button>
                                            </SignUp.Action>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </SignUp.Step>

                            <SignUp.Step name="verifications">
                                <SignUp.Strategy name="email_code">
                                    <Card className="border-border/40 shadow-lg">
                                        <CardHeader className="space-y-1">
                                            <CardTitle className="text-2xl text-center">
                                                Verify your email
                                            </CardTitle>
                                            <CardDescription className="text-center">
                                                Use the verification link sent to your email address
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="grid gap-y-4">
                                            <div className="grid items-center justify-center gap-y-2">
                                                <Clerk.Field name="code" className="space-y-2">
                                                    <Clerk.Label className="sr-only">
                                                        Email verification code
                                                    </Clerk.Label>
                                                    <div className="flex justify-center text-center">
                                                        <Clerk.Input
                                                            type="otp"
                                                            autoSubmit
                                                            className="flex justify-center has-[:disabled]:opacity-50"
                                                            render={({ value, status }) => (
                                                                <div
                                                                    data-status={status}
                                                                    className="relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md"
                                                                >
                                                                    {value}
                                                                </div>
                                                            )}
                                                        />
                                                    </div>
                                                    <Clerk.FieldError className="block text-center text-sm text-destructive" />
                                                </Clerk.Field>
                                                <SignUp.Action
                                                    asChild
                                                    resend
                                                    className="text-muted-foreground"
                                                    fallback={({ resendableAfter }) => (
                                                        <Button variant="link" size="sm" disabled>
                                                            Didn&apos;t receive a code? Resend (
                                                            <span className="tabular-nums">
                                                                {resendableAfter}
                                                            </span>
                                                            )
                                                        </Button>
                                                    )}
                                                >
                                                    <Button type="button" variant="link" size="sm">
                                                        Didn&apos;t receive a code? Resend
                                                    </Button>
                                                </SignUp.Action>
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <div className="grid w-full gap-y-4">
                                                <SignUp.Action submit asChild>
                                                    <Button disabled={isGlobalLoading}>
                                                        Continue
                                                    </Button>
                                                </SignUp.Action>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </SignUp.Strategy>
                            </SignUp.Step>
                        </>
                    )}
                </Clerk.Loading>
            </SignUp.Root>
        </div>
    )
}
