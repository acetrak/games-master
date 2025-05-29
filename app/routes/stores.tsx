import { useLoaderData, useNavigate } from '@remix-run/react';
import * as motion from 'motion/react-client';
import qs from 'qs';
import { Store } from '~/lib/data';

export async function loader(): Promise<Store[]> {
  const res = await fetch('https://www.cheapshark.com/api/1.0/stores');

  return await res.json();
}

function Stores() {
  const data = useLoaderData<typeof loader>();

  const navigate = useNavigate();

  const nav = (store: Store) => {

    const query = qs.stringify({
      storeID: store.storeID,
    }, { encode: false }); // 可选：防止过度编码

    navigate(`/list-of-deals?${query}`,{
      state: {
        store
      },
    });
  };
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 grid-rows-auto gap-6">
        {data.map((item) => (
          <motion.div
            whileHover={{
              scale: 1.11,
              transition: { duration: .31 },
            }}
            whileTap={{ scale: 0.96 }}
            className=" border-2 rounded-2xl p-4 flex flex-col items-center cursor-pointer"
            key={item.storeID}
            onClick={() => nav(item)}
          >
            <img
              src={`https://www.cheapshark.com${item.images.logo}`}
              alt=""
              className="w-20 lg:w-35  object-cover"
            />
            <h1 className="text-zinc-800 dark:text-zinc-200 text-sm lg:text-xl text-center pt-4">
              {item.storeName}
            </h1>
          </motion.div>
        ))}
      </div>
    </>
  );
}

export default Stores;
