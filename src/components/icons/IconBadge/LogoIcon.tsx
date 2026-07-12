export function LogoIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M7.5 7.5 L16.5 16.5" strokeWidth="3.2" />
            <path d="M16.5 7.5 L7.5 16.5" strokeWidth="3.2" />
            <circle cx="19.2" cy="5" r="1.15" fill="currentColor" stroke="none" />
            <circle cx="5" cy="19" r="0.85" fill="currentColor" stroke="none" />
        </svg>
    );
}
