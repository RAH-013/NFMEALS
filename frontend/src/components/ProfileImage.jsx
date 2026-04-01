import { useState } from "react"

import Image from "../layouts/Images"

function ProfileImage({ user, big = false }) {
    return <Image
        src={`/api/users/me/avatar?u=${user.profileId}`}
        alt={`${user.name} profile`}
        width={big ? "80px" : undefined}
        height={big ? "80px" : undefined}
        className="rounded-full"
    />
}

export default ProfileImage