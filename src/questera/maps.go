package main

import (
	"encoding/json"
	"fmt"
	"gopkg.in/mgo.v2/bson"
	"log"
	"net/http"
)

type Coord struct {
	X int `json:"x"`
	Y int `json:"y"`
}
type Map struct {
	Id     bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Map    Grid          `json:"map"`
	Coords Coord         `json:"coords"`
}
type MapObject struct {
	Id      bson.ObjectId `json:"id" bson:"_id,omitempty"`
	HeroId  bson.ObjectId `json:"heroId" bson:"heroId"`
	MapId   bson.ObjectId `json:"mapId" bson:"mapId"`
	Type    int           `json:"type"`
	Visited bool          `json:"visited"`
	Coords  Coord         `json:"coords"`
}

// { "heroId" : ObjectId("564c476e4928fd9189b05e01"),
// "mapId": ObjectId("565063fcd188e0caf423e66a"), "type": 0,
// "visited": false, "coords": {"x": 10,"y":10}}

const (
	MAP_COLL        = "maps"
	MAP_OBJECT_COLL = "mapObjects"
	DEF_MAP_ID      = "565063fcd188e0caf423e66a"
)

func loadMap(mapId bson.ObjectId) []Map {
	var newMaps []Map
	newMap := Map{}
	query := bson.M{"_id": mapId}
	err := db.C(MAP_COLL).Find(query).One(&newMap)
	if err != nil {
		fmt.Printf("map not found: %s\n", err)
	}
	newMaps = append(newMaps, newMap)
	return newMaps
}

func mapObjectHandler(w http.ResponseWriter, r *http.Request, name string) {
	var objects []MapObject
	HeroId, err := heroPresent(r)
	query := bson.M{"heroId": HeroId, "mapId": bson.ObjectIdHex(DEF_MAP_ID)}
	err = db.C(MAP_OBJECT_COLL).Find(query).All(&objects)
	isFatal(err)
	log.Printf("mapObjects: %v\n", objects)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(objects)
}

func mapHandler(w http.ResponseWriter, r *http.Request, name string) {
	if name == "" {
		_, err := heroPresent(r)
		if err != nil {
			log.Println(err)
			return
		}
		// hero := getHero(heroId)
		var mapDB []Map
		// commented out for now
		// if hero.MapId == nil {
		mapDB = loadMap(bson.ObjectIdHex(DEF_MAP_ID))
		// } else {
		// mapDB = loadMap(hero.MapId)
		// }
		// jsonMap, err := json.Marshal(mapDB)
		// if err != nil {
		// 	fmt.Println(err)
		// 	return
		// }
		// fmt.Fprint(w, string(jsonMap))
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(mapDB)
	}
}
