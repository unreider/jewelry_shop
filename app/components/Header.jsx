"use client";
import { Fragment, useState, useEffect } from "react";
import { getSession, signOut } from "next-auth/react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  getUserIdByName,
  getUserProducts,
  filterProductsBySearchQuery,
} from "../lib/db";
import { useProducts } from "./Context/ProductsContext";

const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
      featured: [
        /* Featured items */
      ],
      sections: [
        /* Sections */
      ],
    },
    {
      id: "men",
      name: "Men",
      featured: [
        /* Featured items */
      ],
      sections: [
        /* Sections */
      ],
    },
  ],
  pages: [
    /* Pages */
  ],
};

function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [session, setSession] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();
  const {setProducts} = useProducts();

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      if (session) {
        setSession(session);
        const userId = await getUserIdByName(session.user.name);
        const products = await getUserProducts(userId);
        setCartCount(products.length);
      }
    };
    fetchData();
  }, []);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("sign-in");
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    const filteredProducts = await filterProductsBySearchQuery(searchQuery);

    setProducts(filteredProducts);

    setSearchOpen(false);
  };

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        {/* Dialog component */}
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          {/* Transition components */}
        </Dialog>
      </Transition.Root>

      {/* Header */}
      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          {/* Navigation */}
          <div className="border-b border-gray-200">
            {/* Logo */}
            <div className="flex h-16 items-center">
              {/* Mobile menu button */}
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                {/* Mobile menu icon */}
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">Jewelry By Artur</Link>
              </div>

              {/* Navigation links */}
              <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {/* Categories */}
                  {navigation.categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.id}`}
                      className="relative flex"
                    >
                      <span className="border-transparent text-gray-700 hover:text-gray-800 relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out">
                        {category.name}
                      </span>
                    </Link>
                  ))}

                  {/* Pages */}
                  {navigation.pages.map((page) => (
                    <Link
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* User authentication */}
              <div className="ml-auto flex items-center">
                {session ? (
                  <>
                    <Link
                      href="/profile"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800 mr-4"
                    >
                      {session.user.name}
                    </Link>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <button
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/sign-up"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800 ml-4"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>

              {/* Currency selector
              <div className="hidden lg:ml-8 lg:flex">
                <a
                  href="#"
                  className="flex items-center text-gray-700 hover:text-gray-800"
                >
                  <img
                    src="https://tailwindui.com/img/flags/flag-canada.svg"
                    alt=""
                    className="block h-auto w-5 flex-shrink-0"
                  />
                  <span className="ml-3 block text-sm font-medium">CAD</span>
                  <span className="sr-only">, change currency</span>
                </a>
              </div> */}

              {/* Search */}
              <div className="flex lg:ml-6">
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Search</span>
                  <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Cart */}
              {session && (
                <div className="ml-4 flow-root lg:ml-6">
                  <Link
                    href={"/cart"}
                    className="group -m-2 flex items-center p-2"
                  >
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {cartCount}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Search Modal */}
      <Transition.Root show={searchOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setSearchOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <form onSubmit={handleSearchSubmit}>
                    <div className="sm:flex sm:items-start">
                      <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Search
                        </Dialog.Title>
                        <div className="mt-2">
                          <input
                            type="text"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Search for products..."
                            onChange={(e) => setSearchQuery(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setSearchOpen(false)}
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                        // onClick={handleSearchClick}
                      >
                        Search
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default Header;
