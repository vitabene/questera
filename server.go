package main

import (
	"net/http"
	"os"
	"log"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "4000"
	}
	http.Handle("/build/", http.StripPrefix("/build/", http.FileServer(http.Dir("js"))))
	http.Handle("/", http.FileServer(http.Dir("./build")))
	log.Println("Server started: http://dev:" + port)
	log.Fatal(http.ListenAndServe(":" + port, nil))
}
