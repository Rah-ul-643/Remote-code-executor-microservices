package redisclient

import (
	"fmt"
	"log"
)

func EnsureConsumerGroup (stream string, group string) {
	log.Println("Inside Ensure consumer group method. Stream and group are:")
	fmt.Println(stream, group)
	
	err := Rdb.XGroupCreateMkStream(
		Ctx,
		stream,
		group,
		"$",
	).Err()

	if err != nil && err.Error() != "BUSYGROUP Consumer Group name already exists" {
		log.Fatalf("❌ Failed to create group %s on %s: %v", group, stream, err)
	}

	log.Printf("✅ Consumer group ready: stream=%s group=%s\n", stream, group)
}

func AckJob (stream string, group string, messageID string) error {
	return Rdb.XAck(
		Ctx,
		stream,
		group,
		messageID,
	).Err()
}
