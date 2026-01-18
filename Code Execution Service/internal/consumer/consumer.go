package consumer

import (
	"log"

	"github.com/rah-ul-643/Code-Executor/internal/redisclient"
	"github.com/rah-ul-643/Code-Executor/internal/types"
	"github.com/redis/go-redis/v9"
)

func StartConsumer(streamsClient *redisclient.RedisClient, cfg types.Config, jobChan chan<- types.Job) {
	log.Println("Executor consumer started")

	for {
		streams, err := streamsClient.Rdb.XReadGroup(
			redisclient.Ctx,
			&redis.XReadGroupArgs{
				Group:    cfg.Group,
				Consumer: cfg.Consumer,
				Streams:  []string{cfg.Stream, ">"},
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
