package main

import (
	"encoding/json"
	"gopkg.in/mgo.v2/bson"
	"net/http"
	"strconv"
)

type Quest struct {
	Id        bson.ObjectId `json:"id" bson:"_id,omitempty"`
	HeroId    bson.ObjectId `json:"heroId" bson:"heroid"`
	Created   int           `json:"created"`
	Completed int           `json:"completed"`
	Name      string        `json:"name"`
	Type      string        `json:"type"`
	Coords    Coord         `json:"coords"`
}

const (
	QUEST_COLL = "quests"
)

type QuestJSON struct {
	Id, Text, Created, Type string
	Completed           int
	Coords							Coord
}

func updateQuestHandler(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var q QuestJSON
	err := decoder.Decode(&q)
	isFatal(err)
	heroId, err := heroPresent(r)
	isFatal(err)
	c := db.C(QUEST_COLL)
	findQuery := bson.M{"_id": bson.ObjectIdHex(q.Id), "heroid": heroId}
	updateQuery := bson.M{"$set": bson.M{"name": q.Text, "completed": q.Completed}}
	err = c.Update(findQuery, updateQuery)
	isFatal(err)
	questHandler(w, r, "")
}

func createQuestHandler(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var q QuestJSON
	err := decoder.Decode(&q)
	isFatal(err)
	heroId, err := heroPresent(r)
	isFatal(err)
	created, err := strconv.Atoi(q.Created)
	isFatal(err)
	err = createQuest(q.Text, q.Type, created, q.Coords, heroId)
	isFatal(err)
	questHandler(w, r, "")
}

func createQuest(questName, questType string, created int, coords Coord, heroLoggedId bson.ObjectId) error {
	c := db.C(QUEST_COLL)
	err := c.Insert(&Quest{
		HeroId:    heroLoggedId,
		Name:      questName,
		Type:      questType,
		Created:   created,
		Coords: 	 coords,
		Completed: 0,
	})
	isFatal(err)
	return nil
}

func loadQuests(HeroId bson.ObjectId) []Quest {
	var quests []Quest
	err := db.C(QUEST_COLL).Find(bson.M{"heroid": HeroId, "completed":0}).All(&quests)
	isFatal(err)
	return quests
}

func questHandler(w http.ResponseWriter, r *http.Request, name string) {
	if name == "" {
		heroId, err := heroPresent(r)
		isFatal(err)
		quests := loadQuests(heroId)
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(quests)
	}
}
