import PrivateRoutes from './private.routes';
import publicRoutes from './public.routes';

export default [...publicRoutes, ...PrivateRoutes];
