package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type Map struct {
	Id, Climate   int
	Map, Position string
}

func loadMap(MapId string) []Map {
	var newMaps []Map
	query := "SELECT * FROM maps WHERE id=" + MapId
	log.Printf("%s\n", query)
	rows, res, err := db.Query(query)
	if err != nil {
		log.Println(err)
		return nil
	}
	for _, row := range rows {
		id, climate := row.Int(res.Map("id")), row.Int(res.Map("climate"))
		position, mapDB := row.Str(res.Map("position")), row.Str(res.Map("map"))
		newMap := &Map{Id: id, Position: position, Climate: climate, Map: mapDB}
		newMaps = append(newMaps, *newMap)
	}
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
