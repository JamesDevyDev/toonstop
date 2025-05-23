import { NextResponse } from "next/server";
import Count from "@/utils/model/Counts"
import connectDb from "@/utils/connectDb";

export const GET = async () => {
    await connectDb()

    try {
        const readCount = await Count.findOne()
        return NextResponse.json(readCount?.readCount)
    } catch (error) {
        console.log(error)
        return NextResponse.json("Failed to fetch read count GET", { status: 500 });
    }
}

export const POST = async () => {
    await connectDb()

    try {
        let readCount = await Count.findOne()
        if (!readCount) {
            readCount = await Count.create({ readCount: 1 });
        } else {
            readCount.readCount += 1;
            await readCount.save();
            return NextResponse.json(readCount?.readCount)
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json("Failed to fetch read count POST", { status: 500 });
    }
}