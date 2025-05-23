import { NextResponse } from "next/server";
import Count from "@/utils/model/Counts"
import connectDb from "@/utils/connectDb";

export const GET = async () => {
    await connectDb()

    try {
        const visitCount = await Count.findOne()
        return NextResponse.json(visitCount?.visitCount)
    } catch (error) {
        console.log(error)
        return NextResponse.json("Failed to fetch visit count GET", { status: 500 });
    }
}

export const POST = async () => {
    await connectDb()

    try {
        let visitCount = await Count.findOne()
        if (!visitCount) {
            visitCount = await Count.create({ visitCount: 1 });
        } else {
            visitCount.visitCount += 1;
            await visitCount.save();
            return NextResponse.json(visitCount?.visitCount)
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json("Failed to fetch visit count POST", { status: 500 });
    }
}