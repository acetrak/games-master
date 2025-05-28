import { useLoaderData } from "@remix-run/react";
export async function loader() {
  const res = await fetch("https://www.cheapshark.com/api/1.0/stores");

  return await res.json();
}

function Stores() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 grid-rows-auto gap-6">
        {data.map((item: any) => (
          <div
            className=" border-2 rounded-2xl p-4 flex flex-col items-center cursor-pointer"
            key={item.storeId}
          >
            <img
              src={`https://www.cheapshark.com${item.images.logo}`}
              alt=""
              className="w-20 lg:w-35  object-cover"
            />
            <h1 className="text-zinc-800 dark:text-zinc-200 text-sm lg:text-xl text-center pt-4">
              {item.storeName}
            </h1>
          </div>
        ))}
      </div>
    </>
  );
}

export default Stores;
