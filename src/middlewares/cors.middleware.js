import cors from 'cors';

export class CorsMiddleware {

  static corsAllow({ acceptedOrigins = [] }) {
    return cors({
      origin: (origin, callback) => {

        if (acceptedOrigins.length === 0) {
          return callback(null, true);
        }

        if (acceptedOrigins.includes(origin)) {
          return callback(null, true);
        }

        if (!origin) {
          return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
      },
      credentials: true,
    });
  }

}