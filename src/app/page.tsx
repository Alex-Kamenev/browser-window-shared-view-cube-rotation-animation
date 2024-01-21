import React from 'react';
import dynamic from 'next/dynamic';

const ClientSideComponent = dynamic(() => import('../components/ClientSideComponent'), {
  ssr: false,
});

function Home() {
  return <ClientSideComponent />;
}

export default Home;
