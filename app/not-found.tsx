import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-zinc-950 px-6 py-24 sm:py-32 lg:px-8">
      
      
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <div className="h-[40rem] w-[40rem] rounded-full bg-indigo-500/10 blur-[100px]" />
        </div>
        <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3">
          <div className="h-[30rem] w-[30rem] rounded-full bg-emerald-500/10 blur-[100px]" />
        </div>
      </div>

    
      <div className="mx-auto max-w-2xl text-center z-10">
        
      
        <h1 className="text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 via-purple-400 to-emerald-400 sm:text-[12rem]">
          404
        </h1>
     
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Page not found
        </h2>
        
        <p className="mt-6 text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
          Sorry, we couldn’t find the page you’re looking for. It might have been moved, deleted, or perhaps it never existed.
        </p>
        
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-zinc-950 transition-all duration-200 hover:bg-zinc-200 hover:scale-105 active:scale-95"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="transition-transform duration-200 group-hover:-translate-x-1"
            >
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Return Home
          </Link>
          
          <Link
            href="/contact"
            className="text-sm font-semibold leading-6 text-zinc-400 transition-colors hover:text-white"
          >
            Contact Support <span aria-hidden="true">→</span>
          </Link>
        </div>

      </div>
    </div>
  );
}