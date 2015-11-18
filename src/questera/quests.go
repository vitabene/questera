package main

import (
	"encoding/json"
	"fmt"
	"gopkg.in/mgo.v2/bson"
	"net/http"
	"strconv"
)

type Quest struct {
	Id        bson.ObjectId `json:"id" bson:"_id,omitempty"`
	HeroId    bson.ObjectId `json:"heroId"`
	Created   int           `json:"created"`
	Completed int           `json:"completed"`
	Name      string        `json:"name"`
	Type      string        `json:"type"`
}

var questCollection = "quests"

type QuestResource struct {
	Data Quest `json:"data"`
}

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
	heroLoggedId := fmt.Sprintf("%d", heroId)
	jsonQuests, err := json.Marshal(loadQuests(heroLoggedId))
	isFatal(err)
	fmt.Fprint(w, string(jsonQuests))
}

func createQuest(questName, questType string, created int, heroLoggedId bson.ObjectId) error {
	c := db.C(questCollection)
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

func loadQuests(HeroId string) []Quest {
	var quests []Quest
	iter := db.C(questCollection).Find(bson.M{"heroId": HeroId}).Iter()
	err := iter.All(&quests)
	isFatal(err)
	return quests
}

func questHandler(w http.ResponseWriter, r *http.Request, name string) {
	if name == "" {
		heroId, err := heroPresent(r)
		isFatal(err)
		heroLoggedId := fmt.Sprintf("%d", heroId)
		quests := loadQuests(heroLoggedId)
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(quests)
	}
}
