package utils

import "strings"

func ExtractClassName(code string) string {
	index := strings.Index(code, "class")
	if index == -1 {
		return ""
	}

	index += 6

	var name strings.Builder

	for index < len(code) && code[index] != '{' {
		name.WriteByte(code[index])
		index++
	}

	return strings.TrimSpace(name.String())
}
