'use client';

import { saveProfile } from "@/actions/profileInfoActions";

export default function ProfilInfoForm() {
    async function handleFormActions(formData: FormData) {
        const result = await saveProfile(formData);
        console.log(result);
    }
    return (
        <form action={handleFormActions}>
         <div className="bg-gray-200 p-4 rounded-lg">
                <div className="bg-gray-300 size-24 rounded-full p-6">avatar</div>
                <div>cover image</div>
            </div>
            <div>
                <label className="block mt-4" htmlFor="">username</label>
                <input name="username" id="usernameIn" type="text" placeholder="username" />
            </div>
            <div>
                <label className="block mt-4" htmlFor="">display name</label>
                <input name="displayName" id="displayNameIn" type="text" placeholder="display name" />
            </div>
            <div>
                <label className="block mt-4" htmlFor="">bio</label>
                <textarea id="bioIn" name="bio" placeholder="bio"></textarea>
            </div>
            <div>
                <button className="mt-4 bg-yellow-300 px-4 py-2 rounded-lg">
                    Save profile
                </button>
            </div>
        </form>
    );
};