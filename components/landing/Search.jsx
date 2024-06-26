"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Search() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = (term) => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }

        replace(`${pathname}?${params.toString()}`)
    }

    const debouncedHandleSearch = useDebounce(handleSearch, 500);

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                className="bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md"
                onChange={(e) => {
                    debouncedHandleSearch(e.target.value);
                }}
                defaultValue={searchParams.get('query')?.toString()}
            />
        </div>
    )
}
