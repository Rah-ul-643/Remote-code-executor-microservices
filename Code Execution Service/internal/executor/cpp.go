package executor

import (
	"context"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"time"

	"github.com/rah-ul-643/Code-Executor/internal/types"
)

func runCPP(code, input string,  time_limit int) (*types.Result, error) {
	tmpDir, _ := os.MkdirTemp("", "exec-*")
	defer os.RemoveAll(tmpDir)

	codePath := filepath.Join(tmpDir, "main.cpp")
	os.WriteFile(codePath, []byte(code), 0644)

	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(time_limit) * time.Second)
	defer cancel()

	cmd := exec.CommandContext(ctx,
		"docker", "run", "--rm",
		"--network=none", "--cpus=1", "--memory=256m",
		"-v", fmt.Sprintf("%s:/code:ro", tmpDir),
		"gcc:13",
		"sh", "-c",
		"g++ /code/main.cpp -O2 -o /code/a.out && /code/a.out",
	)

	return executeCommand(ctx, cmd, input)
}