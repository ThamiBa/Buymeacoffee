'use client';

import { saveProfile } from "@/actions/profileInfoActions";
import UploadButton from "./UploadButton";
import { useState } from "react";
import { ProfileInfo } from "@/models/ProfileInfo";
import Image from "next/image";
import toast from "react-hot-toast";

type Props = {
    profileInfo: ProfileInfo|null;
};

export default function ProfilInfoForm({profileInfo}: Props) {

    const [coverUrl, setCoverUrl] = useState(profileInfo?.coverUrl);
    const [avatarUrl, setAvatarUrl] = useState(profileInfo?.avatarUrl);

    async function handleFormActions(formData: FormData) {
        const savePromise = new Promise(async (resolve, reject) => {
            const result = await saveProfile(formData);
            resolve(result);
        });

        await toast.promise(
            savePromise,
             {
               loading: 'Saving...',
               success: <b>Profile saved!</b>,
               error: <b>Could not save.</b>,
             }
           );
    }
    return (
        <form action={handleFormActions}>
         <div className="relative border bg-gray-100 rounded-lg h-48 mb-4">
            <Image
            src={coverUrl || ''}
            alt="cover image"
            width={1024}
            height={1024}
            className="w-full h-48 object-cover object-center rounded-lg"
            />
            <div className="absolute left-4 -bottom-4 z-10 border bg-gray-100 size-24 rounded-lg">
                <div className="rounded-lg size-24 overflow-hidden">
                    <Image
                    src={avatarUrl || ''} 
                    alt="avatar" 
                    width={120} 
                    height={120}
                    />
                </div> 
                <div className="absolute -bottom-2 -right-2">
                    <UploadButton onUploadComplete={setAvatarUrl}/>
                </div>
                <input type="hidden" name="avatarUrl" value={avatarUrl}/>
                </div>
                <div className="absolute right-2 bottom-2">
                    <UploadButton onUploadComplete={setCoverUrl}/>
                    <input type="hidden" name="coverUrl" value={coverUrl}/>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
            <div>
                <label className="input-label" htmlFor="">username</label>
                <input 
                    defaultValue={profileInfo?.username}
                    name="username" 
                    id="usernameIn" 
                    type="text" placeholder="username"/>
                
            </div>
            <div>
                <label className="input-label" htmlFor="">display name</label>
                <input 
                    defaultValue={profileInfo?.displayName}
                    name="displayName" 
                    id="displayNameIn" 
                    type="text" placeholder="display name" />
            </div>
            </div>
            <div>
                <label className="input-label" htmlFor="">bio</label>
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