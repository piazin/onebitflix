import { config } from './config';
import { app } from './app';

const PORT = config.port;

app.listen(PORT, () => {
  console.info('🚀 -> server started');
});
