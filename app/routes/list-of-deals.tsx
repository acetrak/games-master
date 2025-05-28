import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "游戏管家" }, { name: "description", content: "游戏管家" }];
};

export const loader = async () => {
  const res = await fetch(
    "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15"
  );
  return await res.json();
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  console.log(data);
  return (
    <div className="min-h-screen p-4">
      {data.map((item: any) => (
        <div key={item.dealID} className="my-2 px-2 border-2 border-zinc-600 dark:border-zinc-300 rounded-md cursor-pointer">
          <h3 className="text-zinc-800 dark:text-zinc-300">{item.title}</h3>

          <img src={item.thumb} alt="" className="w-[120px]" />
        </div>
      ))}
    </div>
  );
}
