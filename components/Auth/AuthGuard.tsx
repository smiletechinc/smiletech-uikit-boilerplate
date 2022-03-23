import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../../hooks/useAuth';

const AuthGuard = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    const { isLoggedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
    const publicPaths = ['/account/login', '/account/register'];
    if (isLoggedIn &&  publicPaths.includes(router.asPath?.split('?')[0])) {
        router.push('/')
      }
    if (!isLoggedIn &&  !publicPaths.includes(router.asPath?.split('?')[0])) {
      router.push('/account/login')
    }
    }, [isLoggedIn, router])



    return <>{children}</>;
};

export default AuthGuard;
