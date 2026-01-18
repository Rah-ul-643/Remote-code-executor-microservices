package db

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	Client *mongo.Client
	DB     *mongo.Database
)

func ConnectMongo() {

	uri := os.Getenv("MONGO_URI")
	if uri == "" {
		uri = "mongodb://localhost:27017"
	}

	dbName := os.Getenv("MONGO_DB")
	if dbName == "" {
		dbName = "Code-Nova"
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal("MongoDB connection failed:", err)
	}

	if err := client.Ping(ctx, nil); err != nil {
		log.Fatal(" MongoDB ping failed:", err)
	}

	Client = client
	DB = client.Database(dbName)

	log.Println(" MongoDB connected to database:", dbName)
}

func ResultsCollection() *mongo.Collection {
	return DB.Collection("results")
}
