package main

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"gopkg.in/mgo.v2/bson"
	"log"
	"net/http"
	"strconv"
	"time"
)

func signupHandler(w http.ResponseWriter, r *http.Request) {
	name, email, occupation := r.FormValue("name"), r.FormValue("email"), r.FormValue("occupation")
	pw, _ := r.FormValue("password"), r.FormValue("password_again")
	hash := sha256.New()
	hash.Write([]byte(email + pw))
	byteSum := hash.Sum(nil)
	hashedPw := fmt.Sprintf("%x", byteSum)
	defAvatarUrl := "images/hero.png"
	log.Printf("%s\n", hashedPw)
	intOccupation, err := strconv.Atoi(occupation)
	isFatal(err)
	c := db.C("heroes")
	err = c.Insert(&Hero{
		Name:       name,
		Occupation: intOccupation,
		AvatarUrl:  defAvatarUrl,
		Email:      email,
		Password:   hashedPw,
	})
	isFatal(err)
	http.Redirect(w, r, "/", http.StatusFound)
}

func initiateSession(heroId bson.ObjectId, w http.ResponseWriter) error {
	// conquestId := RandStringBytes(64)
	conquestId := bson.NewObjectId()
	log.Printf("%s\n", conquestId)
	c := db.C("conquests")
	err := c.Insert(&Conquest{
		ConquestId: conquestId,
		HeroId:        heroId,
		ConquestBegun: time.Now().UnixNano(),
		LastSeen:      time.Now().UnixNano(),
	})
	isFatal(err)
	cookie := http.Cookie{
		Name:     "questera",
		Value:    fmt.Sprintf("%v", conquestId.Hex()),
		Path:     "/",
		Expires:  time.Now().Add(time.Hour * 168),
		HttpOnly: true,
		MaxAge:   604800,
	}
	http.SetCookie(w, &cookie)
	return nil
}

func destroySession(heroId bson.ObjectId) {
	err := db.C("conquests").Remove(bson.M{"_id": heroId})
	isFatal(err)
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
	// log.Printf("email:%s\npassword:%s\n", email, pw)
	hash := sha256.New()
	data := []byte(email + pw)
	// log.Printf("%s\n", data)
	hash.Write(data)
	md := hash.Sum(nil)
	mdStr := hex.EncodeToString(md)
	log.Printf("%s\n", mdStr)
	// return
	var hero Hero
	err := db.C("heroes").Find(bson.M{"email": email, "password": mdStr}).One(&hero)
	hasError(err)
	log.Printf("hero: %v\n", hero)
	err = initiateSession(hero.Id, w)
	hasError(err)
	http.Redirect(w, r, "/", http.StatusFound)
}
