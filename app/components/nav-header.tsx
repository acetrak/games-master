import { SidebarTrigger } from '~/components/ui/sidebar';
import useMenu from '~/hooks/use-menu';
import { SearchForm } from '~/components/search-form';


export default function NavHeader() {

  const menu = useMenu();
  return (

    <header className="sticky z-[500] top-0 py-2 lg:py-4 px-2 bg-zinc-200 dark:bg-zinc-800 flex items-center">
      <SidebarTrigger />
      <h2 className="text-base text-zinc-800 dark:text-xl dark:text-zinc-300 pl-3">{menu?.title}</h2>

      <div className="ml-auto">
        <SearchForm />
      </div>
    </header>

  );

}
