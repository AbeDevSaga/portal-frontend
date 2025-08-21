import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
    const cookieLocale = cookies().get("NEXT_LOCALE")?.value;
    const locale = cookieLocale || "en";

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default,
    };
});
