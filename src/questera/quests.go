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
}

const (
	QUEST_COLL = "quests"
)

type QuestJSON struct {
	Text, Created, Type string
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
	err = createQuest(q.Text, q.Type, created, heroId)
	isFatal(err)
	questHandler(w, r, "")
}

func createQuest(questName, questType string, created int, heroLoggedId bson.ObjectId) error {
	c := db.C(QUEST_COLL)
	err := c.Insert(&Quest{
		HeroId:    heroLoggedId,
		Name:      questName,
		Type:      questType,
		Created:   created,
		Completed: 0,
	})
	isFatal(err)
	return nil
}

func loadQuests(HeroId bson.ObjectId) []Quest {
	var quests []Quest
	err := db.C(QUEST_COLL).Find(bson.M{"heroid": HeroId}).All(&quests)
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
