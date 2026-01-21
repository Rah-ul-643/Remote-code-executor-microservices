package executor

import (
	"bytes"
	"context"
	"fmt"
	"os/exec"

	"github.com/rah-ul-643/Code-Executor/internal/types"
)

var (
	TIME_LIMIT = 10
)

func ExecuteCode(job *types.Job) (*types.Result, error) {
	switch job.Language {
		
	case "python":
		return runPython(job.Code, job.Input, TIME_LIMIT)
	case "java":
		return runJava(job.Code, job.Input, TIME_LIMIT)
	case "cpp" , "c":
		return runCPP(job.Code, job.Input, TIME_LIMIT)
	case "golang":
		return runGolang(job.Code, job.Input, TIME_LIMIT)
	default:
		return &types.Result{
			Error:  "Language Not supported",
			Status: "FAILED",
		}, fmt.Errorf("unsupported language: %s", job.Language)
	}
}

func executeCommand(ctx context.Context, cmd *exec.Cmd, input string) (*types.Result, error) {
	var stdout, stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr

	if input != "" {
		cmd.Stdin = bytes.NewBufferString(input)
	}
	
	err := cmd.Run()

	if ctx.Err() == context.DeadlineExceeded {
		return &types.Result{
			Error:  "Time Limit Exceeded",
			Status: "TLE",
		}, ctx.Err()
	}

	if err != nil {
		return &types.Result{
			Stdout: stdout.String(),
			Stderr: stderr.String(),
			Error:  err.Error(),
			Status: "FAILED",
		}, err
	}

	return &types.Result{
		Stdout: stdout.String(),
		Stderr: stderr.String(),
		Status: "SUCCESS",
	}, nil
}
