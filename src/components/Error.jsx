import { useRouteError } from 'react-router-dom';
import PageContent from './PageContent'
import Header from './Header';
import { useAuthContext } from '../store/auth';


function ErrorPage() {
  const error = useRouteError();
  const {isLoggedIn} = useAuthContext()
  console.log(isLoggedIn)

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  return (
    <>
      { isLoggedIn && <Header /> }
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
