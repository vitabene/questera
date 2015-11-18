package main

import (
	"log"
	"math/rand"
	"net/http"
	"time"
)

func isFound(w http.ResponseWriter, r *http.Request, err error) {
	if err != nil {
		http.NotFound(w, r)
		return
	}
}

func hasError(err error) {
	if err != nil {
		log.Println(err)
		return
	}
}

func isFatal(err error) {
	if err != nil {
		log.Panic(err)
	}
}

const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"

func RandStringBytes(n int) string {
	rand.Seed(time.Now().UnixNano())
	b := make([]byte, n)
	for i := range b {
		b[i] = letterBytes[rand.Intn(len(letterBytes))]
	}
	return string(b)
}

func contains(word string, slice []string) bool {
	for _, val := range slice {
		if val == word {
			return true
		}
	}
	return false
}
