package main

import (
	"encoding/json"
	"fmt"
	"gopkg.in/mgo.v2/bson"
	"log"
	"net/http"
)

type Hero struct {
	Id         bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Occupation int           `json:"occupation"`
	Name       string        `json:"name"`
	AvatarUrl  string        `json:"avatarUrl" bson:"avatarUrl"`
	Email      string        `json:"email"`
	Password   string        `json:"password"`
	MapId      bson.ObjectId `json:"mapId"`
	Coords     Coord         `json:"coords"`
}

type Conquest struct {
	ConquestId              bson.ObjectId `json:"id" bson:"_id,omitempty"`
	HeroId                  bson.ObjectId `json:"heroId" bson:"heroId,omitempty"`
	ConquestBegun, LastSeen int64
}

func heroHandler(w http.ResponseWriter, r *http.Request, name string) {
	heroId, err := heroPresent(r)
	isFatal(err)
	hero := getHero(heroId)
	jsonHero, err := json.Marshal(hero)
	isFatal(err)
	fmt.Fprint(w, string(jsonHero))
}

func getHero(heroId bson.ObjectId) []Hero {
	var heroes []Hero
	hero := Hero{}
	err := db.C("heroes").FindId(heroId).One(&hero)
	isFatal(err)
	heroes = append(heroes, hero)
	return heroes
}

func heroPresent(r *http.Request) (bson.ObjectId, error) {
	cookie, err := r.Cookie("questera")
	if err != nil {
		log.Println(err)
		log.Println("cookie not found")
		return bson.ObjectId("1"), err
	}
	// log.Printf("cookie: %s\n", cookie)
	// questera= [9:]
	cookieStr := fmt.Sprintf("%s", cookie)
	cookieStr = fmt.Sprintf("%s", cookieStr[9:])
	var conquest Conquest
	// log.Println(cookieStr)
	err = db.C("conquests").Find(bson.M{"_id": bson.ObjectIdHex(cookieStr)}).One(&conquest)
	// err = db.C("conquests").FindId(cookieStr[9:]).One(&conquest)
	// log.Printf("session: %v\n", conquest)
	if err != nil {
		log.Println(err)
		log.Println("conquest not found")
		return bson.ObjectId("1"), err
	}
	// hero id not in db
	return conquest.HeroId, nil
}
