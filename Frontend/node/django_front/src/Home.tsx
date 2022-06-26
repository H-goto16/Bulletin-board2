import { Link } from 'react-router-dom';

export const Home = () => (
  <>
    <div>これはトップページです</div>
    <nav>
      <ul>
        <li>
          <Link to="/">トップページです</Link>
        </li>
      </ul>
    </nav>
  </>
);