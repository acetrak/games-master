import { Outlet, useLoaderData, useLocation, useNavigate, useParams } from '@remix-run/react';
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import qs from 'qs';
import { GameDeal, Store } from '~/lib/data';
import React, { useMemo } from 'react';
import SortBy from '~/components/sort-by';
import * as motion from 'motion/react-client';
import { Button } from '~/components/ui/button';

export const meta: MetaFunction = () => {
  return [{ title: '游戏管家' }, { name: 'description', content: '游戏管家' }];
};

const defaultStore = {
  'storeID': '1',
  'storeName': 'Steam',
  'isActive': 1,
  'images': {
    'banner': '/img/stores/banners/0.png',
    'logo': '/img/stores/logos/0.png',
    'icon': '/img/stores/icons/0.png'
  }
};
export const loader = async ({ request }: LoaderFunctionArgs): Promise<GameDeal[]> => {

  const url = new URL(request.url);
  const storeID = url.searchParams.get('storeID');
  const sortBy = url.searchParams.get('sortBy');

  const query = qs.stringify({
    storeID: storeID ?? defaultStore.storeID,
    sortBy: sortBy ?? 'DealRating',
  });
  const res = await fetch(
    `https://www.cheapshark.com/api/1.0/deals?${query}`
  );
  return await res.json();
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  const location = useLocation();
  const params = useParams()
  console.log(params)

  const navigate = useNavigate()

  const store = useMemo<Store>(() => location.state?.store ?? defaultStore, [location.state?.store]);

  const open = (  e: React.MouseEvent<HTMLButtonElement>,item: GameDeal) => {
    e.preventDefault()
    e.stopPropagation()
    window.open(`https://www.cheapshark.com/redirect?dealID=${item.dealID}`, '_blank', 'noopener,noreferrer');
  }

  const visitDeal = (item: GameDeal) => {
    navigate(`/list-of-deals/${item.dealID}`, {
      state: {
        store: store,
        item: item
      }
    })
  }

  console.log(location.state)
  return (
    <>
    <Outlet/>
      <div className=" p-4">

        {
          store && (
            <div className="flex justify-center pb-10">
              <img src={`https://www.cheapshark.com${store.images.banner}`} className="w-[160px] h-[80px] object-contain" alt={store.storeName} />
            </div>
          )
        }

        <div className="max-w-5xl mx-auto">
          {

            data.length === 0 ? (
              <div className="text-center text-zinc-500 p-10 border-1 border-zinc-500">
                <h1 className="text-[3rem] pb-2">😢</h1>
                <p>No relevant game transactions found</p>
              </div>
            ) : (

              <div className="grid grid-cols-1  xl:grid-cols-[1fr_300px] gap-x-8">

                <div className="order-1 xl:order-0">
                  <div className="flex flex-col gap-y-6">

                    {data.map((item) => (
                      <motion.div  onClick={()=>visitDeal(item)}   key={item.dealID} className=" py-4 flex px-2 border-1 border-zinc-300 dark:border-zinc-600   cursor-pointer">

                        <img src={item.thumb} alt="" className="w-[180px] shrink-0" />
                        <div className="flex-1 pl-3 flex flex-col justify-between">
                          <h3 className="text-left text-zinc-800 dark:text-zinc-300 ">{item.title}</h3>

                          <div className="flex items-center gap-x-4">
                            <p className="text-green-600">${item.salePrice}</p>
                            <p className="text-zinc-500 line-through">${item.normalPrice}</p>
                            <p className="bg-green-600 text-white px-1 py-[2px] text-xs rounded-sm">save: {Number(item.savings).toFixed(0)}%</p>
                          </div>
                        </div>
                        <div className="ml-auto">
                          <Button onClick={(e)=>open(e,item)}>go to shop</Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="order-0 xl:order-1 pb-6 xl:pb-0">
                  <div className=" xl:sticky xl:top-[120px]">
                    <h3 className="text-zinc-800 dark:text-zinc-300 pb-2">SortBy</h3>
                    <SortBy></SortBy>
                  </div>
                </div>

              </div>
            )

          }


        </div>
      </div>
    </>
  );
}
