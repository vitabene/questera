package main

import (
	"encoding/json"
	"fmt"
	"log"
	"gopkg.in/mgo.v2/bson"
	"net/http"
)

type Hero struct {
	Id, Occupation         int
	Name, AvatarUrl, Email, Salt, Password string
}

type Conquest struct {
	ConquestId string
	HeroId int
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

func getHero(heroId int) []Hero {
	var heroes []Hero
	hero := Hero{}
	err := db.C("heroes").Find(bson.M{"HeroId": heroId}).One(&hero)
	isFatal(err)
	heroes = append(heroes, hero)
	return heroes
}

func heroPresent(r *http.Request) (int, error) {
	cookie, err := r.Cookie("questera")
	if err != nil {
		log.Println(err)
		return -1, err
	}
	// log.Printf("cookie: %s\n", cookie)
	// questera= [9:]
	cookieStr := fmt.Sprintf("%s", cookie)
	var conquest Conquest
	// log.Printf("query:\n%s\n", fmt.Sprintf(query, cookieStr[9:]))
	err = db.C("conquests").Find(bson.M{"ConquestId": cookieStr}).One(&conquest)
	isFatal(err)
	return conquest.HeroId, nil
}
