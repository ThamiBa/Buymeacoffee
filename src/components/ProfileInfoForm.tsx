'use client';

import { saveProfile } from "@/actions/profileInfoActions";
import UploadButton from "./UploadButton";
import { useState } from "react";
import { ProfileInfo } from "@/models/ProfileInfo";
import Image from "next/image";

type Props = {
    profileInfo: ProfileInfo|null;
};

export default function ProfilInfoForm({profileInfo}: Props) {

    const [coverUrl, setCoverUrl] = useState(profileInfo?.coverUrl);
    const [avatarUrl, setAvatarUrl] = useState(profileInfo?.avatarUrl);

    async function handleFormActions(formData: FormData) {
        const result = await saveProfile(formData);
        console.log(result);
    }

    return (
        <form action={handleFormActions}>
         <div className="relative border bg-gray-100 rounded-lg h-48 p-4">
            <Image
            src={coverUrl || ''}
            alt="cover image"
            width={1024}
            height={1024}
            className="w-full h-48 object-cover object-center rounded-lg"
            />
                <div className="relative border bg-gray-100 size-24 rounded-full">
                    <div className="rounded-full size-24 overflow-hidden">
                        <Image
                        src={avatarUrl || ''} 
                        alt="avatar" 
                        width={120} 
                        height={120}
                        />
                    </div>
                    
                    <div className="absolute bottom-0 right-0">
                        <UploadButton onUploadComplete={setAvatarUrl}/>
                    </div>
                    
                    <input type="hidden" name="avatarUrl" value={avatarUrl}/>
                </div>
                <div>
                    cover image
                    <UploadButton onUploadComplete={setCoverUrl}/>
                    <input type="hidden" name="coverUrl" value={coverUrl}/>
                </div>
            </div>
            <div>
                <label className="block mt-4" htmlFor="">username</label>
                <input 
                    defaultValue={profileInfo?.username}
                    name="username" 
                    id="usernameIn" 
                    type="text" placeholder="username" />
            </div>
            <div>
                <label className="block mt-4" htmlFor="">display name</label>
                <input 
                    defaultValue={profileInfo?.displayName}
                    name="displayName" 
                    id="displayNameIn" 
                    type="text" placeholder="display name" />
            </div>
            <div>
                <label className="block mt-4" htmlFor="">bio</label>
                <textarea 
                    defaultValue={profileInfo?.bio}
                    id="bioIn" 
                    name="bio" placeholder="bio"></textarea>
            </div>
            <div>
                <button className="mt-4 bg-yellow-300 px-4 py-2 rounded-lg">
                    Save profile
                </button>
            </div>
        </form>
    );
};