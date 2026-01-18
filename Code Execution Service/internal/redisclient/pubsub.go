package redisclient

func Publish (channel string, payload string) error {
	return Rdb.Publish(Ctx, channel, payload).Err()
}
