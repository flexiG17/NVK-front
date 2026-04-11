export const getAvatarIcon = (
  color: string = "#616161",
) => `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_415_108)">
<rect width="60" height="60" rx="30" fill="white"/>
<rect x="18" y="10" width="24" height="24" rx="12" fill="${color}"/>
<rect x="-15" y="40" width="90" height="90" rx="45" fill="${color}"/>
</g>
<rect x="0.5" y="0.5" width="59" height="59" rx="29.5" stroke="#C8C8C8"/>
<defs>
<clipPath id="clip0_415_108">
<rect width="60" height="60" rx="30" fill="white"/>
</clipPath>
</defs>
</svg>`;

// default export for backwards compatibility
export const avatarIcon = getAvatarIcon();
