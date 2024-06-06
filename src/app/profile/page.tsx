'use server';

import ProfilInfoForm from "@/components/ProfileInfoForm";

export default async function ProfilPage() {
    return (
        <div className="max-w-2xl mx-auto px-4 mt-4">
            <ProfilInfoForm/>
            <div>
                donations...
            </div>
        </div>
    );
}