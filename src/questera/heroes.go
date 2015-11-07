package main

import (
	"encoding/json"
	"errors"
	"fmt"
	_ "github.com/ziutek/mymysql/native"
	"log"
	"net/http"
)

type Hero struct {
	Id, Occupation         int
	Name, AvatarUrl, Email string
}

func heroHandler(w http.ResponseWriter, r *http.Request, name string) {
	heroId, err := heroPresent(r)
	if err != nil {
		log.Println(err)
		return
	}
	hero := getHero(heroId)
	jsonHero, err := json.Marshal(hero)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Fprint(w, string(jsonHero))
}

func getHero(heroId int) []Hero {
	query := "SELECT * FROM heroes WHERE id='%s'"
	query = fmt.Sprintf(query, fmt.Sprintf("%d", heroId))
	rows, res, err := db.Query(query)
	if err != nil {
		log.Println(err)
		return nil
	}
	var heroes []Hero
	var id, occupation int
	var name, avatarUrl, email string
	for _, row := range rows {
		id, name, occupation, avatarUrl, email = row.Int(res.Map("id")), row.Str(res.Map("name")), row.Int(res.Map("occupation")), row.Str(res.Map("avatar_url")), row.Str(res.Map("email"))
		hero := &Hero{Id: id, Name: name, Occupation: occupation, AvatarUrl: avatarUrl, Email: email}
		heroes = append(heroes, *hero)
	}
	return heroes
}

func heroPresent(r *http.Request) (int, error) {
	cookie, err := r.Cookie("questera")
	// log.Printf("cookie: %s\n", cookie)
	if err != nil {
		log.Printf("%s\n", err)
		return 0, errors.New("no cookie set")
	}
	// questera= [9:]
	cookieStr := fmt.Sprintf("%s", cookie)
	query := "SELECT * FROM conquests WHERE conquest_id='%s' LIMIT 1"
	// log.Printf("query:\n%s\n", fmt.Sprintf(query, cookieStr[9:]))
	rows, res, err := db.Query(fmt.Sprintf(query, cookieStr[9:]))
	if err != nil || len(rows) == 0 {
		return 0, err
	}
	for _, row := range rows {
		return row.Int(res.Map("hero_id")), nil
	}
	return -1, nil
}
