'use server';

import ProfilInfoForm from "@/components/ProfileInfoForm";
import { authOptions } from "@/lib/authOptions";
import { ProfileInfoModel } from "@/models/ProfileInfo";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export default async function ProfilPage() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return 'not logged in';
    }

    const email = session.user?.email;
    await mongoose.connect(process.env.MONGODB_URI as string);
    const profileInfoDoc = JSON.parse(JSON.stringify(
        await ProfileInfoModel.findOne({email})));
    

    return (
        <div className="max-w-2xl mx-auto px-4 mt-4">
            <ProfilInfoForm profileInfo={profileInfoDoc}/>
            <div>
                donations...
            </div>
        </div>
    );
}