package redisclient

import (
	"log"
)

func (client *RedisClient) EnsureConsumerGroup (stream string, group string) {

	err := client.Rdb.XGroupCreateMkStream(
		Ctx,
		stream,
		group,
		"$",
	).Err()

	if err != nil && err.Error() != "BUSYGROUP Consumer Group name already exists" {
		log.Fatalf("Failed to create group %s on %s: %v", group, stream, err)
	}

	log.Printf("Consumer group ready: stream=%s group=%s\n", stream, group)
}

func (client *RedisClient) AckJob (stream string, group string, messageID string) error {
	return client.Rdb.XAck(
		Ctx,
		stream,
		group,
		messageID,
	).Err()
}
