package db

import (
	"context"
	"time"

	"github.com/rah-ul-643/Code-Executor/internal/types"
)

func SaveResult(result *types.ResultModel) error {
	result.CreatedAt = time.Now()

	_, err := ResultsCollection().InsertOne(
		context.Background(),
		result,
	)

	return err
}
