import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export const GET = async () => {
    const cookieStore = await cookies();
    const myCookie = cookieStore.get('mature');

    const currentValue = myCookie?.value ?? "0";

    const response = NextResponse.json({ value: currentValue });
    return response
}

export const POST = async () => {
    const cookieStore = await cookies();
    const myCookie = cookieStore.get('mature');

    const currentValue = myCookie?.value ?? "0";
    const newValue = currentValue === "1" ? "0" : "1";


    const response = NextResponse.json({ value: newValue });

    response.cookies.set("mature", newValue, {
        httpOnly: false,
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 14, 
    });

    return response;
};
