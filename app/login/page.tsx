"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import LoadingComponent from "@/components/common/LoadingComponent";
import jwt from "jsonwebtoken";
import { ALL_MENU_ITEMS } from "@/utils/constants/MenuItems";
import { useFormik } from "formik";
import Link from "next/link";
import ConstructForm from "@/components/common/FormConstructor";
import crrsaLogin from "@/public/images/crrsa-login.png";
import {
    loginEmail,
    loginPhone,
    loginFayda,
    loginEmailInitialValues,
    loginFaydaInitialValues,
    loginPhoneInitialValues,
} from "@/forms/loginForm";
import useRenderFormItem from "@/components/common/useRenderFormItem";
import { toast } from "sonner";
import CustomSelectComponent from "@/components/common/CustomSelectComponent";
import { Label } from "recharts";
import { Airplay, House, Loader } from "lucide-react";
import {
    loginEmailSchema,
    loginFaydaSchema,
    loginPhoneSchema,
} from "@/forms/schemas/loginFormSchema";
import Image from "next/image";
import { useTranslations } from "next-intl";
import ellipse from "@/public/images/Ellipse-25.svg";
import looper from "@/public/images/Looper-bg.svg";
import { LanguageSwitcher } from "@/components/common/LanguageSelector";
import fayda from "@/public/images/fayda.svg";
import phone from "@/public/images/phone.svg";
import lock from "@/public/images/lock.svg";
import useSignupandloginoptions from "@/hooks/useSignupandloginoptionsHooks";
import { showSuccess } from "@/components/common/CustomToast";

const LoginPage = () => {
    const t = useTranslations();
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const decodedToken: any = jwt.decode(session?.user.access_token);
        const userRoles = decodedToken?.resource_access["crrsa_service"]?.roles;
        const userRole = userRoles ? userRoles[0] : null;
        const navLinks = ALL_MENU_ITEMS;
        const filteredRoutes = userRole
            ? navLinks.filter((link: any) => link.roles.includes(userRole))
            : [];

        if (sessionStatus === "authenticated") {
            if (filteredRoutes.length > 0) {
                router.replace(filteredRoutes[0].path);
            } else {
                router.replace("/");
            }
        }
    }, [sessionStatus, router]);

    const handleSubmitLogin = async (submittedData: any) => {
        setLoading(true);

        console.log("submittedData", submittedData);

        const loginData = {
            username: submittedData.username,
            password: submittedData.password,
        };

        setTimeout(() => {
            setLoading(false);
            showSuccess("Logged in Successfully!");
            router.push("/users/features/birth-registration/new");
        }, 2000);

        // router.push("/home");

        // for login api integration use this
        // const res = await signIn("credentials", {
        //     redirect: false,
        //     ...loginData,
        // });

        // if (res?.error) {
        //     setError("Invalid username or password");
        //     showError("Invalid username or password");
        //     if (res?.url) router.replace("/");
        //     setLoading(false);
        // } else {
        //     setError("");
        //     showSuccess("Logged in Successfully!");
        //     setLoading(false);
        // }
    };

    const [selectedLoginOption, setSelectedLoginOption] = useState<
        "email" | "fayda" | "phone"
    >("email");

    // Create a handler function for the select component
    const handleLoginOptionChange = (value: string) => {
        setSelectedLoginOption(value as "email" | "fayda" | "phone");
    };

    const initialValueTypes = {
        email: loginEmailInitialValues,
        fayda: loginFaydaInitialValues,
        phone: loginPhoneInitialValues,
    };
    const formData = {
        email: loginEmail,
        fayda: loginFayda,
        phone: loginPhone,
    };

    const validationSchemaOptions = {
        email: loginEmailSchema,
        fayda: loginFaydaSchema,
        phone: loginPhoneSchema,
    };
    const { optionsLoginAndSignup } = useSignupandloginoptions();

    const {
        resetForm,
        values,
        errors,
        handleBlur,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
    } = useFormik({
        initialValues: {
            ...initialValueTypes[selectedLoginOption],
            rememberPassword: false,
        },
        validationSchema: validationSchemaOptions[selectedLoginOption],
        onSubmit: handleSubmitLogin,
    });

    const { renderFormInput } = useRenderFormItem({
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
        setFieldValue,
    });
    useEffect(() => {
        resetForm();
    }, [selectedLoginOption]);

    if (sessionStatus === "loading") {
        return <LoadingComponent />;
    }
    return (
        sessionStatus !== "authenticated" && (
            <div className='min-h-screen font-barlow flex items-center justify-center px-5 relative overflow-clip bg-[#E1E7Ea]'>
                <div className='absolute h-full w-full z-10 md:bottom-40 lg:left-[15rem]'>
                    <div className='flex-1 relative h-full w-full min-h-[70vh] lg:min-h-[125vh]'>
                        <Image src={looper.src} alt='looper' fill></Image>
                    </div>
                </div>
                <div className='absolute top-20 md:-bottom-36 right-[20rem] w-[125vw] z-10 h-[500px]'>
                    <div className='flex-1 relative h-full w-full '>
                        <Image src={ellipse.src} alt='ellipse' fill></Image>
                    </div>
                </div>
                <div className='z-30 bg-white flex w-full max-w-[1400px] rounded-lg px-5 md:px-10'>
                    <div className='pt-5 flex gap-2 items-center h-fit'>
                        <Button
                            asChild
                            className='w-full shadow-lg bg-[#E1E7EA] text-[#073954] hover:text-white'
                        >
                            <Link href='/home'>
                                <House size={20} />
                            </Link>
                        </Button>
                        <LanguageSwitcher />
                    </div>
                    <div className='w-full md:flex-1 border-r px-10 hidden md:flex items-center justify-center py-20'>
                        <div className='relative w-full aspect-square max-w-[300px]'>
                            <Image
                                src={crrsaLogin.src}
                                alt='crrsa-login'
                                className='object-contain'
                                fill
                            />
                        </div>
                    </div>
                    <div className='flex-1 w-full h-full min-h-[500px] text-[#073954] flex flex-col justify-center md:px-10 py-20'>
                        <div className='w-full flex justify-center'>
                            <form
                                onSubmit={handleSubmit}
                                className='max-w-[350px] w-full space-y-8'
                            >
                                <div className='text-center'>
                                    <h1 className='font-bold text-4xl text-[#073954]'>
                                        {t("log-in")}
                                    </h1>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='space-y-1 w-full'>
                                        <Label className='flex gap-1'>
                                            <p>Login using</p>
                                        </Label>
                                        <CustomSelectComponent
                                            name='loginOption'
                                            value={selectedLoginOption}
                                            options={optionsLoginAndSignup}
                                            onChange={handleLoginOptionChange}
                                            placeholder='Select login option'
                                        />
                                    </div>
                                </div>
                                <div className='space-y-8 max-w-[350px]'>
                                    <ConstructForm
                                        handleChange={handleChange}
                                        touched={touched}
                                        values={values}
                                        errors={errors}
                                        showTitle={false}
                                        formData={formData[selectedLoginOption]}
                                        handleBlur={handleBlur}
                                        handleSubmit={handleSubmit}
                                        setFieldValue={setFieldValue as any}
                                    />
                                    <div className='flex justify-between items-center'>
                                        <div>
                                            {renderFormInput({
                                                label: "remember-me",
                                                name: "rememberPassword",
                                                type: "checkbox",
                                                required: false,
                                            })}
                                        </div>
                                        <Link
                                            href='#'
                                            className='text-sm font-semibold'
                                        >
                                            {t("forgot-password")}
                                        </Link>
                                    </div>
                                    <Button
                                        type='submit'
                                        disabled={loading}
                                        className='w-full shadow-lg bg-[#073954]'
                                    >
                                        {loading ? (
                                            // <span>{t("loggin-in")}</span>
                                            <Loader className='animate-spin' />
                                        ) : (
                                            <span> {t("log-in")}</span>
                                        )}
                                    </Button>
                                </div>
                                <div className='flex gap-2 items-center justify-center'>
                                    <p className='text-xl'>
                                        {t("dont-have-an-account")}
                                    </p>
                                    <Link
                                        href='/signup'
                                        className='font-semibold text-xl'
                                    >
                                        {t("sign-up")}
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default LoginPage;
