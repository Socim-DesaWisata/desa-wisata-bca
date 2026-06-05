import { Form, Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    ShieldCheck,
    Users,
} from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import loginLogo from '../../../../resources/js/assets/auth-login-logo.png';
import loginBg from '../../../../design/login-bg.png';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

const roleBadges = [
    ['Admin', 'bg-[#eaf3ff] text-[#0b65d8]'],
    ['Enumerator', 'bg-[#e9fbf7] text-[#20aaa2]'],
    ['Reviewer', 'bg-[#fff4e8] text-[#ee8500]'],
    ['Super Admin', 'bg-[#f2ecff] text-[#6d34e6]'],
] as const;

export default function Login({ status, canResetPassword }: Props) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Head title="Log in" />

            <main
                className="relative min-h-svh overflow-hidden bg-cover bg-center font-bca text-[#0a2246]"
                style={{ backgroundImage: `url(${loginBg})` }}
            >
                <section className="relative z-10 flex min-h-svh items-center justify-end px-4 py-5 sm:px-6 lg:px-14 xl:px-20">

                    <div className="w-full max-w-[520px] rounded-3xl border border-white/70 bg-white/96 px-6 py-7 shadow-[0_22px_70px_rgba(17,55,99,0.18)] backdrop-blur-sm sm:px-8 lg:px-10 lg:py-9">
                        <div className="mx-auto flex max-w-[420px] flex-col items-center">
                            <img
                                src={loginLogo}
                                alt="Desa Wisata BCA"
                                className="h-auto w-[220px] max-w-full object-contain sm:w-[250px]"
                            />

                            <div className="mt-6 space-y-2 text-center">
                                <h1 className="text-2xl leading-tight font-extrabold tracking-normal text-[#081d3e] sm:text-[30px]">
                                    Masuk ke Dashboard
                                </h1>
                                <p className="mx-auto max-w-[390px] text-sm leading-6 font-medium text-[#6d7890] sm:text-[15px]">
                                    Kelola data desa wisata, survey, UMKM, dan
                                    laporan program secara terpusat.
                                </p>
                            </div>

                            {status && (
                                <div className="mt-6 w-full rounded-lg bg-emerald-50 px-4 py-3 text-center text-sm font-semibold text-emerald-700">
                                    {status}
                                </div>
                            )}

                            <Form
                                {...store.form()}
                                resetOnSuccess={['password']}
                                className="mt-6 w-full"
                            >
                                {({ processing, errors }) => (
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="email"
                                                className="sr-only"
                                            >
                                                Email
                                            </Label>
                                            <div className="relative">
                                                <Mail className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-[#687793]" />
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    required
                                                    autoFocus
                                                    tabIndex={1}
                                                    autoComplete="email"
                                                    placeholder="Email"
                                                    aria-invalid={Boolean(
                                                        errors.email,
                                                    )}
                                                    className="h-12 rounded-xl border-[#bcc7d8] bg-white/80 pr-4 pl-12 text-sm font-medium text-[#10264a] shadow-none placeholder:text-[#8a96ad] focus-visible:border-[#0b65d8] focus-visible:ring-[#0b65d8]/15"
                                                />
                                            </div>
                                            <InputError
                                                message={errors.email}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="password"
                                                className="sr-only"
                                            >
                                                Password
                                            </Label>
                                            <div className="relative">
                                                <LockKeyhole className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-[#687793]" />
                                                <Input
                                                    id="password"
                                                    type={
                                                        showPassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    name="password"
                                                    required
                                                    tabIndex={2}
                                                    autoComplete="current-password"
                                                    placeholder="Password"
                                                    aria-invalid={Boolean(
                                                        errors.password,
                                                    )}
                                                    className="h-12 rounded-xl border-[#bcc7d8] bg-white/80 pr-12 pl-12 text-sm font-medium text-[#10264a] shadow-none placeholder:text-[#8a96ad] focus-visible:border-[#0b65d8] focus-visible:ring-[#0b65d8]/15"
                                                />
                                                <button
                                                    type="button"
                                                    aria-label={
                                                        showPassword
                                                            ? 'Hide password'
                                                            : 'Show password'
                                                    }
                                                    className="absolute top-1/2 right-4 -translate-y-1/2 rounded-md p-1 text-[#687793] transition hover:text-[#0b65d8] focus-visible:ring-2 focus-visible:ring-[#0b65d8]/30 focus-visible:outline-none"
                                                    onClick={() =>
                                                        setShowPassword(
                                                            (current) =>
                                                                !current,
                                                        )
                                                    }
                                                    tabIndex={-1}
                                                >
                                                    {showPassword ? (
                                                        <Eye className="size-5" />
                                                    ) : (
                                                        <EyeOff className="size-5" />
                                                    )}
                                                </button>
                                            </div>
                                            <InputError
                                                message={errors.password}
                                            />
                                        </div>

                                        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-sm font-semibold">
                                            <Label
                                                htmlFor="remember"
                                                className="flex cursor-pointer items-center gap-2.5 text-[#263853]"
                                            >
                                                <Checkbox
                                                    id="remember"
                                                    name="remember"
                                                    defaultChecked
                                                    tabIndex={3}
                                                    className="size-5 rounded-[5px] border-[#0b65d8] data-[state=checked]:border-[#0b65d8] data-[state=checked]:bg-[#0b65d8]"
                                                />
                                                Remember me
                                            </Label>

                                            {canResetPassword && (
                                                <Link
                                                    href={request()}
                                                    tabIndex={5}
                                                    className="font-semibold text-[#006be6] transition hover:text-[#004fb3]"
                                                >
                                                    Forgot password?
                                                </Link>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            className="mt-2 flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#0063d8] text-sm font-bold text-white shadow-[0_10px_22px_rgba(0,99,216,0.20)] transition hover:bg-[#005bc8] focus-visible:ring-4 focus-visible:ring-[#0063d8]/20 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70"
                                            tabIndex={4}
                                            disabled={processing}
                                            data-test="login-button"
                                        >
                                            {processing ? <Spinner /> : null}
                                            Masuk ke Dashboard
                                            <ArrowRight className="size-5" />
                                        </button>

                                    </div>
                                )}
                            </Form>

                            <div className="mt-6 h-px w-full bg-[#c7d0df]" />
                            <p className="mt-4 text-center text-xs font-medium text-[#7d8aa0] sm:text-sm">
                                © 2026 PT Bank Central Asia Tbk. All rights
                                reserved.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

Login.layout = {
    fullScreen: true,
};
