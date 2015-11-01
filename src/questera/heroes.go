package main

import (
	"fmt"
	_ "github.com/ziutek/mymysql/native"
	"log"
	"net/http"
	"errors"
)

type Hero struct {
	Id, Occupation         int
	Name, AvatarUrl, Email string
}

func getHero(heroId int) Hero {
	query := "SELECT * FROM heroes WHERE id='%s'"
	query = fmt.Sprintf(query, fmt.Sprintf("%d", heroId))
	rows, res, err := db.Query(query)
	if err != nil {
		log.Println(err)
		return Hero{}
	}
	var hero Hero
	var id, occupation int
	var name, avatarUrl, email string
	for _, row := range rows {
		id, name, occupation, avatarUrl, email = row.Int(res.Map("id")), row.Str(res.Map("name")), row.Int(res.Map("occupation")), row.Str(res.Map("avatar_url")), row.Str(res.Map("email"))
		hero = Hero{Id: id, Name: name, Occupation: occupation, AvatarUrl: avatarUrl, Email: email}
	}
	return hero
}

func heroPresent(r *http.Request) (int, error) {
	cookie, err := r.Cookie("questera")
	if err != nil {
		log.Printf("%s\n", err)
		return 0, errors.New("no cookie set")
	}
	// questera= [9:]
	cookieStr := fmt.Sprintf("%s", cookie)
	query := "SELECT * FROM conquests WHERE conquest_id='%s'"
	rows, res, err := db.Query(fmt.Sprintf(query, cookieStr[9:]))
	if err != nil || len(rows) == 0 {
		return 0, errors.New("error reading conquests")
	}
	for _, row := range rows {
		return row.Int(res.Map("hero_id")), nil
	}
	return -1, nil
}
