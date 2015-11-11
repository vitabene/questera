package main

import (
	"encoding/json"
	"fmt"
	"gopkg.in/mgo.v2/bson"
	"log"
	"net/http"
)

type Map struct {
	Id, Climate   int
	Map, Position string
}

func loadMap(MapId string) []Map {
	var newMaps []Map
	newMap := Map{}
	err := db.C("maps").Find(bson.M{"MapId": MapId}).One(&newMap)
	isFatal(err)
	newMaps = append(newMaps, newMap)
	return newMaps
}

func mapHandler(w http.ResponseWriter, r *http.Request, name string) {
	if name == "" {
		heroId, err := heroPresent(r)
		if err != nil {
			log.Println(err)
			return
		}
		heroLoggedId := fmt.Sprintf("%d", heroId)
		mapDB := loadMap(heroLoggedId)
		jsonMap, err := json.Marshal(mapDB)
		if err != nil {
			fmt.Println(err)
			return
		}
		fmt.Fprint(w, string(jsonMap))
	}
}
