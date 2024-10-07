import Link from "next/link";

const people = [
  { id: 1, name: "All", slug: "all" },
  { id: 2, name: "Design", slug: "design" },
  { id: 3, name: "Development", slug: "development" },
];

export default function ListView({ t }: { t: string }) {
  return (
    <div className="mx-auto w-full pt-10 flex flex-wrap  gap-5">
      {people.map((el) => {
        const href = el.slug === "all" ? `?t=` : `?t=${el.slug}`;
        return (
          <Link
            className="bg-primary text-black min-w-[150px] px-5 py-2 rounded text-center"
            key={el.id}
            href={href}
          >
            {el.name}
          </Link>
        );
      })}
    </div>
  );
}
