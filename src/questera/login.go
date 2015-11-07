package main

import (
	"crypto/sha256"
	"fmt"
	_ "github.com/ziutek/mymysql/native"
	"log"
	"net/http"
	"time"
)

func signupHandler(w http.ResponseWriter, r *http.Request) {
	name, email, occupation := r.FormValue("name"), r.FormValue("email"), r.FormValue("occupation")
	pw, _ := r.FormValue("password"), r.FormValue("password_again")
	salt := RandStringBytes(128)
	hash := sha256.New()
	hash.Write([]byte(salt + pw))
	byteSum := hash.Sum(nil)
	hashedPw := fmt.Sprintf("%x", byteSum)
	defAvatarUrl := "images/hero.png"
	query := "INSERT INTO heroes (name, occupation, avatar_url, email, salt, password) VALUES ('%s', '%d', '%s', '%s', '%s', '%s')"
	_, _, err := db.Query(fmt.Sprintf(query, name, occupation, defAvatarUrl, email, salt, hashedPw))
	if err != nil {
		log.Println(err)
		return
	}
	http.Redirect(w, r, "/", http.StatusFound)
}

func initiateSession(heroId int, w http.ResponseWriter) error {
	conquestId := RandStringBytes(64)
	query := "INSERT INTO conquests (conquest_id, hero_id, last_seen) VALUES ('%s', '%d', CURRENT_TIMESTAMP())"
	_, _, err := db.Query(fmt.Sprintf(query, conquestId, heroId))
	if err != nil {
		log.Println(err)
		return err
	}
	cookie := http.Cookie{Name: "questera", Value: conquestId, Path: "/", Expires: time.Now().Add(time.Hour), HttpOnly: true, MaxAge: 86400}
	http.SetCookie(w, &cookie)
	return nil
}

func destroySession(heroId int) {
	query := "DELETE FROM conquests where hero_id=%d"
	_, _, err := db.Query(fmt.Sprintf(query, heroId))
	if err != nil {
		log.Println(err)
		return
	}
}

func logoutHandler(w http.ResponseWriter, r *http.Request) {
	heroId, err := heroPresent(r)
	if err != nil {
		http.Redirect(w, r, "/", http.StatusFound)
	}
	destroySession(heroId)
	http.Redirect(w, r, "/", http.StatusFound)
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	email := r.FormValue("email")
	pw := r.FormValue("password")
	query := "SELECT id FROM heroes WHERE email='%s' AND password=SHA2(concat(salt, '%s'), 0) LIMIT 1"
	rows, res, err := db.Query(fmt.Sprintf(query, email, pw))
	if err != nil {
		log.Println(err)
		return
	}
	var id int
	for _, row := range rows {
		id = row.Int(res.Map("id"))
	}
	err = initiateSession(id, w)
	if err != nil {
		log.Println(err)
		return
	}
	http.Redirect(w, r, "/", http.StatusFound)
}
