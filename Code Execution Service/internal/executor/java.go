package executor

import (
	"context"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"time"

	"github.com/rah-ul-643/Code-Executor/internal/types"
	"github.com/rah-ul-643/Code-Executor/internal/utils"
)

func runJava(code, input string,  time_limit int) (*types.Result, error){
	tmpDir, _ := os.MkdirTemp("", "exec-*")
	defer os.RemoveAll(tmpDir)

	filename := utils.ExtractClassName(code);
	if (filename == ""){
		return &types.Result{Error : "No class provided"}, nil;
	}
	codePath := filepath.Join(tmpDir, filename)
	os.WriteFile(codePath, []byte(code), 0644)

	ctx, cancel := context.WithTimeout(context.Background(),  time.Duration(time_limit)*time.Second)
	defer cancel()

	cmd := exec.CommandContext(ctx,
		"docker", "run", "--rm",
		"--network=none", "--cpus=1", "--memory=256m",
		"-v", fmt.Sprintf("%s:/code:ro", tmpDir),
		"openjdk:21-slim",
		"sh", "-c",
		"javac /code/Main.java && java -cp /code Main",
	)

	return executeCommand(ctx, cmd, input)
}

