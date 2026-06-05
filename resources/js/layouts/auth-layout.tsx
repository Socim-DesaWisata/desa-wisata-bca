import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';

export default function AuthLayout({
    title = '',
    description = '',
    fullScreen = false,
    children,
}: {
    title?: string;
    description?: string;
    fullScreen?: boolean;
    children: React.ReactNode;
}) {
    if (fullScreen) {
        return <>{children}</>;
    }

    return (
        <AuthLayoutTemplate title={title} description={description}>
            {children}
        </AuthLayoutTemplate>
    );
}
