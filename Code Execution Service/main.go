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
	log.Println("Starting Execution Service")

	err := godotenv.Load()
  	if err != nil {
    	log.Fatal("Error loading .env file")
  	}
	  
	STREAM := os.Getenv("STREAM_NAME") // "code_execution_jobs"
	GROUP := os.Getenv("EXECUTOR_GROUP_NAME") // "executor_group"
	CONSUMER := os.Getenv("CONSUMER_NAME")	// "worker_1"

	
	db.ConnectMongo();

	redisclient.NewRedisClient();

	redisclient.EnsureConsumerGroup(STREAM, GROUP);

	jobChan := make(chan types.Job, worker.WorkerCount)

	worker.StartWorkerPool(jobChan)

	consumer.StartConsumer(STREAM, GROUP, CONSUMER, jobChan)
}
