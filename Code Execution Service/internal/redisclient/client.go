package redisclient

import (
	"context"
	"log"

	"github.com/redis/go-redis/v9"
)

var (
	Ctx = context.Background()
)

type RedisClient struct{
	Rdb *redis.Client
}

func NewRedisClient(addr string)  (*RedisClient) {
	
	rdb := redis.NewClient(&redis.Options{
		Addr: addr,
	})

	if err := rdb.Ping(Ctx).Err(); err != nil {
		log.Fatal("Redis connection failed:", err)
	}

	log.Println("New Redis Client ready and connected")
	
	return &RedisClient{Rdb : rdb}
}
