package consumer

import (
	"log"

	"github.com/rah-ul-643/Code-Executor/internal/redisclient"
	"github.com/rah-ul-643/Code-Executor/internal/types"
	"github.com/redis/go-redis/v9"
)

func StartConsumer(streamName, groupName, consumerName string, jobChan chan<- types.Job) {
	log.Println("Executor consumer started")

	for {
		streams, err := redisclient.Rdb.XReadGroup(
			redisclient.Ctx,
			&redis.XReadGroupArgs{
				Group:    groupName,
				Consumer: consumerName,
				Streams:  []string{streamName, ">"},
				Count:    1,
				Block:    0, // BLOCK forever
			},
		).Result()

		if err != nil {
			log.Println(" XREADGROUP error:", err)
			continue
		}

		for _, stream := range streams {
			for _, msg := range stream.Messages {
				job := types.Job{
					RedisID:      msg.ID,
					SubmissionID: msg.Values["clientSubmissionId"].(string),
					RequestId:    msg.Values["requestId"].(string),
					Username:     msg.Values["username"].(string),
					Language:     msg.Values["language"].(string),
					Code:         msg.Values["code"].(string),
					Input:        msg.Values["input"].(string),
				}

				jobChan <- job // blocks if workers busy
			}
		}
	}
}
