import type { NextPage } from 'next';
import LoadingSpinner from './components/UI/LoadingSpinner';

const Loading: NextPage = () => {
  return (
    <main className="page-content screen-centered">
      <LoadingSpinner />
    </main>
  );
};

export default Loading;
