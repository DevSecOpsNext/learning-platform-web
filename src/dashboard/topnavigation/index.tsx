import { useSession, signIn, signOut } from 'next-auth/react';
import { useToggle } from '../provider/context';
import Link from 'next/link'

export default function TopNavigation() {
  const { toggle }: any = useToggle();
  const { data: session } = useSession()

  return (
    <header className="bg-white h-16 items-center relative shadow w-full z-10 md:h-20">
      <div className="flex flex-center flex-col h-full justify-center mx-auto px-3 relative">
        <div className="flex items-center pl-1 relative w-full sm:ml-0 sm:pr-2 lg:max-w-68">
          <div className="flex left-0 relative w-3/4">
            <div className="flex group h-full items-center relative w-12">
              <button
                type="button"
                aria-expanded="false"
                aria-label="Toggle sidenav"
                onClick={toggle}
                className="text-4xl text-black focus:outline-none"
              >
                &#8801;
              </button>
            </div>
          </div>
          <div className="flex items-center justify-end ml-5 p-1 relative w-full sm:mr-0 sm:right-auto">

            <div className="block pr-5">
              {session ? (
                <button color='primary' onClick={() => signOut()}>Sign out</button>
              ) :
                (
                  <button onClick={() => signIn('asgardeo')}>Sign in</button>
                )
              }


            </div>


            <a href="#" className="block pr-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 text-gray-600 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <Link href="/user/messages" className="block pr-5">
            {/* <a href="/user/messages" className="block pr-5"> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
            {/* </a> */}
            </Link>
            <a href="#" className="block relative">
              {session ? 
              (<img
                alt="profile"
                src={session.user?.image || "/images/1.png"}
                className="h-10 mx-auto object-cover rounded-full w-10"/>
              ) : 
              (<img
                alt="profile"
                src="/images/1.png"
                className="h-10 mx-auto object-cover rounded-full w-10"/>
              )
              }
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
