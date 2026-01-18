package types

import "time"

type ResultModel struct {
	ResultId  string    `bson:"resultId" json:"resultId"`
	RequestId string    `bson:"requestId" json:"requestId"`

	Status string `bson:"status" json:"status"`

	Stdout string `bson:"stdout,omitempty" json:"stdout,omitempty"`
	Stderr string `bson:"stderr,omitempty" json:"stderr,omitempty"`
	Error  string `bson:"error,omitempty" json:"error,omitempty"`

	CreatedAt time.Time `bson:"createdAt" json:"createdAt"`
}
