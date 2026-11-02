'use client'

type Props = {
    tags: string[]
    active: string
    setActive: (tag: string) => void
}

export default function FilterBar({ tags, active, setActive }: Props) {
    return (
        <div className="flex flex-wrap gap-3 mb-8 text-center justify-center">
            {tags.map((tag) => (
                <button
                    key={tag}
                    onClick={() => setActive(tag)}
                    className={`rounded-lg px-10 py-1.5 font-dot tracking-[0.15em]  transition
                ${active === tag
                            ? "bg-(--cornell) border-dashed border-2 text-(--ivory)"
                            : "bg-(--ivory) ring-1 ring-(--cornell)  hover:bg-(--cornell) hover:text-(--ivory) text-(--blackbean) hover:scale-105"}`}
                >
                    {tag}
                </button>
            ))}
        </div>
    )
}