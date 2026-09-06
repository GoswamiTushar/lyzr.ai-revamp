'use client';

import dynamic from 'next/dynamic';

const App = dynamic(() => import('../App'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#E5FE54] border-t-transparent animate-spin" />
    </div>
  ),
});

export default function Page() {
  return <App />;
}
