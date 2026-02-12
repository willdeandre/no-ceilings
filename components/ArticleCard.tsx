import Image from "next/image";
import Link from "next/link";
import SmartLink from "@/components/SmartLink";


interface ArticleProps {
    title: string;
    author: string;
    href: string;
    img: string;
    authorImg: string;
}

export default function ArticleCard({ title, author, href, img, authorImg }: ArticleProps) {
    return (
        <Link
            href={href}
            className="group relative overflow-hidden rounded-[2rem] bg-zinc-900 aspect-[4/5] transition-all hover:-translate-y-2 border border-white/5 hover:border-white/15"
        >
            {/* Background Image with Zoom Effect */}
            <Image
                src={img}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110 transform-gpu will-change-transform"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

            {/* Content Area */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="flex items-center gap-2">
                    <p className="text-[10px] font-black tracking-widest text-brand-orange uppercase">
                        {author}
                    </p>

                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20">
                        <Image src={authorImg} alt={author} fill className="object-cover" />
                    </div>
                </div>

                <h3 className="mt-3 text-xl font-bold text-white leading-tight">
                    {title}
                </h3>

                <div className="mt-4 inline-flex items-center text-xs font-bold text-white uppercase tracking-tighter">
                    Read Article{" "}
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">
                        →
                    </span>
                </div>
            </div>
        </Link>
    );
}