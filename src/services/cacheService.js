import Redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();

class CacheService {
  constructor() {
    this.client = Redis.createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379'
    });
    
    this.client.on('error', (err) => console.error('Redis Client Error', err));
    this.connect();
  }

  async connect() {
    await this.client.connect();
  }

  async get(key) {
    return await this.client.get(key);
  }

  async set(key, value, expireTime = 3600) {
    await this.client.set(key, value, {
      EX: expireTime
    });
  }

  async delete(key) {
    await this.client.del(key);
  }

  generateKey(prefix, identifier) {
    return `${prefix}:${identifier}`;
  }
}

export default new CacheService();