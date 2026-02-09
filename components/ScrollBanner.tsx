"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ScrollBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // show banner once user scrolls down a bit
            setVisible(window.scrollY > 600);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`fixed bottom-0 left-0 w-full bg-green-600 flex justify-center items-center transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-full"
                }`}
            style={{ height: "50px", zIndex: 50 }}
        >
            <Image
                src="/hat_logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="object-contain"
            />
        </div>
    );
}
