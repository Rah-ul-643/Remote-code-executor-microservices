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

func runPython(code, input string, time_limit int ) (*types.Result, error) {
	tmpDir, _ := os.MkdirTemp("", "exec-*")
	defer os.RemoveAll(tmpDir)

	codePath := filepath.Join(tmpDir, "main.py")
	os.WriteFile(codePath, []byte(code), 0644)

	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(time_limit)*time.Second)
	defer cancel()


	cmd := exec.CommandContext(ctx,
		"docker", "run", "--rm", "-i",
		"--network=none", "--cpus=0.5", "--memory=128m", "--memory-swap=128m", "--oom-kill-disable=false",
		"-v", fmt.Sprintf("%s:/code:ro", tmpDir),	
		"python:3.11",
		"python", "/code/main.py",
	)

	return executeCommand(ctx, cmd, input)
}
