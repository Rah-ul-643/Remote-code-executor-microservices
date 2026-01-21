package executor;

import (
	"context"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"time"

	"github.com/rah-ul-643/Code-Executor/internal/types"
);

func runGolang(code, input string, time_limit int ) (*types.Result, error) {
	tmpDir, _ := os.MkdirTemp("", "exec-*")
	defer os.RemoveAll(tmpDir)

	codePath := filepath.Join(tmpDir, "main.go")
	os.WriteFile(codePath, []byte(code), 0644)

	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(time_limit)*time.Second)
	defer cancel()


	cmd := exec.CommandContext(
		ctx,
		"docker", "run", "--rm", "-i",
		"--network=none",
		"--cpus=0.5",
		"--memory=512m",
		"--memory-swap=512m",
		"-v", fmt.Sprintf("%s:/code:ro", tmpDir),
		"golang:1.25.6",
		"sh", "-c",
		"go build -o /tmp/app /code/main.go && /tmp/app",
	)

	return executeCommand(ctx, cmd, input)
}
