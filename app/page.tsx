import  dynamic  from 'next/dynamic';
import CategoryList from './components/categoryList';
import { useRouter } from 'next/router';
//import TasksList from './components'
const Home = () => {
  const CategoryListWithRouter = dynamic(
    () => import('./components/categoryList'),
    { ssr: false } 
  );

  return (
    <div>
      <CategoryListWithRouter /> 
    </div>
  );

}

export default Home;
