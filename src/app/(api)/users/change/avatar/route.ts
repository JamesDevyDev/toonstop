import { NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import { getAuthenticatedUser } from "@/utils/verifyUser";
import User from "@/utils/model/Users";
import cloudinary from "@/utils/cloudinary";

export const POST = async (request: Request) => {
    try {
        await connectDb();

        const body = await request.json();
        const { newAvatar } = body;

        if (!newAvatar) {
            return NextResponse.json('No avatar provided.', { status: 400 });
        }

        const user = await getAuthenticatedUser();
        if (user?.error) {
            return NextResponse.json('User is not authenticated or invalid token.', { status: 400 });
        }

        const loggedInUser = await User.findById(user._id);
        if (!loggedInUser) {
            return NextResponse.json('User not found.', { status: 404 });
        }

        // Delete previous avatar from Cloudinary if it exists and isn't the default one
        if (loggedInUser.avatar && loggedInUser.avatar.includes('cloudinary')) {
            const parts = loggedInUser.avatar.split('/');
            const filename = parts[parts.length - 1];
            const publicId = filename.split('.')[0]; // assuming .jpg or .png etc.

            await cloudinary.uploader.destroy(`avatars/${publicId}`);
        }

        // Upload new avatar to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(newAvatar, {
            folder: "avatars",
            public_id: `avatar_${user._id}`,
            overwrite: true,
        });

        // Save the new avatar URL in the database
        loggedInUser.avatar = uploadResponse.secure_url;
        await loggedInUser.save();

        return NextResponse.json(loggedInUser);
    } catch (error) {
        console.error("Error uploading avatar:", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
};
