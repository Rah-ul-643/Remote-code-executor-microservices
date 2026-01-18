package redisclient

func (client *RedisClient) Publish(channel string, payload string) error {
	return client.Rdb.Publish(Ctx, channel, payload).Err()
}
