import { Router } from 'express';
import cobrowseRoutes from './cobrowse.routes';

const router = Router();

router.use('/v2/cobrowse', cobrowseRoutes);

export default router;