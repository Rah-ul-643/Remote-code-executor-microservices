package worker

import (
	"encoding/json"
	"log"

	"github.com/google/uuid"
	"github.com/rah-ul-643/Code-Executor/internal/db"
	"github.com/rah-ul-643/Code-Executor/internal/executor"
	"github.com/rah-ul-643/Code-Executor/internal/redisclient"
	"github.com/rah-ul-643/Code-Executor/internal/types"
)


const WORKER_COUNT = 8

func StartWorkerPool(jobChan <-chan types.Job, pubSubClient *redisclient.RedisClient, streamClient *redisclient.RedisClient, cfg types.Config) {
	for i := 1; i <= WORKER_COUNT; i++ {
		go worker(i, jobChan, pubSubClient, streamClient, cfg)
	}
}

func worker(id int, jobs <-chan types.Job, pubSubClient *redisclient.RedisClient, streamClient *redisclient.RedisClient, cfg types.Config) {
	log.Printf("Worker %d started\n", id)

	for job := range jobs {
		log.Printf(
			"Worker %d executing submission %s (user: %s)\n",
			id, job.SubmissionID, job.Username,
		)

		// 1. Execute code
		execResult, err := executor.ExecuteCode(&job)
		if err != nil {
			log.Println(err.Error())
		}

		// 2️. Build DB result model 
		resultId := uuid.NewString()

		dbResult := &types.ResultModel{
			ResultId:  resultId,
			RequestId: job.RequestId,
			Status:    execResult.Status,
			Stdout:    execResult.Stdout,
			Stderr:    execResult.Stderr,
			Error:     execResult.Error,
		}


		// 3️. Save result to DB
		if err := db.SaveResult(dbResult); err != nil {
			log.Println("Failed to save result:", err)
			continue 					// NOT publishing or ACK
		}

		// 4️. Publish completion event (lightweight)
		event := map[string]string{
			"event":    "EXECUTION_COMPLETED",
			"resultId": resultId,
			"username": job.Username,
		}

		eventJSON, err := json.Marshal(event)
		if err != nil {
			log.Println("Failed to marshal event:", err)
			continue
		}

		if err := pubSubClient.Publish(cfg.ResultChannel, string(eventJSON)); err != nil {
			log.Println("Failed to publish result:", err)
		}

		// 5️. ACK Redis Stream job 
		if err := streamClient.AckJob(cfg.Stream, cfg.Group, job.RedisID); err != nil {
			log.Println("Failed to ACK job:", err)
		}

		log.Printf("Worker %d finished request %s\n", id, job.RequestId)
	}
}
