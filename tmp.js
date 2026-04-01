
export const getUserAvatarService = async (userId, res) => {
    const profile = await UserProfile.findOne({
        where: { userId },
        attributes: ['name', 'profilePicture']
    });

    if (!profile) {
        const err = new Error("Avatar no encontrado");
        err.code = "AVATAR_NOT_FOUND";
        err.status = 404;
        throw err;
    }

    const { name, profilePicture } = profile;

    if (profilePicture) {
        try {
            const response = await fetch(profilePicture);

            if (response.ok) {
                res.setHeader('Content-Type', response.headers.get('content-type'));
                res.setHeader('Cache-Control', 'public, max-age=86400');
                return response.body.pipe(res);
            }
        } catch (_) { }
    }

    const initial = (name?.trim()?.[0] || '?').toUpperCase();

    const hash = createHash('md5').update(userId).digest('hex');

    const hue1 = parseInt(hash.slice(0, 2), 16) * 360 / 255;
    const hue2 = (hue1 + 40) % 360;

    const color1 = `hsl(${hue1}, 65%, 35%)`;
    const color2 = `hsl(${hue2}, 65%, 25%)`;

    const svg = `
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="${color1}" />
                    <stop offset="100%" stop-color="${color2}" />
                </linearGradient>
            </defs>

            <rect width="100%" height="100%" fill="url(#g)" />

            <text 
                x="50%" 
                y="50%" 
                dy=".35em" 
                text-anchor="middle" 
                fill="#ffffff"
                stroke="#000000"
                stroke-width="1.2"
                paint-order="stroke"
                font-size="42" 
                font-family="Arial, sans-serif" 
                font-weight="bold">
                ${initial}
            </text>
        </svg>
    `;

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=86400');

    res.send(svg);
};