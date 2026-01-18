package main

import (
	"log"
	"os"

	"github.com/rah-ul-643/Code-Executor/internal/consumer"
	"github.com/rah-ul-643/Code-Executor/internal/db"
	"github.com/rah-ul-643/Code-Executor/internal/redisclient"
	"github.com/rah-ul-643/Code-Executor/internal/types"
	"github.com/rah-ul-643/Code-Executor/internal/worker"
	
	"github.com/joho/godotenv"
)


func main() {
	log.Println("Starting Execution Service...")

	err := godotenv.Load()
  	if err != nil {
    	log.Fatal("Error loading .env file")
  	}

    cfg := types.Config{
        ResultChannel: os.Getenv("RESULT_CHANNEL"),			// "execution_events"
        Stream:        os.Getenv("STREAM_NAME"), 			// "code_execution_jobs"
        Group:         os.Getenv("EXECUTOR_GROUP_NAME"),	// "executor_group"
        Consumer:      os.Getenv("CONSUMER_NAME"),			// "worker_1"
    }
	  
	REDIS_PUB_SUB_CLIENT := os.Getenv("REDIS_PUB_SUB_CLIENT") // localhost:6370, docker port mapped 6370:6379
	REDIS_STREAMS_CLIENT := os.Getenv("REDIS_STREAMS_CLIENT") // localhost:6379, docker port mapped 6379:6379
	
	
	db.ConnectMongo();

	RedisStreamClient := redisclient.NewRedisClient(REDIS_STREAMS_CLIENT);
	RedisPubSubClient := redisclient.NewRedisClient(REDIS_PUB_SUB_CLIENT)

	RedisStreamClient.EnsureConsumerGroup(cfg.Stream, cfg.Group);

	jobChan := make(chan types.Job, worker.WORKER_COUNT)

	worker.StartWorkerPool(jobChan, RedisPubSubClient, RedisStreamClient, cfg)

	consumer.StartConsumer(RedisStreamClient, cfg, jobChan)
}
