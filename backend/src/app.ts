const express = require('express');
const cors = require('cors');
import driveRoutes from './routes/driveRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', driveRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;