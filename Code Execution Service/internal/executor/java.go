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

	classname := utils.ExtractClassName(code) 
	filename := fmt.Sprintf("%s.java", classname)

	if (filename == ""){
		return &types.Result{Error : "No class provided"}, nil;
	}
	codePath := filepath.Join(tmpDir, filename)
	os.WriteFile(codePath, []byte(code), 0644)

	ctx, cancel := context.WithTimeout(context.Background(),  time.Duration(time_limit)*time.Second)
	defer cancel()

	cmd := exec.CommandContext(ctx,
		"docker", "run", "--rm", "-i",
		"--network=none", "--cpus=1", "--memory=256m", "--memory-swap=256m", "--oom-kill-disable=false",
		"-v", fmt.Sprintf("%s:/code", tmpDir),
		"eclipse-temurin:17",
		"sh", "-c",
		fmt.Sprintf("javac /code/%s && java -cp /code %s", filename, classname),
	)

	return executeCommand(ctx, cmd, input)
}