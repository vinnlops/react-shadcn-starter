import { createBrowserRouter } from 'react-router-dom';
import { createRoutes } from './createRoutes';
import { routes } from './routes';

export const router = createBrowserRouter(createRoutes(routes));
