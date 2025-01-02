"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const activeFitler = searchParams.get("capacity") ?? "all";
  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="border border-primary-800 flex">
      <Button
        filter={"all"}
        handleFilter={handleFilter}
        activeFitler={activeFitler}
      >
        All
      </Button>
      <Button
        filter={"small"}
        handleFilter={handleFilter}
        activeFitler={activeFitler}
      >
        1&mdash;3 guests
      </Button>
      <Button
        filter={"medium"}
        handleFilter={handleFilter}
        activeFitler={activeFitler}
      >
        4&mdash;7 guests
      </Button>
      <Button
        filter={"large"}
        handleFilter={handleFilter}
        activeFitler={activeFitler}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

export default Filter;

function Button({ filter, handleFilter, activeFitler, children }) {
  return (
    <button
      onClick={() => handleFilter(filter)}
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFitler ? "bg-primary-700 text-primary-50" : ""
      }`}
    >
      {children}
    </button>
  );
}
