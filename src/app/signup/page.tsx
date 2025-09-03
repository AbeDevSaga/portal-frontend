"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/common/components/ui/button";

export default function SignupPage() {
    const t = useTranslations();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {t('Account Registration')}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        {t('Contact your administrator to create an account')}
                    </p>
                </div>
                <div className="mt-8 space-y-6">
                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            {t('For account creation, please contact your system administrator.')}
                        </p>
                    </div>
                    <div className="text-center">
                        <Link href="/">
                            <Button variant="outline">
                                {t('Back to Home')}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
