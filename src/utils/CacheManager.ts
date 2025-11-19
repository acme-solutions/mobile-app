import AsyncStorage from '@react-native-async-storage/async-storage';

class CacheManager {
  static CACHE_EXPIRY = 60 * 60 * 1000; // 1 hour

  static async set(key: string, value: any): Promise<void> {
    const cacheData = {
      value,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(key, JSON.stringify(cacheData));
  }

  static async get(key: string): Promise<any | null> {
    const data = await AsyncStorage.getItem(key);
    if (!data) return null;

    const { value, timestamp } = JSON.parse(data);
    if (Date.now() - timestamp > this.CACHE_EXPIRY) {
      await this.remove(key);
      return null;
    }

    return value;
  }

  static async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }

  static async clear(): Promise<void> {
    await AsyncStorage.clear();
  }
}

export default CacheManager;
