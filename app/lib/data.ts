
export interface MenuItem {
  title: string;
  url: string;
  items?: MenuItem[]; // 允许递归嵌套
}

export interface Store {
  storeID: string;
  storeName: string;
  isActive: number; // 如果是布尔值，用 boolean
  images: {
    banner: string;
    logo: string;
    icon: string;
  };
}
export interface GameDeal {
  internalName: string;
  title: string;
  metacriticLink: string;
  dealID: string;
  storeID: string;
  gameID: string;
  salePrice: string;       // 可选转为 number
  normalPrice: string;     // 可选转为 number
  isOnSale: string;        // "1" 或 "0"，可转为 boolean
  savings: string;         // 百分比数值，可转为 number
  metacriticScore: string; // 数值字符串，可转为 number
  steamRatingText: string;
  steamRatingPercent: string; // 可转为 number
  steamRatingCount: string;   // 可转为 number
  steamAppID: string;
  releaseDate: number;     // 时间戳（秒）
  lastChange: number;      // 时间戳（秒）
  dealRating: string;      // 可转为 number
  thumb: string;
}





export const menuData: {
  versions: string[];
  navMain: MenuItem[];
} = {
  versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
  navMain: [
    {
      title: 'Getting Started',
      url: '',
      items: [
        {
          title: 'List of Deals',
          url: '/list-of-deals',
        },
        {
          title: 'Stores',
          url: '/stores',
        },
      ],
    },
  ],
};
