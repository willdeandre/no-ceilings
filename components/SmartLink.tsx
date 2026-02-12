import Link from "next/link";
import type { ComponentProps } from "react";

type SmartLinkProps = ComponentProps<typeof Link> & {
    className?: string;
};

function isExternalHref(href: SmartLinkProps["href"]) {
    if (typeof href !== "string") return false; // URL object or complex href: assume internal
    return href.startsWith("http://") || href.startsWith("https://");
}

export default function SmartLink(props: SmartLinkProps) {
    const { href, ...rest } = props;
    const external = isExternalHref(href);

    return (
        <Link
            href={href}
            {...rest}
            target={external ? "_blank" : rest.target}
            rel={external ? "noopener noreferrer" : rest.rel}
        />
    );
}
